<template>
  <div>
    <div class="profile-box">
      <div class="img">
        <el-avatar :size="80" :src="teacher.profile"></el-avatar>
        <span class="icon">教</span>
      </div>
      <div class="name">{{ teacher.name }}</div>
    </div>

  </div>
</template>

<script>


export default {
  props: {
    teacher: {
      type: Object,
      required: true,
    },
  },
  
  methods: {
   

  },
};
</script>

<style  scoped>
.profile-box {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #b3c0d1;
}

.icon{
  display: inline-block;
  padding:2px 3px;
  border-radius: 3px;
  border:1px solid #b3c0d1;
  color:#fff;
  background: #b56576;
}

.img {
  position: relative;
}

.img {
  margin-bottom: 10px;
}


</style>