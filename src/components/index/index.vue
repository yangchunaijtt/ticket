<template>
  <div class="index">
    <div id="container" height="0" width="0"></div>
    <v-header :iscityname="iscityname" :isLogin="isLogin" :uid="uid"></v-header>
    <screen   :iscityname="iscityname"></screen>
    <must-play :goodList="goodList"  :iscityname="iscityname"></must-play>
    <popular :goodList="goodList"   :iscityname="iscityname"></popular>
    <!-- 城市选择组件 -->
    <choiceCity v-show="showCity" ></choiceCity>
  </div>
</template>

<script>
import header from "@/components/headers/headers.vue"
import mustPlay from "@/components/mustPlay/mustPlay.vue"
import screen from "@/components/screen/screen.vue"
import popular from "@/components/popular/popular.vue"
import choiceCity from "@/components/choiceCity/choiceCity.vue"


// import { isLogin, getToken } from "../../utils/login.js";
// 请求部分配置和引入
import https from "../../https.js"

const ERR_OK = 200;
const index_url =  "http://58.216.175.118:86/api/LvmamaScenicTickets/ProductLocalInfos/GetProductInfosList";
let index_url_data ={
  placeCity: '',
  hasPrice: true,
  pageIndex: 1,
  productStatus: 1,
  pageSize: 10
};

export default {
  data(){
    return {
     goodList:{},
      //  城市选择
      showCity:false,
      // 城市名
      iscityname:"",
    }
  },
  computed:{
    isLogin(){
      const userid=this.$cookies.get("USERIDGDLY");
      const WHERE=this.$cookies.get("WHERE");
      const gdmobileusername=this.$cookies.get("gdmobileusername");
      const gdmobileuserphone=this.$cookies.get("gdmobileuserphone");
      const usersecret=this.$cookies.get("usersecret");
      if(userid==null||userid==""){
        console.log("userid")
        return false;
      }
      if(gdmobileusername==null||gdmobileusername==""){
        console.log("gdmobileusername")

        return false;
      }
      if(gdmobileuserphone==null||gdmobileuserphone==""){
        return false;
      }
      if(usersecret==null||usersecret==""){
        return false;
      }
      return true; 
    },
     getToken(){
       return `?token=${this.$cookies.get("USERIDGDLY")}|${this.$cookies.get(
        "usersecret"
      )}|${this.$cookies.get("gdmobileuserphone")}|${this.$cookies.get("WHERE")}`
    },
    uid(){
      const userid=this.$cookies.get("userid");
      if(userid==null||userid==""){
        console.log("userid")
        return "";
      }else {
        return userid;
      }
    },
  },
  created(){
    
    // 读取存储的城市名
    
    if (this.$cookies.isKey("cityname")) {
      this.iscityname = this.$cookies.get("cityname")
    }else {
      this.iscityname = "常州"
      this.$cookies.set("cityname",this.iscityname);
    }
    // console.log(this.iscityname);
    this.ajaxData(this.iscityname);

    // 初始化定位效果
    // 地图的初始化
    this.chartBus_amap();
  },
  mounted(){
    
  },
  methods:{
    // 其他
    showCityClick(){
      this.showCity = !this.showCity;
    },
    // 发送取数据
    ajaxData(cityname){
      
    
      index_url_data.placeCity = cityname;
      this.iscityname = cityname;
      this.$cookies.set("cityname",this.iscityname);
      console.log(cityname);
      console.log("index_url_data",index_url_data);
      https.fetchPost(index_url,index_url_data ).then((data) => {
          // console.log("取到数据",data,data.status);
            if ( data.status == ERR_OK ) {
              this.goodList = data.data.data
              console.log(this.goodList);
            }else{
              console.log("发送错误",data.status);
            }
        }).catch( err=> {
                console.log("发生错误",err)
            }
      );
    },
    // 定位效果，定位功能
    chartBus_amap(){
        let getLocation = (onComplete=function(){},onError=function(){})=>{
          var map = new AMap.Map('aMap', {
              resizeEnable: true,
              zoom: 16
            }),
            geolocation = null,
            geocoder = null

          // 加载地理位置编码插件
          AMap.service('AMap.Geocoder', function() { //回调函数
            //实例化Geocoder
            geocoder = new AMap.Geocoder({
              city: "010" //城市，默认：“全国”
            });
            //TODO: 使用geocoder 对象完成相关功能
          });
          // 加载定位插件
          map.plugin('AMap.Geolocation', function() {
            // 初始化定位插件
            geolocation = new AMap.Geolocation({
              enableHighAccuracy: true, //是否使用高精度定位，默认:true
              timeout: 10000, //超过10秒后停止定位，默认：无穷大
              maximumAge: 0, //定位结果缓存0毫秒，默认：0
              convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true, //显示定位按钮，默认：true
              buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
              buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            // 把定位插件加入地图实例
            map.addControl(geolocation);

            // 添加地图全局定位事件
            AMap.event.addListener(geolocation, 'complete', function(date){
              console.log("成功",data);
            }); //返回定位信息
            AMap.event.addListener(geolocation, 'error', function(err){
              console.log(err);
            }); //返回定位出错信息

            // 调用定位
            geolocation.getCurrentPosition();
          });
        }
      // getLocation();

    },
  },
  components:{
    'v-header':header,
    "must-play":mustPlay,
    "screen":screen,
    "popular":popular,
    choiceCity,
  }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .index
    width:100%
</style>


