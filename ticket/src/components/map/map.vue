<template>
  <div class="map">
    <div class="header">
      <i class="returnleft iconfont iconzuo" @click="returnleft"></i>
      <span class="text">查看位置</span>
    </div>
    <div class="center" :style="{width:'100%',height:rightitemHeight+'px'}">
      <el-amap  
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        class="amap-demo"
        :events="events">
      </el-amap>
    </div>
  </div>
</template>

<script>

import {Toast,} from "vant"


export default {

  name:"map",
  // props:{
  //   longitude:{ //经度：例：119.997961519
  //     type:Number, 
  //     default:119.58,
  //   },
  //   latitude:{  //纬度 ：例：31.826120601
  //     type:Number, 
  //     default:31.47,
  //   },
  // },
  components:{

  },
   data(){
    const self = this;
    return {
      
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      zoom:13,
      loaded: false,
      plugin: [{
        // 
        events: {
         
        },
      }]
    }
  },
  created(){
    
  },
  computed:{
    rightitemHeight(){
      return document.body.offsetHeight - 45;
    },
  },
  methods:{
    // 返回上一页 
    returnleft(){
      this.$router.go(-1);
    },
    // 其他

  },
  mounted() {
    
    
  },
  beforeRouteEnter (to, from, next) {
    next( vm => {

    })
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .map
    width:100% 
    height:100% 
    .header
      -webkit-box-sizing: border-box
      box-sizing: border-box
      display: -webkit-box
      display: -ms-flexbox
      display: flex
      position: fixed
      z-index:200
      top: 0px
      left: 0px
      width: 100%
      padding: 8px 12px
      height: 45px
      line-height: 30px
      -webkit-box-shadow: 0 0 5px #e8e8e8
      box-shadow: 0 0 5px #e8e8e8
      background: #fff
      border-bottom:1px solid #f5f1f1
      .returnleft
        width: 35px
        float: left
        display: inline-block
        font-size: 30px
        font-weight: 560
      .text 
        -webkit-box-flex: 1
        -ms-flex: 1
        flex: 1
        text-align: center
        text-indent: -35px
        color: #38f
        font-weight: 545
        font-size: 18px
    .center
      padding-top:45px 
</style>
