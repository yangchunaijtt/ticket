<template>
  <div class="index">
    
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
import { Toast } from "vant";

// import "https://webapi.amap.com/maps?v=1.4.11&key=5eeab4fb86fdb2ea40bb70b720de1927";


import https from "../../https.js"
import Cookies from  "../../utils/cookie.js"

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
      // 城市定位
      map: null,
      aaaaa:"",
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
  // 
  beforeRouteEnter(to,from,next){
    Toast.loading({ duration: 0, forbidClick: true, message: "加载中...." });

    function ajaxData(cityname){
      
      Toast.loading({ duration: 0, forbidClick: true, message: "获取门票中." });
      index_url_data.placeCity = cityname;
    
      Cookies.set("cityname",cityname);
      console.log(cityname);
      console.log("index_url_data",index_url_data);
      https.fetchPost(index_url,index_url_data ).then((data) => {
          // console.log("取到数据",data,data.status);
            if ( data.status == ERR_OK ) {
              // this.goodList = data.data.data
              next ( vm => {
                Toast.clear();
                vm.goodList = data.data.data;
                vm.iscityname= cityname;
              }) 
            }else{
              console.log("发送错误",data.status);
            }
            Toast.clear();
        }).catch( err=> {
                console.log("发生错误",err)
                Toast.clear();
            }
      );
    };
   
     function getLocation() {
       let cityname = '';
      return  new Promise((resolve, reject) => {
        console.log("cityname",Cookies.get("cityname"));
        let cookieCityName = Cookies.get("cityname");
        if ( cookieCityName != undefined ||  cookieCityName != null ) {
          cityname = cookieCityName;
          ajaxData(cityname);
        }else {
            Toast.loading({ duration: 0, forbidClick: true, message: "定位中.." });
            // sessionStorage中没有缓存，则开始定位
            AMap.service(['AMap.Geolocation'], () => {
              const geolocation = new AMap.Geolocation({
                enableHighAccuracy: false, //是否使用高精度定位，默认:true
                timeout: 5000 //超过5秒后停止定位，默认：无穷大
              })
              //  获取位置信息
              geolocation.getCurrentPosition()
              // 获取位置信息完成触发事件
              AMap.event.addListener(geolocation, 'complete', function onComplete(data) {
                if (data.addressComponent) {
                  
                  Toast.clear();
                  cityname = data.addressComponent.city.split("市")[0];
                  Cookies.set("cityname",cityname);
                  // 发送ajax
                  ajaxData(cityname);

                  console.log('位置从定位中得到', data.addressComponent)
                  // 获取定位之后，存入sessionStorage中
                
                  resolve(data.addressComponent)
                } else {
                  console.log('定位失败')
                  reject('Opps，未获取到您的位置信息！')
                  // 
                  cityname = "常州"
                  Cookies.set("cityname",cityname);
                  // 发送ajax
                  ajaxData(cityname);
                  
                }
              })
              // 获取位置信息失败触发事件
              AMap.event.addListener(geolocation, 'error', function onComplete(
                data
              ) {
                Toast.clear();
                // 不行，则默认设置为常州
                cityname= "常州"
                Cookies.set("cityname",cityname);
                // 发送ajax
                ajaxData(cityname);
                
                console.log('定位失败')
                reject('Opps，未获取到您的位置信息！')
              })
            })
        }
        
      }) 
    };
    // 使用
     getLocation();
  
   
  },
  created(){
    
    // 读取存储的城市名
    // 定位城市
    // let cityname =  this.getLocation();
    // console.log("cityname",cityname);
  // this.getLocation();
  
    // if (this.$cookies.isKey("cityname")) {
    //   this.iscityname = this.$cookies.get("cityname")
    // }else {
    //   this.iscityname = "常州"
    //   this.$cookies.set("cityname",this.iscityname);
    // }
    // // console.log(this.iscityname);
    // this.ajaxData(this.iscityname);
    
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
      
      Toast.loading({ duration: 0, forbidClick: true, message: "获取门票中." });
      index_url_data.placeCity = cityname;
      this.iscityname = cityname;
      this.$cookies.set("cityname",this.iscityname);
      console.log(cityname);
      console.log("index_url_data",index_url_data);
      https.fetchPost(index_url,index_url_data ).then((data) => {
          // console.log("取到数据",data,data.status);
            if ( data.status == ERR_OK ) {
              this.goodList = data.data.data
              console.log("得到数据",this.goodList);
            }else{
              console.log("发送错误",data.status);
            }
            Toast.clear();
        }).catch( err=> {
                console.log("发生错误",err)
                Toast.clear();
            }
      );
    },
    getLocation() {
      
      return  new Promise((resolve, reject) => {
        let cityname = '';
        Toast.loading({ duration: 0, forbidClick: true, message: "定位中.." });
        // sessionStorage中没有缓存，则开始定位
        AMap.service(['AMap.Geolocation'], () => {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: false, //是否使用高精度定位，默认:true
            timeout: 5000 //超过5秒后停止定位，默认：无穷大
          })
          //  获取位置信息
          geolocation.getCurrentPosition()
          // 获取位置信息完成触发事件
          AMap.event.addListener(geolocation, 'complete', function onComplete(data) {
            if (data.addressComponent) {
              
              Toast.clear();
              cityname = data.addressComponent.city.split("市")[0];
              // 发送ajax
              ajaxData(cityname);

              console.log('位置从定位中得到', data.addressComponent)
              // 获取定位之后，存入sessionStorage中
             
              resolve(data.addressComponent)
            } else {
              console.log('定位失败')
              reject('Opps，未获取到您的位置信息！')
              // 
              cityname = "常州"
              this.$cookies.set("cityname","常州");
              // 发送ajax
              ajaxData(cityname);
              
            }
          })
          // 获取位置信息失败触发事件
          AMap.event.addListener(geolocation, 'error', function onComplete(
            data
          ) {
            Toast.clear();
            // 不行，则默认设置为常州
            cityname= "常州"
            this.$cookies.set("cityname",cityname);
            // 发送ajax
            ajaxData(cityname);
            
            console.log('定位失败')
            reject('Opps，未获取到您的位置信息！')
          })
        })
      
          
        
      }) 
    },
  },
  components:{
    'v-header':header,
    "must-play":mustPlay,
    "screen":screen,
    "popular":popular,
    choiceCity,
  },
  
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .index
    width:100%
</style>


