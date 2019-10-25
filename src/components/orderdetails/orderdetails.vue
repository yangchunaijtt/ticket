<template>
  <div class="orderdetails">
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <van-cell :title="paymentStatus" is-link @click="gotoPay" v-if="orderstatus=='正常'"/>
    <van-cell :title="refundStatus" is-link @click="getOrderCancel" v-if="paymentStatus=='已支付'" />
    <div class="ticketinfo">
      <van-cell :title="orderinfo.productName" is-link :to="productUrl">
        <icon name="tickets" slot="icon" scale="2.5"></icon>
      </van-cell>
      <div class="ticket-cccc">
        <div class="tickets-cc">
          <div class="title">
            <p class="title-p">{{orderinfo.goodsName}}</p>
            <p class="price-c">
              <span>￥
                <em>{{goodinfo.nowPrice}}</em>
              </span>
              X{{product.quantity}}
            </p>

          </div>
          <p class="tip" v-if="product">游玩时间：{{product.visitDate}} 星期六</p>
          <p class="tip">取票方式：{{goodinfo.notice.ways}}</p>
        </div>
      </div>

      <div class="totalprice">
        <p>总价</p>
        <p class="all-price">￥
          <em>{{orderinfo.needPayPrice}}</em>
        </p>
      </div>
    </div>
    <div class="orderdetails-p">
      <p>订单编号：{{orderinfo.partnerOrderNo}}</p>
      <p>下单时间：{{orderinfo.insertDate}}</p>
      <p>支付方式：在线支付</p>
    </div>
    <div class="orderstat orderdetails-p">
      <p>门票短信发送状态:{{credenctStatus}}</p>
      <p>门票使用状态:{{performStatus}}</p>
    </div>
    <div class="scenicinfo">
      <div class="title">
        <p class="placename">{{orderinfo.productName}}</p>
        <p class="tohere">
          <icon name="nav" scale="2"></icon>
          <span @click="handlenavigation(goodinfo.visitAddress)">到这去</span>
        </p>
      </div>
      <div class="locati">
        <icon name="loca" scale="2"></icon>
        <p class="locaname">
          {{goodinfo.visitAddress}}
        </p>
      </div>

    </div>
    <div class="contactinfo" v-if="booker">
      <div class="title">
        联系人信息
      </div>
      <div class="ccc">
        <p>联系人：{{booker.name}}</p>
        <p>联系人电话：{{booker.mobile}}</p>
      </div>
    </div>
  </div>
</template>

<script>

import https from "../../https.js"
import Cookie from "../../utils/cookie.js"

import { NavBar, Dialog, Cell, CellGroup, Toast } from "vant";
export default {
  name: "orderdetails",
  data() {
    return {
      orderinfo: {},
      goodinfo: {},
      canceltag:true,//30秒只能退款1次；
    };
  },
  components: {
    "van-cell": Cell,
    "van-nav-bar": NavBar
  },
  computed: {
    productUrl() {
      return `/ticket?id=${this.orderinfo.pid}`;
    },
    booker() {
      if (!this.orderinfo) {
        return {};
      }
      if (typeof this.orderinfo.booker == "string") {
        return JSON.parse(this.orderinfo.booker);
      } else {
        return this.orderinfo.booker;
      }
    },
    product() {
      // console.log("测试错误",this.orderinfo);
      if (!this.orderinfo) {
        return {};
       
      }
      if (typeof this.orderinfo.product == "string") {
        return JSON.parse(this.orderinfo.product);
       
      } else {
        return this.orderinfo.product;
        
      }
      
    },
    orderstatus() {
      if (!this.orderinfo) {
        return "未知";
      }
      switch (this.orderinfo.status) {
        case "CANCEL":
          return "已取消";
        case "NORMAL":
          return "正常";
      }
    },
    refundStatus() {
      //退款的状态
      if (!this.orderinfo) {
        return "未知";
      }
      switch (this.orderinfo.requestStatus) {
        case null:
          return "申请退票";
        case "REVIEWING":
          return "退款中。。。";
        case "REJECT":
          return "退款失败";
        case "PASS":
          return "退款成功";
      }
    },
    credenctStatus() {
      //短信是否发送
      if (!this.orderinfo) {
        return "未知";
      }
      switch (this.orderinfo.credenctStatus) {
        case null:
          return "暂无";
        case "CREDENCE_SEND":
          return "已发送";
        case "CREDENCE_NO_SEND":
          return "未发送";
      }
    },
    performStatus() {
      //门票是否已经使用
      if (!this.orderinfo) {
        return "未知";
      }
      switch (this.orderinfo.performStatus) {
        case null:
          return "暂无";
        case "USED":
          return "已使用";
        case "UNUSE":
          return "未使用";
      }
    },
    paymentStatus() {
      if (!this.orderinfo) {
        return "未知";
      }
      switch (this.orderinfo.paymentStatus) {
        case "UNPAY":
          return "未支付";
          break;
        case "PAYED":
          return "已支付";
      }
    },
    tokenparams() {
      
      return `?token=${this.$cookies.get("USERIDGDLY")}|${this.$cookies.get(
        "usersecret"
      )}|${this.$cookies.get("gdmobileuserphone")}|${this.$cookies.get("WHERE")}`;
    }
  },
  methods: {
    getScinInfo(id) {
      //获取景点信息;
      return https.fetchGet(
        `api/LvmamaScenicTickets/ProductLocalInfos/GetProductInfos/${id}`
      );
    },
    async handlenavigation(place) {
      Toast.loading({
        mask: true,
        message: "加载中..."
      });
      //导航
      // 导航内容没有，后面有了在重写
      // const productinfo_res = await this.getScinInfo(this.orderinfo.pid);
      // console.log("位置", productinfo_res.data.data.scenicInfos.placeCity);
      // Toast.clear();
      // window.location.href = `https://apis.map.qq.com/uri/v1/search?keyword=${place}&region=${
      //   productinfo_res.data.data.scenicInfos.placeCity
      // }&referer=WE3BZ-OY7LD-IZW4M-PLRHU-SOMWH-MOFSI`;
    },
    getOrderCancel() {
      if (this.refundStatus != "申请退票") {
        return;
      }
      if(!this.canceltag){
        console.log('退款频繁');
        Toast('退款频繁，请稍后再试');
        return ;
      }
      Toast.loading({
        mask: true,
        message: "加载中..."
      });
      console.log("退款");
      https.fetchPost(
          "api/LvmamaScenicTickets/ScenicOrders/ScenicOrderCancel" +
            this.tokenparams,
          {
            PartnerOrderNo: this.orderinfo.partnerOrderNo,
            orderId: this.orderinfo.orderId
          }
        )
        .then(res => {
          this.canceltag=false;
          Toast.clear();
          setTimeout(() => {
            this.canceltag=true;
            console.log('可以重新取消订单了');
          }, 30000);
          console.log("退款");
          console.log("res", res);
          if (res.data.code != "1000") {
            Dialog.alert({
              title: "错误",
              message: res.data.message
            });
            
          } else {
           
            Dialog.alert({
              title: "提示",
              message: "退款申请已经提交"
            });
          }
        });
    },
    gotoPay() {
      if (this.orderinfo.paymentStatus !== "UNPAY") {
        return;
      }
      window.location.href = `../pay/ticketpay.html?#/?goodsname=${
        this.goodinfo.goodsName
      }&payprice=${this.orderinfo.needPayPrice}&orderno=${
        this.orderinfo.partnerOrderNo
      }&eid=${this.orderinfo.orderId}&traveldate=${
        this.product.visitDate
      }&lastpaytime=${this.orderinfo.waitPaymentTime}`;
     
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  beforeRouteEnter: async (to, from, next) => {
    const orderquery = to.query;
    console.log("订单信息", orderquery);
    console.log("cookie",Cookie);
    // 这个报错了
    const tokenparams = () => {
      return `?token=${Cookie.get("USERIDGDLY")}|${Cookie.get(
        "usersecret"
      )}|${Cookie.get("gdmobileuserphone")}|${Cookie.get("WHERE")}`;
    };
    // 返回的是：?token=13057|16f37eed7a4315b2236a247a15596e7f|13218997301|11
    //报错结尾
    
    https.fetchGet(
        "api/LvmamaScenicTickets/ScenicLocalOrders/GetScenicOrderByNo/" +
          orderquery.partnerOrderNo +
          tokenparams()
      )
      .then(res => {
        const resdata = res.data.data;
        getgoodinfo(resdata.gid).then(goodres => {
          next(vm => {
            vm.orderinfo = res.data.data;
            vm.goodinfo = goodres.data.data;
            console.log("订单详细", vm.orderinfo);
            console.log("goodinfo详细", vm.goodinfo);
          });
        });
      });

    const getgoodinfo = goodid => {
      return https.fetchGet(
        `api/LvmamaScenicTickets/GoodsLocalInfos/GetGoodsInfos/${goodid}`
      );
    };
    // 后添加部分
    // next(vm => {

    // })
  },
  mounted(){

  },
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>

.orderdetails{
  color: #2c3e50
  font-size:15px 
}
.van-cell__title {
  display:flex
  flex-direction: row
  justify-content: center
  align-items: center
}
.ticketinfo {
  margin-top: 10px;
}
.ticket-cccc {
  background-color: #fff;
}
.tickets-cc {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  text-align: left;
  .title {
    display:flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-start
    .title-p {
      font-weight: 700;
    }
    .price-c {
      color: #999;
      font-size: 13px;
      white-space: nowrap;
      // overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: orange;
        font-size: 13px;
        em {
          font-size: 18px;
        }
      }
    }
  }
  .tip {
    color: #999;
    font-size: smaller;
    margin-bottom: 10px;
    margin-top: 10px;
  }
}
.totalprice {
  padding: 10px 10px;
  background-color: #fff;
  display:flex
  flex-direction: row
  justify-content: space-between
  align-items: flex-start
  .all-price {
    font-size: 18px;
    color: orange;
    em {
      font-size: 18px;
    }
  }
}
.orderdetails-p {
  padding: 10px;
  margin-top: 10px;
  text-align: left;
  color: #999;
  background-color: #fff;
}
.scenicinfo {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px;
  .title {
    display:flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    border-bottom: 1px solid #ddd;
    padding: 5px 0;
    .placename {
      width: 70%;
      overflow: hidden;
    }
    .tohere {
      display:flex
      flex-direction: row
      justify-content: center
      align-items: center
      border-radius: 5px;
      border: 1px solid #ddd;
      padding: 5px 10px;
    }
  }

  .locati {
    padding: 5px 0;
    text-align: left;
    display:flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
    center
    .locaname {
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.contactinfo {
  text-align: left;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  .title {
    font-weight: 700;
    font-size: 17px;
    border-bottom: 1px solid #ddd;
  }
  .ccc {
    padding: 10px 0;
  }
}
</style>
