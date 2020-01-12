<template>
    <div class="wrapper" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="system-tab">
            <ul class="tab-box">
                <li class="on">营业部信息</li>
                <template>
                    <router-link :to="{path:'/basedata/salesDepartment/visitList'}" tag="li">拜访记录</router-link> 
                </template>
            </ul>
        </div>
        <div class="system-search">
            <div class="clearfix"> 
                <div class="search-item">
                    <div class="label">营业部名称</div>
                    <el-input v-model="selecDeptName.deptName" clearable placeholder="输入营业部名称"></el-input>
                </div>
                <div class="search-item">
                    <div class="label">负责人姓名</div>
                    <el-input v-model="selecDeptName.contractName" clearable placeholder="输入负责人姓名" />
                </div>
                <div class="search-item">
                    <div class="label">所属公司</div>
                    <el-input v-model="selecDeptName.companyName" clearable placeholder="输入所属公司" />
                </div>
                <div class="search-item">
                    <div class="label" >联系电话</div>
                    <el-input placeholder="输入联系电话" clearable v-model="selecDeptName.contractMobile"/>
                </div>
            </div>
            <div class="clearfix right">
                <router-link
                v-if="$menuPermission('basedata/department/add')"
                    class="right-btn el-button el-button--primary el-button--long"
                    :to="{path: 'addDepartment', query: {}}"
                >添加营业部</router-link>
                <!-- <el-button type="primary" @click="addDepartment">添加营业部</el-button> -->
                <el-button type="primary" @click="queryList">查询</el-button>
            </div>
        </div>
        <div class="system-content">
            <div class="content-list">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column  prop="companyName" label="所属公司" min-width="100" align="center">
                        <template slot-scope="scope">
                        <p class="ellipsis" :title="scope.row.companyName">
                            {{ scope.row.companyName }}
                        </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="deptName" label="营业部名称" min-width="120" align="center">
                        <template slot-scope="scope">
                            <p class="ellipsis" :title="scope.row.deptName">
                                {{ scope.row.deptName }}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contractName" label="负责人名称"  width="90" align="center"></el-table-column>
                    <el-table-column prop="contractMobile" label="联系电话" width="120" align="center"></el-table-column>
                    <el-table-column prop="address"  label="地区" min-width="160" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <p class="ellipsis" :title="scope.row.address">
                                {{ scope.row.address }}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="business"  label="主营业务" min-width="220" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <p class="ellipsis" :title="scope.row.business">
                                {{ scope.row.business }}
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="editDepartment(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
                        <el-button @click="delDepartment(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
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
</template>

<script>
import { queryOrder, deleteOrder } from 'src/api/salersdept'
export default {
    name:'Department',
    data(){
        return{
            selecDeptName:{
                deptName:'',//营业部名称
                contractName:'',//负责人名称
                companyName:'',//分公司名称
                contractMobile:''
            },
            tableData:[],
            totalPage:null,
            pageNum:null,
            currentPage:1,
            activePage:false,
            activeLastPage:false,
            fullscreenLoading:false,
        }
    },
    methods:{
        queryList(){
            this.fullscreenLoading = true;
           let params={
                companyName: this.selecDeptName.companyName,
                contractMobile: this.selecDeptName.contractMobile,
                contractName: this.selecDeptName.contractName,
                deptName: this.selecDeptName.deptName,
                pageNo: this.currentPage || 1,
                pageSize: 10
            }
            queryOrder({
                params:params,
                success:(res) => {
                    let { flag, data, msg } = res.data;
                    if( flag === 0){
                        data.list.forEach(item => {
                            item.address = item.province + item.city + item.country + item.address;
                            item.business = item.domesticBusiness?(item.domesticBusiness + '、'+ item.internationalBusiness):item.internationalBusiness;
                                            
                        })
                        this.tableData = data.list;
                        this.totalPage = data.total_count;
                        this.pageNum = Math.ceil(this.totalPage/10)
                    }else{
                        this.$message.error(msg)
                    }
                    this.fullscreenLoading = false;
                    
                }
        })

        },
        addDepartment(){
           this.$router.push('/basedata/salesDepartment/addDepartment')
        },
        editDepartment(row,index){        
            this.$router.push({
                path:'/basedata/salesDepartment/addDepartment',
                query:{
                    salesDeptId:row.salesDeptId
                    }
                })
        },
        delDepartment(row,index){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.fullscreenLoading = true;
                deleteOrder({
                    params:{
                       salesDeptId:row.salesDeptId 
                    },
                    method:'get',
                    success:(res) => {
                        let { flag, msg } = res.data;
                        if( flag === 0){
                            this.tableData.splice(index,1);
                            if(this.tableData.length === 0){
                                this.queryList();
                            }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error(msg)
                        }
                        this.fullscreenLoading = false;
                    }
                })
            })
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
            margin-left: -75px;
            width: 70px;
        }
    } 
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
    .activeCss{
        color: #fff;
        background: #b10c79;
        border: 1px solid #b10c79;
    }
    .page-message{
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);  
    }
}
.clearfix.right{
    padding-right: 60px;
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


