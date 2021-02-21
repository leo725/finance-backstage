<template>
  <el-dialog title="" :visible.sync="visible"  append-to-body  width="1000px" top="8vh" center :close-on-click-modal="false" :before-close="beforClose">
    <el-form   label-width="112px" ref="saveForm" :rules="rules" :model="formData">
      <el-row :gutter="10" v-if="fromInfo.status=='to_extend_credit'">
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <el-form-item label="申请授信额度"  prop="applyForACreditLine">
            <el-input-number v-model="fromInfo.applyForACreditLine" size="small" style="width:90%" disabled controls-position="right" :step="1" :min="0" :max="99999999"></el-input-number> 元
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="fromInfo.status=='to_extend_credit'">
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <el-form-item label="授信金额"  prop="creditAmount">
            <el-input-number v-model="formData.creditAmount" size="small" style="width:90%" controls-position="right"  :step="1" :min="0" :max="99999999"></el-input-number> 元
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <el-form-item label="预警金额"  prop="warningMoney">
            <el-input-number v-model="formData.warningMoney" size="small" style="width:90%" controls-position="right"  :step="1" :min="0" :max="99999999"></el-input-number> 元
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="fromInfo.status=='to_extend_credit'">
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <el-form-item label-width="110px" label="授信截止日期"  prop="deadlineForCreditExtension">
            <el-date-picker unlink-panels  size="small" v-model="formData.deadlineForCreditExtension" style="width:90%" value-format="yyyy-MM-dd" placeholder="授信截止日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item :label="title" prop="auditDesc">
            <textarea  id="textarea"  v-model="formData.auditDesc"  :rows="5"></textarea>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="_sysConfigSave()" :loading="btnLoading">保 存</el-button>
    </span>

  </el-dialog>
</template>

<script>
import { creditGrantingUpdateStatus} from 'api/index'
import { filterParams,} from 'utils/vx'
import $vx from 'utils/vx'
export default {
  props: {
    visible: {
      type:Boolean,
      default: false
    },
    title: {
      type:String,
      default: ''
    },
    fromInfo: {
      type:Object,
    },

  },
  data() {
    return {
      btnLoading: false,
      rules: {
        creditAmount: [{ required: true, message: '授信金额不能为空', trigger: 'blur' }],
        warningMoney: [{ required: true, message: '预警金额不能为空', trigger: 'blur'}],
        deadlineForCreditExtension: [{ required: true, message: '授信截止日期不能为空', trigger: 'change'}],
        auditDesc: [{ required: true, message: '说明不能为空', trigger: 'blur' }]
      },
      formData: {},
    }
  },
  created() {
  },
  mounted () {
    
  },
  methods: {
    // 关闭
    beforClose() {
      this.$emit('handleClose',true) //参数 true，表示不刷新列表
      this.$refs['saveForm'].resetFields();
    },
    async _sysConfigSave(){
      this.$refs['saveForm'].validate(async valid => {
        if (valid) {
          this.btnLoading = true;
          let params = {...this.fromInfo,...filterParams(this.formData)}

          let res = await creditGrantingUpdateStatus(params)
          if(res.code===0){
            this.$emit('handleClose') //参数 true，表示不刷新列表
            this.$refs['saveForm'].resetFields();
            this.$message({ type: 'success', message: '已提交成功！' });
          }
          this.btnLoading = false
          
        }else{
          this.$message({ type: 'error', message: '请填写必填项!' , showClose: true});
        }
      })
      
    }
  },
  watch: {
    visible(newVal, oldVla) {
      if (newVal) {
      }
    }
  }
}
</script>

<style lang="less" scoped>

#textarea{
  width: 100%;
  border: 1px solid #DCDCDC;
  outline: none ;
  padding: 10px;
  border-radius: 4px;
  color: #606266;
}
.tableBox{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .table{
    width: 80px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius: 24px;
    font-size: 12px;
    color: #CBCBCB;
    border: 1px solid #CBCBCB;
    margin-right: 14px;
    margin-bottom: 14px;
    cursor: pointer;
    &.active{
      color: #FF7300;
      border: 1px solid #FF7300;
    }
    &:hover{
      color: #FF7300;
      border: 1px solid #FF7300;
    }
  }
}
.el-button--primary {
  width: 140px;
  height: 42px;
  font-size: 17px;
  color: #fff;
  background-color: #FC813B;
  border-color: #FC813B;
}
.el-button--primary:hover {
  background-color: #f76f22;
  border-color: #f76f22;
}
.el-button--primary:focus {
  background-color: #f76f22;
  border-color: #f76f22;
}
</style>