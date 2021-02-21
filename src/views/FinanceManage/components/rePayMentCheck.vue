<template>
  <el-dialog title="还款核实" class="large-dialog" :visible.sync="visible" width="1000px" top="8vh" center :close-on-click-modal="false" :before-close="beforClose">
    <div class="box dialog-main">
      <table class="bgTable">
        <tr>
          <td class="tit" width="8.6%" align="center">车型</td>
          <td width="32.6%" align="center">{{baseInfo.carModeName}}</td>
          <td class="tit" width="8.6%" align="center">车架号</td>
          <td width="20.6%" align="center">{{baseInfo.vin}}</td>
          <td class="tit" width="8.6%" align="center">融资日期</td>
          <td width="20.6%" align="center">{{baseInfo.remitDate}}</td>
        </tr>
        <tr>
          <td class="tit" width="8.6%" align="center">还款类型</td>
          <td width="24.6%" align="center">{{baseInfo.closeType=='settle'?'结清':'利息'}}</td>
          <td class="tit" width="8.6%" align="center">融资金额</td>
          <td width="24.6%" align="center">{{baseInfo.financingMoney}} 元</td>
          <td class="tit" width="8.6%" align="center">还款金额</td>
          <td width="24.6%" align="center">{{fromInfo.repaymentMoney}} 元</td>
        </tr>
      </table>
      <div class="jixi">
        计息截止
        <el-date-picker class="time" unlink-panels size="small" v-model="startApplyDate" :picker-options='{disabledDate:overDatePickerOptions}' value-format="yyyy-MM-dd" placeholder="计息截至日期"></el-date-picker>
        <el-button type="primary" size="small" @click="_repaymentCalculateVO">计算</el-button>
      </div>
      <table class="bgTable">
        <tr>
          <th class="tit">项目名称</th>
          <th class="tit">金额(元)</th>
          <th class="tit">已还金额(元)</th>
          <th class="tit">优惠金额(元)</th>
          <th class="tit">剩余未还(元)</th>
          <th class="tit">本次应还(元)</th>
        </tr>
        <tr>
          <td class="tit" width="16.6%" align="center">本金</td>
          <td width="16.6%" align="center">{{baseInfo.money}}</td>
          <td width="16.6%" align="center">{{baseInfo.repaymentMoney}}</td>
          <td width="16.6%" align="center">/</td>
          <td width="16.6%" align="center">{{baseInfo.noRepaymentMoney}}</td>
          <td width="16.6%" align="center">{{baseInfo.shouldRepay}}</td>
        </tr>
        <tr>
          <td class="tit" width="16.6%" align="center">利息</td>
          <td width="16.6%" align="center">{{baseInfo.interestMoney}}</td>
          <td width="16.6%" align="center">{{baseInfo.interestRepaymentMoney}}</td>
          <td width="16.6%" align="center">{{baseInfo.interestDiscountsMoney}}</td>
          <td width="16.6%" align="center">{{baseInfo.interestNoRepaymentMoney}}</td>
          <td width="16.6%" align="center">{{baseInfo.interestShouldRepay}}</td>
        </tr>
        <tr>
          <td class="tit" width="16.6%" align="center">应还总计(元)</td>
          <td align="center" colspan="5">{{baseInfo.totalShouldRepay}}</td>
        </tr>

      </table>
      <div class="jixi">
        还款凭证
      </div>
      <el-row :gutter="10">
        <Viewer :images="[]">
          <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7" class="card-img-box" v-for="(item,index) in pzImg" :key="index">
            <el-card class="img-card" shadow="hover">
              <img :key="item.id" alt="还款凭证" :data-original='item.filePath' v-lazy="item.filePath"></img>
            </el-card>
          </el-col>
        </Viewer>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="ImgBox" v-for="(item,index) in formData.remitReportList" :key="index">
          <el-card class="imgItem" shadow="hover">
            <img class="elimg" :src="item.filePath"></img>
          </el-card>
        </el-col>
      </el-row>
      <el-form label-width="102px" size="small" ref="saveForm" :model="formData">
        <el-row>
          <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
            <el-form-item label="核实状态" prop="isPass">
              <el-radio-group v-model="isPass">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="0">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" v-if="isPass">
            <el-form-item label="实收金额" prop="officialReceiptsMoney" :rules="[{ required: true, message: '实收金额不能为空', trigger: 'blur' }]">
              <el-input v-model="formData.officialReceiptsMoney" :readonly='readonly' size="small" type="number" placeholder="输入实收金额"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10" v-if="isPass">
            <el-form-item label="优惠金额" prop="discountsMoney" :rules="[{ required: true, message: '优惠金额不能为空', trigger: 'blur' }]">
              <el-input v-model="formData.discountsMoney" :readonly='readonly' size="small" type="number" placeholder="输入优惠金额"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="核实说明" prop="verifyDesc" :rules="[{ required: true, message: '核实说明不能为空', trigger: 'blur' }]">
              <el-input v-model="formData.verifyDesc" :readonly='readonly' size="small" type="textarea" :rows="4" placeholder="输入核实说明"><template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="beforClose">取 消</el-button>
      <template v-if="!readonly">
        <el-button v-if="isPass" type="success" @click="_sysConfigSubmit('success')" :loading="btnLoading">通过</el-button>
        <el-button v-else type="danger" @click="_sysConfigSubmit('no_pass')" :loading="btnLoading">不通过</el-button>
      </template>
    </span>

  </el-dialog>
</template>

<script>
import Viewer from 'components/viewer'
import { repaymentVerifyDetail, repaymentVerifyCheck, repaymentCalculateVO } from 'api/index'
import { filterParams } from 'utils/vx'
import $vx from 'utils/vx'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    fromInfo: {
      type: Object,
    },

  },
  components: {
    Viewer
  },
  data() {
    return {
      btnLoading: false,
      baseInfo: {},
      formData: { discountsMoney: 0 },
      startApplyDate: '', //计息截止时间
      pzImg: [],
      isPass: 1,
    }
  },
  created() {
    this.getNowTime()
  },
  computed: {
    overDatePickerOptions() {
      return (time) => {
        return time.getTime() > new Date().getTime()
      }
    }
  },
  mounted() {
  },
  methods: {
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      var hour = " 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}${hour}`;
      this.startApplyDate = defaultDate

    },
    // 关闭
    beforClose() {
      this.$emit('handleClose', true) //参数 true，表示不刷新列表
      this.btnLoading = false
      this.formData = {}
      this.$refs['saveForm'].resetFields();
    },
    // 详情
    async _repaymentVerifyDetail(id) {
      let res = await repaymentVerifyDetail({ id })
      if (res.code === 0) {
        this.baseInfo = res.data;
        this.pzImg = []
        let imgs = res.data.financingCarAttachmentVOList
        for (let i = 0; i < imgs.length; i++) {
          const ele = imgs[i];
          if (ele.attachmentType == 3) {
            this.pzImg.push(ele)
          }
        }
        // 如果是详情
        if (!this.readonly) return
        let { repaymentSchedule, verifyDesc, discountsMoney, officialReceiptsMoney } = res.data
        this.isPass = +(repaymentSchedule !== 'no_pass');
        this.formData = { verifyDesc, discountsMoney, officialReceiptsMoney }
      }
    },
    // 计算
    async _repaymentCalculateVO() {
      let res = await repaymentCalculateVO({ expirationDate: this.startApplyDate, id: this.fromInfo.id })
      if (res.code == 0) {
        this.baseInfo = { ...this.baseInfo, ...res.data }
      }
    },
    //提交
    async _sysConfigSubmit(repaymentSchedule) {
      this.$refs['saveForm'].validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          try {
            let params = JSON.parse(JSON.stringify(this.formData))
            let { id, version } = this.fromInfo
            params = { ...params, id, version, repaymentSchedule };
            if (this.isPass == 0) { // 如果不通过，删除实收金额，优惠金额
              delete params.officialReceiptsMoney
              delete params.discountsMoney
            }
            let res = await repaymentVerifyCheck(params)
            if (res.code === 0) {
              this.$emit('handleClose')
              this.formData = {}
              this.$refs['saveForm'].resetFields();
              this.$message({ type: 'success', message: '已提交成功！' });
            }
            this.btnLoading = false
          } catch (error) {
            this.btnLoading = false
          }
        } else {
          this.$message({ type: 'error', message: "请检查必填项" });
        }
      })

    },
  },
  watch: {
    visible(newVal, oldVla) {
      if (newVal) {
        this.isPass = 1
        this._repaymentVerifyDetail(this.fromInfo.id)
        this._repaymentCalculateVO()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 900px;
  padding: 0 20px 10px;
  margin: 0 auto;
  .jixi {
    font-size: 16px;
    font-weight: bold;
    padding: 30px 0px;
    .time {
      margin: 0 20px;
    }
  }
}
.bgTable {
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  border: 1px solid #ddd;
  .tit {
    font-size: 14px;
    font-weight: 700;
  }
  & td,
  & th {
    border: solid #ddd 1px;
    height: 30px;
  }
  td {
    font-size: 14px;
  }
}
</style>