<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="90px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="线下店名称">
              <el-input placeholder="请输入线下店名称" size="small" clearable v-model="searchData.name" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="负责人">
              <el-input placeholder="请输入负责人" size="small" clearable v-model="searchData.principal" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="负责人电话">
              <el-input placeholder="请输入负责人电话" size="small" clearable v-model="searchData.principalPhone" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="合作状态">
              <el-select v-model="searchData.cooperationState" clearable placeholder="请选择合作状态">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(label,key) in COOPERATION_STATES" :label="label" :value="key" :key="key"></el-option>
              </el-select>
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
        <el-button type="primary" size="small" icon='el-icon-document-add' @click="addVisible = true">新增线下店</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='medium' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="线下店名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="principal" label="负责人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="principalPhone" label="负责人电话" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cooperationState" label="合作状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="cooperationStateTags[scope.row.cooperationState]">{{COOPERATION_STATES[scope.row.cooperationState]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lineOcredit" label="授信额度(元)" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.lineOcredit | number}}</template>
        </el-table-column>
        <el-table-column prop="warningLimit" label="警示额度(元)" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.warningLimit | number}}</template>
        </el-table-column>
        <el-table-column prop="usedCredit" label="已用金额(元)" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.usedCredit | number}}</template>
        </el-table-column>
        <el-table-column prop="availableCredit" label="可用额度(元)" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.availableCredit | number}}</template>
        </el-table-column>
        <el-table-column prop="desc" label="备注" header-align="center" align="center"></el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.edit" @click="currentItem = scope.row; addVisible = true">修改</el-button>
            <el-button type="text" size="small" @click="accountInfo(scope.row)">账户信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 账户信息 -->
    <el-dialog :visible.sync="accountInfoVisible" class="large-dialog" top="8vh" width="1000px" title="账户信息" center :close-on-click-modal='false' :before-close="handleClose2">
      <div class="dialog-main">
        <el-card shadow='hover' class="dialog-card">
          <el-divider content-position="left" class="max-divider">线下店信息</el-divider>
          <el-row :gutter="10" class="dialog-infos">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>线下店名称：</label>
              <span>{{currentItem.name}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>负责人：</label>
              <span>{{currentItem.principal}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>负责人电话：</label>
              <span>{{currentItem.principalPhone}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>合作状态：</label>
              <el-tag size="small" :type="cooperationStateTags[currentItem.cooperationState]">{{COOPERATION_STATES[currentItem.cooperationState]}}</el-tag>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>授信额度：</label>
              <span>{{currentItem.lineOcredit}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>警示额度：</label>
              <span>{{currentItem.warningLimit}}</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow='hover' class="dialog-card">
          <el-divider content-position="left" class="max-divider">银行账户<el-button @click="addAccountVisible = true" size="small" icon='el-icon-document-add' type="primary" round>新增账户</el-button>
          </el-divider>
          <el-table :data="accountTable" size='medium' style="width: 100%" stripe fit highlight-current-row>
            <el-table-column prop="account" label="银行卡号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="accountName" label="开户姓名" header-align="center" align="center"></el-table-column>
            <el-table-column prop="openingBank" label="开户行" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
            <el-table-column prop="lastUpdateDate" label="更新时间" header-align="center" align="center"></el-table-column>
            <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editAccount(scope.row)">修改</el-button>
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
          <el-button type="primary" :loading='btnLoading' @click="_OfflieShopBankSave">确 定</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose2">关 闭</el-button>
        <!-- <el-button type="primary" :loading='btnLoading' @click="_fundingPartySave">确 定</el-button> -->
      </span>
    </el-dialog>

    <!-- 添加线下店 -->
    <AddOfflineShop :visible='addVisible' :current='currentItem' @handleClose='handleClose' />
  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { OfflieShopPage, OfflieShopBankSave, OfflieShopBankPage } from '@/api/index'
import AddOfflineShop from './components/AddOfflineShop'
import { checkBandCard ,indexMethod} from 'utils/vx'
import { COOPERATION_STATES } from 'utils/menu'
export default {
  components: { AddOfflineShop },
  data: () => ({
    btnLoading: false,
    COOPERATION_STATES,
    cooperationStateTags: { 0: 'info', 1: 'success' },
    addVisible: false,
    accountInfoVisible: false,
    addAccountVisible: false,
    currentItem: {},
    addAccountForm:{},
    addAccountRules: {
      account: [{ required: true, message: '银行卡号不能为空', trigger: 'blur' }, { validator: checkBandCard, trigger: 'blur' }],
      accountName: [{ required: true, message: '开户姓名不能为空', trigger: 'blur' }],
      openingBank: [{ required: true, message: '开户银行不能为空', trigger: 'blur' }],
    },
    accountTable: [],
    btnPower:{
      edit: true
    }
  }),
  created() {

  },
  mixins: [commonFn],
  methods: {
    indexMethod:indexMethod,
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await OfflieShopPage(params);
        this.pageParamsSet(this.$route.path, params);
        this.tableLoding = false;
        if (res.code == 0) {
          this.tableData = res.data.tlist;
          this.total = res.data.total;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /* 页面其他方法开始 */
    handleClose() {
      this.addVisible = false;
      this.currentItem = {};
      this.currentList()
    },
    handleClose2(){
      this.currentItem = {};
      this.accountInfoVisible = false;
    },
    handleClose3(){
      this.addAccountForm = {}
      this.$refs['addAccountForm'].resetFields()
      this.addAccountVisible = false;
    },
    // 获取银行卡账户信息
    accountInfo(item){
      this.currentItem = item;
      this.accountInfoVisible = true;
      this._OfflieShopBankPage();
    },
    // 获取线下店银行卡列表
    async _OfflieShopBankPage(){
      let params = {
        krOfflineShopId: this.currentItem.id,
        pageIndex: 1,
        pageSize: 1000
      }
      let res = await OfflieShopBankPage(params);
      if(res.code == 0) {
        this.accountTable = res.data.tlist;
      }
    },
    // 修改
    editAccount(item){
      let { id, krOfflineShopId, account, accountName, openingBank, } = item;
      this.addAccountForm = { id, krOfflineShopId, account, accountName, openingBank }
      this.addAccountVisible = true
    },
    // 保存账户
    _OfflieShopBankSave() {
      this.$refs['addAccountForm'].validate(async valid => {
        if (valid) {
          let params = Object.assign({ krOfflineShopId: this.currentItem.id }, this.addAccountForm);
          this.btnLoading = true
          let res = await OfflieShopBankSave(params)
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" });
            this.handleClose3()
            this._OfflieShopBankPage();
          }
        }
      })
    },
  }
}
</script>