import Vue from 'vue'
import Router from 'vue-router'
// import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 引入获取 token 的工具函数
// import store from '@/store' // 引入 Vuex store，用于获取用户角色信息

Vue.use(Router)
// 懒加载组件
const Layout = () => import('@/layout') // 主布局
const Login = () => import('@/views/login/index') // 登录页面
const NotFund = () => import('@/views/404/index') // 404 页面
const ASHome = () => import('@/views/AS-Home/index') // 首页
const Company = () => import('@/views/AS-company/index') // 公司首页
const Companyorder = () => import('@/views/Company-order') // 发布订单
const Companystatus = () => import('@/views/Company-status') // 公司订单状态
const CompanyQuery = () => import('@/views/Company-query') // 公司查看链上库存
const UserCenter = () => import('@/views/AS-user/index') // 用户中心
const BlockchainWarehouse = () => import('@/views/AS-Tabulation') // 链上仓库
const EquipmentWarehouse = () => import('@/views/AS-UpQuery') // 仓库设备
const ControlWarehouse = () => import('@/views/AS-DownQuery') // 库存控制
const Warehousing = () => import('@/views/AS-Warehousing') // 入库信息
const Outbound = () => import('@/views/AS-Outbound') // 出库信息
const Transaction = () => import('@/views/AS-transaction/index') // 交易监管
const BlockReport = () => import('@/views/AS-block') // 区块报表
const adminorder = () => import('@/views/AS-adminOrder') // 管理员订单管理
const WarehouseReport = () => import('@/views/AS-report') // 仓库报表
const WarningDashboard = () => import('@/views/AS-Waining/index') // 安全预警
const LSHome = () => import('@/views/LS-Home/index') // 大屏展示
export const routes = [
  { path: '/', redirect: '/login' }, // 重定向到登录页面
  { path: '/login', component: Login },
  { path: '/404', component: NotFund },
  {
    path: '/ashome',
    component: Layout,
    children: [
      { path: '', component: ASHome, meta: { title: '首页', icon: 'editor-left-alignment', roles: ['admin', 'operator'] }}
    ]
  },
  {
    path: '/company',
    component: Layout,
    children: [
      { path: '', component: Company, meta: { title: '公司首页', icon: 'editor-left-alignment', roles: ['company'] }}
    ]
  },
  {
    path: '/order-management',
    component: Layout,
    meta: { title: '订单管理', icon: 'editor-left-alignment', roles: ['company'] }, // 一级菜单的meta信息
    children: [
      {
        path: 'publish',
        component: Companyorder,
        meta: { title: '发布订单', icon: 'editor-left-alignment', roles: ['company'] }
      },
      {
        path: 'status',
        component: Companystatus,
        meta: { title: '订单状态', icon: 'editor-left-alignment', roles: ['company'] }
      }
    ]
  },
  {
    path: '/query',
    component: Layout,
    children: [
      { path: '', component: CompanyQuery, meta: { title: '查看链上库存', icon: 'editor-left-alignment', roles: ['company'] }}
    ]
  },
  {
    path: '/asuser',
    component: Layout,
    children: [
      { path: '', component: UserCenter, meta: { title: '用户中心', icon: '安全预警', roles: ['admin', 'operator'] }}
    ]
  },
  {
    path: '/asinformation',
    component: Layout,
    meta: { title: '仓库管理', icon: '粮食安全考核', roles: ['admin', 'operator'] },
    children: [
      { path: 'blockchainwarehouse', component: BlockchainWarehouse, meta: { title: '链上仓库', icon: '链接', roles: ['admin', 'operator'] }},
      { path: 'equipmentwarehouse', component: EquipmentWarehouse, meta: { title: '仓库设备', icon: '应用管理', roles: ['admin', 'operator'] }}
    ]
  },
  {
    path: '/asmanage',
    component: Layout,
    meta: { title: '生产管理', icon: '生产管理', roles: ['admin', 'operator'] },
    children: [
      { path: 'controlwarehouse', component: ControlWarehouse, meta: { title: '库存控制', icon: '仓库信息', roles: ['admin', 'operator'] }},
      { path: 'warehousing', component: Warehousing, meta: { title: '入库信息', icon: '新风神_扫码入库', roles: ['admin', 'operator'] }},
      { path: 'outbound', component: Outbound, meta: { title: '出库信息', icon: '已出库', roles: ['admin', 'operator'] }}
    ]
  },
  {
    path: '/astransaction',
    component: Layout,
    meta: { title: '交易管理', icon: '数据报表', roles: ['admin'] },
    children: [
      { path: 'order', component: adminorder, meta: { title: '订单查询', icon: 'el-icon-s-data' }},
      { path: 'transaction', component: Transaction, meta: { title: '交易监管', icon: 'el-icon-s-data' }}
    ]
  },
  {
    path: '/asreport',
    component: Layout,
    meta: { title: '数据报表', icon: '数据报表', roles: ['admin', 'operator'] },
    children: [
      { path: 'blockreport', component: BlockReport, meta: { title: '区块报表', icon: 'el-icon-s-data', roles: ['admin', 'operator'] }},
      { path: 'warehousereport', component: WarehouseReport, meta: { title: '仓库报表', icon: 'el-icon-s-data', roles: ['admin', 'operator'] }}
    ]
  },
  {
    path: '/aswarning',
    component: Layout,
    children: [
      { path: '', component: WarningDashboard, meta: { title: '安全预警', icon: '安全预警', roles: ['admin', 'operator'] }}
    ]
  },
  { path: '/lshome', component: LSHome, roles: ['admin', 'operator'] },
  { path: '*', redirect: '/404' } // 捕获所有未匹配的路由，重定向到404
]

const createRouter = () => new Router({
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
