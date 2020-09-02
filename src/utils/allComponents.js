import Vue from 'vue'

// 引入全局组件
import newsHeader from '../components/news-header.vue'
import newsLogo from '../components/news-logo.vue'
import newsNav from '../components/news-nav.vue'

// 全局注册组件
Vue.component('newsHeader', newsHeader)
Vue.component('newsLogo', newsLogo)
Vue.component('newsNav', newsNav)
