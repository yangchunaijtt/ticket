<template>
  <transition name ="fade">
  <div class="time" ref="time">
    <div class="weekcontain">
      <ul>
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </div>
    <!-- 下面的主体内容 -->
     <div class="wrapper" ref="wrapper" :style="{'height':warpperHeight+'px'}"> 
      <div class="cont">
        <div class="dateContains" v-for="(item,index) of monthList" :key="index">
          <div class="datedetails">
            {{item.year+'年'+item.month+'月'}}
          </div>
          <div class="dayscontain">
            <ul>
              <li  v-for="(value,i) of item.day" :key="i"
                :class="{ 'father':isStartAndend(item.year,item.month,value),'unablechoosed':ispast(item.year,item.month,value)||getpriceShow(item.year,item.month,value)==''}">
                <div class="item-show"  :class="{'havechoose':isInchoose(item.year,item.month,value)}" v-if="value!==-1"  @click="clickDate(item.year,item.month,value)">
                  <p class="date">{{value}}</p>
                  <p class="lowestprice">{{getpriceShow(item.year,item.month,value)}}</p>
                </div>
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>


<script>

// 调用moment
import moment from "moment";
import BScroll from "better-scroll";

export default {
  name:"calendar",
  components: {},
  props:{
    priceList: {
      type: [Map]
    },
    clicktodispear: {
      type: [Number],
      default: -1
    },
    choosedArray: {
      type: [Object],
      default: function() {
        return {
          start: {
            year: -1,
            month: -1,
            date: -1
          },
          end: {
            year: -1,
            month: -1,
            date: -1
          }
        };
      }
    },
    visable: {
      type: [Boolean],
      default: false
    },
  },
  data(){
    return {
      // 原门票项目中需要的数据
      choosestatus: "startdate",
      timer: null,
      DateNum: {
        year: -1,
        month: -1,
        date: -1
      },
      Tipcanshow: false,
      status: 0,
      monthList: null,
      // 其他
      windowHeight: 667,
      monthList:null,
    }
  },
  watch:{
    // 滑动显示
    visable(newValue, oldValue) {
      console.log("日历组件的显示", newValue);
      if (newValue == true) {
        this.$nextTick(() => {
          let h =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
          this.$refs.wrapper.style.height = h - 50 + "px";
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          });
        });
      }
    },
  },
  computed:{
    // 检测网页的高度
    warpperHeight(){
      return document.body.offsetHeight - 75;
    },
  },
  methods:{
    
    // /返回价格
    getpriceShow(year, month, day) {
      const price = this.priceList.get(
        moment(`${year}/${month}/${day}`).format("YYYY-MM-DD")
      );
      if (!price) {
        return "";
      }
      return `￥${price.price}`;
    },
    getCurrentDate() {
      //获得今天的日期
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1; //-1
      let date = now.getDate();
      let week = now.getDay();
      // 返回今天是那天那年哪月，周几。
      return {
        year: year,
        month: month,
        date: date,
        week: week
      };
    },
    getInitMonth(date_obj, index) {
      //获得月份第一天的信息,星期几
      let c_date = new Date(date_obj.year, date_obj.month - 1 + index, 1);
      let c_week = c_date.getDay();
      date_obj.week = c_week;
      date_obj.date = 1;
      date_obj.month = c_date.getMonth() + 1;
      date_obj.year = c_date.getFullYear();
      return date_obj;
    },
    getDaysInOneMonth(year, month) {
      //获得每个月的天数
      month = parseInt(month, 10);
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    // 判断li的calss
     isStartAndend(year, month, date) {
      if (typeof this.choosedArray == "undefined") {
        let startYear = this.choosedArray.start.year;
        let startMonth = this.choosedArray.start.month;
        let startDate = this.choosedArray.start.date;
        if (startYear == year && startMonth == month && startDate == date) {
          return true;
        }
        let endYear = this.choosedArray.end.year;
        let endMonth = this.choosedArray.end.month;
        let endDate = this.choosedArray.end.date;
        if (endYear == year && endMonth == month && endDate == date) {
          return true;
        }
      }

      return false;
    },
    //判断是否在这个区间
    isInchoose(year, month, date) {
      // console.log("isInchoose",this.choosedArray)
      if (typeof this.choosedArray == "undefined") {
        return false;
      }
      if (
        this.choosedArray.end.year == -1 &&
        this.choosedArray.start.year != -1
      ) {
        //只有開始日期的情況
        // console.log("只有开始");
        let o_startYear = this.choosedArray.start.year;
        let o_startMonth = this.choosedArray.start.month;
        let o_startDate = this.choosedArray.start.date;
        if (
          o_startYear == year &&
          o_startMonth == month &&
          o_startDate == date
        ) {
          return true;
        } else {
          return false;
        }
      } else if (
        this.choosedArray.end.year != -1 &&
        this.choosedArray.start.year != -1
      ) {
        //開始和結束都有的情況下
        // console.log("开始和结束都有");
        let startDate = new Date(
          this.choosedArray.start.year,
          this.choosedArray.start.month - 1,
          this.choosedArray.start.date
        );
        let endDate = new Date(
          this.choosedArray.end.year,
          this.choosedArray.end.month - 1,
          this.choosedArray.end.date
        );
        let chooseDate = new Date(year, month - 1, date);
        let formartstartDate = Date.parse(startDate);
        let formartendDate = Date.parse(endDate);
        let formartchooseDate = Date.parse(chooseDate);
        // console.log("开始时间",formartstartDate);
        // console.log("结束时间",formartendDate)
        // console.log("区间",formartchooseDate)
        if (
          formartstartDate <= formartchooseDate &&
          formartchooseDate <= formartendDate
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    //判断是否是过去
    ispast(year, month, date) {
      let nowdate = this.getCurrentDate();
      if (
        year == nowdate.year &&
        month == nowdate.month &&
        nowdate.date > date
      ) {
        return true;
      }
      return false;
    },
    getpriceShow(year, month, day) {
      const price = this.priceList.get(
        moment(`${year}/${month}/${day}`).format("YYYY-MM-DD")
      );
      if (!price) {
        return "";
      }
      return `￥${price.price}`;
    },
    // 点击选择时间
    clickDate(year, month, date){
      console.log(year,month,date);
      //点击事件
      if (this.getpriceShow(year, month, date) == "") {
        return;
      }
      console.log("失灵？", this.choosestatus);
      let dateobj_nowchoose = new Date(year, month - 1, date);
      let formate_now_date = Date.parse(dateobj_nowchoose);
      if (this.timer != null) {
        clearTimeout(this.timer);
      }
      if (this.choosestatus == "enddate") {
        let dateobj_start = new Date(
          this.choosedArray.start.year,
          this.choosedArray.start.month - 1,
          this.choosedArray.start.date
        );
        let formate_start_date = Date.parse(dateobj_start);

        console.log("入住时间", dateobj_start);
        console.log("现在选择的时间", dateobj_nowchoose);
        if (formate_now_date < formate_start_date) {
          console.log("小雨了");
          return;
        }
      }
      if (this.choosestatus == "startdate") {
        let dateobj_end = new Date(
          this.choosedArray.end.year,
          this.choosedArray.end.month - 1,
          this.choosedArray.end.date
        );
        let formate_end_date = Date.parse(dateobj_end);
        if (formate_end_date < formate_now_date) {
          console.log("开始日期大于结束日期");
          this.choosedArray.end.year = -1;
          this.choosedArray.end.month = -1;
          this.choosedArray.end.date = -1;
          this.$emit("update:choosedArray", {
            startdate: new Date(
              this.choosedArray.start.year,
              this.choosedArray.start.month - 1,
              this.choosedArray.start.date
            ),
            enddate: null
          });
        }
      }
      if (!this.ispast(year, month, date) && date != -1) {
        console.log("过去判断", this.ispast(year, month, date));
        console.log("过去判断", date);
        this.DateNum.year = year;
        this.DateNum.month = month;
        this.DateNum.date = date;

        console.log(year + "-" + month + "-" + date);
        this.Tipcanshow = true;
        this.timer = setTimeout(() => {
          this.Tipcanshow = false;
        }, 1000);
        if (this.choosestatus == "startdate") {
          this.status = 0;
        } else if (this.choosestatus == "enddate") {
          this.status = 1;
        }
        switch (this.status) {
          case 0:
            this.choosedArray.start.year = year;
            this.choosedArray.start.month = month;
            this.choosedArray.start.date = date;
            this.choosedArray.end.year = -1;
            this.choosedArray.end.month = -1;
            this.choosedArray.end.date = -1;
            this.status = 1;
            break;
          case 1:
            this.choosedArray.end.year = year;
            this.choosedArray.end.month = month;
            this.choosedArray.end.date = date;
            this.status = 0;
            break;
        }
        this.$emit("getClickDate", this.choosedArray);
        console.log(this.choosedArray);
        if (this.choosestatus == "startdate") {
          this.choosestatus = "startdate";
          this.$emit("hiddencandendar");
          // this.status = 0;
        } else {
          this.choosestatus = "enddate";
        }
      }
      if (this.clicktodispear != -1) {
        this.$emit("clickdispear");
      }
    }
  },
  created(){
    
     //确定当前的日期
    let dd = [];
    let total = [];
    //console.log("月份的第一天的信息", initMonth);
    //生成一个月的数组
    let initnum = 0;
      for (let i = 0; i < 3; i++) {
      let initMonth = this.getInitMonth(this.getCurrentDate(), i); //第一个月份的信息的第一天的信息
      let monthdays = this.getDaysInOneMonth(initMonth.year, initMonth.month);
      console.log("生成月份是", initMonth.month);
      console.log("天数是", initMonth.week);
      for (let j = 0; j < 36; j++) {
        if (j < initMonth.week) {
          dd.push(-1);
        } else {
          initnum++;
          if (initnum > monthdays) {
            dd.push(-1);
          } else {
            dd.push(initnum);
          }
        }
      }
      total.push({
        year: initMonth.year,
        month: initMonth.month,
        day: dd
      });
      dd = [];
      initnum = 0;
    }
    this.monthList = total;
    console.log("月份数组", total);
  },
  mounted(){
    
  },
}
</script>


<style  lang="stylus" rel="stylesheet/stylus" scoped>
  *
    padding: 0
    margin: 0
    box-sizing: border-box
  .time 
    color: #666
    margin-top: 46px
    box-sizing: border-box
    position: relative
    transition:all 0.3s
    &.fade-enter,&.fade-leave-to
      transform: translateY(100%);
    // &.fade-leave-to
    //   transform: translateY(-100%);
    .weekcontain
      // position: absolute
      // top: 0px
      // left:0px 
      height:20px 
      line-height:20px 
      width: 100%
      background:#f4f4f4
      ul 
        display: flex
        flex-direction: row
        list-style: none
        flex-flow: nowrap
        box-sizing: border-box
        li
          flex:1
          text-align:center
          font-size:14px 
          color:#666
    .wrapper
      margin-top: 10px
      // height: 380px
      overflow: hidden
      background:#fff
      .datedetails
        font-size:15px 
        width:100% 
        color:#666
        text-align:center
      .dayscontain
        width:100% 
        margin-top:10px 
        ul 
          list-style: none
          display: -webkit-box
          display: -ms-flexbox
          display: flex
          -webkit-box-orient: horizontal
          -webkit-box-direction: normal
          -ms-flex-direction: row
          flex-direction: row
          -ms-flex-flow: wrap
          flex-flow: wrap
          li 
            position: relative
            width: 14%
            height: 44px
            padding: 5px
            text-align:center
            color:#333
            text-align:center 
          .unablechoosed
              color: rgba(6, 6, 6, 0.2)
            .item-show
              display: -webkit-box
              display: -ms-flexbox
              display: flex
              -webkit-box-orient: vertical
              -webkit-box-direction: normal
              -ms-flex-direction: column
              flex-direction: column
              -webkit-box-pack: end
              -ms-flex-pack: end
              justify-content: flex-end
              height: 100%
              margin-top: 10px
              border-radius: 5px
            .havechoose
                background-color: orange
              .date
                vertical-align:top
                line-height:17px 
                font-size:14px  
                overflow:hidden
              .lowestprice
                font-size:12px 
                overflow:hidden

              
</style>
