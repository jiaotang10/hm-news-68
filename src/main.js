import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import 'amfe-flexible'

import './utils/allAxios'
import './utils/allComponents'
import './utils/allFilter'
import './utils/vant'

Vue.config.productionTip = false

// 创建一个bus
const bus = new Vue()
// 把bus挂载到vue原型
Vue.prototype.$bus = bus

new Vue({
  router,
  mode: 'hash',
  render: h => h(App)
}).$mount('#app')
