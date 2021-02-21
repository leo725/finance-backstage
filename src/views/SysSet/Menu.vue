<template>
  <div class="table-page">
    <!-- 按钮 -->
    <div class="handel">
      <el-button-group>
        <el-button type="primary" size="small" icon='el-icon-document-add' @click="addMenuNode('addpage','page')">新增菜单</el-button>
      </el-button-group>
    </div>
    <el-card class="box-card">
      <div class="flex menu-box">
        <div class="menu-l scroll-bar">
          <el-tree :data="TreeData" v-loading="loading" @node-contextmenu="handleClickRight" ref="tree" :props="defaultProps" default-expand-all highlight-current :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
          <ul v-show="rightMenu.show" class="contextmenu" :style="{left: rightMenu.left +'px',top: rightMenu.top +'px'}">
            <li @click="addMenuNode('add','all')" v-show="btnPower.addMenu">添加下级菜单</li>
            <li @click="addMenuNode('edit','all')" v-show="btnPower.editMenu">编辑</li>
            <li @click="addMenuNode('del','all')" v-show="btnPower.delMenu">删除</li>
          </ul>
        </div>
        <div class="menu-r scroll-bar">
          <el-card class="box-card" v-if="!isShowTip">
            <el-table ref="multipleTable" :data="tableData" v-loading="tableLoding" tooltip-effect="dark" style="width: 100%">
              <!-- <el-table-column type="selection" width="55"></el-table-column> -->
              <el-table-column prop="name" label="按钮名称" align="center"> </el-table-column>
              <el-table-column prop="perms" label="标识" align="center"> </el-table-column>
              <el-table-column prop="path" label="对应path" align="center"> </el-table-column>
              <el-table-column label="操 作" width="180" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button @click="handelMenuBtn('btn',scope.row)" v-show="btnPower.editMenu" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <div v-else style="text-align:center">选择菜单页面可查看相关页面设置的菜单按钮</div>
        </div>
      </div>
    </el-card>

    <!--添加菜单-->
    <el-dialog :title="sysMenuAddBO.id?'编辑菜单':'添加菜单'" :visible.sync="addVisible" center :close-on-click-modal="false" width="900" :before-close="handleClose">
      <el-form label-position="right" :model="sysMenuAddBO" label-width="90px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="菜单类型">
              <el-select v-model="sysMenuAddBO.type" clearable style="width:100%;" placeholder="选择菜单类型">
                <el-option label="菜单" value="0"></el-option>
                <el-option label="按钮" value="1" v-if="onlyAddPage !='page'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="菜单名称">
              <el-input v-model="sysMenuAddBO.name" clearable placeholder="请输入菜单名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="sysMenuAddBO.type==1">
            <el-form-item label="权限标识">
              <el-input v-model="sysMenuAddBO.perms" clearable placeholder="请输入权限标识"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="sysMenuAddBO.type==0">
            <el-form-item label="是否隐藏">
              <el-select v-model="sysMenuAddBO.hidden" clearable style="width:100%;" placeholder="选择显示状态">
                <el-option v-for="item in trueArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="sysMenuAddBO.type==0">
            <el-form-item label="是否下拉">
              <el-select v-model="sysMenuAddBO.noDropdown" clearable style="width:100%;" placeholder="选择下拉状态">
                <el-option v-for="item in trueArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="sysMenuAddBO.type==0">
            <el-form-item label="图标">
              <el-input v-model="sysMenuAddBO.icon" clearable placeholder="请输入图标"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="sysMenuAddBO.type==0">
            <el-form-item label="排序">
              <el-input v-model.number="sysMenuAddBO.orderNum" clearable placeholder="请输入排序"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-show="sysMenuAddBO.type==0">
            <el-form-item label="路由组件">
              <el-input v-model="sysMenuAddBO.component" clearable placeholder="请输入路由组件"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-show="sysMenuAddBO.type==0">
            <el-form-item label="重定向地址">
              <el-input v-model="sysMenuAddBO.redirect" clearable placeholder="请输入重定向地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="对应path">
              <el-input v-model="sysMenuAddBO.path" clearable placeholder="请输入对应path"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="_addMenu()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listPageTree, listBtnsByParentMenuId, sysMenuUpdate, sysMenuAdd, sysMenuDelete } from 'api'
import {filterParams} from 'utils/vx'
export default {
  data: () => ({
    tableData: [],
    TreeData: [], //团队树形
    loading: false,
    tableLoding: false,
    isShowTip: true,
    rightMenu: { show: false, left: 0, top: 0 },
    sysMenuAddBO: { //添加
      component: "",
      hidden: false,
      icon: "",
      name: "",
      noDropdown: false,
      orderNum: null,
      path: "",
      redirect: "",
      type: "",
      perms: "",
    },
    defaultProps: {
      children: 'children',
      label: 'name'
    },
    trueArr: [{ label: '是', value: true }, { label: '否', value: false }],
    addVisible: false,
    onlyAddPage: 'all',
    btnLoading: false,
    btnPower: {
      addMenu: true,
      editMenu: true,
      delMenu: true
    }
  }),
  created() {
    this._listPageTree();
  },
  methods: {
    // 获取所有页面菜单
    async _listPageTree() {
      this.loading = true;
      let res = await listPageTree({})
      if (res.code == 0) {
        this.TreeData = res.data
      }
      this.loading = false
    },
    // 关闭添加菜单弹框
    handleClose() {
      this.addVisible = false
      this.sysMenuAddBO = { component: "", hidden: false, icon: "", name: "", noDropdown: false, orderNum: null, path: "", redirect: "", type: "", perms: "", }
      this.currenItem = {}
    },
    addMenuNode(handelType, addtype) {
      this.onlyAddPage = addtype;
      if (handelType == 'add') {
        this.sysMenuAddBO.type = '0';
        this.addVisible = true
        this.sysMenuAddBO.parentId = this.currenItem.id
      } else if (handelType == 'addpage') {
        this.sysMenuAddBO.parentId = ''
        this.sysMenuAddBO.type = '0';
        this.addVisible = true
      } else if (handelType == 'edit') {
        this.sysMenuAddBO = JSON.parse(JSON.stringify(this.currenItem))
        this.addVisible = true
      } else if (handelType == 'del') {
        this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = { id: this.currenItem.id }
          let res = await sysMenuDelete(params)
          if (res.code == 0) {
            this._listPageTree()
            this.$message({ type: 'success', message: '删除成功!' });
          }
        }).catch(() => {
        });
      }
    },
    // 关闭右键菜单
    handleCloseMenu() {
      this.rightMenu.show = false
    },
    // 右键
    handleClickRight(e, data, node, vm) {
      // console.log(data)
      this.currenItem = data;
      // 显示菜单，并且根据点击的位置生成菜单显示的坐标
      this.rightMenu.show = true
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const len = 2
      let top
      if (len * 30 + e.clientY > h) {
        top = e.clientY - len * 30
      } else {
        top = e.clientY
      }
      this.rightMenu.left = e.clientX
      this.rightMenu.top = top
    },
    // 点页面菜单
    handleNodeClick(data) {
      // console.log(data);
      this.currenItem = data
      this.isShowTip = data.component == "Layout" ? true : false
      this._listBtnsByParentMenuId(data.id);
    },
    // 添加
    async _addMenu() {
      this.btnLoading = true;
      let {
        component, hidden, icon, name, noDropdown,
        parentId, path, perms, redirect, type, orderNum, id
      } = JSON.parse(JSON.stringify(this.sysMenuAddBO))
      let params = {}
      if (type == 0) {
        params = { component, icon, name, parentId, orderNum, path, redirect }
        params.type = type
        params.hidden = hidden
        params.noDropdown = noDropdown
      } else {
        params = { name, parentId, path, perms }
        params.type = type
      }
      let res;
      // 编辑
      if (id) {
        params.id = id;
        res = await sysMenuUpdate(filterParams(params))
      } else { // 新增
        res = await sysMenuAdd(filterParams(params))
      }
      this.btnLoading = false;
      if (res.code == 0) {
        if (type == 0) {
          this._listPageTree()
        } else {
          this._listBtnsByParentMenuId(parentId)
        }
        this.handleClose()
        this.$message({ type: 'success', message: '操作成功' });
      }
    },
    // 获取当前页面的按钮菜单
    async _listBtnsByParentMenuId(_id) {
      this.tableLoding = true;

      let params = { parentId: _id }
      let res = await listBtnsByParentMenuId(params)
      if (res.code == 0) {
        this.tableData = res.data
      }
      this.tableLoding = false
    },
    // 编辑按钮
    handelMenuBtn(addtype,item){
      this.onlyAddPage = addtype
      this.addVisible = true
      this.sysMenuAddBO = JSON.parse(JSON.stringify(item))
    },
  },
  watch: {
    'rightMenu.show'(val) {
      if (val) {
        document.body.addEventListener('click', this.handleCloseMenu)
      } else {
        document.body.removeEventListener('click', this.handleCloseMenu)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.menu-box {
  height: 75vh;
  .menu-l {
    min-width: 300px;
    height: 100%;
    overflow: auto;
    border: 1px solid #EBEEF5;
    padding: 10px;
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
  .menu-r {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
}
</style>