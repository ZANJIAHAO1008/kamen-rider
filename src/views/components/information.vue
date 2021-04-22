<template>
  <div>
    <div class="information" v-if="!infoRow">
      <div  v-for="(item,index) in infoData" :key="index"
           class="info-box">
        <el-image
            @click="queryDetail(item)"
            style="width: 220px; height: 220px"
            :src="item.image"
            fit="fill"></el-image>
        <span class="info-name like-box" @click="thumb(item)"><i class="el-icon-thumb" style="font-size: 16px"></i><span style="margin-left: 10px">{{item.likeNum}}</span></span>
        <span class="info-name list-name"  @click="queryDetail(item)">{{item.name}}</span>
      </div>
    </div>
    <detail v-else  :data="infoRow" :comments="commentsList " @clear="clear" @openLogin="routeLogin"  @giveLike="detailQuery" @refresh="getCommets"></detail>
  </div>
</template>
<script>
import detail from "./detail";
export default {
  name:'information',
  props:['switch'],
  components:{
    detail
  },
  data(){
    return{
      infoData:[],
      url:"http://dmimg.5054399.com/allimg/210113/29_210113150537_1.jpg",
      infoRow:null,
      commentsList:[]
    }
  },
  methods:{
    routeLogin(val){
      this.$emit('openLogin',val);
    },
    detailQuery(val){
      this.thumb(val);
    },
    thumb(item){
      this.$axios({
        method: 'put',
        url: `/api/knight/likeKnight?id=${item.id}`,
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
      }).then(response => {
        if(response.data.code===200){
          this.getInfo()
        }
      })
    },
    getCommets(data){ //获取评论
      let dataWare = {
        ownerId:data?data.id:""
      };
      this.commentsList = [];
      this.$axios({
        method: 'get',
        url: '/api/comments/getCommentsByOwnerId',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        params:dataWare,
      }).then(response => {
        if(response.data){
        this.commentsList = response.data.data.map(v=>{
          v.hierarchy = 'father';
          v.revert = false; //回复控制
          return  v;
        });

        }
      })
    },
    clear(val){
      this.infoRow = val;
    },
    getInfo(){
      this.$axios({
        method: 'get',
        url: '/api/knight/getKnightList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{}
      }).then(response => {
        if(response.data){
          this.infoData = response.data.data.map(v=>{
            if(v.imgUrl){
              v.image ='http://146.56.235.246:8081/'+ v.imgUrl;
            };
            return v;
          });
          if(this.infoRow){
            this.infoData.forEach(v=>{
              if(this.infoRow.id === v.id){
                this.infoRow = v;
              }
            })
          }
        }
      })
    },
    queryDetail(item){
      this.getCommets(item);
        this.infoRow = item;
    }
  },
  watch:{
    name:{
      handler:'getInfo',
      immediate:true
    },
    switch(){
      this.infoRow = null;
    },
  }
}
</script>
<style>
.information{
  padding: 30px 5px;
  display: flex;
  flex-wrap: wrap;
}
.info-box{
  font-size: 14px;
  color: #5677d2;
  cursor: pointer;
  padding: 8.5px;
}
.info-box:hover{
  color: #ef8305;
}
.info-name{
  display: block;
}
.list-name{
  padding-top: 12px;
}
.like-box{
  background-position: -228px -136px;
  width: 221px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  position: relative;
  color: #6d91e9;
  background-image: url('http://www.4399dmw.com//images/aoteman/v1/sprite-inside.png');
  background-repeat: no-repeat;
  background-size: 767px 287px;
}

.like-box:hover {
  background-position: -228px -136px;
  width: 221px;
  height: 40px;
  background: #ef8305;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  position: relative;
  color: #fff;
  background-size: 767px 287px;
}
.el-image {
  position: relative;
   display: block !important;
  overflow: hidden;
}
</style>