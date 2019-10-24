// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/common/stylus/index.styl"
import axios from 'axios';
import QS from 'qs'
import utils from "./common/js/urlGet.js" //获取url参数
import VueTouch from 'vue-touch'
// 使用minui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 懒加载插件
import VueLazyload from "vue-lazyload"
// vue-awesome-swiper轮播图插件使用
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
// 使用vue-cookies插件
import VueCookies from 'vue-cookies'

// 使用vue-mobile-calendar时间
import Calendar from 'vue-mobile-calendar'

import Icon from 'vue-svg-icon/Icon.vue'

// 调用自己写的js文件
import checkpone from "./utils/checkphone.js"



Vue.use(VueCookies)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
// 使用懒加载
Vue.use(VueLazyload);
Vue.use(VueLazyload,{
  error:"./common/img/error.jpg",
  loading:'./common/img/loading_1.gif'
})
// vue左右滑动插件
Vue.use(VueTouch, {name: 'v-touch'})

Vue.component('icon', Icon)



Vue.use(MintUI);

Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
Vue.config.productionTip = false
Vue.prototype.$utils = utils; //注册全局方法
Vue.use(checkpone);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
