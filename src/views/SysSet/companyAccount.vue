<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="90px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="开户名">
              <el-input placeholder="请输入开户名" size="small" clearable v-model="searchData.accountName" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="开户行">
              <el-input placeholder="请输入开户行" size="small" clearable v-model="searchData.openingBank" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="银行卡号">
              <el-input placeholder="请输入银行卡号" size="small" clearable v-model="searchData.account" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="状态">
              <el-select v-model="searchData.state" size="small" style="width:100%" clearable placeholder="请选择还款进度">
                <el-option label="全部" value=""></el-option>
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
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
        <el-button type="primary" size="small" icon='el-icon-document-add' @click="addVisible = true">新增账户</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='medium' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="accountName" label="开户名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="openingBank" label="开户行" header-align="center" align="center"></el-table-column>
        <el-table-column prop="account" label="账户" header-align="center" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state==1?'success':'info'">{{scope.row.state==1?'启用':'禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdateDate" label="修改时间" header-align="center" align="center"></el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.edit" @click="editAccount(scope.row)">修改</el-button>
            <el-button type="text" size="small" v-if="btnPower.disable && scope.row.state == 1" @click="isAbleHandle(scope.row,2)">禁用</el-button>
            <el-button type="text" size="small" v-if="btnPower.enable && scope.row.state == 2" @click="isAbleHandle(scope.row,1)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 账户信息 -->
    <el-dialog :title="addAccountForm.id?'修改账户':'新增账户'" :visible.sync="addVisible" width="700px" append-to-body center :close-on-click-modal="false" :before-close="handleClose">
      <el-form ref='addAccountForm' :model="addAccountForm" :rules="addAccountRules" size="medium" label-width="100px" label-position="right">
        <el-row :gutter="10">
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
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='银行卡号：' prop="account">
              <el-input v-model="addAccountForm.account" type="number" placeholder="请输入银行卡号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='状态：' prop="state">
              <el-select v-model="addAccountForm.state" size="small" style="width:100%" clearable placeholder="请选择还款进度">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading='btnLoading' @click="_KrCompanyAccountSave">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { KrCompanyAccountPage, KrCompanyAccountSave } from '@/api/index'
import { checkBandCard ,indexMethod} from 'utils/vx'
// import { COOPERATION_STATES } from 'utils/menu'
export default {
  components: {  },
  data: () => ({
    btnLoading: false,
    addVisible: false,
    searchData: {},
    addAccountForm: {},
    addAccountRules: {
      account: [{ required: true, message: '银行卡号不能为空', trigger: 'blur' }, { validator: checkBandCard, trigger: 'blur' }],
      accountName: [{ required: true, message: '开户姓名不能为空', trigger: 'blur' }],
      openingBank: [{ required: true, message: '开户银行不能为空', trigger: 'blur' }],
    },
    btnPower:{
      edit: true,
      disable: true,
      enable: true,
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
        let res = await KrCompanyAccountPage(params);
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
    handleClose(){
      this.addAccountForm = {};
      this.addVisible = false;
    },
    // // 修改
    editAccount(item){
      let { id, account, accountName, openingBank,state } = item;
      this.addAccountForm = { id, account, accountName, openingBank ,state}
      // console.log(this.addAccountForm);
      this.addVisible = true
    },
    // 保存账户
    _KrCompanyAccountSave() {
      this.$refs['addAccountForm'].validate(async valid => {
        if (valid) {
          let params = this.addAccountForm;
          this.btnLoading = true
          let res = await KrCompanyAccountSave(params)
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" });
            this.handleClose()
            this.currentList()
          }
        }
      })
    },
    // 禁用/启用
    isAbleHandle(row,_state){
      let txt = _state==1?'启用':'禁用'
      this.$confirm(`此操作将${txt}该账号, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let {account, accountName, openingBank } = row
        let res = await KrCompanyAccountSave({id:row.id,state:_state,account, accountName, openingBank})
        if(res.code==0){
          row.state = _state
          this.$message({ type: 'success',message: `${txt}成功!` });
        }
      }).catch(() => {
        
      });
      
    }
  }
}
</script>