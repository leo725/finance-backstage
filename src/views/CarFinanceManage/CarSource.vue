<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="80px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <el-form-item label="线下店">
              <el-select v-model="searchData.krOfflineShopId" size="small" clearable filterable style="width:100%" placeholder="请选择线下店">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(item,index) in midShopList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <el-form-item label="状 态">
              <el-select v-model="searchData.state" size="small" style="width:100%" clearable placeholder="请选择车源状态">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(label,key) in CAR_STATE" :key="key" :label="label" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <el-form-item label="车型名称">
              <el-input clearable v-model="searchData.modelName" size="small" placeholder="请输入车型名称" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <el-form-item label="车架号">
              <el-input clearable v-model="searchData.vin" size="small" placeholder="请输入车架号" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <el-form-item label="车辆ID">
              <el-input clearable size="small" type="number"  @input="searchData.id = $event.slice(0,10) "v-model.number="searchData.id" placeholder="请输入车辆ID" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <el-form-item label="变速箱">
              <el-select v-model="searchData.gearboxType" size="small" clearable style="width:100%" placeholder="请选择变速箱类型">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(label,key) in GEAR_TYPE_SET" :key="label+key" :label="label" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <el-form-item label="行驶里程" class="flex-form-item">
              <el-input clearable size="small" type="number" v-model.number="searchData.kilometresMin" placeholder="最小里程" @keyup.enter.native="selectList()"></el-input>
              <span style="padding: 0 10px">-</span>
              <el-input clearable size="small" type="number" v-model.number="searchData.kilometresMax" placeholder="最大里程" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="8">
            <el-form-item label="发布时间" class="flex-form-item">
              <el-date-picker unlink-panels size="small" v-model="searchData.startTime" value-format="yyyy-MM-dd" placeholder="开始日期"></el-date-picker>
              <span style="padding: 0 10px">-</span>
              <el-date-picker unlink-panels size="small" v-model="searchData.endTime" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
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
      <Viewer :images='[]'>
        <el-table :data="tableData" size='small' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
          <el-table-column prop="id" label="车辆ID" width="80" header-align="center" align="center"></el-table-column>
          <el-table-column prop="" label="主图" width="80" header-align="center" align="center">
            <template slot-scope="scope">
              <img width="60" height="45" v-lazy="scope.row.img.filePath" :data-original='scope.row.img.filePath' :key="scope.row.id" alt="车辆主图">
            </template>
          </el-table-column>
          <el-table-column prop="modelName" label="车 型" width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="retailPrice" label="售 价" sortable header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.retailPrice?scope.row.retailPrice+'万元':'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状 态" header-align="center" align="center">
            <template slot-scope="scope">
              <el-tag effect="light" size="small" :type="CAR_STATE_TAGS[scope.row.state]">{{CAR_STATE[scope.row.state]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="线下店" header-align="center" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.midShopSimpleVO">{{scope.row.midShopSimpleVO.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="kilometres" label="行驶里程" sortable :formatter="(row)=>{return row.kilometres+'万公里'}" header-align="center" align="center"></el-table-column>
          <el-table-column prop="carEmissions" label="排 量" header-align="center" align="center"></el-table-column>
          <el-table-column prop="gearboxTypeDesc" label="变速箱" header-align="center" align="center"></el-table-column>
          <el-table-column fixed="right" label="操 作" width="80" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <router-link :to="{path:'/CarFinanceManage/CarDetail',query:{id: scope.row.id}}">详 情</router-link>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </Viewer>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { carSellList, OfflieShopPage } from '@/api/index'
import { CAR_STATE, CAR_STATE_TAGS, GEAR_TYPE_SET } from 'utils/menu'
import { ViewerOptions } from 'utils/vx'
import Viewer from 'components/viewer'
export default {
  data: () => ({
    CAR_STATE,
    CAR_STATE_TAGS,
    GEAR_TYPE_SET,
    ViewerOptions,
    midShopList: [], // 线下店列表
  }),
  created() {
    this._OfflieShopPage()
  },
  components: { Viewer },
  mixins: [commonFn],
  methods: {
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await carSellList(params);
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
    /**
     * 获取库融线下店列表
     */
    async _OfflieShopPage() {
      let params = {
        pageIndex: 1,
        pageSize: 1000
      }
      let res = await OfflieShopPage(params);
      if (res.code == 0) {
        this.midShopList = res.data.tlist
      }
    }
  }
}
</script>