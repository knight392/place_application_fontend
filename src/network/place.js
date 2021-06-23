/**
 * 场地请求接口
 */
 import {request} from './request'

 /**
  * 获取所的场地
  * @returns 
  */
 export function getAllPlacesRequest() {
   return request({
       url: '/getAllPlacesServlet',
       method: 'get'
     })
 }
 
 /**
  * 删除场地
  * @param {String} place_no 
  * @returns 
  */
 export function deletePlaceRequest(place_no ) {
   return request({
     url:'/deletePlaceServlet',
     method:'get',
     params:{
      place_no 
     }
   })
 }
 
 /**
  * 新增场地
  * @param {Object} place
  * @returns 
  */
 export function addPlaceRequest(place) {
   return request({
     url:'/addPlaceServlet',
     data:place,
     method:'post',
     headers: {
       "Content-Type":"application/json;charset=UTF-8"
     }
   })
 }
 
 /**
  * 判断场地账号是否重复
  */
 export function setencePlaceDuplicatedRequest(place_name) {
   return request({
     url:'/sentencePlaceDuplicateServlet',
     method:'get',
     params:{
       place_name
     }
   })
 }
 
 /**
  * 更新场地信息
  */
 
 export function updatePlaceRequest(place) {
   return request({
     url:'/updatePlaceServlet',
     data:place,
     method:'post',
     headers: {
       "Content-Type":"application/json;charset=UTF-8"
     }
   })
 }

 /**
  * 获取没有流程的场地
  */

 export function getPlacesWithoutProcedureRequest() {
  return request({
    url:'/getPlacesWithoutProcedureServlet',
    method:'get'
  })
 }
 
 