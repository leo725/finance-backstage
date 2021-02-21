<template>
  <div class="table-page">
    <div class="search clearfix">
      <el-form label-position="right" label-width="100px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="8">
            <el-form-item label="授信截止时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startDeadlineForCreditExtension" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span> - </span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endDeadlineForCreditExtension" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="线下店">
              <el-select v-model="searchData.krOfflineShopId" size="small" style="width:100%" clearable placeholder="请选择线下店">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,index) in krShopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车商名称">
              <el-input clearable v-model="searchData.carDealerName" size="small" placeholder="请输入车商名称" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="申请人">
              <el-input clearable v-model="searchData.name" size="small" :maxlength="11" placeholder="请输入申请人" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="授信状态">
              <el-select v-model="searchData.status" size="small" style="width:100%" clearable placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,key) in CLSX_CREDIT_STATUS" :key="item" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="8">
            <el-form-item label="授信时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startCreditDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span> - </span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endCreditDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label-width="30px" class="alignR">
              <el-button icon="el-icon-search" size="small" type="primary" @click="selectList()">查询</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm(true)">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-card class="box-card">
      <el-table :data="tableData" size='small' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column type="index" :index="indexMethod" label="序号" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carDealerName" label="车商名称" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="krOfflineShopName" label="线下店" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="申请人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="submitDate" label="提交时间" width="160" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.submitDate||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="授信状态" width="100" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="CLSX_CREDIT_STATUS_TAGS[scope.row.status]">{{CLSX_CREDIT_STATUS[scope.row.status]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="applyForACreditLine" width="120" label="申请授信金额" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.applyForACreditLine | number}} 元
          </template>
        </el-table-column>
        <el-table-column prop="creditAmount" label="授信金额" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.creditAmount | number}} {{scope.row.creditAmount ? '元': '--'}}
          </template>
        </el-table-column>
        <el-table-column prop="warningMoney" label="预警金额" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.warningMoney | number}} {{scope.row.warningMoney ? '元': '--'}}
          </template>
        </el-table-column>
        <el-table-column prop="creditDate" label="授信时间" width="140" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.creditDate||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="deadlineForCreditExtension " label="授信截止日期" width="140" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.deadlineForCreditExtension ||'--'}}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.firstReview&&scope.row.status=='to_first_review'" @click="getDetailInfo(scope.row)">授信初审</el-button>
            <el-button type="text" size="small" v-if="btnPower.extendCredit&&scope.row.status=='to_extend_credit'" @click="getDetailInfo(scope.row)">授信审核</el-button>
            <el-button type="text" size="small" v-if="btnPower.detail" @click="getDetailInfo(scope.row, true)">详 情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage=this.pageIndex :total=this.total :pageSize=this.pageSize v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <detailnfo :visible="addVisible" :readonly='readonly' :fromInfo="curItem" @handleClose="closeEditFrom"></detailnfo>

  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import Pagination from '@/components/Pagination'
import detailnfo from './components/detailnfo'
import { creditGrantingPage, OfflieShopPage } from '@/api/index'
import { ViewerOptions } from '@/utils/vx'
import { CLSX_CREDIT_STATUS, CLSX_CREDIT_STATUS_TAGS } from '@/utils/menu'
import $vx from '@/utils/vx'
export default {
  components: {
    Pagination, detailnfo
  },
  data() {
    return {
      addVisible: false,
      readonly: false,
      curItem: {},
      CLSX_CREDIT_STATUS, CLSX_CREDIT_STATUS_TAGS,
      fixedParams: { statusList: ['to_first_review', 'to_extend_credit', 'pass', 'no_pass', 'credit_expired', 'reject_pending_submission'] },
      krShopList: [],
      btnPower: {
        firstReview: true,
        extendCredit: true,
        detail: true
      }
    }
  },
  created() {
    this._OfflieShopPage()
  },
  mixins: [commonFn],
  methods: {
    // 弹框
    closeEditFrom(noRefresh) {
      this.addVisible = false
      noRefresh ? '' : this.currentList()
    },
    getDetailInfo(row, readonly) {
      this.readonly = !!readonly;
      this.addVisible = true
      this.curItem = row
    },
    // 获取库融线下店列表
    async _OfflieShopPage() {
      let params = {
        pageSize: 10000,
        pageIndex: 1
      }
      let res = await OfflieShopPage(params)
      if (res.code == 0) {
        this.krShopList = res.data.tlist
      }
    },
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await creditGrantingPage(params);
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


  }
}
</script>

<style lang="less" scoped>
</style>