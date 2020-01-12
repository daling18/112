<template>
  <!-- wrapper -->
  <div class="wrapper contract-detail">
    <div class="cont">
      <div class="panel">
        <div class="hd">
          <h2>合同领取登记表</h2>
        </div>
        <div class="bd">
          <div class="contract-info">
            <p>申请单号：<span class="contract-num" v-if="contractRegister.length != 0 && contractRegister[0].apply_no">{{ contractRegister[0].apply_no }}</span><span v-if="contractRegister.length != 0 && contractRegister[0].all_count">{{ contractRegister[0].all_count }}份</span></p>
            <div class="info-button">
              <el-button type="primary" v-if="contractRegister.length != 0 && contractRegister[0].edit!=0" @click="detailPassBtn(contractRegister[0].edit)">审核通过</el-button>
              <el-button type="primary" v-if="contractRegister.length != 0 && contractRegister[0].edit!=0" @click="detail_nopass.dialogDetailVisible=true;detail_nopass.form.remark=''">审核不通过</el-button>
              <el-button type="primary" size="long" v-if="detailDtype==1&&$menuPermission('api/contract/add_contract_send/'+detailType+'/'+detailMenu)" @click="addExpressBtn">+ 添加快递信息</el-button>
              <el-button type="primary" size="long" v-else-if="detailDtype==2" @click="addExpressBtn">+ 添加快递信息</el-button>
            </div>
          </div>
          <el-table 
            :data="contractRegister"
            border
            style="width: 100%">
            <el-table-column 
              header-align="center" 
              align="center" 
              label="申请人"
              width="160">
              <template slot-scope="scope">
                <p>{{ scope.row.b_name }}<span v-if="scope.row.b_name!==''&&scope.row.user_name!==''">／</span>{{ scope.row.user_name }}</p>
              </template>
            </el-table-column>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="create_time" 
              label="申请日期"
              width="100"/>
            <el-table-column 
              header-align="center" 
              align="center" 
              label="国内合同份数"
              width="105">
              <template slot-scope="scope">
                <p>{{ scope.row.home_count }}<span v-if="scope.row.home_count!==''">份</span></p>
              </template>
            </el-table-column>
            <el-table-column 
              header-align="center" 
              align="center" 
              label="出境合同份数"
              width="105">
              <template slot-scope="scope">
                <p>{{ scope.row.abroad_count }}<span v-if="scope.row.abroad_count!==''">份</span></p>
              </template>
            </el-table-column>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="info" 
              label="合同领取说明"/>
            <el-table-column 
              header-align="center" 
              align="center"
              label="合同收件地址">
              <template slot-scope="scope">
                <div class="edit-address">
                  <el-button type="text" class="select_info" v-if="scope.row.express_edit==1" @click="dialogAddVisible=true">修改地址</el-button>
                </div>
                <ul>
                  <li>
                    <p class="add-left">收件人：</p>
                    <p class="add-right">{{ scope.row.express_name }}</p>
                  </li>
                  <li>
                    <p class="add-left">联系电话：</p>
                    <p class="add-right">{{ scope.row.express_phone }}</p>
                  </li>
                  <li>
                    <p class="add-left">收件地址：</p>
                    <p class="add-right">{{ scope.row.express_address }}</p>
                  </li>
                </ul>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>审核记录</h2>
        </div>
        <div class="bd">
          <el-table 
            :data="approvalRecord" 
            border 
            style="width: 100%">
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="create_time" 
              label="审批时间"
              width="140"/>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="status_name" 
              label="审批结果"
              width="80"/>
            <el-table-column 
              header-align="center" 
              align="center"  
              label="审批人所属公司">
              <template slot-scope="scope">
                <p>{{ scope.row.org_name }}<span v-if="scope.row.org_name!==''&&scope.row.b_name!==''">／</span>{{ scope.row.b_name }}</p>
              </template>
            </el-table-column>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="user_name" 
              label="审批人姓名"
              width="100"/>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="remark" 
              label="审批备注"/>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>合同分发</h2>
        </div>
        <div class="bd">
          <el-table 
            :data="contractDistribution" 
            border 
            style="width: 100%">
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="create_time" 
              label="分发时间"
              width="140"/>
            <el-table-column 
              header-align="center" 
              align="center" 
              label="分发人所属分公司"
              width="180">
              <template slot-scope="scope">
                <p>{{ scope.row.org_name }}<span v-if="scope.row.org_name!==''&&scope.row.b_name!==''">／</span>{{ scope.row.b_name }}</p>
              </template>
            </el-table-column>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="user_name" 
              label="创建人姓名"
              width="90"/>
            <el-table-column 
              header-align="center" 
              align="center"
              label="合同回收地址">
              <template slot-scope="scope">
                <div class="edit-address">
                  <div v-if="scope.row.edit==1&&(scope.row.express_name!=''&&scope.row.express_name!=null)&&$menuPermission('api/contract/edit_contract_fenfa_address/'+detailType+'/'+detailMenu)">
                    <el-button type="text" class="select_info" @click="contractDistriDialog.dialogAddVisible=true;contractDistriDialog.id=scope.row.id">修改地址</el-button>
                    <el-button type="text" class="select_info" @click="contractDistriDialog.id=scope.row.id;delAdd()">删除</el-button>
                  </div>
                  <div v-else-if="scope.row.edit==1&&(scope.row.express_name==''||scope.row.express_name==null)">
                    <el-button type="text" class="select_info" @click="contractDistriDialog.dialogAddVisible=true;contractDistriDialog.id=scope.row.id">添加地址</el-button>
                  </div>
                  
                </div>
                <ul>
                  <li>
                    <p class="add-left">收件人：</p>
                    <p class="add-right">{{ scope.row.express_name }}</p>
                  </li>
                  <li>
                    <p class="add-left">联系电话：</p>
                    <p class="add-right">{{ scope.row.express_phone }}</p>
                  </li>
                  <li>
                    <p class="add-left">收件地址：</p>
                    <p class="add-right">{{ scope.row.express_address }}</p>
                  </li>
                </ul>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>合同寄出信息</h2>
        </div>
        <div class="bd">
          <el-table 
            :data="sendInfo" 
            border 
            style="width: 100%">
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="send_type" 
              label="类型"
              width="140"/>
            <el-table-column 
              header-align="center" 
              align="center"
              label="快递信息"
              width="220">
              <template slot-scope="scope">
                <p>{{ scope.row.express_name }}<span v-if="scope.row.express_name!==''&&scope.row.express_no!==''">／</span>{{ scope.row.express_no }}</p>
              </template>
            </el-table-column>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="create_time" 
              label="添加时间"
              width="110"/>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="name" 
              label="添加人">
              <template slot-scope="scope">
                <p>{{ scope.row.org_name }}<span v-if="scope.row.org_name!==''&&scope.row.user_name!==''">／</span>{{ scope.row.user_name }}</p>
              </template>
            </el-table-column>
            <el-table-column 
              header-align="center" 
              align="center" 
              prop="express_remark" 
              label="备注"/>
            <el-table-column 
              header-align="center" 
              align="center" 
              label="操作"
              width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.edit==0||((!$menuPermission('api/contract/edit_contract_send/'+detailType+'/'+detailMenu))&&(!$menuPermission('api/contract/del_contract_send/'+detailType+'/'+detailMenu)))">
                  <p>--</p>
                </div>
                <div v-else-if="scope.row.edit==1">
                  <el-button type="text" class="select_info" v-if="$menuPermission('api/contract/edit_contract_send/'+detailType+'/'+detailMenu)" @click="editExpressBtn(scope.row.id)">修改</el-button>
                  <el-button type="text" class="select_info" v-if="$menuPermission('api/contract/del_contract_send/'+detailType+'/'+detailMenu)" @click="delExpressBtn(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 登记表修改地址 -->
    <el-dialog title="操作提示" :visible.sync="dialogAddVisible">
      <div>
        <el-radio-group v-model="checkAdd">
          <el-radio v-for="item in addData" :key="item.id" :label="item.id" :class="{'check-radio':item.id===checkAdd}">
            <span>选入</span>
            <ul>
              <li>
                <p class="add-left">收件人：</p>
                <p class="add-right">{{ item.name }}<span v-show="item.is_default===1">[默认收件地址]</span></p>
              </li>
              <li>
                <p class="add-left">联系电话：</p>
                <p class="add-right">{{ item.telNum }}</p>
              </li>
              <li>
                <p class="add-left">收件地址：</p>
                <p class="add-right">{{ item.address }}</p>
              </li>
            </ul>
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="saveRadio()">确 定</el-button>
        <el-button @click="dialogAddVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 合同分发添加、修改地址 -->
    <el-dialog title="操作提示" :visible.sync="contractDistriDialog.dialogAddVisible">
      <div>
        <el-radio-group v-model="contractDistriDialog.checkAdd">
          <el-radio v-for="item in contractDistriDialog.addData" :key="item.id" :label="item.id" :class="{'check-radio':item.id===checkAdd}">
            <span>选入</span>
            <ul>
              <li>
                <p class="add-left">收件人：</p>
                <p class="add-right">{{ item.name }}<span v-show="item.is_default===1">[默认收件地址]</span></p>
              </li>
              <li>
                <p class="add-left">联系电话：</p>
                <p class="add-right">{{ item.telNum }}</p>
              </li>
              <li>
                <p class="add-left">收件地址：</p>
                <p class="add-right">{{ item.address }}</p>
              </li>
            </ul>
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="saveRadio2()">确 定</el-button>
        <el-button @click="contractDistriDialog.dialogAddVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="expressInfo.title" :visible.sync="dialogFillVisible">
      <div>
        <el-form :model="expressInfo.form" :rules="expressInfo.infoRules" ref="expressInfoForm" label-width="90px" class="demo-ruleForm">
          <el-form-item label="快递公司" prop="express_name">
            <el-col :span="22">
              <el-input type="text" v-model="expressInfo.form.express_name" placeholder="请输入快递公司"/>
            </el-col>
          </el-form-item>
          <el-form-item label="快递单号" prop="express_no">
            <el-col :span="22">
              <el-input type="text" v-model="expressInfo.form.express_no" placeholder="请输入快递单号"/>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-col :span="22">
              <el-input type="textarea" v-model="expressInfo.form.express_remark" placeholder="备注"/>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="saveExpress()">确 定</el-button>
        <el-button @click="dialogFillVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 审核通过，创建合同 -->
    <el-dialog :title="detail_pass_create.title" :visible.sync="detail_pass_create.dialogCreateVisible">
      <div>
        <el-form :model="detail_pass_create.form" :rules="detail_pass_create.infoRules" ref="passCreateForm" label-width="120px" class="demo-ruleForm">
          <el-form-item v-if="contractRegister.length != 0" v-show="contractRegister[0].abroad_count>0" label="出境合同编号">
            <el-col :span="22" class="create-cont">
              <span class="create-prefix">YKLY-CJ-</span>
              <el-date-picker class="create-year" v-model="detail_pass_create.form.abroad_start_y" type="year" :editable="false" :clearable="false" placeholder="选择年"/>
              <el-form-item class="create-num" prop="abroad_start_n">
                <el-input type="text" v-model.number="detail_pass_create.form.abroad_start_n" placeholder="编号起始"/>
              </el-form-item>
              <span class="create-to">至</span>
            </el-col>
            <el-col :span="22" class="create-cont">
              <span class="create-prefix">YKLY-CJ-</span>
              <el-date-picker class="create-year" v-model="detail_pass_create.form.abroad_end_y" type="year" :editable="false" :clearable="false" placeholder="选择年"/>
              <el-form-item class="create-num" prop="abroad_end_n">
                <el-input type="text" v-model.number="detail_pass_create.form.abroad_end_n" placeholder="编号终止"/>
              </el-form-item>
              <span class="create-to"/>
            </el-col>
          </el-form-item>
          <el-form-item v-if="contractRegister.length != 0" v-show="contractRegister[0].home_count>0" label="国内合同编号">
            <el-col :span="22" class="create-cont">
              <span class="create-prefix">YKLY-GN-</span>
              <el-date-picker class="create-year" v-model="detail_pass_create.form.home_start_y" type="year" :editable="false" :clearable="false" placeholder="选择年"/>
              <el-form-item class="create-num" prop="home_start_n">
                <el-input type="text" v-model.number="detail_pass_create.form.home_start_n" placeholder="编号起始"/>
              </el-form-item>
              <span class="create-to">至</span>
            </el-col>
            <el-col :span="22" class="create-cont">
              <span class="create-prefix">YKLY-GN-</span>
              <el-date-picker class="create-year" v-model="detail_pass_create.form.home_end_y" type="year" :editable="false" :clearable="false" placeholder="选择年"/>
              <el-form-item class="create-num" prop="home_end_n">
                <el-input type="text" v-model.number="detail_pass_create.form.home_end_n" placeholder="编号终止"/>
              </el-form-item>
              <span class="create-to"/>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-col :span="22">
              <el-input type="textarea" v-model="detail_pass_create.form.remark" placeholder="备注"/>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="saveCreate()">确 定</el-button>
        <el-button @click="detail_pass_create.dialogCreateVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 审核通过，分发合同编号 -->
    <el-dialog :title="detail_pass_distribute.title" :visible.sync="detail_pass_distribute.dialogDistributeVisible">
      <div>
        <el-form :model="detail_pass_distribute.form" class="demo-ruleForm">
          <div v-if="contractRegister.length != 0" v-show="contractRegister[0].home_count>0">
            <el-form-item label="分发国内合同" label-width="100px">
              <el-col :span="24" class="select-num">
                <ul>
                  <li v-for="(item,index) in detail_pass_distribute.show.homeCheckList" :key="index">
                    <p>{{ item }}</p>
                    <span @click="deleteCheck(item,index,'home')">×</span>
                  </li>
                </ul>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="24" class="select-search">
                <el-input type="text" class="select-section" v-model="detail_pass_distribute.search.home.start" placeholder="编号起始"/>
                <span>-</span>
                <el-input type="text" class="select-section" v-model="detail_pass_distribute.search.home.end" placeholder="编号终止"/>
                <span/>
                <el-input type="text" class="select-search-num" v-model="detail_pass_distribute.search.home.contract_no" placeholder="输入合同编号进行搜索"/>
                <span/>
                <el-button type="primary" class="search-btn" @click="searchListBtn('home')">搜索</el-button>
              </el-col>
            </el-form-item>
            <el-form-item class="select-cont" v-if="detail_pass_distribute.form.home&&detail_pass_distribute.form.home.list">
              <div v-if="detail_pass_distribute.form.home.list.length>0">
                <el-checkbox-group v-model="detail_pass_distribute.show.homeCheckList">
                  <el-col :span="8" v-for="item in detail_pass_distribute.form.home.list" :key="item.contract_no">
                    <el-checkbox :label="item.contract_no" @change="changeCheckbox(item,'home',$event)"/>
                  </el-col>
                </el-checkbox-group>
                <el-pagination
                  layout="prev, pager, next"
                  :total="detail_pass_distribute.form.home.total_count"
                  :page-size="9"
                  :current-page.sync="detail_pass_distribute.pageDate.home.page"
                  @current-change="pageChangeHome"/>
              </div>
              <div v-else>
                <p>暂无合同编号，可向总部申领</p>
              </div>
            </el-form-item>
          </div>
          <div v-if="contractRegister.length != 0" v-show="contractRegister[0].abroad_count>0" >
            <el-form-item label="分发出境合同" label-width="100px">
              <el-col :span="22" class="select-num">
                <ul>
                  <li v-for="(item,index) in detail_pass_distribute.show.abroadCheckList" :key="index">
                    <p>{{ item }}</p>
                    <span @click="deleteCheck(item,index,'abroad')">×</span>
                  </li>
                </ul>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="24" class="select-search">
                <el-input type="text" class="select-section" v-model="detail_pass_distribute.search.abroad.start" placeholder="编号起始"/>
                <span>-</span>
                <el-input type="text" class="select-section" v-model="detail_pass_distribute.search.abroad.end" placeholder="编号终止"/>
                <span/>
                <el-input type="text" class="select-search-num" v-model="detail_pass_distribute.search.abroad.contract_no" placeholder="输入合同编号进行搜索"/>
                <span/>
                <el-button type="primary" class="search-btn" @click="searchListBtn('abroad')">搜索</el-button>
              </el-col>
            </el-form-item>
            <el-form-item class="select-cont" v-if="detail_pass_distribute.form.abroad&&detail_pass_distribute.form.abroad.list">
              <div v-if="detail_pass_distribute.form.abroad.list.length>0">
                <el-checkbox-group v-model="detail_pass_distribute.show.abroadCheckList">
                  <el-col :span="8" v-for="item in detail_pass_distribute.form.abroad.list" :key="item.contract_no">
                    <el-checkbox :label="item.contract_no" @change="changeCheckbox(item,'abroad',$event)"/>
                  </el-col>
                </el-checkbox-group>
                <el-pagination
                  layout="prev, pager, next"
                  :total="detail_pass_distribute.form.abroad.total_count"
                  :page-size="9"
                  :current-page.sync="detail_pass_distribute.pageDate.abroad.page"
                  @current-change="pageChangeAbroad"/>
              </div>
              <div v-else>
                <p>暂无合同编号，可向总部申领</p>
              </div>
            </el-form-item>
          </div>
          <el-form-item label="审批备注" label-width="70px">
            <el-col :span="24">
              <el-input type="textarea" v-model="detail_pass_distribute.save.remark" placeholder="请输入审批备注"/>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="SaveDistribute">保存</el-button>
        <el-button @click="detail_pass_distribute.dialogDistributeVisible=false;">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="审核不通过" :visible.sync="detail_nopass.dialogDetailVisible">
      <div>
        <el-form :model="detail_nopass.form" ref="infoForm" label-position="top" class="demo-ruleForm">
          <el-form-item label="不通过原因">
            <el-col :span="24">
              <el-input type="textarea" v-model="detail_nopass.form.remark" placeholder="请输入不通过的原因"/>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="detailNopassBtn">确 定</el-button>
        <el-button @click="detail_nopass.dialogDetailVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- /wrapper -->
</template>

<script>
import { getAddressInfo, getApplyDetail1, getApplyDetail2, getAuditDetail1, getAuditDetail2, getAuditDetails1, getAuditDetails2, addContractSend11, addContractSend21, addContractSend12, addContractSend22, eidtContractSend11, eidtContractSend21, eidtContractSend12, eidtContractSend22, delContractSend11, delContractSend21, delContractSend12, delContractSend22, editApplyAddress11, editApplyAddress21, editApplyAddress12, editApplyAddress22, setCancelApply1, setCancelApply2, setcreateContract1, setcreateContract2, fenfaContractList1, fenfaContractList2, searchFenfaContractList1, searchFenfaContractList2, searchFenfaContract1, searchFenfaContract2, editFenfaAddress11, editFenfaAddress21, editFenfaAddress12, editFenfaAddress22 } from 'src/api/api';
export default {
  data(){
    var abroadStart = (rule, value, callback) => {
      if(!value&&this.contractRegister[0].abroad_count>0){
        return callback(new Error('请输入编码起始'));
      }else if(this.contractRegister[0].abroad_count==0){
        callback();
      }
      if(!Number.isInteger(value)){
        return callback(new Error('请填写37-3000之间的数值'));
      } else {
        //如果终止为空，或不为数值，或为数值不在区间范围，37<=value<=3000.否则37<=value<=终止值
        let endNum = this.detail_pass_create.form.abroad_end_n;
        if(endNum===''||!Number.isInteger(endNum)||endNum<37||endNum>3000){
          if(37<=value&&value<=3000){
            callback();
          }else{
            return callback(new Error('请填写37-3000之间的数值'));
          }
        }else{
          if(37<=value&&value<=endNum){
            callback();
          }
          else{
            return callback(new Error('请填写大于37，小于终止的数值'));
          }
        }
      }
    };
    var abroadEnd = (rule, value, callback) => {
      // console.log(value);
      if(!value&&this.contractRegister[0].abroad_count>0){
        return callback(new Error('请输入编码终止'));
      }else if(this.contractRegister[0].abroad_count==0){
        callback();
      }
      if(!Number.isInteger(value)){
        return callback(new Error('请填写37-3000之间的数值'));
      } else {
        //如果起始为空，或不为数值，或为数值不在区间范围，37<=value<=3000.否则 起始<=value<=3000
        let startNum = this.detail_pass_create.form.abroad_start_n;
        if(startNum===''||!Number.isInteger(startNum)||startNum<37||startNum>3000){
          if(37<=value&&value<=3000){
            callback();
          }else{
            return callback(new Error('请填写37-3000之间的数值'));
          }
        }else{
          if(startNum<=value&&value<=3000){
            callback();
          }
          else{
            return callback(new Error('请填写大于起始，小于3000的数值'));
          }
        }
      }
    };
    var homeStart = (rule, value, callback) => {
      if(!value&&this.contractRegister[0].home_count>0){
        return callback(new Error('请输入编码起始'));
      }else if(this.contractRegister[0].home_count==0){
        callback();
      }
      if(!Number.isInteger(value)){
        return callback(new Error('请填写122-3000之间的数值'));
      } else {
        //如果终止为空，或不为数值，或为数值不在区间范围，122<=value<=3000.否则122<=value<=终止值
        let endNum = this.detail_pass_create.form.home_end_n;
        if(endNum===''||!Number.isInteger(endNum)||endNum<122||endNum>3000){
          if(122<=value&&value<=3000){
            callback();
          }else{
            return callback(new Error('请填写122-3000之间的数值'));
          }
        }else{
          if(122<=value&&value<=endNum){
            callback();
          }
          else{
            return callback(new Error('请填写大于122，小于终止的数值'));
          }
        }
      }
    };
    var homeEnd = (rule, value, callback) => {
      // console.log(value);
      if(!value&&this.contractRegister[0].home_count>0){
        return callback(new Error('请输入编码终止'));
      }else if(this.contractRegister[0].home_count==0){
        callback();
      }
      if(!Number.isInteger(value)){
        return callback(new Error('请填写122-3000之间的数值'));
      } else {
        //如果起始为空，或不为数值，或为数值不在区间范围，122<=value<=3000.否则 起始<=value<=3000
        let startNum = this.detail_pass_create.form.home_start_n;
        if(startNum===''||!Number.isInteger(startNum)||startNum<122||startNum>3000){
          if(122<=value&&value<=3000){
            callback();
          }else{
            return callback(new Error('请填写122-3000之间的数值'));
          }
        }else{
          if(startNum<=value&&value<=3000){
            callback();
          }
          else{
            return callback(new Error('请填写大于起始，小于3000的数值'));
          }
        }
      }
    };
    return{
      role: null,
      rolePath: null,
      //申请记录id
      detailId: this.$route.query.id,
      //申请分公司:1分公司，2总部
      detailType: this.$route.query.type,
      //所属菜单:1合同领取，2合同审核
      detailMenu: this.$route.query.menu,
      //审核操作:1查看，2审核
      detailDtype: this.$route.query.dtype,
      //登记快递地址弹窗
      dialogAddVisible: false,
      //快递信息弹窗
      dialogFillVisible: false,
      checkAdd: '',
      addData: [],
      //合同分发地址弹窗
      contractDistriDialog: {
        dialogAddVisible: false,
        checkAdd: '',
        addData: [],
        id:''
      },
      //合同领取登记表
      contractRegister: [],
      //审核记录表
      approvalRecord: [],
      //合同分发表
      contractDistribution: [],
      //合同寄出信息表
      sendInfo: [],
      //添加、修改弹窗内容
      expressInfo: {
        title: '填写快递信息',
        //弹窗标志,'put' 是更新，'post'是添加
        flag: '',
        form: {
          id: '',
          express_name: '',
          express_no: '',
          express_remark: ''
        },
        infoRules: {
          express_name: [
            { required: true, message: '请输入快递公司', trigger: 'blur' }
          ],
          express_no: [
            { required: true, message: '请输入快递单号', trigger: 'blur' }
          ]
        }
      },
      //审核通过,创建合同
      detail_pass_create: {
        title: '审核通过,创建合同',
        dialogCreateVisible:false,
        form: {
          id:'',
          abroad_start_y:new Date().getFullYear().toString(),
          abroad_start_n:'',
          abroad_end_y:new Date().getFullYear().toString(),
          abroad_end_n:'',
          home_start_y:new Date().getFullYear().toString(),
          home_start_n:'',
          home_end_y:new Date().getFullYear().toString(),
          home_end_n:'',
          remark:''
        },
        infoRules:{
          abroad_start_n: [
            { required: true, validator: abroadStart, trigger: 'blur' }
          ],
          abroad_end_n: [
            { required: true, validator: abroadEnd, trigger: 'blur' }
          ],
          home_start_n: [
            { required: true, validator: homeStart, trigger: 'blur' }
          ],
          home_end_n: [
            { required: true, validator: homeEnd, trigger: 'blur' }
          ]
        }
      },
      //审核通过，分发合同编号
      detail_pass_distribute: {
        title: '审核通过，分发合同编号只能选择分公司已申请，且未使用的合同编号',
        dialogDistributeVisible:false,
        form: {},
        search: {
          home: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:1,
            contract_no:'',
            page:1,
            page_size:9
          },
          abroad: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:2,
            contract_no:'',
            page:1,
            page_size:9
          }
        },
        pageDate: {
          home: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:1,
            contract_no:'',
            page:1,
            page_size:9
          },
          abroad: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:2,
            contract_no:'',
            page:1,
            page_size:9
          }
        },
        show: {
          homeCheckList: [],
          abroadCheckList: [],
        },
        save: {
          homeCheckList:{},
          abroadCheckList:{},
          remark:''
        }
        
      },
      //审核不通过
      detail_nopass: {
        dialogDetailVisible:false,
        form:{
          remark:''
        }
      }
    };
  },
  methods: {
    //请求页面所有表格数据
    getDetailEvent() {
      let _this = this;
      let ApplyId = {
        data:{
          id:this.$route.query.id
        }
      };
      if(this.detailType==1){
        if(this.detailMenu==1){
          getApplyDetail1({
            params: ApplyId,
            success: (params) => {
              _this.getDetailSuccess(params);
            },
            showLoading: true
          });
        }else if(this.detailMenu==2){
          if(this.detailDtype==1){
            getAuditDetail1({
              params: ApplyId,
              success: (params) => {
                _this.getDetailSuccess(params);
              },
              showLoading: true
            });
          }else if(this.detailDtype==2){
            getAuditDetails1({
              params: ApplyId,
              success: (params) => {
                _this.getDetailSuccess(params);
              },
              showLoading: true
            });
          }
        }
        
      }else if(this.detailType==2){
        if(this.detailMenu==1){
          getApplyDetail2({
            params: ApplyId,
            success: (params) => {
              _this.getDetailSuccess(params);
            },
            showLoading: true
          });
        }else if(this.detailMenu==2){
          if(this.detailDtype==1){
            getAuditDetail2({
              params: ApplyId,
              success: (params) => {
                _this.getDetailSuccess(params);
              },
              showLoading: true
            });
          }else if(this.detailDtype==2){
            getAuditDetails2({
              params: ApplyId,
              success: (params) => {
                _this.getDetailSuccess(params);
              },
              showLoading: true
            });
          }
        }
      }
       
    },
    getDetailSuccess(params) {
      let data = params.data;
      if (data.code == '0') {
        this.contractRegister = [];
        this.contractRegister.push(data.data.detail);
        // console.log(this.contractRegister);
        this.approvalRecord = data.data.cancel_list;
        this.contractDistribution = data.data.fenfa_list;
        this.sendInfo = data.data.send_list;
      } else {
        this.$message.error(data.msg);
      }
    },
    //审核通过/不通过请求
    detailRequest(data) {
      let params = {
        data:data
      };
      if(this.detailType==1){
        setCancelApply1({
          params: params,
          success: (params) => {
            let data = params.data;
            if (data.code == '0') {
              this.getDetailEvent();
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }else if(this.detailType==2){
        setCancelApply2({
          params: params,
          success: (params) => {
            let data = params.data;
            if (data.code == '0') {
              this.getDetailEvent();
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }
      
    },
    //审核通过,通过传入参数弹出对应弹出框
    detailPassBtn(edit) {
      // 审核通过，1提交至总部财务部,2创建合同 3分发合同编号
      if(edit===1){
        this.$confirm('确定审核通过，转下一步：提交至总部财务部？', '审核通过', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id:this.detailId,
            status:1,
            remark: ''
          };
          this.detailRequest(data);
        }).catch(() => {
          // this.$message.info('已取消通过');          
        });
      }else if(edit===2){
        this.detail_pass_create.dialogCreateVisible=true;
      }else if(edit===3){
        // 清空弹窗数据
        this.detail_pass_distribute.search = {
          home: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:1,
            contract_no:'',
            page:1,
            page_size:9
          },
          abroad: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:2,
            contract_no:'',
            page:1,
            page_size:9
          }
        };
        this.detail_pass_distribute.pageDate = {
          home: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:1,
            contract_no:'',
            page:1,
            page_size:9
          },
          abroad: {
            id:parseInt(this.$route.query.id),
            year:'',
            start:'',
            end:'',
            search_style:2,
            contract_no:'',
            page:1,
            page_size:9
          }
        };
        this.detail_pass_distribute.show = {
          homeCheckList: [],
          abroadCheckList: [],
        };
        this.detail_pass_distribute.save = {
          homeCheckList:{},
          abroadCheckList:{},
          remark:''
        };
        let params = {
          data:{
            id:this.detailId
          }
        };
        if(this.detailType==1){
          fenfaContractList1({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.detail_pass_distribute.form = data.data;
                this.detail_pass_distribute.dialogDistributeVisible=true;
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          }); 
        }else if(this.detailType==2){
          fenfaContractList2({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.detail_pass_distribute.form = data.data;
                this.detail_pass_distribute.dialogDistributeVisible=true;
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          }); 
        }
      }else{
        this.$message.error('参数出错');
      }
    },
    //审核通过，创建合同->保存
    saveCreate() {
      var _this = this;
      this.$refs.passCreateForm.validate((valid) => {
        // console.log(valid);
        if (valid) {
          let params = {
            data : _this.detail_pass_create.form
          };
          params.data.id = _this.$route.query.id;
          if(this.detailType==1){
            setcreateContract1({
              params: params,
              success: (params) => {
                let data = params.data;
                if (data.code == '0') {
                  _this.$message.success(data.msg);
                  _this.getDetailEvent();
                  _this.detail_pass_create.dialogCreateVisible=false;
                } else {
                  _this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          }else if(this.detailType==2){
            setcreateContract2({
              params: params,
              success: (params) => {
                let data = params.data;
                if (data.code == '0') {
                  _this.$message.success(data.msg);
                  _this.getDetailEvent();
                  _this.detail_pass_create.dialogCreateVisible=false;
                } else {
                  _this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          }
        } else {
          return false;
        }
      });
    },
    //审核不通过->确认
    detailNopassBtn() {
      let data = {
        id:this.detailId,
        status:2,
        remark: this.detail_nopass.form.remark
      };
      this.detailRequest(data);
      // this.getVerifyEvent();
      this.detail_nopass.dialogDetailVisible = false;
    },
    //修改地址->确定事件
    saveRadio() {
      let checkData = {}; 
      this.addData.some(item => {
        if(item.id === this.checkAdd) {
          checkData = {
            express_name: item.name,
            express_phone: Number(item.telNum),
            express_address: item.address
          };
        }
      });
      let params = {
        data : checkData
      };
      params.data.id = this.$route.query.id;
      if(this.detailType==1){
        if(this.detailMenu==1){
          editApplyAddress11({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.addData.some(item => {
                  if(item.id === this.checkAdd) {
                    this.contractRegister[0] = checkData;
                    this.dialogAddVisible = false;
                  }
                });
                this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else if(this.detailMenu==2){
          editApplyAddress12({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.addData.some(item => {
                  if(item.id === this.checkAdd) {
                    this.contractRegister[0] = checkData;
                    this.dialogAddVisible = false;
                  }
                });
                this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }else if(this.detailType==2){
        if(this.detailMenu==1){
          editApplyAddress21({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.addData.some(item => {
                  if(item.id === this.checkAdd) {
                    this.contractRegister[0] = checkData;
                    this.dialogAddVisible = false;
                  }
                });
                this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else if(this.detailMenu==2){
          editApplyAddress22({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.addData.some(item => {
                  if(item.id === this.checkAdd) {
                    this.contractRegister[0] = checkData;
                    this.dialogAddVisible = false;
                  }
                });
                this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }
      
      this.addData.some(item => {
        if(item.id === this.checkAdd) {
          this.contractRegister[0].express_name = item.name;
          this.contractRegister[0].express_phone = Number(item.telNum);
          this.contractRegister[0].express_address = item.address;
          this.dialogAddVisible = false;
        }
      });
    },
    //修改地址->确定事件
    saveRadio2() {
      let checkData = {}; 
      this.contractDistriDialog.addData.some(item => {
        if(item.id === this.contractDistriDialog.checkAdd) {
          checkData = {
            express_name: item.name,
            express_phone: Number(item.telNum),
            express_address: item.address
          };
        }
      });
      let params = {
        data : checkData
      };
      this.fenfaPost(params);
      // this.addData.some(item => {
      //   if(item.id === this.checkAdd) {
      //     this.contractRegister[0].express_name = item.name;
      //     this.contractRegister[0].express_phone = Number(item.telNum);
      //     this.contractRegister[0].express_address = item.address;
      //     this.dialogAddVisible = false;
      //   }
      // });
    },
    delAdd(){
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let checkData = {
          express_name: '',
          express_phone: '',
          express_address: ''
        };
        let params = {
          data : checkData
        };
        this.fenfaPost(params);
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
      
    },
    //合同分发增删改请求
    fenfaPost(params){
      params.data.id = this.contractDistriDialog.id;
      if(this.detailType==1){
        if(this.detailMenu==1){
          editFenfaAddress11({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.getDetailEvent();
                this.contractDistriDialog.dialogAddVisible = false;
                // this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else if(this.detailMenu==2){
          editFenfaAddress12({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.getDetailEvent();
                this.contractDistriDialog.dialogAddVisible = false;
                // this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }else if(this.detailType==2){
        if(this.detailMenu==1){
          editFenfaAddress21({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.getDetailEvent();
                this.contractDistriDialog.dialogAddVisible = false;
                // this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else if(this.detailMenu==2){
          editFenfaAddress22({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.getDetailEvent();
                this.contractDistriDialog.dialogAddVisible = false;
                // this.$message.success(data.msg);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }
    },
    //快递信息添加
    addExpressBtn() {
      this.expressInfo.flag = 'post';
      this.expressInfo.form.id = this.$route.query.id;
      this.expressInfo.form.express_name = '';
      this.expressInfo.form.express_no = '',
      this.expressInfo.form.express_remark = '',
      this.dialogFillVisible = true;
    },
    //快递信息修改
    editExpressBtn(id) {
      this.sendInfo.some(item => {
        if(id===item.id) {
          // console.log(item);
          this.expressInfo.flag = 'put';
          this.expressInfo.form.id = item.id;
          this.expressInfo.form.express_name = item.express_name;
          this.expressInfo.form.express_no = item.express_no,
          this.expressInfo.form.express_remark = item.express_remark;
        }
      });
      this.dialogFillVisible = true;
    },
    delExpressBtn(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            id: id
          }
        };
        if(this.detailType==1){
          if(this.detailMenu==1){
            delContractSend11({
              params: params,
              success: (params) => {
                let data = params.data;
                if (data.code == '0') {
                  this.getDetailEvent();
                  this.$message.success(data.msg);
                } else {
                  this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          }else if(this.detailMenu==2){
            delContractSend12({
              params: params,
              success: (params) => {
                let data = params.data;
                if (data.code == '0') {
                  this.getDetailEvent();
                  this.$message.success(data.msg);
                } else {
                  this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          }
        }else if(this.detailType==2){
          if(this.detailMenu==1){
            delContractSend21({
              params: params,
              success: (params) => {
                let data = params.data;
                if (data.code == '0') {
                  this.getDetailEvent();
                  this.$message.success(data.msg);
                } else {
                  this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          }else if(this.detailMenu==2){
            delContractSend22({
              params: params,
              success: (params) => {
                let data = params.data;
                if (data.code == '0') {
                  this.getDetailEvent();
                  this.$message.success(data.msg);
                } else {
                  this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          }
        }
        this.dialogFillVisible = false;
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });


      
    },
    //快递信息添加和修改->提交事件
    saveExpress() {
      let _this = this;
      this.$refs.expressInfoForm.validate((valid) => {
        if (valid) {
          let params = {
            data: _this.expressInfo.form
          };
          if(_this.expressInfo.flag === 'post'){
            if(this.detailType==1){
              if(this.detailMenu==1){
                addContractSend11({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }else if(this.detailMenu==2){
                addContractSend12({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }
            }else if(this.detailType==2){
              if(this.detailMenu==1){
                addContractSend21({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }else if(this.detailMenu==2){
                addContractSend22({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }
            }
          }else if(_this.expressInfo.flag === 'put'){
            if(this.detailType==1){
              if(this.detailMenu==1){
                eidtContractSend11({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }else if(this.detailMenu==2){
                eidtContractSend12({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }
            }else if(this.detailType==2){
              if(this.detailMenu==1){
                eidtContractSend21({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }else if(this.detailMenu==2){
                eidtContractSend22({
                  params: params,
                  success: (params) => {
                    let data = params.data;
                    if (data.code == '0') {
                      _this.getDetailEvent();
                      _this.$message.success(data.msg);
                    } else {
                      _this.$message.error(data.msg);
                    }
                  },
                  showLoading: true
                });
              }
            }
              
          }
          _this.dialogFillVisible = false;
        }else {
          return false;
        }
      });
      
      
    },
    //搜索列表,search区分国内和出境
    searchListBtn(search) {
      let _this = this;
      let params = search==='home'? { data:this.detail_pass_distribute.search.home } : { data:this.detail_pass_distribute.search.abroad };
      this.detail_pass_distribute.pageDate = JSON.parse(JSON.stringify(this.detail_pass_distribute.search));;
      this.pageChange(params,search);
    },
    pageChangeHome(val) {
      let _this = this;
      let params = { data:this.detail_pass_distribute.pageDate.home };
      params.data.page = val;
      this.pageChange(params,'home');
    },
    pageChangeAbroad(val) {
      let _this = this;
      let params = { data:this.detail_pass_distribute.pageDate.abroad };
      params.data.page = val;
      this.pageChange(params,'abroad');
    },
    //分页请求
    pageChange(params,search){
      let _this = this;
      //1是分总司，2为总部
      if(this.detailType==1){
        searchFenfaContractList1({
          params: params,
          success: (params) => {
            let data = params.data;
            if (data.code == '0') {
              if(search==='home'){
                _this.detail_pass_distribute.form.home = data.data;
              }else if(search==='abroad'){
                _this.detail_pass_distribute.form.abroad = data.data;
              }
              // _this.$message.success(data.msg);
            } else {
              _this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }else if(this.detailType==2){
        searchFenfaContractList2({
          params: params,
          success: (params) => {
            let data = params.data;
            if (data.code == '0') {
              if(search==='home'){
                _this.detail_pass_distribute.form.home = data.data;
              }else if(search==='abroad'){
                _this.detail_pass_distribute.form.abroad = data.data;
              }
              _this.$message.success(data.msg);
            } else {
              _this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }
    },
    //保存
    SaveDistribute() {
      let _this = this;
      // console.log(this.detail_pass_distribute.save.homeCheckList);
      let params = {
        data: {
          id:this.detailId,
          contract_ids:(Object.values(this.detail_pass_distribute.save.homeCheckList)).concat(Object.values(this.detail_pass_distribute.save.abroadCheckList)),
          remark:this.detail_pass_distribute.save.remark
        }
      };
      if(this.detailType==1){
        searchFenfaContract1({
          params: params,
          success: (params) => {
            let data = params.data;
            if (data.code == '0') {
              _this.detail_pass_distribute.dialogDistributeVisible=false;
              _this.$message.success(data.msg);
              _this.getDetailEvent();
            } else {
              _this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }else if(this.detailType==2){
        searchFenfaContract2({
          params: params,
          success: (params) => {
            let data = params.data;
            if (data.code == '0') {
              _this.detail_pass_distribute.dialogDistributeVisible=false;
              _this.$message.success(data.msg);
              _this.getDetailEvent();
            } else {
              _this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }
      
    },
    changeCheckbox(item,type,event){
      if(type==='home'){
        if(event.target.checked===true){
          this.detail_pass_distribute.save.homeCheckList[item.contract_no]=item.id;
        }else{
          this.detail_pass_distribute.save.homeCheckList[item.contract_no] && (delete this.detail_pass_distribute.save.homeCheckList[item.contract_no]);
        }
      }else{
        if(event.target.checked===true){
          this.detail_pass_distribute.save.abroadCheckList[item.contract_no]=item.id;
        }else{
          this.detail_pass_distribute.save.abroadCheckList[item.contract_no] && (delete this.detail_pass_distribute.save.abroadCheckList[item.contract_no]);
        }
      }
      
    },
    deleteCheck(item,index,type){
      if(type==='home'){
        this.detail_pass_distribute.save.homeCheckList[item.contract_no] && (delete this.detail_pass_distribute.save.homeCheckList[item.contract_no]);
        this.detail_pass_distribute.show.homeCheckList.splice(index,1);
      }else{
        this.detail_pass_distribute.save.abroadCheckList[item.contract_no] && (delete this.detail_pass_distribute.save.abroadCheckList[item.contract_no]);
        this.detail_pass_distribute.show.abroadCheckList.splice(index,1);
      }
    }
  },
  created(){
    this.$route.name == 'contractPulldownHeadDetail' ? this.role = 'pulldown' : this.role = 'audit';
    if(this.role == 'pulldown'){
      this.rolePath = 'pulldown';
    }else{
      this.rolePath = 'audit';
    }
  },
  mounted() {
    //获取所有地址列表
    getAddressInfo().then((params)=>{
      let { code, data, msg } = params['data'];
      if(code=='0'){
        for(let item of data){
          let addressObj = {
            id: item.id,
            name: item.name,
            telNum: item.phone,
            address: item.address,
            is_default:item.is_default
          };
          this.addData.push(addressObj);
          this.contractDistriDialog.addData.push(addressObj);
          if(item.is_default === 1){
            this.checkAdd = item.id;
            this.contractDistriDialog.checkAdd = item.id;
          }
        }
      }else{
        this.$message.error(data.msg);
      }
    });
    //获取页面所有表格数据
    this.getDetailEvent();
  }
};
</script>

<style scoped lang="scss">
.cont{
  padding: 20px;
  background-color: #fff;
}
.panel{
  margin-bottom: 20px;
  .hd{
    padding: 10px 0 25px;
    h2{
      display: inline-block;
      color: #b10c79;
      font-size: 18px;
      border-left: 5px solid #b10c79;
      padding-left: 10px;
      line-height: 20px;
    }
  }
  .bd{
    .contract-info{
      position: relative;
      p{
        line-height: 30px;
        .contract-num{
          color: #b10c79;
          margin-right: 10px;
        }
      }
      .info-button{
        position: absolute;
        right: 0;
        top: -10px;
      }
    }
    .el-table{
      .edit-address{
        position: absolute;
        top: 3px;
        right: 14px;
      }
      li {
        line-height: 22px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        .add-left {
          width: 76px;
          text-align: right;
          color: #999;
        }
        .add-right {
          color: #333;
          text-align: left;
          overflow: hidden;
          text-overflow:ellipsis;
          // white-space: nowrap;
          flex: 1;
          span {
            color: #ae1f77;
            margin-left: 10px;
          }
        }
      }
    }
    
  }
}
.el-dialog__wrapper{
  .el-radio-group{
    width: 100%;
    max-height: 260px;
    overflow-y: auto;
    .el-radio {
      margin: 0;
      overflow: hidden;
      padding: 5px 0;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      display: block;
      li {
        line-height: 22px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        .add-left {
          width: 76px;
          text-align: right;
          color: #999;
        }
        .add-right {
          color: #333;
          text-align: left;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          flex: 1;
          span {
            color: #ae1f77;
            margin-left: 10px;
          }
        }
      }
    }
    .check-radio {
      border: 1px solid #b10c79;
      background-color: #fbf3f8;
    }
  }
  .create-cont{
    display: flex;
    margin-bottom: 10px;
    .create-prefix{
      width: 66px;
    }
    .create-year{
      width: 80px;
    }
    .create-num{
      flex: 1;
      margin-left: 8px;
    }
    .create-to{
      width: 26px;
      text-align: center;
    }
  }
  .el-form-item{
    margin-bottom: 10px;
  }
  .select-num{
    color: #333;
    cursor: default;
    li{
      font-family: sans-serif;
      list-style-type: none;
      float: left;
      width: 134px;
      border: 1px dashed #b10c79;
      position: relative;
      height: 24px;
      line-height: 24px;
      padding: 0 4px;
      margin-top: 5px;
      margin-right: 5px;
      font-size: 12px;
      color: #b10c79;
      &:hover{
        background-color: #f7e6f1;
      }
      span{
        position: absolute;
        color: #f2b7df;
        top: 0;
        right: 2px;
        font-size: 26px;
        font-weight: lighter;
        &:hover{
          cursor: pointer;
          color: #b10c79;
        }
      }
    }
  }
  .select-search{
    display: flex;
    .select-section{
      width: 100px;
    }
    .select-search-num{
      flex: 1;
    }
    span{
      width: 20px;
      text-align: center;
    }
  }
  .select-cont{
    border: 1px solid #ccc;
    background-color: #f4f4f4;
    padding: 0 10px;
    .el-checkbox-group{
      overflow: hidden;
    }
    .el-pagination{
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
/* 全局组件样式会有全局污染问题, 要带上组件的最顶级的class */
.contract-detail{
  .el-table{
    td{
      .cell{
        max-height: inherit;
      }
    }
  }
  .el-dialog__wrapper {
    .el-radio{
      .el-radio__input {
        position: absolute;
        right: 41px;
        &.is-checked .el-radio__inner {
          border-color: #820858;
          background: #b10c79;
          &:after {
            background-color: #ffffff;
          }
        }
      }
      .el-radio__label{
        padding: 0;
        > span{
              position: absolute;
              right: 9px;
              top: 7px;
        }
        .el-row {
            padding: 0 5px;
        }
      }
    }
    .el-pagination .btn-next, .el-pagination .btn-prev{
      background-color: transparent;
      border: none;
    }
    .el-pager li{
      background-color: transparent;
      border: none;
      &:hover{
        color: #b10c79;
      }
      &.active{
        color: #b10c79;
        background-color: #fff;
      }
    }
    
  }
}
</style>