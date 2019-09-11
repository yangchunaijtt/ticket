<template>
  <div class="index">
    <v-header></v-header>
    <screen></screen>
    <must-play></must-play>
    <popular></popular>
  </div>
</template>

<script>
import header from "@/components/headers/headers.vue"
import mustPlay from "@/components/mustPlay/mustPlay.vue"
import screen from "@/components/screen/screen.vue"
import popular from "@/components/popular/popular.vue"

export default {
  data(){
    return {
     
    }
  },
  created(){

  },
  mounted(){
    
  },
  methods:{
   
  },
  components:{
    'v-header':header,
    "must-play":mustPlay,
    "screen":screen,
    "popular":popular,
  }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .index
    width:100%
</style>