<template>
  <div class="screen">
    <ul class="content">
      <li class="item"   v-for="(item, index) in screenData" >
        <router-link to="/tour" class="link">
          <img :src="item.img" class="img" width="50" height="50">
          <div class="name">{{item.name}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      screenData:[
        {
          name:"主体公园",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"动植物园",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"温泉",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"团队拓展",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"漂流戏水",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"田园度假",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"园林景观",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"民俗风情",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"湖光山色",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
        {
          name:"人文艺术",
          img:"https://pages.c-ctrip.com/dm/20190729-iconNEW/D-menpiaowanleNEW.png"
        },
      ]
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .screen
    padding-bottom:10px 
    .content
      display: list-item
      text-align: -webkit-match-parent
      position: relative
      width: 100%
      max-height: 190px
      overflow: hidden
      background: #fff
      padding-bottom:8px 
      .item
        float: left;
        display: block
        width: 20%
        padding-top: 15px
        text-align: center
        .link
          display: block
          width:100%
          height:100% 
          .img 
            width: 43px
            height: 43px
            border-radius: 50%
            background-image: linear-gradient(-70deg,#fc7197 0,#fb515e 100%),linear-gradient(#18a1f1,#18a1f1)
            background-blend-mode: normal,normal
            -webkit-box-shadow: 0 1px 7px 2px rgba(251,87,130,.5)
            box-shadow: 0 1px 7px 2px rgba(251,87,130,.5)
          .name 
            width:100%
            font-size: 13px
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
            padding-top: 5px
            text-align:center
            color:#333
</style>

