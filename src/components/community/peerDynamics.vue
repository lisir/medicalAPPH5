<template>
<div class="communtiy">
  <yd-layout>
    <yd-navbar slot="navbar" title="同行动态" bgcolor="" color="#222" height="0.9rem" fontsize="0.36rem">
      <span slot="left" @click="back">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </span>

      <span slot="right" @click="goadd">
         <div class="add">+</div>
      </span>
    </yd-navbar>
    <div class="list">
      <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
        <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
          <div slot="list" v-for="(mess,n) in  list" class="messItem">
            <yd-flexbox class="it_top">
              <div class="imgItem"><img :src="path+mess.doctor.certificatePic"></div>
              <yd-flexbox-item>
                <div class="name">
                  <p>{{mess.doctor.userName}}</p>
                  <p>
                    <span>{{mess.doctor.departmentInfo.deptName}}</span>
                    <span>{{mess.doctor.doctorLevel.levelName}}</span>
                  </p>
                </div>
              </yd-flexbox-item>
            </yd-flexbox>
            <div class="it_content">
              <!--说说类型和内容显示-->
              <p>{{mess.dynamicContent}}挖UI好看是绝对会卡机安徽省点卡合适的卡号的喀什大会看来是的哈洛克时代</p>
              <!--说说图片展示1504504645646thumbnail.jpg-->
              <div class="showImgs">
                <div class="imgItem" v-for="i in mess.picUrl==null?[]:mess.picUrl.split(';')" v-if="i !=''">
                  <img v-bind:src="path+i " @click="clickImg(i)"/>
                </div>
              </div>
            </div>
            <!--对说说的点赞和回复-->
            <div class="it_bottom">
              <span>2017-10-12</span>
              <span class="icons">
                  <span>
                    <yd-icon name="like-outline" size=".52rem" color="#0085FF" v-if="mess.goodStatus == 1" @click.native="addLove(mess.dynamicId,n,0)"></yd-icon>
                    <yd-icon name="like-outline" size=".52rem" color="#010101" v-else @click.native="addLove(mess.dynamicId,n,1)"></yd-icon>
                  </span>
                  <span @click="replayshow(mess.dynamicId,n)">
                    <img :src="replayImg">
                     <!--<yd-icon name="weixin" size=".55rem" color="#010101"></yd-icon>-->
                  </span>
               </span>
            </div>
            <div class="replaylist">
               <div class="loves"><yd-icon name="like-outline" size=".5rem" color="#0085FF"></yd-icon></div>
               <hr />
              <div class="replay">
                 <div class="replayItem" v-for="item in mess.dynamicReplies ">
                    <span class="replayname">{{item.replyer.userName}}：</span>
                    <span class="replaycont">{{item.replyContent}}</span>
                 </div>
                <!--<div class="replayItem">-->
                    <!--<span class="replayname">无意：</span>-->
                    <!--<span class="replaycont">爱撒谎安静会收到看见俺还是暗红色的空间啊哈霎时刻了记得哈；是的哈；离开谁的号； 老师的；拉开始的；爱离开谁打的</span>-->
                 <!--</div>-->
               </div>

            </div>
          </div>
          <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
      </yd-pullrefresh>
    </div>
    <yd-popup v-model="replay" position="bottom">
      <yd-cell-item>
        <yd-input slot="left"  v-model="replaypram.replyContent" max="20" placeholder="请输入回复内容"></yd-input>
        <yd-button slot="right" @click.native="subReplay" :disabled="replayDisable">回复</yd-button>
      </yd-cell-item>
    </yd-popup>
  </yd-layout>

</div>
</template>


<script>

  import replayImg from "@/assets/replay.png";
export default {
  data () {
    return {
      replay:false,
      list:[],
      totalPage:0,
      startPage:0,
      replayDisable:false,
      replayImg:replayImg,
      replaypram:{
        dynamicId:"",
        replyContent:"",
        n:-1
      }

    }
  },
  mounted: function(){
//    this.token = this.$route.query.token;
     this.token = this.$route.query.token;
     this.getList(0);

  },

  methods:{

    back:function () {
      this.$router.back()
    },
    goadd:function () {
      this.$router.push({path:"addDynamics",query:{token:this.token}})
    },
    loadMore:function () {
      this.startPage++;
      console.log(this.startPage);
      console.log(this.totalPage);
      if(this.startPage>=this.totalPage){
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
        return 0
      }
      this.getList(this.startPage);
    },
    loadList:function () {
      console.log("aaaaa");
      this.list = [];
      this.getList(0);
    },
    addLove:function(id,n,status){
      var vm = this;
      $.ajax({
        url: vm.path+"dynamic/addGooddynamic",
        dataType: "json",
        data:{
          token:vm.token,
          dynamicId:id,
          status:status
        },
        type: "get",
        success: function(data) {
          console.log(data);
          vm.$dialog.toast({
            mes: data.message,
            timeout: 1000
          });
          if(data.statusCode==0){
            vm.list[n].goodStatus = status
          }
        },
        error: function() {

        }
      });
    },
    subReplay:function () {
      var pram = this.replaypram;
      pram.token = this.token;
      var vm = this;
      $.ajax({
        url: vm.path+"dynamic/addDynamicReply",
        dataType: "json",
        data:pram,
        type: "get",
        success: function(data) {
          console.log(data);
          vm.$dialog.toast({
            mes: data.message,
            timeout: 1000
          });
          if(data.statusCode==0){
            if(!vm.list[vm.replaypram.n].dynamicReplies){
              vm.list[vm.replaypram.n].dynamicReplies = []
            }
            vm.list[vm.replaypram.n].dynamicReplies.push(data.dataInfo.singleData);
            vm.replay = false;
            vm.replaypram.replyContent = "";
          }
        },
        error: function() {

        }
      });
    },
    replayshow:function (id,n) {
      this.replay = true;
      this.replaypram.dynamicId=id;
      this.replaypram.n=n
    },
    getList:function (page) {
      var vm = this;
      $.ajax({
        url: vm.path+"dynamic/queryAllDynamic",
        dataType: "json",
        data:{
          token:vm.token,
          page:page,
          size:10
        },
        type: "get",
        success: function(data) {
          console.log(data)
        if(data.statusCode==0){
          vm.list = data.dataInfo.listData;
          vm.totalPage = data.dataInfo.pageInfo.totalPage;
          console.log(vm.list);
        }
          vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
          vm.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
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
    overflow: scroll;
  }
  .add{
    width: 0.45rem;
    height: 0.45rem;
    background-color: #555;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.45rem;
    font-weight: 700;
  }
  .messItem{
    padding-top: 0.4rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .messItem .it_top .imgItem{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .imgItem img{
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
  .it_top .name {
    padding-left: 0.22rem;
  }
  .it_top .name p:first-child{
    font-size: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-weight: 600;
  }
  .it_top .name p:last-child{
    font-size: 0.24rem;
    color: #010101;
  }
  .it_content{
    margin-top: 0.22rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
  }
  .showImgs{
    margin-top: 0.2rem;
    display: flex;
    justify-content: flex-start;
  }
  .showImgs .imgItem{
    max-width: 33vw;
    height: 30vw;
    flex: 1;
    text-align: center;

  }
  .showImgs .imgItem img{
    border: solid 1px #eee;
    width: 30vw;

  }
  .it_bottom{
    height: 0.9rem;
    display: flex;
    align-items: center;
    font-size: 0.24rem;
  }
  .it_bottom>span:first-child{
    flex: 1;
  }
  .it_bottom>span:last-child{
    width: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /*.it_bottom>span:last-child img{*/
    /*width: 0.8rem;*/
    /*height: 0.8rem;*/
  /*}*/
  .replaylist{
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    background-color: #eee;
  }
 .loves{
   padding-left: 0.36rem;
   padding-right: 0.36rem;
   padding-bottom: 0.1rem;
   color: #0085FF;
 }
  .replay{
    padding-left: 0.36rem;
    padding-right: 0.36rem;
    padding-top: 0.1rem;
  }
  .replayItem{
    font-size: 0.28rem;
    line-height: 0.46rem;
    display: flex;
  }
  .replayItem .replayname{
    color: #0085FF;
    width: 1.2rem;
  }
  .replayItem .replaycont{
    flex: 1;
  }

</style>
