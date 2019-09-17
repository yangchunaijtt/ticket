<template>
  <div class="popular">
    <div class="title">
      <span class="text">热门景点</span>
      <router-link class="to" :to="{path:'/tour',query:{search:'常州'}}">
        附近景点
        <i class="icon iconfont iconyou3"></i>
      </router-link>
    </div>
    <ul class="content">
      <li class="item"   v-for="(item, index) in goodList.productInfos" >
        <router-link :to="{path:'/details',query:{id:item.id}}">
          <div class="center">
            <img :src="item.images[0]" width="100" class="img">
            <div class="today"></div>
            <div class="words">
              <p class="name">{{item.productName}}</p>
              <div class="label">{{item.productTheme[0]}}</div>
              <p class="dgree">98%满意度</p>
              <div class="price">￥{{item.minPrice}}起</div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <router-link :to='{path:"/tour",query:{search:"常州"}}' class="bottom">
      更多常州景点
    </router-link>
  </div>
</template>
<script>
export default {
  props:{
    goodList:{
      type:Object,
      default:{}
    }
  },
  data(){
    return {
     
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .popular
    margin:10px 0
    padding:0 10px 
    background:#fff
    .title
      height:30px 
      line-height:30px 
      font-size:12px     
      .text
        float:left
      .to
        display:inline-block
        float:right
        font-size:12px 
    .content 
      display:block
      .item 
        display:block
        margin:0 10px 
        padding:10px 0
        border-style: solid
        border-width: 0 0 1px
        -webkit-border-image: url("data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7") 2 stretch
        .center
          display:flex
          position:relative
          width:100%
          .img
            display:inline-block
            width:95px 
            height:77px
          .today
            position:absolute
            top:0
            left:0
            background: url("//pics.lvjs.com.cn/mobile/coding/v750/ticket/img/sign2.png") no-repeat
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
            width: 45px
            height:15px
          .words
            position:relative
            flex:1
            padding-left:12px
            .name
              height: 22px;
              line-height: 22px
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden
              font-size: 14px
              color: #333
              font-weight:600
            .label
              width:54px 
              height:12px 
              line-height: 12px
              margin: 6px 4px 10px 1px
              padding: 2px 3px 1px
              border-radius: 3px
              color: #d30775
              overflow:hidden
              white-space: nowrap
              border: 1px solid #d30775
              border-radius: 1px
              font-size:11px 
              text-align:center
            .dgree
              position:absolute
              left:12px
              bottom:6px 
              font-size:13px
              font-weight:550
            .price
              position:absolute
              right:0 
              top:50%
              height:18px 
              line-height:18px 
              margin-top:-9px 
              font-size 16px
              color:#f40
    .bottom
      display:block
      height: 40px
      line-height: 40px
      font-size: 14px
      text-align:center
      color:#666
</style>
