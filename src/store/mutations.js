import { ADDADMIN, UPDATEADMIN,DELETEADMIN ,ADD_TEACHER, DELETE_TEACHER } from "./mutations-type"
export default {
  // 添加管理员
  [ADDADMIN](state, admin) {
    state.admin = admin;
  },
   // 更新管理员
   [UPDATEADMIN](state, admin) {
    state.admin = admin;
  },

  // 删除管理员
  [DELETEADMIN](state){
    state.admin = null;
  },

  // 添加教师
  [ADD_TEACHER](state, teacher){
    state.teacher = teacher
  },

  // 删除教师
  [DELETE_TEACHER](state){
    state.teacher = null
  }
}

