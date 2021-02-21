<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="90px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车商名称">
              <el-input placeholder="请输入车商名称" size="small" clearable v-model="searchData.krDealerName" @keyup.enter.native="selectList()"></el-input>
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
            <el-form-item label="车型">
              <el-input placeholder="请输入车型" size="small" clearable v-model="searchData.carModeName" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车架号">
              <el-input placeholder="请输入车架号" size="small" clearable v-model="searchData.vin" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车辆ID">
              <el-input placeholder="请输入车辆ID" size="small" clearable v-model.number="searchData.carSellId" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="展期状态">
              <el-select v-model="searchData.standOverStatus" style="width:100%" placeholder="请选择展期状态" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(lab,key) in STAND_OVER_STATUS" :key="key" :value="key" :label="lab"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="还款状态">
              <el-select v-model="searchData.repaymentStatus" style="width:100%" placeholder="请选择还款状态" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(lab,key) in REPAYMENT_STATUS" :key="key" :value="key" :label="lab"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="展期到期日" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startStandOverDueDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span> - </span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endStandOverDueDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="还款到期日" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startRepaymentDueDate" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span> - </span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endRepaymentDueDate" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
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
    <!-- <div class="handel">
      <el-button-group>
        <el-button type="primary" size="small" icon='el-icon-document-add'>钥匙申请</el-button>
      </el-button-group>
    </div> -->
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='small' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carModeName" label="车型" width="200" header-align="center" align="center"></el-table-column>
        <el-table-column prop="krOfflineShopName" label="线下店" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="krDealerName" label="车商" width='120' header-align="center" align="center"></el-table-column>
        <el-table-column prop="vin" label="车架号" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="carSellId" label="车辆ID" header-align="center" align="center"></el-table-column>
        <el-table-column prop="financingMoney" label="融资金额" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.financingMoney | number}} 元</template>
        </el-table-column>
        <el-table-column prop="repaymentDueDate" label="还款到期日" header-align="center" align="center"></el-table-column>
        <el-table-column prop="hopeStandOverDate" label="期望到期日" header-align="center" align="center"></el-table-column>
        <el-table-column prop="standOverDueDate" label="展期到期日" header-align="center" align="center"></el-table-column>
        <el-table-column prop="repaymentStatus" label="还款状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="REPAYMENT_STATUS_TAGS[scope.row.repaymentStatus]">{{REPAYMENT_STATUS[scope.row.repaymentStatus]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="standOverStatus" label="展期情况" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="STAND_OVER_STATUS_TAGS[scope.row.standOverStatus]">{{STAND_OVER_STATUS[scope.row.standOverStatus]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.audit && scope.row.standOverStatus == 'applying'" @click="extendAudit(scope.row)">审 核</el-button>
            <el-button type="text" size="small" v-if="btnPower.detail" @click="extendAudit(scope.row, true)">详 情</el-button>
            <!-- <el-button type="text" size="small" v-if="btnPower.audit && scope.row.standOverStatus != 'not_stand_over'" @click="_standOverRecordPage(scope.row.id)">展期记录</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 展期审核 -->
    <el-dialog :visible.sync="visible" class="large-dialog" top="8vh" title="展期审核" center width="1000px" :close-on-click-modal='false' :before-close="handleClose">
      <div class="dialog-main">
        <el-form ref='formData' :model="detail" :rules="rules" size="medium" label-width="110px" label-position="right">
          <el-row :gutter="10" class="dialog-infos">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <label>车型：</label>
              <span>{{detail.carModeName}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <label>车架号：</label>
              <span>{{detail.vin}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <label>融资金额：</label>
              <span>{{detail.financingMoney}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <label>还款到期日：</label>
              <span>{{detail.repaymentDueDate}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <label>期望日期：</label>
              <span>{{detail.hopeStandOverDate}}</span>
            </el-col>
            <el-col :span='24' style="align-items:flex-start;">
              <label>展期协议附件：</label>
              <Viewer :images='detail.repaymentAttachmentVOList'>
                <el-row class="card-img-box" :gutter="10">
                  <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" v-for="(item,index) in detail.repaymentAttachmentVOList" :key="item.filePath+index">
                    <el-card class="img-card">
                      <img class="img" v-lazy="item.filePath" :data-original='item.filePath' :alt="item.position">
                    </el-card>
                  </el-col>
                </el-row>
              </Viewer>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label='展期到期日：' prop="standOverDueDate">
                <el-date-picker v-model="detail.standOverDueDate" :readonly='extendReadonly' value-format='yyyy-MM-dd' style="width:100%" type="date" placeholder="选择展期到期日"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-card shadow='hover' class="dialog-card">
          <el-divider content-position="left" class="max-divider">展期申请记录</el-divider>
          <el-table :data='extendList' size='medium' style="width: 100%" stripe fit highlight-current-ro>
            <el-table-column label="序号" type="index" width="50" header-align="center" align="center"></el-table-column>
            <el-table-column prop="applyName" label="申请人" header-align="center" align="center"></el-table-column>
            <el-table-column prop="auditName" label="审核人" header-align="center" align="center"></el-table-column>
            <el-table-column prop="financingMoney" label="融资金额" header-align="center" align="center">
              <template slot-scope="scope">{{scope.row.financingMoney | number}} 元</template>
            </el-table-column>
            <el-table-column prop="repaymentDueDate" label="还款到期日" header-align="center" align="center">
              <template slot-scope="scope" v-if="scope.row.repaymentDueDate">
                {{scope.row.repaymentDueDate | parseTime('{y}-{m}-{d}')}}
              </template>
            </el-table-column>
            <el-table-column prop="hopeStandOverDate" label="期望展期日" header-align="center" align="center">
              <template slot-scope="scope" v-if="scope.row.hopeStandOverDate">
                {{scope.row.hopeStandOverDate | parseTime('{y}-{m}-{d}')}}
              </template>
            </el-table-column>
            <el-table-column prop="standOverDueDate" label="展期到期日" header-align="center" align="center">
              <template slot-scope="scope" v-if="scope.row.standOverDueDate">
                {{scope.row.standOverDueDate | parseTime('{y}-{m}-{d}')}}
              </template>
            </el-table-column>
            <el-table-column prop="standOverStatus" label="展期情况" header-align="center" align="center">
              <template slot-scope="scope">
                <el-tag size="small" :type="STAND_OVER_STATUS_TAGS[scope.row.standOverStatus]">{{STAND_OVER_STATUS[scope.row.standOverStatus]}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="auditDesc" label="审核备注" header-align="center" align="center"></el-table-column>
          </el-table>
        </el-card>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <template v-if="!extendReadonly">
          <el-button type="danger" :loading='btnLoading' @click="_rejuct">不通过</el-button>
          <el-button type="success" :loading='btnLoading' @click="_repaymentCheck('apply_pass')">通 过</el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import Viewer from 'components/viewer'
import { repaymentPage, repaymentCheck, standOverRecordPage, OfflieShopPage } from '@/api/index'
import { REPAYMENT_STATUS, REPAYMENT_STATUS_TAGS, STAND_OVER_STATUS, STAND_OVER_STATUS_TAGS } from 'utils/menu'
import { filterParams } from '../../utils/vx'
export default {
  data: () => ({
    REPAYMENT_STATUS,
    REPAYMENT_STATUS_TAGS,
    STAND_OVER_STATUS,
    STAND_OVER_STATUS_TAGS,
    fixedParams: { standOverStatusList: ['applying', 'apply_pass', 'stand_over_not_pass', 'stand_over', 'stand_over_due', 'stand_over_close'] },
    detail: {},
    visible: false,
    btnLoading: false,
    extendReadonly: false, // 展期是否只读
    extendList: [], // 展期申请记录
    krShopList: [],
    rules: {
      standOverDueDate: [{ required: true, message: '请选择展期到期日', trigger: 'blur' }],
    },
    btnPower: {
      audit: true,
      detail: true,
    }
  }),
  created() {
    this._OfflieShopPage()
  },
  mixins: [commonFn],
  components: { Viewer },
  methods: {
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
        let res = await repaymentPage(params);
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
      this.visible = false;
      this.extendList = [];
      this.detail = {}
    },
    // 点击显示展期审核
    extendAudit(item, isReadonly) {
      let detail = JSON.parse(JSON.stringify(item))
      detail.standOverDueDate = detail.hopeStandOverDate;
      this.detail = detail;
      this.visible = true;
      this.extendReadonly = !!isReadonly;
      this._standOverRecordPage(item.id)
    },
    // 展期审核
    async _repaymentCheck(standOverStatus, auditDesc) {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          let { standOverDueDate, id, version } = this.detail;
          let params = { id, version, standOverStatus, auditDesc }
          if (standOverStatus == 'apply_pass') params.standOverDueDate = standOverDueDate
          this.btnLoading = true
          let res = await repaymentCheck(filterParams(params));
          this.btnLoading = false
          if (res.code == 0) {
            this.currentList();
            this.$message({ type: 'success', message: "操作成功！" })
            this.handleClose();
          }
        }
      })
    },
    // 不通过
    _rejuct() {
      this.$prompt('请输入展期审核拒绝理由', '提示', {}).then(({ value }) => {
        this._repaymentCheck('stand_over_not_pass', value)
      }).catch(() => { })
    },
    // 展期记录
    async _standOverRecordPage(id) {
      let parms = {
        pageIndex: 1,
        pageSize: 100,
        repaymentId: id
      }
      let res = await standOverRecordPage(parms);
      if (res.code == 0) {
        this.extendList = res.data.tlist;
      }
    }
  }
}
</script>