<template>
  <div class="index">
    <v-header></v-header>
    <screen></screen>
    <must-play :goodList="goodList"></must-play>
    <popular :goodList="goodList"></popular>
  </div>
</template>

<script>
import header from "@/components/headers/headers.vue"
import mustPlay from "@/components/mustPlay/mustPlay.vue"
import screen from "@/components/screen/screen.vue"
import popular from "@/components/popular/popular.vue"

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
     goodList:{},
    }
  },
  created(){
    // console.log(index_url_data);
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
  mounted(){
    
  },
  methods:{
   
  },
  components:{
    'v-header':header,
    "must-play":mustPlay,
    "screen":screen,
    "popular":popular,
  }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .index
    width:100%
</style>


