import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import 'amfe-flexible'

// import { Button } from 'vant'
// Vue.use(Button)
import Vant from 'vant'
import 'vant/lib/index.css'
// import { Form } from 'vant'
import newsHeader from './components/news-header.vue'
import newsLogo from './components/news-logo.vue'

Vue.use(Vant)
// Vue.use(Form)
Vue.config.productionTip = false

// 全局注册头部组件
Vue.component('newsHeader', newsHeader)
Vue.component('newsLogo', newsLogo)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
