<template>
  <transition name ="fade">
  <div class="info">
    <div class="header">
      <span class="title">{{ticketinfo.standardName}}</span>
      <i class="icon iconfont iconcuowu1" @click="fatherClose"></i>
    </div>
    <div class="center"  :style="{'height':scrollHeight+'px'}">
        <div class="scroll-item">
          <p class="details">
            <span>今日票</span>
            <span>今日18：00前可定今日票</span>
          </p>
        </div>
        <div class="scroll-item">
          <h3 class="tit">费用包含</h3>
          <p class="details">
            {{ticketinfo.costInclude?ticketinfo.costInclude:'暂无'}}
          </p>
        </div>
        <div class="scroll-item">
          <h3 class="tit">费用不包含</h3>
          <p class="details">
            暂无
          </p>
        </div>
        <div class="scroll-item">
          <p class="tit">
            入园须知:
          </p>
          <div class="details" v-if="ticketinfo.notice">
            <p v-if="ticketinfo.notice.enterLimit.limitTime">
              <span>入园时间：</span>
              <span>{{ticketinfo.notice.enterLimit.limitTime}}</span>
            </p>
            <p v-if="ticketinfo.visitAddress">
              <span>入园地点：</span>
              <span>
                {{ticketinfo.visitAddress}}
              </span>
            </p>
            <p v-if="ticketinfo.notice.getTicketTime">
              <span>取票时间：</span>
              <span>{{ticketinfo.notice.getTicketTime}}</span>
            </p>
            <p v-if="ticketinfo.notice.ways">
              <span>入园方式：</span>
              <span>{{ticketinfo.notice.ways}}</span>
            </p>
            <p v-if="ticketinfo.notice.effectiveDesc">
              <span>有效期：</span>
              <span>{{ticketinfo.notice.effectiveDesc}}</span>
            </p>
          </div>

        </div>
        <div class="scroll-item">
          <p class="tit">
            重要提示：
          </p>
          <div class="details">
            <p>
              {{ticketinfo.importentPoint}}
            </p>
            <p>
              {{ticketinfo.importantNotice}}
            </p>
          </div>

        </div>
        <div class="scroll-item">
          <p class="tit">
            退票规则
          </p>
          <p class="details">
            {{ticketinfo.refundRuleNotice}}
          </p>

        </div>
      </div>
  </div>
  </transition>
</template>

<script>
export default {
  props:{
    ticketinfo:{
      type:Object,
      // default:{},
      required: true,
    },
    eleHeight:{
      type:Number,
      default:0,
    },
  },
  data(){
    return {

    };
  },
  methods:{
    fatherClose(){
      this.$parent.ticketTest();
    }
  },
  computed:{
    scrollHeight(){
      return document.body.offsetHeight* 0.8 - 30;
    },
  },
  mounted(){
    // console.log("哈哈哈哈",this.ticketInfo);
    
  },
}
</script>

<style  lang="stylus"  rel="stylesheet/stylus" scoped>
  .info
    position:fixed
    bottom:0 
    left:0
    width:100%
    height:80%
    background: #fff 
    z-index:666
    border-top-left-radius: 10px
    border-top-right-radius: 10px
    transition: all 0.5s
    padding-bottom:10px
    &.fade-enter-active, &.fade-leave-active
      opacity: 1
    &.fade-enter, &.fade-leave-to 
      opacity: 0
    .header
      position: relative
      display:flex
      padding-top: 10px
      padding-left: 15px
      padding-right: 15px
      line-height:20px
      .title
        flex:1
        text-align:center
        text-indent:50px
        font-size:15px 
        color:#000
        font-weight:550
      .icon
        width:50px
        text-align:center
        font-size:14px 
    .center
      overflow-y: auto
      padding:10px
      .scroll-item
        padding: 10px 0
        border-bottom: 1px solid #ddd
        .tit
          color:#333
          padding-bottom: 5px
        .details
          font-size: 13px
          p
            font-size: 13px
          
</style>
