import fetch from '@/api/http'
import { Url } from './url'

// 取得车辆品牌列表
export const getCarBrandList = (query) => {
  return fetch.post(Url + 'api/systembase/getCarBrandList', query)
}
// 取得车辆系列列表
export const getCarSeriesList = (query) => {
  return fetch.post(Url + 'api/systembase/getCarSeriesList', query)
}
// 取得车型列表
export const getCarModelList = (query) => {
  return fetch.post(Url + 'api/systembase/getCarModelList', query)
}
// 省份
export const getProvinceList = (query) => {
  return fetch.post(Url + 'api/province/getProvinceList', query)
}
// 城市
export const getCityList = (query) => {
  return fetch.post(Url + 'api/city/getCityList', query)
}
// 县区
export const getDistrictList = (query) => {
  return fetch.post(Url + 'api/district/getDistrictList', query)
}
// 枚举
export const getEnum = (query) => {
  return fetch.post(Url + 'api/enum/get', query)
}
// 上传服务签名
export const getOssSign = (query) => {
  return fetch.post(Url + 'api/oss/sign', query)
}
// 获取省市区树状结构
export const getAreaTree = (query) => {
  return fetch.post(Url + 'api/area/getAreaTree', query)
}


