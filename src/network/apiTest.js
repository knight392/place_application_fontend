import {request} from './request'
export function testApi1(admin_no, admin_password) {
    return request({
      method: 'post',
      url: '/adminLoginServlet',
      headers: {
        "Content-Type":"application/json;charset=UTF-8"
      },
      data: {
        admin_no,
        admin_password
      }
    })
}

export function testApi2(positon_no, teacher_no){
  let fd = new FormData();
  fd.append("position_no",positon_no);
  fd.append("teacher.teacher_no",teacher_no);
  return request({
    method: 'post',
    url: '/adminLoginServlet',
    data: fd,
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
  })
}

export function testApi3(data) {
  return request({
    url: '/studentLoginServlet',
    method:'post',
    data,
    headers: {
      "Content-Type":"application/json;charset=UTF-8"
    },
  })
}