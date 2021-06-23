import { ADDADMIN, UPDATEADMIN } from "./mutations-type"
export default {
  // 添加管理员
  [ADDADMIN](state, admin) {
    state.admin = admin;
  },
   // 添加管理员
   [UPDATEADMIN](state, admin) {
    state.admin = admin;
  }
}

