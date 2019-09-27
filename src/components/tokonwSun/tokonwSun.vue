<template>
  <div class="view">
    <!-- 头部切换部分 -->
    <div class="switch">
      <span class="span" @click="toReserve" :class="showPage=='reserve'?'yes':'no'">预订须知</span>
      <span class="span" @click="toIntroduce" :class="showPage=='introduce'?'yes':'no'">景区介绍</span>
    </div>
    <!-- 预定须知部分内容 -->
    <div class="reserve" v-show="showPage=='reserve'">
      <div class="header">
        预订须知
      </div>
      <div class="top">
        <div class="item">
          <h2>开放时间</h2>
          <p>
            {{tosunData.openTime instanceof Array?tosunData.openTime[0].openTimeInfo?tosunData.openTime[0].openTimeInfo:"":tosunData.openTime.openTimeInfo?tosunData.openTime.openTimeInfo:""}}，
            营业时间：
            {{tosunData.openTime instanceof Array?tosunData.openTime[0].sightStart:tosunData.openTime.sightStart}}-{{tosunData.openTime instanceof Array?tosunData.openTime[0].sightEnd:tosunData.openTime.sightEnd}}。
            <span v-show="tosunData.openTime instanceof Array?tosunData.openTime[1]?tosunData.openTime[1]:false:tosunData.openTime?tosunData.openTime:false">
              {{tosunData.openTime instanceof Array?tosunData.openTime[1].openTimeInfo?tosunData.openTime[1].openTimeInfo:'':tosunData.openTime.openTimeInfo?tosunData.openTime.openTimeInfo:''}}，
              营业时间：
              {{tosunData.openTime instanceof Array?tosunData.openTime[1].sightStart:tosunData.openTime.sightStart}}
              -{{tosunData.openTime instanceof Array?tosunData.openTime[1].sightEnd:tosunData.openTime.sightEnd}}。
            </span>
          </p>
          <h2>免票政策</h2>
          <p v-show="tosunData.bookingInfo.freePolicy?tosunData.bookingInfo.freePolicy:false">
            {{tosunData.bookingInfo.freePolicy}}
          </p>
          <h2>优惠人群</h2>
          <p>
            {{tosunData.bookingInfo.offerCrowd?tosunData.bookingInfo.offerCrowd:''}}
          </p>
          <h2>说明</h2>
          <p>
            {{tosunData.bookingInfo.explanation?tosunData.bookingInfo.explanation:""}}
          </p>

        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <h2>开具发票</h2>
          <p>景区规定统一</p>
        </div>
        <div class="item">
          <h2>入园须知</h2>
          <p>景区规定统一</p>
        </div>
        <div class="item">
          <h2>温馨提示</h2>
          <p>景区规定统一</p>
        </div>
        <div class="item">
          <h2>交通信息</h2>
          <p>景区规定统一</p>
        </div>
      </div>
    </div>
    <!-- 景区介绍部分 -->
    <div class="introduce"  v-show="showPage==='introduce'">
      <div class="header">
        景区介绍
      </div>
      <div class="itemdiv">
        <div class="initem" v-for="(item, index) in tosunData.playAttractions.playAttraction" :keys="index">
          <h2 class="name">{{item.playName}}</h2>
          <p class="text">
            {{item.playInfo}}
          </p>
          <div class="images"  v-for="(imgitem, index) in item.playImages.url" :keys="index" >
            <img v-lazy="imgitem" class="img" width="100%">
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    tosunData:{
      type:Object,
      default:{},
    },
  },
  data(){
    return {
      showPage:"reserve",
    }
  },
  methods:{
    toReserve(){
      this.showPage = "reserve";
    },
    toIntroduce(){
      this.showPage = "introduce";
    },
    // 监控数据
    
  },
  created(){

  },
  mounted(){

  },
}
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
  .view
    position:relative
    top:38px 
    left:0
    width:100%
    .switch
      position:fixed
      top:45px 
      left:0
      width:100% 
      height:35px 
      line-height:35px
      background:#fff 
      .span 
        display:inline-block
        width:50%
        float:left
        text-align:center
        color:#333
        height:100%
        text-align:center
        font-size:15px
        border-bottom:1px solid #999
      .yes 
        border-bottom:2px solid red
      .no 
        border-bottom:none 
    .reserve 
      position:relative
      margin-top:56px 
      padding: 0 15px 15px
      background:#fff
      .header 
        padding: 10px 0
        font-size: 17px
        color:#333
        font-weight: 600
        border-bottom: 1px solid #ddd
      .top 
        text-align: left
        padding: 10px
        .item
          margin-bottom: 5px
          font-size: 12px
          h2 
            padding:5px 0
            font-weight:600 
            color:#333
            font-size:14px
          p 
            padding:5px 0
            font-size: 13px
            color: #666
      .bottom
        text-align: left
        padding: 10px
        .item
          margin-bottom: 5px
          font-size: 12px
          h2 
            padding:5px 0
            font-weight:600 
            color:#333
            font-size:14px
          p 
            padding:5px 0
            font-size: 13px
            color: #666
    .introduce
      position:relative
      margin-top:56px 
      padding: 0 15px 15px
      padding-bottom:20px
      background:#fff
      .header
        padding: 10px 0
        font-size: 17px
        color:#333
        font-weight: 600
        border-bottom: 1px solid #ddd
      .itemdiv
        // 
        .initem
          // 
          .name
            position: relative
            padding-left: 9px
            padding-top: 12px
            padding-bottom: 2px
            font-size: 14px
            font-weight: 600
            color: #333
            line-height: 18px
          .text
            margin-top:6px
            padding-bottom: 2px
            padding-left: 9px
            font-size: 12px
            color: #666
            line-height: 18px
          .images
              padding:0 10px
            .img
              margin-top: 5px
              border-radius: 4px
</style>
