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
        <booking :goodsList="this.detailsGetData.goodsList"></booking>
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

    <!-- 点击每个预定须知时弹开的，预订须知部分 -->
    <transition name ="fade">
      <div class="notes" v-show="shownotes" v-if="noticesData" >
        <div class="close" @click="closeNotes">
          <i class="closeicon iconfont iconcuo"></i>
        </div>
        <div class="notesdiv">
          <div class="testtext">
            <div class="div">
              <h3 class="name">费用包含</h3>
              <p class="text">{{noticesData.costInclude}}</p>
            </div>
            <div class="div">
              <h3 class="name">费用不包含</h3>
              <p class="text">{{noticesData.costNoInclude?noticesData.costNoInclude:""}}</p>
            </div>
            <div class="div">
              <h3 class="name">预定时间</h3>
              <p class="text">{{noticesData.passTimeLimit}}</p>
            </div>
            <div class="div">
              <h3 class="name">入园须知</h3>
              <p class="text">入园时间：{{noticesData.notice.enterLimit.limitTime}}</p>
              <p class="text">入园地点：{{noticesData.notice.getTicketPlace}}</p>
              <p class="text">取票时间:{{noticesData.notice.getTicketTime?noticesData.notice.getTicketTime:""}}</p>
              <p class="text">取票地点:{{noticesData.notice.getTicketPlace}}</p>
              <p class="text">入园方式：{{noticesData.notice.ways}}</p>
            </div>
            <div class="div">
              <h3 class="name">重要提示</h3>
              <p v-if="noticesData.notice.effectiveDesc" class="text">游玩时间：{{noticesData.notice.effectiveDesc?noticesData.notice.effectiveDesc:""}}</p>
              <p class="text">提示：{{noticesData.importantNotice}}</p>
            </div>
            <div class="div">
              <h3 class="name">退票规则</h3>
              <p class="text">{{noticesData.refundRuleNotice}}</p>
            </div>
            <div class="div">
              <h3 class="name">改期规则</h3>
              <p class="text">本商品一经过预订不支持改期（可退款的商品可申请退款后重新下单）</p>
            </div>
          </div>
          <div class="buy">
            <div class="buyleft">
              <span class="nowMPrice">原价：￥{{noticesData.nowMPrice}}</span>
              <span class="nowPrice">在线付：￥{{noticesData.nowPrice}}</span>
            </div>
            <div class="buyright" @click="resserve(noticesData)">
              立即预定
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

// 引入vue的轮播图插件：vue-awesome-swiper
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

import booking from "../booking/booking"
// 请求部分配置和引入
import https from "../../https.js"

// 参数
const ERR_OK = 200;
const details_url ="http://58.216.175.118:86/api/LvmamaScenicTickets/ProductLocalInfos/GetProductInfos/";

const notice_ok = 200;
const notice_url = "http://58.216.175.118:86/api/LvmamaScenicTickets/GoodsLocalInfos/GetGoodsInfos/";


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
        },

      },
      // 给booking传递的值
      bookingGoodsList:{
        "children":[],        
      },
      // 显示预订须知主要部分
      shownotes:false,
      noticesData:{},
      //
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

          // console.log(this.detailsGetData.goodsList);

        }else {
          console.log("details页ajax出现问题",data.status)
        }
       
    }).catch(err=>{
            console.log("details页ajax出现问题",err)
        }
    );
    // 默认的预订须知提示
     https.fetchGet(notice_url +"1825",{} ).then((data) => {
        if (  data.status === notice_ok) {
          this.noticesData = data.data.data;
          
        }else {
          this.shownotes  = false;
          console.log("details页预订须知ajax出现问题",data)
        }
       
      }).catch(err=>{
          this.shownotes  = false;
              console.log("details页预订须知ajax出现问题",err)
          }
      );
  },
  methods:{
    returnLeft(){   // 返回上一页
       this.$router.go(-1);
    },
    //子组件点击向负组件提示值,并显示预订须知的内容，发送ajax内容。
    noticeAjax(data){
      // console.log("父组件",data,notice_url);
      https.fetchGet(notice_url +data,{} ).then((data) => {
        if (  data.status === notice_ok) {
          this.noticesData = data.data.data;
          this.shownotes  = true;
          console.log(this.noticesData);
        }else {
          this.shownotes  = false;
          console.log("details页预订须知ajax出现问题",data)
        }
       
      }).catch(err=>{
          this.shownotes  = false;
              console.log("details页预订须知ajax出现问题",err)
          }
      );
    },
    // 关闭预定须知
    closeNotes(){
      this.shownotes = false;
    },
    // 去订单填写页
    toOrder(data){

    },
    // 预定调整到详情页组件
    resserve(data){
      // let orderData = 
      // console.log(this.detailsGetData,"预定",data);
      console.log("门票的信息", this.detailsGetData.productId);
      console.log("门票的信息", this.detailsGetData.goodsId);

      // 先要判断下登录还是未登录
      // if () {

      // }else {

      // }
      this.$router.push({
        name: "order",
        query: {
          id: data.id,
          goodsid: data.goodsId,
          product: this.detailsGetData.productId
        }
      });
    }
  },
  components:{
    swiper, 
    swiperSlide,
    booking,
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .details
    width:100% 
    position:relative
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
            margin-right:1%
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
      margin-top:12px 
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
    .notes
      position:fixed 
      top:0 
      left:0 
      width:100% 
      height:100% 
      z-index:300
      overflow:auto
      transition: all 0.5s
      background: rgba(7,17,27,.8)
      backdrop-filter:blur(10px)
      &.fade-enter-active, &.fade-leave-active
        opacity: 1
        background: rgba(7,17,27,0.8)
      &.fade-enter, &.fade-leave-to 
        opacity: 0
        background: rgba(7,17,27,0) 
      .close
        position: relative
        top: 0
        left: 0
        width: 100%
        height: 10%
        padding-top: 10%
        .closeicon
          display: block
          width: 100%
          line-height:40px 
          margin: 0 auto
          font-size: 30px
          color: #fff
          text-align:center
      .notesdiv
        // box-sizing: border-box
        padding: 20px
        padding-bottom:70px 
        border-radius:20px 20px 0px 0px 
        height:80%
        overflow-y:scroll
        background:#fff
        .testtext
          width:100% 
          height:100%
          .div
            padding: 10px 0
            border-bottom: 1px solid #ddd
            .name
              font-size: 13px
              color: #333
              margin-bottom: 3px
              font-weight: 600
            .text
              margin: 3px 0
              font-size: 12px
              color: #666
              line-height: 12px
              position: relative
        .buy 
          position:fixed
          display:flex
          bottom:0px 
          left:0px 
          width:100% 
          height:60px 
          line-height:60px 
          z-index:100 
          background:#fff
          .buyleft
            flex:1
            .nowMPrice
              float:left 
              width:40%
              color: #999
              font-size: 12px
              text-align:center
              overflow:hidden
              
            .nowPrice
              float:left 
              width:60%
              font-size:14px 
              color:#f44
              text-align:center
              overflow:hidden
          .buyright
            width:110px 
            font-size:16px 
            color: #fff
            background-color: #f44
            border: 1px solid #f44
            text-align:center
</style>
