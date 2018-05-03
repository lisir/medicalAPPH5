<template>
<div class="communtiy">
  <yd-layout>

    <yd-navbar slot="navbar" title="圈子" bgcolor="" color="#222" height="0.9rem" fontsize="0.36rem">
    </yd-navbar>
    <div class="list">
      <yd-cell-item>
        <span slot="left">我的医脉</span>
        <span slot="right">
        <yd-navbar-next-icon size="0.25rem"></yd-navbar-next-icon></span>
      </yd-cell-item>
      <div style="background-color: #eee;height: 0.15rem"></div>
      <yd-cell-item @click.native="goItem('peerDynamics')">
        <span slot="left">同行动态</span>
        <span slot="right">
        <yd-navbar-next-icon size="0.25rem"></yd-navbar-next-icon></span>
      </yd-cell-item>
      <div style="background-color: #eee;height: 0.15rem"></div>
      <yd-cell-item>
        <span slot="left">医学前言</span>
        <span slot="right">
        <yd-navbar-next-icon size="0.25rem"></yd-navbar-next-icon></span>
      </yd-cell-item>
      <div style="background-color: #eee;height: 0.15rem"></div>
      <yd-cell-item>
        <span slot="left">医学讲堂</span>
        <span slot="right">
        <yd-navbar-next-icon size="0.25rem"></yd-navbar-next-icon></span>
      </yd-cell-item>
      <div style="background-color: #eee;height: 0.15rem"></div>
    </div>

  </yd-layout>

</div>
</template>


<script>
export default {
  data () {
    return {

    }
  },
  mounted: function(){
//    this.token = this.$route.query.token;
    this.token = this.$route.query.token;

  },

  methods:{
    goItem:function (item) {
      this.$router.push({ path: item,query:{token:this.token}});
    },



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .communtiy{
    width: 100%;
    height: 100%;
  }
  .yd-scrollview{
    height: 100%;
  }
  .list{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
