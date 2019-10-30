<template>
  <div class="people">
    <div class="title"> 
      取票人信息
      <span class="tell">【网络预定需填写一个游客信息】</span>
    </div>
    <travelpeople :traveller="traveller"  :cardType="traveller.credentialsType" @isError="gerError">

    </travelpeople>
  </div>
</template>

<script>

import travelpeople from "../travelpeople/travelpeople"

export default {
  components:{
    travelpeople,
  },
  props:{
    traveller: {
      type: Object,
      default: {},
      // required: true
    },
    travelpeoplenums: {
      type: Number,
      default: 1
    },
  },
  data(){
    return {

    }
  },  
  methods:{
    gerError(err){
      this.$emit(err);
    }
  },
}
</script>

<style lang="stylus" scoped>
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
        
</style>
