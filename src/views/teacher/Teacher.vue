<template>
  <el-container>
    <el-header class="title">
      <h1 style="line-height: 100%">教师端页面</h1>
      <el-dropdown class="avatar">
        <el-avatar  size="large" :src="teacherImg"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid">个人主页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" @click.native="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="body-box">
      <el-aside class="aside-box">
        <teacher-info :teacher="teacherObj" />
        <teacher-menu />
      </el-aside>
      <el-main class="main-box">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TeacherInfo from "./childCopms/TeacherInfo.vue";
import TeacherMenu from "./childCopms/TeacherMenu.vue";
import {logoffTeacherRequest} from 'network/teacher'
import {DELETE_TEACHER} from 'store/mutations-type'
export default {
  data() {
    return {
      teacherImg:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  components: {
    TeacherInfo,
    TeacherMenu,
  },
  computed: {
    teacherObj() {
      return {
        account: this.teacher ? this.teacher.teacher_no : "123",
        name: this.teacher ? this.teacher.teacher_name : "未知",
        profile: this.teacherImg,
      };
    },
    teacher() {
      return  this.$store.state.teacher;
    },
  },
  methods: {
    exit(){
      // 退出登录，发送 
      logoffTeacherRequest().then(res => {
        if(res.status == 200){
           this.$store.commit(DELETE_TEACHER)
          this.$router.replace("/teacherLogin")
        }else{
          this.$message.error("退出异常")
        }
      }).catch(e => {
        this.$message.error("退出异常")
        console.log(e);
      })
    }
  }
};
</script>

<style scoped>
@import url(../../theme/index.css);
.title {
  position: relative;
  height: 10vh;
  text-align: center;
  color: #fff;
  background-color: #4a4e69;
}
.body-box {
  height: 90vh;
}
.aside-box {
  background-color: #ffffff;
  border-right: 1px solid #b3c0d1;
  width: 30vw;
}
.main-box {
  background-color: #fff;
}
.avatar {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>