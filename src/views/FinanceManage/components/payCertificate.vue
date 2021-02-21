<template>
  <el-dialog title="还款凭证" :visible.sync="visible" width="1000px" top="8vh" center append-to-body :close-on-click-modal="false" :before-close="beforClose">
    <el-row :gutter="10">
      <Viewer :images="[]" >
        <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7" class="card-img-box" v-for="(item,index) in formData" :key="index">
          <el-card  class="img-card" shadow="hover">
            <img :key="item.id" alt="还款凭证" :src="item.filePath"></img>
          </el-card>
        </el-col>
      </Viewer>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="beforClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Viewer from 'components/viewer'
import {repaymentVerifyDetail} from 'api/index'
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
    Viewer
  },
  data() {
    return {
      REPAYMENT_SCHEDULE,REPAYMENT_SCHEDULE_TAGS,
      formData: [],
    }
  },
  created() {
  },
  mounted () {
  },
  methods: {
    // 关闭
    beforClose() {
      this.$emit('handleClose') //参数 true，表示不刷新列表
      this.formData =[]
    },
    async _repaymentVerifyDetail(id){
      let res = await repaymentVerifyDetail({id})
      if(res.code===0){
        let imgs = res.data.financingCarAttachmentVOList
        for (let i = 0; i < imgs.length; i++) {
          const ele = imgs[i];
          if(ele.attachmentType==3) {
            this.formData.push(ele)
          }
        }
      }
    },

  },
  watch: {
    visible(newVal, oldVla) {
      if (newVal) {
        this._repaymentVerifyDetail(this.fromInfo.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>