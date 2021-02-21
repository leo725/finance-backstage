// 个人风险评估报告
<template>
  <div class="container personal-container" ref="personalContainer">
    <!-- 头部 -->
    <el-card shadow='never' class="header-box box" id='header-container'>
      <h1>个人借贷综合风险评估报告</h1>
      <h5>
        <p>
          报告编号：<span>F00052021012616284751139758180882471</span>
        </p>
        <p>
          报告时间：<span>2021年01月26日</span>
        </p>
      </h5>
    </el-card>
    <!-- 基本信息 -->
    <el-card shadow='hover' class="box" id='info-container'>
      <p class="info-header">
        <img src="../../assets/index/woman.png" alt="女士">
        <img src="../../assets/index/man.png" alt="男士">
        <b>被查询人信息</b>
      </p>
      <el-row :gutter='10' class="label-row">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>姓名：</label>
          <span>李*芬</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>身份证：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>手机：</label>
          <span>151*****447</span>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter='15'>
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
        <!-- 图表 -->
        <el-card shadow='hover' class="box" id='chart-container'>
          <GuageChart class="chart-container" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <!-- 评分 -->
        <el-card shadow='hover' class="box flex-center-center" id='res-container'>
          <span>决策建议</span>
          <p class="success">通过</p>
        </el-card>
        <!-- 评分解析 -->
        <el-card shadow='hover' class="box flex-center-center" id='explain-container'>
          <p>评分解析：</p>
          <ul>
            <li>信用等级<span class="success">B</span>，属于风险较低的区域</li>
            <li>等级是基于当前时间的相关数据，依据风险模型进行计算得到的</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>

    <!-- 风险提示 -->
    <el-card shadow='hover' class="box flex-align-center" id='risk-container'>
      <b>风险提示：该用户命中 <span class="danger">1</span> 条异常信息！</b>
      <el-badge :value='0' hidden>
        <el-button type="primary" @click="jumpToView('identity-container')">身份风险评估</el-button>
      </el-badge>
      <el-badge :value='0'>
        <el-button type="primary" plain @click="jumpToView('mobile-container')">手机风险评估</el-button>
      </el-badge>
    </el-card>

    <!-- 身份基本信息 -->
    <el-card shadow='hover' class="box com-info-box" id='identity-container'>
      <h1>身份基本信息</h1>
      <el-row :gutter='10' class="label-row">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>姓名：</label>
          <span>李*芬</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>身份证：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>性别：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>年龄：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>出生日期：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>所属省份：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>所属城市：</label>
          <span>151*****447</span>
        </el-col>
      </el-row>
    </el-card>

    <!-- 身份风险检测 -->
    <h1 class="sub-title">身份风险检测</h1>
    <ul class="report-ul">
      <li class="report-li">
        <div class="report-item report-item-success">
          <el-card shadow='hover'>
            <h2 class="report-item-title">身份信息风险检测</h2>
            <ul class="report-item-ul">
              <li>
                <label>策略描述：</label>
                <span>根据被查询人的相关信息，分析其在非银机构场景下，多头借款申请数据中的潜在风险情况</span>
              </li>
              <li>
                <label>检测结论：</label>
                <span class="warning">中风险</span>
              </li>
              <li>
                <label>结论分析：</label>
                <span>检测到非银机构场景下的借款申请风险</span>
              </li>
            </ul>
            <ul class="report-item-table-ul">
              <li>
                <h4>非银机构借款申请次数统计数据：</h4>
                <el-table :data='tableData' border size='mini' style="width: 100%">
                  <el-table-column label='机构类型' prop='type' header-align="center" align="center"></el-table-column>
                  <el-table-column label='近7天' prop='j7t' header-align="center" align="center"></el-table-column>
                  <el-table-column label='近15天' prop='j15t' header-align="center" align="center"></el-table-column>
                  <el-table-column label='近1月' prop='j1y' header-align="center" align="center"></el-table-column>
                </el-table>
              </li>
            </ul>
          </el-card>
        </div>
      </li>
    </ul>

    <!-- 手机基本信息 -->
    <el-card shadow='hover' class="box com-info-box" id='mobile-container'>
      <h1>手机基本信息</h1>
      <el-row :gutter='10' class="label-row">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>运营商：</label>
          <span>李*芬</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>卡描述：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>所属省份：</label>
          <span>44**************2X</span>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="flex-col">
          <label>所属城市：</label>
          <span>44**************2X</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import GuageChart from 'components/Charts/GaugeChart'
export default {
  data() {
    return {
      tableData: [
        { type: '小额贷', j7t: 7, j15t: 10, j1y: 3 }
      ]
    }
  },
  components: { GuageChart },
  methods: {
    jumpToView(id) {
      document.getElementById(`${id}`).scrollIntoView({ behavior: "smooth" })
    }
  }
}
</script>

<style lang="less" scoped>
@success: #42b983;
@warning: #e6a23c;
@danger: #f56c6c;
@bg-color: #f8fafc;
.success {
  color: @success;
}
.warning {
  color: @warning;
}
.danger {
  color: @danger;
}
.personal-container {
  background: @bg-color;
  padding: 15px;
  .flex {
    display: flex;
  }
  .flex-center-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-align-center {
    display: flex;
    align-items: center;
  }
  .box {
    margin-bottom: 15px;
  }
  .label-row {
    .flex-col {
      display: flex;
      margin-top: 15px;
      font-size: 14px;
      align-items: center;
      label {
        display: inline-block;
        width: 80px;
        color: #798aa0;
        text-align: right;
        margin-right: 10px;
      }
      :last-child:not(:first-child) {
        color: #333;
      }
    }
  }
  .header-box {
    background: #597df7;
    color: #fff;
    text-align: center;
    padding: 10px;
    h1 {
      font-size: 24px;
      color: #fff;
      margin: 10px 0;
    }
    h5 p {
      display: inline-block;
      font-size: 12px;
      color: #c6d3ff;
      margin: 0 15px;
    }
  }
  /* 被查询人信息 */
  #info-container {
    padding: 20px;
    .info-header {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      img {
        width: 50px;
        margin-right: 20px;
      }
      b {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  /* 图表 */
  #chart-container {
    height: 600px;
    .chart-container {
      height: 600- 20px;
    }
  }
  /* 决策建议 */
  #res-container {
    height: ceil(600-15) / 5 * 2px;
    text-align: center;
    p {
      font-size: 50px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  /* 评分解析 */
  #explain-container {
    height: ceil(600-15) / 5 * 3px;
    padding: 20px;
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
      font-weight: bold;
    }
    ul > li {
      list-style: none;
      position: relative;
      padding-left: 15px;
      color: #999;
      font-size: 14px;
      line-height: 23px;
      margin-bottom: 5px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 7px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        overflow: hidden;
        background: #409eff;
      }
    }
  }

  /* 风险提示 */
  #risk-container {
    height: 90px;
    padding: 0 20px;
    .el-button {
      margin-left: 15px;
    }
  }

  /* 身份基本信息 */
  .com-info-box {
    padding: 20px;
    margin-bottom: 40px;
    h1 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  .sub-title {
    padding-left: 110px;
    font-weight: bold;
    line-height: 50px;
    font-size: 22px;
  }

  .report-ul {
    padding-left: 80px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      z-index: 9;
      left: 40px;
      top: 0;
      bottom: 0;
      width: 5px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAWCAYAAAAILVbQAAAAAXNSR0IArs4c6QAAAFFJREFUGBljvHbnKQMQqAKxIRCfB+LbLEAiEYjnADETEP8D4hRGoMqHQIYcEMPAc5AsL4wHpTlAgl1ogl0gMzuA+BwQmwDxGSDeBcSjgIohAABA0Q+9VEyKxwAAAABJRU5ErkJggg==)
        repeat-y;
    }
    li.report-li {
      position: relative;
      &:first-child::before {
        content: "";
        position: absolute;
        width: 80px;
        height: 50%;
        left: -80px;
        top: 0px;
        background-color: @bg-color;
        z-index: 10;
      }
      &:last-child::after {
        content: "";
        position: absolute;
        width: 80px;
        height: 50%;
        left: -80px;
        bottom: 0px;
        background-color: @bg-color;
        z-index: 10;
      }
      .report-item {
        position: relative;
        background: #fff;
        border-left: 6px solid #409eff;
        margin-bottom: 15px;
        &::before {
          content: "";
          display: block;
          width: 36px;
          height: 36px;
          margin-top: -18px;
          position: absolute;
          top: 50%;
          left: -62px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-color: #fff;
          border-radius: 50%;
          z-index: 19;
        }
        &.report-item-success::before {
          background-image: url(~@/assets/index/icon-success.png);
        }
        &.report-item-warning::before {
          background-image: url(~@/assets/index/icon-warning.png);
        }
        &.report-item-danger::before {
          background-image: url(~@/assets/index/icon-danger.png);
        }

        /deep/.el-card__body {
          padding-left: 20px !important;
        }
        .report-item-title {
          font-weight: bold;
          color: #333;
          font-size: 18px;
          line-height: 20px;
          margin-bottom: 20px;
          padding-top: 20px;
        }
        .report-item-ul {
          background: #f4f5f7;
          padding: 20px;
          border-radius: 5px;
          li {
            font-size: 14px;
            color: #7c899e;
            &:not(:last-child) {
              margin-bottom: 10px;
            }
          }
        }
        .report-item-table-ul {
          li {
            padding: 20px 20px 10px 20px;
            font-size: 14px;
            h4 {
              font-weight: bold;
              margin-bottom: 10px;
            }
            .el-table /deep/thead {
              th {
                background: #edf0f2;
              }
            }
          }
        }
      }
    }
  }
}
</style>