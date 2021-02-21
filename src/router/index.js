/**
 * Created by leo on 2020/7/2.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import Layout from '@/views/Layout/Layout'
import store from '@/store'
import $vx from 'utils/vx'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(VueRouter);
var router = new VueRouter({
  routes: routes,
  scrollBehavior: () => ({
    y: 0
  })
});

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

const whiteList = ['/login','/forget'] //白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if ($vx.localStorage.getItem('token')) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.addRouters.length === 0) { // 判断当前用户是否已拉取完菜单信息
        store.dispatch('GenerateRoutes').then(routers => { // 获取用户权限数据
          router.addRoutes(filterAsyncRouter(routers)) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置replace: true，以便导航不会留下历史记录
        })
      } else {
        next()
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' }) // 重定向到登录页
      NProgress.done()
    }
  }
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router;