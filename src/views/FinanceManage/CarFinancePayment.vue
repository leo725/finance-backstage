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
              <el-input clearable v-model="searchData.modelName" size="small" :maxlength="11" placeholder="请输入车型" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车辆ID">
              <el-input clearable v-model="searchData.carSellId" size="small" :maxlength="11" placeholder="请输入车辆ID" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="状态">
              <el-select v-model="searchData.computationStatus" size="small" style="width:100%" clearable placeholder="请选择申请状态">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,key) in CLRZ_COMPUTATION_STATUS" v-show="key!=='no_apply'&& key!=='to_computation'&& key!=='to_manager_computation'" :key="item" :label="item" :value="key"></el-option>
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
            <el-form-item label="申请时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startApplyDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span style="padding: 0 10px">-</span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endApplyDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="打款时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startRemitDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span style="padding: 0 10px">-</span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endRemitDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item class="search-btns">
              <!-- 业务按钮 用plain -->
              <el-button type="success" size="small" icon='el-icon-download' plain v-if="btnPower.export" @click="export2Excel">导 出</el-button>
              <!-- 搜索按钮 -->
              <el-button icon="el-icon-search" size="small" type="primary" @click="selectList()">查询</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm(true)">清空</el-button>
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
        <el-table-column prop="modelName" label="车型" width="200" header-align="center" align="center"></el-table-column>
        <el-table-column prop="krOfflineShopName" label="线下店" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="krDealerName" label="车商" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="vin" label="车架号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carSellId" label="车辆ID" header-align="center" align="center"></el-table-column>
        <el-table-column prop="retailPrice" label="车价" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.retailPrice | number}} 元</template>
        </el-table-column>
        <el-table-column prop="spentApplyMoney" label="用款申请金额" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.spentApplyMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="creditLimit" label="授信限额" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.creditLimit | number}} 元</template>
        </el-table-column>
        <el-table-column prop="createDate" label="申请时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="computationStatus" label="状态" width="100" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="CLRZ_COMPUTATION_STATUS_TAGS[scope.row.computationStatus]">{{CLRZ_COMPUTATION_STATUS[scope.row.computationStatus]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remitMoney" label="打款金额" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.remitMoney | number}} {{scope.row.remitMoney ? '元' : ''}}</template>
        </el-table-column>
        <el-table-column prop="remitDate" label="打款时间" header-align="center" align="center"></el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.pay && scope.row.computationStatus == 'to_remit'" @click="isReadonly = false; currentId = scope.row.id;infoData = scope.row; payVisible = true">打 款</el-button>
            <el-button type="text" size="small" v-if="btnPower.detail" @click="isReadonly = true ;currentId = scope.row.id;infoData = scope.row; payVisible = true">详 情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 打款 -->
    <CarFinancePay :visible='payVisible' :readonly='isReadonly' :currentId='currentId' :infoData="infoData" @handleClose='handleClose' />
  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { financingCarPage, OfflieShopPage } from '@/api/index'
import { CLRZ_COMPUTATION_STATUS, CLRZ_COMPUTATION_STATUS_TAGS } from 'utils/menu'
import CarFinancePay from './components/CarFinancePay'
import { getSign } from 'api/sign'
import { exportJsonToExcel, formatJson } from 'utils/export2Excel'
import { parseTime } from '../../utils/vx'
export default {
  data: () => ({
    CLRZ_COMPUTATION_STATUS,
    CLRZ_COMPUTATION_STATUS_TAGS,
    fixedParams: { computationStatusList: ['to_remit', 'remit', 'no_pass', 'over_due'] },
    payVisible: false,
    currentId: '',
    infoData: {},
    isReadonly: true,
    krShopList: [],
    btnPower: {
      pay: true,
      detail: true,
      export: true
    }
  }),
  created() {
    this._OfflieShopPage()
  },
  components: { CarFinancePay },
  mixins: [commonFn],
  methods: {
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

      }
    },
    /* 页面其他方法开始 */
    handleClose() {
      this.payVisible = false;
      this.currentList();
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
    // 根据筛选条件导出数据
    exportList() {
      this.currentList()
      this.$confirm(`是否立即导出${this.total}条打款数据？`, '提示').then(async () => {
        let paramsStrArr = [];
        // 将参数为数组的改为 string 格式，并重新签名
        let newSearch = JSON.parse(JSON.stringify(this.searchData));
        newSearch.computationStatusList = newSearch.computationStatusList.join(',');
        if (newSearch.sign) delete newSearch.sign;
        newSearch.sign = getSign(newSearch)
        for (const [key, value] of Object.entries(this.filterParams(newSearch))) {
          paramsStrArr.push(`${key}=${value}`)
        }
        let openUrl = `${remitExport}?${paramsStrArr.join('&')}`;
        window.open(openUrl)
      }).catch()
    },
    // 前端导出数据
    async export2Excel() {
      let params = this.filterParams({ ...this.searchData, pageIndex: 1, pageSize: 10000, ...this.fixedParams })
      let res = await financingCarPage(params);
      if (res.code == 0) {
        let { tlist, total } = res.data;
        this.$confirm(`是否立即导出${total}条打款数据？`, '提示').then(() => {
          const tableKeyVal = [
            { label: '车型', key: 'modelName' },
            { label: '线下店', key: 'krOfflineShopName' },
            { label: '车商', key: 'krDealerName' },
            { label: '车架号', key: 'vin' },
            { label: '车辆ID', key: 'carSellId' },
            { label: '车价', key: 'retailPrice', filter: (val) => (val ? `${val}元` : '') },
            { label: '用款申请金额', key: 'spentApplyMoney', filter: (val) => (val ? `${val}元` : '') },
            { label: '授信限额', key: 'creditLimit', filter: (val) => (val ? `${val}元` : '') },
            { label: '申请时间', key: 'createDate' },
            { label: '打款金额', key: 'remitMoney', filter: (val) => (val ? `${val}元` : '') },
            { label: '打款时间', key: 'remitDate' },
            { label: '状态', key: 'computationStatus', filter: (val) => (val ? CLRZ_COMPUTATION_STATUS[val] : '') },
          ]
          let tHeader = tableKeyVal.map(v => v.label)
          let data = formatJson(tlist, tableKeyVal);
          let timer = parseTime(new Date(), '{y}-{m}-{d}')
          exportJsonToExcel(tHeader, data, `车辆融资打款${timer}`);  //导出文件名称
        }).catch(()=>{})
      }
    }
  }
}
</script>