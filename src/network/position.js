/**
 * 职位请求接口
 */
 import {request} from './request'

 /**
  * 获取所的职位
  * @returns 
  */
 export function getAllPositionsRequest() {
   return request({
       url: '/getAllPositionsServlet',
       method: 'get'
     })
 }
 
 /**
  * 删除职位
  * @param {String} position_no 
  * @returns 
  */
 export function deletePositionRequest(position_no ) {
   return request({
     url:'/deletePositionServlet',
     method:'get',
     params:{
      position_no 
     }
   })
 }
 
 /**
  * 新增职位
  * @param {Object} position
  * @returns 
  */
 export function addPositionRequest(position) {
   return request({
     url:'/addPositionServlet',
     data:position,
     method:'post',
     headers: {
       "Content-Type":"application/json;charset=UTF-8"
     }
   })
 }
 
 /**
  * 判断职位账号是否重复
  */
 export function setencePositionDuplicatedRequest(position_name) {
   return request({
     url:'/sentencePositionDuplicateServlet',
     method:'get',
     params:{
       position_name
     }
   })
 }
 
 /**
  * 更新职位信息
  */
 
 export function updatePositionRequest(position) {
   return request({
     url:'/updatePositionServlet',
     data:position,
     method:'post',
     headers: {
       "Content-Type":"application/json;charset=UTF-8"
     }
   })
 }
 

  /**
  * 获取没有流程的职位
  */

   export function getPositionsWithoutProcedureRequest() {
    return request({
      url:'/getPositionsWithoutProcedureServlet',
      method:'get'
    })
   }
 