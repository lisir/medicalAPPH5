<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="教学管理" bgcolor="#004D97" color="#fff" height="0.9rem" fontsize="0.36rem">
      <router-link to="students" slot="right">
        <yd-icon name="ucenter" size="0.45rem" color="#fff"></yd-icon>
      </router-link>
    </yd-navbar>
    <div class="teachcontent">
      <div v-for="item in teachList" class="teachItem" @click="goteachitem(item)">
       <div class="teachtop">
         <span>{{item.subject.subjectName}}</span>
         <span v-if="item.subject.status==1" style="color:#f00">进行中</span>
         <span v-else style="color:#555">已结束</span>
       </div>
        <div class="teachcenter">
          <div>
           <p>截止时间：{{item.subject.limitedTime}}</p>
           <p class="endStu">已完成同学：<span class="endStuImgs"><img v-for="i in item.finishs" :src="i.paperUrl" /></span></p>
          </div>
          <div>
            >
          </div>
       </div>
      </div>
      <div class="add" @click="goadditem">
        +
      </div>
    </div>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
//      token:"9f2c44de79443ada945bce9e6c0383cd",
      teachList:[]
    }
  },
  mounted: function(){
      this.token = this.$route.query.token;
      this.getmessage()
  },

  methods:{
    goteachitem(item){
      localStorage.setItem("MicteachItem",JSON.stringify(item));
      this.$router.push({ path:"teachingItem"});
    },
    goadditem:function () {
      this.$router.push({ path:"addteachItem"});
    },
    getmessage:function () {
      var vm = this;
      $.ajax({
        url: vm.path+"/teachingManage/querySubject",
        dataType: "json",
        data:{token:vm.token},
        type: "get",
        success: function(data) {
          console.log(data);
          if(data.statusCode == 0){
           vm.teachList = data.dataInfo.listData;
           console.log(vm.teachList);
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
  .teachcontent{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .teachItem{
    border-bottom: solid 10px #eee;
    padding-left: 0.22rem;
    padding-right: 0.22rem;
  }
  .teachtop{
    background-color: #fff;
    display: flex;
    padding-top:0.17rem ;
    font-size: 0.32rem;
  }

  .teachtop>span:first-child{
   flex: 1;
  }
  .teachtop>span:last-child{
    width: 1rem;
    text-align: right;
    font-size: 0.24rem;
  }
  .teachcenter{
    display: flex;

    font-size: 0.28rem;
    padding-bottom: 0.1rem;
  }
  .teachcenter>div:first-child{
    flex: 1;
    padding-top:0.17rem ;
  }
  .teachcenter>div:last-child{
    width: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #888;
    font-size: 0.25rem;
    transform: scale(1,1.7);
    -ms-transform: scale(1,1.7);
    -webkit-transform: scale(1,1.7);
    -moz-transform: scale(1,1.7);
    -o-transform: scale(1,1.7);
  }
  .endStu{
    display: flex;
    align-items: center;
    height: 0.9rem;
  }
  .endStuImgs{
    display: flex;
    align-items: center;
  }
  .endStuImgs img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: #eee;
    margin-left: 8px;
  }
  .add{
    position: fixed;
    right: 0.5rem;
    bottom: 2.5rem;
    width: 1.1rem;
    height: 1.1rem;
    background-color:#00B3FF;
    border-radius: 50%;
    text-align: center;
    line-height: 1.1rem;
    color: #fff;
    font-size: 0.8rem;

  }
</style>
