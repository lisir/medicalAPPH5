<template>
<div class="communtiy">
  <yd-layout>
    <yd-navbar slot="navbar" title="添加动态" bgcolor="#589BFF" color="#fff" height="0.9rem" fontsize="0.36rem">
      <span slot="left" @click="back">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </span>

      <span slot="right" @click="subadd">
         <div style="color: #fff;font-size: 0.32rem">发布</div>
      </span>
    </yd-navbar>
    <div class="list">
      <div>
        <yd-textarea slot="right" placeholder="请输入动态内容" v-model="dynamicContent" :show-counter="false"></yd-textarea>
      </div>
      <div class="imgs">
        <div class="cream" v-for="(img,n) in imgs">
          <div class="deleteImg" @click="deleteImg(n)"><yd-icon name="delete" color="#fff" size="16px"></yd-icon></div>
          <img :src="img" width="80px" height="80px">
        </div>
        <div class="cream" style="border: none">
          <img :src="addphoto" width="80px">
          <input type="file" accept="image/*"  id="inputfile" @change="preImg('inputfile')" >
        </div>
      </div>
      <div >
        <div class="glod">
          <span >发布方式：</span>
          <span class="glodr">
            <select slot="right" v-model="education" style="color: #888">
              <option value="1">公开</option>
              <option value="0">不公开</option>
            </select>
            <div class="iright">></div>
          </span>

        </div>
      </div>
    </div>

  </yd-layout>

</div>
</template>


<script>
  import addphoto from "@/assets/addphoto.png"
export default {
  data () {
    return {
      addphoto:addphoto,
      imgs:[],
      dynamicContent:"",
      education:"1",
      subFile:[]
    }
  },
  mounted: function(){
//    this.token = this.$route.query.token;
     this.token = this.$route.query.token;

  },

  methods:{

    back:function () {
      this.$router.back()
    },
    preImg:function (id) {
      var vm = this;
      var src = this.getFileUrl(id);
      vm.imgs.push(src);
      console.log( this.getFileUrl(id));
      vm.dealImage(src,{width:300},function (base) {
        console.log(vm.convertBase64UrlToBlob(base));
        vm.subFile.push(vm.convertBase64UrlToBlob(base))
        console.log(vm.imgs);
      })
    },
    getFileUrl:function (id) {//根据图片获取src
      console.log(document.getElementById(id).files[0]);
      var url;
      if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById("inputfile").value;
      } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
      } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
      }else {
        url = window.webkitURL.createObjectURL(document.getElementById(id).files[0]);
      }
      return url;
    },
    dealImage: function (path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 1;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
      }
    },
    convertBase64UrlToBlob: function (urlData) {
      var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {type: 'image/png'});
    },
    deleteImg:function (n) {
      console.log(n);
      this.imgs.splice(n,1);
      this.subFile.splice(n,1);
      console.log(this.imgs)
      console.log(this.subFile)
    },
    subadd:function () {
        var vm = this;
        vm.$dialog.loading.open('正在提交');
        var formData = new FormData();
        for(var k in this.subFile){ //文件数组
          formData.append('files',vm.subFile[k]);
       }
      formData.append('dynamic.dynamicContent',vm.dynamicContent);
      formData.append('dynamic.isPublish',vm.education);
      formData.append('token',vm.token);
      $.ajax({
          type:"post",
          url:vm.path+"dynamic/addDynamic",
          data:formData,
          cache: false,
          contentType: false,
          processData:false,
          mimeType:"multipart/form-data",
          success:function(data){
            var a=JSON.parse(data);
            console.log(a);
            if(a.statusCode==0){
              vm.back();
            }
            vm.$dialog.loading.close();
          }});

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
    padding-left: 0.25rem;
    padding-right: 0.25rem;

  }
  .imgs{
    padding-bottom: 10px;
    border-bottom: solid 1px #eee;
  }
  .glod{

    height: 0.9rem;
    display: flex;
    align-items: center;
   justify-content: space-between;
    border-bottom: solid 1px #eee;
    font-size: 0.3rem;
    color: #888;
    padding-left: 5px;
    padding-right: 5px;
  }
  .iright{
    display: inline-block;
    margin-left: 0.2rem;
    font-size: 0.25rem;
    transform: scale(1,1.7);
    -ms-transform: scale(1,1.7);
    -webkit-transform: scale(1,1.7);
    -moz-transform: scale(1,1.7);
    -o-transform: scale(1,1.7);
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
  .glodr{
    display: flex;
    align-items: center;
  }
  .cream {
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
    margin-top: 10px;
    margin-left: 10px;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 5px;
    border: solid 1px #eee;
  }
  .cream input {
    position: absolute;
    display: block;
    font-size: 60px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .cream:hover {
    text-decoration: none;
  }
  .deleteImg{
    position: absolute;
    right: 2px;
    top: 2px;
    width: 20px;
    height: 20px;
    background: rgba(150,150,150,0.5);
    text-align: center;
    line-height: 20px;
  }
</style>
