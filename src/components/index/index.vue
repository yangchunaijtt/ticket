<template>
  <div class="index">
    <v-header :iscityname="iscityname"></v-header>
    <screen></screen>
    <must-play :goodList="goodList"></must-play>
    <popular :goodList="goodList"></popular>
    <!-- 城市选择组件 -->
    <choiceCity v-show="showCity"></choiceCity>
  </div>
</template>

<script>
import header from "@/components/headers/headers.vue"
import mustPlay from "@/components/mustPlay/mustPlay.vue"
import screen from "@/components/screen/screen.vue"
import popular from "@/components/popular/popular.vue"
import choiceCity from "@/components/choiceCity/choiceCity.vue"

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
  created(){
    // console.log(index_url_data);
    
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
    showCityClick(){
      this.showCity = !this.showCity;
    },
    // 发送取数据
    ajaxData(cityname){
      index_url_data.placeCity = cityname;
      this.iscityname = cityname;
      this.$cookies.set("cityname",this.iscityname);
      console.log(cityname);
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
    }
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


