<template>
  <el-container>
    <el-header class="title">
      <h1>教师端登录</h1>
    </el-header>
    <el-main>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            autocomplete="off"
            v-model="loginForm.account"
            placeholder="请输入教师账号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" >
          <el-input
            type="password"
            v-model="loginForm.pass"
            autocomplete="off"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="submitBox">
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { loginTeacherRequest } from "network/teacher";
import {ADD_TEACHER} from 'store/mutations-type.js';
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入教师号"));
      } else {
        // 验证成功
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // 验证成功
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        pass: "",
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 前端格式验证通过
        if (valid) {
          this.loginTeacher(this.loginForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 发送等请求
    loginTeacher({ account, pass }) {
      // 打开加载中
      const loading = this.openFullScreen();
      loginTeacherRequest({
        teacher_no: account,
        teacher_password: pass,
      }).then(
        (res) => {
          loading.close();
          if(res.status === 200) {
            this.loginSucess(res)
          }else{
            this.loginError(res.info)
          }
          console.log(res);
        },
        (err) => {
          alert("登录失败");
          console.log(err);
        }
      );
    },
    openFullScreen() {
      return this.$loading({
        lock: true,
        text: "登录中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      })
    },
    loginSucess(res) {
      console.log(res);
       this.$message({
          message: '登录成功',
          type: 'success'
        });
       
       this.toTeacherPage(res.data)
    
      //  localStorage.setItem('token', res.info); // 设置 localStorage
      //  sessionStorage.setItem('token', res.info ); // 设置 sessionStorage
    },
    loginError(msg) {
      this.$message.error(msg);
    },
    toTeacherPage(teacher) {
      // 0.5秒后跳转到teacher页面
     
      this.$store.commit(ADD_TEACHER, teacher)
      setTimeout(() => {
       this.$router.replace('/teacher')
      }, 500)
    }
  },
};
</script>

<style  scoped>
.title {
  text-align: center;
}
.loginForm {
  width: 40%;
  margin: auto;
}
</style>