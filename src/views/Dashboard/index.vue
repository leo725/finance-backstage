<template>
  <div class="dashboard-editor-container animated zoomIn">
    <div class="flex main">
      <el-card class="card">
        <h1>欢迎进入B端融资管理平台！</h1>
      </el-card>
    </div>
  </div>
</template>

<script>
import $vx from 'utils/vx'
export default {
  name: 'dashboard-admin',
  components: {

  },
  data() {
    return {
      midShopInfo: {},
      userInfo: {},
      activeName: 'shop'
    }
  },
  created() {

  },
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.dashboard-editor-container {
  .main {
    height: calc(100vh - 130px);
    align-items: center;
    justify-content: center;
    h1{
      font-size: 40px;
      padding: 20px 40px;
      font-weight: bold;
    }
  }
}
</style>