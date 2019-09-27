import Vue from 'vue'
import Router from 'vue-router'

// 下面是引入的模板
import index from "@/components/index/index"
import land  from "@/components/land/land"
import details  from "@/components/details/details"
import tour  from "@/components/tour/tour"
import city  from "@/components/city/city"
import toknow from "@/components/toknow/toknow"
import searchv from "@/components/searchv/searchv"
import order from "@/components/order/order"
import time from "@/components/time/time"
import orderlist from "@/components/orderlist/orderlist"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'index',
      component:index
    },
    {
      path: '/land',
      name: 'land',
      component:land
    },
    {
      path: '/details',
      name: 'details',
      component:details
    },
    {
      path: '/tour',
      name: 'tour',
      component:tour
    },
    {
      path: '/city',
      name: 'city',
      component:city
    },
    {
      path:"/toknow",
      name:"toknow",
      component:toknow,
    },
    {
      path:"/searchv",
      name:"searchv",
      component:searchv
    },
    {
      path:"/order",
      name:"order",
      component:order
    },
    {
      path:"/time",
      name:"time",
      component:time
    },
    {
      path:"/orderlist",
      name:"orderlist",
      component:orderlist
    },
  ]
})
