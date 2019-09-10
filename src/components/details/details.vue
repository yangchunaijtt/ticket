<template>
  <div class="details">
    <div class="header">
      <div class="swiper">
        <!-- 轮播图部分 -->
      </div>
      <div class="return">
        <router-link to="" class="icon iconfont iconzuo1"></router-link>
      </div>
    </div>
    <div class="content">
      <div class="viewsport">
        <h2 class="name">{{detailsData.name}}</h2>
        <router-link to="" class="addressName">
          <i class="location iconfont iconlocation"></i>
          <span class="address">{{detailsData.address}}</span>
          <i class="return iconfont iconyou3"></i>
        </router-link>
        <div class="toknow">
          <div class="reserve">
            <h4 class="title">景区须知</h4>
            <p class="tell">开放时间、免票政策</p>
            <i class="return iconfont iconyou3"></i>
          </div>
          <div class="introduce">
            <h4 class="title">景区介绍</h4>
            <p class="tell">好玩项目先知道</p>
            <i class="return iconfont iconyou3"></i>
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
        <router-link to="/toknow" class="toknowLink">查看全部介绍</router-link>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      detailsData:{
        name:"常州恐龙园",
        address:"江苏省常州市新北区环球恐龙城河海东路60号",
      },
      tell:{
        notice:"9:00-17:00（09月-12月，其他时间按当季营业时间为准）",
        sellFly:"a. 1.2米（不含）以下的儿童免票。b. 70周岁（含）以上的老人（凭有效身份证件）免票。c. 现役军人、残疾人、记者（凭有效身份证件）免票。* 以上信息仅供参考，具体以景区当日信息为准。",
      }
    }
  },
  components:{

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
        width:100%
        height:216px
      .return 
        position:absolute
        left:10px 
        top:10px 
        width: 38px
        height: 38px
        border-radius: 19px
        background-color:rgba(66, 65, 65, 0.4)
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
          .reserve,.introduce          
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
        height:150px
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
