<template>
  <div class="fill">
      <div class="name item">
        <span class="span">姓名</span>
        <div class="inputdiv">
          <input type="text" placeholder="必填" class="input" @blur="testName" v-model="people.name">
          <div class="nametest filltest" v-show="idNameNo">姓名格式不正确</div>
        </div>
      </div>
      <div class="phone item">
        <span class="span">手机号</span>
        <div class="inputdiv">
          <input type="text" placeholder="接收取票短线凭证" class="input" @blur="testPhone" v-model="people.mobile">
          <div class="phonetest filltest" v-show="phoneNumberNo">手机号格式不正确</div>              
        </div>
      </div>
      <div class="id item">
        <span class="span">身份证</span>
        <div class="inputdiv">
          <input type="text" placeholder="请输入证件号码" class="input" v-model="people.credentials" @blur="idNumber">
          <div class="phonetest filltest" v-show="idNumberNo">证件号码格式错误</div>    
        </div>
      </div>
    </div>  
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { isError } from 'util';

export default {
  props:{
     traveller: {
      required: true,
      default:() => {return {}}
    },
    cardType: {
      type: String,
      default: "",
      required: true
    },
  },
  data(){
    return {
      people:{
        // 检测用户输入的三个名目分类
        // idName:"",
        // phoneNumber:null,
        // idNumber:null,
        // credentialsType:null,

      },
      idNameNo:false,
      phoneNumberNo:false,
      idNumberNo:false,
      // 其他
      activeNames: true,
      currentCard: "",
      isError:false,
    }
  },
  methods:{
    // 使用vuex
    ...mapMutations({
      addtravers: "ADDTRAVERS",
      removeLasttravers: "REMOVELASTTRAVEL"
    }),
    // 手动输入数量
    countBlur(){
      // this.number = 
      console.log(this.ticketnum);
    },
    // 检验用户输入
    testName(){
      let regxm = /^[\u4E00-\u9FA5]{2,4}$/;
      if (this.people.name ==="") {
        this.idNameNo = true;
      }else if(!regxm.test(this.people.name)){
        // this.idNameTest ="姓名不能含有非法字符！";
        this.idNameNo = true;
        // this.idName = "";
      }else {
        this.idNameNo = false;
      }
    },
    testPhone(){
      if(!(/^1[3456789]\d{9}$/.test(this.people.mobile))){ 
        // this.phoneNumberTest = "手机号有误，请重填！";
        this.phoneNumberNo = true;        
        // this.phoneNumber = "";
      }else {
        this.phoneNumberNo = false; 
      }
    },
    idNumber(){
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
       if(reg.test(this.people.credentials) === false)  {  
            this.idNumberNo = true;
        }else {

          this.idNumberNo = false;
        }  
    },
  },
  mounted() {
    // this.$validator.validate();
    console.log("添加游玩人数到store",this.cardType);
    this.currentCard = this.cardList[0];
    this.people.credentialsType=this.currentCard;
    this.addtravers(this.people);
    // this.$emit("Errors", this.index, this.$validator);
  },
  computed:{
    cardList() {
      console.log("111cardType",this.cardType);
      // let arr = this.cardType.split("-");
      return this.cardType.split(",");
    },
  },
  watch:{
    // 检测错误
    people(val){
      // console.log(val);
      let idnamereg = /^[\u4E00-\u9FA5]{2,4}$/;
      let phonereg  = /^1[3456789]\d{9}$/;
      let idreg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
      
      if ( null !== this.people.name && !(idnamereg.test(this.people.name))){

          this.isError = "请正确填写联系人姓名";
          this.$emit('isError',this.isError);

      }else if (null !== this.people.mobile && !(phonereg.test(this.people.mobile))) {
        this.isError = "请正确填写手机号";
        this.$emit('isError',this.isError);
      }else if ( null !== this.people.credentials && !idreg.test(this.people.credentials)) {
        this.isError = "请正确填写身份证信息";
        this.$emit('isError',this.isError);
      }else {
        this.isError == false;
      }
    },
  },
  beforeDestroy() {
    console.log("我要销毁了");
    this.$emit("reomve-errors");
    this.removeLasttravers(); //删除游客
  }
}
</script>

<style lang="stylus" scoped>
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
          line-height:15px 
          color: #f44
          font-size: 12px
          text-align:left
</style>
