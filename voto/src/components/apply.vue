<template>
    <div>
        <div class="apply">
            <div class="h_title">
                <img src="../assets/我要报mk名！@2x.png" alt="">
            </div>
            <div class="from">
                <img src="../assets/报名.jpg" alt="">
                <div class="from_item">
                    <div>
                        <span>姓名：</span>
                        <input v-model="name" type="text" placeholder="输入您的姓名">
                    </div>
                    <div>
                        <span>职业：</span>
                        <input v-model="profession" type="text" placeholder="输入您的职业">
                    </div>
                    <div>
                        <span>从业时间：</span>
                        <input v-model="career" type="number" placeholder="仅支持数字，单位（年）">
                    </div>
                    <div class="img-container">
                        <span>照片：</span>
                        <input type="file" accept="image/*" @change="getFile1" ref="file">
                        <img v-if="canSee" src="../assets/加号.png" alt="">
                        <div v-else class="show">
                            <img :src="src1" alt="">
                            <img src="../assets/关闭1.png" @click="empty()">
                        </div>
                    </div>
                    <div class="img-container">
                        <span>照片：</span>
                        <input type="file" accept="image/*" @change="getFile2" ref="file">
                        <img v-if="canSee2" src="../assets/加号.png" alt="">
                        <div v-else class="show">
                            <img :src="src2" alt="">
                            <img src="../assets/关闭1.png" @click="empty2()">
                        </div>
                    </div>
                        <img class="btn_container" src="../assets/组 j15@2x (1).png" @click="submit" alt="">
                        
                </div>
                

            </div>
        </div>
    </div>
</template>

<script>
import lrz from "lrz"
import Cookies from 'js-cookie'

    export default {
        data() {
            return {
                
                name:'',
                profession:'',
                career:'',
                src1:'',
                src2:'',
                canSee:true,
                canSee2:true
            }
        },
        methods: {
            submit(){
                
                let _name = this.name.replace(/\s+/g,"")
                let _profession = this.profession.replace(/\s+/g,"")
                let _career = this.career.replace(/\s+/g,"")

                if(_name!=''&&_profession!=''&&_career!=''&&[this.src1||this.src2!='']){

                    let src1=this.src1.split(',').splice(1,1)[0]
                    let src2=this.src2.split(',').splice(1,1)[0]

                    
                    // console.log(src)
                    const formData={
                        userName:_name,
                        profession:_profession,
                        employTime:_career,
                        image:src1,
                        image2:src2
                    }
                    console.log(formData)
                    
                    this.$post('/User/UserSignUp',formData)
                    .then(res=>{
                        console.log(res)
                        if(res.code===0){
                            this.$router.push({
                                name:'selfLink',
                                query:{
                                    userId:res.data.userId,
                                    showNumber:res.data.showNumber
                                }
                            })
                        }else{
                            alert(res.message)
                        }
                        
                    })
                    
                }else{
                    alert('请输入完整信息')
                }
                

                
                
            },
            getFile1 (e) {
                let _this = this
                var files = e.target.files[0]
                if(files){
                    if (!e || !window.FileReader) return  // 看支持不支持FileReader
                
                    lrz(files, {width: 480,fieldName:e})
                        .then(rst=>{                          
                            _this.src1=rst.base64
                            _this.canSee=false
                    })
                }else{
                    _this.src1 = ''
                    _this.canSee=true
                }
            },
            getFile2 (e) {
                let _this = this
                var files = e.target.files[0]
                if(files){
                    if (!e || !window.FileReader) return  // 看支持不支持FileReader
                    
                    lrz(files, {width: 480,fieldName:'file1'})
                        .then(rst=>{                          
                            _this.src2=rst.base64
                            _this.canSee2=false
                    })
                }else{
                    _this.src2 = ''
                    _this.canSee2=true
                }
                
            },
            empty(){
                this.src1=''
                this.canSee=true
            },

            empty2(){
                this.src2=''
                this.canSee2=true
            }
        },

    }
</script>

<style>
    .apply {
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

    .h_title {
        text-align: center
    }

    .h_title img {
        width: 60%;
    }

    .from {
        width: 100%;
    }
    .from img{
        width: 100%;
    }
    .from_item{
        background-color: #fff;
        margin-top: -1rem;
        padding-top: 1.5rem;
        padding-bottom: 2rem;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .from_item div{
        width: 88%;
        background-color: #ebebeb;
        margin: 0 auto;
        margin-bottom: .7rem;
        display: flex;
        align-items: center; 
        height: 2rem;
        border-radius: 5px;
        box-sizing: border-box;
        padding-left: .5rem
    }
    .from_item div span{
        color: rgb(58, 58, 58);
        line-height: 2rem;
        font-size: .9rem
    }
    .from_item div input{
        border: none;
        background-color: #ebebeb;
        line-height: 2rem;
        width: 70%;
        outline: none
    }
    .from_item .img-container{
        height: 4rem;
        position: relative;
    }
    .from_item .img-container input{
        opacity: 0;
        width: 4rem;
        height: 4rem;
        position: absolute;
        left: 6rem;
        top: 0
    }
    .from_item .img-container img{
        width: 4rem;
        max-height: 4rem;
        margin-left: 3rem
        
    }
    .from_item .img-container .show{
        margin-bottom: 0;
        margin-left: 3rem;
        width: 50%
    }
    .from_item .img-container .show img{
        margin-left: -.6rem
    }
    .from_item .img-container .show img:last-child{
        width: 1rem;
        margin-left: 2rem
    }
    .from_item div input::-webkit-input-placeholder {
        color: #C3C3C3;
        font-size: .9rem;
        line-height: 2rem;
        letter-spacing: .1rem;
    }
    /* .from_item div input[type=file]{
        width: 60%;
    } */

    .from_item .btn_container{
        width: 80%;
        display: block;
        margin: 0 auto;
        margin-top: 1rem
    }
</style>