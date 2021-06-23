/**
 * 管理员请求接口
 */

 import {request} from './request'

 /**
  * 管理员登录
  * @param {admin_no,admin_password} admin 
  * @returns 
  */
 export function loginAdminRequest(admin) {
   return request({
    url: '/adminLoginServlet',
    method:'post',
    headers: {
      "Content-Type":"application/json;charset=UTF-8"
    },
    data:admin
   })
 }

 /**
  * 修改管理员个人信息
  * @param {amdin_no, admin_name} admin 
  * @returns 
  */
 export function updateAdminRequest(admin) {
  return request({
    url: '/adminUpdateServlet',
    method:'post',
    headers: {
      "Content-Type":"application/json;charset=UTF-8"
    },
    data:admin
   })
 }