<template>
  <div class="order" ref="order">
    <div class="header">
      <i class="icon iconfont iconzuo1" @click="returnLeft"></i>
      <span class="name">订单填写</span>  
    </div>
    <!-- 中间内容 -->
    <div class="center">
      <div class="details">
        <div class="name">
          <h2 class="title">{{goodsInfo.goodsName}}</h2>
          <span class="link" @click="ticketTest">
            订票须知
            <i class="icon iconfont iconyou"></i>
          </span>
          <!-- 订票须知，弹出来内容 -->
          <popticketInfo v-show="ticketInfoShow" :ticketinfo="goodsInfo" :eleHeight="eleHeight"> 

          </popticketInfo>
          <div class="Mongolia"  v-show="ticketInfoShow" @click="ticketInfoShow=false">
          </div>
        </div>
        <div class="time">
          <!-- 填充time的地方 -->
          
        </div>
        <div class="count">
          <span class="number">购买数量</span>
          <div class="click">
            <i class="dec-count" @click="decCount"></i>
            <input type="text"  class="list"  v-model="number">
            <i class="add-count" @click="addcount"></i>
          </div>
        </div>
      </div>
      <div class="people">
        <div class="title"> 
          取票人信息
          <span class="tell">【网络预定需填写一个游客信息】</span>
        </div>
        <div class="fill">
          <div class="name item">
            <span class="span">姓名</span>
            <div class="inputdiv">
              <input type="text" :placeholder="idNameTest" class="input" @blur="testName" v-model="idName">
              <div class="nametest filltest" v-show="idNameNo">姓名格式不正确</div>
            </div>
          </div>
          
          <div class="phone item">
            <span class="span">手机号</span>
            <div class="inputdiv">
              <input type="text" :placeholder="phoneNumberTest" class="input" @blur="testPhone" v-model="phoneNumber">
              <div class="phonetest filltest" v-show="phoneNumberNo">手机号格式不正确</div>              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="price">
        应付：
        <span class="nowprice">{{returnNowPrice}}</span>
        <span class="oldprice">{{returnOldPrice}}</span>
      </div>
      <div class="submit" @click="CreatedOrder">
        提交订单
      </div>
    </div>
    
  </div>
</template>
<script>
import popticketInfo from "../popticketInfo/popticketInfo.vue"

// http部分内容
import https from "../../https.js"
const goodsInfos_url = "http://58.216.175.118:86/api/LvmamaScenicTickets/GoodsLocalInfos/GetGoodsInfos/";
const ERR_OK = 200;

export default {

  name:"order",
  data(){
    return {
      
      number:1,  
      // 检测用户输入的三个名目分类
      idName:"",
      idNameTest:"必填",
      idNameNo:false,
      phoneNumber:null,
      phoneNumberTest:"接收取票短线凭证",
      phoneNumberNo:false,
      // 手机端时间选择数据
      // 是否显示预定须知部分内容
      ticketInfoShow:false,
      // url传入过来的数据
      searchid:0,
      goodsid:0,
      product:0,
      //订票信息
      goodsInfo:{},
      // 页面高度
      eleHeight:0,
      // 
    }
  },
  created(){
    this.searchid = this.$utils.getUrlKey("id");
    this.goodsid = this.$utils.getUrlKey("goodsid");
    this.product = this.$utils.getUrlKey("product");
    https.fetchGet(goodsInfos_url + this.searchid,{} ).then((data) => {
        // console.log(data);
        if ( data.status == ERR_OK ) {
          console.log("goodsInfo",data.data);
          this.goodsInfo = data.data.data;
        }else {
          console.log("details页ajax出现问题",data.status)
        }
       
    }).catch(err=>{
            console.log("details页ajax出现问题",err)
        }
    );
    
  },
  mounted(){
    this.eleHeight = this.$refs.order.offsetHeight;
    // console.log(this.eleHeight);
  },
  methods:{
    // 加数目和减数目操作
    decCount(){
      if ( this.number > 0) {
        this.number -- ;
      }
    },
    addcount(){
      if ( this.number >= 0) {
        this.number ++;
      }
    },
    // 手动输入数量
    countBlur(){
      // this.number = 
      console.log(this.number);
    },
    // 检验用户输入
    testName(){
      let regxm = /^[\u4E00-\u9FA5]{2,4}$/;
      if (this.idName ==="") {
        this.idNameTest ="请输入姓名";
        this.idNameNo = true;
      }else if(!regxm.test(this.idName)){
        // this.idNameTest ="姓名不能含有非法字符！";
        this.idNameNo = true;
        // this.idName = "";
      }else {
        this.idNameNo = false;
      }
    },
    testPhone(){
      if (this.phoneNumber === "") {
        this.phoneNumberTest = "请填写手机号";
      }else if(!(/^1[3456789]\d{9}$/.test(this.phoneNumber))){ 
        // this.phoneNumberTest = "手机号有误，请重填！";
        this.phoneNumberNo = true;        
        // this.phoneNumber = "";
      }else {
        this.phoneNumberNo = false; 
      }
    },
    //日历选择
    selectTime(){
      console.log(this.$refs.picket)
      this.$refs.picket.show=true
    },
    onChange(data){
      this.$refs.picket.show = false;
      console.log(data,data.$d);
    },
    // 点击订票须知
    ticketTest(){
      this.ticketInfoShow = !this.ticketInfoShow;
    },
    // 返回上一页
    returnLeft(){
      this.$router.go(-1);//返回上一层
    },
    // 提交订单
    CreatedOrder(){

    },
    // 其他

  },
  computed:{
    // 应付和老的钱    
    returnNowPrice(){
      return this.number * this.goodsInfo.nowPrice;
    },
    returnOldPrice(){
      return this.number  *  this.goodsInfo.nowMPrice;
    },
  },
  watch:{
    // 检测用户的三个输入
    idName(oldVlaue,newValue){},
    phoneNumber(){},
    // 检测购买数目输入
    number(val){
      if (val <=0) {
        val = 1;
      }
      this.number = val;      
    },
  },
  components:{
    popticketInfo,
  }
}
</script>
<style  lang="stylus"  rel="stylesheet/stylus" scoped>
  .order
    width:100% 
    .header
      box-sizing:border-box
      display:flex
      position:fixed
      top:0px 
      left:0px  
      width:100%
      padding:8px 12px
      height:45px 
      line-height:30px 
      box-shadow:0 0 5px #e8e8e8
      background:#fff
      .icon 
        width:35px 
        float:left 
        display:inline-block
        font-size:30px 
        font-weight:560px
      .name 
        flex:1
        text-align:center 
        text-indent:-35px 
        color:#38f 
        font-weight:545 
        font-size:18px
    .center
      margin-top:55px 
      padding:0 10px 10px 
      .details
        background:#fff
        border-radius: 5px
        box-shadow: 0 0 5px #e8e8e8
        .name
          padding:14px 16px 0px 10px 
          overflow:hidden
          .title
            display:block 
            font-weight: 600
            font-size: 16px
            color: #333
            line-height: 22px
            overflow:hidden
          .link
            display:block
            color:#999 
            padding:6px 0px 
            font-size:14px 
          .Mongolia
              position:fixed
              top:0 
              left:0 
              width:100% 
              height:100% 
              background: rgba(0,0,0,.5)
              z-index:200  
        .time 
          padding: 14px 16px 0px 10px
          overflow: hidden
        .count 
          box-sizing:border-box
          max-height:74px
          padding: 14px 16px 0px 10px
          overflow: hidden
          .number
            float: left
            color: #333
            line-height: 42px 
            font-size: 15px 
            margin-top: 10px
          .click
            float: right
            margin: 14px 0
            font-size: 0
            .dec-count
              display: inline-block
              width: 41px
              height: 36px
              background-repeat: no-repeat
              background-image: url(//pics.lvjs.com.cn/mobile/coding/v750/ticket/img/dec_unable.png)
              background-size: 100%
              font-size:16px 
            .list 
              vertical-align: top
              width: 50px
              height: 33px
              font-size: 16px
              border: solid
              text-align: center
              line-height: 33px
              color: #333
              -webkit-border-image: url('data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7') 2 stretch
              border-width: 1px
              box-shadow: inset 1px 1px 3px -2px #aaa
            .add-count
              display: inline-block
              width: 41px
              height: 36px
              background-repeat: no-repeat
              background-image: url('//pics.lvjs.com.cn/mobile/coding/v750/ticket/img/add_able.png')
              background-size: 100%
      .people 
        margin-top:10px 
        padding:0px 16px 0px 10px
        background:#fff
        border-radius: 5px
        box-shadow: 0 0 5px #e8e8e8
        .title
          height: 35px;
          line-height:35px
          color:#000
          font-size:15px
          font-weight:520
          overflow:hidden
          .tell
            color:#999
            font-size:12px
        .fill
          .item
            display:flex 
            line-height:45px 
            border-bottom:1px solid #dcdcdc
          .item:last-child
              border-bottom:none 
            .span
              width:52px 
              height:45px
              overflow:hidden
              color:#333
              font-size:14px 
              text-align:left
            .inputdiv
              flex:1
              width:100%
              min-height:45px
              .input
                width:100%
                height:40px 
                line-height:40px 
                color:#333
                font-size:13px
              .filltest 
                // height:12px 
                line-height:15px 
                color: #f44
                font-size: 12px
                text-align:left
    .bottom
      display:flex
      position:fixed
      bottom:0 
      left:0 
      width:100% 
      height:48px 
      line-height:48px
      background:#fff
      z-index:100
      .price
        flex:1 
        text-indent:20px 
        font-size:15px 
        overflow:hidden
        .nowprice 
          font-size:17px 
          color:#FE686C
        .oldprice
          text-indent:16px 
          text-align:right
          text-decoration:line-through
          font-size:14px
      .submit
        width:150px 
        background: -webkit-linear-gradient(-40deg,#FE686C 0,#FE3C71 60%)
        text-align:center
        color:#fff
        font-size:18px 
        font-weight:400
    .SelectTime 
      display:none
</style>

