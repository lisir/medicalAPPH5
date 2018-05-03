<template>
  <yd-layout>
    <yd-grids-group :rows="3">

      <yd-grids-item class="griditem" @click.native="goitem('teachingManagement')">
        <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
        <span slot="text">教学管理</span>
      </yd-grids-item>
      <yd-grids-item class="griditem" @click.native="goitem('replayManagement')">
        <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
        <span slot="text">回访管理</span>
      </yd-grids-item>
      <yd-grids-item class="griditem" @click.native="goitem('community')">
        <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
        <span slot="text">圈子</span>
      </yd-grids-item>
    </yd-grids-group>


    <yd-tabbar slot="tabbar" active-color="#888">
      <yd-tabbar-item title="首页" link="#" :active="true">
        <yd-icon name="home" slot="icon" size="0.4rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="发现" link="#" :active="true">
        <yd-icon name="discover" slot="icon" size="0.4rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="圈子" link="community"  :active="true">
        <yd-badge slot="badge" type="danger">99+</yd-badge>
        <yd-icon name="weixin" slot="icon" size="0.4rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="我" link="#" :active="true">
        <yd-icon name="ucenter" slot="icon" size="0.4rem"></yd-icon>

      </yd-tabbar-item>
    </yd-tabbar>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {

    }
  },
  mounted: function(){

  },

  methods:{
    goitem:function (item) {
      this.$router.push({ path: item});
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.griditem{
  height: 33vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
