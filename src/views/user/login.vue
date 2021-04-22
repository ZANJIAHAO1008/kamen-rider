<template>
  <el-dialog
      modal-append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="closeVisible">
    <div class="loginBox" v-loading="loading">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" inline label-width="84px" ref="loginForm" :rules="userRules">
            <el-form-item label="用户名：" prop="username">
              <el-input clearable v-model.trim="loginForm.username" style="width: 210px;" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input @keyup.enter.native="kamenLogin('loginForm')" clearable v-model.trim="loginForm.password" style="width: 210px;" show-password
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="kamenLogin('loginForm')" style="magin-left: 35px;">登 录</el-button>
              <el-button type="warning" @click="kamenRegister" style="margin-left: 45px;">注 册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
        <el-form  ref="registerForm" :model="registerForm" inline label-width="84px" :rules="registerRules">
          <el-form-item label="用户名：" prop="userName">
            <el-input clearable autocomplete="off" v-model.trim="registerForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input  clearable autocomplete="off" type="password" v-model.trim="registerForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirmPassword">
            <el-input  clearable autocomplete="off" type="password" v-model.trim="registerForm.confirmPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="registerForm.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-date-picker
                v-model="registerForm.birthday"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
       <el-form-item>
         <el-button style="width: 300px" type="warning" @click="registerNow('registerForm')">立即注册</el-button>
       </el-form-item>
        </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
  </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'login',
  props: ['dialogVisible','status','LoginType'],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      activeName: 'login',
      loginForm: {
        username: "",
        password: ""
      },
      registerForm:{
        userName:"",
        password:"",
        confirmPassword:"",
        sex:"",
        avatar:"",
        birthday:""
      },
      userRules: {
        username: {required: true, message: '请输入用户名', trigger: 'blur'},
        password: {required: true, message: '请输入密码', trigger: 'blur'},
      },
      registerRules:{
        userName: {required: true, message: '请输用户名', trigger: 'blur'},
        password: {required: true, message: '请输入密码', trigger: 'blur'},
        confirmPassword:  { validator: validatePass2, trigger: 'blur' }
      }
    }
  },
  methods: {
    closeVisible(status) {
      this.loading = false;
      this.$refs.loginForm.resetFields();
      this.$refs.registerForm.resetFields();
      this.$emit('closeVisible', false,status?status:"");
    },
    kamenLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            userName: this.loginForm.username,
            password: this.loginForm.password,
          }
          this.loading = true;
          this.$axios({
            method:'post',
            url:'/api/user/login',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data:JSON.stringify(data)
          }).then(response=>{
            if(response.data.code===100){
              this.loading = false;
              this.$message.error(response.data.msg);
            }else{
              setTimeout(()=>{
                localStorage.setItem("user", JSON.stringify(response.data.data));
                this.closeVisible('scuess');
              },500)
            }
          })
        }
      });
    },
    registerNow(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            userName: this.registerForm.userName,
            password: this.registerForm.password,
            sex: this.registerForm.sex,
            birthday: this.registerForm.birthday,
            avatar:this.registerForm.avatar,
          }
          this.loading = true;
          this.$axios({
            method:'post',
            url:'/api/user/register',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data:JSON.stringify(data)
          }).then(response=>{
            if(response.data.code===100){
              this.loading = false;
              this.$message.error(response.data.msg);
            }else{
              setTimeout(()=>{
              this.loading = false;
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
              },500)
            }
          })
        }
      });
    },
    kamenRegister() {
      this.activeName = 'register';
    },
    open() {

    }
  },
  watch:{
    status(val){
      this.activeName = val;
    },
    LoginType(val){
      if(val) this.$emit('closeVisible', true,"");
    }
  }
}
</script>
<style >
.loginBox {
  padding: 15px 0px 15px 12px;
}

.el-dialog__body {
  padding: 0 !important;
}
.el-dialog__footer {
  padding: 0 !important;
}
</style>
