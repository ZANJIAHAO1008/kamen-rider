<template>
  <div class="chronicle">
    <el-timeline>
      <el-timeline-item  reverse="true" color="#409EFF" v-for="(item,index) in chronicleData" :key="index" :timestamp="item.airTime"   placement="top">
        <el-card>
          <div class="chronicle-information-box">
            <el-image
                style="width: 120px;height: 120px"
                :src="item.image"
                :preview-src-list="[item.image]"
                fit="fill"></el-image>
            <div class="chronicle-information">
              <span class="chronicle-name">{{item.name}}</span>
              <el-popover
                  placement="right"
                  title="详情"
                  width="250"
                  trigger="hover"
                  :content="item.describes">
                <p class="chronicle-info"   slot="reference">{{item.describes}}</p>
              </el-popover>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "chronicle",
  data() {
    return {
      chronicleData:[],
      src:"http://dmimg.5054399.com/allimg/180129/42_180129161950_1.jpg"
    }
  },
  methods: {
    getChronicle() {
      this.$axios({
        method: 'get',
        url: '/api/chronicle/getChronicleList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{}
      }).then(response => {
        if(response.data){
          this.chronicleData = response.data.data.map(v=>{
            if(v.imgUrl){
              v.image ='http://146.56.235.246:8081/'+ v.imgUrl;
            }
            return v;
          });
        }
      })
    }
  },
  watch:{
    name: {
      handler:"getChronicle",
      immediate:true
    }
  }
}
</script>
<style>
.chronicle{
  width: 750px;
  margin: 0 auto;
  padding-top: 30px;
}
.el-timeline-item__timestamp {
  color: #409EFF!important;
  line-height: 1;
  text-align: left;
  font-size: 20px!important;
}
.chronicle-information-box{
  display: flex;
  justify-content: space-between;
}
.chronicle-information{
  width: 500px;
}
.chronicle-name{
  display: block;
  color: #00a2ff;
  text-align: left;
  font-size: 16px;
}
.chronicle-name:hover{
  color: #ff9914;
}
.chronicle-info{
  color: #5677d2;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>