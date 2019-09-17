<template>
  <div class="searchv">
    <div class="fix">
      <div class="header">
        <i class="icon iconfont iconzuo1"  @click="returnLeft"></i>
        <div class="frame">
          <i class="icon iconfont iconsousuo"></i>
          <input type="text" placeholder="景点/城市" class="text">
        </div>
      </div>
    </div>
    <div class="content">
      <h3 class="bt">热门搜索</h3>
      <ul class="itemul">
        <li v-for="(item,index) in popularData" class="item"  :keys="index">
          <router-link to="/tour" class="link">
            {{item}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      popularData:[
        "常州恐龙园",
        "嬉戏谷",
        "天目湖",
        "南山竹海",
        "长隆度假区",
        "东方盐湖城",
        "灵山大佛",
      ],
    }
  },
  created(){
    
  },
  methods:{
    returnLeft(){
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="stylus"  rel="stylesheet/stylus" scoped>
  .searchv
    height:100%
    background:#fff
    .fix 
      position:fixed
      top:0 
      left:0 
      width:100%
      height:40px
      background:#fff
      .header
        position:relative
        display:flex
        .icon
          position: absolute
          top: 10px
          left: 5px
          height: 30px
          width: 35px
          z-index: 500
          line-height: 30px
          text-align: center
          color: #000
          font-weight: 550
          font-size: 22px
        .frame
          flex:1 
          position:relative
          margin:10px 20px 0px 40px 
          height: 28px
          padding: 0 8px 0 12px
          overflow:hidden
          border-radius: 30px
          color: #333
          background-color: #eeeef5
          .icon
            position: absolute
            top: 6px
            left: 8px
            font-size: 18px
            color: #000
            font-weight: 500
            line-height: 18px
            text-align: left
          .text
            width:100%
            height: 16px
            margin: 6px 0
            padding-left: 20px
            line-height: 18px
            color: #333
            background-color: #eeeef5
            caret-color: #5d80f4
            font-size:14px 
            color:#999
    .content
      margin:40px 0 10px 0
      padding:14px 12px 20px 12px
      .bt
        font-size: 15px
        color: #333
        font-weight: 700
        line-height: initial
        margin: 10px 0
      .itemul
        overflow: hidden;
        max-height: 80px;
        .item
          float: left
          background: #f6f6fa
          border-radius: 5px
          height: 30px
          padding: 0 8px
          margin: 0 10px 10px 0
          max-width: 100% 
          .link
            width:100%
            height:100%
            font-size: 13px
            display: inline-flex
            justify-content: center
            align-items: center
            line-height: initial
            color: #333
</style>

