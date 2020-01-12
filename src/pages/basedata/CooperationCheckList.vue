<template>
  <div class="wrapper supplier-wrap">
    <div class="system-search">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">关键词</div>
          <el-input v-model="searchData.company_name" placeholder="输入合作公司名称"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button @click="handleSearch(true)" type="primary">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="button-bar">
        <el-button
          v-if="orderType == 'client'"
          type='primary'
          @click="handleSubmit()">
          保存
        </el-button>
        <el-button 
          v-if="orderType == 'company'"
          type='primary'
          @click="handleSponsor()">
          发起
        </el-button>
        <el-button
          @click="$router.go(-1)">
          返回
        </el-button>
      </div>
      <div class="content-list">
        <el-table
          v-if="orderType == 'client'"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width='38' />
          <el-table-column
            label='勾选合作客户'
            align='center'
            min-width='200'
            >
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.company_name">
                {{scope.row.company_name}}
              </div>
            </template>
          </el-table-column>
          <!-- 返佣比例注释4LJ -->
          <!-- <el-table-column
            align='center'
            label="设置返佣比例"
            width='120'>
            <template slot-scope="scope">
              <input-number  v-model="scope.row.share_benefit_proportion" :number='true' :max='100' :min='0' class="ipt"/> %
            </template>
          </el-table-column> -->
          <el-table-column
            align='center'
            label="合作有效期截至"
            width='160'>
            <template slot-scope="scope">
              <el-date-picker 
                v-model="scope.row.cooperation_validity_period"
                type="date"
                placeholder="选择日期"
                :editable="false"
              />
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="选择合作线路"
            width="130"
            >
            <template slot-scope="scope">
              <span class="col-main"
                @click="handleSelectLine(true, scope.$index)">
                合作线路
              </span>
              <el-tooltip placement="bottom-end"
                v-show="scope.row.class_ids_1.length > 0">
                <div slot="content">
                  <span v-for="(o,i) in scope.row.class_ids_name"
                    :key="i">
                    {{o}} 
                  </span>
                </div>
                <el-button class="review">
                  已选
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="orderType == 'company'"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%"
          ref="multipleTable"
          >
          <el-table-column
            type="selection"
            width='38' />
          <el-table-column
            label="分公司"
            align='center'
            min-width='200'
            >
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.org_name">
                {{scope.row.org_name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="合作有效期截至"
            width='160'>
            <template slot-scope="scope">
              <el-date-picker 
                v-model="scope.row.end_time"
                type="date"
                placeholder="选择日期"
                :editable="false"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination layout="prev, pager, next" 
          v-if="pageShow"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :total="pagination.totalCount"
          :page-size="pagination.size"/>
      </div>
    </div>
    <!--选择合作线路弹窗-->
    <el-dialog title="选择合作线路"
      :visible.sync="dialogLineVisible"
      :close-on-click-modal=false
      :close-on-press-escape=false>
      <div class="diag-line-con">
        <div class="line-tree">
          <div class="line-wrap" v-for="(item, index) in class_ids_list" :key="index">
            <div class="line-one">
              <el-checkbox @change="handleCheck(1, item)" v-model="item.check" :indeterminate="item.isIndeterminate"></el-checkbox>
              <span class="line-tit po"><span v-if="item.child && item.child.length > 0" @click="item.showchild=!item.showchild" class="arror" :class="item.showchild ? '' : 'rotate'"></span>{{item.name}}</span>
            </div>
            <el-collapse-transition>
              <div v-show="item.showchild">
                <div class="line-two" v-for="(item2, index2) in item.child" :key="index2">
                  <el-checkbox @change="handleCheck(2, item2)" v-model="item2.check" :indeterminate="item2.isIndeterminate"></el-checkbox>
                  <span class="line-tit po"><span v-if="item2.child && item2.child.length > 0" @click="item2.showchild=!item2.showchild" class="arror" :class="item2.showchild ? '' : 'rotate'"></span>{{item2.name}}</span>
                  <el-collapse-transition>
                    <div v-show="item2.child && item2.child.length > 0 && item2.showchild" class="line-three clearfix">
                      <span v-for="(item3, index3) in item2.child" :key="index3" class="line-item">
                        <el-checkbox @change="handleCheck(3, item3)" v-model="item3.check" :indeterminate="item3.isIndeterminate"></el-checkbox>
                        <span class="line-tit">{{item3.name}}</span>
                      </span>
                    </div>
                  </el-collapse-transition>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSelectLine(false)">取 消</el-button>
        <el-button @click="handleSelectLine('submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/选择合作线路弹窗-->
  </div>
</template>
<script>
import _ from 'lodash';
import {
  getAllParamProductList,
} from 'src/api/supplier';
import {
  haveNotCooperativeCustomers,
  addCooperativeCustomers,
  searchFilialeCooperation,
  sponsorFilialeCooperation
} from 'src/api/api_supplier';
import InputNumber from 'src/plugins/InputNumber.vue';
import {
  formattDate
} from 'src/assets/js/common.js';
export default {
  data () {
    return {
      searchDataOrigin: {
        company_name: '',
        page: 1
      },
      searchData: {
        company_name: this.$route.query.company_name,
        page: 1
      },
      allData: [],
      tableData: [],
      storageIds: {},
      pagination: {
        currentPage: 1,
        totalCount: 0,
        totalPage: 0,
        size: 10
      },
      pageShow: false,
      multipleSelection: [],
      dialogLineVisible: false,
      lineIdx: null,
      class_ids_list: [],
      allSelectData: [],
      allSelectOrgId: []
    }
  },
  computed:{
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'cooperationCheckList':
          type = 'client';
          break;
        case 'filialeCooperationInitiate':
          type = 'company';
          break;
      }
      return  type;
    },
    getList(){
      let routeName = this.$route.name,
          fun = '';
      switch(routeName){
        case 'cooperationCheckList':
          fun = haveNotCooperativeCustomers;
          break;
        case 'filialeCooperationInitiate':
          fun = searchFilialeCooperation;
          break;
      }
      return fun;
    }
  },
  components:{
    InputNumber
  },
  methods: {
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }
      this.getList({
        params,
        success: (res) => {
          let {code, data, msg} = res.data
          if (code === 0) {

            if(this.orderType == 'client'){
              this.allData = data;
              this.tableData = data.data;
              const t = new Date(Date.now() + 31536000000);
              this.tableData.forEach((v,i,a) => {
                this.$set(v, "share_benefit_proportion", 1);
                this.$set(v, "cooperation_validity_period", t);
                this.$set(v, "class_ids_1", []);
                this.$set(v, "class_ids_2", []);
                this.$set(v, "class_ids_3", {});
                this.$set(v, "class_ids_name", {});
                let key = i;
                // 创建一个数据存放库放所有合作线路待重新载入用
                this.storageIds[key] = [];
              });
              this.getAllParamProductList();
            }else{
              this.allData = data;
              this.tableData = data.list;
              // this.allSelectOrgId[this.searchData.page] = this.allSelectData[this.searchData.page];
              var arr = [];
              for(var i=0;i<data.list.length;i++){
                if(this.allSelectData[this.searchData.page]){
                  for(var y=0;y<this.allSelectData[this.searchData.page].length;y++){
                    if(this.allSelectData[this.searchData.page][y].org_id == data.list[i].org_id){
                      arr.push(data.list[i]);
                    }
                  }
                }
              }
              this.allSelectOrgId[this.searchData.page] = arr;
              this.$nextTick(function(){
                this.toggleSelection(); //每次更新了数据，触发这个函数即可。
              })
            }
            this.pagination.currentPage = data.page_index;
            this.pagination.totalCount = data.total_count * 1;
            this.pagination.totalPage = data.total_page;
            this.pageShow = data.total_page > 1 ? true : false;

          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    getAllParamProductList () {
      this.class_ids_list = [];
      getAllParamProductList({
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            result.data.forEach((item, index) => {
              item.check = false
              item.isIndeterminate = false
              item.index = index
              item.showchild = false
              if (item.child.length > 0) {
                item.child.forEach((item2, index2) => {
                  item2.check = false
                  item2.isIndeterminate = false
                  item2.showchild = false
                  item2.parindex = [index]
                  item2.index = index2
                  if (item2.child.length > 0) {
                    item2.child.forEach((item3, index3) => {
                      item3.check = false
                      item3.isIndeterminate = false
                      item3.parentid = item2.id
                      item3.parindex = [index, index2]
                      item3.index = index3
                    })
                  }
                })
              }
              this.class_ids_list.push(item)
            })
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    handleCheck (type, itm) {
      if (type === 1) {
        if (this.class_ids_list[itm.index].check) {
          this.class_ids_list[itm.index].child.forEach((item, index) => {
            item.check = true
            item.isIndeterminate = false
            if (item.child.length > 0) {
              item.child.forEach((item2, index2) => {
                item2.check = true
              })
            }
          })
        } else {
          this.class_ids_list[itm.index].child.forEach((item, index) => {
            item.check = false
            item.isIndeterminate = false
            if (item.child.length > 0) {
              item.child.forEach((item2, index2) => {
                item2.check = false
              })
            }
          })
        }
        this.class_ids_list[itm.index].isIndeterminate = false
      } else if (type === 2) {
        if (this.class_ids_list[itm.parindex[0]].child[itm.index].check) {
          this.class_ids_list[itm.parindex[0]].child[itm.index].child.forEach((item, index) => {
            item.check = true
          })
        } else {
          this.class_ids_list[itm.parindex[0]].child[itm.index].child.forEach((item, index) => {
            item.check = false
          })
        }
        this.class_ids_list[itm.parindex[0]].child[itm.index].isIndeterminate = false
        let len = 0
        this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
          if (item.check) {
            len = len + 1
          }
        })
        if (len === this.class_ids_list[itm.parindex[0]].child.length) {
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = false
        } else if (len === 0) {
          this.class_ids_list[itm.parindex[0]].check = false
          this.class_ids_list[itm.parindex[0]].isIndeterminate = false
        } else {
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
        }
      } else if (type === 3) {
        let len = 0
        this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].child.forEach((item, index) => {
          if (item.check) {
            len = len + 1
          }
        })
        if (len === this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].child.length) {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = true
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = false
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
          let pLen = 0
          this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
            // 添加item.isIndeterminate，避免前面分组有勾选，最后一组全选导致一级复选框是全选的现象
            if (item.check && !item.isIndeterminate) {
              pLen = pLen + 1
            }
          })
          if (pLen === this.class_ids_list[itm.parindex[0]].child.length) {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          }
        } else if (len === 0) {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = false
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = false
          let item2len = 0
          this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
            if (item.check) {
              item2len = item2len + 1
            }
          })
          if (item2len === 0) {
            this.class_ids_list[itm.parindex[0]].check = false
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          } else if (item2len === this.class_ids_list[itm.parindex[0]].child.length) {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          } else {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = true
          }
        } else {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = true
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = true
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
        }
      }
    },
    handleCurrentChange (val) {
      this.searchDataOrigin.page = val;
      this.handleSearch();
    },
    handleSelectLine(type, idx){
      if(type === true){
        this.dialogLineVisible = true;
        this.lineIdx = idx;
        if(!this.isEmptyArr(this.storageIds[idx])){
          this.class_ids_list = _.cloneDeep(this.storageIds[idx]);
        }else{
          this.class_ids_list.forEach(v=>{
            if(v.check){
              v.check = false;
              v.isIndeterminate = false;
              v.child.forEach(v2=>{
                v2.check = false;
                v2.isIndeterminate = false;
                v2.child.forEach(v3=>{
                  v3.check = false;
                  v3.isIndeterminate = false;
                });
              });
            }
          });
        }
      }else if(type === false){
        this.dialogLineVisible = false;
        this.class_ids_list.forEach(v=>{
          if(v.check){
            v.check = false;
            v.isIndeterminate = false;
            v.child.forEach(v2=>{
              v2.check = false;
              v2.isIndeterminate = false;
              v2.child.forEach(v3=>{
                v3.check = false;
                v3.isIndeterminate = false;
              });
            });
          }
        });
      }else if(type === 'submit'){
        let arr1 = [],
          arr2 = [],
          obj3 = {},
          arrName1 = [],
          arrName2 = [],
          arrName3 = [];
        this.storageIds[this.lineIdx] = _.cloneDeep(this.class_ids_list);
        this.class_ids_list.forEach(v=>{
          if(v.check){
            arr1.push(v.id);
            arrName1.push(v.name);
            v.child.forEach(v2=>{
              if(v2.check){
                arr2.push(v2.id);
                arrName2.push(v2.name);
                let keyId = v2.id,
                  a = [];
                v2.child.forEach(v3=>{
                  if(v3.check){
                    a.push(v3.id);
                    arrName3.push(v3.name);
                  }
                });
                obj3[keyId] = a;
              }
            });
          }
        });
        this.tableData[this.lineIdx].class_ids_1 = arr1;
        this.tableData[this.lineIdx].class_ids_2 = arr2;
        this.tableData[this.lineIdx].class_ids_3 = obj3;
        this.tableData[this.lineIdx].class_ids_name = arrName3;
        this.dialogLineVisible = false;
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      this.allSelectData[this.searchData.page] = val;
    },
    toggleSelection() {
      var that = this;
      if (that.allSelectOrgId[that.searchData.page]) {
        that.allSelectOrgId[that.searchData.page].forEach(row => {
          console.log(row);
          that.$refs.multipleTable.toggleRowSelection(row,true);
        });
      } 
    },
    handleSubmit(){
      if(this.multipleSelection.length > 0){
        let accessStatus = true;
        this.multipleSelection.forEach((v,i,a)=>{
          // 验证由后端进行 by qzhchen 20181207
          // if(v.class_ids_1.length == 0){
          //   this.$message.error('有未选择的合作线路需要先选择');
          //   accessStatus = false;
          //   return false;
          // }
          v.cooperation_validity_period = v.cooperation_validity_period ? formattDate(v.cooperation_validity_period) : '';
        });
        if(accessStatus){
          addCooperativeCustomers({
            params: {
              data: this.multipleSelection
            },
            success: (res) => {
              let {code, data, msg} = res.data
              if (code === 0) {
                this.$message.success(msg);
                this.$router.push({
                  path: '../cooperation'
                });
              } else {
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        }
      }else{
        this.$message.error('请选择至少一条客户');
      }
    },
    handleSponsor(status){

      if(this.allSelectData.length > 0){
        let accessStatus = true;
        let arr = [];
        this.allSelectData.forEach((v,i,a)=>{
          if(v){
            for(var y =0; y < v.length; y++){
              var obj = {
                org_id: v[y].org_id,
                end_time: v[y].end_time
              }
              arr.push(obj)
            }
          }
        });
        if(accessStatus){
          sponsorFilialeCooperation({
            params: {
              data: {org_id: arr}
            },
            success: (res) => {
              let {code, data, msg} = res.data
              if (code === 0) {
                this.$message.success(msg);
                this.handleSearch();
              } else {
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        }
      }else{
        this.$message.error('请至少选择一个分公司');
      }
    },
    isEmptyArr(obj) {
      if (!obj && obj !== 0 && obj !== "") {
        return true;
      }
      if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
      }
      if (
        Object.prototype.isPrototypeOf(obj) &&
        Object.keys(obj).length === 0
      ) {
        return true;
      }
    },
  },
  mounted() {
    this.handleSearch(true);
  },
}
</script>
<style lang="less" scoped>
.button-bar{
  line-height: 30px;
  background: #fff;
  padding: 15px 15px 0;
  overflow: hidden;
}
.ipt{
  display: inline-block;
  width: 50px;
}
.el-date-editor.el-input{
  width: 140px;
}
.col-main{
  cursor: pointer;
  color: #b10c79;
}
.line-wrap{
  overflow-y: auto;
}
.review{
  width: auto;
  height: auto;
  line-height: 20px;
  border: none;
  background: transparent;
  font-size: 12px;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
  vertical-align: 1px;
}
</style>
