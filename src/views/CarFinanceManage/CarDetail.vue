<template>
  <div class="page-detail">
    <el-card class="page-box" shadow='hover'>
      <el-divider class="page-divider" content-position="left">基本信息</el-divider>
      <el-row :gutter="10" class="page-row">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>团队名称：</label>
          <span>{{Info.teamMemberVO ? Info.teamMemberVO.teamName : ''}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>状 态：</label>
          <el-tag effect="dark" size="small" :type="CAR_STATE_TAGS[Info.state]">{{CAR_STATE[Info.state]}}</el-tag>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>发布时间：</label>
          <span>{{Info.createDate }}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-if="Info.state ===3">
          <label>下架时间：</label>
          <span>{{Info.createDate }}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-if="carDealerVo.supplierCode">
          <label>平台导入：</label>
          <span></span>
          <!-- <el-tag type="success"> {{carSupplieObj[carDealerVo.supplierCode]}}</el-tag> -->
        </el-col>
        <template v-if="Info.carEvalConditionResultVO">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <label>车商收购价：</label>
            <span>{{Info.carEvalConditionResultVO.evalPricesMap.EXCELLENT.dealerBuyPrice}}万元</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <label>车商最高零售价：</label>
            <span>{{Info.carEvalConditionResultVO.evalPricesMap.EXCELLENT.dealerHighSoldPrice}}万元</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <label>厂商指导价：</label>
            <span>{{Info.guideSalePrice}}万元</span>
          </el-col>
        </template>
      </el-row>
    </el-card>

    <el-card class="page-box" shadow='hover'>
      <el-divider class="page-divider" content-position="left">销售信息</el-divider>
      <el-row :gutter="10" class="page-row">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>零售价：</label>
          <span>{{Info.retailPrice}} 万</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>品 牌：</label>
          <span>{{Info.brandName}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车 系：</label>
          <span>{{Info.catenaName}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="18">
          <label>车 型：</label>
          <span>{{Info.modelName}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车架号：</label>
          <span>{{Info.vin}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车辆所在地：</label>
          <span>{{Info.cityName}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>上牌地点：</label>
          <span>{{Info.carPlateSiteName}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>上牌时间：</label>
          <span>{{Info.plateYear}}年{{Info.plateMonth}}月</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>表显里程：</label>
          <span>{{Info.kilometres}}万公里</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>过户次数：</label>
          <span>{{Info.transferTimes>=0?Info.transferTimes+'次':'--'}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车 况：</label>
          <el-tag size='small' v-if="Info.carStatusDesc" :type='CAR_STATUS_TAGS[Info.carStatus]'>{{CAR_STATUS[Info.carStatus]}}</el-tag>
          <div v-else>--</div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>变速箱：</label>
          <el-tag size='small' :type='GEAR_TYPE_SET_TAGS[Info.gearboxType]'>{{Info.gearboxTypeDesc}}</el-tag>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车辆级别：</label>
          <span>{{Info.carLevel}}</span>···
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车辆性质：</label>
          <span>{{Info.carNatureDesc}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车辆颜色：</label>
          <span>{{Info.carColor}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>车辆颜色(行驶证)：</label>
          <span>{{Info.colorDrivingLicense  || '--'}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>内饰颜色：</label>
          <span>{{Info.innerColor}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>首付款：</label>
          <span>{{Info.downPayment?Info.downPayment+'万元' : '--'}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>按揭方式：</label>
          <span>{{Info.supportMortgage =='Y'?'支持按揭':'不支持按揭'}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-if="Info.isGuarantee">
          <label>是否平台担保：</label>
          <span>{{Info.isGuarantee =='Y'?'是':'否'}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-if="Info.isCollect=='Y'">
          <label>登记证：</label>
          <span>{{CERTIFICATION_STATUS[Info.registrationCertification]}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>购车发票：</label>
          <span>{{CERTIFICATION_STATUS[Info.buyInvoice]}}</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <label>抵押状态：</label>
          <span>{{Info.beMortgaged=='Y'?'已抵押':'未抵押'}}</span>
        </el-col>
        <template v-if="Info.isCollect=='Y'">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <label>年审有效期：</label>
            <span>{{Info.annualReviewValidDate || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <label>交强险有效期：</label>
            <span>{{Info.forcedInsuranceValidDate || '--'}}</span>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <label>商业险有效期：</label>
            <span>{{Info.additionalInsuranceValidDate || '--'}}</span>
          </el-col>
          <el-col :span='24' style="align-items:start;">
            <label>车辆描述：</label>
            <span>{{Info.carDesc}}</span>
          </el-col>
        </template>
      </el-row>
    </el-card>
    <el-card class="page-box" shadow='hover'>
      <el-divider class="page-divider" content-position="left">车辆图片</el-divider>
      <Viewer :images="[]">
        <el-row :gutter="10" class="image-row">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" v-for="(item,index) in Info.carImagelist" :key="index">
            <el-card shadow='hover'>
              <img :src="item.filePath" :data-original='item.filePath' :alt="item.position">
              <p class="img-txt" v-if="item.attachmentType == 3">车架号图片</p>
              <p class="img-txt" v-else-if="item.attachmentType == 1">主图</p>
              <p class="img-txt" v-else-if="item.position">{{item.position}}</p>
            </el-card>
          </el-col>
        </el-row>
      </Viewer>
    </el-card>
    <el-card class="page-box" v-if="Info.attachmentCarVideoVO" shadow='hover'>
      <el-divider class="page-divider" content-position="left">车辆视频</el-divider>
      <el-card class="video-box" style="width:410px" shadow='hover'>
        <Player :video-url='Info.attachmentCarVideoVO.filePath' />
      </el-card>
    </el-card>
    <div class="page-btns-box">
      <el-button @click="$router.go(-1)">返 回</el-button>
    </div>
  </div>
</template>

<script>
import { carSellDetail } from 'api'
import { CAR_STATE, CAR_STATE_TAGS, GEAR_TYPE_SET, GEAR_TYPE_SET_TAGS, CAR_STATUS, CAR_STATUS_TAGS, CERTIFICATION_STATUS } from 'utils/menu'
import { ViewerOptions } from 'utils/vx'
import Viewer from 'components/viewer'
import Player from 'components/Player'
export default {
  data() {
    return {
      CAR_STATE,
      CAR_STATE_TAGS,
      GEAR_TYPE_SET,
      GEAR_TYPE_SET_TAGS,
      CAR_STATUS,
      CAR_STATUS_TAGS,
      CERTIFICATION_STATUS,
      ViewerOptions,
      id: this.$route.query.id,
      Info: {},
      carDealerVo: {}
    }
  },
  components: { Viewer, Player },
  created() {
    this._carSellDetail()
  },
  methods: {
    async _carSellDetail() {
      let res = await carSellDetail({ id: this.id });
      if (res.code == 0) {
        this.Info = res.data
        this.carDealerVo = res.data.carDealerVo || {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>