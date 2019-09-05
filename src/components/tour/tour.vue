<template>
  <div class="tour">
    <div class="header">
      <div class="search">
        <i class="icon iconfont iconzuo1"></i>
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
        <div class="all">
          <ul class="allof">
            <li class="item"   v-for="(item, index) in label"  >
              {{item}}
              <i class="icon iconfont icondui"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="select">
          <div class="all">
            综合排序
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
            <div class="today"></div>
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
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .tour
    // 
    .header
      // 
      .search
        // 
        .icon
          // 
        .frame
          //
          .icon
            // 
          .input
            // 
      .label
        // 
        .labelul
          // 
          .slide
            //  
            .item
              //
        .drop
          // 
          .icon
            // 
        .all
          // 
          .allof
            //
            .item
              // 
              .icon
                //  
      .label
        // 
      .select
        // 
        .all
          // 
        .money
          // 
          .icon 
            // 
    .content
      // 
      .ul
        // 
        .item
          // 
          .center
            // 
            .img
              // 
            .today
              // 
            .words
              // 
              .name
              .label
              .dgree
              .price
                // 
</style>
