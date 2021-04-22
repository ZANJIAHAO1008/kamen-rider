<template>
  <div class="falseVideo">
  <ul class="video-box" v-if="!infoRow">
    <li class="video-list" v-for="(item,index) in videoData" :key="index">
      <div class="coverStory" @click="routeDetail(item)">
        <el-image
            style="width:180px; height: 135px"
            :src="item.videoUrl"
            fit="fill"></el-image>
        <i class="el-icon-video-play"></i>
      </div>
      <div class="video-info">
      <span class="video-title" @click="routeDetail(item)">{{ item.title }}</span>
        <span class="video-value">{{item.describes}}</span>
        <span class="video-date">{{item.uploadTime}}</span>
      </div>
    </li>
  </ul>
    <playVideo v-else  @clear="clear" :data="infoRow"></playVideo>
  </div>
</template>
<script>
import playVideo from "./playVideo";
export default {
  name:"falseVideo",
  props:['switch'],
  components:{
    playVideo
  },
  data(){
    return{
      videoData:[],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      infoRow:null,
    }
  },
  methods:{
    clear(val){
      this.infoRow = val;
    },
    routeDetail(item){
      this.infoRow = item;
    },
    getVideo(){
      this.$axios({
        method: 'get',
        url: '/api/video/getVideoList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{}
      }).then(response => {
        if(response.data){
          this.videoData = response.data.data.map(v=>{
            if(v.url){
              v.radioUrl = 'http://146.56.235.246:8081/'+v.url;
            }
            if(v.videoCover){
              v.videoUrl = 'http://146.56.235.246:8081/'+v.videoCover;
            }
            return v;
          });
        }
      })
    }
  },
  watch:{
    name:{
      handler:'getVideo',
      immediate:true
    },
    switch(){
      this.infoRow = null;
    },
  }
}
</script>
<style>
.falseVideo{
  padding-top: 22px;
}
.video-box{
  margin: 0;
  padding:0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.video-list{
  padding: 23px 0;
  margin: 0 22px;
  width: 554px;
  border-bottom: 1px dashed #1b2752;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.coverStory{
  position: relative;
  width: 180px;
}
.coverStory:hover,.video-title:hover{
  color: #ff9914;
  cursor: pointer;
}
.el-icon-video-play{
  position: absolute;
  left: 141px;
  bottom: 6px;
  font-size: 32px;
  cursor: pointer;
}


.video-value{
  font-size: 14px;
  color: #5677d2;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.video-title{
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  color: #00a2ff;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  text-align: left;
}
.video-info{
  padding: 7px;
  width: 358px;
  box-sizing: border-box;
  text-align: left;
}
.video-date{
  display: block;
  padding-top: 20px;
  text-align: right;
  color: #5677d2;
  opacity: 0.5;
}

</style>