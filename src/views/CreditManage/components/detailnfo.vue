<template>
  <el-dialog :title="formData.status=='to_first_review'?'授信初审':formData.status=='to_extend_credit'?'授信审核':'授信详情'" :visible.sync="visible" class="large-dialog" append-to-body width="1000px" top="8vh" center :close-on-click-modal="false" :before-close="beforClose">
    <div class="dialog-main" v-loading='loading'>
      <!-- 审核弹框 -->
      <shenheForm :visible="shenHeVisible" :title="shenHeTitle" :fromInfo="curItem" @handleClose="closeEditFrom"></shenheForm>

      <el-form label-width="102px" ref="saveForm" :model="formData">
        <el-card shadow="hover">
          <el-divider content-position="left" class="max-divider">基本信息</el-divider>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="车商类型" prop="carDealerType">
                <el-select v-model="formData.carDealerType" size="small" disabled style="width:100%" placeholder="请选择车商类型">
                  <el-option v-for="(value, key, index ) in DEALER_TYPE" :key="key" :label="value" :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-if="formData.carDealerType">
              <el-form-item label="店铺名称" prop="shopName">
                <el-input v-model="formData.shopName" readonly size="small" placeholder="请输入店铺名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-if="formData.shopName">
              <el-form-item label="车商名称" prop="carDealerName">
                <el-input v-model="formData.carDealerName" readonly size="small" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="cardItem">
          <el-divider content-position="left" class="max-divider">申请人信息</el-divider>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" size="small" readonly placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="formData.sex" size="small" disabled style="width:100%" placeholder="请选择">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="户籍" prop="censusRegister">
                <el-input v-model="formData.censusRegister" readonly size="small" placeholder="请输入户籍"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="formData.idCard" size="small" readonly maxlength="18" placeholder="请输入身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="现住地址" prop="address">
                <el-input v-model="formData.address" size="small" readonly placeholder="请输入现住地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="formData.phone" size="small" readonly maxlength="11" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="配偶姓名" prop="spouseName">
                <el-input v-model="formData.spouseName" size="small" readonly placeholder="请输入配偶姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="配偶联系电话" prop="spousePhone">
                <el-input v-model="formData.spousePhone" size="small" readonly placeholder="请输入配偶联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="配偶居住地" prop="spouseAddress">
                <el-input v-model="formData.spouseAddress" size="small" readonly placeholder="请输入配偶居住地"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="信息结果" prop="creditResult">
                <el-radio v-model="formData.creditResult" :disabled="formData.creditResult!=1" label="1">通过</el-radio>
                <el-radio v-model="formData.creditResult" :disabled="formData.creditResult!=2" label="2">关注</el-radio>
                <el-radio v-model="formData.creditResult" :disabled="formData.creditResult!=3" label="3">拒绝</el-radio>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="信息内容" prop="creditContext">
                <el-input v-model="formData.creditContext" type="textarea" readonly :rows="3" size="small" placeholder="请输入信息内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="cardItem">
          <el-divider content-position="left"><span class="divider-txt">车商账户</span></el-divider>
          <table class="bgTable" style="margin-bottom:20px;">
            <thead>
              <th class="tit" width="34%">开户行</th>
              <th class="tit" width="27%">账号</th>
              <th class="tit" width="27%">开户名</th>
              <!-- <th class="tit" width="12%">操作</th> -->
            </thead>
            <tr v-for="(item,index) in formData.creditGrantingBankVOList" :key="index">
              <td align="center" valign="middle">
                <el-form-item label-width="0px"  :prop="'creditGrantingBankVOList.' + index + '.openingBank'" :rules="{required: true, message: '开户行不能为空', trigger: 'change'}">
                  <el-input v-model="item.openingBank" placeholder="开户行"></el-input>
                </el-form-item>
              </td>
              <td align="center" valign="middle">
                <el-form-item label-width="0px"  :prop="'creditGrantingBankVOList.' + index + '.account'" :rules="{required: true, message: '账号不能为空', trigger: 'change'}">
                  <el-input v-model="item.account" placeholder="账号"></el-input>
                </el-form-item>
              </td>
              <td align="center" valign="middle">
                <el-form-item label-width="0px"  :prop="'creditGrantingBankVOList.' + index + '.accountName'" :rules="{required: true, message: '开户户名不能为空', trigger: 'change'}">
                  <el-input v-model="item.accountName" placeholder="开户名"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-card>
        <el-card shadow="hover" class="cardItem">
          <el-divider content-position="left" class="max-divider">企业信息</el-divider>
          <el-row :gutter="10">
            <el-row>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="店铺类型" prop="shopType">
                  <el-select v-model="formData.shopType" size="small" disabled clearable placeholder="请选择">
                    <el-option label="无实体店" value="no_physical_store"></el-option>
                    <el-option label="有实体店" value="has_physical_store"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.shopType==='has_physical_store'">
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="经营地址" prop="businessAddress">
                  <el-input v-model="formData.businessAddress" size="small" readonly placeholder="请输入经营地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="场地面积" prop="floorSpace">
                  <el-input v-model="formData.floorSpace" size="small" readonly placeholder="请输入场地面积"><template slot="append">㎡</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="年租金" prop="yearRent">
                  <el-input v-model="formData.yearRent" size="small" readonly placeholder="请输入年租金"><template slot="append">元</template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="工商类型" prop="vietinBanhType">
                  <el-select v-model="formData.vietinBanhType" size="small" disabled clearable placeholder="请选择">
                    <el-option label="无注册个体" value="unregistered_individual"></el-option>
                    <el-option label="工商注册" value="f_vietin_banh_register"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="formData.vietinBanhType==='f_vietin_banh_register'">
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="营业执照名称" label-width="120px" prop="businessLicenseName">
                  <el-input v-model="formData.businessLicenseName" size="small" readonly placeholder="请输入营业执照名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="统一机构代码" label-width="120px" prop="uniformMechanismCode">
                  <el-input v-model="formData.uniformMechanismCode" size="small" readonly placeholder="请输入统一机构代码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item label="注册资本" prop="registeredCapital">
                  <el-input v-model="formData.registeredCapital" size="small" readonly placeholder="请输入注册资本"><template slot="append">万元</template></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="成立日期" prop="dateOestablishment">
                <el-date-picker unlink-panels size="small" readonly v-model="formData.dateOestablishment" value-format="yyyy-MM-dd HH:mm:ss" placeholder="成立日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="股东人数" prop="shareholderQuantity">
                <el-input v-model.number="formData.shareholderQuantity" readonly type="number" size="small" placeholder="请输入股东人数"><template slot="append">人</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="员工数量" prop="employeeQuantity">
                <el-input v-model.number="formData.employeeQuantity" readonly type="number" size="small" placeholder="请输入员工数量金"><template slot="append">人</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="主营端层" prop="mainLayer">
                <el-checkbox-group v-model="formData.mainLayer">
                  <el-checkbox label="10万-"></el-checkbox>
                  <el-checkbox label="10-30万"></el-checkbox>
                  <el-checkbox label="30-50万"></el-checkbox>
                  <el-checkbox label="50万+"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>

          </el-row>
        </el-card>
        <el-card shadow="hover" class="cardItem">
          <el-divider content-position="left" class="max-divider">经营信息</el-divider>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="申请人对外担保情况" prop="applicantExternalGuarantee">
                <el-input v-model="formData.applicantExternalGuarantee" readonly type="textarea" :rows="3" size="small" placeholder="请输入申请人对外担保情况容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="企业对外担保情况" prop="enterpriseExternalGuarantee">
                <el-input v-model="formData.enterpriseExternalGuarantee" readonly type="textarea" :rows="3" size="small" placeholder="请输入企业对外担保情况"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="企业融资情况" prop="corporateFinance">
                <el-input v-model="formData.corporateFinance" type="textarea" readonly :rows="3" size="small" placeholder="请输入企业融资情况"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="经营情况简析" prop="brieanalysisOoperationSituation">
                <el-input v-model="formData.brieanalysisOoperationSituation" readonly type="textarea" :rows="3" size="small" placeholder="请输入经营情况简析"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="近三个月月均销售量" label-width="170px" prop="recentlyTrimesterMonthlyAverageSales">
                <el-input v-model.number="formData.recentlyTrimesterMonthlyAverageSales" readonly type="number" size="small" placeholder="请输入近三个月月均销售量"><template slot="append">单</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="近三个月月均分期单量" label-width="170px" prop="recentlyTrimesterMonthlyAverageFinancialOrders">
                <el-input v-model.number="formData.recentlyTrimesterMonthlyAverageFinancialOrders" readonly type="number" size="small" placeholder="请输入近三个月月均分期单量"><template slot="append">单</template></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-card>
        <el-card shadow="hover" class="cardItem">
          <el-divider content-position="left" class="max-divider">材料</el-divider>
          <Viewer :images="[]" :options="ViewerOptions">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="upImgBox">
                <el-card class="upImg" shadow="hover" :key="index" v-for="(item,index) in imgObj['1']">
                  <img class="elimg" alt="申请人身份证正面" v-lazy="item.filePath" :data-original='item.filePath'></img>
                </el-card>
                <el-card class="upImg" shadow="hover" v-if="!imgObj['1'].length">
                  <div class="enplty">暂无图片</div>
                </el-card>
                <div class="tip">申请人身份证正面</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="upImgBox">
                <el-card class="upImg" shadow="hover" :key="index" v-for="(item,index) in imgObj['2']">
                  <img class="elimg" alt="申请人身份证反面" v-lazy="item.filePath" :data-original='item.filePath'></img>
                </el-card>
                <el-card class="upImg" shadow="hover" v-if="!imgObj['2'].length">
                  <div class="enplty">暂无图片</div>
                </el-card>
                <div class="tip">申请人身份证反面</div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="upImgBox">
                <el-card class="upImg" shadow="hover" :key="index" v-for="(item,index) in imgObj['3']">
                  <img class="elimg" v-lazy="item.filePath" alt="营业执照" :data-original='item.filePath'></img>
                </el-card>
                <el-card class="upImg" shadow="hover" v-if="!imgObj['3'].length">
                  <div class="enplty">暂无图片</div>
                </el-card>
                <div class="tip">营业执照</div>
              </el-col>
            </el-row>

            <el-divider content-position="center">店面照</el-divider>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="upImgBox" v-for="(item,index) in imgObj['4']" :key="index">
                <el-card class="upImg" shadow="hover">
                  <img class="elimg" :key="item.filePath" alt="店面照" v-lazy="item.filePath" :data-original='item.filePath'></img>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="upImgBox">
                <el-card class="upImg" shadow="hover" v-if="!imgObj['4'].length">
                  <div class="enplty">暂无图片</div>
                </el-card>
              </el-col>
            </el-row>
            <el-divider content-position="center">其他</el-divider>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="upImgBox" v-for="(item,index) in imgObj['5']" :key="index">
                <el-card class="upImg" shadow="hover">
                  <img class="elimg" :key="item.filePath" alt="其他" v-lazy="item.filePath" :data-original='item.filePath'></img>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="upImgBox">
                <el-card class="upImg" shadow="hover" v-if="!imgObj['5'].length">
                  <div class="enplty">暂无图片</div>
                </el-card>
              </el-col>
            </el-row>
          </Viewer>
        </el-card>
        <el-card shadow="hover" class="cardItem">
          <el-divider content-position="left" class="max-divider">授信申请</el-divider>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item label="预授信额度" prop="applyForACreditLine">
                <el-input v-model.number="formData.applyForACreditLine" readonly type="number" size="small" placeholder="请输入预授信额度量"><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="授信申请说明" prop="creditApplicationDesc">
                <el-input v-model="formData.creditApplicationDesc" readonly type="textarea" :rows="3" size="small" placeholder="请输入授信申请说明"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-if="formData.status=='pass'">
              <el-form-item label="授信金额" prop="creditAmount">
                <el-input v-model.number="formData.creditAmount" readonly type="number" size="small" placeholder="授信金额"><template slot="append">元</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-if="formData.status=='pass'">
              <el-form-item label="有效截止日期" prop="deadlineForCreditExtension">
                <el-date-picker unlink-panels size="small" readonly v-model="formData.deadlineForCreditExtension" value-format="yyyy-MM-dd HH:mm:ss" placeholder="有效截止日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="cardItem">
          <el-divider content-position="left" class="max-divider">卡分期业务</el-divider>
          <el-row :gutter="10" class="dialog-infos" v-if="formData.kfqDealerId">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label style="width:128px">经销商名称：</label>
              <span>{{formData.kfqDealerName}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label style="width:128px">近6个月交易单量：</label>
              <span>{{formData.nearlySixMonthsTradeQuantity}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label style="width:128px">近6个月交易额：</label>
              <span>{{formData.nearlySixMonthsTradeVolume | number}} 元</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label style="width:128px">当前逾期客户数量：</label>
              <span>{{formData.overdueCustomerQuantity}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label style="width:128px">发生代偿客户数量：</label>
              <span>{{formData.compensatoryCustomerQuantity}}</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <label style="width:128px">代偿率：</label>
              <span>{{formData.compensatoryRate}}</span>
            </el-col>
          </el-row>
          <Empty description='暂未关联卡分期业务' v-else />
        </el-card>

        <el-card shadow="hover" class="cardItem" v-if="formData.status&&formData.status!=='to_submit'">
          <el-divider content-position="left" class="max-divider">审核信息</el-divider>
          <el-table :data="formData.creditGrantingLogVOList" border style="width: 100%">
            <el-table-column prop="auditResult" label="审核结果" width="180" align="center"></el-table-column>
            <el-table-column prop="auditDesc" label="审核说明" align="center"> </el-table-column>
            <el-table-column prop="operator" label="审核人" width="180" align="center"> </el-table-column>
            <el-table-column prop="createDate" label="审核时间" width="180" align="center"> </el-table-column>
          </el-table>
        </el-card>

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="beforClose">取消</el-button>
      <template v-if="!readonly && formData.status=='to_first_review'">
        <el-button type="primary" @click="visibleKfq=true" v-if="!formData.kfqDealerId">卡分期业务关联</el-button>
        <el-button type="warning" @click="_clearRelevanceKfqDealer()" v-else>取消管理卡分期经销商</el-button>
        <el-button type="danger" @click="_changeStatus('reject_pending_submission','驳回说明')">驳回</el-button>
        <el-button type="success" @click="_changeStatus('to_extend_credit','初审说明')">初审</el-button>
      </template>
      <template v-else-if="!readonly && formData.status=='to_extend_credit'">
        <el-button type="danger" @click="_changeStatus('no_pass','授信说明')">不通过</el-button>
        <el-button type="success" @click="_changeStatus('pass','授信说明')">通过</el-button>
      </template>
    </span>

    <!-- 关联卡分期经销商 -->
    <el-dialog title="卡分期业务关联" :visible.sync='visibleKfq' width="900px" append-to-body  :close-on-click-modal="false" :before-close="kfqHandleClose">
      <el-card shadow="hover" class="cardItem">
        <el-divider content-position="left" class="max-divider">卡分期业务</el-divider>
        <div class="kfq-search">
          <label>卡分期经销商名称</label>
          <el-input v-model="kfqDealerName" placeholder="请输入卡分期经销商名称查询" @keyup.enter.native="_kfqDealerList"></el-input>
          <el-button icon="el-icon-search" size="small" type="primary" class="search-btn" @click="_kfqDealerList">查询</el-button>
        </div>
        <el-table :data="kfqDealerData" border style="width: 100%" v-loading='kfqTableLoading'>
          <el-table-column prop="kfqDealerName" label="经销商名称" align="center"></el-table-column>
          <el-table-column prop="nearlySixMonthsTradeQuantity" label="近6个月交易单量" align="center"> </el-table-column>
          <el-table-column prop="nearlySixMonthsTradeVolume" label="近6个月交易额" align="center"> </el-table-column>
          <el-table-column prop="overdueCustomerQuantity" label="当前逾期客户数量" align="center"> </el-table-column>
          <el-table-column prop="compensatoryCustomerQuantity" label="发生代偿客户数量" align="center"> </el-table-column>
          <el-table-column prop="compensatoryRate" width="80" label="代偿率" align="center"></el-table-column>
          <el-table-column label="操 作" width="70" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="formData.kfqDealerId != scope.row.kfqDealerId" @click="_relevanceKfqDealer(scope.row)">关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>

  </el-dialog>
</template>

<script>
import UpLoad from 'components/UpLoad'
// import Preview from 'components/Preview'
import Viewer from 'components/viewer'
import shenheForm from './shenheForm'
import Empty from 'components/Empty'
import { creditGrantingDetail, creditGrantingSave, getCarDealerList, kfqDealerList, relevanceKfqDealer } from 'api/index'
import { filterParams, checkPhone, ViewerOptions } from 'utils/vx'
import { DEALER_TYPE } from '@/utils/menu'
import $vx from 'utils/vx'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    fromInfo: {
      type: Object,
    },
    readonly:{
      type: Boolean,
      default: false
    }
  },
  components: {
    UpLoad, shenheForm, Viewer, Empty
  },
  data() {
    return {
      loading: false,
      shenHeVisible: false,
      visibleKfq: false,
      curItem: {},
      shenHeTitle: '',
      userInfo: $vx.localStorage.getItem('user_info'),
      formData: { mainLayer: [], shopName: '', },
      DEALER_TYPE,
      ViewerOptions,
      coverImgArr: [],
      imgObj: { 1: [], 2: [], 3: [], 4: [], 5: [] },
      fujianNameObj: { 1: '申请人身份证正面', 2: '申请人身份证反面', 3: '营业执照', 4: '店面照（多张）', 5: '其他（多张）' },
      CarShoprArr: [],
      state: '',
      kfqDealerData: [], // 卡分期信息
      kfqDealerName: '',
      kfqTableLoading: false
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    checkPhone,
    // 图片预览
    clickImg(ele) {
      let img = document.getElementById(ele.id)
      img.click()
    },
    // 审核弹框
    _changeStatus(state, title) {
      this.shenHeVisible = true
      this.shenHeTitle = title
      let { id, carDealerId, version, midShopId, applyForACreditLine } = this.formData
      this.curItem = { status: state, id, carDealerId, version, midShopId, applyForACreditLine }
    },
    closeEditFrom(noRefresh) {
      this.shenHeVisible = false
      if (!noRefresh) {
        this.$emit('handleClose')
        this.formData = { mainLayer: [], shopName: '' }
        this.imgObj = { 1: [], 2: [], 3: [], 4: [], 5: [] }
      }
    },
    // 关闭
    beforClose() {
      this.$emit('handleClose', true) //参数 true，表示不刷新列表
      this.formData = { mainLayer: [], shopName: '' }
      this.imgObj = { 1: [], 2: [], 3: [], 4: [], 5: [] }
      this.kfqDealerData = []
    },
    // 详情
    async _creditGrantingDetail(_id) {
      this.imgObj = { 1: [], 2: [], 3: [], 4: [], 5: [] }
      let params = { id: _id }
      this.loading = true
      let res = await creditGrantingDetail(params)
      this.loading = false
      if (res.code == 0) {
        let { creditGrantingAttachmentVOList, mainLayer, ...other } = res.data
        if (mainLayer) {
          mainLayer = mainLayer.indexOf(',') < 0 ? [mainLayer] : mainLayer.split(',')
        } else {
          mainLayer = []
        }

        creditGrantingAttachmentVOList = creditGrantingAttachmentVOList ? creditGrantingAttachmentVOList : []
        if (creditGrantingAttachmentVOList.length) {
          creditGrantingAttachmentVOList.map((ele) => {
            if (this.imgObj[ele.attachmentType]) {
              this.imgObj[ele.attachmentType] = [...this.imgObj[ele.attachmentType], ele]
            } else {
              this.imgObj[ele.attachmentType] = [ele]
            }
          })
        }

        this.formData = { mainLayer, ...other }
        // console.log(this.imgObj);
      }
    },
    // 获取卡分期经销商信息
    async _kfqDealerList() {
      let params = { kfqDealerName: this.kfqDealerName.trim(), id: this.fromInfo.id };
      this.kfqDealerData = []
      this.kfqTableLoading = true;
      let res = await kfqDealerList(params);
      this.kfqTableLoading = false
      if (res.code == 0) {
        this.kfqDealerData = res.data
      }
    },
    // 关联卡分期经销商
    async _relevanceKfqDealer(item) {
      let params = { ...item, id: this.fromInfo.id, version: this.formData.version }
      let res = await relevanceKfqDealer(params)
      if (res.code == 0) {
        this._creditGrantingDetail(this.fromInfo.id)
        this.$message({ type: 'success', message: "关联成功！" });
        this.kfqHandleClose()
      }
    },
    // 取消关联卡分期
    _clearRelevanceKfqDealer(){
      this.$confirm('此操作将取消关联卡分期经销商, 是否继续?', '提示', {}).then(()=>{
        this._relevanceKfqDealer({})
      }).catch(()=>{})
    },
    // 卡分期 关闭
    kfqHandleClose(){
      this.visibleKfq = false;
      this.kfqDealerName = '';
      this.kfqDealerData = [];
    }
  },
  watch: {
    visible(newVal, oldVla) {
      if (newVal) {
        let arms = Object.keys(this.fromInfo)
        if (arms.length > 0) {
          this._creditGrantingDetail(this.fromInfo.id)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enplty {
  height: 153px;
  line-height: 150px;
}
.cardItem {
  margin-top: 30px;
  .upImgBox {
    text-align: center;
    margin-bottom: 14px;
    .upImg {
      width: 100%;
      position: relative;
      .elimg {
        max-height: 150px;
        min-height: 150px;
        max-width: 100%;
      }
      i {
        font-size: 24px;
        position: absolute;
        top: 15px;
        right: 15px;
        color: #ccc;
        cursor: pointer;
        &:hover {
          font-weight: bold;
          color: #000;
          font-weight: bold;
        }
      }
    }
    .tip {
      text-align: center;
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
}
.kfq-search{
  padding-bottom: 20px;
  label{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box
  }
  .el-input{
    width: 60%;
  }
  .search-btn{
    float: right;
    margin-top: 4px;
  }
}
</style>