import Vue from 'vue'
import moment from 'moment'
// 全局过滤器 把moment安装
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
