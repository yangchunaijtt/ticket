<template>
  <div class="details">
    <div class="header">
      <div class="swiper" width="250">
        <!-- 轮播图部分 -->
        <swiper :options="swiperOption" class="swiper-wrap"  ref="mySwiper" v-if="banner.length!=0">
          <swiper-slide v-for="(item,index) in banner" :key="index" class="item">
            <img v-lazy="item"  class="bannerimg"/>
          </swiper-slide>
          <!-- 常见的小圆点 -->
          <div class="swiper-pagination"  v-for="(item,index) in banner" :key="index" slot="pagination" ></div>
        </swiper>
      </div>
      <router-link to="/index" class="return">
        <i class="icon iconfont iconzuo1"></i>
      </router-link>
    </div>
    <div class="content">
      <div class="viewsport">
        <h2 class="name">{{detailsGetData.productName}}</h2>
        <router-link to="" class="addressName">
          <i class="location iconfont iconlocation"></i>
          <span class="address">{{detailsGetData.scenicInfos.placeToAddr?detailsGetData.scenicInfos.placeToAddr:""}}</span>
          <i class="return iconfont iconyou3"></i>
        </router-link>
        <div class="toknow">
          <div class="reserve">
            <router-link :to="{path:'/toknow',query:{id:searchId}}" class="reserveurl">
              <h4 class="title">景区须知</h4>
              <p class="tell">开放时间、免票政策</p>
              <i class="return iconfont iconyou3"></i>
            </router-link>
          </div>
          <div class="introduce">
            <router-link :to="{path:'/toknow',query:{id:searchId}}" class="introduceurl"> 
              <h4 class="title">景区介绍</h4>
              <p class="tell">好玩项目先知道</p>
              <i class="return iconfont iconyou3"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="booking">
      <div class="item">
        <!-- 使用钱组件部分 -->
      </div>
    </div>
    <div class="telldiv">
      <h3 class="bt">景区须知</h3>
      <div class="top">
        <div class="notice">
          <div class="hd">
            <i class="icon  iconfont icontishi3"></i>
            <h2 class="redPoint">开放时间</h2>
          </div>
          <p class="noticeDesc">
            {{tell.notice}}
          </p>
        </div>
        <div class="sellFly">
          <div class="hd">
            <i class="icon  iconfont icontishi3"></i>
            <h2 class="redPoint">免费政策</h2>
          </div>
          <p class="noticeDesc">
            {{tell.sellFly}}
          </p>
        </div>
      </div>
      <div class="notice-all">
        <span class="Include">包括</span>
        <div class="textclude">
          <div class="item">
            <i class="careful iconfont icontishi3"></i>
            <span class="box">开放时间</span>
          </div>
          <div class="item">
            <i class="careful iconfont icontishi3"></i>
            <span class="box">免票政策</span>
          </div>
          <div class="item">
            <i class="careful iconfont icontishi3"></i>
            <span class="box">优惠人群</span>
          </div>
          <div class="item">
            <i class="careful iconfont icontishi3"></i>
            <span class="box">开具发票</span>
          </div>
          <div class="item">
            <i class="careful iconfont icontishi3"></i>
            <span class="box">入园须知</span>
          </div>
          <div class="item">
            <i class="careful iconfont icontishi3"></i>
            <span class="box">温馨提示</span>
          </div>
          <div class="item">
            <i class="careful iconfont icontishi3"></i>
            <span class="box">安全须知</span>
          </div>
        </div>
      </div> 
      <div class="to_toknow">
        <router-link :to="{path:'/toknow',query:{id:searchId}}" class="toknowLink">查看全部介绍</router-link>
      </div> 
    </div>
  </div>
</template>
<script>

// 引入vue的轮播图插件：vue-awesome-swiper
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

// 请求部分配置和引入
import https from "../../https.js"

// 参数
const ERR_OK = 200;
const details_url ="http://58.216.175.118:86/api/LvmamaScenicTickets/ProductLocalInfos/GetProductInfos/";

export default {
  data() {
    const that = this;
    return {
      // 模拟参数
      tell:{
        notice:"9:00-17:00（09月-12月，其他时间按当季营业时间为准）",
        sellFly:"a. 1.2米（不含）以下的儿童免票。b. 70周岁（含）以上的老人（凭有效身份证件）免票。c. 现役军人、残疾人、记者（凭有效身份证件）免票。* 以上信息仅供参考，具体以景区当日信息为准。",
      },
      // 组件中需要用到参数
      searchId:0,
      detailsGetData:{}, //ajax获取到的数据存储地方
      banner:[],
      // 轮播图插件配置部分
      imgIndex: 1,
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: false
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        grabCursor: true,
        on: {
          //滑动之后回调函数
          slideChangeTransitionStart: function() {
            /* realIndex为滚动到当前的slide索引值 */
            that.imgIndex= this.realIndex - 1;
          },
        },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      }
    };
  },
  created(){
    this.searchId = this.$utils.getUrlKey("id");
    // console.log(this.searchId);
    // details的请求
    https.fetchGet(details_url + this.searchId,{} ).then((data) => {
        // console.log(data);
        if ( data.status == ERR_OK ) {
          this.detailsGetData = data.data.data;
          // 赋值图片
          this.banner = this.detailsGetData.images.image
          console.log(this.detailsGetData);
        }else {
          console.log("details页ajax出现问题",data.status)
        }
       
    }).catch(err=>{
            console.log("details页ajax出现问题",err)
        }
    );
  },
  methods:{
    returnLeft(){   // 返回上一页
       this.$router.go(-1);
    },
  },
  components:{
    swiper, 
    swiperSlide,
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .details
    width:100% 
    .header
      position:relative
      background:#928c8c
      .swiper
        position:relative
        z-index:50
        width:100%
        height:250px
        overflow:hidden
        .swiper-wrap
          height:236px
        .item
          width:100%
          height:100%
          overflow:hidden
          .bannerimg
            width:100%
            height:100%
        .swiper-pagination
          z-index:300 
          .swiper-pagination-bullet
            height:10px!important
            width:10px !important
            background:#fff!important
          .swiper-pagination-bullet-active
            background:#666!important
      .return 
        position:absolute
        left:10px 
        top:10px 
        width: 38px
        height: 38px
        z-index:200
        border-radius: 19px
        background-color:rgba(66, 65, 65, 0.8)
        .icon 
          display:block
          width:100% 
          height:100%
          font-size: 28px
          text-align: center
          line-height: 38px
          color:#fff
    .content
      position:relative
      border-top-left-radius: 10px
      border-top-right-radius: 10px
      margin-top: -22px
      margin-bottom: 10px
      background:#fff 
      z-index:200
      .viewsport
        width:100%
        height:100%
        .name
          padding:15px 15px 0
          height: auto
          font-size: 20px
          line-height: 22px
          color: #333
          font-weight: 600
          overflow: initial
          white-space: inherit
          text-overflow: initial
        .addressName
          display:block
          padding-left: 30px
          max-width: 100%
          padding-top: 10px
          padding-right: 25px
          font-size: 13px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          line-height: 20px
          color:#666
          .location
            width: 11px
            height: 14px
          .address
            color:#555
          .return
            font-weight:550
        .toknow
          height: 60px
          padding: 4px 15px 6px 15px 
          margin-top: 6px
          overflow: hidden
          .reserve,.introduce
            position: relative
            width: 46%
            float: left
            border-radius: 3px
            height: 40px
            padding-top: 10px
            padding-left: 10px
            overflow:hidden
            background: #F7F7FB
          .reserve
            margin-right:2%
            .reserveurl,.introduceurl 
              display:block 
              width:100% 
              height:100%
          .reserveurl,.introduceurl         
            .title
              padding: 0
              font-size: 13px
              line-height: 13px
              color: #333
            .tell
              padding-top:6px
              font-size: 11px
              color: #999
              line-height: 11px
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden
            .return
              position:absolute
              top:50%
              right:10px 
              margin-top:-9px
              font-size:18px
              font-weight:550 
    .telldiv
      background:#fff
      .bt
        padding: 11px 15px 0
        font-size: 16px
        color: #333
        line-height: 16px
        background-color: #fff
        font-weight: 700
      .top
        height:160px
        overflow: hidden
        margin-bottom: 18px
        padding:15px
        padding-top:6px
        .notice,.sellFly
          margin: 0
          padding: 5px 10px
        .notice,.sellFly
          .hd
            font-size: 14px
            color: #333
            line-height: 14px
            padding-top: 5px
            padding-bottom: 5px
            .icon
              display:inline-block
              font-size:13px
            .redPoint
              display:inline-block
          .noticeDesc
            // white-space: pre-wrap
            position: relative
            padding-left: 20px
            line-height: 18px
            font-size: 12px
            color: #666 
      .notice-all
        position:relative
        margin:10px 15px 24px
        -webkit-border-image: url("data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7") 2 stretch;
        border-style: solid;
        border-width: 1px 0 0;
        color:#333
        .Include
          color: #999
          background-color: #fff
          padding: 0 10px
          font-size: 12px
          line-height: 18px
          height: 18px
          position: absolute
          top: -10px
          left: 50%
          -webkit-transform: translateX(-50%)
          transform: translateX(-50%)
        .textclude
          margin-top: 4px
          overflow: hidden;
          .item
            width: 32%;
            float: left
            color: #333
            font-size: 14px
            line-height: 14px
            margin-top: 15px
            margin-left: 1%
            text-align:left
            .careful
              font-size:13px 
              color:#999
            .box
              // 
      .to_toknow
        height: 50px
        line-height: 30px
        text-align: center
        background: #fff
        .toknowLink
          display: inline-block
          position: relative
          width: 146px
          height: 30px
          z-index: 1
          font-size: 13px
          line-height: 30px
          color: #5CA2F8
          border: 1px solid #5CA2F8
          box-sizing: border-box
          border-radius: 40px
</style>
