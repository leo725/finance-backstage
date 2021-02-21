import Cookies from 'js-cookie'
import $vx from '@/utils/vx'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    visitedViews: $vx.sessionStorage.getItem('visitedViews') || []
  },
  mutations: {
    // 侧边栏显示隐藏
    TOGGLE_SIDEBAR (state) {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR (state, withoutAnimation){
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE (state, device) {
      state.device = device
    },
    // 标签导航的添加删除
    ADD_VISITED_VIEWS(state, view) {
      if (state.visitedViews.some((v, i) => { return v.path === view.path })) {
        for (let i = 0; i < state.visitedViews.length; i++) {
          const ele = state.visitedViews[i];
          if (ele.path === view.path) {
            state.visitedViews.splice(i, 1, { name: view.name, path: view.path, query: view.query })
            return $vx.sessionStorage.setItem('visitedViews', state.visitedViews);
          }
        }
      }
      state.visitedViews.push({ name: view.name, path: view.path, query: view.query })
      // 最多保留10个历史记录，多了之后删除最前面的1个
      // if(state.visitedViews.length>10){
      //   this.commit('DEL_VISITED_VIEWS', state.visitedViews[0])
      // }
      $vx.sessionStorage.setItem('visitedViews', state.visitedViews);
    },
    DEL_VISITED_VIEWS (state, view) {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
      $vx.sessionStorage.setItem('visitedViews', state.visitedViews);
    },
    DEL_OTHERS_VIEWS (state, view) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS (state) {
      state.visitedViews = []
      state.cachedViews = []
      $vx.sessionStorage.removeItem('visitedViews');
    }
  },
  actions: {
    // 侧边栏显示隐藏
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    // 标签导航的添加删除
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app