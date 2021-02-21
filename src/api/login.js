import fetch from '@/api/http'
import { Url } from './url'

// 登陆
export const loginByUsername = (query) => {
  return fetch.post(Url + 'user/login', query)
}
// 退出
export const logout = (query) => {
  return fetch.post(Url + 'user/logout', query)
}

// 验证码 
export const getVerifyCode = () => {
  return fetch.postNoSign(Url + 'user/getVerifyCode')
}
// 验证码-验证
export const checkVerifyCode = (query) => {
  return fetch.postNoSign(Url + 'user/checkVerifyCode', query)
}
// 修改密码
export const modifyPassword = (query) => {
  return fetch.postNoSign(Url + 'user/modifyPassword', query)
}
