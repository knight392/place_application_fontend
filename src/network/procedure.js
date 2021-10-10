/**
 * 流程请求接口
 */
import { request } from './request'

/**
 * 获取所的流程
 * @returns 
 */
export function getAllProceduresRequest() {
  return request({
    url: '/getAllAplProceduresServlet',
    method: 'get'
  })
}

/**
 * 删除流程
 * @param {String} procedure_no 
 * @returns 
 */
export function deleteProcedureRequest(pro_no) {
  return request({
    url: '/deleteAplProcedureServlet',
    method: 'get',
    params: {
      pro_no
    }
  })
}

/**
 * 新增流程
 * @param {Object} procedure
 * @returns 
 */
export function addProcedureRequest(procedure) {
  return request({
    url: '/addAplProcedureServlet',
    data: procedure,
    method: 'post',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
}

/**
 * 判断流程名或对应申请表名是否重复
 */
export function setenceProcedureDuplicatedRequest(procedure) {
  return request({
    url: '/sentenceAplProcedureDuplicateServlet',
    method: 'post',
    data: procedure,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
}

/**
 * 更新流程信息
 */

export function updateProcedureRequest(procedure) {
  return request({
    url: '/updateAplProcedureServlet',
    data: procedure,
    method: 'post',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
}


/**
 * 查询在某流程中正在申请的申请表数量
 */

export function getApplicationsIngNumberRequest(pro_no){
  return request({
    url: '/getApplicationsIngNumberServlet',
    method: 'get',
    params: {
      pro_no
    }
  })
}
