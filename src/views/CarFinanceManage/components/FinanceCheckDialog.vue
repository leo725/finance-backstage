<template>
  <el-dialog :visible.sync="visible" class="large-dialog" :title="readonly ? '车辆融资详情': detail.computationStatus == 'to_computation'? '车辆融资核算': detail.computationStatus == 'to_manager_computation' ?'经理审核': '车辆融资详情' " top="8vh" center width="1000px" :close-on-click-modal='false' :before-close="handleClose">
    <div class="dialog-main" v-loading='loading'>
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">收款账户信息</el-divider>
        <el-row :gutter="10" class="dialog-infos">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>收款账户类型：</label>
            <span>线下店</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>收款开户名：</label>
            <span>{{detail.accountName}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>收款开户行：</label>
            <span>{{detail.openingBank}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>收款账号：</label>
            <span>{{detail.account}}</span>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">用款申请信息</el-divider>
        <el-row :gutter="10" class="dialog-infos">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>用款申请金额：</label>
            <span>{{detail.spentApplyMoney | number}} 元</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>核算状态：</label>
            <el-tag size="small" :type="CLRZ_COMPUTATION_STATUS_TAGS[detail.computationStatus]">{{CLRZ_COMPUTATION_STATUS[detail.computationStatus]}}</el-tag>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>申请用款期限：</label>
            <span>{{detail.spentApplyDeadline}}天</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <label>申请说明：</label>
            <span>{{detail.spentApplyDesc}}</span>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">融资基本信息</el-divider>
        <el-row class="dialog-infos">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <label>车型：</label>
            <span>{{detail.modelName}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>车价：</label>
            <span>{{detail.retailPrice | number}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>授信限额：</label>
            <span>{{detail.creditLimit | number}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>收车价：</label>
            <span>{{detail.getCarCost || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>是否过户：</label>
            <span>{{detail.isTransferOwnership==1?'是':'否'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>贷款成数：</label>
            <span>{{detail.loanRadio || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>行驶证车主：</label>
            <span>{{detail.drivingLicenseOwner || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>过户日期：</label>
            <span>{{detail.transferDate || '--'}}</span>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">利息核算</el-divider>
        <el-form ref='formData' :model="formData" :rules="rules" size="medium" label-width="110px" label-position="right">
          <el-row :gutter="10" class="dialog-infos">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="计息方式：" prop="interestAccrualSaveBO.id">
                <el-select v-model="formData.interestAccrualSaveBO.name" :disabled='readonly' style='width:100%' @change="interestChange" placeholder="请选择计息方式">
                  <el-option v-for="(item,index) in  intestorModeList" :label="item.name" :value="parseInt(item.id)" :key="item.name+index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="日息：" prop="interestAccrualSaveBO.perDiemRate">
                <el-input v-model="formData.interestAccrualSaveBO.perDiemRate" readonly placeholder="请输入日息">
                  <template slot="append">‱</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="用款期限：" prop="interestAccrualSaveBO.financingDeadline">
                <el-input v-model="formData.interestAccrualSaveBO.financingDeadline" :readonly='readonly' placeholder="请输入用款期限" @input="financingDeadlineChange">
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否可展期：" prop="isStandOver">
                <el-select v-model="formData.isStandOver" :disabled='readonly' style='width:100%' placeholder="是否可展期">
                  <el-option v-for="(lab,key) in  isStandOverObj" :label="lab" :value="parseInt(key)" :key="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="核算说明：" prop="computationDesc">
                <el-input v-model="formData.computationDesc" type="textarea" :readonly='readonly' :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入核算备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <!-- 审核记录 -->
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">操作记录</el-divider>
        <el-table :data='handleList' style="width: 100%" size='medium' stripe fit highlight-current-row>
          <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
          <el-table-column prop="createDate" label="操作时间" align="center"></el-table-column>
          <el-table-column prop="auditResult" label="操作类型" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <template v-if="!readonly">
        <el-button type="danger" :loading='btnLoading' @click="_financingCarUpdateStatus">不通过</el-button>
        <el-button type='primary' v-if="detail.overage && detail.computationStatus == 'to_computation'" :loading='btnLoading' @click="_computationVerify(false)">提交经理审核</el-button>
        <el-button type="success" v-else-if="detail.computationStatus == 'to_computation' || detail.computationStatus == 'to_manager_computation'" :loading='btnLoading' @click="_computationVerify(true)">通 过</el-button>
      </template>
    </span>
  </el-dialog>
</template>

<script>
import { carFinanceDetail, krInterestaccrualPage, financingCarComputation, carComputationVerify, financingCarUpdateStatus, financingCarSubmitManage, financingCarRecordPage } from 'api'
import { CLRZ_COMPUTATION_STATUS, CLRZ_COMPUTATION_STATUS_TAGS } from '@/utils/menu'
import { filterParams } from 'utils/vx'
export default {
  props: {
    visible: {
      type: Boolean,
      defautl: false,
    },
    readonly: {
      type: Boolean,
      defautl: false,
    },
    currentId: {
      type: [Number, String]
    }
  },
  data: () => ({
    CLRZ_COMPUTATION_STATUS,
    CLRZ_COMPUTATION_STATUS_TAGS,
    isStandOverObj: { '1': '是', '2': '否' },
    btnLoading: false,
    loading: false,
    formData: {
      interestAccrualSaveBO: {
        name: ''
      },
      id: '',
      computationDesc: '',
      // isStandOver: ''
    },
    rules: {
      // isStandOver: [{ required: true, message: '请选择是否可展期', trigger: 'blur' }],
      computationDesc: [{ required: true, message: '核算说明不能为空', trigger: 'blur' }],
      interestAccrualSaveBO: {
        perDiemRate: [{ required: true, message: '日息不能为空', trigger: 'blur' }],
        id: [{ required: true, message: '请选择计息方式', trigger: 'blur' }],
        financingDeadline: [{ required: true, message: '用款期限不能为空', trigger: 'blur' }]
      }
    },
    detail: {},
    intestorModeList: [],//计息方式
    maxFinancingDeadline: 0, // 最大允许的日期
    verify: [],
    handleList: [], // 操作记录
  }),
  created() {
    this._krInterestaccrualPage()
  },
  methods: {
    handleClose() {
      this.verify = []
      this.$refs['formData'].resetFields();
      this.formData = {
        interestAccrualSaveBO: {},
        id: '',
        computationDesc: '',
        // isStandOver: ''
      }
      this.$emit('handleClose')
    },
    // 获取详情
    async _carFinanceDetail() {
      this.loading = true
      let res = await carFinanceDetail({ id: this.currentId });
      this.loading = false;
      if (res.code == 0) {
        this.detail = res.data;
        this._financingCarRecordPage(this.currentId)
        // 如果是经理审核，讲提交数据回填
        if (res.data.computationStatus == 'to_manager_computation' || this.readonly) {
          let { 
            interestAccrualVO, id, computationDesc,
            // isStandOver 
          } = res.data;
          this.formData = {
            interestAccrualSaveBO: interestAccrualVO || {},
            // isStandOver,
            id, computationDesc, 
          }
        }
      }
    },
    // 核算校验
    async _carComputationVerify() {
      let res = await carComputationVerify({ id: this.currentId });
      if (res.code == 0) {
        this.verify = res.data;
      }
    },
    // 获取计息方式
    async _krInterestaccrualPage() {
      let params = {
        pageIndex: 1,
        pageSize: 1000,
        state: 1
      };
      let res = await krInterestaccrualPage(params)
      if (res.code == 0) {
        this.intestorModeList = res.data.tlist
      }
    },
    // 计息方式改变
    interestChange(id) {
      let item = this.intestorModeList.find(ele => (ele.id == id));
      let { financingDeadline } = item;
      this.formData.interestAccrualSaveBO = { ...item };
      this.maxFinancingDeadline = financingDeadline
    },
    // 用款期限输入 0-融资期限
    financingDeadlineChange(e) {
      let financingDeadline = e <= -1 ? 1 : e > this.maxFinancingDeadline ? this.maxFinancingDeadline : e
      this.formData.interestAccrualSaveBO.financingDeadline = financingDeadline;
    },
    /**
     * 核算校验
     * isManage：是否提交到经理审核，true/false
     */
    _computationVerify(isManage) {
      if (this.verify.length > 0) {
        const CE = this.$createElement;
        let _this = this;
        let message = [
          CE('p', { style: 'color: #F56C6C;font-size: 16px; margin-bottom: 6px;' }, `该车辆融资信息有${this.verify.length}条警示信息，是否继续核算？`)
        ];
        this.verify.forEach((str, idx) => {
          message.push(CE('p', `${idx + 1}、${str}`))
        });
        this.$msgbox({
          title: '提示',
          message: CE('div', { style: 'padding-bottom:10px' }, message),
          showCancelButton: true,
          closeOnClickModal: false,
          confirmButtonText: '继续核算',
          cancelButtonText: '取消',
          customClass: 'verify-dialog',
          beforeClose(action, instance, done) {
            if (action === 'confirm') {
              _this._financingCarComputation(isManage)
              done();
            } else {
              done()
            }
          }
        })
      } else {
        this._financingCarComputation(isManage)
      }
    },
    /** 
     * 提交核算 或者 提交给经理审核
     * isManage: 是否提交给经理审核
    */
    _financingCarComputation(isManage) {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          this.formData.id = this.currentId
          let params = filterParams({ ...this.formData, id: this.currentId, version: this.detail.version,isStandOver:1 })
          this.btnLoading = true;
          let res;
          if (isManage) {
            res = await financingCarComputation({ ...params, isManage })
          } else {
            res = await financingCarSubmitManage(params)
          };
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" })
            this.handleClose();
          }
        }
      })
    },
    // 不通过
    _financingCarUpdateStatus() {
      this.$confirm('此操作驳回该车辆融资核算, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let params = { id: this.currentId, computationStatus: 'no_pass', version: this.detail.version }
        let res = await financingCarUpdateStatus(params);
        if (res.code == 0) {
          this.$message({ type: 'success', message: "操作成功！" })
          this.handleClose();
        }
      })
    },
    // 获取车辆融资记录
    async _financingCarRecordPage(financingCarId){
      let res = await financingCarRecordPage({financingCarId});
      if(res.code == 0){
        this.handleList = res.data.tlist
      }
    }
  },
  watch: {
    visible(newV) {
      if (newV) {
        this._carFinanceDetail();
        this._carComputationVerify()
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<style>
.verify-dialog {
  max-width: 500px !important;
  width: 500px !important;
}
</style>