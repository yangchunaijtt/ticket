<template>
  <div class="tour">
    <div class="header">
      <div class="headerdiv">
        <router-link :to="{path:'/details',query:{id:searchId}}" class="return iconfont iconzuo1" @click="returnLeft"></router-link>
        {{toknowData.productName}}
      </div>
    </div>
    <!-- 动态变化的div容器 -->
    <tokonwSun :tosunData="tosunData"></tokonwSun>
  </div>
</template>
<script>
// 请求部分配置和引入
import https from "../../https.js"

import tokonwSun from "@/components/tokonwSun/tokonwSun.vue"

// 参数
const ERR_OK = 200;
const toknow_url ="http://58.216.175.118:86/api/LvmamaScenicTickets/ProductLocalInfos/GetProductInfos/";


export default {
  data(){
    return{
      clickClass:"reserve",
      toknowData:{},
      searchId:0,
      tosunData:{
        bookingInfo:"",
        playAttractions:"",
        openTime:"",
      }, // 把父组件的数据处理下在给子组件。
    }
  },
  created(){
    this.searchId = this.$utils.getUrlKey("id");
    console.log(this.searchId);
    // console.log(this.searchId);
    // details的请求
    https.fetchGet(toknow_url + this.searchId,{} ).then((data) => {
        // console.log(data);
        if ( data.status == ERR_OK ) {
          this.toknowData = data.data.data;
          // 把给子组件的数据处理下在给子组件
          this.tosunData.bookingInfo = this.toknowData.bookingInfo;
          this.tosunData.playAttractions = this.toknowData.playAttractions;
          
          this.tosunData.openTime = this.toknowData.scenicInfos.openTimes.openTime;
          console.log(this.toknowData);
        }else {
          console.log("toknow页ajax出现问题",data.status)
        }
       
    }).catch(err=>{
            console.log("toknow页ajax出现问题",err)
        }
    );
  },
  methods:{
    returnLeft(){
      // this.$router.go(-1);
    },
  },
  components:{
    tokonwSun,
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .tour 
    position:relative
    width:100% 
    height:100%
    .header
      position:fixed
      top:0 
      left:0 
      width:100% 
      .headerdiv
        position:relative
        height:35px 
        padding:5px 4px
        line-height:35px 
        background:#fff
        text-align:center 
        color:#333
        overflow:hidden
        font-size:20px
        // border-bottom: 2px solid #efefef;
        .return
          display:block
          position:absolute
          left:14px 
          top:4px 
          line-height:41px
          font-size:28px 
          font-weight:550px 
          color:#666
  
</style>
