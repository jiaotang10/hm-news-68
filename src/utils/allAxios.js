import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import { Toast } from 'vant'
Vue.use(Toast)
// 把axios挂载到vue的原型上,挂到原型上的东西 最好带上一个$
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL,基准地址,以后就不用输地址了
axios.defaults.baseURL = 'http://localhost:3000'

// 设置axios的拦截器
axios.interceptors.request.use(function(config) {
//   console.log('请求拦截', config)
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})
// token验证失败的 需要清除localstorage和跳转到登录页面
axios.interceptors.response.use(function(response) {
//   console.log('响应拦截', response)
  const { message, statusCode } = response.data
  if (message === '用户信息验证失败' && statusCode === 401) {
    Toast.fail('用户验证失败')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.push('/login')
  }
  return response
})
