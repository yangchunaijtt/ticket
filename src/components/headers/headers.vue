<template>
  <div class="headers">
    <div class="bannner"></div>
    <div class="content"  :class="isScroll?'isscroll':'noscroll'">
      <div class="center clearfix">
        <div class="icon">
          <i class="iconfont iconzuo1"></i>
        </div>
        <div class="select">
          <router-link to="/city"   class="tocity" >
            <span class="cityname">常州</span>
            <i class="iconfont iconxiala-"></i>
          </router-link>
          <div class="head-txt">
            <span class="search iconfont iconsousuo">
            </span>
            <input type="text" placeholder="常州恐龙园" class="spotname" @focus="toSearchv">
          </div>
        </div>
        <div class="people">
          <router-link to="/land" v-show="!LoadData.isLoad" class="toload">登陆</router-link>
          <span class="load icon iconfont iconren" v-show="LoadData.isLoad"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    // isScroll:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return{
      LoadData:{
        isLoad:false
      },
      isScroll:false
    }
  },
  created(){

  },
  mounted(){
    // 在headers组件里监听页面body滑动
    window.addEventListener('scroll', this.handleScroll);
  },
  methods:{
    handleScroll(){ 
      // 监控首页滑动的变化
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
      if ( scrollTop > 120) {
        this.isScroll = true ;
        
      }else if ( scrollTop <= 120) {
        this.isScroll = false;
      }
    },
    toSearchv(){
      this.$router.push({path:'/searchv'});
    },
  },  
}
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>

  .headers
    position:relative
    top:0
    left:0
    width:100%
    height: 164px
    overflow:hidden
    .bannner
      width:100%
      height:100%
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url("./banner.png")
    .content
      position:fixed
      top:0
      left:0
      padding:0 6px
      padding-top:5px
      width:100%
      padding-bottom: 6px
      z-index:200
      .center
        display:flex
        padding:0 6px 
        .icon
          float:left
          height: 32px
          line-height: 32px
          text-align: center
          min-width:32px
          i
            display: inline-block
            width: 32px
            height: 32px
            font-size: 24px;
            background-color: transparent
        .select
          flex:1
          display:flex
          float:left
          margin:0 52px 0 6px 
          color: #999
          padding: 0 8px
          height: 32px
          line-height: 32px
          border-radius:18px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          .tocity
            position:relative
            padding: 0px 10px 0px 4px
            position: relative
            min-width: 32px
            max-width: 90px
            font-size: 14px
            color: #19a0f0
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            line-height: 32px
          .tocity:after
              content: ''
              top:10px
              width: 1px
              position: absolute
              right: 0
              height: 15px
              background-color: #d8d8d8
          .head-txt
            flex:1
            position: relative
            font-size: 13px
            padding-left: 7px
            text-align: left
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            .search
              vertical-align: middle
              line-height: 33px
              font-size: 18px
              margin-right: 4px
            .spotname
              position: absolute
              top: 0
              left: 0
              padding: 9px 8px 9px 28px
              height: 32px
              line-height: 14px
              font-size: 14px
              border-radius: 0
              width: 100%
              background: 0 0
              box-sizing: border-box
              white-space: nowrap
              overflow: hidden
              color: #999
              text-overflow: ellipsis
              font-size: 13px
        .people
          position: absolute
          right: 10px
          top: 5px
          min-width: 32px
          padding: 0px 10px
          height: 32px
          line-height: 32px
          .toload
            color: #1d1de0
            font-size: 16px
          .load
            font-size:20px
    .isscroll
      background:#fff 
      border-bottom:1px solid #efecec
      .center 
        .icon
          i 
            color:#333
        .select
          background:#efefef
    .noscroll 
      background:none 
      border-bottom:none
      .center 
        .icon
          i 
            color: #fff
        .select
          background-color: #fff
</style>
