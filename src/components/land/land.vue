<template>
  <div class="land">
    <mt-header title="登录">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <div class="phone">
        <mt-field label="手机号" :placeholder="phoneTest"  type="number" v-model="phoneNumber" ></mt-field>
      </div>
      <div class="code">
        <div class="left">
          <mt-field label="短信验证码" placeholder="请输入短线验证码" type="number" v-model="codeNumber"></mt-field>
        </div>
        <div class="right" @click="sendCode">
          <mt-button type="primary" >{{buttonstr}}</mt-button>
        </div>
      </div>
      <div class="deng">
        <mt-button @click.native="landId" size="large">{{loginstr}}</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Header,Field ,Button } from 'mint-ui';

// 请求部分配置和引入
import https from "../../https.js"

const ERR_OK = 200;
const code_url =  "http://m.czgdly.com/transportation/login/sendcode.asp";

let sec = 59;

export default {
  data(){
    return { 
      phoneNumber:"", //用户手机号
      phoneTest:"请输入手机号",
      codeNumber:"",
      canuse:null,
      buttonstr:"发送验证码",
      loginstr:"登录",
      canlogin: false,
      isloading:false,
    }
  },
  methods:{
    sendCode(){  // 发送验证码
      
      this.canuse = true;
      if (  this.phoneNumber == "") {
        this.phoneTest = "请重新输入手机号"
        return 
      }
      if ( sec != 59) {
        return ;
      }
      // 发送请求
      https.fetchPost(code_url ,{ tel: this.phoneNumber, c: "1" }).then((data) => {
        // console.log("取到数据",data,data.status);
          console.log("发送验证码返回的信息", data);
        }).catch( err=> {
            console.log("发生错误",err);
          }
      );
      this.buttonstr = "60秒后重新发送";
      //发送验证码逻辑
      const smsloop = setInterval(() => {
        this.buttonstr = sec + "秒后重新发送";
        sec--;
        if (sec < 0) {
          this.buttonstr = "发送验证码";
          this.canuse = false;
          sec = 59;
          clearInterval(smsloop);
        }
      }, 1000);
    },
    async landId(){  // 登录操作
      if ( this.phoneNumber === "" ) {
        this.loginstr="请输入手机号";
        return ;
      }
      if ( this.codeNumber === "") {
        this.loginstr="请输入验证码";
        return ;
      }
      this.isloading = true;
      this.loginstr = "登陆中。。";
      this.canlogin = true;
      try {
        const res_login = await this.$axios.get(
          "http://m.czgdly.com/transportation/login/sendcode.asp",
          {
            params: {
              c: "2",
              tel: this.phoneNumber,
              name: this.phoneNumber,
              val: this.sms,
              wherefrom: this.$cookie.get("WHERE"),
              tuijian: window.localStorage.getItem("agency")
            }
          }
        );
        if (res_login.data.message == "success") {
          this.loginstr = "登陆成功";
          this.isloading = false;
          this.$cookie.set("gdmobileusername", this.phoneNumber, 1 * 60 * 60);
          this.$cookie.set(
            "USERIDGDLY",
            res_login.data.data.userid,
            1 * 60 * 60
          );
          this.$cookie.set("gdmobileuserphone", this.phoneNumber, 1 * 60 * 60);
          this.$cookie.set(
            "usersecret",
            res_login.data.data.usersecret,
            1 * 60 * 60
          );
          this.$cookie.set("userid", res_login.data.data.tuijian, 1 * 60 * 60); //推荐人 0 or 123123
          const res_getoaid = await this.$axios.get(
            "http://m.czgdly.com/transportation/getuserid.asp",
            {
              params: {
                mobile: this.phoneNumber
              }
            }
          );
          if (res_getoaid.data.error == 0) {
            if (res_getoaid.data.data.user_id != "0") {
              this.$cookie.set(
                "userid",
                res_getoaid.data.data.user_id,
                1 * 60 * 60
              ); //odid 0 or 123123
            }
          }
          console.log(typeof this.$cookie.get("userid"));
          if (this.$cookie.get("userid") === "0") {
            this.$cookie.set("userid", this.currentuid, 1 * 60 * 60); //uid 0 or 32532534
          }
          setTimeout(() => {
            //这里要跳转
            // console.log("要跳转的url", this.fullPath);
            this.$router.push(this.fullPath);
          }, 500);
        } else {
          this.isloading = false;
          this.loginstr = "验证码不正确";

          setTimeout(() => {
            this.canlogin = false;

            this.loginstr = "登陆";
          }, 2000);
        }
      } catch (error) {
        this.loginbuttonenabel = false;
        this.loginbuttonstatus = "登陆";
      }
    },
  },
  watch:{
    phoneNumber(newValue){
      // console.log(newValue);
    }
  },
  components:{
    Button
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .land
    width:100%
    .content
      position:relative
      top:60px
      .phone
        width:100%
      .code 
        display:flex
        width:100% 
        .left
          display:inline-block
          flex:1
        .right 
          display:inline-block
          width:105px 
          font-size:14px 
          .mint-button
            height:80% 
            width:100% 
            margin-top:5%
            font-size:12px 
      .deng
        position:relative
        top:30px 
        width:90% 
        margin:0 auto
        .mint-button
          background:#f85
          color:#fff
</style>
