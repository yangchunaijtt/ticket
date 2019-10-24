<template>
  <div class="rec-item" @click="gotodetails">
    <router-link :to="{path:'/details',query:{id:recommendpro.id}}" class="itemA">
      <div class="center">
        <img v-lazy="recommendpro.images[0]" width="100" class="img">
        <div class="today">今日订</div>
        <div class="words">
          <p class="name">{{recommendpro.productName}}</p>
          <div class="label" :class="recommendpro.productTheme[0]?'':'noboder'">{{recommendpro.productTheme[0]?recommendpro.productTheme[0]:""}}</div>
          <p class="dgree">95%</p>
          <div class="price">￥{{recommendpro.minPrice}}起</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { Card } from "vant";
export default {
  name: "recommendpro",
  props:{
    recommendpro:{
      type:Object,
      default:{}
    },
  },
  data() {
    return {
      imageURL:
        "https://pics.lvjs.com.cn/pics//uploads/pc/place2/2016-08-23/d816fb18-a02d-45c9-84d7-08acc0e33bdd_480_320.jpg"
    };
  },
  components: {
    "van-card": Card
  },
  props: {
    recommendpro: {
      type: Object
    }
  },
  mounted() {
    // console.log("产品信息", this.recommendpro);
  },
  methods: {
    
    getimgShow(imgs){
      const count=imgs.length;
      if(count==0){
        return ''
      }else {
        // const num=(Math.random()*(count-1)).toFixed(0);
        // console.log("随机的数",num);
       return imgs[(new Date()).getDate()%(count-1)];

        // return imgs[num];
      }
    },
    gotodetails() {
     
      this.$router.push({
        name: "details",
        query: {
          id: this.recommendpro.id
        }
      });
    }
  }
};
</script>

<style lang="scss" lang="stylus" rel="stylesheet/stylus" scoped>
  .rec-item
    position:relative
    padding:15px 10px 
    border-bottom:1px solid #e0dfdf
    .itemA
      display:block 
      width:100% 
      height:100%
      .center
        display:flex
        width:100% 
        height:100%
        .img
          position:relative
          flex:0 0 100px
          overflow:hidden
          margin-right:10px
          height:100px 
          border-radius:6px 
        .today
          // background-image: linear-gradient("90deg,#FFB800 0,#F90 100%")
          position: absolute
          top: 15px 
          left: 10px
          padding: 8px 4px 7px 
          background:#FFB800
          color: #fff
          text-align: center
          font-size: 11px
          border-bottom-right-radius: 6px
          line-height: 1px 
        .words
          flex:1
          .name
            font-size: 16px
            line-height: 18px
            max-height: 18px
            color:#777
            font-weight:500
            overflow: hidden
            text-overflow: ellipsis
            -webkit-box-orient: vertical
            word-break: break-all
          .label
            display: inline-flex
            margin:8px 0
            padding: 9px 3px 7px
            justify-content: center
            align-items: center
            -webkit-text-size-adjust: none
            color: #F80
            font-size: 11px
            line-height: 1px
            text-align: center
            color: #5CA2F8
            border: 1px solid #ADD0FB
            border-radius:2px
          .noboder
            border:none
          .dgree
            margin:6px 0
            font-size: 16px
            color: #5CA2F8;
          .price
            position:absolute 
            right:15px 
            top:50%
            color:#FF5A68
            font-size:16px
            font-weight:500
</style>
