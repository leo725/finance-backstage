<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="100px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="车商名称">
              <el-input placeholder="请输入车商名称" size="small" clearable v-model="searchData.name" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="所属线下店">
              <el-select clearable placeholder="所属线下店" style="width:100%" v-model='searchData.krOfflineShopId'>
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8" style="height:51px">
            <el-form-item label="初次归档时间">
              <div class='flex'>
                <el-date-picker v-model="searchData.startPigeonholeDate" type="date" placeholder="初次归档时间(起)" value-format='yyyy-MM-dd' style="flex:1"></el-date-picker>
                <span style="padding:0 10px;">-</span>
                <el-date-picker v-model="searchData.endPigeonholeDate" type="date" placeholder="初次归档时间(止)" value-format='yyyy-MM-dd' style="flex:1"></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8" style="height:51px">
            <el-form-item label="最后归档时间">
              <div class='flex'>
                <el-date-picker v-model="searchData.startLastPigeonholeDate" type="date" placeholder="最后归档时间(起)" value-format='yyyy-MM-dd' style="flex:1"></el-date-picker>
                <span style="padding:0 10px;">-</span>
                <el-date-picker v-model="searchData.endLastPigeonholeDate" type="date" placeholder="最后归档时间(止)" value-format='yyyy-MM-dd' style="flex:1"></el-date-picker>
              </div>
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
      <el-table :data="tableData" size='medium' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="车商名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="dealerType" label="车商类型" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="DEALER_TYPE_TAGS[scope.row.dealerType]">{{DEALER_TYPE[scope.row.dealerType]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="krOfflineShopName" label="所属线下店" width="160"  header-align="center" align="center"></el-table-column>
        <el-table-column prop="creditAmount" label="授信金额(元)"  width="120"  header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.creditAmount | number}}</template>
        </el-table-column>
        <el-table-column prop="warningMoney" label="预警金额(元)" width="120"  header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.warningMoney | number}}</template>
        </el-table-column>
        <el-table-column prop="usedCredit" label="已用金额(元)" width="120"  header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.usedCredit | number}}</template>
        </el-table-column>
        <el-table-column prop="availableCredit" label="可用金额(元)" width="120"  header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.availableCredit | number}}</template>
        </el-table-column>
        <el-table-column prop="pigeonholeDate" label="归档时间" header-align="center" width="150"  align="center"></el-table-column>
        <el-table-column prop="lastPigeonholeDate" label="最后归档时间"  width="150"  header-align="center" align="center"></el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="_krCarDealerGetById(scope.row.id)">详情</el-button>
            <el-button type="text" size="small" @click="_seeAccount(scope.row)">账户信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 账户信息 -->
    <el-dialog :visible.sync="accountInfoVisible" class="large-dialog" top="8vh" width="1000px" title="账户信息" center :close-on-click-modal='false' :before-close="handleClose2">
      <div class="dialog-main">
        <el-card shadow='hover' class="dialog-card">
          <el-divider content-position="left" class="max-divider">线下店信息</el-divider>
          <el-row :gutter="10" class="dialog-infos">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>线下店名称：</label>
              <span>{{currentItem.krOfflineShopName}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>车商名称：</label>
              <span>{{currentItem.name}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>授信金度：</label>
              <span>{{currentItem.creditAmount | number }} 元</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>警示金度：</label>
              <span>{{currentItem.warningMoney | number}} 元</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>可用金度：</label>
              <span>{{currentItem.availableCredit | number}} 元</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label>已用金度：</label>
              <span>{{currentItem.usedCredit | number}} 元</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow='hover' class="dialog-card">
          <el-divider content-position="left" class="max-divider">银行账户</el-divider>
          <el-table :data="accountTable" size='medium' style="width: 100%" empty-text="暂无银行账户" stripe fit highlight-current-row>
            <el-table-column prop="account" label="银行卡号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="accountName" label="开户姓名" header-align="center" align="center"></el-table-column>
            <el-table-column prop="openingBank" label="开户行" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
            <el-table-column prop="lastUpdateDate" label="更新时间" header-align="center" align="center"></el-table-column>
          </el-table>
        </el-card>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose2">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 车商详情 -->
    <DealerInfo :visible='visible' :current='dealerInfo' @handleClose='handleClose' />
  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { krCarDealerList, krCarDealerGetById, OfflieShopPage,KrCarDealerBankPage } from '@/api/index'
import DealerInfo from './components/DealerInfo'
import { DEALER_TYPE, DEALER_TYPE_TAGS } from 'utils/menu'
export default {
  data: () => ({
    DEALER_TYPE,
    DEALER_TYPE_TAGS,
    shopList: [],
    visible: false,
    dealerInfo: {},
    currentItem:{},
    accountInfoVisible:false,
    accountTable:[],
    
  }),
  created() {
    this._OfflieShopPage();
  },
  components: { DealerInfo },
  mixins: [commonFn],
  methods: {
    // 账户信息
    _seeAccount(row){
      this.currentItem = row
      this.accountInfoVisible = true
      this._KrCarDealerBankPage(row)
    },
    handleClose2(){
      this.accountInfoVisible = false
    },
    async _KrCarDealerBankPage(data){
      let res = await KrCarDealerBankPage({pageIndex:1,pageSize:1000,krCarDealerId:data.id})
      if(res.code===0){
        this.accountTable = res.data.tlist
      }
    },
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await krCarDealerList(params);
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
    // 获取线下店列表
    async _OfflieShopPage() {
      let params = {
        pageSize: 1000,
        pageIndex: 1,
        cooperationState: 1
      }
      let res = await OfflieShopPage(params);
      if (res.code == 0) {
        this.shopList = res.data.tlist
      }
    },
    // 获取车商详情
    async _krCarDealerGetById(id) {
      let res = await krCarDealerGetById({ id });
      if (res.code == 0) {
        this.dealerInfo = res.data;
        this.visible = true;
      }
    },
    // 关闭弹窗
    handleClose() {
      this.visible = false;
      this.dealerInfo = {}
    },
  }
}
</script>