<template>
  <el-dialog :visible.sync="visible" :title="isEdit?'修改':'新增账号'" center width="700px" :close-on-click-modal='false' :before-close="handleClose">
    <el-form ref='formData' :model="formData" :rules="rules" size="medium" label-width="100px" label-position="right">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label='账号：' prop="userName">
            <el-input v-model="formData.userName" :readonly="isEdit" placeholder="请输入账号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="!isEdit">
          <el-form-item label='密码：' prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label='姓名：' prop="name">
            <el-input v-model="formData.name" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label='手机号：' prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" maxlength="11" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label='状态：' prop="phone">
            <el-select v-model="formData.state" placeholder="请选择状态">
              <el-option v-for="(value,key) in STATE" :key="key" :label="value" :value="parseInt(key)"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading='btnLoading' @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkPhone, checkPassword } from 'utils/vx'
import { saveKrUser } from 'api'
import { STATE } from 'utils/menu'
export default {
  props: {
    visible: {
      type: Boolean,
      defautl: false,
    },
    current: {
      type: [Object, null],
      default: null
    }
  },
  data: () => ({
    formData: {},
    STATE,
    rules: {
      userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }, { validator: checkPassword, trigger: 'blur' }],
      password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }, { validator: checkPassword, trigger: 'blur' }, { min: 6, message: '请填写至少6位密码', trigger: 'blur' }],
      phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }],
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
    },
    btnLoading: false,
    isEdit: false
  }),
  methods: {
    handleClose() {
      this.isEdit = false;
      this.formData = {}
      this.$refs['formData'].resetFields();
      this.$emit('handleClose')
    },
    submit(key, val) {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          this.btnLoading = true
          let res = await saveKrUser(this.formData);
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" })
            this.handleClose()
          }
        }
      })
    }
  },
  watch: {
    visible(newV) {
      if (newV && this.current) {
        this.isEdit = true;
        let { userName, phone, id, name, state } = this.current;
        this.formData = { userName, phone, id, name, state }
      }
    }
  }
}
</script>

<style>
</style>