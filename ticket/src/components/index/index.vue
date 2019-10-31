<template>
  <div class="index">
    
    <v-header :iscityname="iscityname" :isLogin="isLogin" :uid="uid"></v-header>
    <screen   :iscityname="iscityname"></screen>
    <must-play :goodList="goodList"  :iscityname="iscityname"></must-play>
    <popular :goodList="goodList"   :iscityname="iscityname"></popular>
    <!-- 城市选择组件 -->
    <choiceCity v-show="showCity" ></choiceCity>
    <!-- <div id="iCenter" height="10px" width="100%"></div> -->
  </div>
</template>

<script>
import header from "@/components/headers/headers.vue"
import mustPlay from "@/components/mustPlay/mustPlay.vue"
import screen from "@/components/screen/screen.vue"
import popular from "@/components/popular/popular.vue"
import choiceCity from "@/components/choiceCity/choiceCity.vue"
import { Toast } from "vant";

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
      // 城市定位
      map: null,
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
    // 初始化定位效果
    
    next(vm => {
      
    });
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
              console.log(this.goodList);
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


