<template>
    <div id="bg">
        
        <img src="../assets/活动页.jpg" alt="">
        <div class="btn">
            <router-link tag="button" :to="{name:'rankLink'}" class="one">投票</router-link>
            <router-link tag="button" :to="{name:'applyLink'}" class="one">报名</router-link>
        </div>
    </div>
</template>

<script>
import { weChatShare } from '../utils/wechat.js'
export default {
    data() {
        return {
            
        }
    },
    methods: {
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
        this.share()
    },
}
</script>

<style>
#bg{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: 100%
}
#bg img{
    width: 100%;;
}
.btn{
    display: flex;
    margin-top: -5.5rem
}
.btn button{
    width: 40vw;
    height: 3.3rem;
    opacity: 0;
}


.logo{
    width: 80vw;
    height: auto;
}
.logo img{
    width: 100%;
}

.line{
    width: 100%;
    height: 100%;
    border: 1px dashed #4DA2FF;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
}
h3{
    text-align: center;
    font-weight: 600;
    color: #454545
}
.title{
    display: flex;
    align-items: center
}
.title img{
    width: 1.5rem;
}
.title h4{
    margin-left: .5rem;
    color: #454545
}
.one p{
    margin-left: 2rem;
    color: #9F9F9F;
    font-size: .85rem;
    padding-top: .5rem
}
.one{
    padding-bottom: 1rem
}

</style>
