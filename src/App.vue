<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import https from "@/https.js"

export default {
  data(){
    return {

    }
  },
  created(){
    
  },
  components:{
    
  }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .v-enter-active, .v-leave-active 
    transition: all 0.5s 
  .v-enter
    transform: translateX(100%);
  .v-leave-to
    transform: translateX(-100%);
</style>
