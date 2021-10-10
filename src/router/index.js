import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home'
import store from 'store'
import { ADMINLOGINWITHTOKEN,TEACHERLOGINWITHTOKEN } from 'store/actions-type'
import { ADDADMIN,ADD_TEACHER } from 'store/mutations-type'

const Admin = () => import('views/admin/Admin')
const AdminLogin = () => import("views/adminLogin/AdminLogin")
const Teacher = () => import('views/teacher/Teacher')
const TeacherLogin = () => import("views/teacherLogin/TeacherLogin")
const Student = () => import('views/student/Student')
const StudentLogin = () => import("views/studentLogin/StudentLogin")
const ManageTeacher = () => import("views/manageTeacher/ManageTeacher")
const ManagePosition = () => import("views/managePosition/ManagePosition")
const ManagePlace = () => import("views/managePlace/ManagePlace")
const ManageProcedure = () => import("views/manageProcedure/ManageProcedure")
const TeacherEdit = () => import("views/manageTeacher/childCopms/TeacherEdit");
const TeacherAll = () => import("views/manageTeacher/childCopms/TeacherAll");
const PositionEdit = () => import("views/managePosition/childCopms/PositionEdit");
const PositionAll = () => import("views/managePosition/childCopms/PositionAll");
const PlaceEdit = () => import("views/managePlace/childCopms/PlaceEdit");
const PlaceAll = () => import("views/managePlace/childCopms/PlaceAll");
const ProcedureEdit = () => import("views/manageProcedure/childCopms/ProcedureEdit");
const ProcedureAll = () => import("views/manageProcedure/childCopms/ProcedureAll");
const ExamineTask = () => import("views/examineTask/ExamineTask");
const TaskAll = () => import("views/examineTask/childComps/TaskAll");
const TaskDetail = () => import("views/examineTask/childComps/TaskDetail");

const ChatMsg = () => import("views/chatMsg/ChatMsg");

const routes = [
  // 重定向
  {
    path: '',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    // name属性是为在链接时更加方便，不需要写路径,如 to: Home
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  // 管理员端页面
  {
    path: '/admin',
    name: "Admin",
    component: Admin,
    meta: {
      title: '管理员页面'
    },
    children: [
      // 也可以使用redirect来设置一个默认视图
      {
        path: '/',
        redirect: "teacherManage"
      },
      // 教师管理
      {
        path: 'teacherManage',
        component: ManageTeacher,
        children: [
          {
            path: '/',
            redirect: "all"
          },
          {
            path: 'all',
            component: TeacherAll,
            meta: {
              title: '所有教师'
            }
          },
          {
            path: 'edit',
            component: TeacherEdit,
            name: 'teacherEdit',
            meta: {
              title: '教师详情信息'
            },
            props: (route) => ({ teacher_no: route.params.teacher_no, teacher_name: route.params.teacher_name, positions: route.params.positions })
          },
        ]

      },
      // 职位管理
      {
        path: 'positionManage',
        component: ManagePosition,
        children: [
          {
            path: '/',
            redirect: "all"
          },
          {
            path: 'all',
            component: PositionAll,
            meta: {
              title: '所有职位'
            }
          },
          {
            path: 'edit',
            component: PositionEdit,
            name: 'positionEdit',
            meta: {
              title: '职位详情信息'
            },
            props: (route) => ({ position: route.params.position })
          },
        ]
      },
      // 场地管理
      {
        path: 'placeManage',
        component: ManagePlace,
        children: [
          {
            path: '/',
            redirect: "all"
          },
          {
            path: 'all',
            component: PlaceAll,
            meta: {
              title: '所有场地'
            }
          },
          {
            path: 'edit',
            component: PlaceEdit,
            name: 'placeEdit',
            meta: {
              title: '场地详情信息'
            },
            props: (route) => ({ place: route.params.place })
          },
        ]

      },
      // 流程管理
      {
        path: 'procedureManage',
        component: ManageProcedure,
        children: [
          {
            path: '/',
            redirect: "all"
          },
          {
            path: 'all',
            component: ProcedureAll,
            meta: {
              title: '所有流程'
            }
          },
          {
            path: 'edit',
            component: ProcedureEdit,
            name: 'procedureEdit',
            meta: {
              title: '流程详情信息'
            },
            props: (route) => ({ procedure: route.params.procedure })
          },
        ]
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.admin === null) {
        // 未登录
        // 根据token获取admin数据，异步请求，看是否能获取到
        store.dispatch(ADMINLOGINWITHTOKEN).then(admin => {
          store.commit(ADDADMIN, admin);
          next();
        }, () => {
          next({ path: '/adminLogin' })
        }).catch(() => {
          next({ path: '/adminLogin' })
        })
      } else {
        next()
      }
    }
  },
  // 管理员登录
  {
    path: '/adminLogin',
    name: "AdminLogin",
    component: AdminLogin,
    meta: {
      title: '管理员登录'
    }
  },
  // 教师端页面
  {
    path: '/teacher',
    name: "Teacher",
    component: Teacher,
    meta: {
      title: '教师端页面'
    },
    children:[
      // 也可以使用redirect来设置一个默认视图
      {
        path: '/',
        redirect: "examineTask"
      },
      // 我的审批
      {
        path: 'examineTask',
        component: ExamineTask,
        children: [
          {
            path: '/',
            redirect: "all"
          },
          {
            path: 'all',
            component: TaskAll,
            name: 'TaskAll',
            meta: {
              title: '我的审批'
            }
          },
          {
            path: 'detail',
            name: 'TaskDetail',
            component: TaskDetail,
            meta: {
              title: '审批详情'
            },
            props: (route) => ({ task: route.params.task })
          }
        ]
      },
      // 消息
      {
        path: 'chatMsg',
        component: ChatMsg
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.teacher === null) {
        // 未登录
        // 根据token获取teacher数据，异步请求，看是否能获取到
        store.dispatch(TEACHERLOGINWITHTOKEN).then(admin => {
          store.commit(ADD_TEACHER, admin);
          next();
        }, () => {
          next({ path: '/teacherLogin' })
        }).catch(() => {
          next({ path: '/teacherLogin' })
        })
      } else {
        next()
      }
    }
  },
  // 教师登录
  {
    path: '/teacherLogin',
    name: "TeacherLogin",
    component: TeacherLogin,
    meta: {
      title: '教师登录'
    }
  },
  // 学生端页面
  {
    path: '/student',
    name: "Student",
    component: Student,
    meta: {
      title: '学生端页面'
    }
  },
  // 学生登录
  {
    path: '/studentLogin',
    name: "studentLogin",
    component: StudentLogin,
    meta: {
      title: '学生登录'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouter)

export default router