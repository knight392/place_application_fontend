<template>
  <el-container>
    <el-header class="title">
      <h1>管理员页面</h1>
      <el-dropdown class="avatar">
        <el-avatar size="large" :src="adminImg"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid"
            >个人主页</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" @click.native="exit"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="body-box">
      <el-aside class="aside-box">
        <admin-info :admin="adminObj" />
        <admin-menu />
      </el-aside>
      <el-main class="main-box">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminInfo from './childCopms/AdminInfo.vue'
import AdminMenu from './childCopms/AdminMenu.vue'
import { DELETEADMIN } from 'store/mutations-type'
import { logoffAdminRequest } from 'network/admin'

export default {
  data() {
    return {
      adminImg:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }
  },
  components: {
    AdminInfo,
    AdminMenu,
  },
  computed: {
    adminObj() {
      return {
        account: this.admin ? this.admin.admin_no : '123',
        name: this.admin ? this.admin.admin_name : '未知',
        profile: this.adminImg,
      }
    },
    admin() {
      return this.$store.state.admin
    },
  },
  methods: {
    exit() {
      // 退出登录，发送
      logoffAdminRequest()
        .then((res) => {
          if (res.status == 200) {
            this.$store.commit(DELETEADMIN)
            this.$router.replace('/adminLogin')
          } else {
            this.$message.error('退出异常')
          }
        })
        .catch((e) => {
          this.$message.error('退出异常')
          console.log(e)
        })
    },
  },
}
</script>

<style scoped>
.title {
  position: relative;
  height: 10vh;
  text-align: center;
  background-color: #b3c0d1;
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