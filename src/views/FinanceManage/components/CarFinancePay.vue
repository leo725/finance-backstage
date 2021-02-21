// 车辆融资打款 - 打款
<template>
  <el-dialog :visible.sync="visible" class="large-dialog" title="车辆融资打款" top="8vh" center width="1000px" :close-on-click-modal='false' :before-close="handleClose">
    <div class="dialog-main" v-loading='loading'>
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">用款申请信息</el-divider>
        <el-row :gutter="10" class="dialog-infos">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>用款申请金额：</label>
            <span>{{detail.spentApplyMoney | number}} 元</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>状态：</label>
            <el-tag size="small" :type="CLRZ_COMPUTATION_STATUS_TAGS[detail.computationStatus]">{{CLRZ_COMPUTATION_STATUS[detail.computationStatus]}}</el-tag>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <label>申请说明：</label>
            <span>{{detail.applyDesc}}</span>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow='hover' class="dialog-card" v-if="detail.interestAccrualVO">
        <el-divider content-position="left" class="max-divider">利息核算</el-divider>
        <el-row :gutter="10" class="dialog-infos">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>计息方式：</label>
            <span>{{detail.interestAccrualVO.name}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>日息(‱)：</label>
            <span>{{detail.interestAccrualVO.perDiemRate}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>逾期日息(‱)：</label>
            <span>{{detail.interestAccrualVO.overdueDailyInterest}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>用款期限：</label>
            <span>{{detail.interestAccrualVO.financingDeadline}}天</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <label>核算说明：</label>
            <span>{{detail.computationDesc}}</span>
          </el-col>
        </el-row>
      </el-card>

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
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <label>收款账号：</label>
            <span>{{detail.account}}</span>
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
        <el-divider content-position="left" class="max-divider">财务打款</el-divider>
        <el-form ref='formData' :model="formData" :rules="rules" size="medium" label-width="100px" label-position="right">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label='打款金额：' prop="remitMoney">
                <el-input v-model.number="formData.remitMoney" min="0" :readonly="readonly" @blur='remitMoneyBlur' placeholder="请输入打款金额" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label='打款时间：' prop="remitDate">
                <el-date-picker v-model="formData.remitDate" value-format='yyyy-MM-dd' :readonly="readonly" style="width:100%" :picker-options='{disabledDate}' type="date" placeholder="选择打款时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label='出款账户：' prop="outAccount">
                <!-- <el-input v-model.number="formData.outAccount" min="0" placeholder="请输入出款账户" :readonly="readonly" clearable></el-input> -->
                <el-select v-model="formData.outAccountItem" size="small" style="width:100%" @change="selectBank" :disabled="readonly" value-key="account" placeholder="请输入出款账户">
                  <el-option v-for="(item,index) in outAccountArr" :key="index" :label="item.accountName+'-'+item.openingBank" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label='打款说明：' prop="remitDesc">
                <el-input v-model.number="formData.remitDesc" type="textarea" placeholder="请输入打款说明" :readonly="readonly" :autosize="{ minRows: 2, maxRows: 4}" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label='凭证上传：' prop="remitDesc">
                <div class="img-box-upload">
                  <Viewer :images='[]'>
                    <el-card class="img-card" v-for="(item,index) in formData.saveFinancingCarAttachmentBOList" :key="index" v-if="item.attachmentType==2">
                      <img class="img" :src="item.filePath" :data-original='item.filePath' alt="打款凭证">
                      <i v-if="!readonly" class="el-icon-error" @click="deleteImg(index)"></i>
                    </el-card>
                    <UpLoad v-if="!readonly" @upload='uploadSuccess' :uploadParams='{attachmentType:2}' />
                  </Viewer>
                </div>
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
      <el-button type="primary" :loading='btnLoading' v-if="!readonly" @click="_financingCarRemit">确 认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { carFinanceDetail, financingCarRemit,KrCompanyAccountPage, financingCarRecordPage } from 'api'
import { CLRZ_COMPUTATION_STATUS, CLRZ_COMPUTATION_STATUS_TAGS } from 'utils/menu'
import Viewer from 'components/viewer'
import UpLoad from 'components/UpLoad'
export default {
  props: {
    visible: {
      type: Boolean,
      defautl: false,
    },
    currentId: {
      type: [Number, String]
    },
    infoData: {
      type:Object
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  components: { UpLoad, Viewer },
  data: () => ({
    CLRZ_COMPUTATION_STATUS,
    CLRZ_COMPUTATION_STATUS_TAGS,
    detail: {},
    btnLoading: false,
    loading: true,
    outAccountArr:[],
    handleList: [],
    formData: {
      outAccount: '',
      remitDate: '',
      remitDesc: '',
      remitMoney: '',
      saveFinancingCarAttachmentBOList: []
    },
    rules: {
      remitMoney: [{ required: true, message: '打款金额不能为空', trigger: 'blur' }],
      remitDate: [{ required: true, message: '打款时间不能为空', trigger: 'blur' }],
      outAccount: [{ required: true, message: '出款账户不能为空', trigger: 'blur' }]
    }
  }),
  computed: {
    disabledDate() {
      return (time) => {
        return time.getTime() >= new Date().getTime();
      }
    }
  },
  created () {
    this._KrCompanyAccountPage()
  },
  methods: {
    handleClose() {
      this.$refs['formData'].resetFields();
      this.$emit('handleClose')
      this.detail = {};
      this.formData = {
        outAccount: '',
        remitDate: '',
        remitDesc: '',
        remitMoney: '',
        saveFinancingCarAttachmentBOList: []
      }
    },
    // 出款账户
    async _KrCompanyAccountPage(){
      
      let res = await KrCompanyAccountPage({pageIndex:1,pageSize:1000,state:1})
      // console.log(res);
      if(res.code===0){
        this.outAccountArr = res.data.tlist
      }
    },
    // 选择出款账户
    selectBank(row) {
      this.formData.outAccountName = row.accountName
      this.formData.outOpeningBank = row.openingBank
      this.formData.outAccount = row.account
    },
    // 获取详情
    async _carFinanceDetail() {
      this.loading = true
      let res = await carFinanceDetail({ id: this.currentId });
      this.loading = false
      if (res.code == 0) {
        this.detail = res.data;
        this.formData.remitMoney = res.data.spentApplyMoney;
        this._financingCarRecordPage(this.currentId)
        // 查看
        if (this.readonly) {
          let { remitMoney, outAccount, remitDate, remitDesc, financingCarAttachmentVOList = [] } = res.data;
      
          this.formData = {
            remitMoney, outAccount,outAccountItem:{account:outAccount}, remitDate, remitDesc, saveFinancingCarAttachmentBOList:financingCarAttachmentVOList,
          }
        }
      }
    },
    // 文件上传成功
    uploadSuccess(res) {
      let { fileDisplayPath, fileName, fileServerId, uploadParams } = res;
      let file = {
        fileName,
        filePath: fileDisplayPath,
        serverId: fileServerId,
        ...uploadParams
      }
      this.formData.saveFinancingCarAttachmentBOList.push(file)
    },
    // 删除上传
    deleteImg(index) {
      this.formData.saveFinancingCarAttachmentBOList.splice(index, 1);
    },
    // 打款
    _financingCarRemit() {
      this.$confirm('此操作将完成打款, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            let {outAccountItem,...otherFormData} = this.formData
            let params = { id: this.currentId, version: this.detail.version, ...otherFormData };
            this.btnLoading = true
            let res = await financingCarRemit(params);
            this.btnLoading = false
            if (res.code == 0) {
              this.$message({ type: 'success', message: "操作成功！" })
              this.handleClose();
            }
          }
        })
      })
    },
    // 打款金额 小于等于申请金额
    remitMoneyBlur() {
      let spentApplyMoney = parseFloat(this.detail.spentApplyMoney);
      this.formData.remitMoney = this.formData.remitMoney > spentApplyMoney ? spentApplyMoney : this.formData.remitMoney;
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
        
      }
    }
  }
}
</script>

<style>
</style>