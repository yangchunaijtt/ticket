<template>
  <div class="order">
    <div class="header">
      <i class="icon iconfont iconzuo1"></i>
      <span class="name">订单填写</span>  
    </div>
    <!-- 中间内容 -->
    <div class="center">
      <div class="details">
        <div class="name">
          <h2 class="title">成人票（含游船）【无需取票·刷证入园】</h2>
          <router-link to="" class="link">
            订票须知
            <i class="icon iconfont iconyou"></i>
          </router-link>
        </div>
        <div class="time">
          <div @click="selectTime">点击</div>
          <!-- 填充time的地方 -->
          
        </div>
        <div class="count">
          <span class="number">购买数量</span>
          <div class="click">
            <i class="dec-count" @click="decCount"></i>
            <input type="text" :value="number" class="list" @blur="countBlur(e)">
            <i class="add-count" @click="addcount"></i>
          </div>
        </div>
      </div>
      <div class="people">
        <div class="title"> 
          取票人信息
          <span class="tell">【网络在线预定需填写一个游玩人的信息】</span>
        </div>
        <div class="fill">
          <div class="name item">
            <span class="span">姓名</span>
            <input type="text" :placeholder="idNameTest" class="input" @blur="testName" v-model="idName">
          </div>
          <div class="phone item">
            <span class="span">手机号</span>
            <input type="text" :placeholder="phoneNumberTest" class="input" @blur="testPhone" v-model="phoneNumber">
          </div>
          <div class="id item">
            <span class="span">身份证</span>
            <input type="text" :placeholder="testIdNumberTest" class="input" @blur="testId"  v-model="testIdNumber">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="price">
        应付：
        <span class="nowprice">1488.54</span>
        <span class="olprice">1822.33</span>
      </div>
      <div class="submit">
        提交订单
      </div>
    </div>
    <calendar @change="onChange" ref="picket"/>
  </div>
</template>
<script>



export default {
  data(){
    return {
      number:1,  
      
      // 检测用户输入
      idName:"",
      idNameTest:"必填",
      phoneNumber:null,
      phoneNumberTest:"接收取票短线凭证",
      testIdNumber:null,
      testIdNumberTest:"用于景区入园等凭证",
      // 手机端时间选择数据
     
    }
  },
  mounted(){

  },
  methods:{
    decCount(){
      
    },
    addcount(){

    },
    countBlur(e){

    },
    // 检验用户输入
    testName(){
      let regxm = /^[\u4E00-\u9FA5]{2,4}$/;
      if (this.idName ==="") {
        this.idNameTest ="请输入姓名";
      }else if(!regxm.test(this.idName)){
  　　　　this.idNameTest ="姓名不能含有非法字符！";
        this.idName = "";
      }　
    },
    testPhone(){

    },
    testId(){

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
    // 其他
  },
  watch:{
    // 检测用户的三个输入
    idName(oldVlaue,newValue){
      let regxm = /^[\u4E00-\u9FA5]{2,4}$/;
  　　if(!regxm.test(newValue)){
  　　　　this.idNameTest ="名称不能含有非法字符！";
         this.idName = oldVlaue;
      }　
    },
    phoneNumber(){

    },
    testIdNumber(){

    },
  },
  components:{
    
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
          .tell
            color:#999
            font-size:13px
        .fill
          .item
            display:flex 
            height:45px
            line-height:45px 
            border-bottom:1px solid #dcdcdc
          .item:last-child
              border-bottom:none 
            .span
              width:52px 
              overflow:hidden
              color:#333
              font-size:14px 
              text-align:left
            .input
              flex:1
              width:100%
              height:100%
              color:#333
              font-size:13px
    .bottom
      display:flex
      position:fixed
      bottom:0 
      left:0 
      width:100% 
      height:48px 
      line-height:48px
      background:#fff
      .price
        flex:1 
        text-indent:20px 
        font-size:15px 
        overflow:hidden
        .nowprice
          font-size:17px 
          color:#FE686C
        .olprice
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

