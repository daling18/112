<template>
    <div class="wrapper" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="system-tab">
            <ul class="tab-box">
                <template>
                    <router-link  :to="{path:'/basedata/salesDepartment/departmentList'}"  tag="li">营业部信息</router-link>
                </template>
                <li class="on">拜访记录</li>
            </ul>
        </div>
        <div class="system-search">
            <div class="clearfix"> 
                <div class="search-item">
                    <div class="label">营业部名称</div>
                    <el-input v-model="queryDate.deptName" placeholder="输入营业部名称" />
                </div>
                <div class="search-item">
                    <div class="label">负责人</div>
                    <el-input v-model="queryDate.contractName" placeholder="输入负责人姓名" />
                </div>
                <div class="search-item">
                    <div class="label">联系电话</div>
                    <el-input v-model="queryDate.contractMobile" placeholder="输入联系电话" />
                </div>
                <el-button type="primary" @click="queryList">查询</el-button>
            </div>       
        </div>
        <div class="system-content">
            <div class="content-list">
                <el-table :data="tableData" border style="width: 90%">
                    <el-table-column prop="deptName" label="营业部名称" align="center">
                        <template slot-scope="scope">
                            <p class="ellipsis" :title="scope.row.departmentName">
                                {{ scope.row.deptName }}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contractName" label="负责人名称"   align="center"></el-table-column>
                    <el-table-column prop="contractMobile" label="联系电话" align="center"></el-table-column>
                    <el-table-column prop="visitTimes" label="拜访次数"  align="center"></el-table-column>
                    <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="$menuPermission('basedata/VisitDetailsList/add')" @click="addVisitBtn(scope.row,scope.$index)" type="text" size="small">添加记录</el-button>
                        <el-button v-if="scope.row.isShowDetailList" @click="queryVisitDetailList(scope.row,scope.$index)" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        
        <div class="pagebox">
            <div class="page-message">      
                <div class="totalpage">共{{pageNum}}页/{{totalPage}}条数据</div> 
                <el-button :class="activePage?'activeCss':''" @click="onePageBtn">首页</el-button>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    :pager-count="9"
                    layout=" prev, pager, next"
                    :total="totalPage">
                </el-pagination>
                <el-button :class="activeLastPage?'activeCss':''" @click="lastPageBtn">末页</el-button>
            </div>
        </div>
        </div>
        <div >
            <el-dialog title="拜访记录" :visible.sync="dialogFormVisible" >
                <el-form :model="formVisit" :rules="rules" ref="addVisit">
                    <el-form-item label="拜访人" label-width="150px" prop="name">
                        <el-input v-model="formVisit.name" placeholder="输入拜访人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="拜访时间" label-width="150px" prop="visitDate">
                        <el-date-picker type="date" placeholder="选择拜访日期" v-model="formVisit.visitDate" style="width:200px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="拜访备注" label-width="150px" prop="remarks">
                        <el-input
                            type="textarea"
                            :rows="8"
                            :maxlength="500"
                            placeholder="请输入备注内容"
                            v-model="formVisit.remarks">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="门店照片" label-width="150px">
                        <el-upload
                            action="/api/v1/basedata/yyb-info/upload-visit-notes"
                            list-type="picture-card"
                            :before-upload="handlePictureBeforeUpload"
                            :on-success="handlePictureUploadSuccess"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddVisit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { queryVisitOrderSum, createVisitOrder } from 'src/api/salersdept'
import * as format from "src/utils/format";

export default {
    name:'VisitList',
    data(){
        return{
            queryDate:{
                deptName:'',
                contractName:'',
                contractMobile:''
            },
            tableData:[],
            totalPage:null,
            pageNum:'',
            currentPage:1,
            activePage:false,
            activeLastPage:false,
            dialogFormVisible:false,
            fullscreenLoading:false,
            formVisit:{
                name:'',
                visitDate:'',  
                remarks:''  
            },
            salesDeptId:'',
            rules:{
                name:[
                    { required:true, message:'请输入拜访人名称', trigger:'blur' },
                    { max:20,  message:'拜访人名称最多输入20个字符', trigger:'blur' }
                    ],
                visitDate:[{ type: 'date', required:true, message:'请选择拜访时间', trigger:'blur' }],
                remarks:[
                    { required:true, message:'请输入备注内容', trigger:'blur' },
                    { max:500,  message:'最多输入500个字符', trigger:'blur' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            picUploadData:{
                product_id: '109'
            },
            storeImg: ""
        }
    },
    methods:{
        queryList(){
            this.fullscreenLoading = true;
            let params = {
                salesDeptName: this.queryDate.deptName,
                contractMobile: this.queryDate.contractMobile,
                contractName: this.queryDate.contractName,
                pageNo: this.currentPage,
                pageSize: 10
            }
            queryVisitOrderSum({
                params:params,
                success:(res) => {
                    let { flag, data, msg } = res.data;
                    if(flag === 0 ){
                        this.tableData = data.list;
                        this.tableData.forEach(item => {
                           item.isShowDetailList = item.visitTimes != '0'?true:false;
                        })
                        this.totalPage = data.total_count;
                        this.pageNum = Math.ceil(this.totalPage/10)
                    }else{
                        this.$message.error(msg);
                        
                    }
                    this.fullscreenLoading = false;
                }
            })
        },
        submitAddVisit(){
            this.$refs.addVisit.validate((valid) => {
                if(valid){
                    this.dialogFormVisible = false;
                    
                        let params = [{
                            deptName:this.deptName,
                            salesDeptId : this.salesDeptId,
                            visitor : this.formVisit.name,
                            visitDate : format.date(this.formVisit.visitDate),
                            visitContent : this.formVisit.remarks,
                            imgUrl: this.storeImg
                        }]
           
                      createVisitOrder({
                          params:{
                              salersDeptVisitList:params
                          },
                          success:(res) => {
                              let { flag, data, msg } = res.data;
                              if( flag === 0 ){
                                  this.queryList()
                              }
                            let  formVisit={
                                        name:'',
                                        visitDate:'',  
                                        remarks:''  
                                    };
                            this.formVisit = formVisit;
                          }
                      })
                }else{
                    console.log('err')
                    return false;
                }
            })   
        },
        handleRemove(file, fileList) {
            this.storeImg = ""
        },
        handlePictureBeforeUpload(file) {
            const isJPG = ['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) > -1 ;
            let reUploud = true
            if (!isJPG) {
                this.$message.error('上传图片只能是 jpg、jpeg、png 格式!');
            }
            if (this.storeImg) {
                this.$message.error("只能上传一张图片")
                reUploud = false
            }
            return isJPG && reUploud;
            
        },
        handlePictureUploadSuccess(response, file, fileList) {
            let { code, data, msg } = response;

            if(code == 0){
                this.storeImg = data.path
            }else{
                this.$message.error(msg);
            }

        },
        addVisitBtn(row,index){
            this.salesDeptId = row.salesDeptId;
            this.deptName = row.deptName;
            this.dialogFormVisible = true;
        },
        queryVisitDetailList(row,index){
           this.$router.push({
               path:'/basedata/salesDepartment/visitDetailsList',
               query:{
                   salesDeptId:row.salesDeptId,
                   deptName: row.deptName
               }
           })
        },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      onePageBtn(){
          this.currentPage = 1;
          this.activePage = true;
          this.activeLastPage = false;
          this.queryList();
      },
      lastPageBtn(){
          this.currentPage = this.pageNum;
          this.activeLastPage = true;
          this.activePage = false;
          this.queryList();
      },
      handleCurrentChange(val) {
        val == 1 ? this.activePage = true : this.activePage = false
        val == this.pageNum ? this.activeLastPage = true : this.activeLastPage = false
        this.currentPage = val;
        this.queryList();
      }
    },
    mounted(){
        this.queryList();
        
    }
}
</script>

<style lang="less" scoped>
.system-search {
    .search-item{
        .label{
            margin: 0 10px 0 -50px;
            width: 70px;
        }
    } 
}
.el-table{
    margin: 0 auto;
}
.el-dialog__header{
            border-bottom: 1px solid red;
        }
.el-dialog__wrapper{
    .el-dialog--small{
        .el-dialog__header{
            border-bottom: 1px solid red;
        }
        .el-input{
            width:200px;
        }
        .el-textarea{
            width: 400px;
        }
    }
}
.pagebox{
    background: #fff;
    position: relative;
    height: 60px;
    width: 100%;
    .totalpage{
        min-width: 120px;
        text-align: center;
        line-height: 30px;
    }
    .page-message{
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        .activeCss{
            color: #fff;
            background: #b10c79;
            border: 1px solid #b10c79;
        } 
    }
}
.clearfix.right{
    padding-right: 100px;
    margin-top: 15px;
    .el-button{
        float: right;
        margin-left: 10px;
    }
}
.el-table{
    th{
        text-align: center;
    }
}
</style>
