<template>
  <div>
    <div class="profile-box">
      <div class="img">
        <el-avatar :size="80" :src="admin.profile"></el-avatar>
        <el-button
          class="edit-btn"
          type="primary"
          icon="el-icon-edit"
          size="mini"
          circle
          @click="drawer = true"
        ></el-button>
      </div>
      <div class="name">{{ admin.name }}</div>
    </div>

    <el-drawer
      title="管理员信息修改"
      :visible.sync="drawer"
      :direction="direction"
       ref="drawer"
    >
      <div class="drawer__content">
        <div class="img">
          <el-avatar :size="80" :src="admin.profile"></el-avatar>
        </div>
        <el-form :model="form" :rules="rules"   status-icon>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input
              :value="admin.account"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="submitEdition"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "提交" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {updateAdminRequest} from 'network/admin.js'
import {UPDATEADMIN} from 'store/mutations-type.js'; 

export default {
  props: {
    admin: {
      type: Object,
      required: true,
    },
  },
  data() {
     var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员名称"));
      } else {
        // 验证成功
        callback();
      }
    };
    return {
      drawer: false,
      direction: "ltr",
      loading: false,
      formLabelWidth: "60px",
      form: {
        name: this.admin.name
      },
       rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
    };
  },
  methods: {
    submitEdition(done) {
      // 加载中不能再提交
      if (this.loading) {
        return;
      }
      if (this.form.name === '') {
        this.$message.error("请输入管理员名称")
        return;
      }
      this.$confirm("确定要修改管理个人信息吗？")
        .then(() => {
          this.loading = true;
          this.updateAdmin()
          done();
        })
        .catch(() => {});
    },
    cancelForm() {
      this.loading = false;
      this.$refs.drawer.closeDrawer();
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            this.cancelForm();
            done();
          })
          .catch(() => {});
      },

    /**
     * 更新管理员信息
     */
    updateAdmin(){
      const admin = {
        admin_no:  this.admin.account,
        admin_name: this.form.name
      }
      updateAdminRequest(admin).then(res => {
        console.log(res);
        this.loading = false;
        if (res.status == 200) {
          this.updateSucess(res);
        }else{
          this.updateError(res.info);
        }
      }, err => {
        console.log(err);
      })
    },

    /**
     * 管理员信息更新成功
     */
    updateSucess(res) {
      this.$message({
          message: res.info,
          type: 'success'
        });
      // 更新 store
      const admin = {
        admin_no: res.data.admin_no,
        admin_name: res.data.admin_name
      }
      this.$store.commit(UPDATEADMIN, admin)

      this.$refs.drawer.closeDrawer();

    },

    /**
     * 管理员信息更新失败
     */
    updateError(msg) {
      this.$message.error(msg);
    }


  },
};
</script>

<style  scoped>
.profile-box {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #b3c0d1;
}
.img {
  position: relative;
}
.edit-btn {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(35px);
}
.img {
  margin-bottom: 10px;
}

.drawer__content {
  text-align: center;
}
</style>