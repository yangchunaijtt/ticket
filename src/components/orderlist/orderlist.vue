<template>
  <div class="list">
    <van-nav-bar title="订单列表" left-arrow @click-left="onClickLeft" />
    <div class="dd-list">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <orderitem v-for="(item, index) in orderlist" :order="item" :key="index"></orderitem>
      </van-list>
    </div>
  </div>
</template>

<script>
import https from "../../https.js";
import { NavBar, List } from "vant";
import orderitem from "../orderitem/orderitem";
export default {
  name: "ticketorderList",
  components: {
    "van-nav-bar": NavBar,
    orderitem: orderitem,
    vanList: List
  },
  data() {
    return {
      orderlist: [],
      totalpage: 1,
      currentPage: 0,
      loading: false,
      finished: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getListbypage(page = 1) {
      const tokenparams = () => {
        return `?token=${this.$cookies.get("USERIDGDLY")}|${this.$cookies.get(
          "usersecret"
        )}|${this.$cookies.get("gdmobileuserphone")}|${this.$cookies.get("WHERE")}`;
      };
      return https.fetchPost(
       
        `api/LvmamaScenicTickets/ScenicLocalOrders/GetScenicOrdersByMember/${this.$cookies.get(
          "USERIDGDLY"
        )}-${this.$cookies.get("WHERE")}${tokenparams()}`,

        {
          pageSize: 6,
          pageIndex: this.currentPage,
          sort:"desc"
        }
      );
    },
    
    async onLoad() {
      this.currentPage++;
      
      const list = await this.getListbypage(this.currentPage);
      console.log("loading", list);
      this.totalpage =
        list.data.data.count % 6 != 0
          ? Math.floor(list.data.data.count / 6) + 1
          : Math.floor(list.data.data.count / 6);
      this.orderlist.push(...list.data.data.scenicOrders);
      this.loading = false;

      if (this.currentPage+1 > this.totalpage) {
        this.finished = true;
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next();
  }
};
</script>

<style  lang="stylus"  rel="stylesheet/stylus" scoped>
.dd-list 
  color: #2c3e50
  margin-top: 10px;

</style>
