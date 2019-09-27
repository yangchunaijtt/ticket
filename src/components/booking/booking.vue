<template>
  <div class="tour">
    <div class="center">  
      <div class="type" v-for="(item,index) in ticketclassify(goodsList.goods)" :key="index">
        <div class="goodsdiv" v-show ="item.list.length >0">
          <div class="header">
            <span class="name">{{formatTickettype(item.name)}}</span>
            <i class="pull iconfont"  @click="changeIdns(index)" :class="idns==index?'iconshangla-yuan':'iconxiala-yuan'"></i>
          </div>
          <!-- 下部分下单的地方-->
          <transition name ="fade">
            <div class="item" :class="idns==index?'yes':'no'">
              <div class="itemdiv"  v-for="(priceitem,index) in item.list" :key="index" >
                <div class="top clearfix" >
                  <span class="name">{{priceitem.goodsName}}</span>
                  <div class="price">
                    门市价
                    <span class="nowmprice">{{priceitem.nowMPrice}}</span>
                  </div>
                </div>
                <div class="retreat clearfix">
                  <span class="noretreat">不可退</span>
                  <div class="rightdiv">
                    <span class="low">低至￥</span>
                    <span class="nowprice">{{priceitem.nowPrice}}</span>
                    起
                  </div>
                </div>
                <div class="day clearfix">
                  <span class="time">指定游玩日内有效</span>
                  <span class="reserve">预定</span>
                </div>
                <div class="mustknow clearfix" @click="fatherClick(priceitem.id)">
                  预订须知
                  <i class="konw iconfont iconyou"></i>
                </div> 
              </div>
            </div>
          </transition>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>


export default {
  props:{
    goodsList:{
      type:Object,
      default:{}, 
    }
  },
  data(){
    return {
      idns:null,
    };
  },
  mounted(){
    // console.log(111,this.goodsList);
  },
  methods:{
    fatherClick(data){
      this.$parent.noticeAjax(data);
    },
    // 点击打开隐藏
    changeIdns(data){
      // console.log("点击",data);
      if ( this.idns === data) {
        this.idns = null;
      }else {
        this.idns = data;
      }
      
    },
    // 返回新数据
    formatTickettype(a) {
      switch (a) {
        case "FAMILY":
          return "家庭票";
        case "PARENTAGE":
          return "亲子票";
          break;
        case "LOVER":
          return "情侣票";
          break;
        case "COUPE":
          return "双人票";
          break;
        case "ADULT":
          return "成人票";
          break;
        case "CHILDREN":
          return "儿童票";
          break;
        case "OLDMAN":
          return "老人票";
          break;
        case "STUDENT":
          return "学生票";
          break;
        case "MAN":
          return "男士票";
          break;
        case "WOMAN":
          return "女士票";
          break;
        case "TEACHER":
          return "教师票";
          break;
        case "DISABILITY":
          return "残疾票";
          break;
        case "GROUP":
          return "团体票";
          break;
        case "FREE":
          return "相关票";
          break;
        case "ACTIVITY":
          return "活动票";
        case "SOLDIER":
          return "军人票";
        default:
          return "";
      }
    },
    ticketclassify(data){
      const self = this;
      let classify_arr = [
        {
          name:"FAMILY",
          list:[],
        },
        {
          name:"PARENTAGE",
          list:[],
        },
        {
          name:"LOVER",
          list:[],
        },
        {
          name:"COUPE",
          list:[],
        },
        {
          name:"ADULT",
          list:[],
        },
        {
          name:"CHILDREN",
          list:[],
        },
        {
          name:"OLDMAN",
          list:[],
        },
        {
          name:"STUDENT",
          list:[],
        },
        {
          name:"MAN",
          list:[],
        },
        {
          name:"WOMAN",
          list:[],
        },
        {
          name:"TEACHER",
          list:[],
        },
        {
          name:"DISABILITY",
          list:[],
        },
        {
          name:"GROUP",
          list:[],
        },
        {
          name:"FREE",
          list:[],
        },
        {
          name:"ACTIVITY",
          list:[],
        },
        {
          name:"SOLDIER",
          list:[],
        },
      ];
      for (let i = 0;i <data.length; i++ ) {
        for ( let j =0 ; j<classify_arr.length; j++ ) {
          if (data[i].ticketType === classify_arr[j].name ) {
            classify_arr[j].list.push(data[i]);
          }
        }
      }
      
      for (let  arrnum = 0;arrnum <classify_arr.length;arrnum++ ) {
        if ( classify_arr[arrnum].list.length == 0 ){
          classify_arr.splice(arrnum,1);
          
        }
      }
      // console.log(data,classify_arr);
     
      
      return classify_arr;
    },
    
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 




  .tour
    width:100%
    .center
      width:100%
      .type
        margin-top:10px 
        background:#fff
        .goodsdiv
          width:100%
          height:100% 
          .header
            padding:0 15px           
            background:#fff
            height:50px 
            line-height:50px
            border-bottom: 1px solid #f1f0f0
            .name
              float:left
            .pull
              float:right
          .item
            padding:0 15px 
            background-color:#FBFBFD
            transition: all 0.5s
            &.fade-enter-active, &.fade-leave-active
              // 
            &.fade-enter, &.fade-leave-to 
              // 
          .yse 
            display:block 
            opacity: 1
            background:#FBFBFD
          .no 
              display:none
              opacity: 0
              background: none 
            .itemdiv
              width:100%
              height:100%
              padding:4px 0px 
              border-bottom:1px solid #e6e4e4
            .itemdiv:last-child 
                border-bottom:none
              .top
                position:relative
                line-height:20px 
                font-size:0px
                .name 
                  display:inline-block
                  width:72%
                  font-size: 14px
                  color: #333
                  font-weight:bold
                  overflow:hidden
                .price 
                  position:absolute
                  top:0 
                  right:0
                  display:inline-block 
                  width:28% 
                  color:#666 
                  text-align:right
                  font-size:12px
                  .nowmprice
                    text-decoration:line-through
              .retreat
                position:relative
                line-height:20px 
                font-size:0px 
                .noretreat
                  display:inline-block
                  width:50%                
                  color:#666
                  font-size:13px
                  text-align:left
                .rightdiv
                  float:right
                  display:inline-block
                  max-width:50%
                  font-size: 12px
                  color: #999
                  text-align:right
                  .low
                    font-size:13px 
                    color:#F60!important
                  .nowprice
                    font-size:20px 
                    color: #F60
                    margin-right: 1px
                    font-weight:650
              .day
                display:flex 
                line-height:20px 
                font-size:0px 
                .time
                  flex:1
                  font-size: 12px
                  color:#666
                .reserve
                  width:60px 
                  height:26px 
                  line-height:26px 
                  border-radius:8px
                  font-size:15px
                  background-color:orange
                  color:#fff
                  // font-weight:bold
                  text-align:center
              .mustknow
                height:20px 
                line-height:20px 
                margin:4px 0 
                font-size:13px 
                color:#333
                font-weight:600
                .konw
                  font-size:14px 
</style>
