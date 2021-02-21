<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="80px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="申请人">
              <el-input placeholder="请输入申请人姓名" size="small" clearable v-model="searchData.applyPersonName" @keyup.enter.native="selectList()"></el-input>
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
        <el-button type="primary" size="small" icon='el-icon-document-add'>钥匙申请</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='medium' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="keyNumber" label="钥匙/车位编号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carModelName" label="车型" header-align="center" align="center"></el-table-column>
        <el-table-column prop="applyPersonName" label="申请人姓名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="applyPersonPhone" label="申请人手机" header-align="center" align="center"></el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">操作按钮</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { repaymentVerifyPage } from '@/api/index'
export default {
  data:()=>({
    
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
        let res = await repaymentVerifyPage(params);
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

  }
}
</script>