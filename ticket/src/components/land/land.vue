<template>
  <div class="land">
    <van-nav-bar title="登陆"
                 fixed
                 left-arrow
                 @click-left="onClickLeft" />
    <van-cell-group>
      <van-field label="手机号"
                 placeholder="请输入手机号"
                 :error="isPhoneerror"
                 :error-message="phoneerrorMessage"
                 v-model="phonenum">
      </van-field>
      <van-field center
                 v-model="sms"
                 label="短信验证码"
                 placeholder="请输入短信验证码"
                 icon="clear"
                 @click-icon="sms = ''">
        <van-button slot="button"
                    size="small"
                    type="primary"
                    @click="sendSms"
                    :disabled="canuse">{{buttonstr}}</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-button">
      <van-button size="normal"
                  bottom-action
                  class="buttong"
                  :loading="isloading"
                  @click="clicktologin"
                  :disabled="canlogin"> {{loginstr}}</van-button>
    </div>
  </div>
</template>
<script>

import { Row, Col, Field, NavBar, Cell, CellGroup, Button } from "vant";

// 请求部分配置和引入
import https from "../../https.js"

const ERR_OK = 200;
const land_url =  "http://m.czgdly.com/transportation/login/sendcode.asp";


let sec = 59;

export default {

  name:"land",
  data(){
    return { 
      currentuid: 0,
      phoneerrorMessage: "",
      fullPath: "/",
      canlogin: false,
      loginstr: "登陆",
      isloading: false,
      phonenum: "",
      sms: "",
      canuse: false,
      buttonstr: "发送验证码"
    }
  },
  computed: {
    isPhoneerror() {
      if (!this.$checkphone(this.phonenum)) {
        this.phoneerrorMessage = "手机号码格式不正确";
        this.canlogin = true;
      } else {
        this.phoneerrorMessage = "";
        this.canlogin = false;
      }
      return !this.$checkphone(this.phonenum);

    }
  },
  methods:{
    async clicktologin() {
      this.isloading = true;
      this.loginstr = "登陆中。。";
      this.canlogin = true;
      try {

        http.fetchGet("http://m.czgdly.com/transportation/login/sendcode.asp",{
            c: "2",
            tel: this.phonenum,
            name: this.phonenum,
            val: this.sms,
            wherefrom: this.$cookies.get("WHERE"),
            tuijian: window.localStorage.getItem("agency")
        }).then( (data) => {
          const res_login = data;
                    if (res_login.data.message == "success") {
                        this.loginstr = "登陆成功";
                        this.isloading = false;
                        this.$cookies.set("gdmobileusername", this.phonenum, 1 * 60 * 60);
                        this.$cookies.set(
                          "USERIDGDLY",
                          res_login.data.data.userid,
                          1 * 60 * 60
                        );
                        this.$cookies.set("gdmobileuserphone", this.phonenum, 1 * 60 * 60);
                        this.$cookies.set(
                          "usersecret",
                          res_login.data.data.usersecret,
                          1 * 60 * 60
                        );
                        this.$cookies.set("userid", res_login.data.data.tuijian, 1 * 60 * 60); //推荐人 0 or 123123
                        
                        // 
                        http.fetchGet("http://m.czgdly.com/transportation/getuserid.asp",{}).then( (data) => {
                          const res_getoaid = data;
                          if (res_getoaid.data.error == 0) {
                          if (res_getoaid.data.data.user_id != "0") {
                            this.$cookies.set(
                                "userid",
                                res_getoaid.data.data.user_id,
                                1 * 60 * 60
                              ); //odid 0 or 123123
                            }
                          }
                          console.log(typeof this.$cookies.get("userid"));
                          if (this.$cookies.get("userid") === "0") {
                            this.$cookies.set("userid", this.currentuid, 1 * 60 * 60); //uid 0 or 32532534
                          }
                          setTimeout(() => {
                            //这里要跳转
                            // console.log("要跳转的url", this.fullPath);
                            this.$router.push(this.fullPath);
                          }, 500);
                          }).catch( err => {
                            this.isloading = false;
                            this.loginstr = "验证码不正确";

                            setTimeout(() => {
                              this.canlogin = false;

                              this.loginstr = "登陆";
                            }, 2000);
                        })
                        
                    } else {
                      this.isloading = false;
                      this.loginstr = "验证码不正确";

                      setTimeout(() => {
                        this.canlogin = false;

                        this.loginstr = "登陆";
                      }, 2000);
                    }
        }).catch( err=> {
          this.isloading = false;
          this.loginstr = "验证码不正确";

          setTimeout(() => {
            this.canlogin = false;

            this.loginstr = "登陆";
          }, 2000);
        })
        
      } catch (error) {
          this.loginbuttonenabel = false;
          this.loginbuttonstatus = "登陆";
      }
    },
    sendSms(){
      let sec = 59;
      this.canuse = true;
      if (this.phonenum ==="" || !this.$checkphone(this.phonenum)) {
        this.phoneerrorMessage = "手机号码格式不正确";
        this.canlogin = true
        return ;
      }else {
        this.phoneerrorMessage = "";
        this.canlogin = false;
      }
      https.fetchGet(land_url,{} ).then((data) => {
        // console.log(data);
        if ( data.status == ERR_OK ) {
          console.log("发送验证码返回的信息", data);
        }else {
          console.log("发送验证码出错",data.status)
        }
      }).catch(err=>{
              console.log("发送验证码出错",err);
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
    onClickLeft(){
      this.$router.go(-1);
    },
  },
  watch:{
    phoneNumber(newValue){
      // console.log(newValue);
    }
  },
  components:{
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-button": Button,
    "van-nav-bar": NavBar,
    "van-col": Col,
    "van-row": Row
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped> 
  .land 
    box-sizing: border-box
    padding-top: 100px
    .login-button 
      margin-top: 20px
      padding: 0 20px
      .buttong 
        width:100%
        border-radius: 5px
</style>
