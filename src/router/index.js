import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/userEdit.vue'
import Follow from '../views/Follow.vue'
import Comment from '../views/Comment.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: UserEdit, name: 'edit' },
  { path: '/follow', component: Follow, name: 'follow' },
  { path: '/comment', component: Comment, name: 'comment' }
]

const router = new VueRouter({
  routes
})

export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
