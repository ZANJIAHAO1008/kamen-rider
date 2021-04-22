<template>
  <div class="falseImage">
    <div class="block" v-for="(item,index) in imageData" :key="index" style="padding:28px 28px 0 28px;">
      <el-image
          style="width: 180px; height: 135px;"
          :src="item.image"
          :preview-src-list="[item.image]"
          fit="fill"></el-image>
      <span class="image-title">{{ item.title }}</span>
      <span class="image-date">
        <span style="cursor: pointer" @click="thumb(item)"><i class="el-icon-thumb"></i><span style="margin-left: 5px;">{{item.likeNum?item.likeNum:0}}</span></span>
        <span><i class="el-icon-time"></i><span style="margin-left: 5px;">{{ item.uploadTime }}</span></span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name:"falseImage",
  data(){
    return{
      imageData:[],
      url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    }
  },
  methods:{
    getImage(){
      this.$axios({
        method: 'get',
        url: '/api/images/getImageList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{}
      }).then(response => {
        if(response.data){
          this.imageData = response.data.data.map(v=>{
            if(v.imgUrl){
              v.image ='http://146.56.235.246:8081/'+ v.imgUrl;
            };
            v.uploadTime = v.uploadTime.substring(5,10);
            return v;
          });
          this.imageData.forEach(v=>{
            this.srcList.push(v.imgUrl);
          })
        }
      })
    },
    thumb(data){
      this.$axios({
        method: 'put',
        url:`/api/images/likeImage?id=${data.id}`,
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
      }).then(response => {
        if(response.data.code===200){
          this.getImage();
        }
      })
    }
  },
  watch:{
    name:{
      handler:'getImage',
      immediate:true
    }
  }
}
</script>
<style>
.falseImage{
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0 15px 9px;
}
.image-title{
  font-size: 14px;
  color: #00a2ff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  display: block;
  padding: 8px 0;
}
.image-date{
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #5677d2;
}
</style>