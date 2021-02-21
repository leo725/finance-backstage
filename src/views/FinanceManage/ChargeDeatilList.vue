<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="100px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="申请人">
              <el-input placeholder="请输入申请人" size="small" clearable v-model="searchData.creditGrantingName" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车商名称">
              <el-input placeholder="请输入车商名称" size="small" clearable v-model="searchData.krDealerName" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="线下店">
              <el-select v-model="searchData.krOfflineShopName" size="small" style="width:100%" clearable placeholder="请选择线下店">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,index) in krShopList" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="打款时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startRemitDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span style="padding: 0px 10px;">-</span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endRemitDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="最后还款时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startLastRepaymentDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span style="padding: 0px 10px;">-</span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endLastRepaymentDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item class="search-btns">
              <!-- 业务按钮 用plain -->
              <el-button type="success" size="small" icon='el-icon-download' plain v-if="btnPower.export" @click="export2Excel">导 出</el-button>
              <!-- 搜索按钮 -->
              <el-button icon="el-icon-search" size="small" type="primary" @click="selectList()">查询</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm()">清空</el-button>
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
      <el-table :data="tableData" :height="tableHeight" size='small' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="creditGrantingName" label="申请人" header-align="center" align="center"></el-table-column>
        <el-table-column prop="applyDate" label="申请时间" width='140' header-align="center" align="center"></el-table-column>
        <el-table-column prop="creditDate" label="授信时间" width='140' header-align="center" align="center"></el-table-column>
        <el-table-column prop="creditAmount" label="授信金额" header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.creditAmount == 'number' ">{{scope.row.creditAmount | number}} 元</template>
        </el-table-column>
        <el-table-column prop="warningMoney" label="预警金额" header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.warningMoney == 'number' ">{{scope.row.warningMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="krDealerName" label="车商名称" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="krOfflineShopName" label="线下店" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="drivingLicenseOwner" label="行驶证车主" width='90' header-align="center" align="center"></el-table-column>
        <el-table-column prop="modelName" label="车型" width='200' header-align="center" align="center"></el-table-column>
        <el-table-column prop="retailPrice" label="车价" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.retailPrice == 'number' ">{{scope.row.retailPrice | number}} 元</template>
        </el-table-column>
        <el-table-column prop="getCarCost" label="收车价" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.getCarCost == 'number' ">{{scope.row.getCarCost | number}} 元</template>
        </el-table-column>
        <el-table-column prop="spentApplyMoney" label="用款申请金额" width='110' header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.spentApplyMoney == 'number' ">{{scope.row.spentApplyMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="remitMoney" label="打款金额" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.remitMoney == 'number' ">{{scope.row.remitMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="remitDate" label="打款时间" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.remitDate">{{scope.row.remitDate | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column prop="accountType" label="收款账户类型" width='120' header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.accountType">
            <el-tag size='small' :type='ACCOUNT_TYPES_TAGS[scope.row.accountType]'>{{ACCOUNT_TYPES[scope.row.accountType]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalMoney" label="还款金额" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.totalMoney == 'number'">{{scope.row.totalMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="lastRepaymentDate" label="还款时间" width='140' header-align="center" align="center"></el-table-column>
        <el-table-column prop="totalRepaymentMoney" label="实收金额" header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.totalRepaymentMoney == 'number' ">{{scope.row.totalRepaymentMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="money" label="本金" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.money == 'number' ">{{scope.row.money | number}} 元</template>
        </el-table-column>
        <el-table-column prop="interestMoney" label="利息" header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.interestMoney == 'number' ">{{scope.row.interestMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="totalDiscountsMoney" label="优惠金额" header-align="center" align="center">
          <template slot-scope="scope" v-if="typeof scope.row.totalDiscountsMoney == 'number' ">{{scope.row.totalDiscountsMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="interestAccrualMode" label="计息方式" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="perDiemRate" label="日息" header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.perDiemRate">{{scope.row.perDiemRate}}‱</template>
        </el-table-column>
        <el-table-column prop="overdueDailyInterest" label="逾期日息" header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.overdueDailyInterest">{{scope.row.overdueDailyInterest}}‱</template>
        </el-table-column>
        <el-table-column prop="financingDeadline" label="用款期限" header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.financingDeadline">{{scope.row.financingDeadline}}天</template>
        </el-table-column>
        <el-table-column prop="repaymentDueDate" label="还款到期日" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.repaymentDueDate">{{scope.row.repaymentDueDate | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column prop="standOverLastApplyDate" label="展期申请日" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.standOverLastApplyDate">{{scope.row.standOverLastApplyDate | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column prop="hopeStandOverDate" label="期望申请日" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.hopeStandOverDate">{{scope.row.hopeStandOverDate | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
        <el-table-column prop="standOverDueDate" label="展期到期日" width='100' header-align="center" align="center">
          <template slot-scope="scope" v-if="scope.row.standOverDueDate">{{scope.row.standOverDueDate | parseTime('{y}-{m}-{d}')}}</template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { carChargeDeatilPage, OfflieShopPage } from '@/api'
import { ACCOUNT_TYPES, ACCOUNT_TYPES_TAGS } from 'utils/menu'
import { exportJsonToExcel, formatJson } from 'utils/export2Excel'
import { parseTime } from 'utils/vx'
export default {
  data: () => ({
    ACCOUNT_TYPES,
    ACCOUNT_TYPES_TAGS,
    krShopList: [],
    btnPower: { export: true }
  }),
  created() {
    this._OfflieShopPage()
  },
  mixins: [commonFn],
  mounted() {
    this.getTableHeight()
  },
  methods: {
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await carChargeDeatilPage(params);
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
      let res = await carChargeDeatilPage(params);
      if (res.code == 0) {
        let { tlist, total } = res.data;
        this.$confirm(`是否立即导出${total}条数据？`, '提示').then(() => {
          const filterFun = (type) => { // type: 单位
            return v => v ? `${v}${type}` : v
          };
          // 日期处理
          const filterDate = v => v ? `${parseTime(v, '{y}-{m}-{d}')}` : v
          const tableKeyVal = [
            { label: '申请人', key: 'creditGrantingName' },
            { label: '申请时间', key: 'applyDate' },
            { label: '授信时间', key: 'creditDate' },
            { label: '授信金额', key: 'creditAmount', filter: filterFun('元') },
            { label: '预警金额', key: 'warningMoney', filter: filterFun('元') },
            { label: '车商名称', key: 'krDealerName' },
            { label: '线下店', key: 'krOfflineShopName' },
            { label: '行驶证车主', key: 'drivingLicenseOwner' },
            { label: '车型', key: 'modelName' },
            { label: '车价', key: 'retailPrice', filter: filterFun('元') },
            { label: '收车价', key: 'getCarCost', filter: filterFun('元') },
            { label: '用款申请金额', key: 'spentApplyMoney', filter: filterFun('元') },
            { label: '打款金额', key: 'remitMoney', filter: filterFun('元') },
            { label: '打款时间', key: 'remitDate', filter: filterDate },
            { label: '收款账户类型', key: 'accountType', filter: v => ACCOUNT_TYPES[v] },
            { label: '还款金额', key: 'totalMoney', filter: filterFun('元') },
            { label: '还款时间', key: 'lastRepaymentDate' },
            { label: '实收金额', key: 'totalRepaymentMoney', filter: filterFun('元') },
            { label: '本金', key: 'money', filter: filterFun('元') },
            { label: '利息', key: 'interestMoney', filter: filterFun('元') },
            { label: '优惠金额', key: 'totalDiscountsMoney', filter: filterFun('元') },
            { label: '计息方式', key: 'interestAccrualMode' },
            { label: '日息', key: 'perDiemRate', filter: filterFun('‱') },
            { label: '逾期日息', key: 'overdueDailyInterest', filter: filterFun('‱') },
            { label: '用款期限', key: 'financingDeadline', filter: filterFun('天') },
            { label: '还款到期日', key: 'repaymentDueDate', filter: filterDate },
            { label: '展期申请日', key: 'standOverLastApplyDate', filter: filterDate },
            { label: '期望申请日', key: 'hopeStandOverDate', filter: filterDate },
            { label: '展期到期日', key: 'standOverDueDate', filter: filterDate },
          ]
          let tHeader = tableKeyVal.map(v => v.label)
          let data = formatJson(tlist, tableKeyVal);
          let timer = parseTime(new Date(), '{y}-{m}-{d}')
          exportJsonToExcel(tHeader, data, `收费明细表${timer}`);  //导出文件名称
        }).catch(() => { })
      }
    }
  }
}
</script>