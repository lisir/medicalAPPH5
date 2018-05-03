<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="学生列表" bgcolor="#1D98DE" color="#fff" height="0.9rem" fontsize="0.36rem">
      <span slot="left" @click="back">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </span>
      <router-link to="students" slot="right">
        <span style="font-size: 0.55rem;color: #fff">+</span>
      </router-link>
    </yd-navbar>
     <div class="studentlist">
        <div class="studentItem" v-for="item in studentList">
          <span><img :src="item.certificatePic"></span>
          <span>
            <p>{{item.userName}}</p>
            <p>备注备注备注备注备注备注</p>
          </span>
        </div>
     </div>
  </yd-layout>
</template>

<script>

export default {


  data () {
    return {
//      token:"9f2c44de79443ada945bce9e6c0383cd",
      studentList:[],
    }
  },
  mounted: function(){
    this.token = this.$route.query.token;
    this.getmessage();
  },

  methods:{
    back:function () {
      this.$router.back()
    },
    getmessage:function () {
      var vm = this;
      $.ajax({

        url: vm.path+"teachingManage/queryStudents",
        dataType: "json",
        data:{token:vm.token},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode == 0){
            vm.studentList = data.dataInfo.listData;
          }
        },
        error: function() {

        }
      });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .studentlist{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
.studentItem{
  display: flex;
  border-bottom: solid 1px #eee;
}
.studentItem>span:first-child{
  width: 1.4rem;
  height: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.studentItem>span:last-child{
  flex: 1;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
  .studentItem>span:last-child p{
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .studentItem>span:last-child p:last-child{
    font-size: 0.23rem;
    color: #888;
  }
.studentItem>span img{
   width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
}
</style>
