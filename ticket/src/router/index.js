import Vue from 'vue'
import Router from 'vue-router'

import Cookie from "vue-cookies";
import {
  howtogo
} from '../utils/agencytool';


// 下面是引入的模板
import index from "@/components/index/index"
import land  from "@/components/land/login"
import details  from "@/components/details/details"
import tour  from "@/components/tour/tour"
import toknow from "@/components/toknow/toknow"
import searchv from "@/components/searchv/searchv"
import order from "@/components/order/order"
import orderlist from "@/components/orderlist/orderlist"
import orderdetails from "@/components/orderdetails/orderdetails"
import ordertime from "@/components/ordertime/ordertime"
import pay from "@/components/pay/pay.vue"
import map from "@/components/map/map.vue"

Vue.use(Router)

const router = new Router({
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
      path:"/orderlist",
      name:"orderlist",
      component:orderlist
    },
    {
      path:"/orderdetails",
      name:"orderdetails",
      component:orderdetails
    },
    {
      path:"/ordertime",
      name:"ordertime",
      component:ordertime
    },
    {
      path: "/pay",
      name: "pay",
      component: pay
    },
    {
      path:"/map",
      name:'map',
      component:map
    },
  ]
})


router.beforeEach((to, from, next) => {
  console.log("全局路由守卫to", to);
  console.log("全局路由守卫from", from);
  // window.scroll(0, 0);
  const torouter = to.name;
  const secret = Cookie.get("usersecret");
  const gdmobileusername = Cookie.get("gdmobileusername");
  const gdmobileuserphone = Cookie.get("gdmobileuserphone");
  const USERIDGDLY = Cookie.get("USERIDGDLY");
  const userid = Cookie.get("userid");

  // agency = localStorage.getItem('agency')
  let agency = to.query.uid || userid || localStorage.getItem("agency"); //代理;
  console.log('agency')
  if (agency !== '' && typeof agency !== 'undefined' && agency !== localStorage.getItem('agency')) {
    localStorage.setItem("agency", agency);
  }

  switch (torouter) {
    case "order": //needlogin
    case "orderlist": //needlogin
    case "orderdetails": //needlogin
    case "pay": //needlogin
      console.log("needtologin");
      if (secret && gdmobileusername && gdmobileuserphone) {
        howtogo(router, to, agency, next);
      } else {
        next("/land");
        // alert('登陆');
      }
      break;
    default:
      howtogo(router, to, agency, next);
      break;
  }
});

export default router;