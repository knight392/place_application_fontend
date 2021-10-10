import { ADMINLOGINWITHTOKEN, TEACHERLOGINWITHTOKEN } from './actions-type'
import { loginAdminWithTokenRequest } from 'network/admin'
import { loginTeacherWithTokenRequest } from '../network/teacher'

export default {
  // 异步函数返回 promise对象
  async  [ADMINLOGINWITHTOKEN]() {
    return loginAdminWithTokenRequest().then(res => {
      if (res.status === 200 && res.data != null) {
        return res.data;
      }else{
        throw res.info;
      }
    })
  }, 
  async  [TEACHERLOGINWITHTOKEN]() {
    return loginTeacherWithTokenRequest().then(res => {
      if (res.status === 200 && res.data != null) {
        return res.data;
      }else{
        throw res.info;
      }
    })
  }
}
