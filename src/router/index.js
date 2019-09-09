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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect:"/seachv"
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
      component:toknow
    },
    {
      path:"/searchv",
      name:"searchv",
      component:searchv
    }
  ]
})
