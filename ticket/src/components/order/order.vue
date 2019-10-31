<template>
  <div class="order" ref="order">
    <div class="header">
      <i class="icon iconfont iconzuo1" @click="returnLeft"></i>
      <span class="name">订单填写</span>  
    </div>
    <!-- 填充time的地方 -->
      <ordertime v-show="ordertimeshow" 
      :priceList="priceList"
      :choosedArray="pdate"
      :visable="ordertimeshow"
      @hiddencandendar="hiddenCandendar"
      @getClickDate="getDate"></ordertime>
    <!-- 中间内容 -->
    <div class="center" v-show="!ordertimeshow">
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
          <div class="timehd">
            <p>游玩日期</p>
          </div>
          <div class="nowcontent">
            <div class="datetime" 
              @click="chooseCurrentDate(0)"
              :class="{'choosedateitem':currentChooseIndex==0,'no':getcorrespondingPrice(p_formatDate(0,'YYYY-MM-DD'))=='不可订'}">
              <p>今天{{p_formatDate(0)}}</p>
              <p>￥{{getcorrespondingPrice(p_formatDate(0,'YYYY-MM-DD')) }}</p>
            </div>
            <div class="datetime" 
              @click="chooseCurrentDate(1)"
             :class="{'choosedateitem':currentChooseIndex==1,'no':getcorrespondingPrice(p_formatDate(1,'YYYY-MM-DD'))=='不可订'}">
              <p>明天{{p_formatDate(1)}}</p>
              <p>￥{{getcorrespondingPrice(p_formatDate(1,'YYYY-MM-DD')) }}</p>
            </div>
            <div class="datetime"  
              @click="chooseCurrentDate(2)"
              :class="{'choosedateitem':currentChooseIndex==2,'no':getcorrespondingPrice(p_formatDate(2,'YYYY-MM-DD'))=='不可订'}">
              <p>后天{{p_formatDate(2)}}</p>
              <p>￥{{getcorrespondingPrice(p_formatDate(2,'YYYY-MM-DD')) }}</p>
            </div>
            <div class="datetime" 
              @click="showCalendar"
              :class="{'choosedateitem':currentChooseIndex==3}">
              <p>{{currentshowChoose.date}}</p>
              <p>{{currentshowChoose.price}}</p>
            </div>
          </div>
          
        </div>
        <div class="count">
          <span class="number">购买数量</span>
          <div class="click">
            <i class="dec-count" @click="decCount"></i>
            <input  class="list"  v-model="ticketnum" type="number">
            <i class="add-count" @click="addcount"></i>
          </div>
        </div>
      </div>
      <!-- 添加人数选择的地方 -->
      <travelpeopleList @isError="getisErrors"
                          :traveller="goodsInfo.traveller"
                          :cardType="goodsInfo.traveller.credentialsType"
                          >
        
      </travelpeopleList>
    </div>
    <div class="bottom" v-show="!ordertimeshow">
      <div class="price">
        <div class="olprice"> 
          <span class="title">原价:</span>
          <span class="price">{{returnOldPrice}}</span>
        </div>
        <div class="nowprice">
          <span class="title">折扣价:</span>
          <span class="price">{{discountPrice}}</span>
        </div>
      </div>
      <div class="submit" @click="CreatedOrder">
        提交订单
      </div>
    </div>
    
  </div>
</template>
<script>

import popticketInfo from "../popticketInfo/popticketInfo.vue"
import travelpeopleList from "../travelpeopleList/travelpeopleList"
import ordertime from "../ordertime/ordertime"
import moment from "moment"
import axios from 'axios'


import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

// 设置moment
moment.locale("zh-cn", {
  weekdays: "周日_周一_周二_周三_周四_周五_周六".split("_")
});

import {
  Icon,
  Toast,
  NavBar,
  Popup,
  DatetimePicker,
  SubmitBar,
  Field,
  Cell,
  CellGroup,
  Stepper,
  Dialog
} from "vant";

// http部分内容
import https from "../../https.js"
import { $axios } from "../../utils/axios.js"
const goodsInfos_url = "http://58.216.175.118:86/api/LvmamaScenicTickets/GoodsLocalInfos/GetGoodsInfos/";
const ERR_OK = 200;

Number.prototype.toCeil = function(num) {
  return Math.ceil(this * Math.pow(10, num)) / Math.pow(10, num);
};
Number.prototype.toRound = function(num) {
  return Math.round(this * Math.pow(10, num)) / Math.pow(10, num);
};

export default {

  name:"order",
  components:{
    "van-nav-bar": NavBar,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-stepper": Stepper,
    "van-field": Field,
    "van-submit-bar": SubmitBar,
    "van-popup": Popup,
    "van-datetime-picker": DatetimePicker,
    "van-icon": Icon,
    ordertime,
    popticketInfo,
    travelpeopleList,
  },
  data(){
    return {
      
      number:1,  
      
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
      // 时间页是否显示
      ordertimeshow:false,
      // 时间和价格需要的数据
      priceList:null,
      // 参考前门票项目需要的数据
      currentChooseIndex: -1, //选择日期框
      currentshowChoose: {
        date: "更多日期",
        price: ""
      },
      pdate: {
        start: {
          year: moment().format("YYYY"),
          month: moment().format("MM"),
          date: moment().format("DD")
        },
        end: {
          year: -1,
          month: -1,
          date: -1
        }
      },
      // 提交需要的信息
      traveldate: "",
      salePrice: null, //提交给对象
      goodinfo: null,
      // 其他
      istravelError:false,
      // 价格数目
      ticketnum:1,
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
           // vuex数据
        }else {
          console.log("details页ajax出现问题",data.status)
        }
       
    }).catch(err=>{
            console.log("details页ajax出现问题",err)
        }
    );
    // console.log(moment().format("YYYY-DD-MM"),moment().format("YYYY"),moment().format("DD"),typeof moment().format("MM"));
  },
  //进入路由之前执行的函数,写在组件里可根据路由进行页面判断或传值。
  beforeRouteEnter(to, from, next) {
    const _id = to.query.id;
    const goodsid = to.query.goodsid;
    const proId = to.query.product;
    // console.log("商品信息", to);

    // 获取三个时间信息
   const getalldateList = function() {
      const firstmonth = {
        startdate: moment("2019-10-15")
          // .subtract(1, "days")
          // .startOf("month")
          .format("YYYY-MM-DD"),
        enddate: moment()
          .endOf("month")
          .format("YYYY-MM-DD")
      };
      const secondmonth = {
        startdate: moment()
          .add(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD"),
        enddate: moment()
          .add(1, "months")
          .startOf("month")
          .endOf("month")
          .format("YYYY-MM-DD")
      };
      const threadmonth = {
        startdate: moment()
          .add(2, "months")
          .startOf("month")
          .format("YYYY-MM-DD"),
        enddate: moment()
          .add(2, "months")
          .startOf("month")
          .endOf("month")
          .format("YYYY-MM-DD")
      };
      return [firstmonth, secondmonth, threadmonth];
    };
    // console.log(getalldateList())

   const all_a = getalldateList();

    const getPricelist = function() {
      const axiosList = [];
      if (goodsid != null) {
        for (let item of all_a) {
         axiosList.push( https.fetchGet(
              `api/LvmamaScenicTickets/ScenicAllXml/GetGoodsPricesByDateRange/${proId}-${goodsid}/${
                item.enddate
              }`
          ));
        }
      }
      return axiosList;
    };
    // console.log("getPricelist",getPricelist());

    const getgoodinfo = https.fetchGet(
      `api/LvmamaScenicTickets/GoodsLocalInfos/GetGoodsInfos/${_id}`
    );

    axios.all([...getPricelist(), getgoodinfo]).then(
      axios.spread((...d) => {
        const pricelist = [...d];
        const res_goodinfo = pricelist.pop();
        const goodinfo = res_goodinfo.data.data;
        console.log("获取的价格", pricelist);
        console.log("获取的商品信息", goodinfo);
        const dd = [];
        for (let it of pricelist) {
          console.log("批量获取价格", it.data);
          if (it.data) {
            if (it.data.goods.prices) {
              dd.push(...it.data.goods.prices.price);
            }
          }
        }
        console.log("dd",dd); //这里是价格数组==》变成map方便调用;
        const m = new Map();
        for (let ii of dd) {
          m.set(ii.date, {
            aheadHour: ii.aheadHour,
            // b2bPrice: ii.b2bPrice,
            sellPrice: ii.sellPrice,
            stock: ii.stock,
            marketPrice: ii.marketPrice,
            price: ii.onlinePrice
          });
        }
        
        next(vm => {
          vm.priceList = m;
          vm.proId = proId;
          vm.goodinfo = goodinfo;
          vm.salePrice = { payprice: goodinfo.nowPrice };
          console.log("批量价格", vm.priceList);
          const pricedatelist = [...vm.priceList.keys()];
          console.log("99999999", pricedatelist[0]);
          vm.pdate = {
            start: {
              year: parseInt(moment(pricedatelist[0]).format("YYYY")),
              month: parseInt(moment(pricedatelist[0]).format("MM")),
              date: parseInt(moment(pricedatelist[0]).format("DD"))
            },
            end: {
              year: -1,
              month: -1,
              date: -1
            }
          };
          Toast.clear();
        });
      })
    );
  },
  mounted(){
    this.eleHeight = this.$refs.order.offsetHeight;
    
  },
  methods:{
    getisErrors(err){
      this.istravelError = err;
    },
    //vuex赋值
    ...mapMutations({
      addtravers: "ADDTRAVERS",
      removeLasttravers: "REMOVELASTTRAVEL"
    }),
    // 返回时间
    orderDataTime(number){
      // 
      let timeData= {
        MM:moment().format("MM"),
        DD:parseInt(moment().format("DD"))+number
      };
      return timeData.MM+"-"+timeData.DD;
    },
    // 加数目和减数目操作
    decCount(){
      if ( this.ticketnum > this.goodinfo.minimum) {
        this.ticketnum -- ;
      }else {
        this.ticketnum = this.goodinfo.minimum;
      }
    },
    addcount(){
      if ( this.ticketnum < this.goodinfo.maximum) {
        this.ticketnum ++;
      }else {
        this.ticketnum = this.goodinfo.maximum;
      }
    },
    // 用户点击选择
    chooseCurrentDate(n){
      if (
        this.getcorrespondingPrice(this.p_formatDate(n, "YYYY-MM-DD")) ==
        "不可订"
      ) {
        return;
      }
      this.currentChooseIndex = n;
      this.currentshowChoose = {
        date: "更多日期",
        price: ""
      };
      this.pdate = {
        start: {
          year: parseInt(
            moment()
              .add(n, "days")
              .format("YYYY")
          ),
          month: parseInt(
            moment()
              .add(n, "days")
              .format("MM")
          ),
          date: parseInt(
            moment()
              .add(n, "days")
              .format("DD")
          )
        },
        end: {
          year: -1,
          month: -1,
          date: -1
        }
      };
      this.salePrice = this.getSalePrice(
        this.priceList.get(
          moment()
            .add(n, "days")
            .format("YYYY-MM-DD")
        )
      );
      this.traveldate = moment()
        .add(n, "days")
        .format("YYYY-MM-DD");
      // 需要验证价格的哦
    },
    // 显示时间选择页
    showCalendar(){
      this.ordertimeshow = true;
    },
    // 父子组件通信的两个
    getDate(d){
      console.log("获取价格", d);
      //判读当前 的选择时间是否是今/明/后
      const traveldate = moment(
        `${d.start.year}/${d.start.month}/${d.start.date}`
      ); //当前选择的日期；
      console.log("是否今天", traveldate.isSame(moment(), "day"));
      

      if (traveldate.isSame(moment(), "day")) {
        this.currentChooseIndex = 0;
        this.currentshowChoose = {
          date: "更多日期",
          price: ""
        };
      } else if (traveldate.isSame(moment().add(1, "days"), "day")) {
        this.currentChooseIndex = 1;
        this.currentshowChoose = {
          date: "更多日期",
          price: ""
        };
      } else if (traveldate.isSame(moment().add(2, "days"), "day")) {
        this.currentChooseIndex = 2;
        this.currentshowChoose = {
          date: "更多日期",
          price: ""
        };
      } else {
       
        this.currentChooseIndex = 3;
        this.currentshowChoose = {
          date: traveldate.format("dddd MM-DD"),
          price:
            "￥" +
            this.getSalePrice(
              this.priceList.get(traveldate.format("YYYY-MM-DD"))
            ).payprice
         
        };
      }
      this.traveldate = traveldate.format("YYYY-MM-DD");
      this.salePrice = this.getSalePrice(
        this.priceList.get(traveldate.format("YYYY-MM-DD"))
      ); 
      console.log("currentshowChoose",this.currentshowChoose,this.traveldate);
    },
    hiddenCandendar(){
      this.ordertimeshow = false;
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
      if (this.ordertimeshow) {
        this.ordertimeshow = false;
      }else {
        this.$router.go(-1);//返回上一层
      }
      
    },
    // 价格
    getcorrespondingPrice(date) {
      // console.log("this.priceList",this.priceList);
      if (this.priceList) {
        return this.priceList.get(date)
          ? this.getSalePrice(this.priceList.get(date)).payprice //.marketPrice
          : "不可订";
      } else {
        return "不可订";
      }
    },
    getSalePrice(o) {
      return {
        payprice: o.price,
        sellprice: o.sellprice,
        marketPrice: o.marketPrice
      };
    },
    p_formatDate(n, style = "MM-DD") {
      return moment()
        .add(n, "days")
        .format(style);
    },
    // 提交订单
    CreatedOrder(){
      // 进入前先验证下
      if (!this.istravelError) {
        Toast(this.istravelError);
        return;
      }

      // 1：先验证下，输入的数据是否正确
      console.log("提交的参数",this.salePrice.sellprice * this.ticketnum * 100);
       const creatorderparams = {};
      creatorderparams.orderAmount = this.orderAmount / 100; //提交给驴妈妈的总价
      // creatorderparams.partnerOrderNo="tst10086";

      creatorderparams.product = {
        productId: this.proId,
        goodsId: this.goodinfo.goodsId,
        quantity: this.ticketnum,
        sellPrice: this.salePrice.sellprice, //提交给驴妈妈的单价
        visitDate: this.traveldate
      };
      console.log("creatorderparams111",creatorderparams);
      creatorderparams.booker = this.traversinfo[0];
      creatorderparams.travellers = this.traversinfo;

      
      console.log("creatorderparams222",creatorderparams);
    
      // 显示加载中
      Toast.loading({
        duration: 0,
        mask: true,
        message: "加载中..."
      });
      // return;
      Toast.loading({
        duration: 0,
        mask: true,
        message: "加载中..."
      });
      console.log("提交参数", JSON.stringify({ orderInfo: creatorderparams }));
      // 1：第一次验证：
      const _userid = this.$cookies.get("userid") || 0;
      https.fetchPost(`api/LvmamaScenicTickets/ScenicOrders/ScenicCreateOrder/${_userid}${
            this.tokenparams
          }`, {
            orderInfo: creatorderparams
          } ).then((res) => {
            console.log(res);
            //提交订单的结果
            if (res.data.code === "1000") {
              //创建订单成功 ==>支付
              Toast.clear();
            
              window.location.href = `../pay/ticketpay.html?#/?goodsname=${
                this.goodinfo.goodsName
              }&payprice=${(this.discountPrice / 100).toRound(2)}&orderno=${
                res.data.data.partnerOrderNo
              }&eid=${res.data.data.orderId}&traveldate=${
                this.traveldate
              }&lastpaytime=${res.data.data.waitPaymentTime}`;
            } else {
              //创建订单失败
              Toast.clear();
              Dialog.alert({
                title: "错误",
                message: res.data.errorMessage
              });
            }
        
      }).catch(err=>{
            Toast.clear();
            Dialog.alert({
              title: "错误",
              message: "下单失败，请检查网络。"
            });
          }
      );

    },

  },
  computed:{
    orderAmount() {
      //提交给驴妈妈的价格
      if (this.salePrice) {
        return this.salePrice.sellprice * this.ticketnum * 100;
      } else {
        return 0;
      }
    },
    // vuex赋值
    ...mapState({
      traversinfo: "traversInfo"
    }),
   
    // 应付和老的钱    
    returnNowPrice(){
      return this.ticketnum * this.goodsInfo.nowPrice;
    },
    returnOldPrice(){

      return this.ticketnum  *  this.goodsInfo.nowMPrice;
    },
    // 第一次验证需要的数据
    tokenparams() {
      return `?token=${this.$cookies.get("USERIDGDLY")}|${this.$cookies.get(
        "usersecret"
      )}|${this.$cookies.get("gdmobileuserphone")}|${this.$cookies.get("WHERE")}`;
    },
    // 折扣价
    discountPrice() {
      //折扣价
       //折扣价
      if (!this.goodinfo) {
        return 0;
      }
      const officaldispirice = this.goodinfo.activityInfo.number || 0;
      // console.log("折扣价11",officaldispirice,this.goodinfo);
      let tmpPrice =
        ((this.salePrice.payprice - officaldispirice) * 100 * 0.997).toRound(
          0
        ) * this.ticketnum/100;
        // console.log("折扣价",tmpPrice,);
      return tmpPrice;
    },
    // 
  },
  watch:{
    
    // 检测购买数目输入
    ticketnum(val){
      if (val<=this.goodinfo.minimum) {
        Toast(`最少预定${this.goodinfo.minimum}张`);
        this.ticketnum   = this.goods.minimum;
      }else if (val>=this.goodinfo.maximum) {
        Toast(
        `最多预定${this.goodinfo.maximum}张`
        ); 
        this.ticketnum   = this.goodinfo.maximum;
      }else if ( this.ticketnum === "") {
        this.ticketnum   = this.goods.minimum;
      }
        
    },
  },
  
}
</script>
<style  lang="stylus"  rel="stylesheet/stylus" scoped>
  .order
    width:100% 
    overflow-y: hidden
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
          padding: 6px 16px 0px 10px
          overflow: hidden
          background-color: #fff
          .timehd
            width:100%
            p 
              background: rgb(255, 255, 255)
              text-align: left
              padding-top: 5px
              font-size:15px 
              color: #2c3e50
          .nowcontent
            padding-top:10px 
            display:flex 
            .datetime
              flex:1
              height:52px
              // color:#ddd
              border-radius: 5px
              padding: 3px
              -webkit-box-sizing: border-box
              box-sizing: border-box
              border: 1px solid #ddd
              color:#2c3e50
            .no
                color:#ddd
            .choosedateitem
                border-color:orange
              p
                text-align:center 
                font-size: 14px
                line-height:18px 
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
        font-size:15px 
        overflow:hidden
        text-indent:2px
        .olprice
          float:left 
          width:50%
          display:inline-block 
          font-size:14px 
          .title 
            flaot:left
            text-decoration:none
          .price 
            flaot:left
            text-decoration:line-through
        .nowprice
          display:flex
          float:left 
          width:50%
          // display:inline-block 
          font-size:16px 
          text-align:left
          .title 
            max-width:58px 
            // flaot:left
            color:#666
          .price 
            flex:1
            // flaot:left
            color:#FE686C
            overflow:hidden
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

