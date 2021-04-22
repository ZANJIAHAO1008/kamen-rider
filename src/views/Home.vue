<template>
  <div class="homePage">
    <header class="header">
      <div class="home-nav">
        <div></div>
        <div v-if="!user">
          <span class="btn-login btn" @click="login('login')">登录</span>
          <span class="btn-register btn" @click="login('register')">注册</span>
        </div>
        <div v-else style="display: flex; align-items: center">
          <el-avatar
            src="http://146.56.235.246:8081/defaultAvatar.jpg"
            style="margin-right: 12px"
          ></el-avatar>
          <span style="font-size: 15px; color: #000"
            ><span style="padding-right: 12px">欢迎回来! </span
            ></span
          >
          <el-dropdown @command="handleCommand">
            <el-button type="text"  style="color: #000">
              {{ user.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="signUp">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <div style="margin-top: 70px">
      <el-menu
        :default-active="menu"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#3043D6"
        text-color="#b6c9ff"
        active-text-color="#ff9914"
      >
        <el-menu-item index="1">假面骑士图鉴</el-menu-item>
        <el-menu-item index="2">假面骑士视频</el-menu-item>
        <el-menu-item index="3">假面骑士图片</el-menu-item>
        <el-menu-item index="4">假面骑士编年史</el-menu-item>
      </el-menu>
    </div>
    <div class="child-f">
      <div class="child">
        <kamen-information
          :routeLoginType="routeLoginType"
          @openLogin="routeLogin"
          v-show="menu === '1'"
          :switch="tabSwitch"
        ></kamen-information>
        <kamen-video v-show="menu === '2'" :switch="tabSwitch"></kamen-video>
        <kamen-image v-show="menu === '3'"></kamen-image>
        <kamen-chronicle v-show="menu === '4'"></kamen-chronicle>
      </div>
    </div>
    <kamen-login
      :status="status"
      :LoginType="routeLoginType"
      @closeVisible="closeVisible"
      :dialogVisible.sync="loginVisible"
    ></kamen-login>
  </div>
</template>

<script>
import KamenChronicle from "@/views/components/chronicle.vue";
import KamenImage from "@/views/components/image.vue";
import KamenInformation from "@/views/components/information.vue";
import KamenVideo from "@/views/components/video.vue";
import KamenLogin from "@/views/user/login.vue";

export default {
  name: "Home",
  components: {
    KamenChronicle,
    KamenImage,
    KamenInformation,
    KamenVideo,
    KamenLogin,
  },
  data() {
    return {
      routeLoginType: false,
      menu: "1",
      loginVisible: false,
      status: "",
      user: "",
      tabSwitch: "1",
    };
  },
  methods: {
     handleCommand(command) {
        if(command == 'signUp'){
          this.signOut();
        }
      },
    routeLogin(val) {
      this.routeLoginType = val;
    },
    handleSelect(key) {
      this.menu = key;
      this.tabSwitch = key;
    },
    login(status) {
      //登录  注册
      this.loginVisible = true;
      this.status = status;
    },
    closeVisible(val, status) {
      this.loginVisible = val;
      this.routeLoginType = false;
      status ? this.getUser() : "";
    },
    signOut() {
      localStorage.setItem("user", null);
      this.$message({
        message: "登出成功",
        type: "success",
      });
      this.getUser();
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  created() {
    this.getUser();
  },
};
</script>
<style >
.homePage {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.child-f {
  background: url("http://www.4399dmw.com/images/aoteman/v1/bg2.jpg") center
    557px no-repeat #02051c !important;
}
.child {
  background: rgba(16, 23, 49, 0.7);
  min-height: calc(100vh - 132px);
}

.home-nav {
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #ffffff;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  z-index: 250;
}

.btn {
  cursor: pointer;
  border: 1px solid #007fff;
  background-color: #fff;
  padding: 5px 20px;
  color: #007fff;
  line-height: 1.9rem;
  border-radius: 2px;
}

/*.btn:hover {*/
/*  color: #fc701c;*/
/*}*/

.btn-register {
  margin-left: 10px;
}

.el-menu-item {
  font-size: 18px !important;
}
.el-menu-item,
.el-submenu__title {
  height: 56px;
  line-height: 56px;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0 !important;
}
</style>
