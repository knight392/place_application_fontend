/**
 * 教师请求接口
 */
import {request} from './request'

/**
 * 获取所的教师
 * @returns 
 */
export function getAllTeachersRequest() {
  return request({
      url: '/getAllTeachersServlet',
      method: 'get',
     
    })
}

/**
 * 删除教师
 * @param {String} teacher_no 
 * @returns 
 */
export function deleteTeacherRequest(teacher_no) {
  return request({
    url:'/deleteTeacherServlet',
    method:'get',
    params:{
      teacher_no
    }
  })
}

/**
 * 注册教师
 * @param {Object} teacher 
 * @returns 
 */
export function addTeacherRequest(teacher) {
  return request({
    url:'/registerTeacherServlet',
    data:teacher,
    method:'post',
    headers: {
      "Content-Type":"application/json;charset=UTF-8"
    }
  })
}

/**
 * 判断教师账号是否重复
 */
export function setenceTeacherDuplicatedRequest(teacher_no) {
  return request({
    url:'/sentenceTeacherDuplicateServlet',
    method:'get',
    params:{
      teacher_no
    }
  })
}

/**
 * 更新教师信息
 */

export function updateTeacherRequest(teacher) {
  return request({
    url:'/updateTeacherServlet',
    data:teacher,
    method:'post',
    headers: {
      "Content-Type":"application/json;charset=UTF-8"
    }
  })
}

/**
 * 教师类
 */
export class Teacher {
  constructor(teacher_no, teacher_name) {
   this.teacher_no = teacher_no;
   this.teacher_name = teacher_name;
  }
}

/**
 * 教师列表类
 */
export class Teachers{
  constructor(teachers) {
    this.teachers = teachers
  }
}