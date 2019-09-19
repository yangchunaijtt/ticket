<template>
  <div class="screen">
    <ul class="content">
      <li class="item"   v-for="(item, index) in screenData" >
        <router-link :to="{path:'/tour',query:{search:item.name}}" class="link">
          <img v-lazy="item.img" class="img" width="50" height="50">
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
          name:"境外门票",
          img:"https://pics.lvjs.com.cn/pics/super/2019/04/1555069170_96925.jpg"
        },
        {
          name:"主题公园",
          img:"https://pics.lvjs.com.cn/pics/super/2017/05/1494486580_29997.png"
        },
        {
          name:"动植物园",
          img:"https://pics.lvjs.com.cn/pics/super/2017/05/1494486513_49766.png"
        },
        {
          name:"湖光山色",
          img:"https://pics.lvjs.com.cn/pics/super/2017/05/1494486197_10701.png"
        },
        {
          name:"田园度假",
          img:"https://pics.lvjs.com.cn/pics/super/2017/05/1494487482_34779.jpg"
        }
      ],
      screenArr:[]
    }
  },
  
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

