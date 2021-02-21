import axios from 'axios'
import store from '@/store'
import $vx from '@/utils/vx'
import { Message } from 'element-ui'
import { getSign } from './sign'
import { Loading } from 'element-ui'
import router from '@/router/index'

// axios 配置
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true
// POST传参序列化
axios
  .interceptors
  .request
  .use((config) => {
    config.withCredentials=true
    return config
  }, (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  })

// 返回状态判断

axios
  .interceptors
  .response
  .use((res) => {
    const response = res.data
    if (response.code === 'undefined') {
      return response
    } else {
      if (response.code === 30027) {
        store.dispatch('errorOut')
        router.push({ path: '/login' });
        Message({
          showClose: true,message: response.message,type: 'error',duration: 4 * 1000
        })
        return Promise.reject('error')
      } else if (response.code === 30006 || response.code === 30007 || response.code === 30008 || response.code === 30009) {
        store.dispatch('errorOut')
        router.push({ path: '/login' })
        Message({
          showClose: true, message: response.message, type: 'error', duration: 4 * 1000
        })
        return Promise.reject('error')
      } else if (response.code !== 0) {
   
        if (response.code === null) {
          Message({
            showClose: true,
            message: '请求异常,联系管理员,或刷新重试!!',
            type: 'error',
            duration: 3 * 1000
          })
        } else {
          Message({
            showClose: true,
            message: response.message,
            type: 'error',
            duration: 4 * 1000
          })
        }
        return response
      } else {
        return response
      }
    }
  }, (err) => {
    // 断网 或者 请求超时 状态
    if (!err.response) {
      // 请求超时状态
      if (err.message.includes('timeout')) {
        console.log('超时了')
        Message.error('请求超时，请检查网络是否连接正常!!')
      } else {
        // 可以展示断网组件
        console.log('断网了')
        Message.error('访问请求失败!!')
      }
      return
    } else if (err.response.data && (err.response.data.code === 30009 || err.response.data.code === 30008 || err.response.data.code === 30007 || err.response.data.code === 30006)){
      $vx.localStorage.removeItem('token')
      $vx.localStorage.removeItem('user_info');
      router.push({ path: '/login' })
      Message({
        showClose: true, message: err.response.data.message, type: 'error', duration: 4 * 1000
      })
    }else if (err.response.status==403){
      Message({
        showClose: true,
        message: '您暂无此操作权限!!',
        type: 'error'
      });
    } else{
      Message({
        showClose: true,
        message: '请求异常,联系管理员,或刷新重试!!',
        type: 'error'
      });
    }
    return Promise.reject(err.response)
  })

export default {
  // get请求
  get(url, param = {}) {
    return new Promise((resolve, reject) => {
      axios({ method: 'get', url, params: param,headers: { Authorization: $vx.localStorage.getItem('token') || '' } }).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  postNoSign(url, param = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param
      }).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  post(url, param = {}) {
    // 签名
    if(param.sign){delete param.sign}
    param.sign = getSign(param)
    return new Promise((resolve, reject) => {
      axios({
          method: 'post',
          url,
          data: param,
          headers: { Authorization: $vx.localStorage.getItem('token') || '' }
        }).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}