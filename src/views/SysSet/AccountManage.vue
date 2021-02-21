// 用户管理
<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="80px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="姓名">
              <el-input placeholder="请输入姓名" size="small" clearable v-model="searchData.name" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="手机号">
              <el-input placeholder="请输入手机号" type="number" size="small" clearable v-model="searchData.phone" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="状态">
              <el-select v-model="searchData.state" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(label,key) in STATE" :key="key" :label="label" :value="key"></el-option>
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
        <el-button type="primary" size="small" icon='el-icon-document-add' @click="addVisible=true">新增账号</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='medium' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="userName" label="账号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="STATE_TAGS[scope.row.state]">{{STATE[scope.row.state]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操 作" width="240" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.able && scope.row.state == 0" @click="saveUserState(scope.row)">启用</el-button>
            <el-button type="text" size="small" v-else-if='btnPower.able' @click="saveUserState(scope.row)">禁用</el-button>
            <el-button type="text" size="small" v-if="btnPower.edit" @click="currentItem = scope.row; addVisible = true;">修改</el-button>
            <el-button type="text" size="small" v-if="btnPower.resetPwd" @click="currentItem = scope.row; changePwdVisible = true;">重置密码</el-button>
            <el-button type="text" size="small" v-if="btnPower.authority" @click="handelPowerAll(scope.row.id)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 修改密码 -->
    <el-dialog title="重置密码" :visible.sync="changePwdVisible" :close-on-click-modal="false" :append-to-body="true" center width="600px" :before-close="handleClosePwd">
      <el-form label-position="left" label-width="80px" :rules="passwordRules" ref="passwordForm" :model="passwordForm">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="passwordForm.password" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClosePwd">取 消</el-button>
        <el-button type="primary" :loading='btnLoading' @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 权限分配 -->
    <el-dialog title="分配权限" :visible.sync="powerVisible2" top="8vh" :close-on-click-modal="false" width="600px" center :before-close="handleClose4">
      <div class="treeBox">
        <div style="display: flex;align-items: center;">
          <div>
            <el-checkbox v-model="isCheckedAll" @change="checkedAllBtn" /> 全选/反选
          </div>
          <div style="margin-left:20px;">
            <el-button type="text" @click="expand()">{{isExpand?'折叠':'展开'}}</el-button>
          </div>
        </div>
        <el-tree :data="TreeDataAll" v-loading="loading" show-checkbox node-key="id" @check="handleCheckAll" :default-checked-keys="checkedKeysAll" ref="treeAll" :props="defaultProps" :default-expand-all='isExpand' highlight-current :expand-on-click-node="false">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose4">取 消</el-button>
        <el-button type="primary" @click="all_updateUrlAuthentication()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增账号 -->
    <AddAccount :visible='addVisible' :current='currentItem' @handleClose='handleClose' />
  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { getKrUserList, saveKrUser, updateUrlAuthentication, listByRoleId, sysMenuListTree, splitPageBtnByRoleId } from '@/api/index'
import { checkPassword } from 'utils/vx'
import { STATE, STATE_TAGS } from 'utils/menu'
import AddAccount from './components/AddAccount'
export default {
  components: { AddAccount },
  data: () => ({
    addVisible: false,
    changePwdVisible: false,
    btnLoading: false,
    STATE,
    STATE_TAGS,
    currentItem: null,
    passwordForm: {
      password: ''
    },
    passwordRules: {
      password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }, { validator: checkPassword, trigger: 'blur' }, { min: 6, message: '请填写至少6位密码', trigger: 'blur' }],
    },
    powerVisible2: false,
    loading: false,
    isExpand: false,
    isCheckedAll: false,
    userId:'',
    defaultProps: {
      children: 'children',
      label: 'name'
    },
    newArrAll: [],
    btnMenuIds: [],
    TreeDataAll: [], //页面按钮树形
    checkedKeysAll: [],
    btnPower: {
      able: true,
      edit: true,
      resetPwd: true,
      authority: true,
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
        let res = await getKrUserList(params);
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
      this.addVisible = false;
      this.currentItem = null
      this.currentList()
    },
    // 修改状态
    async saveUserState(item) {
      let { id, state } = item;
      let params = {
        id,
        state: state == 0 ? 1 : 0
      }
      let res = await saveKrUser(params);
      if (res.code == 0) {
        this.$message({ type: 'success', message: "操作成功！" })
        this.currentList();
      }
    },
    // 重置密码
    changePassword() {
      this.$refs['passwordForm'].validate(async valid => {
        if (valid) {
          let params = Object.assign({ id: this.currentItem.id }, this.passwordForm)
          this.btnLoading = true
          let res = await saveKrUser(params)
          this.btnLoading = false
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" })
            this.currentList();
            this.handleClosePwd()
          }
        }
      })
    },
    handleClosePwd() {
      this.$refs['passwordForm'].resetFields()
      this.changePwdVisible = false;
      this.currentItem = null;
    },

    /* 分配权限开始 */

    // 分配权限
    handelPowerAll(_id) {
      this.userId = _id
      this._listByRoleId(_id)
      this.powerVisible2 = true
    },
    handleClose4() {
      this.powerVisible2 = false;
      this.isCheckedAll = false;
      this.isExpand = false;
      for (var i = 0; i < this.$refs.treeAll.store._getAllNodes().length; i++) {
        this.$refs.treeAll.store._getAllNodes()[i].expanded = false;
      }
      this.newArrAll = [];
      this.$refs.treeAll.setCheckedKeys([]);
    },
    // 全选
    checkedAllBtn() {
      if (this.isCheckedAll) {
        //全选
        this.$refs.treeAll.setCheckedNodes(this.TreeDataAll);
      } else {
        //取消选中
        this.$refs.treeAll.setCheckedKeys([]);
      }
    },
    handleCheckAll () {
      // 获取半选中的节点和key
      // const halfs = this.$refs.treeAll.getHalfCheckedNodes()
      // const halfKeys = this.$refs.treeAll.getHalfCheckedKeys()
      // // 得到全选中的节点和key
      // const checkeds = this.$refs.treeAll.getCheckedNodes()
      // const checkedKeys = this.$refs.treeAll.getCheckedKeys()
      // //半选中和全选中的节点
      // this.checkedKeysAll = halfKeys.concat(checkedKeys) 

    },
    //修改角色的权限(按钮和页面)
    async all_updateUrlAuthentication() {
      const halfs = this.$refs.treeAll.getHalfCheckedNodes()
      const halfKeys = this.$refs.treeAll.getHalfCheckedKeys()
      // 得到全选中的节点和key
      const checkeds = this.$refs.treeAll.getCheckedNodes()
      const checkedKeys = this.$refs.treeAll.getCheckedKeys()
      //半选中和全选中的节点
      let checkedKeysAll = halfKeys.concat(checkedKeys)
      let params = { userId: this.userId, menuIds: checkedKeysAll }
      let res = await updateUrlAuthentication(params)
      if (res.code == 0) {
        this.handleClose4();
        this.$message({ type: 'success', message: '编辑成功' });
      }
    },
    //角色拥有权限的菜单ID
    async _listByRoleId(_id){
      this.loading = true
      let resData = await sysMenuListTree({})
      if(resData.code==0){
        this.TreeDataAll = resData.data
        let params = {userId:_id}
        let res = await splitPageBtnByRoleId(params)
        if(res.code==0){
          let data = res.data;
          if(data){
            var btnMenuIds = data.btnMenuIds || [];
            var pageMenuIds = data.pageMenuIds || [];
            var arrAll =[...btnMenuIds,...pageMenuIds]
            arrAll.forEach(id=>{
               this.checkedAll(id,this.TreeDataAll)
            })
            this.checkedKeysAll = this.newArrAll;
          }
        }
      }
      this.loading = false
    },
    checkedAll(id,data){
      data.forEach(item => {
        if(item.id == id){
          if( item.children == null){
            this.newArrAll.push(item.id )
          }
        }else{
          if( item.children && item.children !=null){
             this.checkedAll(id,item.children)
          }
        }
      })
    },
    expand(){
      this.isExpand = !this.isExpand
      for(var i=0;i<this.$refs.treeAll.store._getAllNodes().length;i++){
        this.$refs.treeAll.store._getAllNodes()[i].expanded=this.isExpand;
      }
    },
  },
}
</script>