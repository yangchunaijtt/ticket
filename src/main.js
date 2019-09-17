// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/common/stylus/index.styl"
import axios from 'axios';
import QS from 'qs'
import utils from "./common/js/urlGet.js" //获取url参数

// vue-awesome-swiper轮播图插件使用
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
Vue.config.productionTip = false
Vue.prototype.$utils = utils; //注册全局方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
