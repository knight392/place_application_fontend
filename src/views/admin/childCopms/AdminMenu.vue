<template>
   <el-menu
          default-active="/admin/teacherManage"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          :router="true"
        >
          <el-menu-item index="/admin/teacherManage">
            <i class="el-icon-user-solid"></i>
            <span slot="title">教师管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/positionManage">
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">职位管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/placeManage">
            <i class="el-icon-location"></i>
            <span slot="title">场地管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/procedureManage">
            <i class="el-icon-guide"></i>
            <span slot="title">流程管理</span>
          </el-menu-item>
           <el-menu-item index="/admin/dataMonitor">
            <i class="el-icon-guide"></i>
            <span slot="title">数据监控</span>
          </el-menu-item>
    </el-menu>
</template>

<script>
  export default {
     methods: {
     handleOpen(key, keyPath) {
       console.log('打开');
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log('关闭');
        console.log(key, keyPath);
      },
      handleSelect(key,keyPath) {
        console.log(key,keyPath);
      }

  },
  }
</script>

<style lang="scss" scoped>

</style>