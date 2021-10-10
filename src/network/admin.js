/**
 * 管理员请求接口
 */

import { request } from './request'

/**
 * 管理员登录
 * @param {admin_no,admin_password} admin 
 * @returns 
 */
export function loginAdminRequest(admin) {
  return request({
    url: '/adminLoginServlet',
    method: 'post',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: admin
  })
}


/**
 * 管理员使用保存在cookie的token登录
 * @returns 
 */
export function loginAdminWithTokenRequest() {
  return request({
    url: '/adminLoginWithTokenServlet',
    method: 'get'
  })
}


/**
 * 退出登录，删除 cookie 中的 token
 * @returns 
 */
 export function logoffAdminRequest(){
  return request({
    url: '/logoffAdminServlet',
    method: 'get'
  })
}

/**
 * 修改管理员个人信息
 * @param {amdin_no, admin_name} admin 
 * @returns 
 */
export function updateAdminRequest(admin) {
  return  request({
    url: '/adminUpdateServlet',
    method: 'post',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: admin
  })

}