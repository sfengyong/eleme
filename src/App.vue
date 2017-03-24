<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div id="nav">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
        <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <shoppingcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" ></shoppingcar>
    <detail></detail>
  </div>
</template>

<script>
import head from "./components/Head.vue"
import shoppingcar from "./components/shoppingcar.vue"
import detail from "./components/detail.vue"

export default {
  name: 'app',
  components:{
     vHeader:head,
     shoppingcar:shoppingcar,
     detail:detail,
  },
  data(){
    return {
      seller:{},
    };
  },
  created(){
    var _this = this;
    this.$http.get('./data.json').then(function(response){
        _this.seller=response.body.seller;
      },function(response){});
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar{
  width:0;
}

*{
  margin:0px;
  padding:0px;
}
#app{
  width: 100%;
  height: 100%;
}
#nav
{
  display:flex;
  width:100%;
  height:40px;
  line-height:40px;
}
#nav .tab-item
{
    flex:1;
    text-align:center;
    border-bottom:1px solid rgba(7,17,27,0.1);
    font-size: 14px;
    color: rgb(77,85,93);
  
}
a
{
  text-decoration:none;

}
.router-link-active
{
  border-bottom:1px solid rgba(7,17,27,0.1);
  color:red;
}
</style>
