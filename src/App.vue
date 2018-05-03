<template>
  <div id="main">
      <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
  #main{
    font-size: 0.25rem;
    height: 100%;
  }
  .replayList .yd-next-icon{
    font-size: 0.25rem;
  }
  .replayList .yd-cell-right{
    font-size: 0.26rem;
  }
  .replayItem .yd-checkbox{
    display: block;
    padding-bottom: 8px;
  }
  #main .yd-scrollview:after {
    content: "";
    display: block;
    width: 100%;
    height: 0;
  }
  .replayItem .yd-textarea>textarea {
    border: solid 1px #ddd;
    border-radius: 3px;
    width: 100%;
    display: block;
    height: 1.5rem;
    font-size: .3rem;
    color: inherit;
    background-color: transparent;
  }
  .communtiy .yd-cell-left{
    width: 80%;
  }
</style>
