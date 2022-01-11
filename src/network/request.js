import axios from 'axios'

export const baseURL = process.env.VUE_APP_BASE_API;



export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL,
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    if(res.status == 200){
      return res.data
    }
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
