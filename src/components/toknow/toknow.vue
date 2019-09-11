<template>
  <div class="tour">
    <div class="header">
      <div class="headerdiv">
        <router-link to="/details" class="return iconfont iconzuo1"></router-link>
        景区须知
      </div>
    </div>
    <div class="content">
      <router-link to="/toknow/reserve" class="link">
        <span class="span"  :class="clickClass==='reserve'?'yes':'no'" @click="toReserve">预订须知</span>
      </router-link>
      <router-link to="/toknow/introduce" class="link">
        <span  class="span" :class="clickClass==='introduce'?'yes':'no'" @click="toIntroduce">景区介绍</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return{
      clickClass:"reserve",
    }
  },
  methods:{
    toReserve(){
      this.clickClass = "reserve";
    },
    toIntroduce(){
      this.clickClass = "introduce";
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .header
    position:fixed
    top:0 
    left:0 
    width:100% 
    .headerdiv
      position:relative
      height:35px 
      padding:5px 4px
      line-height:35px 
      background:#fff
      text-align:center 
      color:#333
      overflow:hidden
      font-size:20px
      .return
        display:block
        position:absolute
        left:14px 
        top:4px 
        line-height:41px
        font-size:28px 
        font-weight:550px 
        color:#666
  .content
    margin-top:45px 
    padding:0
    height:35px 
    line-height:35px 
    background:#fff
    .link
      display:inline-block
      width:50%
      float:left
      text-align:center
      color:#333
      .span 
        display:block 
        margin: 0 auto
        max-width:80px 
        height:100%
        text-align:center
      .yes 
        border-bottom:2px solid red
      .no 
        border-bottom:none 
</style>
