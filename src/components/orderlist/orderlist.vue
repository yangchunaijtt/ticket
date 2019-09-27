<template>
  <div class="orderlist">
    <mt-header title="我的订单">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <div class="item">
        
      </div>
    </div>
  </div>
</template>
<script>

import { Header,Field ,Button } from 'mint-ui';
// 请求部分配置和引入
import https from "../../https.js"

const ERR_OK = 200;
const index_url =  "http://58.216.175.118:86/api/LvmamaScenicTickets/ProductLocalInfos/GetProductInfosList";
let index_url_data ={
  placeCity: '常州',
  hasPrice: true,
  pageIndex: 1,
  productStatus: 1,
  pageSize: 10
};


export default {
  data(){
    return {
      orderListData:{}, // 存储我的订单的信息
    }
  },
  methods:{

  },
  created(){

  },
}
</script>
<style  lang="stylus"  rel="stylesheet/stylus" scoped>
  .orderlist
    width:100%
    .header
      box-sizing:border-box
      display:flex 
      position:fixed
      top:0 
      left:0 
      width:100%
      height:46px 
      line-height:46px 
      background:#fff 
      .returnleft
        width:46px 
        text-align:center
        font-size:24px 
        font-weight:550 
        color:#333
      .name 
        flex:1
        text-align:center
        text-indent:-46px
        font-size:20px 
        font-weight:530 
        color:#333
</style>

