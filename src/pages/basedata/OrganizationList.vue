// src\components\system\organization\index.vue
<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <template v-if='name === "organizationList"'>
          <router-link v-if="$menuPermission('basedata/org/our/list')" tag="li" to="our">本公司组织</router-link>
          <li class="on">全部组织</li>
        </template>
        <template v-else-if="name === 'OrganizationOur'">
          <li class="on">本公司组织</li>
          <router-link v-if="$menuPermission('basedata/org/alllist/list')" tag="li" to="list">全部组织</router-link>
        </template>
        <router-link v-if="$menuPermission('basedata/org/selfdetail')" tag="li" to="self">所属组织信息</router-link>
      </ul>
      <el-button
        class="right-btn"
        v-if="$menuPermission('basedata/org/alllist/editorg') && name === 'organizationList'"
        type="primary"
        size="long"
        @click="handleAddSubset()"
      >+ 新增集团组织</el-button>
    </div>
    <!-- system-search -->
    <div class="system-search" v-if="name === 'organizationList'">
      <div class="search-item">
        <div class="label">组织名称</div>
        <el-input v-model="searchName" placeholder="组织名称"/>
      </div>
      <div class="search-item">
        <div class="label">组织类型</div>
        <el-select v-model="searchOrgType" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option :label="val" :value="key" :key="key" v-for="(val, key) in orgTypeMap"/>
        </el-select>
      </div>
      <div class="search-item long">
        <div class="label">状态</div>
        <el-select v-model="searchOrgDisabled" placeholder="全部">
          <el-option label="全部" value="100"/>
          <el-option :label="val" :value="key" :key="key" v-for="(val, key) in disabledMap"/>
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <ExpandTable
          :name='name'
          :table-data="tableData"
          :org-type-map="orgTypeMap"
          :disabled-map="disabledMap"
          @actionOrg="handleActionOrg"
        />
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog
      :title="form.id?'编辑':'新增'"
      width="600px"
      :visible.sync="dialogFormVisible"
      :show-close="!isSubmit"
      :close-on-click-modal="false"
    >
      <div class="form-content">
        <h3 v-if="orgTypeMap[form.org_type] == '营业部'">营业部信息</h3>
        <el-form :model="form" label-width="140px">
          <el-form-item label="组织类型" required>
            <el-select v-if="Array.isArray(canSelectOrgTypes)" v-model="form.org_type" placeholder="请选择" :disabled="!!form.id">
              <el-option v-for="org_type in canSelectOrgTypes" :key="org_type" :label="orgTypeMap[org_type]" :value="org_type"/>
            </el-select>
            <span v-else><i class="el-icon-loading" />加载中</span>
          </el-form-item>
          <el-form-item label="组织名称" required>
            <el-input v-model="form.name" auto-complete="off"/>
          </el-form-item>
          <template v-if="orgTypeMap[form.org_type] && orgTypeMap[form.org_type] != '部门'">
            <el-form-item label="所在城市" required>
              <el-select class="nation-select fl" v-model="form.nation" auto-complete="off">
                <el-option label="中国" value="中国"/>
              </el-select>
              <select-area class="area-select fl" value-key="area_name" v-model="area" clearable />
            </el-form-item>
            <el-form-item label="电话" prop="taxpayer_num" v-if="orgTypeMap[form.org_type] == '营业部'">
              <el-input v-model="form.mobile" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="统一社会信用代码" v-else required>
              <el-input v-model="form.taxpayer_num" auto-complete="off"/>
            </el-form-item>            
            <!-- <el-form-item label="小能商户ID" prop="xn_mer_id">
              <el-input v-model="form.xn_mer_id" auto-complete="off"/>
            </el-form-item> -->
            <el-form-item label="所在经纬度">
              <el-input class="w-30" v-model="form.longitude" auto-complete="off"/>
              - 
              <el-input class="w-30" v-model="form.latitude" auto-complete="off"/>
              <a class="color-purple" href="javascript:;" @click="showBaiduMap=!showBaiduMap">选择经纬度</a>
            </el-form-item>
            <baidu-map v-model="mapPoint" class="mb5" v-show="showBaiduMap" />
            <template v-if="orgTypeMap[form.org_type] == '营业部'">
              <el-form-item label="营业时间" prop="business_hours">
                <el-input v-model="form.business_hours" auto-complete="off"/>
              </el-form-item>
            </template>
            <el-form-item label="业务章" v-else required>
              <el-upload
                class="seal-uploader"
                action="/bom/api/orgination/upload_seal"
                :data="sealUploadData"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="handleBeforeUpload">
                <a
                  v-if="form.seal_path"
                  :href="form.seal_path"
                  target="_blank"
                  class="seal-pic"
                  :style="'background-image:url(' + form.seal_path + ')'"
                  @click.stop
                >
                  <a href="javascript:;" class="el-icon-close" @click.stop.prevent="form.seal_path=''"/>
                </a>
                <el-button type="primary">上传业务章</el-button>
                <div slot="tip" class="color-gray">图片要求：png文件格式，透明背景，不能超过300*300px</div>
              </el-upload>
            </el-form-item>
          </template>
        </el-form>
        <el-form label-width="140px" v-if="orgTypeMap[form.org_type] == '营业部'">
          <h3>结算信息</h3>          
          <el-form-item label="开户名" required>
            <el-input v-model="yybData.account_name" :disabled="true" />
          </el-form-item>
          <el-form-item label="银行" required>
            <el-input v-model="yybData.bank_name" :disabled="true" />
          </el-form-item>
          <el-form-item label="卡号" required>
            <el-input v-model="yybData.bank_code" :disabled="true" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button v-show="!isSubmit" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="isSubmit" @click="handleSaveOrgin">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="disabledForm.type" :visible.sync="disabledForm.show" size="tiny">
      <div class="form-content" v-if="disabledForm.type == '禁用'">
        <div class="el-form-item">禁用该组织机构后，该组织机构的所有下级组织将同时禁用，确定禁用？</div>
      </div>
      <div class="form-content" v-else>
        <div class="el-form-item">若需要同时启用所有下级组织机构，请勾选：</div>
        <div class="el-form-item"><el-checkbox v-model="disabledForm.isAll">同时启用所有下级组织机构</el-checkbox></div>
      </div>
      <div slot="footer">
        <el-button @click="disabledForm.show = false">取 消</el-button>
        <el-button type="primary" @click="handleDisabledOrginAct">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 禁用新弹窗 -->
    <!-- <el-dialog title="禁用转移" :visible.sync="disabledForm.show" style="width: 100%;" @close="handleCloseDialog">
      <div class="system-search" style="padding: 0; padding-left: 10px;">
        <div class="search-item" style="padding-left: 0;">
          <el-input v-model="search.sale_name" placeholder="输入销售名称"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="handleSearchFun">搜索</el-button>
        </div>
      </div>
      <div style="padding: 0 0 10px;">
        <el-button @click="handleCanSellProduct('')">可售</el-button>
        <el-button @click="handleNoSellProduct('')">不可售</el-button>
      </div>
      <el-table 
        :data="saleList" 
        border 
        style="width: 100%"  
        ref="multipleTable">
        <el-table-column></el-table-column>
        <el-table-column label="销售名称" align="center" prop="org_name" />
        <el-table-column label="手机号" align="center" prop="org_name" />
        <el-table-column label="客户数量" align="center" prop="org_name" />
      </el-table>
      <div class="page" v-if="saleList">
        <el-pagination  layout="total, prev, pager, next, jumper" :page-size="5" :total="channel_total_page" :current-page="search.page" @current-change="channelCurrentPageChange"></el-pagination>
      </div>
    </el-dialog> -->
    <!-- 禁用新弹窗-结束 -->

    <!--授信配置-->
    <el-dialog title="授信配置" :visible.sync="creditDlg.show" size="tiny">
      <div class="form-content">
        <el-form label-width="110px">
          <el-form-item label="当前授信额度">
            {{ creditDlg.data.credit_line }}
          </el-form-item>
          <el-form-item label="授信额度" required>
            <input-number  v-model="creditDlg.creditLine" :min="0" :max="999999999" class="max-w250"/>
          </el-form-item>
          <div class="tac clearfix">
            可下单金额=授信额度+余额-未收款 = {{ creditValidPrice }}
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="creditDlg.show = false">取 消</el-button>
        <el-button type="primary" @click="handleCreditLine('save')">确 定</el-button>
      </span>
    </el-dialog>
    <!--中行账户配置-->
    <el-dialog title="中行账户配置" :visible.sync="bocDlg.show" @close='handleBocConf(0)'>
      <div class="form-content">
        <el-form
          :model="bocDlg.form"
          :rules="bocDlg.rules"
          ref="refBocDlg"
          label-width="110px">
          <el-form-item label="组织名称">
            {{bocDlg.form.org_name}}
          </el-form-item>
          <el-form-item label="银行">
            中国银行
          </el-form-item>
          <el-form-item label="开户名" required prop="trn_name">
            <el-input v-model="bocDlg.form.trn_name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="账号" required prop="trnid">
            <el-input v-model="bocDlg.form.trnid" auto-complete="off" />
          </el-form-item>
          <el-form-item label="开户行" required prop="trn_bknm">
            <el-input v-model="bocDlg.form.trn_bknm" auto-complete="off" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleBocConf(0)">取 消</el-button>
        <el-button type="primary" @click="handleBocConf(2)">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrginations,
  getNextOrginationTypes,
  createOrgination,
  updateOrgination,
  disabledOrg,
  getCreditConfigure 
} from 'src/api/api'
import {
  addSelfOrg,
  editSelfOrg,
  disabledSelfOrg,
  selfDel,
  delOrg,
  getBocConfig,
  editBocConfig,
  currentOrgList
} from 'src/api/orgination'
import { addCreditLine } from 'src/api/finance'
import { toFixed } from 'src/utils/format';
import OrgExpandTable from './components/OrgExpandTable'
import BaiduMap from './components/BaiduMap'
import SelectArea from 'src/plugins/SelectArea.vue'
import InputNumber from 'src/plugins/InputNumber'

import { getTissueDetail } from 'src/api/shop'



export default {
  name: 'OrginationList',
  components: {
    ExpandTable: OrgExpandTable,
    BaiduMap,
    SelectArea,
    InputNumber
  },
  watch: {
    $route() {
      this.name = this.$route.name;
      this.getList(true);
    }
  },
  data() {
    return {
      yybData: {
        account_name: "",
        bank_name: "",
        bank_code: ""
      },
      name: this.$route.name,
      orgTypeMap: {},
      disabledMap: [],
      landingFinanceMap: [],
      searchName: this.$route.query.name || '',
      searchOrgType: this.$route.query.org_type == null ? '1' : this.$route.query.org_type,
      searchLandingFinance: '',
      searchOrgDisabled: this.$route.query.disabled || '100',
      searchData: {
        name: '',
        org_type: '1',
        disabled: '100',
        page: parseInt(this.$route.query.page) || 1,
        page_size: 10
      },
      tableData: [],
      dialogFormVisible: false,
      showBaiduMap: false,
      form: { },
      disabledForm: {
        id: '',
        show: false,
        type: '',
        isAll: false
      },
      canSelectOrgTypes: false, // 可选组织类型，false：加载中
      isSubmit: false,
      // formErrMsg: '',
      totalPage: parseInt(this.$route.query.page) || 1,
      pageShow: true,
      creditDlg: {
        show: false,
        creditLine: 0,
        org: {},
        data: {}
      },
      bocDlg:{
        show: false,
        form:{
          org_id: '',
          org_name: '',
          trnid: '',
          trn_name: '',
          trn_bknm: ''
        },
        rules:{
          trn_name: [{
            required: true, message: '开户名不能为空'
          }],
          trnid: [{
            required: true, message: '账号不能为空'
          }],
          trn_bknm: [{
            required: true, message: '开户行不能为空'
          }],
        }
      },
    }
  },
  computed:{
    creditValidPrice() {
      const { creditLine, data: { fund_balance, rmb_unreceipted_amount } } = this.creditDlg;
      let value = Number(creditLine) + fund_balance - rmb_unreceipted_amount;

      return value ? Number(toFixed(value, 3)) : 0;
    },
    mapPoint: {
      get () {
        if (!this.showBaiduMap) {
          // 设置非0初始值，避免展开时标记点不在中心位置
          return {lng: 0, lat: 1}
        }
        return {
          lng: this.form.longitude,
          lat: this.form.latitude
        }
      },
      set (val) {
        if (!this.showBaiduMap) {
          return
        }
        if (val) {
          this.form.longitude = val.lng || 0
          this.form.latitude = val.lat || 0
        } else {
          this.form.longitude = 0
          this.form.latitude = 0
        }
      }
    },
    area: {
      get () {
        return {
          area_0: this.form.province,
          area_1: this.form.city,
          area_2: this.form.country
        }
      },
      set (val) {
        if (val) {
          this.form.province = val.area_0 || ''
          this.form.city = val.area_1 || ''
          this.form.country = val.area_2 || ''
        } else {
          this.form.province = ''
          this.form.city = ''
          this.form.country = ''
        }
      }
    },
    sealUploadData() {
      return {org_id: this.form.id}
    }
  },
  mounted() {
    this.getList(true);
  },
  methods: {
    getInitForm () {
      return {
        org_type: '',
        name: '',
        p_id: '0',
        id: '',
        nation: '中国',
        province: '',
        city: '',
        country: '',
        taxpayer_num: '',
        mobile: '',
        seal_path: '',
        longitude: '',
        latitude: '',
        business_hours: ''
      }
    },
    getList(isSearch){
      if(isSearch){
        this.searchData.name = this.searchName || '';
        this.searchData.org_type = this.searchOrgType || '';
        this.searchData.landing_finance = this.searchLandingFinance || '';
        this.searchData.disabled = this.searchOrgDisabled;
        this.searchData.page = parseInt(this.$route.query.page) || 1;
        this.$router.replace({query: this.searchData});
      }else{
        this.searchName = this.searchData.name;
        this.searchOrgType = this.searchData.org_type;
        this.searchLandingFinance = this.searchData.landing_finance;
        this.searchOrgDisabled = this.searchData.disabled;
      }
      let func = this.name === 'organizationList' ? getOrginations : currentOrgList
      func(({
        params: {data: this.searchData},
        success:(resp) => {
          let { code, data, msg } = resp['data'];

          if(code == 0){
            this.tableData = data && data.list;
            this.totalPage = (data && data.total_pages) || 1;
            this.orgTypeMap = data && data.org_type || {};
            this.landingFinanceMap = data && data.landing_finance || [];
            this.disabledMap = data && data.org_disabled || [];
            //console.log(this.tableData);
          }else{
            this.$message.error(msg);
          }
          
        },
        showLoading: true
      }))
    },
    updateOrg(){
      const func = this.form.is_self ? editSelfOrg : updateOrgination
      func({
        params: {data: this.form},
        success: (resp) => {
          let {code, msg, data} = resp.data; 

          if(code == 0){
            this.getList();
            this.$message.success('修改成功');
            this.dialogFormVisible = false;
          }else{
            this.$message.error(msg);
            // this.formErrMsg = msg;
          }
          this.isSubmit = false;
        },
      })
    },
    createOrg(){
      const func = this.form.is_self ? addSelfOrg : createOrgination
      func({
        params: {data: this.form},
        success: (resp) => {
          let {code, msg, data} = resp.data; 

          if(code == 0){
            this.getList();
            this.$message.success('创建成功');
            this.dialogFormVisible = false;
          }else{
            this.$message.error(msg);
            // this.formErrMsg = msg;
          }
          this.isSubmit = false;
        }
      })
    },
    handleAddSubset(data) {
      // const form = this.$refs['orgForm'];

      // if(form){
      //   form.resetFields();
      // }
      this.dialogFormVisible = true;
      this.showBaiduMap = false;
      // this.formErrMsg = '';
      this.form = this.getInitForm()
      // this.form = {
      //   name: '', 
      //   p_id: '0', 
      //   org_type: ''
      // };

      if(!data){ // 新增集团组织
        this.canSelectOrgTypes = ['1'];
        this.form.org_type = '1';
        return false;
      }

      this.form.p_id = data.id;
      // 新增组织时是否调用self接口根据其上级决定，默认使用非self接口
      this.form.is_self = data.is_self; // 保持和上级一样的is_self
      this.canSelectOrgTypes = false;
      getNextOrginationTypes({
        params: {data: {id: data.id}},
        success: (resp)=>{
          let { code, data, msg } = resp['data'];
          let canSelectOrgTypes = []

          if(code == 0){
            if(!Array.isArray(data)){
              data = Object.keys(data);
            }
            canSelectOrgTypes = data;
            this.form.org_type = data[0] || '';
          }else{
            this.$message.error(msg);
          }
          this.canSelectOrgTypes = canSelectOrgTypes;
        }
      })

      // console.log('click add subset', this.form);
    },
    handleEditOrgin(data) {
      // const form = this.$refs['orgForm'];
      
      // if(form){
      //   form.resetFields();
      // }

      // 是否是营业部

      // console.log(data);

      if(data.org_type == 5){
        let params = {
          data: {
            id: data.id
          }
        }
        getTissueDetail({
          params,
          success: (resp) => {
            let {code, msg, data} = resp.data; 
            if(code == 0){
              console.log(data)
              this.yybData.account_name = data.account_name;
              this.yybData.bank_name = data.bank_name;
              this.yybData.bank_code = data.bank_code;

            }else{
              this.$message.error(msg);
            }
          }
        })
      }
      

      this.dialogFormVisible = true;
      this.showBaiduMap = false;
      // this.formErrMsg = '';
      this.form = {
        ...data
        // id: data.id, 
        // name: data.name, 
        // p_id: data.p_id, 
        // org_type: data.org_type
      };
      this.form.longitude = Number(this.form.longitude) || ''
      this.form.latitude = Number(this.form.latitude) || ''
      this.canSelectOrgTypes = [data.org_type];
    },
    handleDelOrgin(data){
      this.$confirm('删除组织后对相关业务产生影响，请慎重操作确定删除该组织？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const func = data.is_self ? selfDel : delOrg
        func({
          params: {data: {id: data.id}},
          success: (resp) => {
            let {code, msg, data} = resp.data; 
            
            if(code == 0){
              this.getList(true);
              this.$message.success('删除成功');
            }else{
              // this.$message.error(msg);
              this.$message.error(msg);
            }
          },
          showLoading: true
        })
      }).catch((e) => {
        console.log('cancel del', e)      
      });
    },
    handleCurrentChange(page){  
      if(this.searchData.page != page){
        this.searchData.page = page;
        this.$router.replace({query: this.searchData});
        this.getList();
      }
      //console.log(arguments);
    },
    handleDisabledOrgin(data){
      if(data){

        this.disabledForm.show = true;
        this.disabledForm.type = data.disabled == 0 ? '禁用' : '启用';
        this.disabledForm.id = data.id;
        this.disabledForm.data = data;
        this.disabledForm.isAll = true;
      }
    },
    handleDisabledOrginAct(){
      const {id, type, isAll, data} = this.disabledForm;
      const func = data.is_self ? disabledSelfOrg : disabledOrg

      this.disabledForm.show = false;
      func({
        params: {data: {
          id, 
          disabled: type == '启用' ? 1 : 2, 
          all: isAll ? 2 : 1
        }},
        success: (resp) => {
          let {code, msg, data} = resp.data; 
          
          if(code == 0){
            this.getList(true);
            this.$message.success(type + '成功');
          }else{
            // this.$message.error(msg);
            this.$message.error(msg);
          }
        },
        showLoading: true
      })
    },
    handleActionOrg(type, data) {
      // console.log('data handleActionOrg', type, data)
      switch(type) {
      case 'disabled':
        this.handleDisabledOrgin(data);
        break;
      case 'edit':
        this.handleEditOrgin(data);
        break;
      case 'del':
        this.handleDelOrgin(data);
        break;
      case 'newSubset':
        this.handleAddSubset(data);
        break;
      case 'creditLine':
        this.handleCreditLine('show', data);
        break;
      case 'bocConf':
        this.handleBocConf(1,data);
        break;
      }
    },
    handleUploadSuccess(res, file){
      // console.log('success', res, file);
      if(res.code == 0){
        this.form.seal_path = res.data.seal_path;
      }else{
        this.$message.error('上传失败：' + res.msg);
      }
    },
    handleBeforeUpload(file){
      const isPNG = file.type === 'image/png';

      // console.log('success', file);
      if (!isPNG) {
        this.$message.error('业务章只能是 png 格式!');
      }
      return isPNG;
    },
    handleSaveOrgin(){
      console.log('handleSaveOrgin')
      // 未获取到可选择组织机构列表时不允许提交
      if(this.canSelectOrgTypes == false){
        this.$message.error('组织类型获取中，请稍后操作');
        return false;
      }
      console.log(this.form)
      if (!this.form.seal_path && this.form.org_type != 4 && this.form.org_type != 5) {
        this.$message.error('业务章不能为空')
        return false;
      } else if (!this.form.taxpayer_num && this.form.org_type != 4 && this.form.org_type != 5) {
        this.$message.error('统一社会信用代码不能为空')
        return false;
      } else if (!this.form.org_type_str && !this.form.org_type) {
        this.$message.error('组织类型不能为空')
        return false;
      } else if (!this.form.city && this.form.org_type != 4 ) {
        this.$message.error('市不能为空')
        return false;
      } else if (!this.form.name) {
        this.$message.error('组织名称不能为空')
        return false;
      } else if (!this.form.nation && this.form.org_type != 4) {
        this.$message.error('国家不能为空')
        return false;
      } else if (!this.form.province && this.form.org_type != 4) {
        this.$message.error('省不能为空')
        return false;
      }
      if(this.form.id){
        this.updateOrg();
      }else{
        this.createOrg();
      }

      // this.formErrMsg = ''; // 清除操作失败错误提示信息
      // this.$refs['orgForm'].validate((valid) => {
      //   if (valid) {
      //     this.isSubmit = true;
      //     if(this.form.id){
      //       this.updateOrg();
      //     }else{
      //       this.createOrg();
      //     }
      //   } else {
      //     return false;
      //   }
      // });
    },
    handleCreditLine(type, org) {
      if (type == 'save') {
        addCreditLine({
          params: {data: {
            settlement_org_id: this.creditDlg.org.id,
            credit_line: this.creditDlg.creditLine
          }},
          success: (resp) => {
            let {code, msg, data} = resp.data; 

            if(code == 0){
              // this.getList();  // 授信额度没在页面展示，可以不刷新列表
              this.$message.success('配置成功');
              this.creditDlg.show = false;
            }else{
              this.$message.error(msg);
            }
          }
        })
      } else {
        this.creditDlg.org = org
        getCreditConfigure({
          params: {data: { settlement_org_id: org.id }},
          success: (resp) => {
            let {code, msg, data} = resp.data; 

            if(code == 0){
              this.creditDlg.show = true;
              this.creditDlg.data = data;
              this.creditDlg.creditLine = data.credit_line;
            }else{
              this.$message.error(msg);
            }
          }
        })
      }
    },
    handleBocConf(sequence,datas){
      if(sequence == 0){
        this.bocDlg.show = false;
        this.$refs.refBocDlg.resetFields();
      }else if(sequence == 1){
        this.bocDlg.show = true;
        getBocConfig({
          params: {data: { org_id: datas.id }},
          success: (resp) => {
            let {code, msg, data} = resp.data; 
            if(code == 0){
              this.bocDlg.form.org_id = data.org_id;
              this.bocDlg.form.org_name = data.org_name;
              this.bocDlg.form.trnid = data.trnid;
              this.bocDlg.form.trn_name = data.trn_name;
              this.bocDlg.form.trn_bknm = data.trn_bknm;
            }else if(code == 40001){
              this.$message(msg);
              this.bocDlg.form.org_id = datas.id;
              this.bocDlg.form.org_name = datas.name;
            }else{
              this.$message.error(msg);
            }
          }
        });
      }else if(sequence == 2){
        this.$refs.refBocDlg.validate(result =>{
          if(!result){
            return false;
          }
          editBocConfig({
            params: {data: this.bocDlg.form},
            success: (resp) => {
              let {code, msg, data} = resp.data; 
              if(code == 0){
                this.$message.success(msg);
                this.bocDlg.show = false;
                this.getList(true);
              }else{
                this.$message.error(msg);
              }
            }
          });
        });
      }
    }
  },
  destory() {

  }
}
</script>

<style scoped lang="scss">
.right-btn{
    position: absolute;
    right: 15px;
    top: 6px;
}

.form-content {

  .el-form {
    .el-input, .el-select {
      width: 90%;
    }
    .w-30 {
      width: 30%;
    }
    .nation-select{
      width: 21.9%;
      margin-right: 0.3%;
    }
    .area-select {
      width: 68%;
      overflow: hidden;
      height: 36px;
    }
    .el-form-item {
      margin-bottom: 12px;
    }
    .mb5 {
      margin-bottom: 5px;
    }
  }
  .seal-uploader {
    line-height: 1.5;
    padding: 5px 0;
  }
  .seal-pic {
    position: relative;
    display: inline-block;
    vertical-align: bottom;
    margin-right: 10px;
    overflow: hidden;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: 50%;
    .el-icon-close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 6px;
      background-color: rgba(0,0,0,.8);
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
