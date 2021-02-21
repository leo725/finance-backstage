<template>
  <el-dialog :visible.sync="visible" :title="formData.id?'修改线下店':'新增线下店'" center width="700px" :close-on-click-modal='false' :before-close="handleClose">
    <el-form ref='formData' :model="formData" :rules="rules" size="medium" label-width="120px" label-position="right">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item prop="cooperationState" label='绑定线下店：'>
            <el-select v-model="formData.xiaopangOfflineShopId" @change='midShopChange' placeholder="请选择小胖车线下店" clearable>
              <el-option v-for="(item,key) in midShopList" :label="item.name" :key="key" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item prop="principal" label='负责人：'>
            <el-input v-model="formData.principal" placeholder="请输入负责人" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item prop="principalPhone" label='负责人电话：'>
            <el-input v-model="formData.principalPhone" type="tel" placeholder="请输入负责人手机号" maxlength="11" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item prop="cooperationState" label='合作状态：'>
            <el-select v-model="formData.cooperationState" placeholder="请选择合作状态" clearable>
              <el-option v-for="(value,key) in COOPERATION_STATES" :label="value" :key="key" :value="parseInt(key)"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item prop="lineOcredit" label='授信额度：'>
            <el-input v-model="formData.lineOcredit" type="number" placeholder="请输入授信额度" clearable>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item prop="warningLimit" label='警示额度：'>
            <el-input v-model="formData.warningLimit" type="number" placeholder="请输入警示额度" clearable>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item prop="desc" label='备注：'>
            <el-input v-model="formData.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item prop="desc" label='银行账户：'>
            <el-card>
              <el-table :data="formData.bankBOList" style="width: 100%" fit>
                <el-table-column prop="bankName" label="开户银行" width="240" header-align="center" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bankName" clearable placeholder="请输入开户银行"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-form-item>
        </el-col> -->

        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label='开户行：'>
            <el-input v-model="formData." placeholder="请输入开户行" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label='开户名：'>
            <el-input v-model="formData." placeholder="请输入开户名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label='银行卡号：'>
            <el-input v-model="formData." placeholder="请输入银行卡号" maxlength="19" clearable></el-input>
          </el-form-item>
        </el-col> -->

      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading='btnLoading' @click="_OfflieShopSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { midshopPage, OfflieShopSave } from 'api'
import { checkPhone } from 'utils/vx'
import { COOPERATION_STATES } from 'utils/menu'
export default {
  props: {
    visible: {
      type: Boolean,
      defautl: false,
    },
    current: {
      type: [Object, null]
    }
  },
  data: () => ({
    btnLoading: false,
    midShopList: [], // 线下店列表
    COOPERATION_STATES,
    formData: {
      xiaopangOfflineShopId: '',
      name: '',
      cooperationState: '',
      principal: '',
      principalPhone: '',
      lineOcredit: '',
      warningLimit: '',
      desc: '',
      // bankBOList: [],
    },
    rules: {
      xiaopangOfflineShopId: [{ required: true, message: '请绑定线下店', trigger: 'blur' }],
      principal: [{ required: true, message: '负责人姓名不能为空', trigger: 'blur' }],
      principalPhone: [{ required: true, message: '负责人手机号不能为空', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }],
      cooperationState: [{ required: true, message: '合作状态不能为空', trigger: 'blur' }],
      lineOcredit: [{ required: true, message: '授信额度不能为空', trigger: 'blur' }],
      warningLimit: [{ required: true, message: '警示额度不能为空', trigger: 'blur' }],
      desc: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
    }
  }),
  created() {
    this._midshopPage()
  },
  methods: {
    handleClose() {
      this.formData = {}
      this.$refs['formData'].resetFields();
      this.$emit('handleClose')
    },
    // 获取小胖车线下店列表
    async _midshopPage() {
      let res = await midshopPage({
        state: 1,
        pageIndex: 1,
        pageSize: 10000
      })
      if (res.code == 0) {
        this.midShopList = res.data.list
      }
    },
    // 获取 
    midShopChange(e) {
      let selectMidShop = this.midShopList.find(ele => (ele.id == e))
      this.formData.name = selectMidShop.name;
      this.formData.principal = selectMidShop.chargePersonName || ''
      this.formData.principalPhone = selectMidShop.chargePersonPhone || ''
    },
    // 保存修改线下店
    _OfflieShopSave() {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          this.btnLoading = true
          let res = await OfflieShopSave(this.formData);
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" })
            this.handleClose();
          }
        }
      })
    }
  },
  watch: {
    visible(newV) {
      if (newV && this.current) {
        this.formData = this.current
      }
    }
  }
}
</script>

<style>
</style>