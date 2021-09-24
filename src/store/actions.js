import { ADMINLOGINWITHTOKEN } from './actions-type'
import { loginAdminWithTokenRequest } from 'network/admin'

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
  }
}
