<template>
  <div class="tour">
    <div class="blockpage" @click="closeblock" v-show="blockShow"></div>
    <div class="header">
      <div class="search">
        <router-link to="/index" class="icon iconfont iconzuo1"></router-link>
        <div class="frame">
          <i class="icon iconfont iconsousuo"></i>
          <input type="text" placeholder="常州" class="input" @focus="toSearchv" :value="searchName">
        </div>
      </div>
      <div class="label">
        <ul class="labelul">
          <div class="slide">
            <li class="item"    v-for="(item, index) in label_c" :keys="index"  @click="sortTitle(item.title)" :class="currentfilter==item.title?'isclose':'noclose'">
              {{item.title}}
            </li> 
          </div>        
        </ul>
        <div class="drop"  @click="showAll">
          <i class="icon iconfont" :class="isShowAll?'iconshangla':'iconxiala-'"></i>
        </div>
        <transition name="labelAll">
          <div class="all" v-show="isShowAll">
            
              <ul class="allof">
                <li class="item"   v-for="(item, index) in label"   :keys="index" >
                  <div class="itemdiv" @click="sortTitle(item.title)" :class="currentfilter==item.title?'divclose':'divno'">
                    {{item.title}}
                  </div>
                </li>
              </ul>
           
          </div>
        </transition>
      </div>
      <div class="select">
          <div class="all" :class="isSort==='all'?'isall':'noall'" @click="isall">
            综合排序
            <i class="icon iconfont icondui" v-show="isSort==='all'"></i>
          </div>
          <div class="money" :class="isSort!='all'?'ismoney':'nomoney'" @click="ismoney">
            价格
            <i class="icon iconfont" :class="isSort==='all'?'iconxiangxia':isSort==='xia'?'iconxiangxia':'iconxiangshang'"></i>
            
          </div>
      </div>
    </div>
    <div class="content">
      <ul class="ul">
        <li class="item"    v-for="(item, index) in productList_c?productList_c:[]" >
          <router-link :to="{path:'/details',query:{id:item.id}}" class="itemA">
            <div class="center">
              <img v-lazy="item.images[0]" width="100" class="img">
              <div class="today">今日订</div>
              <div class="words">
                <p class="name">{{item.productName}}</p>
                <div class="label" :class="item.productTheme[0]?'':'noboder'">{{item.productTheme[0]?item.productTheme[0]:""}}</div>
                <p class="dgree">95%</p>
                <div class="price">￥{{item.minPrice}}起</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

// 请求部分配置和引入
import https from "../../https.js"
import _findeindex from 'lodash/findIndex'
import {Toast} from "vant"

// 参数
const ERR_OK = 200;
const tour_url ="http://58.216.175.118:86/api/LvmamaScenicTickets/ProductLocalInfos/GetProductInfosList";
const tour_data = {
  keyName: "",
  hasPrice: true,
  pageIndex: 1,
  productStatus: 1,
  pageSize: 6
};

export default {
  
  data(){
    return {
      tourSearchData:{},
      blockShow:false,
      currentfilter: "不限",
      currenttheme: 0,
      label:[
        {
          title:'不限',
          choose:true
        },{
          title:'主题乐园',
          choose:false
        },{
          title:'湖光山色',
          choose:false
        },{
          title:'温泉',
          choose:false
        },
        {
          title:'宗教祈福',
          choose:false
        },{
          title:'民俗风情',
          choose:false
        },{
          title:'动植物园',
          choose:false
        },
        {
          title:'田园度假',
          choose:false
        },

        { 
          title:'都市观光',
          choose:false
        },
        { 
          title:'古迹遗址',
          choose:false
        },
        { 
        title:'园林景观',
        choose:false
        },
        { 
        title:'团队拓展',
        choose:false
        },
        { 
        title:'滑雪',
        choose:false
        },
        { 
        title:'人文艺术',
        choose:false
        },
      ],
      isShowAll:false,  // 是否显示所有筛选
      isSort:"all",   // 排序的方式：all xia shang
      searchName:"",
    }
  },
  created(){
    Toast.loading({ duration: 0, forbidClick: true, message: "加载中.请稍候" });
    this.searchName = this.$utils.getUrlKey("search");
    tour_data.keyName = this.searchName;
    https.fetchPost(tour_url,tour_data ).then((data) => {
          // console.log("取到数据",data);
          if ( data.status == ERR_OK ) {
            this.tourSearchData = data.data.data
            console.log("tour的数据",this.tourSearchData);
          }else{
            console.log("发送错误",data.status);
          }
          Toast.clear();
      }).catch( err=> {
              console.log("tour组件ajax发生错误",err)
              Toast.clear();
          }
      );
  },
  methods:{
    closeblock(){
      this.blockShow = false;
    },
    toSearchv(){
       this.$router.push({path:'/searchv'});
    },
    showAll(){
      this.isShowAll = !this.isShowAll;
      if (this.isShowAll) {
        this.blockShow = true;
      }else {
        this.blockShow = false;
      }
    },
    isall(){
      this.isSort = "all";
    },
    // 点击排序的操作
    ismoney(){
      if (  this.isSort ==='xia' ) {
        this.isSort = "shang";
      }else if (  this.isSort ==='shang') {
          this.isSort = "xia";
      }else if (this.isSort ==='all') {
        if ( this.isSort ==='xia' ) {
            this.isSort = "shang";
        }else {
          this.isSort = "xia";
        }
      }
      // 判断对数据进行操作
      if ( this.isSort =="xia" ){
        this.tourSearchData.productInfos.sort(function(a,b){
            return b.minPrice-a.minPrice
        })
      }else if ( this.isSort =="shang" ){
        this.tourSearchData.productInfos.sort(function(a,b){
          return a.minPrice  -b.minPrice
        })
      }else if ( this.isSort =="all" ) {
        this.tourSearchData.productInfos.sort(function(a,b){
          return a.id  -b.id
        })
      }
    },
    // 点击筛选类型的操作
    sortTitle(value){
    
      this.isShowAll = false;
      this.blockShow = false;
      this.currentfilter = value;
    }
  },
  computed:{
     productList_c() {
      if (this.currentfilter == "不限") {
        return this.tourSearchData.productInfos;
      } else {
        return this.tourSearchData.productInfos.filter(item => {
          return _findeindex(item.productTheme,theme=>{
            // console.log(theme);
            return theme===this.currentfilter;
          })!==-1;
          // return  item.productTheme.indexOf(this.currentfilter) !== -1;
        });
      }
    },
    label_c(){
      return this.label.slice(0,8);
    },
  },
  beforeRouteEnter (to, from, next) {
    // ...
    next ( vm =>{

    })
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .tour
    background:#fff 
    .blockpage
      position:fixed
      top:0 
      left:0 
      width:100%
      z-index: 1
      height:100%
      background-color: rgba(0, 0, 0, 0.5)
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
        background:#fff
        .labelul
          flex:1
          padding:0 14px
          width:100% 
          overflow-x: auto
          overflow-y:hidden
          height:40px 
          line-height:40px
          .slide
            display:felx 
            overflow:hidden 
            width:524px
            .item
              display:inline-block
              float:left
              flex:1
              margin-right:20px 
              text-align:center
              font-size:13px 
              color:#333
              &.isclose
                color:orange
              &.noclose 
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
          border: 1px solid #e2dfdf
          border-left: none
          border-right: none
          // &.labelAll-enter-active, &.labelAll-leave-active 
          //   transition: all 0.3s 
          // &.labelAll-enter
          //   transform: translate3d(0, 40%, 0);
          // &.labelAll-leave-active
          //   transform: translate3d(0, 20%, 0);
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
                border:1px solid #f5f5f5
                font-size: 12px
                &.divclose 
                  border-color:#1296db
                &.divno 
                  border-color:#f5f5f5
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
        .isall
          color:#ff8800
        .noall 
          color:#333
          .icon 
            //
        .money
          flex:1
          float:right
        .ismoney 
          color:#ff8800
        .nomoney 
          color:#333
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
          .itemA
            display:block 
            width:100% 
            height:100%
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
                .noboder
                  border:none
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
