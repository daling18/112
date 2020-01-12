<template>
  <div class="wrapper page-jurisdictionConfig">
    <div class="system-content" v-show="partOri">
      <div class="button-bar">
				<el-button
					type='primary'
          @click="handleCopy(true)">
          复制权限
        </el-button>
				<el-button
					type='primary'
          @click="handleBatch">
          批量设置
        </el-button>
      </div>
      <div class="table-head">
        <div class="left">
          数据列表
        </div>
        数据权限
      </div>
      <div class="table-list clearfix">
        <div class="l1">
          <span style="height:639px">计调操作</span>
          <span style="height:319px">分销中心</span>
          <span style="height:159px">自营单项</span>
          <span style="height:119px">财务操作</span>
        </div>
        <div class="l2">
          <span>线路行程</span>
          <span style="height:79px">团控中心</span>
          <span>团队订单</span>
          <span style="height:239px">单项订单</span>
          <span style="height:239px">自营订单</span>
          <span style="height:279px">我的订单</span>
          <span>采购订单</span>
          <span>门票套餐</span>
          <span>房型套餐</span>
          <span>签证产品</span>
          <span>农特优产品</span>
          <span style="height:79px">发票管理</span>
          <span>中行账户</span>
        </div>
        <div class="l3">
          <div class="l"
            v-for="(o,i) in tableData"
            :key="i">
            <b>{{allData.data_type_arr[o.data_type]}}</b>
            <template v-if="!isSepacialRow(o.data_type)">
            <el-checkbox v-model="o.is_org" :true-label=1 :false-label=0 class="c1">全公司</el-checkbox>
            <el-checkbox v-model="o.is_department" :true-label=1 :false-label=0>全部门</el-checkbox>
            <el-checkbox v-model="o.is_defined" :true-label=1 :false-label=0>自定义</el-checkbox>
            </template>
            <el-checkbox v-else v-model="o.is_defined" :true-label=1 :false-label=0 class="c1">自定义</el-checkbox>
            <em class="oper"
              :class="o.is_defined ? '' : 'dis'"
              @click="handleDefined(i)">
              选择</em>
            <em class="longs"
              v-if="o.names && o.names != ''"
              :title="o.namesEll">
              [<i v-for="(o2,i2) in o.names"
                :key="i2">{{o2}}</i>]
            </em>
          </div>
        </div>
      </div>
      <div class="foot-btn submit-buttons">
        <el-button type="primary" @click="submit()" size="large">保存</el-button>
        <el-button @click="$router.go(-1)" size="large">返回</el-button>
      </div>
    </div>
    <div class="system-content" v-show="!partOri">
      <div class="button-bar clearfix flex">
        <div class="flex-1 ellipsis">
          选择权限范围：
          <el-checkbox v-model="batch.org"
            :true-label=1
            :false-label=0>
            全公司
          </el-checkbox>
          <el-checkbox v-model="batch.dep"
            :true-label=1
            :false-label=0>
            全部门
          </el-checkbox>
          <el-checkbox v-model="batch.def"
            :true-label=1
            :false-label=0>
            自定义
          </el-checkbox>
          <em class="oper"
            :class="batch.def ? '' : 'dis'"
            @click="handleBatchDefined(true)">
            选择</em>
          <span class="f12 color-gray" v-if="batch.namesEll" :title="batch.namesEll">
            [{{ batch.namesEll }}]
          </span>
        </div>
        <el-button
          @click="handleBatch(false)">
          取消
        </el-button>
        <el-button
          type='primary'
          @click="handleBatchSubmit">
          保存
        </el-button>
      </div>
      <ul class="batch-ul">
        <li>数据列表</li>
        <li>
          <el-checkbox v-model="batch.selectAll"
            :indeterminate="batch.isIndeterminate"
            @change="handleBatchCb(0)">
            全选
          </el-checkbox>
        </li>
        <li v-for="(o,i) in batchList" v-show="!isSepacialRow(o.id)" :key="i">
          <el-checkbox v-model="o.checked"
            @change="handleBatchCb(1)">
            {{o.name}}
          </el-checkbox>
        </li>
      </ul>
    </div>
    <!--自定义弹窗-->
    <el-dialog title="自定义看其他人的数据"
      :visible.sync="dialogDefinedVisible"
      :close-on-click-modal=false
      :close-on-press-escape=false>
      <div class="diag-defined-con"
        v-loading.body="dialogLoading"
        v-if="tableData.length > 0">
        <el-radio-group  @change="handleRadio"
          v-model="tableData[tableIdx].defined_type">
          <el-radio :label="1" v-if="!isSepacialRow(tableData[tableIdx] && tableData[tableIdx].data_type)">自定义人</el-radio>
          <el-radio :label="2">自定义公司</el-radio>
        </el-radio-group>
        <template>
          <div class="dia-select-container"
            v-show="tableData[tableIdx].defined_type == 1">
            <div class="area-box">
              <el-input class="serh"
                v-model="selectSearchKeyword"
                @focus="serhFocus"
                @blur="serhBlur"
                @change="serhChange" />
              <div class="org-box"
                v-show="selectOrgShow">
                <expand-table
                  :tableData="rootOrg"
                  :source="sourceName"
                  @orgItem="handleOrgItem" />
              </div>
            </div>
            <div class="result-box">
              <div class="result-inside"
                v-loading="loadingResult">
                <el-checkbox :indeterminate="isIndeterminate"
                  v-model="selectOrgListCheckAll"
                  @change="handleOrgListCheckAllChange"
                  v-if="selectOrgList.length > 0">
                  全选
                </el-checkbox>
                <el-checkbox-group v-model="selectOrgListCheckVal"
                  @change="handleOrgListItemChange">
                  <el-checkbox v-for="(o,i) in selectOrgList" 
                    :label="o.id"
                    :key="i">
                    {{o.show_name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="dia-select-container dia-select-container2"
            v-show="tableData[tableIdx].defined_type == 2">
            <el-input class="serh"
              v-model="selectSearchKeyword2"
              @change="serhChange2" />
            <div class="result-box">
              <div class="result-inside"
                v-loading="loadingResult">
                <el-checkbox :indeterminate="isIndeterminate2"
                  v-model="selectOrgListCheckAll2"
                  @change="handleOrgListCheckAllChange"
                  v-if="selectOrgList2.length > 0">
                  全选
                </el-checkbox>
                <el-checkbox-group v-model="selectOrgListCheckVal2"
                  @change="handleOrgListItemChange">
                  <el-checkbox v-for="(o,i) in selectOrgList2" 
                    :label="o.id"
                    :key="i">
                    {{o.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="dia-select-none"
            v-show="tableData[tableIdx].defined_type != 1 && tableData[tableIdx].defined_type != 2">
            请选择类别
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDefined(false)">取 消</el-button>
        <el-button @click="handleDefined('submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/自定义弹窗-->
    <!--批量设置自定义弹窗-->
    <el-dialog title="自定义看其他人的数据"
      :visible.sync="dialogBatchDefinedVisible"
      :close-on-click-modal=false
      :close-on-press-escape=false>
      <div class="diag-defined-con"
        v-loading.body="dialogLoading"
        v-if="tableData.length > 0">
        <el-radio-group  @change="handleRadio"
          v-model="batch.defType">
          <el-radio :label=1>自定义人</el-radio>
          <el-radio :label=2>自定义公司</el-radio>
        </el-radio-group>
        <template>
          <div class="dia-select-container"
            v-show="batch.defType == 1">
            <div class="area-box">
              <el-input class="serh"
                v-model="selectSearchKeyword"
                @focus="serhFocus"
                @blur="serhBlur"
                @change="serhChange" />
              <div class="org-box"
                v-show="selectOrgShow">
                <expand-table
                  :tableData="rootOrg"
                  :source="sourceName"
                  @orgItem="handleOrgItem" />
              </div>
            </div>
            <div class="result-box">
              <div class="result-inside"
                v-loading="loadingResult">
                <el-checkbox :indeterminate="isIndeterminate"
                  v-model="selectOrgListCheckAll"
                  @change="handleOrgListCheckAllChange"
                  v-if="selectOrgList.length > 0">
                  全选
                </el-checkbox>
                <el-checkbox-group v-model="selectOrgListCheckVal"
                  @change="handleOrgListItemChange">
                  <el-checkbox v-for="(o,i) in selectOrgList" 
                    :label="o.id"
                    :key="i">
                    {{o.show_name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="dia-select-container dia-select-container2"
            v-show="batch.defType == 2">
            <el-input class="serh"
              v-model="selectSearchKeyword2"
              @change="serhChange2" />
            <div class="result-box">
              <div class="result-inside"
                v-loading="loadingResult">
                <el-checkbox :indeterminate="isIndeterminate2"
                  v-model="selectOrgListCheckAll2"
                  @change="handleOrgListCheckAllChange"
                  v-if="selectOrgList2.length > 0">
                  全选
                </el-checkbox>
                <el-checkbox-group v-model="selectOrgListCheckVal2"
                  @change="handleOrgListItemChange">
                  <el-checkbox v-for="(o,i) in selectOrgList2" 
                    :label="o.id"
                    :key="i">
                    {{o.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleBatchDefined(false)">取 消</el-button>
        <el-button @click="handleBatchDefined('submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/批量设置自定义弹窗-->
    <!--复制权限弹窗-->
    <el-dialog title="复制用户的数据权限"
      :visible.sync="dialogCopyVisible"
      size="large">
      <div class="diag-copy-con">
        <SelectOrg v-model="orgination"
          placeholder="请输入姓名下拉选择"
          :defaultList="copyOrgList"/>
        <div class="box"
          v-loading="loadingResult">
          <div class="null"
            v-if="copyTableDataInfo">
            {{copyTableDataInfo}}
          </div>
          <div class="table-list copy-table"
            v-else-if="copyTableData && copyTableData.length > 0">
            <div class="l1">
              <span style="height:639px">计调操作</span>
              <span style="height:319px">分销中心</span>
              <span style="height:159px">自营单项</span>
              <span style="height:119px">财务操作</span>
            </div>
            <div class="l2">
              <span>线路行程</span>
              <span style="height:79px">团控中心</span>
              <span>团队订单</span>
              <span style="height:239px">单项订单</span>
              <span style="height:239px">自营订单</span>
              <span style="height:279px">我的订单</span>
              <span>采购订单</span>
              <span>门票套餐</span>
              <span>房型套餐</span>
              <span>签证产品</span>
              <span>农特优产品</span>
              <span style="height:79px">发票管理</span>
              <span>中行账户</span>
            </div>
            <div class="l3">
              <div class="l"
                v-for="(o,i) in copyTableData"
                :key="i">
                <b>{{allData.data_type_arr[o.data_type]}}</b>
                <template v-if="!isSepacialRow(o.data_type)">
                <el-checkbox v-model="o.is_org" :true-label=1 :false-label=0 class="c1" disabled>全公司</el-checkbox>
                <el-checkbox v-model="o.is_department" :true-label=1 :false-label=0 disabled>全部门</el-checkbox>
                <el-checkbox v-model="o.is_defined" :true-label=1 :false-label=0 disabled>自定义</el-checkbox>
                </template>
                <el-checkbox v-else v-model="o.is_defined" :true-label=1 :false-label=0 class="c1" disabled>自定义</el-checkbox>
                <em class="longs"
                  v-if="o.names && o.names != ''"
                  :title="o.namesEll">
                  [<i v-for="(o2,i2) in o.names"
                    :key="i2">{{o2}}</i>]
                </em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCopy(false)">取 消</el-button>
        <el-button @click="handleCopy('submit')" type="primary">复 制</el-button>
      </span>
    </el-dialog>
    <!--/复制权限弹窗-->
  </div>
</template>

<script>
import {
  dataPermissionConfig, 
  addDataPermissionConfig, 
  getUsersByName,
  copyDataPermissionConfig,
  batchAddDataPermissionConfig,
  selfDataPermissionConfig,
  addSelfDataPermissionConfig,
  copySelfDataPermissionConfig,
  batchAddSelfDataPermissionConfig
} from 'src/api/user';
import {
  getRootOrgs,
  getCompanyOrgs
} from 'src/api/orgination';
import {
  get_org_operator,
} from "src/api/approval";
import ExpandTable from "../organization/ExpandTable.comp";
import SelectOrg from "./SearchSelectName.vue";
export default {
  data() {
    return {
      id: this.$route.query.id,
      allData: {},
      rootOrg: [],
      tableData: [],
      tableIdx: 0,
      dialogDefinedVisible: false,
      selectSearchKeyword: "",
      sourceName: "sysApprovalGain",
      selectOrgShow: true,
      selectOrgList: [],
      selectOrgListCheckAll: false,
      selectOrgListCheckValOrigin: [],
      selectOrgListCheckVal: [],
      isIndeterminate: false,
      selectSearchKeyword2: "",
      selectOrgList2: [],
      selectOrgListCheckAll2: false,
      selectOrgListCheckValOrigin2: [],
      selectOrgListCheckVal2: [],
      isIndeterminate2: false,
      dialogLoading: false,
      loadingResult: false,
      dialogCopyVisible: false,
      copyUserId: '',
      copyUserName: '',
      copyOrgList: [],
      copyTableData: [],
      copyTableDataInfo: '',
      partOri: true,
      batch:{
        org: 0,
        dep: 0,
        def: 0,
        defType: 1,
        defOpIds: '',
        defOrgIds: '',
        selectAll: false,
        isIndeterminate: false,
        names: [],
        namesEll: ''
      },
      batchList:[],
      dialogBatchDefinedVisible: false,
    };
  },
  components: {
    SelectOrg,
    ExpandTable
  },
  watch: {
    copyUserId(val){
      this.loadingResult = true;
      let para = {
        data:{
          user_id: val
        }
      };
      dataPermissionConfig({
        params: para,
        success: (res) => {
          let {code, data, msg} = res.data;
          this.loadingResult =false;
          if(data.config_arr.length == 0){
            this.copyTableDataInfo = '该用户没有配置过数据权限';
          }else {
            this.copyTableData = [];
            for(let i in data.data_type_arr){
              this.copyTableData.push({
                data_type: parseInt(i), 
                name: data.data_type_arr[i],
                is_org: 0,
                is_department: 0,
                is_defined: 0,
                defined_type: 0,
                defined_op_ids: '',
                defined_org_ids: '',
                names: []
              });
            }
            for(let i=0; i<this.copyTableData.length; i++){
              for(let j=0; j< data.config_arr.length; j++){
                if(this.copyTableData[i].data_type === data.config_arr[j].data_type){
                  this.copyTableData[i] = data.config_arr[j];
                  break;
                }
              }
              if(Array.isArray(this.copyTableData[i].names)) {
                this.copyTableData[i].namesEll = this.copyTableData[i].names.join(' ');
              }
            }
          }
        }
      });
    },
    // 'batch.defType'(val){  // 保留和非批量一致，不进行清空
    //   if(val == 1){
    //     this.batch.defOrgIds = '';
    //   }else{
    //     this.batch.defOpIds = '';
    //     this.isIndeterminate2 = false;
    //   }
    // }
  },
  computed:{
    // 处理结算方数据填充
    orgination: {
      get: function() {
        let org = null;
        if (this.copyUserId) {
          return {
            user_id: this.copyUserId,
            username: this.copyUserName
          };
        }
        return org;
      },
      set: function(val) {
        val = val || {};
        this.copyUserId = val.user_id;
        this.copyUserName = val.username;
      }
    },
    isSelf () {
      return this.$route.name == 'accountSelfJurisdictionConfig'
    }
  },
  methods: {
    isSepacialRow(dataType) {  
      // 特殊行: 中行余额不支持是批量操作，数据权限部分显示设置且defined_type = 2
      if (dataType == 31) {
        return true
      }
      return false;
    },
    initPageFn() {
      let para = {
        data:{
          user_id: this.id
        }
      };
      this.batchList = []
      dataPermissionConfig({
        params: para,
        success: (res) => {
          let {code, data, msg} = res.data;
          this.allData = data;

          for(let i in this.allData.data_type_arr){
            let li ={
              name: this.allData.data_type_arr[i],
              id: i,
              checked: false
            }
            this.batchList.push(li)
            let val = {
              data_type: parseInt(i), 
              name: this.allData.data_type_arr[i],
              is_org: 0,
              is_department: 0,
              is_defined: 0,
              defined_type: 0,
              defined_op_ids: '',
              defined_org_ids: '',
              names: []
            };
            this.tableData.push(val);
          }
          for(let i=0; i<this.tableData.length; i++){
            for(let j=0; j<this.allData.config_arr.length; j++){
              if(this.tableData[i].data_type === this.allData.config_arr[j].data_type){
                this.tableData[i] = this.allData.config_arr[j];
              }
            }
            if(this.tableData[i].names != undefined && this.tableData[i].names.length > 0){
              let ell = '';
              for(let j=0; j<this.tableData[i].names.length; j++){
                ell += this.tableData[i].names[j] + ' ';
              }
              this.tableData[i].namesEll = ell;
            }
          }
        },
        showLoading: true
      });
      getRootOrgs({
        params: {
          data: {}
        },
        success: (res) => {
          let {code, data, msg} = res.data;
          this.rootOrg = data;
        },
        showLoading: true
      });
    },
    getIdArr(str) {
      let arr = []

      if (str) {
        str.split(',').forEach(id => {
          let idNum = id && Number(id);

          if (idNum) {
            arr.push(idNum)
          }
        })
      }
      return arr
    },
    handleCopy(bool){
      if(bool === false){
        this.dialogCopyVisible = false;
        this.copyUserId = '';
        this.copyUserName = '';
      }else if(bool === true){
        this.dialogCopyVisible = true;
      }else if(bool === 'submit'){
        const func = this.isSelf ? copySelfDataPermissionConfig : copyDataPermissionConfig
        let para = {
          data: {
            user_id: this.id,
            copy_user_id: this.copyUserId,
          }
        };
        func({
          params: para,
          success: res => {
            let { code, data, msg } = res.data;
            if (code == 0) {
              this.$message.success(msg);
              this.initPageFn();
              this.dialogCopyVisible = false;
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      }
    },
    handleBatch(bool){
      if(bool){
        this.partOri = false;
        this.batch = {
          org: 0,
          dep: 0,
          def: 0,
          defType: 1,
          defOpIds: '',
          defOrgIds: '',
          selectAll: false,
          names: [],
          namesEll: ''
        }
        this.batchList.forEach(type => {
          type.checked = false
        })
      }else{
        this.partOri = true;
      }
    },
    handleBatchCb(val){
      if(val === 0){
        if(this.batch.selectAll){
          this.batchList.forEach(v=>{
            v.checked = true;
            this.batch.isIndeterminate = false;
          });
        }else{
          this.batchList.forEach(v=>{
            v.checked = false;
            this.batch.isIndeterminate = false;
          });
        }
      }else{
        let checkCount = 0;
        this.batchList.forEach(item => {
          if (item.checked) {
            checkCount++;
          }
        })
        this.batch.selectAll = this.batchList.length == checkCount
        this.batch.isIndeterminate = checkCount > 0 && !this.batch.selectAll;
      }
    },
    handleBatchDefined(status){
      if(status === true && this.batch.def == 1){
        const selectOrgList = [];
        const selectOrgList2 = [];
        
        this.selectSearchKeyword = '';
        this.isIndeterminate = false;
        this.selectSearchKeyword2 = '';
        this.isIndeterminate2 = false;
        this.dialogBatchDefinedVisible = true;

        if(this.batch.defType == 2){
          this.selectOrgListCheckVal2 = this.getIdArr(this.batch.defOrgIds)
          this.getCompAsync('');
        } else {
          this.selectOrgListCheckVal = this.getIdArr(this.batch.defOpIds)
          if (this.selectOrgListCheckVal.length) {
            const names = this.batch.names
            this.selectOrgListCheckAll = true;
            this.selectOrgListCheckVal.forEach((userid, idx) => {
              if (userid && names[idx]) {
                selectOrgList.push({
                  id: userid,
                  show_name: names[idx],
                  user_id: userid,
                  username: names[idx]
                })
              }
            })
          }
        }
        this.selectOrgList = selectOrgList
        this.selectOrgList2 = selectOrgList2

      }else if(status === false){
        this.dialogBatchDefinedVisible = false;
      }else if(status === 'submit'){
        const nameArr = []

        if(this.batch.defType == 1){
          let newArr = this.selectOrgList.filter(val => {
            for (var i = 0; i < this.selectOrgListCheckVal.length; i++) {
              if (val.id == this.selectOrgListCheckVal[i]) {
                return val;
              }
            }
          });
          this.selectOrgList = [];
          this.selectSearchKeyword = '';
          let opStr = '';
          newArr.forEach(v=>{
            if(v.name){
              nameArr.push(v.name);
            }else if(v.username){
              nameArr.push(v.username);
            }
            opStr += v.id + ',';
          });
          this.batch.defOpIds = opStr;
          this.batch.defOrgIds = '';
        }else{
          let newArr = this.selectOrgList2.filter(val => {
            for (var i = 0; i < this.selectOrgListCheckVal2.length; i++) {
              if (val.id == this.selectOrgListCheckVal2[i]) {
                return val;
              }
            }
          });
          this.selectOrgList2 = [];
          this.selectSearchKeyword2 = '';
          let orgStr = '';
          newArr.forEach(v=>{
            nameArr.push(v.name);
            orgStr += v.id + ',';
          });
          this.batch.defOpIds = '';
          this.batch.defOrgIds = orgStr;
        }
        this.batch.names = nameArr
        this.batch.namesEll = nameArr.join(' ')
        this.dialogBatchDefinedVisible = false;
      }
    },
    handleBatchSubmit(){
      const func = this.isSelf ? batchAddSelfDataPermissionConfig : batchAddDataPermissionConfig
      let batArr = [];
      this.batchList.forEach(v=>{
        if(v.checked){
          batArr.push(v.id);
        }
      });
      let para = {
        data: {
          user_id: this.id,
          data_types: batArr,
          is_org: this.batch.org,
          is_department: this.batch.dep,
          is_defined: this.batch.def,
          defined_type: this.batch.def == 0 ? 0 : this.batch.defType,
          defined_op_ids: this.batch.defOpIds,
          defined_org_ids: this.batch.defOrgIds,
        }
      };
      func({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.$message.success(msg);
            this.initPageFn();
            this.partOri = true
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleDefined(idx){
      if(idx === false){
        this.dialogDefinedVisible = false;
      }else if(!isNaN(idx) && Boolean(this.tableData[idx].is_defined)){
        const selectOrgList = [];
        const selectOrgList2 = [];

        this.dialogDefinedVisible = true;
        this.tableIdx = idx;
        this.selectSearchKeyword = '';
        this.isIndeterminate = false;
        this.selectSearchKeyword2 = '';
        this.isIndeterminate2 = false;
        if(this.tableData[idx].defined_type == 2){
          this.selectOrgListCheckVal = []
          this.selectOrgListCheckVal2 = this.getIdArr(this.tableData[idx].defined_org_ids)
          this.getCompAsync('');
        } else {
          this.selectOrgListCheckVal = this.getIdArr(this.tableData[idx].defined_op_ids)
          this.selectOrgListCheckVal2 = []
          if (this.selectOrgListCheckVal.length) {
            const names = this.tableData[idx].names
            const valOrigin = []
            this.selectOrgListCheckAll = true;
            this.selectOrgListCheckVal.forEach((userid, idx) => {
              if (userid && names[idx]) {
                selectOrgList.push({
                  id: userid,
                  show_name: names[idx],
                  user_id: userid,
                  username: names[idx]
                })
                valOrigin.push(userid)
              }
            })
            this.selectOrgListCheckValOrigin = valOrigin;
          }
        }
        this.selectOrgList = selectOrgList
        this.selectOrgList2 = selectOrgList2
      }else if(idx === 'submit'){
        if(this.tableData[this.tableIdx].defined_type == 1){
          let newArr = this.selectOrgList.filter(val => {
            for (var i = 0; i < this.selectOrgListCheckVal.length; i++) {
              if (val.id == this.selectOrgListCheckVal[i]) {
                return val;
              }
            }
          });
          this.selectOrgList = [];
          this.selectSearchKeyword = '';
          let nameArr = [],
            opStr = '';
          newArr.forEach(v=>{
            if(v.name){
              nameArr.push(v.name);
            }else if(v.username){
              nameArr.push(v.username);
            }
            opStr += v.id + ',';
          });
          this.tableData[this.tableIdx].names = nameArr;
          this.tableData[this.tableIdx].defined_op_ids = opStr;
          this.tableData[this.tableIdx].defined_org_ids = '';
        }else{
          let newArr = this.selectOrgList2.filter(val => {
            for (var i = 0; i < this.selectOrgListCheckVal2.length; i++) {
              if (val.id == this.selectOrgListCheckVal2[i]) {
                return val;
              }
            }
          });
          this.selectOrgList2 = [];
          this.selectSearchKeyword2 = '';
          let nameArr = [],
            orgStr = '';
          newArr.forEach(v=>{
            nameArr.push(v.name);
            orgStr += v.id + ',';
          });
          this.tableData[this.tableIdx].names = nameArr;
          this.tableData[this.tableIdx].defined_op_ids = ''; 
          this.tableData[this.tableIdx].defined_org_ids = orgStr; 
        }
        let ell = '';
        this.tableData[this.tableIdx].names.forEach(v=>{
          ell += v + ' ';
        });
        this.tableData[this.tableIdx].namesEll = ell;
        this.dialogDefinedVisible = false;
      }
    },
    // 自定义人部分
    // 发起人请求接口事件
    handleOrgItem(row) {
      this.loadingResult = true;
      let para = {
        data: {
          org_id: row.id,
        }
      };
      get_org_operator({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.loadingResult = false;
            this.selectOrgList = data;
            this.isIndeterminate = false;
            this.selectOrgListCheckAll = false;
            this.selectOrgListCheckValOrigin = [];
            this.selectOrgList.forEach(val => {
              this.selectOrgListCheckValOrigin.push(val.id);
            });
            this.selectOrgListCheckVal = [];
          } else {
            this.$message.error(msg);
          }
        },
      });
    },
    handleOrgListItemChange(value) {
      let checkCount = value.length;  
      if(this.tableData[this.tableIdx].defined_type == 1){
        this.selectOrgListCheckAll =
          checkCount === this.selectOrgListCheckValOrigin.length;
        this.isIndeterminate =
          checkCount > 0 && checkCount < this.selectOrgListCheckValOrigin.length;
      }else{
        this.selectOrgListCheckAll2 =
          checkCount === this.selectOrgListCheckValOrigin2.length;
        this.isIndeterminate2 =
          checkCount > 0 && checkCount < this.selectOrgListCheckValOrigin2.length;
      }
    },
    // 人员选择全选
    handleOrgListCheckAllChange(event) {
      if(this.tableData[this.tableIdx].defined_type == 1){
        this.selectOrgListCheckVal = event.target.checked
          ? this.selectOrgListCheckValOrigin
          : [];
        this.isIndeterminate = false;
      }else{
        this.selectOrgListCheckVal2 = event.target.checked
          ? this.selectOrgListCheckValOrigin2
          : [];
        this.isIndeterminate2 = false;
      }
    },
    // 搜索相关
    serhFocus() {
      this.selectOrgShow = false;
    },
    serhBlur() {
      this.selectOrgShow = true;
    },
    serhChange(value) {
      this.loadingResult = true;
      let definedVal = this.tableData[this.tableIdx].defined_type == 1 ? 0 : 1;
      let para = {
        data: {
          type: 0,
          name: value
        }
      };
      getUsersByName({
        params: para,
        success: res => {
          this.loadingResult = false;
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.selectOrgList = data;
            this.selectOrgListCheckAll = false;
            this.selectOrgListCheckValOrigin = [];
            this.selectOrgList.forEach(val => {
              val.check = false;
              val.id = val.user_id;
              val.show_name = val.username;
              this.selectOrgListCheckValOrigin.push(val.id);
            });
            this.selectOrgListCheckVal = [];
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    // 自定义公司部分
    getCompAsync(keyword){
      let para = {
        data: {
          name: keyword
        }
      };

      this.loadingResult = true;
      getCompanyOrgs({
        params: para,
        success: res => {
          this.loadingResult = false;
          let { code, data, msg } = res.data;
          if (code == 0) {
            const checkLen = this.selectOrgListCheckVal2.length
            const isCheckAll = checkLen > 0 && checkLen == data.length

            this.selectOrgList2 = data;
            this.selectOrgListCheckAll2 = isCheckAll;
            //  console.log('checklen: ', checkLen, isCheckAll, this.selectOrgListCheckVal2)
            this.isIndeterminate2 = checkLen > 0 && !isCheckAll;
            // this.selectOrgListCheckVal2 = [];
            this.selectOrgListCheckValOrigin2 = [];
            this.selectOrgList2.forEach(val => {
              val.check = false;
              this.selectOrgListCheckValOrigin2.push(val.id);
            });
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    handleRadio(value){
      if(value == 2){
        this.getCompAsync('');
      }
    },
    serhChange2(value) {
      this.selectOrgListCheckAll2 = []
      this.isIndeterminate2 = false
      this.getCompAsync(value);
    },
    submit(){
      const func = this.isSelf ? addSelfDataPermissionConfig : addDataPermissionConfig
      this.tableData.forEach(v=>{
        if(v.is_defined == 0){
          v.defined_type = 0;
        }
      });
      let para = {
        data: {
          user_id: this.id,
          config_arr: this.tableData
        }
      };
      func({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
  },
  mounted() {
    this.initPageFn();
  }
};
</script>

<style scoped lang="scss">
.f12{
  font-size: 12px;
}
.flex{
  align-items: center;
}
.system-header {
  margin-bottom: 10px; 
  padding: 15px;
  background: #fff;
}
.system-content{
  background: #fff;
  padding: 10px;
}
.button-bar{
  line-height: 30px;
}
.table-head{
  line-height: 40px;
  border: 1px solid #ccc;
  color: #999;
  background: #f4f4f4;
  padding-left: 240px;
  margin-top: 10px;
  .left{
    float: left;
    margin-left: -290px;
    margin-right: 20px;
    padding-right: 40px;
    text-align: right;
    width: 320px;
    border-right: 1px solid #ccc;
  }
}
.table-list{
  line-height: 39px;
  border: 1px solid #ccc;
  border-top: none;
  margin-top: -1px;
  padding-left: 200px;
  em,i{
    font-style: normal;
  }
  .l1{
    float: left;
    width: 79px;
    margin-left: -200px;
    border-right: 1px solid #ccc;
    height: 100%;
  }
  .l2{
    float: left;
    width: 119px;
    margin-left: -120px;
    border-right: 1px solid #ccc;
  }
  span, .l{
    display: block;
    border-top: 1px solid #ccc;
    padding: 0 9px 0 10px;
  }
  .l3{
    b{
      display: inline-block;
      font-weight: 400;
      width: 100px;
      border-right: 1px solid #ccc;
    }
    .c1{
      margin-left: 12px;
    }
  }
  .l{
    height: 39px;
    overflow: hidden;
  }
  .longs{
    font-size: 12px;
    color: #999;
    margin-left: 5px;
    i{
      margin: 0 2px;
    }
  }
}
.oper{
  font-style: normal;
  color: #b10c79;
  text-decoration: underline;
  cursor: pointer;
  &.dis{
    color: #ccc;
    cursor: default;
  }
}
.copy-table{
  margin-top: 0;
}
// dia-select-container
.dia-select-container {
  border: 1px solid #ccc;
  margin-top: 15px;
  padding-left: 300px;
  height: 350px;
  overflow: hidden;
  border-radius: 2px;
  .area-box {
    float: left;
    width: 279px;
    height: 330px;
    background: #fff;
    border-right: 1px solid #ccc;
    margin-left: -300px;
    padding: 10px;
  }
  .org-box {
    height: 278px;
    border: 1px solid #ccc;
    border-radius: 2px;
    margin-top: 10px;
    overflow-y: auto;
  }
  .result-box {
    float: left;
    width: 100%;
    .el-checkbox {
      display: block;
      padding: 3px 0;
      margin-bottom: 2px;
      &:hover {
        background: #eee;
      }
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0;
    }
  }
  .result-inside{
    margin: 10px;
    height: 330px;
    overflow: auto;
  }
}
.dia-select-container2 {
  padding: 10px;
  height: 330px;
  .result-inside{
    height: 285px;
  }
}
.dia-select-none{
  color: #999;
  text-align: center;
  border: 1px solid #ccc;
  margin-top: 15px;
  padding-top: 150px;
  height: 200px;
  overflow: hidden;
  border-radius: 2px;
}
.diag-copy-con{
  .box{
    margin-top: 10px;
    // border: 1px solid #bfcbd9;
    // border-radius: 2px;
    height: 200px;
    overflow-y: auto;
    // padding: 15px;
  }
  .null{
    text-align: center;
    color: #bfcbd9;
    margin-top: 90px;
  }
}
.submit-buttons{
  margin-top: 20px;
}
.batch-ul{
  border: 1px solid #ccc;
  margin-top: 10px;
  li{
    border-top: 1px solid #ccc;
    line-height: 30px;
    padding: 0 15px;
    &:first-child{
      border-top: none;
      background: #f4f4f4;
    }
  }
}
</style>
