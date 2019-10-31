<template>
  <div class="orderitem" @click="gotodetails">
    <div class="titlebar">
      <div class="left">
        <i class="lefticon iconfont iconticket"></i>
        <span>门票</span>
      </div>
      <div class="right">
        {{orderShowstatus}}
      </div>
    </div>
    <div class="ccc">
      <div class="left">
        <h2>{{order.productName}}</h2>
        <p>数量：
          <span>{{order.product.quantity}}份</span>
        </p>
        <p>游玩日期:
          <span>{{order.product.visitDate}}</span>
        </p>
      </div>
      <div class="right">
        <div class="price">
          ￥
          <span>{{order.needPayPrice}}</span>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import {Toast} from "vant"

export default {
  name: "orderitem",
  components: {},
  data() {
    return {};
  },
  props: ["order"],
  computed: {
    insertDate() {
      if (this.order) {
        return this.order.insertDate;
      }
    },
    orderShowstatus(){
      if(this.order.status=='CANCEL'){
        return '已取消'
      }

      return this.paymentStatus;
    },
    paymentStatus() {
      if (!this.order) {
        return "未知";
      }
      switch (this.order.paymentStatus) {
        case "UNPAY":
          return "未支付";
          break;
        case "PAYED":
          return "已支付";
      }
    }
  },
  beforeRouteEnter(to,from,next){
    Toast.loading({ duration: 0, forbidClick: true, message: "加载中." });
    next(vm=>{

    })
  },
  methods: {
    gotodetails() {
      console.log(this.order.partnerOrderNo);
      this.$router.push({
        name: "orderdetails",
        query: {
          partnerOrderNo: this.order.partnerOrderNo
        }
      });
    }
  },
  mounted(){
    Toast.clear();
  },
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>

.orderitem 
  background-color: #fff
  margin-bottom: 10px
  color: #2c3e50
  .titlebar 
    margin: 0 10px
    border-bottom: 1px solid #ddd
    padding: 5px 0
    display:flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .left 
      display:flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      font-size: 18px
      .lefticon
        font-size: 21px
        text-align: left
        text-indent: 5px
      span 
        margin-left: 10px;
  .ccc 
    position:relative
    padding: 10px
    display:flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
    .left 
      text-align: left
      font-size: 18px
      h2 
        font-weight: 700
        padding-bottom: 5px
      
      p 
        padding-bottom: 5px
        color: #999
        font-size: 15px
    .right 
        position: absolute
        top: 10px
        right:5px
      .price 
        color: orange
        font-size: xx-small
        span 
          font-size: 17px
          font-weight: 700
 
</style>
