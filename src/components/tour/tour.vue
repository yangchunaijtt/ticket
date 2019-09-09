<template>
  <div class="tour">
    <div class="header">
      <div class="search">
        <router-link to="/index" class="icon iconfont iconzuo1"></router-link>
        <div class="frame">
          <i class="icon iconfont iconsousuo"></i>
          <input type="text" placeholder="常州" class="input">
        </div>
      </div>
      <div class="label">
        <ul class="labelul">
          <div class="slide">
            <li class="item"    v-for="(item, index) in label" >
              {{item}}
            </li> 
          </div>        
        </ul>
        <div class="drop">
          <i class="icon iconfont iconxiala-"></i>
        </div>
        <div class="all" v-show="false">
          <ul class="allof">
            <li class="item"   v-for="(item, index) in label"  >
              <div class="itemdiv">
                {{item}}
                <i class="icon iconfont icondui"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="select">
          <div class="all">
            综合排序
            <i class="icon iconfont icondui"></i>
          </div>
          <div class="money">
            价格
            <i class="icon iconfont iconxiangxia"></i>
          </div>
      </div>
    </div>
    <div class="content">
      <ul class="ul">
        <li class="item"    v-for="(item, index) in tourData" >
          <div class="center">
            <img :src="item.img" width="100" class="img">
            <div class="today">今日订</div>
            <div class="words">
              <p class="name">{{item.name}}</p>
              <div class="label">{{item.label}}</div>
              <p class="dgree">{{item.degree}}%</p>
              <div class="price">￥{{item.price}}起</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
       tourData:[
        {
          "name": "常州恐龙园",
          "img": "https://pics.lvjs.com.cn//uploads/pc/place2/2017-04-27/50a7584d-ea39-46e3-bbc7-340f9f566513_480_320.jpg",
          "price": 24,
          "label":"主题公园",
          "degree":"95"
        },
        {
          "name": "常州恐龙园",
          "img": "https://pics.lvjs.com.cn//uploads/pc/place2/2017-04-27/50a7584d-ea39-46e3-bbc7-340f9f566513_480_320.jpg",
          "price": 24,
          "label":"主题公园",
          "degree":"95"
        },
        {
          "name": "常州恐龙园",
          "img": "https://pics.lvjs.com.cn//uploads/pc/place2/2017-04-27/50a7584d-ea39-46e3-bbc7-340f9f566513_480_320.jpg",
          "price": 24,
          "label":"主题公园",
          "degree":"95"
        },
        {
          "name": "常州恐龙园",
          "img": "https://pics.lvjs.com.cn//uploads/pc/place2/2017-04-27/50a7584d-ea39-46e3-bbc7-340f9f566513_480_320.jpg",
          "price": 24,
          "label":"主题公园",
          "degree":"95"
        },
        {
          "name": "常州恐龙园",
          "img": "https://pics.lvjs.com.cn//uploads/pc/place2/2017-04-27/50a7584d-ea39-46e3-bbc7-340f9f566513_480_320.jpg",
          "price": 24,
          "label":"主题公园",
          "degree":"95"
        },
        {
          "name": "常州恐龙园",
          "img": "https://pics.lvjs.com.cn//uploads/pc/place2/2017-04-27/50a7584d-ea39-46e3-bbc7-340f9f566513_480_320.jpg",
          "price": 24,
          "label":"主题公园",
          "degree":"95"
        },
        {
          "name": "常州恐龙园",
          "img": "https://pics.lvjs.com.cn//uploads/pc/place2/2017-04-27/50a7584d-ea39-46e3-bbc7-340f9f566513_480_320.jpg",
          "price": 24,
          "label":"主题公园",
          "degree":"95"
        },
      ],
      label:[
        "主题公园",
        "动植物园",
        "温泉",
        "团队拓展",
        "漂流戏水",
        "田园度假",
        "园林景观",
        "民俗风情",
        "湖光山色",
        "人文艺术",
      ],
    }
  },
  created(){

  },
  methods:{

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .tour
    background:#fff 
    .header
      position:fixed
      top:0
      left:0 
      width:100%
      z-index:200
      box-shadow:#ddd 0 0 6px 0
      background:#fff
      .search
        display:flex
        position:relative
        width:100%
        .icon
          position: absolute
          top: 11px
          left: 5px
          height: 30px
          width: 35px
          line-height:30px 
          font-size:26px
          text-align:center
          font-weight: 580
          color: #555
        .frame
          flex:1
          position: relative
          display:inline-block
          padding: 10px 14px 11px 0
          overflow: hidden
          margin-left: 40px
          background: #fff  
          .icon
            position: absolute
            font-size: 18px
            left: 10px
            top: 10px
            line-height: 30px
          .input
            width:100%
            height:30px
            line-height:30px
            border-radius:100px 
            background:#F6F6FA
            text-indent:40px
            color:#333
            font-size:15px
      .label
        display:flex
        position:relative
        width:100% 
        border-bottom: 1px solid #e0dfdf
        .labelul
          flex:1
          padding:0 14px
          width:100% 
          overflow:hidden
          height:40px 
          line-height:40px
          .slide
            display:felx 
            width:800px 
            overflow:hidden 
            .item
              display:inline-block
              float:left
              flex:1
              margin-right:20px 
              text-align:center
              font-size:13px 
              color:#333
        .drop
          width:35px 
          display:inline-block 
          heihgt:40px 
          line-height:40px 
          text-align:center
          .icon
            font-size:16px 
            color:#000 
            font-weight:bold
        .all
          position:absolute 
          top:40px 
          left:0 
          width:100%
          z-index:300
          background:#fff
          .allof
            overflow:hidden
            margin:14px 0 0 14px 
            .item
              width:25%
              float:left
              .itemdiv
                position: relative
                height: 36px
                margin: 0 14px 14px 0 
                text-align: center
                border-radius: 2px
                line-height: 36px
                color: #666
                background: #f5f5f5
                font-size: 12px
                .icon
                  position: absolute
                  width: 14px
                  right: 0
                  bottom: 0
                  font-size: 12px
                  line-height: 14px
                  text-align: center
                  border-width: 8px;
                  border-color: #f80 transparent transparent #f80
                  border-radius: 2px
      .select
        width:100%
        display:flex
        height:30px 
        line-height:30px 
        font-size:14px
        color:#333
        text-align:center
        .all
          width:50%
          float:left
          border-right:1px solid #e0dfdf
          .icon 
            //
        .money
          flex:1
          float:right
          .icon 
            // 
    .content
      position:relative
      top:122px
      left:0 
      margin-top:4px
      width:100%
      .ul
        background:#fff
        .item
          position:relative
          padding:15px 10px 
          border-bottom:1px solid #e0dfdf
          .center
            display:flex
            width:100% 
            height:100%
            .img
              position:relative
              flex:0 0 100px
              overflow:hidden
              margin-right:10px
              height:100px 
              border-radius:6px 
            .today
              // background-image: linear-gradient("90deg,#FFB800 0,#F90 100%")
              position: absolute
              top: 15px 
              left: 10px
              padding: 8px 4px 7px 
              background:#FFB800
              color: #fff
              text-align: center
              font-size: 11px
              border-bottom-right-radius: 6px
              line-height: 1px 
            .words
              flex:1
              .name
                font-size: 16px
                line-height: 18px
                max-height: 18px
                color:#777
                font-weight:500
                overflow: hidden
                text-overflow: ellipsis
                -webkit-box-orient: vertical
                word-break: break-all
              .label
                display: inline-flex
                margin:8px 0
                padding: 9px 3px 7px
                justify-content: center
                align-items: center
                -webkit-text-size-adjust: none
                color: #F80
                font-size: 11px
                line-height: 1px
                text-align: center
                color: #5CA2F8
                border: 1px solid #ADD0FB
                border-radius:2px
              .dgree
                margin:6px 0
                font-size: 16px
                color: #5CA2F8;
              .price
                position:absolute 
                right:15px 
                top:50%
                color:#FF5A68
                font-size:16px
                font-weight:500
</style>
