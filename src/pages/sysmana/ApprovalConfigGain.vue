// src\components\system\approval\gain.vue
<template>
  <div class="wrapper" >
    <div class="system-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="form-gain">
        <div class="mod-form">
          <div class="form-content">
            <el-form-item label="审批类型" class="mb15" prop="approval_type">
              <el-col :span="16">
                <el-select v-model="ruleForm.approval_type" placeholder="请选择">
                  <el-option v-for="(o,i) in allData.approval_types"
                    :key="i"
                    :label="o"
                    :value="i" />
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="线路类别"
              prop="org_name"
              v-show="ruleForm.approval_type == 1">
              <div class="ltype">
                <div class="line-wrap"
                  v-for="(item, index) in allData.line_types"
                  :key="index">
                  <div class="line-one">
                    <el-checkbox v-model="item.check"
                      @change="handleCheck(1, item)"
                      :indeterminate="item.isIndeterminate" />
                    <span class="line-tit">{{item.name}}</span>
                  </div>
                  <div class="line-two"
                    v-for="(item2, index2) in item.children"
                    :key="index2">
                    <el-checkbox v-model="item2.check"
                      @change="handleCheck(2, item2)"
                      :indeterminate="item2.isIndeterminate" />
                    <span class="line-tit po">
                      <span class="arror"
                        :class="item2.showchild ? 'd' : 'rotate'"
                        @click="showChild(index,index2)"
                        v-if="item2.children && item2.children.length > 0"></span>
                      {{item2.name}}
                    </span>
                    <div class="line-three clearfix"
                      v-show="item2.children && item2.children.length > 0 && item2.showchild">
                      <span class="line-item"
                        v-for="(item3, index3) in item2.children"
                        :key="index3">
                        <el-checkbox v-model="item3.check"
                          @change="handleCheck(3, item3)"
                          :indeterminate="item3.isIndeterminate" />
                          <span class="line-tit">
                            {{item3.name}}
                          </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="发起人"
              prop="start_type"
              class="mb15"
              v-show="varStartType.length != 0">
              <el-col :span="24">
                <el-radio v-model="ruleForm.start_type"
                  v-for="(o,i) in varStartType" 
                  :key="i" 
                  :label="o">
                  <span v-show="o == '0'">
                    不限
                  </span>
                  <span v-show="o == '1'">
                    外部公司
                  </span>
                  <span v-show="o == '2'">
                    指定到本公司的员工
                  </span>
                </el-radio>
              </el-col>
              <el-col :span="16"
                v-show="ruleForm.start_type == '2'"
                style="margin-top: 10px">
                <div class="mix">
                  <i v-for="(o,i) in this.selectOrgFinalArr"
                    :key="i"
                    @click="handleDelMember(o,'faqiren')">
                    {{o.name}}
                  </i>
                </div>
              </el-col>
              <el-col :span="8"
                v-show="ruleForm.start_type == '2'"
                style="margin-top: 10px">
                <el-button type="primary" class="ml10" @click="handleSelectMember(1,'open')">添加</el-button>
                <el-button type="button"
                  @click="handleCleanMember(1)">
                  清空选项
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="付款类型" class="pay-radio" v-show="ruleForm.approval_type == TYPES.pay && ruleForm.start_type == TYPES.outCompany">
              <el-radio-group v-model="payType">
                <el-radio v-for="item in payTypeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group >
            </el-form-item>
             <el-form-item label="产品类型" class="pay-radio" v-show="ruleForm.approval_type == TYPES.pay && ruleForm.start_type == TYPES.outCompany">
              <el-radio-group v-model="productType">
                <el-radio v-for="item in productTypeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group >
            </el-form-item>
            <el-form-item label="是否需要审批"
              prop="need_approval">
              <el-col :span="24">
                <el-radio v-model="ruleForm.need_approval" label='1'>
                  需要审批
                </el-radio>
                <el-radio v-if="ruleForm.approval_type != 7" v-model="ruleForm.need_approval" label='2'>
                  不需要审批
                </el-radio>
              </el-col>
            </el-form-item>
            <el-form-item label="审批人"
              v-show="ruleForm.need_approval == 1">
              <div v-for="(o,i) in allData.end_staffs"
                :key="i">
                <el-col :span="21">
                  <div class="spbox">
                    <div class="btn-box">
                      <el-button type="primary"  @click="handleSelectMember(2,'open',i)">添加</el-button>
                      <el-button type="button"
                        @click="handleCleanMember(2,i)">
                        清空选项
                      </el-button>
                    </div>
                    <span class="lv">第{{i + 1}}级</span>
                    <!-- <span class="lv">
                      第
                      <span v-show="i == 0">
                        一
                      </span>
                      <span v-show="i == 1">
                        二
                      </span>
                      <span v-show="i == 2">
                        三
                      </span>
                      级
                    </span> -->
                    <div class="con-box">
                      <el-input class="ipt"
                        v-model="o.level_name"
                        placeholder="输入审批组名称" />
                      <div class="mix mt10">
                        <i v-for="(o2,i2) in selectOrgFinalArr2[i]"
                          :key="i2"
                          @click="handleDelMember(o2,'shengpiren',i)">
                          {{o2.name}}  
                        </i>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="ico-box">
                    <i class="add" @click="addSpItem"></i>
                    <i class="sub" @click="subSpItem(i)"></i>
                  </div>
                </el-col>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="sub-buttons">
        <el-button type="primary" @click="submitForm('ruleForm')" size="large" :disabled="submitBtnDisable">保存</el-button>
        <el-button @click="$router.go(-1)" size="large" >取消</el-button>
      </div>
    </div>
    <!--选择发起人审批人弹窗-->
    <el-dialog :title="selectTitle"
      :visible.sync="dialogSelectVisible"
      :close-on-click-modal=false
      :close-on-press-escape=false>
      <div class="dia-select-container">
        <div v-show="selectSequence == 1">
          <div class="area-box">
            <el-input class="serh"
              v-model="selectSearchKeyword"
              @focus="serhFocus"
              @blur="serhBlur"
              @change="serhChange" />
            <div class="org-box"
              v-show="selectOrgShow">
              <expand-table
                :tableData="allData.start_org"
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
                  <template v-if="shortNameStatus">
                    {{o.name}}
                  </template>
                  <template v-else>
                    {{o.show_name}}
                  </template>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div v-show="selectSequence == 2">
          <div class="area-box">
            <el-input class="serh"
              v-model="selectSearchKeyword2"
              @focus="serhFocus"
              @blur="serhBlur"
              @change="serhChange" />
            <div class="org-box"
              v-show="selectOrgShow">
              <expand-table
                :tableData="allData.end_org"
                :source="sourceName"
                @orgItem="handleOrgItem" />
            </div>
          </div>
          <div class="result-box">
            <div class="result-inside"
              v-loading="loadingResult">
              <el-checkbox :indeterminate="isIndeterminate2"
                v-model="selectOrgListCheckAll2"
                @change="handleOrgListCheckAllChange2"
                v-if="selectOrgList2.length > 0">
                全选
              </el-checkbox>
              <el-checkbox-group v-model="selectOrgListCheckVal2"
                @change="handleOrgListItemChange2">
                <el-checkbox v-for="(o,i) in selectOrgList2" 
                  :label="o.id"
                  :key="i">
                  <template v-if="shortNameStatus2">
                    {{o.name}}
                  </template>
                  <template v-else>
                    {{o.show_name}}
                  </template>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSelectMember(selectSequence,'close')">取 消</el-button>
        <el-button @click="handleSelectMember(selectSequence,'submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/选择发起人审批人弹窗-->
    <!--清空选项弹窗-->
    <el-dialog title="清空选项"
      :visible.sync="dialogCleanVisible"
      :close-on-click-modal=false
      :close-on-press-escape=false
      size="tiny">
      <div class="cdia">
        确认清空{{cleanTxt}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClean('cancel')">取 消</el-button>
        <el-button @click="handleClean('submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/清空选项弹窗-->
  </div>
</template>

<script>
import {
  approval_config_form,
  search_org_operator,
  get_org_operator,
  edit_approval_config
} from 'src/api/approval';
import { getNextOrginations } from 'src/api/api';
import ExpandTable from './components/ExpandTable.vue';
export default {
  components: {
    ExpandTable
  },
  data() {
    return {
      origin: {
        id: "",
        service_type: ""
      },
      allData: {
        approval_types: {},
        line_types: {
          name: ""
        }
      },
      varStartType: [],
      loadApproval:{
        type: null,
        val: null
      },
      ruleForm: {
        id: this.$route.query.id,
        approval_type: "",
        line_types: [],
        start_type: "",
        start_staffs: [],
        need_approval: "",
        end_staffs: []
      },
      rules: {
        approval_type: [
          {
            required: true,
            message: "请选择审批类型",
            trigger: "blur"
          }
        ],
        start_type: [
          {
            required: true,
            message: "请选择发起人",
            trigger: "blur"
          }
        ],
        need_approval: [
          {
            required: true,
            message: "请选择审批",
            trigger: "blur"
          }
        ],
      },
      // 弹窗 发起人/审批人
      dialogSelectVisible: false,
      selectSequence: null,
      selectTitle: "",
      selectSearchKeyword: "",
      sourceName: "sysApprovalGain",
      selectOrgShow: true,
      selectOrgList: [],
      selectOrgListCheckAll: false,
      selectOrgListCheckValOrigin: [],
      selectOrgListCheckVal: [],
      selectOrgFinalArr: [],
      isIndeterminate: false,
      selectSearchKeyword2: "",
      selectOrgList2: [],
      selectOrgListCheckAll2: false,
      selectOrgListCheckValOrigin2: [],
      selectOrgListCheckVal2: [],
      selectOrgFinalArr2: [[],[],[]],
      isIndeterminate2: false,
      submitBtnDisable: false,
      loadingResult: false,
      shortNameStatus: true,
      shortNameStatus2: true,
      // 复制项单元 审批人
      newSpItem: {
        level_name: "",
        operator: []
      },
      circleSp: null,
      // 弹窗 清空选项
      dialogCleanVisible: false,
      cleanTxt: "",
      cleanSpIdx: '',
      payType: "1",
      payTypeOptions: [
        {
          value: "1",
          label: "批发分润"
        },
        {
          value: "2",
          label: "拉新分润"
        },
        {
          value: "3",
          label: "销售利润"
        },
        {
          value: "4",
          label: "分公司奖励"
        },
        {
          value: "5",
          label: "导供分润"
        },
      ],
      productType: "1",
      productTypeOptions: [
        {
          value: "1",
          label: "旅游线路"
        },
        {
          value: "4",
          label: "签证"
        },
        {
          value: "3",
          label: "酒店"
        },
        {
          value: "6",
          label: "门票"
        },
        {
          value: "7",
          label: "目的地商城"
        },
      ],
      TYPES: {
        xianlu: '1', //线路上架
        pay: '28', //付款审批,
        outCompany: '1', //外部公司
      }
    };
  },
  computed: {},
  watch: {
    'ruleForm.approval_type': function(e){
      const typeArr = this.allData.start_staff_types;
      let x = [];
      for(let i in typeArr){
        if(e == i){
          typeArr[i].forEach(v=>{
            x.push(v+='');
          });
        }
      }
      this.varStartType = x;
      if(e == this.loadApproval.type){
        this.ruleForm.start_type = this.loadApproval.val;
      }else{
        this.ruleForm.start_type = x[0];
      }
    },
    'selectSearchKeyword': function(e){
      if(e != ''){
        this.shortNameStatus = false;
      }else{
        this.shortNameStatus = true;
      }
    },
    'selectSearchKeyword2': function(e){
      if(e != ''){
        this.shortNameStatus2 = false;
      }else{
        this.shortNameStatus2 = true;
      }
    }
  },
  methods: {
    initialize() {
      let para = {};
      para.data = this.origin;
      approval_config_form({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.allData = data;
            this.loadApproval.type = this.allData.approval_type;
            this.loadApproval.val = this.allData.start_type;
            if(this.origin.service_type == "edit") {
              this.payType = this.allData.commission_values.pay_type + ""
              this.productType = this.allData.commission_values.order_type + ""
            } 
            // 处理线路类别初始化数据
            this.allData.line_types.forEach((v, i, a) => {
              v.index = i;
              if(this.allData.service_type == 'copy'){
                v.check = false;
              }
              let vChildCheck = 0;
              v.children.forEach((v2, i2, a2) => {
                this.$set(v2, "isIndeterminate", false);
                this.$set(v2, "showchild", false);
                v2.parIdx = [i];
                v2.index = i2;
                if(this.allData.service_type == 'copy'){
                  v2.check = false;
                }
                if (v2.children != undefined) {
                  let v2ChildCheck = 0;
                  v2.children.forEach((v3, i3, a3) => {
                    v3.parentId = v2.id;
                    v3.parIdx = [i, i2];
                    v3.index = i3;
                    if(v3.check){
                      v2ChildCheck++;
                    }
                    if(this.allData.service_type == 'copy'){
                      v3.check = false;
                    }
                  });
                  if(v2ChildCheck > 0 && v2ChildCheck < v2.children.length){
                    this.$set(v2, "isIndeterminate", true);
                    v2.check = false;
                  }
                }
                if(v2.check){
                  vChildCheck++;
                }
              });
              if(vChildCheck > 0 && vChildCheck < v.children.length){
                this.$set(v, "isIndeterminate", true);
              }else{
                this.$set(v, "isIndeterminate", false);
                if(v.children.length == vChildCheck){
                  v.check = true;
                }
              }
            });
            this.ruleForm.need_approval = this.allData.need_approval;
            this.allData.end_staffs.forEach((v,i,a)=>{
              this.selectOrgFinalArr2[i] = v.operator;
            });
            if (this.allData.service_type == 'create') {
              this.addSpItem();
            }else{
              // 在编辑和复制模式，如果审批人是空
              if(this.allData.end_staffs.length == 0){
                this.addSpItem();
              }
            }
            if(this.allData.service_type != 'copy'){
              this.ruleForm.approval_type = this.allData.approval_type;
              this.ruleForm.start_type = this.allData.start_type;
              // 导入发起人信息格式
              this.selectOrgFinalArr = this.allData.start_staffs;
            }
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 线路类别选择和全选
    handleCheck(type, itm) {
      if (type === 1) {
        if (this.allData.line_types[itm.index].check) {
          this.allData.line_types[itm.index].children.forEach((item, index) => {
            item.check = true;
            item.isIndeterminate = false;
            if (item.children.length > 0) {
              item.children.forEach((item2, index2) => {
                item2.check = true;
              });
            }
          });
        } else {
          this.allData.line_types[itm.index].children.forEach((item, index) => {
            item.check = false;
            item.isIndeterminate = false;
            if (item.children.length > 0) {
              item.children.forEach((item2, index2) => {
                item2.check = false;
              });
            }
          });
        }
        this.allData.line_types[itm.index].isIndeterminate = false;
      } else if (type === 2) {
        if (this.allData.line_types[itm.parIdx[0]].children[itm.index].check) {
          this.allData.line_types[itm.parIdx[0]].children[
            itm.index
          ].children.forEach((item, index) => {
            item.check = true;
          });
        } else {
          this.allData.line_types[itm.parIdx[0]].children[
            itm.index
          ].children.forEach((item, index) => {
            item.check = false;
          });
        }
        this.allData.line_types[itm.parIdx[0]].children[
          itm.index
        ].isIndeterminate = false;
        let len = 0;
        this.allData.line_types[itm.parIdx[0]].children.forEach(
          (item, index) => {
            if (item.check) {
              len = len + 1;
            }
          }
        );
        if (len === this.allData.line_types[itm.parIdx[0]].children.length) {
          this.allData.line_types[itm.parIdx[0]].check = true;
          this.allData.line_types[itm.parIdx[0]].isIndeterminate = false;
        } else if (len === 0) {
          this.allData.line_types[itm.parIdx[0]].check = false;
          this.allData.line_types[itm.parIdx[0]].isIndeterminate = false;
        } else {
          this.allData.line_types[itm.parIdx[0]].check = true;
          this.allData.line_types[itm.parIdx[0]].isIndeterminate = true;
        }
      } else if (type === 3) {
        let len = 0;
        this.allData.line_types[itm.parIdx[0]].children[
          itm.parIdx[1]
        ].children.forEach((item, index) => {
          if (item.check) {
            len = len + 1;
          }
        });
        if (
          len ===
          this.allData.line_types[itm.parIdx[0]].children[itm.parIdx[1]]
            .children.length
        ) {
          this.allData.line_types[itm.parIdx[0]].children[
            itm.parIdx[1]
          ].check = true;
          this.allData.line_types[itm.parIdx[0]].children[
            itm.parIdx[1]
          ].isIndeterminate = false;
          this.allData.line_types[itm.parIdx[0]].check = true;
          this.allData.line_types[itm.parIdx[0]].isIndeterminate = false;
        } else if (len === 0) {
          this.allData.line_types[itm.parIdx[0]].children[
            itm.parIdx[1]
          ].check = false;
          this.allData.line_types[itm.parIdx[0]].children[
            itm.parIdx[1]
          ].isIndeterminate = false;
          let item2len = 0;
          this.allData.line_types[itm.parIdx[0]].children.forEach(
            (item, index) => {
              if (item.check) {
                item2len = item2len + 1;
              }
            }
          );
          if (item2len === 0) {
            this.allData.line_types[itm.parIdx[0]].check = false;
            this.allData.line_types[itm.parIdx[0]].isIndeterminate = false;
          } else if (
            item2len === this.allData.line_types[itm.parIdx[0]].children.length
          ) {
            this.allData.line_types[itm.parIdx[0]].check = true;
            this.allData.line_types[itm.parIdx[0]].isIndeterminate = false;
          } else {
            this.allData.line_types[itm.parIdx[0]].check = true;
            this.allData.line_types[itm.parIdx[0]].isIndeterminate = true;
          }
        } else {
          this.allData.line_types[itm.parIdx[0]].children[
            itm.parIdx[1]
          ].check = true;
          this.allData.line_types[itm.parIdx[0]].children[
            itm.parIdx[1]
          ].isIndeterminate = true;
          this.allData.line_types[itm.parIdx[0]].check = true;
          this.allData.line_types[itm.parIdx[0]].isIndeterminate = true;
        }
      }
    },
    showChild(index, index2) {
      this.allData.line_types[index].children[index2].showchild = !this.allData
        .line_types[index].children[index2].showchild;
    },
    // 选择发起人审批人弹窗
    handleSelectMember(type, submitType, circle) {
      if (submitType == "open") {
        this.dialogSelectVisible = true;
        this.circleSp = circle;
      } else {
        this.dialogSelectVisible = false;
      }
      this.selectSequence = type;
      this.selectTitle = type == 1 ? "发起人" : "审批人";
      if (submitType == "submit") {
        if (this.selectSequence == 1) {
          let newArr = this.selectOrgList.filter(val => {
            for (var i = 0; i < this.selectOrgListCheckVal.length; i++) {
              if (val.id == this.selectOrgListCheckVal[i]) {
                return val;
              }
            }
          });
          this.selectOrgList = [];
          this.selectSearchKeyword = '';
          this.selectOrgFinalArr.forEach((v,i,a)=>{
            for(let j=0; j<newArr.length; j++){
              if(v.id == newArr[j].id){
                newArr.splice(j,1);
              }
            }
          });
          if(newArr.length > 0){
            this.selectOrgFinalArr = this.selectOrgFinalArr.concat(newArr);
          }
        } else {
          let newArr = this.selectOrgList2.filter(val => {
            for (var i = 0; i < this.selectOrgListCheckVal2.length; i++) {
              if (val.id == this.selectOrgListCheckVal2[i]) {
                return val;
              }
            }
          });
          this.selectOrgList2 = [];
          this.selectSearchKeyword2 = '';
          this.selectOrgFinalArr2[this.circleSp].forEach((v,i,a)=>{
            for(let j=0; j<newArr.length; j++){
              if(v.id == newArr[j].id){
                newArr.splice(j,1);
              }
            }
          });
          if(newArr.length > 0){
            this.selectOrgFinalArr2[this.circleSp] = this.selectOrgFinalArr2[this.circleSp].concat(newArr);
          }
          this.allData.end_staffs[
            this.circleSp
          ].operator = this.selectOrgFinalArr2[this.circleSp];
        }
      }
    },
    // 发起人请求接口事件
    handleOrgItem(row) {
      if(this.selectSequence == 1){
        this.selectSearchKeyword = '';
      }else{
        this.selectSearchKeyword2 = '';
      }
      this.loadingResult = true;
      let para = {
        data: {
          org_id: row.id,
          // type: "approval"
        }
      };
      get_org_operator({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.loadingResult = false;
            if (this.selectSequence == 1) {
              this.selectOrgList = data;
              this.selectOrgListCheckAll = false;
              this.selectOrgListCheckValOrigin = [];
              this.selectOrgList.forEach(val => {
                this.selectOrgListCheckValOrigin.push(val.id);
              });
              this.selectOrgListCheckVal = [];
            } else {
              this.selectOrgList2 = data;
              this.selectOrgListCheckAll2 = false;
              this.selectOrgListCheckValOrigin2 = [];
              this.selectOrgList2.forEach(val => {
                this.selectOrgListCheckValOrigin2.push(val.id);
              });
              this.selectOrgListCheckVal2 = [];
            }
          } else {
            this.$message.error(msg);
          }
        },
      });
    },
    serhFocus() {
      this.selectOrgShow = false;
    },
    serhBlur() {
      this.selectOrgShow = true;
    },
    serhChange(value) {
      let ite = {},
        ids = [];
      ite =
        this.selectSequence == 1
          ? this.allData.start_org
          : this.allData.end_org;
      ite.forEach(v => {
        ids.push(v.id);
      });
      this.loadingResult = true;
      let para = {
        data: {
          org_ids: ids,
          name: value
        }
      };
      search_org_operator({
        params: para,
        success: res => {
        this.loadingResult = false;
          let { code, data, msg } = res.data;
          if (code == 0) {
            if (this.selectSequence == 1) {
              this.selectOrgList = data;
              this.selectOrgListCheckAll = false;
              this.selectOrgListCheckValOrigin = [];
              this.selectOrgList.forEach(val => {
                val.check = false;
                this.selectOrgListCheckValOrigin.push(val.id);
              });
              this.selectOrgListCheckVal = [];
            } else {
              this.selectOrgList2 = data;
              this.selectOrgListCheckAll2 = false;
              this.selectOrgListCheckValOrigin2 = [];
              this.selectOrgList2.forEach(val => {
                val.check = false;
                this.selectOrgListCheckValOrigin2.push(val.id);
              });
              this.selectOrgListCheckVal2 = [];
            }
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    // 人员选择全选
    handleOrgListCheckAllChange(event) {
      this.selectOrgListCheckVal = event.target.checked
        ? this.selectOrgListCheckValOrigin
        : [];
      this.isIndeterminate = false;
    },
    handleOrgListCheckAllChange2(event) {
      this.selectOrgListCheckVal2 = event.target.checked
        ? this.selectOrgListCheckValOrigin2
        : [];
      this.isIndeterminate2 = false;
    },
    handleOrgListItemChange(value) {
      console.log(value.length)
      let checkCount = value.length;
      this.selectOrgListCheckAll =
        checkCount === this.selectOrgListCheckValOrigin.length;
      this.isIndeterminate =
        checkCount > 0 && checkCount < this.selectOrgListCheckValOrigin.length;
    },
    handleOrgListItemChange2(value) {
      let checkCount = value.length;
      this.selectOrgListCheckAll2 =
        checkCount === this.selectOrgListCheckValOrigin2.length;
      this.isIndeterminate2 =
        checkCount > 0 && checkCount < this.selectOrgListCheckValOrigin2.length;
    },
    // 发起人删除
    handleDelMember(obj, type,shengpirenIdx) {
      if (type == "faqiren") {
        this.selectOrgFinalArr.forEach((val, idx, arr) => {
          if (val == obj) {
            this.selectOrgFinalArr.splice(idx, 1);
          }
        });
      } else if (type == "shengpiren") {
        this.selectOrgFinalArr2[shengpirenIdx].forEach((val, idx, arr) => {
          if (val == obj) {
            this.selectOrgFinalArr2[shengpirenIdx].splice(idx, 1);
          }
        });
      }
    },
    // 发起人清空
    handleCleanMember(type,idx) {
      this.dialogCleanVisible = true;
      this.cleanTxt = type == 1 ? '发起人' : '审批人';
      if(type == 2){
        this.cleanSpIdx = idx;
      }
    },
    handleClean(type){
      this.dialogCleanVisible = false;
      if(type == 'submit'){
        if(this.cleanTxt == '发起人'){
          this.selectOrgListCheckAll = false;
          this.selectOrgListCheckValOrigin = [];
          this.selectOrgListCheckVal = [];
          this.selectOrgFinalArr = [];
        }else{
          this.selectOrgListCheckAll2 = false;
          this.selectOrgListCheckValOrigin2 = [];
          this.selectOrgListCheckVal2 = [];
          this.selectOrgFinalArr2[this.cleanSpIdx] = [];
          this.allData.end_staffs[this.cleanSpIdx].operator = this.selectOrgFinalArr2[this.cleanSpIdx];
        }
      }
    },
    // 审批人新增删除级
    addSpItem() {
      let data = Object.assign({}, this.newSpItem);
      this.allData.end_staffs.push(data);
      if (this.allData.end_staffs.length > 3) {
        this.selectOrgFinalArr2.push([]);
      }
      //  else {
      //   this.$message.error("审批人最多支持三级");
      // }
    },
    subSpItem(idx) {
      if (this.allData.end_staffs.length > 1) {
        this.allData.end_staffs.splice(idx, 1);
        this.selectOrgFinalArr2.splice(idx,1);
        this.selectOrgFinalArr2.push([]);
      } else {
        this.$message.error("审批人最少需要一级");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 清理线路类别未选中的数据
          this.ruleForm.line_types = Object.assign(
            [],
            JSON.parse(JSON.stringify(this.allData.line_types))
          );
          this.ruleForm.line_types.forEach(v => {
            v.children.forEach(v2 => {
              let tmpArr = [];
              v2.children.forEach((v3, i3, a3) => {
                if (v3.check) {
                  tmpArr.push(v3);
                }
              });
              v2.children = tmpArr;
            });
          });
          // 加工发起人员工选中数据
          this.ruleForm.start_staffs = this.selectOrgFinalArr;
          this.ruleForm.end_staffs = this.allData.end_staffs;
          if(this.ruleForm.approval_type === '28' && this.ruleForm.start_type == this.TYPES.outCompany) {
            let commission_type = {
              order_type: this.productType,
              pay_type : this.payType
            }
            this.ruleForm.commission_type = commission_type
          }
          // 准备提交
          this.submitBtnDisable = true;
          let para = {
            data: this.ruleForm
          };
          edit_approval_config({
            params: para,
            success: res => {
              let { code, data, msg } = res.data;
              if (code == 0) {
                this.$message.success(msg);
                this.$router.push({ path: "config-list" });
              } else {
                this.$message.error(msg);
                this.submitBtnDisable = false;
              }
            },
            showLoading: true
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.origin.id = this.$route.query.id;
    switch (this.$route.query.ty) {
      case "ga":
        this.origin.service_type = "create";
        break;
      case "ed":
        this.origin.service_type = "edit";
        break;
      case "co":
        this.origin.service_type = "copy";
        break;
    }
    this.initialize();
  }
};
</script>
<style scoped>
>>>.pay-radio .el-form-item__label::before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }
</style>
<style scoped lang="scss">
.system-header {
  margin-bottom: 10px;
  padding: 15px;
  background: #fff;
}
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.system-content {
  background: #fff;
}
.el-upload__tip {
  margin-left: 10px;
}
.form-gain {
  width: 800px;
}
.form-gain .el-select {
  width: 100%;
}
.mix {
  border: 1px solid #ccc;
  min-height: 29px;
  max-height: 145px;
  overflow-y: auto;
  padding: 0 5px 5px;
  font-size: 13px;
  i {
    float: left;
    height: 25px;
    line-height: 25px;
    background: #f4f4f4;
    margin: 4px 5px 0 0;
    padding: 0 4px 0 6px;
    font-style: normal;
    border-radius: 2px;
    &::after {
      content: "×";
      display: inline-block;
      color: #cccccc;
      margin-left: 5px;
      font-size: 18px;
      line-height: 14px;
    }
    &:hover {
      color: #fff;
      cursor: pointer;
      background: #b10c79;
      &::after {
        color: #fff;
      }
    }
  }
}
.el-col-8 {
  .el-button {
    width: 90px;
  }
}
.spbox {
  border: 1px dashed #ccc;
  border-radius: 2px;
  margin-bottom: 10px;
  padding: 10px 155px 10px 70px;
}
.lv {
  float: left;
  margin-left: -55px;
  line-height: 38px;
  span {
    margin-left: -4px;
    margin-right: -4px;
  }
}
.ico-box {
  margin-top: 10px;
  text-align: right;
  i {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 50%;
    border: 1px solid #b10c79;
    text-align: center;
    font-size: 19px;
    font-style: normal;
    cursor: pointer;
    &.add{
      background: #b10c79;
    }
    &:first-child {
      margin-right: 10px;
    }
    &:hover {
      opacity: 0.6;
    }
  }
  .add::before {
    content: "﹢";
    color: #fff;
  }
  .sub::before {
    content: "﹣";
    color: #b10c79;
  }
}
.sub-buttons {
  text-align: center;
  .el-button {
    width:170px;
    line-height: 22px;
  }
}
.btn-box {
  float: right;
  width: 140px;
  margin-right: -145px;
  margin-top: 48px;
  .el-button {
    float: left;
    width: 70px;
    font-size: 13px;
    padding: 9px;
    margin-left: 5px;
  }
  .el-button:nth-child(1) {
    width: 55px;
  }
}
// dia-select-container
.dia-select-container {
  border: 1px solid #ccc;
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
  }
  .result-inside{
    margin: 10px;
    height: 330px;
    overflow: auto;
  }
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.cdia{
  margin: 0 20px;
  font-size: 14px;
}

</style>
