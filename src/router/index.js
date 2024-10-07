import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import FixedPage from '@/views/AS-e/index.vue'






export const routes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/AS-Home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example',
    name: 'Example',
    meta: { title: '粮食信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tabulation',
        name: 'Tabulation',
        component: () => import('@/views/AS-Tabulation'),
        meta: { title: '仓库列表', icon: 'el-icon-menu' }

      },
      {
        path: 'classes',
        name: 'Classes',
        component: () => import('@/views/AS-UpQuery'),
        meta: { title: '链上查询', icon: 'el-icon-menu' }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/AS-DownQuery'),
        meta: { title: '库存查询', icon: 'el-icon-user-solid' }
      },
      {
        path: '/fixed-page',
        name: 'fixedPage',
        component: FixedPage,
        meta: { title: '仓库设备管理', icon: 'el-icon-menu' },
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'System',
    meta: { title: '生产管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/AS-Warehousing'),
        meta: { title: '入库信息', icon: 'el-icon-menu' }
      },
      {
        path: 'emp',
        name: 'Emp',
        component: () => import('@/views/AS-Outbound'),
        meta: { title: '出库信息', icon: 'el-icon-user-solid' }
      },
    ]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    name: 'Report',
    meta: { title: '数据报表', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'emp-report',
        name: 'emp-report',
        component: () => import('@/views/AS-report'),
        meta: { title: '仓库数据报表', icon: 'el-icon-s-data' }
      },
      {
        path: 'student-report',
        name: 'student-report',
        component: () => import('@/views/student-report'),
        meta: { title: 'test', icon: 'el-icon-s-data' }
      }
    ]
  },
  // {
  //   path: '/warning',
  //   component: Layout,
  //   redirect: '/warning',
  //   name: 'Warning',
  //   meta: { title: '安全预警', icon: 'el-icon-s-tools' }
  // },
  {
    path: '/warning',
    component: Layout,
    redirect: '/warning',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/AS-Waining/index'),
      meta: { title: '安全预警', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({

  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router