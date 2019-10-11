<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import https from "@/https.js"

export default {
  data(){
    return {

    }
  },
  computed:{
    
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
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
