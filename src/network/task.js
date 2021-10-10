import { request } from './request'

/**
 * 获取待审批任务
 * @param {*} teacher_no 教师账号
 * @param {*} task_no 已有任务中的最后一条的task_no, 没有数据则置0
 * @returns 
 */
export function getTodoTasksRequest(teacher_no, task_no) {
  return request(
    {
      url: '/getTodoTasksServlet',
      method: 'get',
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      params: {
        teacher_no, 
        task_no
      }
    }
  )
}

/**
 * 获取已审批任务
 * @param {*} teacher_no 教师账号
 * @param {*} task_no 已有任务中的最后一条的task_no, 没有数据则置0
 * @returns 
 */
export function getFinishedTasksRequest(teacher_no, task_no) {
  return request(
    {
      url: '/getFinishedTasksServlet',
      method: 'get',
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      params: {
        teacher_no, 
        task_no
      }
    }
  )
}

/**
 * 审批任务
 * @param {Number} task_no 任务编号
 * @param {Number} decision 审批决定 1 - 通过, 2 - 打回, 3 - 拒绝
 * @param {String} refuse_reasion  当为 打回或拒绝需填入原因
 */
export function sentenceTaskRequest(task_no, decision, refuseReason = null){
  return request({
    url:'/sentenceTaskServlet',
    data:{
      task_no,
      decision,
      refuseReason
    },
    method:'post',
    headers: {
      "Content-Type":"application/json;charset=UTF-8"
    }
  })
}