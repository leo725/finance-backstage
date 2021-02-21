// 个人风险评估报告 仪表盘表格
<template>
  <div></div>
</template>

<script>
import * as echarts from 'echarts'
const CREDIT_GRADE = [
  { grade: 'A', desc: '信用极好', value: 0.2, color: '#42b983' },
  { grade: 'B', desc: '信用良好', value: 1, color: '#42b983' },
  { grade: 'C', desc: '信用一般', value: 2, color: '#e6a23c' },
  { grade: 'D', desc: '信用较差', value: 3, color: '#e6a23c' },
  { grade: 'E', desc: '信用极差', value: 3.8, color: '#f56c6c' },
]
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el);
    window.addEventListener('resize', this.resizeHandler)
    this.initChart('D');
  },
  beforeDestory() {
    window.removeEventListener('resize', this.resizeHandler);
    if(!this.chart) return
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    /**
     * 初始化图表
     */
    initChart(grade) {
      grade = grade.toUpperCase()
      let currgetGrade = CREDIT_GRADE.find(v => v.grade === grade)
      let colorLinearStyle = {
        color: {
          type: 'linear', x: 1, y: 0, x2: 0, y2: 1, global: false, // 缺省为 false
          colorStops: [
            { offset: 0, color: '#417cff' },// 0% 处的颜色 
            { offset: 1, color: '#15f4ff' } // 100% 处的颜色
          ]
        },
        shadowColor: '#ccc',
        shadowBlur: 10,
        shadowOffsetX: 3,
        shadowOffsetY: 3
      }
      let options = {
        title: {
          show: true,
          textAlign: 'center',
          text: `信用等级${grade}`,
          left: '50%',
          top: '74%',
          textStyle: {
            color: currgetGrade.color,
            fontWeight: 'normal',
            fontSize: 20
          },
          subtext: currgetGrade.desc,
          subtextStyle: {
            fontSize: 14
          }
        },
        series: [{
          type: 'gauge',
          startAngle: 180 + 15,
          endAngle: -15,
          splitNumber: 4,
          max: 4,
          z: 10,
          center: ['50%', '55%'],
          // 当前进度
          progress: {
            show: true,
            width: 30,
            roundCap: true,
            itemStyle: colorLinearStyle
          },
          // 仪表盘轴线
          axisLine: { roundCap: true, lineStyle: { width: 30 } },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            distance: -45,
            fontSize: 16,
            color: '#aaa',
            formatter: (value) => {
              return CREDIT_GRADE[value].grade
            }
          },
          // 指针
          pointer: {
            show: true,
            width: 30,
            keepAspect: true,
            offsetCenter: [0, '5%'],
            itemStyle: colorLinearStyle,
            icon: 'path://M34.58,7.44a2.54,2.54,0,0,0-.8-1.75,2.58,2.58,0,0,0-4.36,1.75L27.14,53.92a4.87,4.87,0,1,0,9.72,0ZM32,56.84a2.73,2.73,0,1,1,2.73-2.73A2.73,2.73,0,0,1,32,56.84Z'
          },
          detail: {
            offsetCenter: [0, '35%'],
            fontSize: 48,
            formatter: (value) => {
              return currgetGrade.grade
            },
          },
          data: [{
            value: currgetGrade.value
          }]
        }]
      }
      this.chart.setOption(options)
    },
    /**
     * 窗口大小改变 调整
     */
    resizeHandler() {
      if (this.chart) this.chart.resize()
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
</style>