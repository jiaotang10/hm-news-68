import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import 'amfe-flexible'

import './utils/allAxios'
import './utils/allComponents'
import './utils/allFilter'

// import { Button } from 'vant'
// Vue.use(Button)
import Vant from 'vant'
import 'vant/lib/index.css'
// import { Form } from 'vant'
Vue.use(Vant)
// Vue.use(Form)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 配置全局的导航守卫
// 判断 to的地址是否是去user
// 若不是去user 直接放行
// 若去user 得验证token 有放行 没有跳到login

router.beforeEach(function(to, from, next) {
  // console.log(to.path)
  // const urls = ['/user', '/edit']
  // includes() 方法用于判断字符串是否包含指定的子字符串。如果找到匹配的字符串则返回 true，否则返回 false。
  if (to.path === '/user' || to.path === '/edit') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      // 只有在组件里才用this.$router
      router.push('/login')
    }
  } else {
    next()
  }
})
