<template>
  <div class="table-page">
    <div class="search clearfix">
      <el-form label-position="right" label-width="80px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
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
              <el-input clearable v-model="searchData.krDealerName" size="small" placeholder="请输入车商名称" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车型">
              <el-input clearable v-model="searchData.modelName" size="small" :maxlength="11" placeholder="请输入车型" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车辆ID">
              <el-input clearable v-model="searchData.carSellId" size="small" :maxlength="11" placeholder="请输入车辆ID" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车架号">
              <el-input clearable v-model="searchData.vin" size="small" placeholder="请输入车架号" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="申请状态">
              <el-select v-model="searchData.applyStatus" size="small" style="width:100%" clearable placeholder="请选择申请状态">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,key) in CLRZ_STATUS" :key="item" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="申请时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small"  v-model="searchData.startApplyDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span> - </span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endApplyDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="审核时间">
              <el-date-picker unlink-panels style="width:47%" size="small" v-model="searchData.applyStartTime" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              -
              <el-date-picker unlink-panels style="width:47%" size="small" v-model="searchData.applyEndTime" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col> -->

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label-width="30px" class="alignR">
              <el-button icon="el-icon-search" size="small" type="primary" @click="selectList()">查询</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm()">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-card class="box-card">
      <el-table :data="tableData" size='small' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column type="index" :index="indexMethod" label="序号" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="modelName" label="车型" width="200" header-align="center" align="center"></el-table-column>
        <el-table-column prop="midShopName" label="线下店" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="krDealerName" label="车商名称" width='120' header-align="center" align="center"></el-table-column>
        <!-- <el-table-column prop="krOfflineShopName" label="店铺名称" width="140" header-align="center" align="center"></el-table-column> -->
        <el-table-column prop="vin" label="车架号" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carSellId" label="车辆ID" header-align="center" align="center"></el-table-column>
        <el-table-column prop="retailPrice" width="120" label="车价" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.retailPrice | number}} 元
          </template>
        </el-table-column>
        <el-table-column prop="applyMoney" width="120" label="申请金额" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.applyMoney | number}} 元
          </template>
        </el-table-column>
        <el-table-column prop="creditLimit" label="授信限额" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.creditLimit | number}} {{scope.row.creditLimit && '元'}}
          </template>
        </el-table-column>
        <el-table-column prop="applyDate" label="申请时间" width="160" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.applyDate||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="applyStatus" label="申请状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="CLRZ_STATUS_TAGS[scope.row.applyStatus]">{{CLRZ_STATUS[scope.row.applyStatus]}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="auditTime" label="审核时间" width="160" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.auditTime||'--'}}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.auditBtn && scope.row.applyStatus==='TO_AUDIT'" @click="shenHeBtn(scope.row)">审 核</el-button>
            <el-button type="text" size="small" v-if="btnPower.detail" @click="shenHeBtn(scope.row, true)">详 情</el-button>
            <el-button type="text" size="small" v-if="btnPower.invalidBtn && scope.row.applyStatus==='PASS' && scope.row.computationStatus == 'no_apply'" @click="invalid(scope.row)">设为失效</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage=this.pageIndex :total=this.total :pageSize=this.pageSize v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <CarAudit :visible="addVisible" :readonly='readonly' :fromInfo="curItem" @handleClose="closeEditFrom"></CarAudit>

  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import Pagination from '@/components/Pagination'
import CarAudit from './components/CarAudit'
import { financingCarPage, financingCarUpdateStatus ,OfflieShopPage} from '@/api/index'
import { CLRZ_STATUS, CLRZ_STATUS_TAGS } from '@/utils/menu'
import $vx from '@/utils/vx'
export default {
  components: {
    Pagination, CarAudit
  },
  data() {
    return {
      addVisible: false,
      readonly: false,
      curItem: {},
      CLRZ_STATUS,
      CLRZ_STATUS_TAGS,
      krShopList: [],
      btnPower: {
        auditBtn: true,
        invalidBtn: true,
        detail: true
      }
    }
  },
  created() {
    this._OfflieShopPage()
  },
  mixins: [commonFn],
  methods: {
    // 审核
    shenHeBtn(row, readonly) {
      this.readonly = !!readonly
      this.addVisible = true
      let { id, version } = row
      this.curItem = { id, version }
    },
    // 弹框
    closeEditFrom(noRefresh) {
      this.addVisible = false
      noRefresh ? '' : this.currentList()
    },
    // 获取库融线下店列表
    async _OfflieShopPage(){
      let params = {
        pageSize: 10000,
        pageIndex: 1
      }
      let res = await OfflieShopPage(params)
      if(res.code == 0){
        this.krShopList = res.data.tlist
      }
    },
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await financingCarPage(params);
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
    // 设为失效
    invalid(item) {
      this.$confirm('此操作将该车辆融资设为失效, 是否继续?', '提示').then(async () => {
        let params = {
          id: item.id,
          version:item.version,
          applyStatus: 'INVALID'
        };
        let res = await financingCarUpdateStatus(params);
        if(res.code ==0){
          this.$message({ type: 'success', message: "操作成功！" });
          this.currentList()
        }
      }).catch(() => { })
    }

  }
}
</script>

<style lang="less" scoped>
</style>