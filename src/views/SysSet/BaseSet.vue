<template>
  <div class="table-page">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card :body-style="{padding: '20px !important'}" class="base-card" v-loading="setLoading">
          <div slot="header">时效/账单控制 （值为-1表示不限制）</div>
          <el-form ref='setForm' :model="setForm" style="width:100%" :rules="setRules" size="medium" label-width="110px" label-position="right">
            <el-form-item label='用款申请时效：' prop="invalidSetting">
              <el-input v-model="setForm.invalidSetting" size='small' type="number" placeholder="请输入天数">
                <template slot="prepend">车辆审核完</template>
                <template slot="append">天后未申请用款则车辆审核状态为失效</template>
              </el-input>
            </el-form-item>
            <el-form-item label='打款时效：' prop="exceedSetting">
              <el-input v-model="setForm.exceedSetting" size='small' type="number" placeholder="请输入天数">
                <template slot="prepend">用款申请</template>
                <template slot="append">天后未打款则申请状态为过期</template>
              </el-input>
            </el-form-item>
            <el-form-item label='展期时间：' prop="overStandSetting">
              <el-input v-model="setForm.overStandSetting" size='small' type="number" placeholder="请输入天数">
                <template slot="prepend">所有展期最高不得超过</template>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item label='还款提示：' prop="repaymentRemind">
              <el-input v-model="setForm.repaymentRemind" size='small' type="number" placeholder="请输入天数">
                <template slot="prepend">应收日</template>
                <template slot="append">天前提示还款</template>
              </el-input>
            </el-form-item>
            <footer>
              <el-button size="small" type="primary" v-if="btnPower.timeBtn" :loading='btnLoading' @click="_KrSystemSettingUpdate">确 认</el-button>
            </footer>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { KrSystemSettingDetail, KrSystemSettingUpdate } from 'api'
import { filterParams, getBtnPower } from 'utils/vx'
export default {
  data: () => ({
    btnLoading: false,
    setLoading: false,
    setForm: {},
    setRules: {},
    btnPower: {
      timeBtn: true
    }
  }),
  created() {
    this._KrSystemSettingDetail();
  },
  methods: {
    // 获取库融基础设置
    async _KrSystemSettingDetail() {
      this.setLoading = true
      let res = await KrSystemSettingDetail();
      if (res.code == 0) {
        this.setLoading = false
        this.setForm = res.data
      }
    },
    // 更新库融基础设置
    _KrSystemSettingUpdate() {
      this.$refs['setForm'].validate(async valid => {
        if (valid) {
          let res = await KrSystemSettingUpdate(filterParams(this.setForm));
          if (res.code == 0) {
            this._KrSystemSettingDetail()
            this.$message({ type: 'success', message: "操作成功！" })
          }
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.base-card {
  footer {
    text-align: center;
  }
}
</style>