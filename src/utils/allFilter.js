import Vue from 'vue'
import moment from 'moment'
// 全局过滤器 把moment安装
Vue.filter('time', (input, str = 'YYYY-MM-D') => {
  return moment(input).format(str)
})
