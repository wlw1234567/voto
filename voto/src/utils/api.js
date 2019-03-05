import axios from 'axios';
import Cookies from 'js-cookie'

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='https://bcl.baocailang.com:8994/api';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // Cookies.set('token', '1', { expires: 1, path: '' })
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    const bb= Cookies.get('token')
    config.headers.token = bb;
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {    
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

