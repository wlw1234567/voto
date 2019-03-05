<template>
    <div class="container">
        <div class="header"><img src="../assets/排行榜.jpg" alt=""></div>
        <div class="main">
            <div class="count_down">
                <div><img src="../assets/图层 7@2x.png" alt=""><span>据投票结束还有</span></div>
                <div class="count">
                    <span>{{D}}天{{h}}时{{m}}分{{s}}秒</span>
                </div>
            </div>
            <div class="search">
                <input @keypress="searchGoods" type="search" v-model="searchText" placeholder="输入选手名称或编号">
                <img src="../assets/图层 8@2x.png" @click="search()" alt="">
            </div>
            <div class="users" v-show="result">
                <p>为您找到以下代言人：</p>
                <ul>
                    <li v-for="(item,index) in searchList" :key="item.id">
                        <div class="photo"><img v-lazy="'https://bcl.baocailang.com:8994'+item.image" alt="">
                            <p>{{item.voteNumber}}票</p>
                        </div>
                        <p>姓名：{{item.userName}}</p>
                        <p>编号：{{item.showNumber}}</p>
                        <p>排名：{{item.ranking}}</p>
                        <div class="cli">
                            <img src="../assets/组hh 15@2x(1).png" @click="vote1(item.id,item.showNumber,index)" alt="">
                            <img src="../assets/组gj 15@2x(2).png" @click="canvassing()" alt="">
                        </div>
                    </li>
                </ul>
                <p>end......下面是当前排行榜↓↓↓</p>
            </div>
            <div class="users">
                <ul>
                    <li v-for="(item, index) in userList" :key="item.id">
                        <div class="photo"><img v-lazy="'https://bcl.baocailang.com:8994'+item.image" alt="">
                            <p>{{item.voteNumber}}票</p>
                        </div>
                        <p>姓名：{{item.userName}}</p>
                        <p>编号：{{item.showNumber}}</p>
                        <p>排名：{{item.ranking}}</p>
                        <div class="cli">
                            <img src="../assets/组hh 15@2x(1).png" @click="vote(item.id,item.showNumber,index)" alt="">
                            <img src="../assets/组gj 15@2x(2).png" @click="canvassing()" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
// import wx from 'weixin-js-sdk'
import { weChatShare } from '../utils/wechat.js'

    export default {
        data() {
            return {
                D:'',
                h:'',
                m:'',
                s:'',
                isEnd:false,//倒计时是否结束
                endTime:'2019/04/01 00:00:00',//结束时间
                searchText:'',
                searchSrc:'/img/组 15@2x(5).6e44a564.png',
                result:false,
                userList:[],
                searchList:[]
            }
        },
        methods: {
            
            setEndTime(){
            		var that = this;
            		var interval = setInterval(function timestampToTime(){
            		    var date = (new Date(that.endTime)) - (new Date()); //计算剩余的毫秒数
            		    if(date == 0){
            			    that.isEnd = true;
            			    clearInterval(interval)
            		    }else{
            			    that.D = parseInt(date / 1000 / 60 / 60 / 24 , 10);
            			    that.h = parseInt(date / 1000 / 60 / 60 % 24 , 10);
            			    if(that.h < 10){
            				    that.h = "0" +　that.h
            			    }   
            			    that.m = parseInt(date / 1000 / 60 % 60, 10);//计算剩余的分钟
            			    if(that.m < 10){
            				    that.m = "0" +　that.m
            			    } 
            	  		    that.s = parseInt(date / 1000 % 60, 10);//计算剩余的秒数 
            	  		    if(that.s < 10){
            				    that.s = "0" +　that.s
            			    }	
            		    }
                    },1000)
            },
            search(){
                if(this.searchText!=''){
                    const data={
                        searchKey:this.searchText
                    }
                    this.$post('/User/GetShowUser',data)
                    .then(res=>{
                        if(res.code===0&&res.data.length>0){
                            this.searchList=res.data
                            this.result=true
                        }else{
                            alert('小老虎很努力了，可还是找不到您要搜索的代言人(ಥ _ ಥ)')
                        }
                    })
                }else{
                    
                    this.result=false
                }
                
            },
            searchGoods(event) { 
                if (event.keyCode == 13) { //如果按的是enter键 13是enter 
                    event.preventDefault(); //禁止默认事件（默认是换行） 
                    console.log(event.target.value)
                    this.search()
                } 
            },
            getList:function(){
                this.$post('/User/GetShowUser')
                .then((res)=>{
                    if(res.code===0){
                        this.userList=res.data
                    }
                })
            },
            vote(x,y,z){
                // console.log(z)
                // const bb= Cookies.get('token')
                // alert(bb)
                // this.isweixin()
                const detail={
                    userId:x,
                    showNumber:y
                }
                this.$post('/User/Vote',detail)
                .then(res=>{
                    // console.log(res)
                    if(res.code===0){
                        alert('投票成功')
                        this.userList[z].voteNumber++
                    }else{
                        alert(res.message)
                        
                    }
                })
            },
            vote1(x,y,z){
                const detail={
                    userId:x,
                    showNumber:y
                }
                this.$post('/User/Vote',detail)
                .then(res=>{
                    // console.log(res)
                    if(res.code===0){
                        alert('投票成功')
                        this.searchList[z].voteNumber++
                    }else{
                        alert(res.message)
                    }
                })
            },
            canvassing(){
                alert('点击屏幕右上角分享好友或朋友圈')
            },

            share(){
                const url=window.location.href.split('#')[0]
                // let url='https://bcl.baocailang.com/wechat/oauth2?state=vote'
                // let url = encodeURIComponent(location.href.split('#')[0])

                const data={
                    // userId:cc,
                    url:url
                }
                console.log(url)
                let appId = '', nonceStr = '', signature = '', timestamp = '', imgUrl = '',  linkUrl= '';
                this.$post('/User/WeChatShare',data)
                    .then(res=>{
                        console.log(res)
                        // alert(res.data.shareUrl)
                        if(res.code===0){
                            appId = res.data.appId;
                            nonceStr = res.data.nonceStr;
                            signature = res.data.signature;
                            timestamp = res.data.timestamp;
                            imgUrl = encodeURI(res.data.shareImageUrl);
                            linkUrl =encodeURI('https://bcl.baocailang.com:8994/Home/Login?shareid=5');
                            weChatShare(appId, timestamp, nonceStr, signature, imgUrl,linkUrl)
                            
                        }else{
                            alert('页面信息已过期')
                        }
                    })
                
            }
        },
        created() {
            this.setEndTime();
            this.getList();
            this.share()
        },
        mounted() {
            // this.share()
        },
    }
</script>
<style>
    .header {
        width: 100%;
    }

    .header img {
        width: 100%;
    }

    .main {
        box-sizing: border-box;
        width: 100vw;
        background-image: url("../assets/排行榜e.png");
        background-size: 100%;
        min-height: 100vh;
        margin-top: -1rem;
        padding-left: 10vw;
        padding-right: 10vw;
        overflow: hidden;
    }

    .count_down {
        width: 100%;
        height: 4rem;
        background-color: #4DA2FF;
        margin-top: 1.5rem;
        border-radius: 5px;
        box-shadow: #1258A6 4px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.2rem;
        letter-spacing: .15rem
    }

    .count_down div {
        display: flex;
        justify-content: center
    }

    .count_down img {
        height: 1.4rem;
        margin-right: .5rem
    }

    .count {
        font-size: 1.3rem
    }

    .search {
        margin-top: 1rem;
        position: relative;
    }

    .search input {
        width: 100%;
        /* padding-top: .5rem;
        padding-bottom: .5rem; */
        border: none;
        background: #EBEBEB;
        box-sizing: border-box;
        padding-left: 1rem;
        border-radius: 5px;
        box-shadow: #C3C3C3 3px 2px;
        outline: none;
        line-height: 2rem;
    }

    .search img {
        position: absolute;
        right: .2rem;
        top: .2rem;
        height: 1.6rem;
    }

    input[type=search]::-webkit-input-placeholder {
        color: #C3C3C3;
        font-size: 1rem;
        line-height: 2rem;
        letter-spacing: .1rem
    }

    input[type=search]::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }

    .users {
        margin-top: 1rem
    }
    .users p{
        color: #525252;
        padding-bottom: 1rem;
        font-size: 1.1rem
    }

    .users ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between
    }

    .users ul li {
        display: flex;
        flex-direction: column;
        align-items: space-around;
        width: 38vw;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: rgb(230, 230, 230) 3px 5px 5px;
        border: 1px solid rgb(230, 230, 230);
        margin-bottom: 1rem
    }

    .photo img {
        width: 100%;
        /* display: block */
    }

    .photo {
        width: 38vw;
        height: 38vw;
        overflow: hidden;
        position: relative;
        margin-bottom: .4rem
    }

    .users ul li .photo p {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        padding-bottom: 0;
        line-height: 9vw
    }

    .users ul li p {
        padding-left: .4rem;
        padding-bottom: .4rem;
        font-size: 1.1rem;
        color: #525252;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .cli {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-around;
        overflow: hidden;
        padding-bottom: .5rem
    }

    .cli img {
        width: 45%;
        height: 100%
    }
</style>