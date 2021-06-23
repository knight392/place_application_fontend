<template>
  <el-container>
    <el-header class="title">
      <h1>您好！欢迎使用校园场地管理系统</h1>
    </el-header>
    <el-main class="entrances">
      <router-link class="item" to="/admin">管理员端</router-link>
      <router-link class="item" to="/teacher">教师端</router-link>
      <router-link class="item" to="/student">学生端</router-link>
    </el-main>
  </el-container>
</template>

<script>
export default {};
</script>

<style  scoped>
.title {
  text-align: center;
}
.entrances {
  text-align: center;
}
.item {
  margin: 30px;
}
</style>