// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//引入store

import "@/common/stylus/index.styl"
import axios from 'axios';
import QS from 'qs'
import utils from "./common/js/urlGet.js" //获取url参数
import VueTouch from 'vue-touch'
import BusPlugin from "./utils/bus";
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


Vue.use(BusPlugin);
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


store.registerModule("vux", {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: "forward"
  },
  mutations: {
    updateDemoPosition(state, payload) {
      state.demoScrollTop = payload.top;
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    },
    updateDirection(state, payload) {
      state.direction = payload.direction;
    }
  },
  actions: {
    updateDemoPosition({ commit }, top) {
      commit({
        type: "updateDemoPosition",
        top: top
      });
    }
  }
});

// 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 高德key
//   key: '5eeab4fb86fdb2ea40bb70b720de1927',
//   // 插件集合 （插件按需引入）
//   plugin: [
//     "AMap.Autocomplete",// 输入提示插件 
//     "AMap.PlaceSearch",// POI搜索插件
//     "AMap.Scale",// 右下角缩略图插件 比例尺
//     "AMap.OverView",// 地图鹰眼插件
//     "AMap.ToolBar",// 地图工具条
//     "AMap.MapType",// 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
//     "AMap.PolyEditor",// 编辑 折线多，边形
//     "AMap.CircleEditor",// 圆形编辑器插件
//     "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
//     "AMap.Geocoder",// 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
//     "AMap.AMapUI",// UI组件
//   ],
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
