<template>
    <div class="add-department"  v-loading.fullscreen.lock="fullscreenLoading">
        <div class="section">基本信息</div>
        <el-form ref="formName" :model="form" :rules="rules"  label-width="110px">
            <el-form-item label="营业部名称" prop="deptName">
                <el-input v-model="form.deptName" placeholder="输入营业部名称"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="country">
                <select-area class="area-select fl" value-key="area_name"  v-model="area_name" clearable />
            </el-form-item>
            <el-form-item >
                <el-input v-model="form.address" placeholder="输入详细地址" maxlength="20"/>
            </el-form-item>
            <el-form-item label="负责人名称" prop="contractName">
                <el-input v-model="form.contractName" placeholder="输入负责人名称" maxlength="20" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contractMobile">
                <el-input v-model="form.contractMobile" placeholder="输入负责人联系电话"/>
            </el-form-item>
            <el-form-item label="微信号">
                <el-input v-model="form.contractWeixin" placeholder="输入微信号"/>
            </el-form-item>
            <el-form-item label="员工人数">
                <el-input v-model="form.employeeQty" @blur="employeeNum" type="number">
                    <template slot="append">人</template>
                </el-input>
            </el-form-item>

            <div class="section">主营业务</div>
             <el-form-item label="国内业务" prop="domesticBusiness">
                <el-input v-model="form.domesticBusiness" :maxlength="15" placeholder="输入主营国内业务项"></el-input>
            </el-form-item>
            <el-form-item label="出境业务" prop="internationalBusiness">
                <el-input v-model="form.internationalBusiness" :maxlength="15" placeholder="输入主营出境业务项"></el-input>
            </el-form-item>

            <div class="section">合作信息</div>
            <el-form-item label="所属公司" prop="companyOrgId">
                <el-select
                    v-model="form.companyOrgId"
                    filterable 
                    clearable
                    remote 
                    :remote-method="querySearchCompanyAsync"
                    :loading="companySearchLoading"
                    @change="changeCompanyCallback"
                    loading-text="搜索中，请稍后"
                    placeholder="输入搜索签约公司">
                    <el-option 
                     v-for="(item, key) in companyList"
                    :key="key"
                    :label="item.company_name"
                    :value="item.company_org_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="合作起止时间" required>
                <div class="lng-lat">
                    <el-col :span="5"> 
                    <el-form-item prop="signBeginDate">
                        <el-date-picker type="date" placeholder="选择起始日期" v-model="form.signBeginDate" style="width:200px"></el-date-picker>
                    </el-form-item></el-col>
                    <el-col  :span="1">--</el-col>
                    <el-col :span="5">
                    <el-form-item prop="signEndDate">
                        <el-date-picker placeholder="选择结束日期" v-model="form.signEndDate" style="width:200px">     
                        </el-date-picker>
                    </el-form-item >
                    </el-col>
                </div>
            </el-form-item>

            
            <el-form-item label="营业执照" prop="licenseFlag">
                <el-radio-group v-model="form.licenseFlag" @change="changeLicense">
                    <el-radio :label="0" >未办理</el-radio>
                    <el-radio :label="1">办理中</el-radio>
                    <el-radio :label="2"> 已办理     
                    </el-radio>
                    <el-date-picker v-if="licenseAlready" placeholder="选择日期" v-model="form.licenseDate" style="width:200px;margin-left:10px"></el-date-picker>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="合作供应商" >
                <div v-for="(item,index) in form.salersDeptSupplier" :key="index" class="partner-list">
                    <el-select
                        v-model="item.supplierName"
                        filterable 
                        clearable
                        remote 
                        :remote-method="partnerAsync"
                        :loading="partnerSearchLoading"
                        @change="changePartnerCallback($event,index)"
                        loading-text="搜索中，请稍后"
                        placeholder="请输入供应商名称">
                        <el-option
                        v-for="(i, key) in partnerList"
                        :key="key"
                        :label="i.name"
                        :value="i.name">
                        </el-option>
                    </el-select>
                    <el-button @click="delPartner(index)" type="primary">删除</el-button>
                </div>
                <el-button @click="addPartner" class="add-partner" type="primary">添加</el-button>
            </el-form-item>                                  
            </el-form>
            <div class="btn">
                <el-button class="submit-btn" type="primary" size="large" @click="submitDepartment">确定</el-button>
            </div>

    </div>
</template>

<script>
import {  getOrginations} from 'src/api/api'
import { createOrder, queryOrderDetail, updateOrder } from 'src/api/salersdept'
import { supplierList } from 'src/api/supplier'
import SelectArea from 'src/plugins/SelectArea.vue'
import * as format from "src/utils/format";
export default {
    name:'AddDepartment',
    data(){
        return{
             form: {
                 deptName:'',//营业部名称
                companyOrgId:'',            
                companyName: '',//所属公司名称
                province: '',//省
                city:'',//市
                country:'',//区县
                contractName:'',//负责人名称
                address:'',//地址
                contractMobile:'',//联系电话
                contractWeixin:'',//微信
                employeeQty:'',//员工人数
                domesticBusiness:'',//国内业务
                internationalBusiness:'',//国际业务
                salersDeptSupplier:[
                  {
                    salesDeptId:'',
                    supplierOrgId:'',
                    supplierName:''
                  }
               ],
                signBeginDate: '',//合作起始时间
                signEndDate: '',//合作结束时间
                licenseDate:'',//执照办理时间
                licenseFlag: '',//执照
                desc: ''
            },
            partnerSearchLoading:false,
            companySearchLoading:false,
            fullscreenLoading:false,
            companyList:[],
            partnerList:[],
            submitPartnerList:[],
            rules:{
                deptName:[
                    { required:true, message:'请输入营业部名称', trigger:'blur' },
                    { pattern:/^[A-Za-z0-9\u4e00-\u9fa5]{1,20}$/, message:'仅支持汉字、字母、数字，最多20位字符',trigger:'blur' }
                ],
                domesticBusiness:[{ required:true, message:'请输入主营国内业务项', trigger:'blur' }],
                internationalBusiness:[{ required:true, message:'请输入主营出境业务项', trigger:'blur' }],
                contractName:[
                    { required:true, message:'请输入负责人名称', trigger:'blur' },
                    { pattern:/^[A-Za-z\u4e00-\u9fa5]{1,}$/, message:'请输入正确的负责人名称',trigger:'blur' }
                ],
                contractMobile:[
                    { required:true, message:'请输入负责人联系电话', trigger:'blur' },
                    { pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/, message: '手机号码格式错误', trigger: 'blur' },
                    ],
                companyOrgId:[{ type: 'number', required:true, message:'请输入搜索签约公司', trigger:'blur' }],
                country:[{ required:true, message:'请选择所在地区', trigger:'blur' }],
                signBeginDate:[{ type: 'date', required:true, message:'请选择合作起始日期', trigger:'blur' }],
                signEndDate:[{ type: 'date', required:true, message:'请选择合作结束日期', trigger:'blur' }],
                licenseFlag:[{ type: 'number',  required:true, message:'请选择营业执照', trigger:'blur' }],
            },
            licenseAlready:false,//营业执照是否已办理
            salesDeptId:'',
            noPushSupplier: false
        }
    },
    components:{
        SelectArea
    },
    computed:{
        area_name: {
            get () {
                return {
                    area_0: this.form.province,
                    area_1: this.form.city,
                    area_2: this.form.country,
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
  },
    mounted(){
        this._queryOrderDetail();
    },
    methods:{
        _queryOrderDetail(){
            this.salesDeptId = this.$route.query.salesDeptId;
            // console.log(this.form.country,'country')
            if(this.salesDeptId){
                queryOrderDetail({
                    params:{
                        salesDeptId:this.salesDeptId
                    },
                    method:'get',
                    success:(res) => {
                        let { flag, data, msg } = res.data;
                        if(flag === 0){
                           data.salersDeptSupplier = data.salersDeptSupplier.length>0?data.salersDeptSupplier:this.form.salersDeptSupplier;
                            this.form = data;
                            this.form.signBeginDate = new Date(data.signBeginDate);
                            this.form.signEndDate = new Date(data.signEndDate);
                            this.form.licenseFlag = data.licenseFlag*1;
                            this.form.licenseFlag == 2 ? this.licenseAlready = true : this.licenseAlready = false
                            this.form.licenseDate = data.licenseDate;
                            this.companyList.push({
                                company_name:data.companyName,
                                company_org_id:data.companyOrgId
                            }) 
                        }else{
                            this.$message.error(msg)
                        }
                    }
                })
            }
        },
        employeeNum(e){
            let num = e.target.value;
            if(num<0){
                 this.$message({
                    message: '员工人数不能小于0',
                    type: 'warning'
                });
            }
            num = num + '';
            if(num.indexOf('.') != -1){
                 this.$message({
                    message: '员工人数不能为小数',
                    type: 'warning'
                });
            }
        },
        changeLicense(item){
            if(item === 2){
                this.licenseAlready = true
            }else{
                this.licenseAlready = false
            }
        },
        submitDepartment(){
            this.$refs.formName.validate((valid) => {
                if (valid) {
                    let params = {
                        deptName:this.form.deptName,
                       p_id:this.form.companyOrgId,
                       companyName:this.form.companyName,
                       nation:'',
                       province:this.form.province,
                       city:this.form.city,
                       country:this.form.country,
                       contractMobile:this.form.contractMobile,
                       domesticBusiness:this.form.domesticBusiness || '',
                       internationalBusiness:this.form.internationalBusiness || '',
                       contractWeixin:this.form.contractWeixin || '',
                       contractName:this.form.contractName,
                       address:this.form.address,
                       employeeQty:this.form.employeeQty || '',
                       licenseFlag:String(this.form.licenseFlag),
                       licenseDate:this.form.licenseDate?format.date(this.form.licenseDate) : '',//执照办理时间
                       licenseBeginDate:'',//执照起始时间
                       licenseEndDate:'',
                       signBeginDate:format.date(this.form.signBeginDate),
                       signEndDate:format.date(this.form.signEndDate),
                       salersDeptSupplier:this.salesDeptId?this.form.salersDeptSupplier:this.submitPartnerList || []

                    }
                    if(this.form.signBeginDate.getTime()>this.form.signEndDate.getTime()){
                        return this.$message({
                                message: '合作结束时间不能早于合作起始时间',
                                type: 'warning'
                        })
                    }
                    if(this.licenseAlready && !this.form.licenseDate){
                        this.$message.error('请选择营业执照办理日期')
                        return
                    }
                    this.fullscreenLoading = true;
                    if(this.salesDeptId){
                        params.salesDeptId = this.salesDeptId
                        
                        updateOrder({
                            params:params,
                            success:(res) => {
                                let { flag, data, msg } = res.data;
                                if(flag === 0){
                                    this.$message({
                                        message: '营业部信息修改成功',
                                        type: 'success'
                                    })
                                     setTimeout(()=>{
                                        this.$router.go(-1)
                                    },1000)
                                }else{
                                    this.$message.error(msg)
                                }

                                this.fullscreenLoading = false;
                            }
                        })
                    }else{
                        createOrder({
                            params:params,
                            success:(res) => {
                                let { data, flag, msg } = res.data;
                                this.fullscreenLoading = false;
                                if( flag === 0){
                                    this.$message({
                                        message:'添加成功',
                                        type:'success',
                                        duration:'800'
                                    })
                                    setTimeout(()=>{
                                        this.$router.go(-1)
                                    },1000)
                                }else{
                                    this.$message.error(msg)
                                }
                            }
                        })
                    }
                   
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        delPartner(index){
            if(this.form.salersDeptSupplier.length>1){
                this.form.salersDeptSupplier.splice(index,1);
                this.submitPartnerList.splice(index,1)
            }
        },
       addPartner(){
        //    let partnerList = this.form.salersDeptSupplier;
           this.partnerList = []
           this.form.salersDeptSupplier.push({
               salesDeptId:'',
               supplierOrgId:'',
               supplierName:''
           })
       },
     partnerAsync(queryString,index){
        //  console.log(queryString,'查询合作商')
         if(queryString !== ''){
           let data = {
               data:{
                   approval_status: "99",
                    city: "",
                    company: queryString,
                    duty_paragraph: "",
                    page: 1,
                    page_size: 10,
                    province: "",
                    status: "0"
               }
           }
           supplierList({
               params:data,
               success:(res) => {
                   let { code, data, msg } = res['data'];
                    if( code === 0 ){
                        this.partnerList = data.data;
                    }
               }
           })
          }
       },
       changePartnerCallback(val,index){
           console.log(val,index,'选中合作商')
           this.submitPartnerList.forEach(item => {
                if(val === item.supplierName) {
                    this.$message.warning("已有该合作供应商")
                    this.noPushSupplier = true
                    this.form.salersDeptSupplier.splice(this.form.salersDeptSupplier.length-1, 1)
                } 
           })
           console.log(this.submitPartnerList,'zhanshi')
        //    this.form.salersDeptSupplier[index] = {
               
        //    }
           let data = {
               data:{
                   approval_status: "99",
                    city: "",
                    company: val,
                    duty_paragraph: "",
                    page: 1,
                    page_size: 10,
                    province: "",
                    status: "0"
               }
           }
           supplierList({
               params:data,
               success:(res) => {
                   let { code, data, msg } = res['data'];
                    if( code == 0 ){
                        console.log(res,'data.data')
                        let salersSupplier = {
                            salesDeptId:'',
                            supplierOrgId:String(data.data[0].approval_id),
                            supplierName:data.data[0].name
                        }
                        !this.noPushSupplier ? this.submitPartnerList.push(salersSupplier) : ""
                    }
                   console.log(this.submitPartnerList,'提交的供应商')
               }
           })
       },
       querySearchCompanyAsync(queryString){
        //    console.log(queryString,'查询所属公司')
           this.form.companyName = queryString;
            this.partnerSearchLoading = true;
           if(queryString !== ''){
                let data = {
                    data:{
                        disabled: "100",
                        landing_finance: "",
                        name: queryString,
                        org_type: "3",
                        page: 1,
                        page_size: 10
                     }
                }
                getOrginations({
                    params:data,
                    success:(res) => {
                        let { code, data, msg } = res['data'];
                        if( code === 0 ){
                            this.partnerSearchLoading = false;
                            this.companyList = data.list;
                        }
                    }
                })
           }
       },
       changeCompanyCallback(item){
        //    console.log(item,'选择的公司')
       },
    }
}
</script>

<style lang="less" scoped>
    .add-department{
        background: #fff;
        padding: 20px;
        .section{
            margin: 20px;
            font-weight: 600;
        }
        .lng-lat{
            width: 880px;
            &::after{
                content: '';
                display: block;
                clear: both;
            }
        }
        .el-col{
            text-align: center;           
        }
        .el-col-5{
           width: 22.83333%;
        }
        .el-input{
            width: 300px;
        }
        .el-select{
            width: 300px;
        }
        .el-select.region{
            width: 148px;
        }
        .partner-list{
            position: relative;
            margin-bottom: 20px;
        }
        .add-partner{
            position:absolute;
            top:3px;
            left:430px;
        }
        .btn{
            margin: 40px;
            margin-left: 20%;
        }
    }
</style>

