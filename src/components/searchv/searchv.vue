<template>
  <div class="searchv">
    <div class="header">
      <i class="icon iconfont iconzuo1"></i>
      <div class="frame">
        <i class="icon iconfont iconsousuo"></i>
        <input type="text" placeholder="常州">
      </div>
    </div>
    <div class="content">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="(item,index) in popularData">
          <router-link to="/tour">
            {{item}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      popularData:[
        "常州恐龙园",
        "嬉戏谷",
        "天目湖",
        "南山竹海",
        "长隆度假区",
        "东方盐湖城",
        "灵山大佛",
      ],
    }
  },
  created(){
    
  },
  methods:{

  }
}
</script>
<style lang="stylus"  rel="stylesheet/stylus" scoped>

</style>

