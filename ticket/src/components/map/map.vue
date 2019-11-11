<template>
  <div class="amap" ref="amap">
    <div class="header">
      <i class="returnleft iconfont iconzuo" @click="returnleft"></i>
      <span class="text">{{placename}}</span>
    </div>
    <div class="center" :style="{width:'100%',height:rightitemHeight+'px'}">
      <el-amap class="amap-box" vid="contamap" 
        :zoom="zoom"
        :center="center"
        :plugin="plugin"
        :events="events">
         <el-amap-marker vid="marker" 
          :position="center" 
          :label="label"
           >
        </el-amap-marker>
        <el-amap-circle  vid="circle"
          :center="center" 
          :radius="radius" 
          fill-opacity="0.2"
          strokeColor="#38f"
          strokeOpacity="0.8"
          strokeWeight="1"
          fillColor="#38f"
          >
        </el-amap-circle>

      </el-amap>
    </div>
  </div>
</template>

<script>

import AMap from "vue-amap";

import {Toast,} from "vant"


export default {

  name:"amap",
  components:{

  },
   data(){
    let vm = this;
    return {
      place:"", //搜索的地址名
      center:[119.58,31.47],
      lng: 0,
      lat: 0,
      loaded:false,
      zoom:13,
      label:{
        content:this.placename,
        offset:[10,12]
      },
      radius:100,
      plugin: [
        {
          pName: 'ToolBar',//工具条插件
          position:'LB',
        },
        {
          pName: 'MapType',//卫星与地图切换
          defaultType: 0,
          showTraffic:true,//实时交通图层
        },
        {
          pName:'OverView',
          //isOpen:true//鹰眼是否打开
        },
        {
          pName:'Scale'
        },
      ],
      events: {
        init(contamap) {
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
            city: "全国"
          });
          geocoder.getLocation(vm.place, (status, result) => {
            if (status === "complete" && result.geocodes.length) {
              let lnglat = result.geocodes[0].location
              vm.lng = lnglat.lng;
              vm.lat = lnglat.lat;
              vm.center = [vm.lng, vm.lat];
            }
          });
        }
      },
    };
  },
  created(){
    this.place = this.$utils.getUrlKey("place");
  },
  computed:{
    rightitemHeight(){
      return document.body.offsetHeight - 45;
    },
    placename(){
      //江苏省常州市新北区环球恐龙城河海东路60号
      let placename = this.place;
      if (  placename.indexOf("江苏省") !== -1) {
         placename = this.place.replace("江苏省","");
      }
       if ( placename.indexOf("常州市") !== -1 ) {
        placename =  placename.replace('常州市',"");
      }
       if (  placename.indexOf("区") !== -1 ){
        placename = placename.split("区")[1];
      }

      return placename;
    },
  },
  methods:{
    // 返回上一页 
    returnleft(){
      this.$router.go(-1);
    },
    // 其他
    addRadius(){
      this.radius+=10;
    },
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
  .amap
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
        overflow: hidden
        text-overflow:ellipsis
        white-space: nowrap
        text-indent:0
    .center
      padding-top:45px 
</style>
