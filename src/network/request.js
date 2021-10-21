import axios from 'axios'

const devSrc = 'http://localhost:80/api' // 代理服务器主机地址

// const proSrc = 'http://192.168.140.130:8080' // 放后端服务器的ip地址（或域名）加端口


export const baseURL = devSrc;

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
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
