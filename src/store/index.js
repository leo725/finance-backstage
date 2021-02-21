import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import errorLog from './modules/errorLog'
import getters from './getters'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    app,
    user,
    errorLog,
    permission
  },
  getters,
  // strict: debug,
  // plugins: debug
  //   ? [createLogger()]
  //   : []
})

export default store
