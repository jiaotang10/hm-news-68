import Vue from 'vue'

// 引入全局组件
import newsHeader from '../components/news-header.vue'
import newsLogo from '../components/news-logo.vue'
import newsNav from '../components/news-nav.vue'
import newsNewList from '../components/news-newList.vue'
import newsComment from '../components/news-comment.vue'
import newsDigui from '../components/news-digui.vue'

// 全局注册组件
Vue.component('newsHeader', newsHeader)
Vue.component('newsLogo', newsLogo)
Vue.component('newsNav', newsNav)
Vue.component('newsNewList', newsNewList)
Vue.component('newsComment', newsComment)
Vue.component('newsDigui', newsDigui)
