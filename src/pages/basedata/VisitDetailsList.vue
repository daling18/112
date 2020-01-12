<template>
    <div class="visit">
        <div class="head">{{departmentName}}拜访记录</div>
        <div class="addBtn"><el-button type="primary" @click="addVisit">添加记录</el-button></div>
         <el-table :data="visitDetailsList" border style="width: 81%">
            <el-table-column prop="visitor" label="拜访人" align="center" width="100">
            </el-table-column>
            <el-table-column prop="visitDate" label="拜访时间"   align="center" width="120"></el-table-column>
            <el-table-column prop="visitContent" label="拜访备注" align="center"  show-overflow-tooltip></el-table-column>
            <el-table-column  label="操作" align="center" width="90">
            <template slot-scope="scope">
                <el-button @click="queryVisitDetail(scope.row,scope.$index)" type="text" size="small">查看</el-button>
            </template>
            </el-table-column>
        </el-table>
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

         <div >
            <el-dialog title="拜访记录" :visible.sync="addVisitFormdialog" >
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
                            :rows="5"
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
                    <el-button @click="addVisitFormdialog = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddVisit">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div >
            <el-dialog  :visible.sync="dialogFormVisible" class="dialog-box">
                <div class="dialog-body">
                    <div class="remarks-title">拜访信息</div>
                    <div class="visitDetail">
                        <div>拜访人</div><div>{{visitdetail.visitor}}</div>
                        <div>拜访时间</div><div>{{visitdetail.visitDate}}</div>  
                    </div>
                    <div class="remarks-title">拜访备注</div>
                    <div class="remarks">{{visitdetail.visitContent}}</div>
                    <div v-if="visitdetail.imgUrl">
                        <div class="remarks-title">门店照片</div>
                        <div class="store-img">
                            <img :src="visitdetail.imgUrl" alt="">
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { queryVisitOrder, createVisitOrder } from 'src/api/salersdept'
import * as format from "src/utils/format";

export default {
    name:'VisitDetailsList',
    data(){
        return{
            departmentName:'',
            visitDetailsList: [],
            totalPage:null,
            pageNum:'',
            currentPage:1,
            activePage:false,
            activeLastPage:false,
            dialogFormVisible:false,
            addVisitFormdialog:false,
            visitdetail:{
                visitor:'',
                visitData:'',
                remarks:''
            },
             formVisit:{
                name:'',
                visitDate:'',  
                remarks:''  
            },
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
            salesDeptId: "",//营业部ID
            dialogImageUrl: '',
            dialogVisible: false,
            picUploadData:{
                product_id: '109'
            },
            storeImg: ""
        }
    },
     mounted(){
        this.departmentName = this.$route.query.deptName
        this.salesDeptId = this.$route.query.salesDeptId
        this.queryInit()
    },
    methods:{
        queryInit(){
            let params = {
                salesDeptId: this.salesDeptId,
                salesDeptName: "",
                contractMobile: "",
                contractName: "",
                pageNo: 1,
                pageSize: 10
            }
            queryVisitOrder({
                params:params,
                success:(res)=>{
                    let { flag, data, msg } = res.data;
                    if(flag === 0){
                        this.visitDetailsList = data.list;
                        this.totalPage = data.total_count;
                        this.pageNum = Math.ceil(this.totalPage/10)
                    }
                }
            })
        },
        submitAddVisit(){
            const _this = this
             _this.$refs.addVisit.validate((valid) => {
                if(valid){
                    _this.addVisitFormdialog = false;
                      
                      let params = [{
                            deptName: _this.departmentName,
                            salesDeptId : _this.salesDeptId,
                            visitor : _this.formVisit.name,
                            visitDate : format.date(this.formVisit.visitDate),
                            visitContent : _this.formVisit.remarks,
                            imgUrl: this.storeImg
                        }]
                      createVisitOrder({
                          params:{
                              salersDeptVisitList:params
                          },
                          success:(res) => {
                              let { flag, data, msg } = res.data;
                              if( flag === 0 ){
                                  _this.queryInit()
                              }
                            let  formVisit={
                                        name:'',
                                        visitDate:'',  
                                        remarks:''  
                                    };
                            _this.formVisit = formVisit;
                          }
                      })
                }else{
                    console.log('err')
                    return false;
                }
            })
        },
        addVisit(){
            this.addVisitFormdialog = true;
        },
        queryVisitDetail(row,index){
            this.dialogFormVisible = true;
            this.visitdetail = this.visitDetailsList[index]
        },
        onePageBtn(){
          this.currentPage = 1;
          this.activePage = true;
        },
        lastPageBtn(){
          this.currentPage = this.pageNum;
          this.activeLastPage = true;
        },
        handleCurrentChange(val) {
          if(val !== 1){
              this.activePage = false;
          }
          if(val !== this.pageNum){
              this.activeLastPage = false;
          }
          this.currentPage = val;
          this.queryInit()
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

        }
    }
}
</script>

<style lang="less" scoped>
 .dialog-box{
    .el-dialog--small {
        width: 40px;
    }
 }
    .visit{
        background: #fff;
        .head{
            padding: 20px 45px 0;
            line-height: 50px;
            height: 45px;
            font-size: 20px;
        }
        .addBtn{
            overflow: hidden;
            .el-button{
                float: right;
                margin: 0 80px 20px;
            }
        }
        .el-table{
            margin: 0 auto;
        }
        .pagebox{
            background: #fff;
            position: relative;
            height: 100px;
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
        .visitDetail{
            display: flex;
            height: 35px;
            line-height: 35px;
            margin: 15px 0 25px 0;
            div{
                width: 122px;
                border:1px solid #666;
                text-align: center;
            }
        }
       
        .dialog-body{
            padding: 0 40px;
            .store-img{
                width: 200px;
                height: 200px;
                margin: 10px 0;
                img{
                    width: 100%;
                    height:100%;
                }
            }
        }
        .remarks-title{
            line-height: 1;
            font-size: 16px;
            font-weight: 700;
            color: #1f2d3d;
        }
        .remarks{
            border: 1px solid #666;
            min-height: 200px;
            padding: 20px;
            margin: 15px 0 25px 0;
            box-sizing: border-box;
        }
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
</style>

