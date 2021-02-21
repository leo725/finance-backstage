import $vx from 'utils/vx';
const enums = $vx.localStorage.getItem('enum') || {};

// 性别
export const SEX = { 0:'--', 1: '男', 2: '女' } 
// 状态
export const STATE = { 0: '禁用', 1: '启用' }
export const STATE_TAGS = { 0: 'info', 1: 'success' }

// 合作状态
export const COOPERATION_STATES = enums['cooperation_state']; 
// 车商类型
export const DEALER_TYPE = enums['DealerTypeEnum'];
export const DEALER_TYPE_TAGS = {1:'', 2: 'success', 3: 'info', 4: 'warning', 5: 'danger'}
// 审核状态 - 车辆融资审核
export const CLRZ_STATUS = enums['apply_status'];
export const CLRZ_STATUS_TAGS = { 'INVALID': 'info', 'NO_PASS': 'danger', 'PASS': 'success', 'REJECT': 'warning', 'TO_AUDIT': '' };
// 审核状态 - 车辆融资核算状态 enums['computation_status']
export const CLRZ_COMPUTATION_STATUS =  { no_apply:'未申请' ,to_computation:'待核算' , to_manager_computation: "待经理审核", to_remit:'待财务打款' ,remit:'已打款' ,no_pass: '不通过' ,over_due:'超期' };
export const CLRZ_COMPUTATION_STATUS_TAGS = { 'no_apply': '', 'no_pass': 'danger', 'over_due': 'info', 'remit': 'success', 'to_computation': '', 'to_manager_computation': 'warning', 'to_remit':'warning' };
// 授信结果
export const CREDIT_GRANTING_LOG_RESULT = enums['credit_granting_log_result']; 
// 授信状态
export const CLSX_CREDIT_STATUS = { to_first_review: '待初审', reject_pending_submission: '驳回待提交', to_extend_credit: '待授信', pass: '通过', no_pass: '不通过', credit_expired: '授信过期' };
export const CLSX_CREDIT_STATUS_TAGS = { to_submit: 'info', reject_pending_submission: 'info', to_first_review: '', to_extend_credit: '', pass: 'success', no_pass: 'danger', credit_expired: 'warning' }
// 线下店类型
export const MID_SHOP_TYPE = enums['mid_shop_type_enum']; 
// 车况等级枚举
export const CAR_CONDITION = {'NORMAL':'一般','GOOD':'良好','EXCELLENT':'优秀'};
export const CAR_CONDITION_TAGS = {'NORMAL':'warning','GOOD':'','EXCELLENT':'success'};
// 计息方式
export const INTEREST_ACCRUAL_TYPE = {normal:'正常计息',lowest:'最低收费',highest:'最高收费'}
export const INTEREST_ACCRUAL_TYPE_TAGS = {lowest:'warning',highest:'danger',normal: ''}

// 还款情况
export const REPAYMENT_STATUS = enums['repayment_status_enum'];
export const REPAYMENT_STATUS_TAGS = {'closed_account':'success','overdue':'danger','stand_over':'','uncleared':'warning'}
// 还款进度 
export const REPAYMENT_SCHEDULE = enums['repayment_schedule'];
export const REPAYMENT_SCHEDULE_TAGS = { to_verify: '', no_pass: 'danger', success: 'success' }


// 展期状态
export const STAND_OVER_STATUS = { applying:'申请中', apply_pass: '申请通过', stand_over_not_pass:'展期未通过' ,stand_over:'展期中', stand_over_due:'展期超期', stand_over_close: '展期结束' };
export const STAND_OVER_STATUS_TAGS = {'apply_pass':'success','applying':'','not_stand_over':'info','stand_over':'','stand_over_due':'danger','stand_over_not_pass':'warning', 'stand_over_close': 'danger'}


// 车辆性质
export const CAR_NATURE = { 0:'营运', 1:'非营运', 2: '营转非'};
export const CAR_NATURE_TAGS = {0:'danger', 1: '', 2:'warning'}
// 车辆状态
export const CAR_STATE = {1:'未审核',2:'已通过',3:'正常下架',4:'警告下架'};
export const CAR_STATE_TAGS = {1:'',2:'success',3:'warning',4:'danger'};
// 车源变速箱类型
export const GEAR_TYPE_SET = { 'manual': '手动', 'auto': '自动' }
export const GEAR_TYPE_SET_TAGS = { 'manual': '', 'auto': 'success' }
// 车况
export const CAR_STATUS = {0:'精品',1:'良好',2:'一般'}
export const CAR_STATUS_TAGS = {0:'success',1:'',2:'warning'}
// 证件状态
export const CERTIFICATION_STATUS = { present:'齐全', lost:'缺失', handle:'补办' }
// 收款账户类型
export const ACCOUNT_TYPES = { 'dealer': '车商', 'mid_shop': '线下店' }
export const ACCOUNT_TYPES_TAGS = { 'dealer': '', 'mid_shop': 'success' }