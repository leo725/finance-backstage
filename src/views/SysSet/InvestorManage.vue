// 资方管理
<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="80px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="资方名称">
              <el-input placeholder="请输入资方名称" size="small" clearable v-model="searchData.name" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="联系人">
              <el-input placeholder="请输入联系人" size="small" clearable v-model="searchData.contactPerson" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="联系电话">
              <el-input placeholder="请输入联系电话" type="tel" size="small" clearable v-model="searchData.contactPersonPhone" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item class="search-btns">
              <el-button icon="el-icon-search" size="small" type="primary" @click="selectList()">查询</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm()">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="handel">
      <el-button-group>
        <el-button type="primary" size="small" icon='el-icon-document-add' @click="addInvestorVisible = true">新增资方</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='medium' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="资方名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="contactPersonPhone" label="联系电话" header-align="center" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.edit" @click="edit(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="accountInfo(scope.row)">账户信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 新增资方 -->
    <el-dialog :visible.sync="addInvestorVisible" width="700px" :title="addInvestorForm.id?'修改':'新增资方'" center :close-on-click-modal='false' :before-close="handleClose">
      <el-form ref='addInvestorForm' :model="addInvestorForm" :rules="addInvestorRules" size="medium" label-width="100px" label-position="right">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='资方名称：' prop="name">
              <el-input v-model="addInvestorForm.name" placeholder="请输入资方名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='联系人：' prop='contactPerson'>
              <el-input v-model="addInvestorForm.contactPerson" placeholder="请输入联系人" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='联系电话：' prop='contactPersonPhone'>
              <el-input v-model="addInvestorForm.contactPersonPhone" type="tel" placeholder="请输入联系电话" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading='btnLoading' @click="_fundingPartySave">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 账户信息 -->
    <el-dialog :visible.sync="accountInfoVisible" class="large-dialog" top="8vh" width="1000px" title="账户信息" center :close-on-click-modal='false' :before-close="handleClose2">
      <div class="dialog-main">
        <el-card shadow='hover' class="dialog-card">
          <el-divider content-position="left" class="max-divider">资方信息</el-divider>
          <el-row :gutter="10" class="dialog-infos">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>资方名称：</label>
              <span>{{currentItem.name}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>联系人：</label>
              <span>{{currentItem.contactPerson}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>联系电话：</label>
              <span>{{currentItem.contactPersonPhone}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>创建时间：</label>
              <span>{{currentItem.createDate}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>更新时间：</label>
              <span>{{currentItem.lastUpdateDate}}</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow='hover' class="dialog-card">
          <el-divider content-position="left" class="max-divider">资方账户<el-button @click="addAccountVisible = true" size="small" icon='el-icon-document-add' type="primary" round>新增账户</el-button>
          </el-divider>
          <el-table :data="accountTable" size='medium' style="width: 100%" stripe fit highlight-current-row>
            <el-table-column prop="account" label="银行卡号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="accountName" label="开户姓名" header-align="center" align="center"></el-table-column>
            <el-table-column prop="openingBank" label="开户行" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
            <el-table-column prop="lastUpdateDate" label="更新时间" header-align="center" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" header-align="center" align="center">
              <template slot-scope="scope">
                <el-tag size="small" :type="STATE_TAGS[scope.row.state]">{{STATE[scope.row.state]}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editAccount(scope.row)">修改</el-button>
                <el-button type="text" size="small" v-if="scope.row.state==0" @click="changeState(scope.row)">启用</el-button>
                <el-button type="text" size="small" v-else @click="changeState(scope.row)">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <!-- 新增账户 -->
      <el-dialog :title="addAccountForm.id?'修改账户':'新增账户'" :visible.sync="addAccountVisible" width="700px" append-to-body center :close-on-click-modal="false" :before-close="handleClose3">
        <el-form ref='addAccountForm' :model="addAccountForm" :rules="addAccountRules" size="medium" label-width="100px" label-position="right">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label='银行卡号：' prop="account">
                <el-input v-model="addAccountForm.account" type="number" placeholder="请输入银行卡号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label='开户姓名：' prop="accountName">
                <el-input v-model="addAccountForm.accountName" placeholder="请输入开户姓名" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label='开户行：' prop="openingBank">
                <el-input v-model="addAccountForm.openingBank" placeholder="请输入开户行" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose3">取 消</el-button>
          <el-button type="primary" :loading='btnLoading' @click="_fundingPartyAccountSave">确 定</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose2">关 闭</el-button>
        <!-- <el-button type="primary" :loading='btnLoading' @click="_fundingPartySave">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { fundingPartyList, fundingPartySave, fundingPartyAccountList, fundingPartyAccountSave } from '@/api/index'
import { checkPhone, checkBandCard } from 'utils/vx'
export default {
  data: () => ({
    addInvestorVisible: false,
    accountInfoVisible: false,
    addAccountVisible: false,
    btnLoading: false,
    addInvestorForm: {
      name: '',
      contactPerson: '',
      contactPersonPhone: '',
    },
    addInvestorRules: {
      name: [{ required: true, message: '资方名称不能为空', trigger: 'blur' }],
      contactPerson: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
      contactPersonPhone: [{ required: true, message: '联系人电话不能为空', trigger: 'blur' }],
    },
    addAccountForm: {},
    addAccountRules: {
      account: [{ required: true, message: '银行卡号不能为空', trigger: 'blur' }, { validator: checkBandCard, trigger: 'blur' }],
      accountName: [{ required: true, message: '开户姓名不能为空', trigger: 'blur' }],
      openingBank: [{ required: true, message: '开户银行不能为空', trigger: 'blur' }],
    },
    currentItem: {},
    accountTable: [],// 资方账户列表
    STATE: {
      0: '禁用',
      1: '启用',
    },
    STATE_TAGS: {
      0: 'info',
      1: 'success',
    },
    btnPower:{
      edit: true
    }
  }),
  created() {

  },
  mixins: [commonFn],
  methods: {
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await fundingPartyList(params);
        this.pageParamsSet(this.$route.path, params);
        this.tableLoding = false;
        if (res.code == 0) {
          this.tableData = res.data.tlist;
          this.total = res.data.total;
        }
      } catch (error) {

      }
    },
    /* 页面其他方法开始 */
    handleClose() {
      this.$refs['addInvestorForm'].resetFields();
      this.addInvestorForm = {}
      this.currentList()
      this.addInvestorVisible = false;
    },
    // 保存资方信息
    _fundingPartySave() {
      this.$refs['addInvestorForm'].validate(async valid => {
        if (valid) {
          this.btnLoading = true
          let res = await fundingPartySave(this.addInvestorForm);
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" })
            this.handleClose()
          }
        }
      })
    },
    // 编辑
    edit(item) {
      let { id, name, contactPerson, contactPersonPhone } = item;
      this.addInvestorForm = { id, name, contactPerson, contactPersonPhone }
      this.addInvestorVisible = true;
    },
    // 账户信息
    async accountInfo(item) {
      this.currentItem = item;
      this.accountInfoVisible = true;
      this._fundingPartyAccountList()
    },
    // 获取账户列表
    async _fundingPartyAccountList() {
      let params = {
        fundingPartyId: this.currentItem.id,
        pageIndex: 1,
        pageSize: 1000
      }
      let res = await fundingPartyAccountList(params);
      if (res.code == 0) {
        this.accountTable = res.data.tlist;
      }
    },
    // 
    handleClose2() {
      this.accountInfoVisible = false;
    },
    // 保存账户
    _fundingPartyAccountSave() {
      this.$refs['addAccountForm'].validate(async valid => {
        if (valid) {
          let params = Object.assign({ fundingPartyId: this.currentItem.id }, this.addAccountForm);
          if(!this.addAccountForm.state){
            params.state = 1
          }
          this.btnLoading = true
          let res = await fundingPartyAccountSave(params)
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" });
            handleClose3()
            this._fundingPartyAccountList();
          }
        }
      })
    },
    // 启用、禁用
    async changeState(item) {
      let { id, state, fundingPartyId, account, accountName, openingBank, } = item;
      let params = {
        id, fundingPartyId, account, accountName, openingBank,
        state: state == 1 ? 0 : 1
      }
      let res = await fundingPartyAccountSave(params)
      if (res.code == 0) {
        this.$message({ type: 'success', message: "操作成功！" });
        this._fundingPartyAccountList();
      }
    },
    // 修改
    editAccount(item){
      let { id, state, fundingPartyId, account, accountName, openingBank, } = item;
      this.addAccountForm = { id, state, fundingPartyId, account, accountName, openingBank }
      this.addAccountVisible = true
    },
    handleClose3(){
      this.addAccountForm = {}
      this.$refs['addAccountForm'].resetFields()
      this.addAccountVisible = false;
    }
  }
}
</script>