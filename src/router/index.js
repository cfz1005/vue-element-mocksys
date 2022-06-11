import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: '/my',
    children: [
      {
        path: 'my',
        name: 'my',
        component: () => import( /* webpackChunkName: "mylist" */ '@/views/home/mylist'),
        meta: { title: "我创建的项目" }
      },
      {
        path: 'team',
        name: 'team',
        component: () => import('@/views/home/teamlist'),
        meta: { title: "我加入的项目" }
      },
      {
        path: 'chart',
        name: 'chart',
        component: () => import('@/views/home/chart'),
        meta: { title: "数据中心" }
      },
      {
        path: 'project/:id(\\d+)',
        name: 'project',
        component: () => import('@/views/home/project'),
        meta: { title: "项目接口列表" }
      },
      {
        path: 'project/:pid(\\d+)/interface/:iid(\\d+)?',
        name: 'edit',
        component: () => import('@/views/home/edit'),
        meta: { title: "编辑接口" }
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account'),
    meta: { title: "一个简易的接口管理服务平台" }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about'),
    meta: { title: "关于我们" }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    meta: { title: "404" }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
