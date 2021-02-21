import fetch from '@/api/http'
import {
  Url
} from './url'

/********* 基础数据接口 **********/
// 枚举
export const getEnum = (query) => {
  return fetch.post(Url + 'api/enum/get', query)
}

/********* 车辆融资管理 **********/
// 车辆融资管理 - 详情
export const carFinanceDetail = (query) => {
  return fetch.post(Url + 'api/financing/car/detail', query)
}
// 车辆融资管理 - 获取车辆评估
export const carFinanceEvalCar = (query) => {
  return fetch.post(Url + 'api/financing/car/evalCar', query)
}
// 车辆融资管理 - 车源管理 - 售卖车辆列表分页查询
export const carSellList = (query) => {
  return fetch.post(Url + 'api/car/sell/listCars', query)
}
// 车辆融资管理 - 车源管理 - 售卖车辆详情
export const carSellDetail = (query) => {
  return fetch.post(Url + 'api/car/sell/detail', query)
}


/********* 系统设置 **********/
// 系统设置 - 菜单管理 - 根据条件获取账号列表
export const getKrUserList = query => {
  return fetch.post(Url + 'user/getKrUserList', query)
}
// 系统设置-账号管理- 修改账号信息
export const saveKrUser = (query) => {
  return fetch.post(Url + 'user/saveKrUser', query)
}
// 系统设置-账号管理- 根据用户ID，获取其已有权限的菜单ID集合
export const listByRoleId = (query) => {
  return fetch.post(Url + 'api/sysRoleMenu/listByRoleId', query)
}
// 系统设置-账号管理- 根据用户ID，获取其已有权限的菜单ID集合,并按照菜单类型的不同，分组展示
export const splitPageBtnByRoleId = (query) => {
  return fetch.post(Url + 'api/sysRoleMenu/splitPageBtnByRoleId', query)
}
// 系统设置-账号管理- 更新用户->菜单的映射
export const updateUrlAuthentication = (query) => {
  return fetch.post(Url + 'api/sysRoleMenu/updateUrlAuthentication', query)
}

/********* 系统设置 - 菜单管理 **********/
// 系统列出当前登录用户，能够查看的页面(仅含页面，不含按钮)，树形结构返回
export const listPageTreeByUserId = query => {
  return fetch.post(Url + 'api/sysMenu/listPageTreeByUserId', query)
}
// 系统设置 - 菜单管理 - 添加菜单
export const sysMenuAdd = query => {
  return fetch.post(Url + 'api/sysMenu/add', query)
}
// 系统设置 - 菜单管理 - 删除菜单
export const sysMenuDelete = query => {
  return fetch.post(Url + 'api/sysMenu/delete', query)
}
// 系统设置 - 菜单管理 - 更新菜单
export const sysMenuUpdate = query => {
  return fetch.post(Url + 'api/sysMenu/update', query)
}
// 系统设置 - 菜单管理 - 列出某个页面下拥有的按钮
export const listBtnsByParentMenuId = query => {
  return fetch.post(Url + 'api/sysMenu/listBtnsByParentMenuId', query)
}
// 系统设置 - 菜单管理 - 列出所有的页面(仅含页面，不含按钮)，树形结构返回，供 添加/更新 菜单时使用
export const listPageTree = query => {
  return fetch.post(Url + 'api/sysMenu/listPageTree', query)
}
// 系统设置 - 菜单管理 - 列出所有的菜单，树形结构返回，供 添加/更新 菜单时使用
export const sysMenuListTree = query => {
  return fetch.post(Url + 'api/sysMenu/listTree', query)
}

/* 系统设置 - 资方管理 */
// 系统设置 - 资方管理 - 列表
export const fundingPartyList = query => {
  return fetch.post(Url + 'api/fundingParty/list', query)
}
// 系统设置 - 资方管理 - 添加
export const fundingPartySave = query => {
  return fetch.post(Url + 'api/fundingParty/save', query)
}
// 系统设置 - 资方管理 - 资方账户列表
export const fundingPartyAccountList = query => {
  return fetch.post(Url + 'api/fundingPartyAccountAccount/list', query)
}
// 系统设置 - 资方管理 - 资方账户保存
export const fundingPartyAccountSave = query => {
  return fetch.post(Url + 'api/fundingPartyAccountAccount/save', query)
}

/* 系统设置 - 线下店管理 */
// 系统设置 - 线下店管理 - 详情
export const OfflieShopDetail = query => {
  return fetch.post(Url + 'api/OfflieShop/detail', query)
}
// 系统设置 - 线下店管理 - 分页查询
export const OfflieShopPage = query => {
  return fetch.post(Url + 'api/OfflieShop/page', query)
}
// 系统设置 - 线下店管理 - 创建/修改
export const OfflieShopSave = query => {
  return fetch.post(Url + 'api/OfflieShop/save', query)
}
// 系统设置 - 线下店管理 - 获取小胖车线下店列表
export const midshopPage = query => {
  return fetch.post(Url + 'api/midshop/page', query)
}
// 系统设置 - 线下店管理 - 库融线下店银行卡列表
export const OfflieShopBankPage = query => {
  return fetch.post(Url + 'api/OfflieShopBank/page', query)
}
// 系统设置 - 线下店管理 - 库融线下店银行卡 保存
export const OfflieShopBankSave = query => {
  return fetch.post(Url + 'api/OfflieShopBank/save', query)
}
/* 系统设置 - 线下店管理 */
// 系统设置 - 车商管理 - 列表
export const krCarDealerList = query => {
  return fetch.post(Url + 'api/krCarDealer/list', query)
}
// 系统设置 - 车商管理 - 详情
export const krCarDealerGetById = query => {
  return fetch.post(Url + 'api/krCarDealer/getById', query)
}
// 系统设置 - 计息方式 - 分页
export const krInterestaccrualPage = query => {
  return fetch.post(Url + 'api/Interestaccrual/page', query)
}
// 系统设置 - 计息方式 - 详情
export const krInterestaccrualDetail = query => {
  return fetch.post(Url + 'api/Interestaccrual/detail', query)
}
// 系统设置 - 计息方式 - 创建/修改
export const krInterestaccrualSave = query => {
  return fetch.post(Url + 'api/Interestaccrual/save', query)
}
/* 系统设置 - 系统设置 */
// 系统设置 - 系统设置 - 详情
export const KrSystemSettingDetail = query => {
  return fetch.post(Url + 'api/KrSystemSetting/detail', query)
}
// 系统设置 - 系统设置 - 修改
export const KrSystemSettingUpdate = query => {
  return fetch.post(Url + 'api/KrSystemSetting/update', query)
}
// 系统设置 - 公司账户 - 列表
export const KrCompanyAccountPage = query => {
  return fetch.post(Url + 'api/KrCompanyAccount/page', query)
}
// 系统设置 - 公司账户 - 创建/修改
export const KrCompanyAccountSave = query => {
  return fetch.post(Url + 'api/KrCompanyAccount/save', query)
}


/********* 授信管理 **********/
// 授信管理 - 车商授信 - 分页查询
export const creditGrantingPage = query => {
  return fetch.post(Url + 'api/credit/granting/page', query)
}
// 授信管理 - 车商授信 - 详情
export const creditGrantingDetail = query => {
  return fetch.post(Url + 'api/credit/granting/detail', query)
}
// 授信管理 - 车商授信 - 创建/修改
export const creditGrantingSave = query => {
  return fetch.post(Url + 'api/credit/granting/save', query)
}
// 授信管理 - 车商授信 - 更新状态
export const creditGrantingUpdateStatus = query => {
  return fetch.post(Url + 'api/credit/granting/updateStatus', query)
}
// 授信管理 - 车商授信 - 卡分期经销商信息
export const kfqDealerList = query => {
  return fetch.post(Url + 'api/credit/granting/kfqDealerList', query)
}
// 授信管理 - 车商授信 - 关联卡分期经销商信息
export const relevanceKfqDealer = query => {
  return fetch.post(Url + 'api/credit/granting/relevanceKfqDealer', query)
}


/********* 车辆融资管理 **********/
// 授信管理 - 车辆融资 - 分页查询
export const financingCarPage = query => {
  return fetch.post(Url + 'api/financing/car/page', query)
}
// 授信管理 - 车辆融资 - 更新状态
export const financingCarUpdateStatus = query => {
  return fetch.post(Url + 'api/financing/car/updateStatus', query)
}
// 授信管理 - 车辆融资核算 - 提交经理审核
export const financingCarSubmitManage = query => {
  return fetch.post(Url + 'api/financing/car/submitManage', query)
}
// 授信管理 - 车辆融资核算 - 核算
export const financingCarComputation = query => {
  return fetch.post(Url + 'api/financing/car/computation', query)
}
// 授信管理 - 车辆融资核算 - 核算校验
export const carComputationVerify = query => {
  return fetch.post(Url + 'api/financing/car/computationVerify', query)
}
// 授信管理 - 车辆融资审核记录
export const financingCarRecordPage = query => {
  return fetch.post(Url + 'api/FinancingCarRecord/page', query)
}

/* 财务管理 */
// 财务管理 - 车辆融资打款 - 打款
export const financingCarRemit = query => {
  return fetch.post(Url + 'api/financing/car/remit', query)
}
// 财务管理 - 车辆融资打款 - 出款账户
export const KrCarDealerBankPage = query => {
  return fetch.post(Url + 'api/KrCarDealerBank/page', query)
}
// 财务管理 - 库融展期列表 - 分页
export const repaymentPage = query => {
  return fetch.post(Url + 'api/repayment/page', query)
}
// 财务管理 - 库融展期列表 - 审核
export const repaymentCheck = query => {
  return fetch.post(Url + 'api/repayment/check', query)
}
// 财务管理 - 库融展期列表 - 展期申请记录
export const standOverRecordPage = query => {
  return fetch.post(Url + 'api/StandOverRecord/page', query)
}
// 财务管理 - 收费明细列表
export const carChargeDeatilPage = query => {
  return fetch.post(Url + 'api/financing/car/chargeDeatilPage', query)
}

/********* 库融还款核实**********/
// 授信管理 - 库融还款 - 分页查询
export const repaymentVerifyPage = query => {
  return fetch.post(Url + 'api/repaymentVerify/page', query)
}
// 授信管理 - 库融还款 - 详情
export const repaymentVerifyDetail = query => {
  return fetch.post(Url + 'api/repaymentVerify/detail', query)
}
// 授信管理 - 库融还款 - 审核
export const repaymentVerifyCheck = query => {
  return fetch.post(Url + 'api/repaymentVerify/check', query)
}
// 授信管理 - 库融还款 - 计算
export const repaymentCalculateVO = query => {
  return fetch.post(Url + 'api/repaymentVerify/CalculateVO', query)
}
// 授信管理 - 库融还款 - 核对还款信息
export const checkRepayment = query => {
  return fetch.post(Url + 'api/repayment/checkRepayment', query)
}