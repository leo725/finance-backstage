<template>
  <el-dialog title="还款记录" :visible.sync="visible" width="1000px" top="8vh" center :close-on-click-modal="false" :before-close="beforClose">
     <!-- 还款凭证 -->
    <payCertificate :visible="certificateVB" :fromInfo="curItem" @handleClose="closeCertificateFrom"></payCertificate>
   
    <el-card class="box-card">
      <el-table :data="formData" size='small' empty-text="暂无还款记录" style="width: 100%" stripe>
        <!-- <el-table-column label="序号" type="index" width="50" header-align="center" align="center"></el-table-column> -->
        <el-table-column prop="carModeName" label="车型" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="closeType" width="120" label="还款类型" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.closeType=='settle'?'结清':'利息'}}
          </template>
        </el-table-column>
        <el-table-column prop="repaymentMoney" width="160" label="还款金额" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.repaymentMoney | number}} 元
          </template>
        </el-table-column>
        <el-table-column prop="repaymentSchedule" width="120" label="还款进度" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="REPAYMENT_SCHEDULE_TAGS[scope.row.repaymentSchedule]">{{REPAYMENT_SCHEDULE[scope.row.repaymentSchedule]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="officialReceiptsMoney" label="实收金额" width="160" header-align="center" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.officialReceiptsMoney">
              {{scope.row.officialReceiptsMoney | number}} 元
            </span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="discountsMoney" label="优惠金额" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.discountsMoney | number}} 元
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="还款凭证"  header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="seeCertificate(scope.row)">查看凭证</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button @click="beforClose">取 消</el-button>
    </span>

  </el-dialog>
</template>

<script>
import payCertificate from './payCertificate'
import {repaymentVerifyPage} from 'api/index'
import { filterParams} from 'utils/vx'
import $vx from 'utils/vx'
import {REPAYMENT_SCHEDULE,REPAYMENT_SCHEDULE_TAGS} from 'utils/menu'
export default {
  props: {
    visible: {
      type:Boolean,
      default: false
    },
    fromInfo: {
      type:Object,
    },

  },
  components: {
    payCertificate
  },
  data() {
    return {
      REPAYMENT_SCHEDULE,REPAYMENT_SCHEDULE_TAGS,
      formData: [],
      certificateVB:false,
      curItem:{},
    }
  },
  created() {
  },
  mounted () {
  },
  methods: {
    // 查看凭证
    closeCertificateFrom(){
      this.certificateVB = false
    },
    seeCertificate(row){
      this.certificateVB = true
      this.curItem = {id:row.id}
    },
    // 关闭
    beforClose() {
      this.$emit('handleClose') //参数 true，表示不刷新列表
      this.formData =[]
    },
    async _repaymentRecord(){
      let res = await repaymentVerifyPage({pageSize: 1000, pageIndex: 1,...this.fromInfo})
      if(res.code===0){
        this.formData = res.data.tlist
      }
    },

  },
  watch: {
    visible(newVal, oldVla) {
      if (newVal) {
        this._repaymentRecord()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>