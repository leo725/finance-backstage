<template>
  <div class="table-page">
    <div class="search clearfix" style="min-height:52px;">
      <el-form label-position="right" label-width="80px" size="small" ref="searchForm" :model="searchData">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="名称">
              <el-input placeholder="请输入名称" size="small" clearable v-model="searchData.name" @keyup.enter.native="selectList()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="计息类型">
              <el-select v-model="searchData.interestAccrualType" placeholder="请选择计息类型">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(lab,key) in INTEREST_ACCRUAL_TYPE" :label="lab" :value="key" :key="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item label="状态">
              <el-select v-model="searchData.state" placeholder="请选择状态">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(lab,key) in STATE" :label="lab" :value="key" :key="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item class="search-btns">
              <el-button icon="el-icon-search" size="small" type="primary" @click="selectList()">查询</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm()">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="handel">
      <el-button-group>
        <el-button type="primary" size="small" icon='el-icon-document-add' @click="addInterestVisible=true">新增计息方式</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" size='medium' style="width: 100%" stripe fit highlight-current-row v-loading="tableLoding">
        <el-table-column label="序号" type="index" :index="indexMethod" width="50" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="financingDeadline" label="融资期限" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.financingDeadline}}天</template>
        </el-table-column>
        <el-table-column prop="interestAccrualType" label="计息类型" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="INTEREST_ACCRUAL_TYPE_TAGS[scope.row.interestAccrualType]">{{INTEREST_ACCRUAL_TYPE[scope.row.interestAccrualType]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="perDiemRate" label="日息" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.perDiemRate}}‱</template>
        </el-table-column>
        <el-table-column prop="overdueDailyInterest" label="逾期日息" header-align="center" align="center">
          <template slot-scope="scope">{{scope.row.overdueDailyInterest}}‱</template>
        </el-table-column>
        <el-table-column prop="desc" label="备注" header-align="center" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="STATE_TAGS[scope.row.state]">{{STATE[scope.row.state]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操 作" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="btnPower.edit" @click="edit(scope.row)">修 改</el-button>
            <el-button type="text" size="small" v-if="btnPower.able" @click="changeState(scope.row)">{{scope.row.state==1?'禁 用':'启 用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :currentPage='pageIndex' :total='total' :pageSize='pageSize' v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange"></pagination>
    </el-card>

    <!-- 新增计息方式 -->
    <el-dialog :visible.sync="addInterestVisible" width="700px" :title="addInterestForm.id?'修改计息方式':'新增计息方式'" center :close-on-click-modal='false' :before-close="handleClose">
      <el-form ref='addInterestForm' :model="addInterestForm" :rules="addInterestRules" size="medium" label-width="100px" label-position="right">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='名称：' prop="name">
              <el-input v-model="addInterestForm.name" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='融资期限：' prop="financingDeadline">
              <el-input v-model.number="addInterestForm.financingDeadline" placeholder="融资期限" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='计息类型：' prop="interestAccrualType">
              <el-select v-model="addInterestForm.interestAccrualType" style="width:100%" clearable placeholder="请选择计息方式" @change="interestAccrualTypeChange">
                <el-option v-for="(value,key) in INTEREST_ACCRUAL_TYPE" :label='value' :value="key" :key="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="addInterestForm.interestAccrualType && addInterestForm.interestAccrualType != 'normal'">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label='融资天数：' prop="settingTime">
                <el-input v-model.number="addInterestForm.settingTime" :placeholder="`__天内${addInterestForm.interestAccrualType=='lowest'?'最低':'最高'}收费`" clearable>
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label='收费类型：' prop="settingType">
                <el-select v-model="addInterestForm.settingType" style="width:100%" clearable placeholder="请选择计息方式">
                  <el-option v-for="(value,key) in settingTypeObj" :label='value' :value="key" :key="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="addInterestForm.settingType == 'money'">
              <el-form-item label='固定金额：' prop="settingCost">
                <el-input v-model="addInterestForm.settingCost" placeholder="请输入固定金额" type="number" clearable>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="addInterestForm.settingType != 'money'">
              <el-form-item label='融资比例：' prop="settingCost">
                <el-input v-model="addInterestForm.settingCost" placeholder="请输入融资比例" type="number" clearable>
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='日息：' prop="perDiemRate">
              <el-input v-model="addInterestForm.perDiemRate" placeholder="请输入日息" type="number" clearable>
                <template slot="append">‱</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='逾期日息：' prop="overdueDailyInterest">
              <el-input v-model="addInterestForm.overdueDailyInterest" placeholder="请输入逾期日息" type="number" clearable>
                <template slot="append">‱</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label='状态：' prop="state">
              <el-select v-model="addInterestForm.state" style="width:100%" clearable placeholder="请选择状态">
                <el-option v-for="(value,key) in STATE" :label='value' :value="parseInt(key)" :key="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label='备注：' prop="desc">
              <el-input v-model="addInterestForm.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="_krInterestaccrualSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { commonFn } from 'components/Mixins'
import { krInterestaccrualPage, krInterestaccrualDetail, krInterestaccrualSave } from '@/api/index'
import { INTEREST_ACCRUAL_TYPE, INTEREST_ACCRUAL_TYPE_TAGS, STATE, STATE_TAGS } from 'utils/menu'
export default {
  data: () => ({
    INTEREST_ACCRUAL_TYPE,
    INTEREST_ACCRUAL_TYPE_TAGS,
    STATE,
    STATE_TAGS,
    addInterestVisible: false,
    settingTypeObj: { 'money': '固定金额', 'ratio': '融资比例' },
    addInterestForm: {
      name: '',
      financingDeadline: '', // 融资期限
      interestAccrualType: '', // 计息类型
      settingType: '', // 固定金额 还是 比例
      settingTime: '', // __天内最高/最低
      perDiemRate: '', // 日息
      overdueDailyInterest: '', // 逾期日息
      settingCost: '', // 费用
      desc: '', // 说明
      state: 1
    },
    addInterestRules: {
      name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
      financingDeadline: [{ required: true, message: '融资期限不能为空', trigger: 'blur' }],
      interestAccrualType: [{ required: true, message: '计息类型不能为空', trigger: 'blur' }],
      settingTime: [{ required: true, message: '请设定天数', trigger: 'blur' }],
      settingType: [{ required: true, message: '请设定类型', trigger: 'blur' }],
      perDiemRate: [{ required: true, message: '日息不能为空', trigger: 'blur' }],
      overdueDailyInterest: [{ required: true, message: '逾期日息不能为空', trigger: 'blur' }],
      settingCost: [{ required: true, message: '融资比例或固定金额不能为空', trigger: 'blur' }],
      state: [{ required: true, message: '状态不能为空', trigger: 'blur' }],
      desc: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
    },
    btnPower:{
      edit:true,
      able:true
    }
  }),
  created() {

  },
  mixins: [commonFn],
  methods: {
    // 获取列表数据 - 固定方法名 getList
    async getList(params) {
      try {
        this.tableLoding = true;
        params = this.filterParams(params);
        let res = await krInterestaccrualPage(params);
        this.pageParamsSet(this.$route.path, params);
        this.tableLoding = false;
        if (res.code == 0) {
          this.tableData = res.data.tlist;
          this.total = res.data.total;
        }
      } catch (error) {

      }
    },
    /* 页面其他方法开始 */
    handleClose(noRefresh) {
      this.$refs['addInterestForm'].resetFields();
      this.addInterestForm = { state: 1 }
      this.addInterestVisible = false;
      if (noRefresh) return;
      this.currentList()
    },
    // 计息类型改变
    interestAccrualTypeChange(e) {
      if (e == 'normal') {
        this.addInterestForm.settingType = 'ratio'
      }
    },
    // 新建/修改
    _krInterestaccrualSave() {
      this.$refs['addInterestForm'].validate(async valid => {
        if (valid) {
          if (this.addInterestForm.interestAccrualType == 'normal') {
            delete this.addInterestForm.settingTime
          }
          let res = await krInterestaccrualSave(this.filterParams(this.addInterestForm));
          if (res.code == 0) {
            this.$message({ type: 'success', message: "操作成功！" })
            this.handleClose();
          }
        }
      })
    },
    // 修改 - 获取详情
    edit(item) {
      let { id, name, financingDeadline, interestAccrualType, settingType, settingTime, perDiemRate, overdueDailyInterest, settingCost, desc, state } = item;
      this.addInterestForm = { id, name, financingDeadline, interestAccrualType, settingType, settingTime, perDiemRate, overdueDailyInterest, settingCost, desc, state }
      this.addInterestVisible = true
    },
    // 启用、禁用
    async changeState(item) {
      let { id, state } = item;
      let params = {
        id,
        state: state == 1 ? 0 : 1
      }
      let res = await krInterestaccrualSave(params)
      if (res.code == 0) {
        this.$message({ type: 'success', message: "操作成功！" })
        this.currentList();
      }
    }
  }
}
</script>