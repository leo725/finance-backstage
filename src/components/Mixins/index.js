import { indexMethod, pageParams, getBtnPower, filterParams, getElStyleVal } from '@/utils/vx'
import Pagination from '@/components/Pagination'
import $vx from '@/utils/vx'
var timer
export const commonFn = {
  data(){
    return {
      tableHeight: null, // 表格高度
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      tableData: [],
      tableLoding: false,
      searchData: {},
      defaultParams: {}, // 页面里面默认参数
      fixedParams: {},
      btnPower:{}
    }
  },
  components: {Pagination},
  created(){
    // 初始化页面数据
    this.initData()
    // 初始化页面按钮
    getBtnPower(this.$route.meta, this.btnPower)
  },
  beforeDestroy(){
    try {
      window.removeEventListener('resize', this.getTableHeight)
    } catch (error) {
      
    }
  },
  methods:{
    /* 共用页面方法开始 */
    indexMethod,
    pageParamsGet: pageParams.get,
    pageParamsSet: pageParams.set,
    filterParams,
    // 初始化页面数据
    initData() {
      // 初始化参数
      let initParams = { pageSize: this.pageSize, pageIndex: this.pageIndex }
      // 从缓存中获取页面参数 刷新保留参数
      let query = pageParams.get(this.$route.path) || initParams
      this.searchData = {...this.defaultParams,...query};
      let params = Object.assign( initParams, query, this.defaultParams, this.fixedParams)
      this.pageIndex = params.pageIndex;
      this.pageSize = params.pageSize;
      this.getList(params);
    },
    // 分页处理 - 改变每页显示数量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.currentList();
    },
    // 分页处理 - 改变页数
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.currentList()
    },
    // 获取列表
    currentList() {
      let params = { ...this.searchData, ...{ pageSize: this.pageSize, pageIndex: this.pageIndex }, ...this.fixedParams }
      this.getList(params)
    },
    // 查询
    selectList(){
      this.pageIndex = 1;
      this.currentList();
    },
    // 清空 resetDefaultParams : 是否清空默认参数
    resetForm( resetDefaultParams = false) {
      if(resetDefaultParams) this.defaultParams = {};
      this['searchData'] = {};
      this.currentList();
    },
    /**
     * 计算表格高度，表格表头固定
     */
    getTableHeight(){
      let searchHeight = this.$el.querySelector('.search').offsetHeight + 20; // 搜索部分的高度
      let paginationHeight = this.$el.querySelector('.el-pagination').offsetHeight + 20*2 // 分页部分的高度
      let fixedHeaderHeight = document.querySelector('.fixed-header').offsetHeight // 固定头部的高度
      let windowHeight = document.documentElement.scrollHeight;
      let appMainPadding = getElStyleVal(document.querySelector('.app-main'),'padding-top') + getElStyleVal(document.querySelector('.app-main'),'padding-bottom')
      let otherHeight = 10*2 + 2; /* 10: el-card 的padding， 2: 误差 */
      this.tableHeight = windowHeight-searchHeight-paginationHeight-fixedHeaderHeight - appMainPadding -otherHeight;
    }
  }
}