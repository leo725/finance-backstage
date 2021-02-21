import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import '@/utils/errorLog' // error log
import { enumVersion } from 'api/url'
import { getEnum } from '@/api'
import $vx from '@/utils/vx'

Vue.use(ElementUI)
Vue.use(VueLazyLoad, {
  error: require('./assets/index/error.png'),
  loading: require('./assets/index/loading.gif'),
  attempt: 4
})

Vue.config.productionTip = false

// 获取枚举类 - 如果版本不一致，就获取最新枚举类
const initEnum = async ()=> {
  if(!store.getters.token){
    return
  }
  let oldVersion = $vx.localStorage.getItem('enumVersion');
  if(enumVersion != oldVersion){
    $vx.localStorage.setItem('enumVersion', enumVersion);
    var enumKey = await getEnum({})
    $vx.localStorage.setItem('enum', enumKey.data || {});
  }
}
initEnum();

// register global utility filters.
import * as filters from './utils/filter' // 全局filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
