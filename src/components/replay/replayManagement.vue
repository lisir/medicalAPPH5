<template>
<div>
  <div class="replayList">
    <yd-cell-item v-for="item in replayList" @click.native="gorepItem(item)">
      <span slot="left">{{item.tableName}}</span>
      <span slot="right">
        <yd-navbar-next-icon size="0.25rem"></yd-navbar-next-icon></span>
    </yd-cell-item>
  </div>
</div>
</template>


<script>
export default {
  data () {
    return {
//      token:"9f2c44de79443ada945bce9e6c0383cd",
      replayList:[],
      patientId:"339",
      patientRecordId:"348"
    }
  },
  mounted: function(){
//    this.token = this.$route.query.token;
    this.token = this.$route.query.token;
    this.patientId = this.$route.query.patientId;
    this.patientRecordId =this.$route.query.patientRecordId;
    this.getlist();
  },

  methods:{
    getlist:function () {
      var vm = this;
      $.ajax({
        url: vm.path+"patientManage/queryVisittable.json",
        dataType: "json",
        data:{token:vm.token},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode == 0){
           vm.replayList = data.dataInfo.listData;
          }
        },
        error: function() {

        }
      });
    },
    gorepItem:function (item) {
      console.log(item);
      localStorage.setItem("MicreplayItem",JSON.stringify(item));
      this.$router.push({ path:"replayItem",query:{token:this.token,patientId:this.patientId,patientRecordId:this.patientRecordId}});
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .replayList{
    background-color: #fff;
  }
</style>
