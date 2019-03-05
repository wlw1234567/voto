<template>
    <div class="container">
        <div class="self" v-for="item in userInfo" :key="item.index">
            <div class="self_head">
                <img :src="'https://bcl.baocailang.com:8994'+item.image" alt="">
                <!-- v-for="item in userInfo" :key="item.index" -->
            </div>
            <div class="self_info">
                <p>{{item.userName}}</p>
                <p><span>编号：{{item.showNumber}}</span><span>排名：{{item.ranking}}</span></p>
                <p><span>职业：{{item.profession}}</span><span>从业时间：{{item.employTime}}年</span></p>
            </div>
            <div class="self_photo">
                <img src="../assets/组 gyj15@2x (1).png" alt="">
                <div>
                    <img v-if="imageSrc" :src="'https://bcl.baocailang.com:8994'+item.image" :style="{height:imgheight}">
                    <img v-if="imageSrc2" :src="'https://bcl.baocailang.com:8994'+item.image2" :style="{height:imgheight}">
                </div>
                <img src="../assets/组 15@2x (1).png"  @click="canvassing()">
            </div>
        </div>

    </div>
</template>

<script>
// import wx from 'weixin-js-sdk'
import { weChatShare } from '../utils/wechat.js'
export default {
    data() {
        return {
            userInfo:[],

            imageSrc:false,
            imageSrc2:false,
            imgheight:''
        }
    },
    methods: {
        canvassing(){
                alert('点击屏幕右上角分享好友或朋友圈')
        },
        getInfo:function(){
            let that=this
            const data={
                userId:this.$route.query.userId,
                showNumber:this.$route.query.showNumber
            }
            that.$post('/User/GetUserInfo',data)
            .then(res=>{
                if(res.code===0){
                    if(res.data.image!=''){
                        this.imageSrc=true
                        this.imgheight='100%'
                    }
                    if(res.data.image2!=''){
                        this.imageSrc2=true
                    }
                    that.userInfo.push(res.data)
                    console.log(that.userInfo)
                }
            })
        },
        // share(){
        //         let url=window.location.href.split('#')[0]

        //         const data={
        //             // userId:cc,
        //             url:url
        //         }
        //         console.log(url)
        //         this.$post('/User/WeChatShare',data)
        //             .then(res=>{
        //                 console.log(res)
        //                 if(res.code===0){
        //                     wx.config({
        //                         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //                         appId: res.data.appId, // 必填，公众号的唯一标识
        //                         timestamp:res.data.timestamp, // 必填，生成签名的时间戳
        //                         nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        //                         signature: res.data.signature,// 必填，签名
        //                         jsApiList: [
        //                             'onMenuShareTimeline',
        //                             'onMenuShareAppMessage'
        //                         ] // 必填，需要使用的JS接口列表
        //                     });
        //                     wx.ready(function () {
        //                         //分享朋友圈
        //                         wx.onMenuShareTimeline({
        //                             title: '老虎钳2019最美代言人投票榜',
        //                             link: url,
        //                             imgUrl: res.data.shareImageUrl,// 自定义图标

        //                             success: function (res) {
        //                                 // alert('分享成功啦！')
        //                             }
        //                         });
        //                         //分享给好友
        //                         wx.onMenuShareAppMessage({
        //                             title: '老虎钳2019最美代言人投票榜', // 分享标题
        //                             desc: '老虎钳2019最美代言人实时投票', // 分享描述
        //                             link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //                             imgUrl: res.data.shareImageUrl, // 自定义图标
        //                             success: function () {
        //                             }
        //                         });
        //                     });
                            
        //                 }else{
        //                     alert('页面信息已过期')
        //                 }
        //             })
                
        //     }
        share(){
                const url=window.location.href.split('#')[0]

                const data={
                    url:url
                }
                console.log(url)
                let appId = '', nonceStr = '', signature = '', timestamp = '', imgUrl = '',  linkUrl= '';
                this.$post('/User/WeChatShare',data)
                    .then(res=>{
                        console.log(res)
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
        this.getInfo()
    },
    mounted() {
        this.share()
    },
}
</script>


<style>
.self{
    box-sizing: border-box;
    background-image: url('../assets/图层 2@2x.png');
    background-position-y: -12rem;
    background-size: 100%;
    width: 100%;
    min-height: 100vh;
    padding: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.self_head{
    width: 30vw;
    height: 30vw;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    border: .4rem solid #FF7200;
}
.self_head img{
    width: 100%;
    
}
.self_info{
    width: 100%;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 5px;
    margin-top: .3rem;
    text-align: center;
    color: #525252;
    font-weight: 500;
    padding-bottom: 1rem;
    padding-top: .3rem
}
.self_info p{
    margin-top: .3rem;
    font-size: 1.1rem
}
.self_info p span{
    font-size: 1rem;
    margin-right: 1rem
}
.self_photo{
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 5px;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem
    }
.self_photo img{
    width: 60%;
}
.self_photo div{
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
    overflow: hidden;
}
.self_photo div img{
    width: 48%
    /* width: 40vw;
    height: 100%; */
    /* height: 40vw; */
}

</style>
