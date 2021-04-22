<template>
  <div class="detail">
    <el-page-header @back="goBack" content="图鉴列表"> </el-page-header>
    <span class="detail-name">{{ data.name }}</span>
    <span class="detail-title">基础档案</span>
    <ul class="archives">
      <li class="archives-left">
        <div class="hbook-tl"></div>
        <div class="hbook-tr"></div>
        <div class="hbook-bl"></div>
        <div class="hbook-br"></div>
        <el-image
          style="width: 267px; height: 295px; margin: 50px auto 25px"
          :src="data.image"
          :preview-src-list="[data.image]"
          fit="fill"
        ></el-image>
        <div class="like-btn" @click="giveLike">
          <div class="ba-btn-txt">
            <span style="font-weight: bold; display: block"
              >为他点个赞吧！</span
            >
            <span style="margin-top: 4px; display: block"
              ><i class="el-icon-thumb"></i
              ><span style="margin-left: 8px">{{ data.likeNum }}</span></span
            >
          </div>
        </div>
      </li>
      <li class="archives-right">
        <div class="hbook-tl"></div>
        <div class="hbook-tr"></div>
        <div class="hbook-bl"></div>
        <div class="hbook-br"></div>
        <div>
          <span>身高（单位cm）：{{ data.height }}</span>
          <span>体重（单位kg）：{{ data.weight }}</span>
          <span>拳力（单位t）：{{ data.punchForce }}</span>
          <span>跳跃力（单位m）：{{ data.bouncingForce }}</span>
          <span>速度（单位m/s）：{{ data.speed }}</span>
          <span>骑士踢名：{{ data.knightPlay }}</span>
          <span>变身者：{{ data.changToThe }}</span>
          <span>变身形态：{{ data.altMode }}</span>
          <span>武装：{{ data.armed }}</span>
          <span>点赞数：{{ data.likeNum }}</span>
        </div>
      </li>
    </ul>
    <div class="commentsOnModule">
      <el-form :inline="true" :model="commentForm" @submit.native.prevent>
        <el-form-item>
          <el-input
            clearable
            style="width: 800px"
            v-model="commentForm.comment"
            placeholder="请输入评论..."
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="commentForm.comment ? false : true"
            @click="firstComment"
            >评论</el-button
          >
        </el-form-item>
      </el-form>
      <el-tree
        v-loading="loading"
        icon-class
        class="filter-tree"
        :data="comments"
        :highlight-current="false"
        :props="defaultProps"
        :expand-on-click-node="false"
        default-expand-all
        empty-text="暂时没有评论，快来评论吧！"
        ref="tree"
      >
        <div slot-scope="{ data }" style="background: #ffffff">
          <div v-if="data.hierarchy && data.hierarchy == 'father'">
            <div class="commentsTitle">
              <el-avatar
                style="margin-right: 14px"
                :src="'http://146.56.235.246:8081/' + data.fromAvatar"
              ></el-avatar
              ><span style="color: #000; font-size: 15px"
                >{{ data.fromName }}</span
              >
            </div>
            <span
              style="
                color: #484848;
                display: block;
                    padding: 10px 25px 10px 25px;
                width: 990px;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                text-align: left;
                -webkit-line-clamp: 3;
              "
              :title="data.content"
              >{{ data.content }}</span
            >

            <div class="commentsShow">
            <span style="color: #999; font-size: 14px"
                >{{ data.updateTime }}</span
              >
              <div class="commentsBtn" @click="replyInformation(data)">
                <i class="el-icon-chat-round"></i>
                <span style="font-size: 14px">回复</span>
              </div>
            </div>
          </div>
          <div v-else style="margin-left: 88px; background-color: #fafbfc">
            <div class="commentsTitle">
              <el-avatar
                style="margin-right: 14px"
                :src="'http://146.56.235.246:8081/' + data.fromAvatar"
              ></el-avatar
              ><span style="color: #000; font-size: 15px"
                >{{ data.fromName }}</span
              >
            </div>
             <span
                style="
                  color: #484848;
                  width: 890px;
                   display: block;
                  padding: 10px 25px 10px 25px;
                  white-space: normal;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  text-align: left;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                "
                :title="data.content"
                >{{ data.content }}</span
              >
            <div class="child-commentsShow">
              <span style="color: #999; font-size: 14px"
                >{{ data.updateTime }}</span
              >
              <div class="commentsBtn" @click="replyInformation(data)">
                <i class="el-icon-chat-round"></i>
                <span style="font-size: 14px">回复</span>
              </div>
            </div>
          </div>
        </div>
      </el-tree>
      <!--      <div v-for="(item,index) in comments" :key="index">-->
      <!--        <div>-->
      <!--          <p>{{item.fromName}}   {{item.updateTime}}</p>-->
      <!--          <p>{{item.content}}</p>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <el-dialog
      title="我要回复"
      :visible.sync="commentVisible"
      width="500px"
      :before-close="closeReply"
    >
      <div class="reply">
        <el-input
          type="textarea"
          :rows="3"
          style="margin-bottom: 10px"
          :placeholder="
            replyRow ? '回复' + replyRow.fromName + '...' : '请回复'
          "
          v-model="replyValue"
        >
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :disabled="replyValue ? false : true"
            @click="commentOnOtherPeople"
            >回复</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "detail",
  props: ["data", "comments"],
  data() {
    return {
      loading: false,
      replyRow: null,
      replyValue: "",
      commentVisible: false,
      commentForm: {
        comment: "",
      },
      url: "http://dmimg.5054399.com/allimg/210113/29_210113150537_1.jpg",
      defaultProps: {
        children: "children",
        label: "content",
      },
    };
  },
  methods: {
    goBack() {
      this.$emit("clear", null);
    },
    giveLike() {
      this.$emit("giveLike", this.data);
    },
    firstComment() {
      if (!JSON.parse(localStorage.getItem("user"))) {
        this.$emit("openLogin", true);
        return false;
      }

      let data = {
        type: "2",
        ownerId: this.data.id,
        pid: "",
        fromId: JSON.parse(localStorage.getItem("user")).id,
        fromName: JSON.parse(localStorage.getItem("user")).userName,
        toId: "",
        toName: "",
        content: this.commentForm.comment,
      };
      this.replyToComment(data, true);
    },
    replyToComment(data, status) {
      //发送评论请求
      this.loading = true;
      this.$axios({
        method: "post",
        url: "/api/comments/addComments",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        data: JSON.stringify(data),
      }).then((response) => {
        if (response.data.code === 200) {
          this.$emit("refresh", this.data);
          if (status) {
            this.commentForm.comment = "";
          }
          setTimeout(() => {
            this.loading = false;
          }, 300);
        }
      });
    },
    replyInformation(data) {
      this.replyRow = data;
      this.commentVisible = true;
    },
    commentOnOtherPeople() {
      if (!JSON.parse(localStorage.getItem("user"))) {
        this.$emit("openLogin", true);
        return false;
      }
      let data = {
        type: "1",
        ownerId: this.data.id,
        pid: this.replyRow.pid ? this.replyRow.pid : this.replyRow.id,
        fromId: JSON.parse(localStorage.getItem("user")).id,
        fromName: JSON.parse(localStorage.getItem("user")).userName,
        toId: this.replyRow.fromId ? this.replyRow.fromId : "",
        toName: this.replyRow.fromName ? this.replyRow.fromName : "",
        content: this.replyValue,
      };
      this.replyToComment(data, false);
      this.closeReply();
    },
    closeReply() {
      //关闭
      this.replyValue = "";
      this.commentVisible = false;
    },
  },
};
</script>
<style>
.detail {
  padding: 20px 80px;
}

ul li {
  list-style: none;
}

.archives {
  display: flex;
  justify-content: space-between;
}

.archives-right {
  border: 1px solid #1c285a;
  width: 520px;
  position: relative;
}

.archives-left {
  width: 400px;
  position: relative;
  border: 1px solid #1c285a;
}

.archives-right span {
  display: block;
  text-align: left;
  color: #5677d2;
  line-height: 26px;
  font-size: 16px;
  margin: 23px 25px 22px 30px;
  overflow: hidden;
  max-height: 480px;
}

.hbook-tl,
.hbook-bl,
.hbook-br,
.hbook-tr {
  background-image: url("http://www.4399dmw.com/images/aoteman/v1/bg-24-2.png");
  background-repeat: no-repeat;
  background-size: 280px 447px;
}

.hbook-tl {
  background-position: -236px -196px;
  width: 14px;
  height: 15px;
  position: absolute;
  top: 5px;
  left: 5px;
}

.hbook-tr {
  background-position: -258px -196px;
  width: 14px;
  height: 15px;
  position: absolute;
  top: 5px;
  right: 5px;
}

.hbook-bl {
  background-position: -192px -196px;
  width: 14px;
  height: 15px;
  position: absolute;
  bottom: 5px;
  left: 5px;
}

.hbook-br {
  background-position: -214px -196px;
  width: 14px;
  height: 15px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.detail-name {
  color: #ffb10b;
  font-size: 24px;
  padding: 1px 0 20px 0;
  text-align: center;
  display: block;
}

.detail-title {
  color: #26a1ff;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  padding: 60px 0 30px 0;
  display: block;
}
.el-page-header__content {
  font-size: 18px;
  color: #fff !important;
}
.el-page-header__left {
  display: flex;
  cursor: pointer;
  margin-right: 40px;
  position: relative;
  color: #fff !important;
}
.like-btn {
  background-position: 0px -98px;
  width: 280px;
  height: 90px;
  margin: 0 auto;
  color: #be6a10;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  background-image: url("http://www.4399dmw.com/images/aoteman/v1/bg-24-2.png");
  background-repeat: no-repeat;
  background-size: 280px 447px;
}
.ba-btn-txt {
  position: absolute;
  left: 0;
  top: 32px;
  text-align: center;
  width: 100%;
}
.commentsOnModule {
  background: #ffffff;
  padding: 24px 0;
}
.el-tree-node__content {
  display: flex;
  align-items: center;
  height: inherit !important;
  cursor: pointer;
}
.commentsShow {
  width: 1040px;
  display: flex;
    padding: 8px 25px 8px 16px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.child-commentsShow {
  width: 950px;
  display: flex;
    padding: 8px 25px 8px 16px;
    align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.el-icon-chat-round {
  font-size: 21px;
  width: 30px;
}
.el-tree-node__content {
  padding-left: 0px !important;
}
.commentsTitle {
  /*background: #efefef;*/
  display: flex;
  text-align: left;
  align-items: center;
  height: 40px;
  padding-left: 12px;
  /* line-height: 40px; */
}
.commentsBtn:hover {
  color: #00a2ff;
}
.el-tree-node__expand-icon.expanded {
  display: none;
}
.el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0px;
}
.el-tree-node__expand-icon.is-leaf {
  display: none;
}
.reply {
  padding: 24px;
}
</style>