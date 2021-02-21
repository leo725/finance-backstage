import routes from '../../router/routes'
import { listPageTreeByUserId } from '../../api/index'

const permission = {
  state: {
    routers: routes,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routes.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        let accessedRouters
        listPageTreeByUserId({}).then(res=>{
          if(res.code===0){
            accessedRouters = res.data
            accessedRouters.push({ path: '*', hidden: true, redirect: '/404' })
            resolve(accessedRouters)
            commit('SET_ROUTERS', accessedRouters)
          }
        })
      })
    }
  }
}

export default permission