<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <el-button @click="back" icon='el-icon-arrow-left' round class="pan-back-btn">返回 </el-button>
        <h2>您没有权限访问该页面</h2>
        <h6>如有不满请联系您的领导</h6>
        <ul class="list-unstyled">
          <li>或者您可以去：</li>
          <li class="link-type">
            <router-link to="/dashboard">回到首页</router-link>
          </li>
          <li><a @click.prevent="dialogVisible=true" href="#">点我看图</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>

    <el-dialog title="随便看" :visible.sync="dialogVisible" :close-on-click-modal="false" size="large">
      <img class="pan-img" :src="ewizardClap" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/error/401.gif'

export default {
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "@/styles/color.less";
.errPage-container {
  width: 800px;
  margin: 100px auto;
  .pan-back-btn {
    background: @light-blue;
    color: #fff;
  }
  h2 {
    font-size: 28px;
    color: @light-blue;
    margin: 20px 0 5px;
  }
  h6 {
    font-size: 16px;
    color: #aaa;
    margin-bottom: 30px;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    list-style: none;
    li {
      padding-bottom: 5px;
      font-size: 16px;
      color: #666;
    }
    a {
      color: @light-blue;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
