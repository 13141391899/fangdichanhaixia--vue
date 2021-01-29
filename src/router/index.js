import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import tableRouter from './modules/table'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 在这里添加左侧菜单栏
  {
    path: '/',
    component: Layout,
    redirect: '/bossList',
    children: [
      {
        path: 'bossList',
        component: () => import('@/views/fangdichanhaixia/boss/List'),
        name: '老板信息列表',
        meta: { title: '老板信息列表', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/houseList',
    children: [
      {
        path: 'houseList',
        component: () => import('@/views/fangdichanhaixia/house/List'),
        name: '房源信息列表',
        meta: { title: '房源信息列表', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/roomList',
    children: [
      {
        path: 'roomList',
        component: () => import('@/views/fangdichanhaixia/room/List'),
        name: '房间信息列表',
        meta: { title: '房间信息列表', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/payList',
    children: [
      {
        path: 'payList',
        component: () => import('@/views/fangdichanhaixia/pay/List'),
        name: '支付信息列表',
        meta: { title: '支付信息列表', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/opLogList',
    children: [
      {
        path: 'opLogList',
        component: () => import('@/views/fangdichanhaixia/oplog/List'),
        name: '操作日志列表',
        meta: { title: '操作日志列表', icon: 'dashboard', affix: true }
      }
    ]
  }


  //tableRouter
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
