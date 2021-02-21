<template>
  <el-dialog :visible.sync="visible" class="large-dialog" title="车商详情" top="8vh" center width="1000px" :close-on-click-modal='false' :before-close="handleClose">
    <div class="dialog-main">
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">基本信息</el-divider>
        <el-row :gutter="10" class="dialog-infos">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>车商名称：</label>
            <span>{{current.name}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>车商类型：</label>
            <el-tag size='small' :type='DEALER_TYPE_TAGS[current.dealerType]'>{{DEALER_TYPE[current.dealerType]}}</el-tag>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>所属线下店：</label>
            <span>{{current.krOfflineShopName}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>归档时间：</label>
            <span>{{current.pigeonholeDate}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>小胖车关联车商ID：</label>
            <span>{{current.xiaopangCarDealerId}}</span>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">授信信息</el-divider>
        <el-table :data="current.creditGrantingDetailVOS || []" size='medium' style="width: 100%" stripe fit highlight-current-row>
          <el-table-column label="序号" type="index" width="50" header-align="center" align="center"></el-table-column>
          <el-table-column prop="name" label="申请人" header-align="center" align="center"></el-table-column>
          <el-table-column prop="submitDate" label="申请时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="creditDate" label="授信时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="creditAmount" label="授信金额" header-align="center" align="center"></el-table-column>
          <el-table-column prop="warningMoney" label="预警金额" header-align="center" align="center"></el-table-column>
          <el-table-column prop="status" label="授信状态" header-align="center" align="center">
            <template slot-scope="scope">
              <el-tag size="small" :type="CLSX_CREDIT_STATUS_TAGS[scope.row.status]">{{CLSX_CREDIT_STATUS[scope.row.status]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="creditInfo = scope.row; creditInfoVisible = true">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">车辆融资情况</el-divider>
        <el-table :data="current.financingCarVOS || []" size='medium' style="width: 100%" stripe fit highlight-current-row>
          <el-table-column label="序号" type="index" width="50" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modelName" label="车型" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applyMoney" label="申请金额" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applyDate" label="申请时间" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applyStatus" label="申请状态" header-align="center" align="center">
            <template slot-scope="scope">
              <el-tag size="small" :type="CLRZ_STATUS_TAGS[scope.row.applyStatus]">{{CLRZ_STATUS[scope.row.applyStatus]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="creditLimit" label="授信限额" header-align="center" align="center"></el-table-column>
          <el-table-column prop="computationStatus" label="用款状态" header-align="center" align="center">
            <template slot-scope="scope" v-if="scope.row.computationStatus">
              <el-tag size="small" :type="CLRZ_COMPUTATION_STATUS_TAGS[scope.row.computationStatus]">{{CLRZ_COMPUTATION_STATUS[scope.row.computationStatus]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remitMoney" label="打款金额" header-align="center" align="center"></el-table-column>
          <el-table-column prop="remitDate" label="打款时间" header-align="center" align="center"></el-table-column>
        </el-table>
      </el-card>

      <!-- 授信详情 -->
      <detailnfo :visible='creditInfoVisible' :fromInfo='creditInfo' @handleClose='handleCloseInfo' />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <!-- <el-button type="primary">确定</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import { CLSX_CREDIT_STATUS, CLSX_CREDIT_STATUS_TAGS, CLRZ_STATUS, CLRZ_STATUS_TAGS, CLRZ_COMPUTATION_STATUS, CLRZ_COMPUTATION_STATUS_TAGS, DEALER_TYPE, DEALER_TYPE_TAGS } from 'utils/menu'
import detailnfo from '../../CreditManage/components/detailnfo'
export default {
  props: {
    visible: {
      type: Boolean,
      defautl: false,
    },
    current: {
      type: Object
    }
  },
  data: () => ({
    CLSX_CREDIT_STATUS,
    CLSX_CREDIT_STATUS_TAGS,
    CLRZ_STATUS,
    CLRZ_STATUS_TAGS,
    CLRZ_COMPUTATION_STATUS,
    CLRZ_COMPUTATION_STATUS_TAGS,
    DEALER_TYPE, 
    DEALER_TYPE_TAGS,
    creditInfoVisible: false,
    creditInfo: {}
  }),
  components: { detailnfo },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    handleCloseInfo(){
      this.creditInfo = {}
      this.creditInfoVisible = false
    }
  }
}
</script>

<style>
</style>