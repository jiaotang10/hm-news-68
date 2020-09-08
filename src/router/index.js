// vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。
//
// 使用vue-router的步骤
// 1.安装 yarn add vue-router
// 2.引入 vue 和 vuerouter文件

// 7.引入（提供）对应的组件
// 8.在App.vue里配置路由的显示出口，来确定组件的显示位置
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/userEdit.vue'
import Follow from '../views/user/Follow.vue'
import Comment from '../views/user/Comment.vue'
import MyStar from '../views/user/MyStar.vue'
import Index from '../views/news/Index.vue'
import Manage from '../views/news/Manage.vue'
import Article from '../views/news/Article.vue'
import Search from '../views/news/Search.vue'

// 3.使用vue的插件vuerouter
Vue.use(VueRouter)

// 6.配置路由规则
const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: UserEdit, name: 'edit' },
  { path: '/follow', component: Follow, name: 'follow' },
  { path: '/comment', component: Comment, name: 'comment' },
  { path: '/mystar', component: MyStar, name: 'mystar' },
  { path: '/index', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/article/:id', component: Article, name: 'article' },
  { path: '/search', component: Search, name: 'search' }
]

// 4.创建路由对象
// 5.关联路由和vue实例
const router = new VueRouter({
  routes
})

// 配置全局的导航守卫
// 判断 to的地址是否是去user
// 若不是去user 直接放行
// 若去user 得验证token 有放行 没有跳到login

router.beforeEach(function(to, from, next) {
  // console.log(to.path)
  // const urls = ['/user', '/edit']
  // includes() 方法用于判断字符串是否包含指定的子字符串。如果找到匹配的字符串则返回 true，否则返回 false。
  if (to.path === '/user' || to.path === '/edit' || to.path === '/follow' || to.path === '/comment') {
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

export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
