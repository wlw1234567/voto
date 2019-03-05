import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from './routes'
import axios from 'axios'
import lrz from 'lrz'
import VueLazyload from 'vue-lazyload'
import Cookies from 'js-cookie'
// import wx from 'weixin-js-sdk'


import {post} from './utils/api'
//定义全局变量
Vue.prototype.$post=post

Vue.use(VueLazyload)


Vue.prototype.axios = axios
// axios.defaults.baseURL='http:192.168.2.110:5000'

Vue.use(VueRouter)


const router=new VueRouter({
  routes,
  mode:'hash',
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0,y:0}
    }
  }
})

router.beforeEach((to,from,next) =>{
  if(to.meta.title){
      document.title = to.meta.title
      next()
  }
  
   
  
})

Vue.config.productionTip = false

new Vue({
  el:"#app",
  router,
  render: h => h(App),
})
