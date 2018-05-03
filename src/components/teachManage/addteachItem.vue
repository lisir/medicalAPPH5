<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="布置课题" bgcolor="#1D98DE" color="#fff" height="0.9rem" fontsize="0.36rem">
      <span slot="left" @click="back">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </span>
    </yd-navbar>
    <div class="addteachcontent">
      <div class="additem">
        <span>课题名称</span>
        <span class="input"><input placeholder="请输入课题名称" v-model="pram['subject.subjectName']"/></span>
      </div>
      <div  class="additem">
        <span>课题描述</span>
        <span class="input"><input placeholder="请输入课题描述" v-model="pram['subject.subjectDescription']"/></span>
      </div>
      <div  class="additem">
        <span>汇报频率</span>
        <span class="input"><input placeholder="请输入汇报频率" v-model="pram['subject.frequency']"/></span>
      </div>
      <div  class="additem">
        <span >截止时间</span>
        <span class="input"><yd-datetime type="date" v-model="pram['subject.limitedTime']"></yd-datetime>
        </span>
      </div>
      <div class="additem">
        <span>发送对象</span>
        <span @click="selectStu">
          <div class="selectStu" v-if="students.length==0">
            <span>请选择</span>
            <span>></span>
          </div>
          <div class="students" v-else>
            <span v-for="i in students"><img :src="i.certificatePic"></span>
          </div>
        </span>
      </div>
      <div class="sub" @click="subAdd">确定</div>

    </div>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
//      token:"9f2c44de79443ada945bce9e6c0383cd",
      pram:{
        "subject.subjectName":"",
        "subject.subjectDescription":"",
        "subject.limitedTime":"2018-04-18",
        "subject.frequency":""
      },
    students:[],
      stuIds:[]
    }
  },
  created: function(){
    console.log(this.$route);
    this.token = this.$route.query.token;
    if(this.$route.query.stulist){
      this.pram = this.$route.query;
      this.stuIds = this.$route.query.stulist.split(",");
      console.log(this.stuIds);
      this.getStulist()
    }

  },

  methods:{
    back:function () {
      this.$router.back()
    },
    selectStu:function () {
      var vm = this;
      this.$router.replace({path:'selectStu',query:vm.pram})
    },
    getStulist:function () {
      var vm = this;
      vm.students = [];
      $.ajax({
        url: vm.path+"teachingManage/queryStudents",
        dataType: "json",
        data:{token:vm.token},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode == 0){
            for(var i = 0;i<data.dataInfo.listData.length;i++){
              console.log(data.dataInfo.listData[i].userId);
              console.log(vm.stuIds);
              console.log(vm.stuIds.indexOf(data.dataInfo.listData[i].userId.toString()) );

              if(vm.stuIds.indexOf(data.dataInfo.listData[i].userId.toString()) > -1){
                vm.students.push(data.dataInfo.listData[i])
              }
            }
            console.log( vm.students);
          }
        },
        error: function() {

        }
      });
    },
    subAdd:function () {
      var vm = this;
      var prams = vm.pram;
      prams.token = vm.token;
      prams.userId = vm.stuIds.join(",");
      console.log(prams);
      vm.$dialog.loading.open('正在提交');
      $.ajax({
        url: vm.path+"teachingManage/saveSubject",
        dataType: "json",
        data:prams,
        type: "get",
        success: function(data) {
          console.log(data);
          vm.$dialog.loading.close();
          vm.$dialog.toast({
            mes: data.message,
            timeout: 500
          });
          if(data.statusCode == 0){
              vm.$router.back();
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
  .addteachcontent{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-left: 0.36rem;
    padding-right: 0.5rem;
    padding-top: 0.3rem;
  }
.additem{
  margin-top: 0.34rem;
  display: flex;
  min-height: 0.6rem;
  align-items: center;
}
  .additem>span:first-child{
    width:1.5rem ;
  }
  .additem>span:last-child{
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .additem .input{
    border: solid 1px #e4e4e4;
    padding-left: 0.2rem;
    min-height: 0.6rem;

  }
  .additem input{
    width: 100%;
    height: 100%;
    border: none;
  }
  .additem .selectStu{
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #888;
    padding-left: 15px;
  }

  .sub{
    width: 100%;
    height: 0.8rem;
    background-color: #00B3FF;
    border-radius: 4px;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.8rem;
    margin-top:0.42rem ;
  }
  .students img{
    width:0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: #eee;
    margin-right: 0.2rem;

  }
</style>
