<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="80px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车商名称">
              <el-input clearable v-model="searchData.krDealerName" size="small" placeholder="请输入车商名称" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车型">
              <el-input clearable v-model="searchData.carModeName" size="small" placeholder="请输入车型" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车辆ID">
              <el-input clearable v-model="searchData.carSellId" size="small" placeholder="请输入车辆ID" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车架号">
              <el-input clearable v-model="searchData.vin" size="small" placeholder="请输入车架号" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="还款进度">
              <el-select v-model="searchData.repaymentSchedule" size="small" style="width:100%" clearable placeholder="请选择还款进度">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,key) in REPAYMENT_SCHEDULE" :key="item" :label="item" :value="key"></el-option>
              </el-select>
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
          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="还款时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startRepaymentDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span style="padding: 0px 10px;">-</span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endRpaymentDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item class="search-btns">
              <!-- 业务按钮 用plain -->
              <el-button type="success" size="small" icon='el-icon-download' plain v-if="btnPower.export" @click="export2Excel">导 出</el-button>
              <!-- 搜索按钮 -->
              <el-button icon="el-icon-search" size="small" type="primary" @click="selectList()">查询</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('searchData')">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 按钮 -->
    <!-- <div class="handel">
      <el-button-group>
        <el-button type="success" size="small" icon='el-icon-download' v-if="btnPower.export" @click="export2Excel">导 出</el-button>
      </el-button-group>
    </div> -->

    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='small' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carModeName" label="车型" width="200" header-align="center" align="center"></el-table-column>
        <el-table-column prop="midShopName" label="线下店" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="krDealerName" label="车商名称" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="vin" label="车架号" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carSellId" label="车辆ID" header-align="center" align="center"></el-table-column>
        <el-table-column prop="repaymentDate" width="160" label="还款时间" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.repaymentDate||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="closeType" label="还款类型" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.closeType=='settle'?'结清':'利息'}}
          </template>
        </el-table-column>
        <el-table-column prop="repaymentMoney" width="120" label="还款金额" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.repaymentMoney | number}} {{scope.row.repaymentMoney?'元':'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="officialReceiptsMoney" width="120" label="实收金额" header-align="center" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.officialReceiptsMoney">
              {{scope.row.officialReceiptsMoney | number}} 元
            </span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="repaymentSchedule" width="100" label="还款进度" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" v-if="scope.row.repaymentSchedule" :type="REPAYMENT_SCHEDULE_TAGS[scope.row.repaymentSchedule]">{{REPAYMENT_SCHEDULE[scope.row.repaymentSchedule]}}</el-tag>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="financingMoney" label="还款凭证" header-align="center" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="seeCertificate(scope.row)">查看</el-link>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="rePayCheck(scope.row)" v-if="btnPower.audit&&scope.row.repaymentSchedule=='to_verify'" size="small">审 核</el-button>
            <el-button type="text" @click="rePayCheck(scope.row,true)" v-if="btnPower.detail" size="small">详 情</el-button>
            <el-button @click="seeHistory(scope.row)" type="text" size="small">还款记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 还款记录 -->
    <payHistory :visible="historyVB" :fromInfo="curItem" @handleClose="closeHistroyFrom"></payHistory>

    <!-- 审核 -->
    <rePayMentCheck :visible="rePayVB" :readonly='readonly' :fromInfo="curItem" @handleClose="closeRePayFrom"></rePayMentCheck>

    <!-- 还款凭证 -->
    <payCertificate :visible="certificateVB" :fromInfo="curItem" @handleClose="closeCertificateFrom"></payCertificate>

  </div>
</template>

<script>
import payCertificate from './components/payCertificate'
import payHistory from './components/payHistory'
import rePayMentCheck from './components/rePayMentCheck'
import { commonFn } from 'components/Mixins'
import { repaymentVerifyPage, OfflieShopPage } from 'api'
import { filterParams, pageParams, parseTime } from 'utils/vx'
import { REPAYMENT_SCHEDULE, REPAYMENT_SCHEDULE_TAGS } from 'utils/menu'
import { exportJsonToExcel, formatJson } from 'utils/export2Excel'
export default {
  data() {
    return {
      REPAYMENT_SCHEDULE, REPAYMENT_SCHEDULE_TAGS,
      // 审核
      rePayVB: false,
      readonly: false,
      //用款历史记录
      historyVB: false,
      curItem: {},
      //展期
      hopeStandOverDate: '',
      overDateVB: false,
      zqLoading: false,
      // 还款凭证
      certificateVB: false,
      krShopList: [], // 线下店列表
      // 按钮权限
      btnPower: {
        audit: true,
        detail: true,
        export: true
      }
    }
  },
  components: { rePayMentCheck, payHistory, payCertificate },
  created() {
    this._OfflieShopPage();
  },
  mixins: [commonFn],
  methods: {
    // 查看凭证
    closeCertificateFrom() {
      this.certificateVB = false
    },
    seeCertificate(row) {
      this.certificateVB = true
      this.curItem = { id: row.id }
    },
    // 审核
    closeRePayFrom(noRefresh) {
      this.rePayVB = false
      noRefresh ? '' : this.currentList()
    },
    rePayCheck(row, readonly) {
      this.rePayVB = true
      this.readonly = !!readonly
      let { id, version, repaymentMoney } = row
      this.curItem = { id, version, repaymentMoney }
    },
    // 关闭用款历史纪录
    closeHistroyFrom() {
      this.historyVB = false
    },
    seeHistory(row) {
      this.historyVB = true
      this.curItem = { repaymentId: row.repaymentId }
    },
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = filterParams(params);
        let res = await repaymentVerifyPage(params);
        pageParams.set(this.$route.path, params);
        this.tableLoding = false;
        if (res.code == 0) {
          this.tableData = res.data.tlist;
          this.total = res.data.total;
        }
      } catch (error) {

      }
    },
    /* 页面其他方法开始 */
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
    // 前端导出数据
    async export2Excel() {
      let params = this.filterParams({ ...this.searchData, pageIndex: 1, pageSize: 10000, ...this.fixedParams })
      let res = await repaymentVerifyPage(params);
      if (res.code == 0) {
        let { tlist, total } = res.data;
        this.$confirm(`是否立即导出${total}条还款数据？`, '提示').then(() => {
          const tableKeyVal = [
            { label: '车型', key: 'carModeName' },
            { label: '线下店', key: 'midShopName' },
            { label: '车商名称', key: 'krDealerName' },
            { label: '车架号', key: 'vin' },
            { label: '车辆ID', key: 'carSellId' },
            { label: '还款时间', key: 'repaymentDate' },
            { label: '还款类型', key: 'closeType', filter: val => val == 'settle' ? '结清' : '利息' },
            { label: '还款金额', key: 'repaymentMoney', filter: (val) => (val ? `${val}元` : '') },
            { label: '实收金额', key: 'officialReceiptsMoney', filter: (val) => (val ? `${val}元` : '') },
            { label: '还款进度', key: 'repaymentSchedule', filter: (val) => (val ? `${REPAYMENT_SCHEDULE[val]}` : '') },
          ]
          let tHeader = tableKeyVal.map(v => v.label)
          let data = formatJson(tlist, tableKeyVal);
          let timer = parseTime(new Date(), '{y}-{m}-{d}')
          exportJsonToExcel(tHeader, data, `还款核实${timer}`);  //导出文件名称
        }).catch(() => { })
      }
    }
  }
}
</script>