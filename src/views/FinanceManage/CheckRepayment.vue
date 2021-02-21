<template>
  <div>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <strong>核对还款信息</strong>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div v-if="messages.length">
        <ul
          v-for="(item,index) in messages"
          :key="index"
          class="text item"
        >
          <li>{{index+1}}：{{item}}</li>
        </ul>
      </div>
      <div
        v-else
        class="tipTrue"
      >账单数据正常</div>
    </el-card>
  </div>
</template>

<script>
import { checkRepayment } from 'api'
export default {
  data() {
    return {
      messages: []
    }
  },
  created() {
    this._checkRepayment()
  },
  methods: {
    // 核对还款信息
    async _checkRepayment() {
      let res = await checkRepayment({})
      if (res.code === 0) {
        // console.log(res);
        this.messages = res.data
      }
    },
  }
};
</script>

<style lang="less" scoped>
.tipTrue{
  text-align: center;
  font-size: 14px;
  height: 80px;
  line-height: 80px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>