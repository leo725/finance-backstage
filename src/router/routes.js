const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/Layout/Layout'

const routes = [
  { path: '/login', component: _import('Login/Login'), hidden: true, meta: { keepAlive: false } },
  { path: '/404', component: _import('ErrorPage/404'), hidden: true, meta: { keepAlive: false } },
  { path: '/401', component: _import('ErrorPage/401'), hidden: true, meta: { keepAlive: false } },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    icon: 'icon-home',
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: '首页',
        hidden: true,
        component: _import('Dashboard/index'),
        meta: { keepAlive: true }
      }
    ]
  },
  // {
  //   path: '/CreditManage',
  //   component: Layout,
  //   redirect: '/CreditManage/CreditManage',
  //   icon: 'icon-xin',
  //   name: '授信管理',
  //   children: [
  //     { path: 'CreditManage', component: _import('CreditManage/CreditManage'), meta: { keepAlive: true }, name: '授信管理 ' },
  //     { path: 'PersonalRiskReport', component: _import('CreditManage/PersonalRiskReport'), meta: { keepAlive: true }, name: '个人风险评估报告 ' },
  //   ]
  // },
  // {
  //   path: '/CarFinanceManage',
  //   component: Layout,
  //   redirect: '/CarFinanceManage/CarAuditManage',
  //   icon: 'icon-cheliangxinxi',
  //   name: '车辆融资管理',
  //   children: [
  //     { path: 'CarSource', component: _import('CarFinanceManage/CarSource'), meta: { keepAlive: true }, name: '车源管理' },
  //     { path: 'CarDetail', component: _import('CarFinanceManage/CarDetail'), hidden: true, meta: { keepAlive: true }, name: '车源详情' },
  //     { path: 'CarAuditManage', component: _import('CarFinanceManage/CarAuditManage'), meta: { keepAlive: true }, name: '车辆审核管理' },
  //     { path: 'CarFinanceCheck', component: _import('CarFinanceManage/CarFinanceCheck'), meta: { keepAlive: true }, name: '车辆融资核算' },
  //     { path: 'CarFinanceManage', component: _import('CarFinanceManage/CarFinanceManage'), meta: { keepAlive: true }, name: '车辆核算审核' },
  //     { path: 'ExtendTermList', component: _import('CarFinanceManage/ExtendTermList'), meta: { keepAlive: true }, name: '库融展期列表' },
  //   ]
  // },
  // {
  //   path: '/FinanceManage',
  //   component: Layout,
  //   redirect: '/FinanceManage/CarFinancePayment',
  //   icon: 'icon-caiwu',
  //   name: '财务管理',
  //   children: [
  //     { path: 'CarFinancePayment', component: _import('FinanceManage/CarFinancePayment'), meta: { keepAlive: true }, name: '车辆融资打款' },
  //     { path: 'Repayment', component: _import('FinanceManage/Repayment'), meta: { keepAlive: true }, name: '库融还款核实' },
  //     { path: 'CheckRepayment', component: _import('FinanceManage/CheckRepayment'), meta: { keepAlive: true }, name: '核对还款信息' },
  //     { path: 'ChargeDeatilList', component: _import('FinanceManage/ChargeDeatilList'), meta: { keepAlive: true }, name: '收费明细表' },
  //   ]
  // },
  // {
  //   path: '/SysSet',
  //   component: Layout,
  //   redirect: '/SysSet/AccountManage',
  //   icon: 'icon-set',
  //   name: '系统设置',
  //   children: [
  //     { path: 'Menu', component: _import('SysSet/Menu'), meta: { keepAlive: true }, name: '菜单管理' },
  //     { path: 'AccountManage', component: _import('SysSet/AccountManage'), meta: { keepAlive: true }, name: '账号管理' },
  //     { path: 'OfflineShopManage', component: _import('SysSet/OfflineShopManage'), meta: { keepAlive: true }, name: '线下店管理' },
  //     { path: 'DealerManage', component: _import('SysSet/DealerManage'), meta: { keepAlive: true }, name: '车商管理' },
  //     { path: 'InterestMode', component: _import('SysSet/InterestMode'), meta: { keepAlive: true }, name: '计息方式' },
  //     { path: 'InvestorManage', component: _import('SysSet/InvestorManage'), meta: { keepAlive: true }, name: '资方管理' },
  //     { path: 'BaseSet', component: _import('SysSet/BaseSet'), meta: { keepAlive: true }, name: '基础设置' },
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]

export default routes