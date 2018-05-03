<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="课题详情" bgcolor="#1D98DE" color="#fff" height="0.9rem" fontsize="0.36rem">
      <span slot="left" @click="back">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </span>
    </yd-navbar>
    <div class="teachcontent">
      <div  class="teachItem" >
        <div class="teachtop">
          <span>{{teachItem.subject.subjectName}}</span>
          <span v-if="new Date().valueOf()-new Date(teachItem.subject.limitedTime).valueOf()>0" style="color:#f00">进行中</span>
          <span v-if="new Date().valueOf()-new Date(teachItem.subject.limitedTime).valueOf()<0" style="color:#555">已结束</span>
        </div>
        <div class="itemconter">
           <p>
             <span>课题描述：</span>
             <span>{{teachItem.subject.subjectDescription}}爱上的课教案扣爱空间上看来大家爱离开时记得来看卡萨丁可拉伸的卡拉了深刻的卢卡斯的考拉了圣诞节AAS啊；大家看了</span>
           </p>
          <p>
             <span>截止时间：</span>
             <span>{{teachItem.subject.limitedTime}}</span>
           </p>
          <p>
             <span>汇报频率：</span>
             <span>{{teachItem.subject.frequency}}</span>
           </p>
        </div>

      </div>
      <div class="endStudent">
        <div class="endStutop">已完成同学</div>
        <div class="endStucon">
          <div v-for="i in teachItem.finishs" class="imgItem">
            <span><img :src="i.paperUrl"/></span>
            <span>{{i.user.userName}}</span>
          </div>

        </div>

      </div>
      <div class="endStudent">
        <div class="endStutop">未完成同学</div>
        <div class="endStucon">
          <div v-for="i in teachItem.finishs" class="imgItem">
            <span><img :src="i.paperUrl"/></span>
            <span>{{i.user.userName}}</span>
          </div>
        </div>

      </div>
    </div>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
//      token:"9f2c44de79443ada945bce9e6c0383cd",
      teachItem :[]
    }
  },
  created: function(){
    this.token = this.$route.query.token;
    this.teachItem = JSON.parse(localStorage.getItem("MicteachItem"));
    console.log(this.teachItem)
  },

  methods:{
    back:function () {
      this.$router.back()
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .teachItem{
    padding-left: 0.22rem;
    padding-right: 0.22rem;
    background-color: #fff;
  }
  .teachtop{
    background-color: #fff;
    display: flex;
    padding-top:0.28rem ;
    font-size: 0.32rem;
    padding-bottom: 0.1rem;
  }

  .teachtop>span:first-child{
   flex: 1;
  }
  .teachtop>span:last-child{
    width: 1rem;
    text-align: right;
    font-size: 0.24rem;
  }
  .itemconter{
    display: flex;
    font-size: 0.28rem;
    padding-bottom: 0.1rem;
    flex-direction: column;
    color: #888;
  }

  .itemconter p{
    display: flex;
    line-height: 0.46rem;
    padding-top: 0.15rem;
  }
  .itemconter p>span:first-child{
    width: 1.5rem;
  }
  .itemconter p>span:last-child{
    flex: 1;
  }
  .endStutop{
    margin-top: 0.25rem;
    width: 2.58rem;
    height: 0.56rem;
    background-color: #00A3FF;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.56rem;
    padding-left: 0.22rem;
  }
  .endStucon{
    background-color: #fff;
    margin-top: 5px;
    overflow-x: scroll;
    display: flex;
    flex-wrap: wrap;
  }
  .imgItem{
    height: 1.86rem;
    width: 20vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .imgItem img{
    width: 0.8rem;
    height: 0.8rem;
    background: #eee;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 0.1rem;
  }
</style>
