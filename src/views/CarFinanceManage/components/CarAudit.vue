<template>
  <el-dialog :visible.sync="visible" class="large-dialog" title="车辆审核" top="8vh" center width="1000px" :close-on-click-modal='false' :before-close="handleClose">

    <!-- 审核弹框 -->
    <shenheForm :visible="shenHeVisible" :fromInfo="curItem" @handleClose="closeEditFrom"></shenheForm>

    <div class="dialog-main">
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">车辆信息</el-divider>
        <el-row :gutter="10" class="dialog-infos" v-if="detail.carSellInfoSnapshootVO">
          <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <label>车型：</label>
            <span>{{detail.carSellInfoSnapshootVO.modelName}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>车价：</label>
            <span>{{detail.carSellInfoSnapshootVO.retailPrice}}万元</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>车架号：</label>
            <span>{{detail.carSellInfoSnapshootVO.vin}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>表显里程：</label>
            <span>{{detail.carSellInfoSnapshootVO.kilometres}}万公里</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>过户次数：</label>
            <span>{{detail.carSellInfoSnapshootVO.transferTimes}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>上牌时间：</label>
            <span>{{detail.carSellInfoSnapshootVO.plateYear+'年'+detail.carSellInfoSnapshootVO.plateMonth+'月'}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>车辆性质：</label>
            <el-tag size="small" :type="CAR_NATURE_TAGS[detail.carSellInfoSnapshootVO.carNature]">{{CAR_NATURE[detail.carSellInfoSnapshootVO.carNature] || '非营运'}}</el-tag>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>车辆颜色：</label>
            <span>{{detail.carSellInfoSnapshootVO.carColor}}</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="align-items: flex-start;">
            <label>车辆描述：</label>
            <span>{{detail.carSellInfoSnapshootVO.carDesc}}</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="align-items:flex-start;">
            <label>车辆图片：</label>
            <Viewer :images='detail.attachmentCarImageSnapshootVOList'>
              <el-row class="card-img-box" :gutter="10">
                <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" v-for="(item,index) in detail.attachmentCarImageSnapshootVOList" :key="item.filePath+index">
                  <el-card class="img-card">
                    <img class="img" v-lazy="item.filePath" :data-original='item.filePath' :alt="item.position">
                  </el-card>
                </el-col>
              </el-row>
            </Viewer>
          </el-col>
        </el-row>
      </el-card>

      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">车况核查</el-divider>
        <el-table :data='evalResList' style="width: 100%" size='medium' stripe fit highlight-current-row>
          <el-table-column label="车况" width="80" align="center">
            <template slot-scope="scope">
              <el-tag :type='CAR_CONDITION_TAGS[scope.row.condition]' size="small">{{CAR_CONDITION[scope.row.condition]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="dealer_low_buy_price" label="车商收购最低价" align="center">
            <template slot-scope="scope">{{scope.row.dealer_low_buy_price}}万</template>
          </el-table-column>
          <el-table-column prop="dealer_buy_price" label="车商收购价" align="center">
            <template slot-scope="scope">{{scope.row.dealer_buy_price}}万</template>
          </el-table-column>
          <el-table-column prop="dealer_low_sold_price" label="车商出售最低价" align="center">
            <template slot-scope="scope">{{scope.row.dealer_low_sold_price}}万</template>
          </el-table-column>
          <el-table-column prop="dealer_high_sold_price" label="车商出售最高价" align="center">
            <template slot-scope="scope">{{scope.row.dealer_high_sold_price}}万</template>
          </el-table-column>
          <el-table-column prop="dealer_price" label="车商零售价" align="center">
            <template slot-scope="scope">{{scope.row.dealer_price}}万</template>
          </el-table-column>
          <el-table-column prop="individual_low_sold_price" label="个人交易最低价" align="center">
            <template slot-scope="scope">{{scope.row.individual_low_sold_price}}万</template>
          </el-table-column>
          <el-table-column prop="individual_price" label="个人交易价" align="center">
            <template slot-scope="scope">{{scope.row.individual_price}}万</template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">融资申请信息</el-divider>
        <el-row :gutter="10" class="dialog-infos" v-if="detail.carSellInfoSnapshootVO">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>申请金额：</label>
            <span>{{detail.applyMoney | number}} 元</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>申请状态：</label>
            <el-tag size="small" :type="CLRZ_STATUS_TAGS[detail.applyStatus]">{{CLRZ_STATUS[detail.applyStatus]}}</el-tag>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <label>申请时间：</label>
            <span>{{detail.applyDate}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>车价：</label>
            <span>{{detail.retailPrice|number}}元</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>收车价：</label>
            <span>{{detail.getCarCost?detail.getCarCost+'元':'--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>是否过户：</label>
            <span>{{isTransferOwnershipObj[detail.isTransferOwnership] || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>贷款成数：</label>
            <span>{{detail.loanRadio || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>行驶证车主：</label>
            <span>{{detail.drivingLicenseOwner || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
            <label>过户日期：</label>
            <span>{{detail.transferDate?detail.transferDate.substring(0,10):'--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <label>申请说明：</label>
            <span>{{detail.applyDesc}}</span>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <label>照片附件：</label>
            <Viewer :images='[]'>
              <el-row :gutter="10" class="card-img-box">
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(item,index) in detail.financingCarAttachmentVOList" :key="index">
                  <el-card class="img-card" shadow="hover">
                    <img class="img" v-if="checkFileType(item.filePath)=='img'" :data-original='item.filePath' :alt="imgTypeText[item.attachmentType]" :key="item.id" :src="item.filePath"></img>
                    <div class="pdftype" @click="seeFileType(item.filePath)" v-else-if="checkFileType(item.filePath)=='pdf'"></div>
                    <div class="filetype" @click="seeFileType(item.filePath)" v-else></div>
                    <p class="img-txt">{{imgTypeText[item.attachmentType]}}</p>
                  </el-card>
                </el-col>
              </el-row>
            </Viewer>
          </el-col>
        </el-row>
      </el-card>

      <!-- 审核记录 -->
      <el-card shadow='hover' class="dialog-card">
        <el-divider content-position="left" class="max-divider">操作记录</el-divider>
        <el-table :data='handleList' style="width: 100%" size='medium' stripe fit highlight-current-row>
          <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
          <el-table-column prop="createDate" label="操作时间" align="center"></el-table-column>
          <el-table-column prop="auditResult" label="操作类型" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <!-- <el-button type="warning" @click="shenHeHandel('REJECT')">驳回</el-button> -->
      <template v-if="!readonly && detail.applyStatus === 'TO_AUDIT'">
        <el-button type="danger" @click="shenHeHandel('NO_PASS')">不通过</el-button>
        <el-button type="success" @click="shenHeHandel('PASS')">通 过</el-button>
      </template>
    </span>
  </el-dialog>
</template>

<script>
import shenheForm from './shenheForm'
import { carFinanceDetail, carFinanceEvalCar, financingCarRecordPage } from 'api'
import { CAR_CONDITION, CAR_CONDITION_TAGS, CLRZ_STATUS, CLRZ_STATUS_TAGS, CAR_NATURE, CAR_NATURE_TAGS } from 'utils/menu'
import { checkFileType, seeFileType } from 'utils/vx'
import Viewer from 'components/viewer'
export default {
  props: {
    visible: {
      type: Boolean,
      defautl: false,
    },
    fromInfo: {
      type: Object,
    },
    readonly: {
      type: Boolean,
      defautl: false,
    },
  },
  components: { Viewer, shenheForm },
  data: () => ({
    shenHeVisible: false,
    curItem: {},
    CAR_CONDITION,
    CAR_CONDITION_TAGS,
    CLRZ_STATUS,
    CLRZ_STATUS_TAGS,
    CAR_NATURE,
    CAR_NATURE_TAGS,
    evalResList: [], // 车款核查
    detail: {},
    handleList: [], // 操作记录
    isTransferOwnershipObj: { 1: '是', 2: '否' },
    imgTypeText: { 1: '评估报告', 2: '打款凭证', 3: '还款凭证', 4: '购车协议', 5: '转账记录', 6: '合车协议及签字照', 7: '登记证', 8: '行驶证', 9: '其他' }
  }),
  methods: {
    checkFileType, seeFileType,
    handleClose() {
      this.$emit('handleClose', true)
    },
    // 车辆审核
    closeEditFrom(noRefresh) {
      this.shenHeVisible = false
      if (!noRefresh) {
        this.$emit('handleClose')
      }
    },
    shenHeHandel(_state) {
      this.shenHeVisible = true
      let { applyMoney, id, version, modelName, retailPrice, getCarCost } = this.detail
      // let {modelName,retailPrice} = this.detail.carSellInfoSnapshootVO
      this.curItem = { applyStatus: _state, applyMoney, id, version, modelName, retailPrice, getCarCost }
    },
    // 获取详情
    async _carFinanceDetail() {
      let res = await carFinanceDetail({ id: this.fromInfo.id });
      if (res.code == 0) {
        this.detail = res.data;
        this._financingCarRecordPage(this.fromInfo.id)
        this._carFinanceEvalCar()
      }
    },
    // 获取评估数据
    async _carFinanceEvalCar() {
      let { modelId, cityId, kilometres, plateYear, plateMonth } = this.detail.carSellInfoSnapshootVO;
      let params = {
        carModelId: modelId,
        cityCode: cityId,
        mile: kilometres,
        regDate: `${plateYear}-${plateMonth > 9 ? plateMonth : '0' + plateMonth}-01`,
        source: 'kr'
      }
      let res = await carFinanceEvalCar(params);
      if (res.code == 0) {
        this.evalResList = res.data.usedCarEvalPriceVO ? res.data.usedCarEvalPriceVO.eval_prices : [];
      }
    },
    // 获取车辆融资记录
    async _financingCarRecordPage(financingCarId){
      let res = await financingCarRecordPage({financingCarId});
      if(res.code == 0){
        this.handleList = res.data.tlist
      }
    }
  },
  watch: {
    visible(newV) {
      if (newV) {
        this._carFinanceDetail();
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>