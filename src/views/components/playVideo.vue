<template>
<div class="playVideo">
  <el-page-header @back="goBack" content="视频列表">
  </el-page-header>
  <span class="playVideo-title">{{ data.title }}</span>
  <div class="playVideo-box">
    <span class="playVideo-describes">{{data.describes+'（若视频无法观看，还请更换浏览器再试试哦~）'}}</span>
    <video  :src="data.radioUrl" width="1000" height="480" controls="controls">
    </video>
  </div>
</div>
</template>
<script>
export default {
  name:"playVideo",
  props:['data'],
  data(){
    return{

    }
  },
  methods:{
    goBack(){
      this.$emit('clear',null)
    }
  }
}
</script>
<style scoped>
.playVideo{
  padding: 20px 80px;
}
.playVideo-title {
  color: #ffb10b;
  font-size: 24px;
  padding: 20px;
  text-align: center;
  display: block;
}
.playVideo-box{
  background: #ffffff;
  padding: 0 20px 20px 20px;
}
.playVideo-describes{
  color: #666666;
  font-size: 16px;
  line-height: 36px;
  display: block;
  text-align: center;
  padding: 35px 0 20px;
}
</style>