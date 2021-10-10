<template>
  <el-menu
    default-active="/teacher/examineTask"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    :router="true"
  >
    <el-submenu index="/teacher/examineTask">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>我的审批</span>
      </template>
      <el-menu-item index="/teacher/examineTask">待审批</el-menu-item>
      <el-menu-item index="/teacher/examineTask">已审批</el-menu-item>
    </el-submenu>
    <el-menu-item index="/teacher/chatMsg">
      <i class="el-icon-chat-dot-square"></i>
      <span slot="title">消息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log("打开");
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("关闭");
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>