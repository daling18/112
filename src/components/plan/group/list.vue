<template>
<div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link v-if="$menuPermission('api/product')" to="/trip" tag="li">云平台行程</router-link>
        <router-link class="on" to="/group" tag="li">TDM行程</router-link>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item calendar">
        <div class="label">创建时间</div>
        <el-date-picker v-model="start_date" type="date" placeholder="选择日期"  :editable="false"  :picker-options="datepickerOptions1"></el-date-picker>
        <div class="label zhi">-</div>
        <el-date-picker v-model="end_date" type="date" placeholder="选择日期"  :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
      </div>
      <div class="search-item">
        <div class="label">产品类别</div>
        <el-select v-model="filters.big_category_id" placeholder="请选择">
          <el-option label="跟团游" value="1"></el-option>
          <el-option label="商务考察" value="2"></el-option>
          <el-option label="自助游" value="4"></el-option>
          <!-- <el-option label="邮轮" value="5"></el-option> -->
          <el-option label="短途游(汽车团)" value="11"></el-option>
          <el-option label="快捷旅游" value="12"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">产品编号</div>
        <el-input v-model="filters.product_no" placeholder="产品编号"></el-input>
      </div>
      <div class="search-item">
        <div class="label">负责人</div>
        <el-input v-model="filters.product_owner" placeholder="产品负责人"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="initPageFn">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="mode-table">
          <el-table :data="tableList" class="el-table--middle" border style="width: 100%">
            <el-table-column
              v-for="(col,idx) in cols"
              v-if="!col.template"
              :align="col.align?col.align:''"
              :key="idx"
              :prop="col.prop"
              :label="col.label"
              :fixed="col.fixed"
              :formatter="col.formatter"
              header-align="center"
              :width="col.width?col.width:''">
            </el-table-column>
            <el-table-column v-else
              :align="col.align?col.align:''"
              :prop="col.prop"
              :label="col.label"
              :fixed="col.fixed"
              :formatter="col.formatter"
              header-align="center"
              :width="col.width?col.width:''">

              <template slot-scope="scope">
                <div class="limit-text" :title="scope.row.product_name" v-if="col.label=='产品名称'">
                    {{scope.row.product_name}}
                </div>
                <div class="limit-text" :title="scope.row.destination_city" v-if="col.label=='目的地城市'">
                    {{scope.row.destination_city}}
                </div>
                <div class="limit-text" :title="scope.row.departure_city" v-if="col.label=='出发城市'">
                    {{scope.row.departure_city}}
                </div>
                <div class="tool" v-if="col.label=='操作'">
                  <template v-if="$menuPermission('api/bpm/choose_tuan')">
                    <el-popover
                      placement="right"
                      title=""
                      width="500"
                      @show="selectRow(scope)"
                      trigger="hover">
                      <el-button type="text" slot="reference">团期选团</el-button>
                        <calendar v-model="value[scope.$index]" :hasInput="false" :on-day-click="selectTuanDlg" :validDates="validDates(scope)">
                          <div v-for="evt in scope.row.product_group_for_erp" :slot="evt.departure_date"
                            :key="evt.departure_date">
                            <p v-if="evt.product_group_no_from_erp !== '0' && evt.product_group_no_from_erp !== ''">已选</p>
                            <p class="price" v-else>&yen;{{evt.adult_peer_price}}</p>
                          </div>
                        </calendar>
                    </el-popover>
                  </template>
                  <template v-else>
                    <div style="text-align:center;">-</div>
                  </template>
                </div>
              </template>
            </el-table-column>
          </el-table>
       </div>
      </div>
    </div>

  <!--工具条-->
  <div class="page">
    <el-pagination  layout="prev, pager, next" @current-change="currentPageChange"
                    :total="pagination.total_count"
                    :page-size="pagination.page_size"
                    >
    </el-pagination>
  </div>


  <!--选团成功提示-->
  <el-dialog
    title="操作提示"
    :visible.sync="dialogVisible"
    size="tiny">
    <p>选团成功！可点击团号：<router-link :to="{ path: '/control',query:{tuan_no:tuan_no}}" class="col-purple">{{tuan_no}}</router-link> 或进入控制台查找！</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="chooseSuccess">确 定</el-button>
    </span>
  </el-dialog>

  <!--选择团队-->
  <el-dialog
    title="选择团队"
    :visible.sync="selectTuanVisible">

    <el-form :model="filters" label-width="100px" width="80%" v-if="curdayRow">
      <p class="text">将团期选入控制台后，系统将生成团号与团队名称。
        该团队的计调人员将选定为本账户姓名：<span class="color-orange" style="font-weight:700;">{{username}}</span>。
        确认保存团队？</p>
      <el-form-item label="选择出发日期">
        {{curdayRow.departure_date}}
      </el-form-item>
      <el-form-item label="团队名称">
        <el-input type="textarea" v-model="curdayRow.tuan_name" placeholder="请输入团队名称"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="selectTuanVisible=false">取 消</el-button>
      <el-button type="primary" @click="chooseTuan">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>
  import {getBpmProductList,
          setBpmChooseTuan} from 'src/api/api';
  import Calendar from 'src/plugins/Calendar.vue';
  import { formattDate} from 'src/assets/js/common.js'

  export default {
    data() {
      return {
        value:[],
        dialogVisible:false,
        selectTuanVisible:false,
        username:localStorage.getItem('sysUserName'),
        curdayRow:{},
        tuan_no:'',
        product_group_for_erp:[],
        filters: {
          start_date: '',
          end_date: '',
          big_category_id: '1',
          product_no: '',
          product_owner: ''
        },
        start_date: '',
        end_date: '',
        tableList:[],
        pagination:{
          total_count:0,
          total_page: 0,
          page_size:15,
          page_index: 1,
        },
        cols: [
          {prop: 'product_no', label: '产品编号', width:'150',align:'center'},
          {prop: 'product_name', label: '产品名称', width:'',template:true},
          {prop: 'product_large_type_name', label: '产品类别', width:'80',align:'center'},
          {prop: 'destination_city', label: '目的地城市', width:'120',align:'center', template:true},
          {prop: 'departure_city', label: '出发城市', width:'120',align:'center',template:true},
          {prop: 'tuan_num', label: '已选团队数', width:'100',align:'center'},
          {prop: 'product_owner', label: '产品负责人', width:'100',align:'center'},
          {prop: '', label: '操作', width:'130',template:true,align:'center'}
        ]
      }
    },
    computed:{
        datepickerOptions1(){
          let depart_date = this.end_date;
          return {
            disabledDate(time) {
              return time.getTime() > (new Date(depart_date)).getTime();
            }
          }
        },
        datepickerOptions2(){
          let depart_date = this.start_date;
          return {
            disabledDate(time) {
              return time.getTime() < (new Date(depart_date)).getTime();
            }
          }
        }
      },
    components:{
      'calendar':Calendar
    },
    methods: {
      validDates(scope){
        let group = scope.row.product_group_for_erp;
        let arr = [];
        for(let i in group){
          arr.push(group[i].departure_date);
        }
        return arr;
      },
      initPageFn(){
          let that = this;
        let para = {};
        para.data = this.filters;
        para.data.start_date = this.start_date?formattDate(this.start_date):'';
            para.data.end_date = this.end_date?formattDate(this.end_date):'';
        para.data.page_index = this.pagination.page_index;
        para.data.page_size = this.pagination.page_size;

        getBpmProductList({
          params: para,
          success: (res) => {
            if(!res.data.code){
              let asyncObj = res.data.data;
              this.tableList = asyncObj.product_list;
              this.pagination.total_count = parseInt(asyncObj.total_count,10);
              this.pagination.total_page = parseInt(asyncObj.total_page,10);
              this.pagination.page_size = parseInt(asyncObj.page_size,10);
              this.pagination.page_index = parseInt(asyncObj.page_index,10);
              // 操作第一个有团期的日期组成数组导入日历
              // 初始获得所有的第一个可选团日期&空值（全不可选列）
              let valRes = [],
                // 空列的序号
                valTmp = [],
                // 空列的最后一个日期
                disposeArr = [],
                // 测试匹配用空变量
                valNull = '',
                valNum = 0;
              for(var i = 0; i < this.tableList.length; i++){
                for(var j in this.tableList[i].product_group_for_erp){
                  if(this.tableList[i].product_group_for_erp[j].product_group_no_from_erp == '0' || this.tableList[i].product_group_for_erp[j].product_group_no_from_erp == ''){
                    valRes[i] = j;
                    break;
                  }else{
                    valRes[i] = ''
                  }
                }
              }
              for(var i = 0; i < valRes.length; i++){
                if(valRes[i] == valNull){
                  valTmp.push(i);
                }
              }
              for(var i = 0; i < valRes.length; i++){
                for(var j = 0; j < valTmp.length; j++){
                  if(i == valTmp[j]){
                    for(var k in this.tableList[i].product_group_for_erp){
                      disposeArr[j] = k;
                    }
                  }
                }
              }
              valRes.forEach(function(val,index,arr){
                if(val == ''){
                  valRes.splice(index,1,disposeArr[valNum]);
                  valNum++;
                }
              });
              that.value = valRes;
            }else{
              this.tableList = [];
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        });
      },
      currentPageChange(val) {
        this.pagination.page_index = val;
        this.initPageFn();
      },
      // 日历选团
      selectRow(scope){
        this.curdayRow.product_id = scope.row.product_id;
        this.curdayRow.product_no = scope.row.product_no;
        this.curdayRow.product_name = scope.row.product_name;
        this.curdayRow.tuan_name = scope.row.product_name;
        this.curdayRow.product_large_type = scope.row.product_large_type;
        this.curdayRow.departure_city = scope.row.departure_city;
        this.curdayRow.destination_city = scope.row.destination_city;
        this.curdayRow.product_owner = scope.row.product_owner;
        this.product_group_for_erp = scope.row.product_group_for_erp;
      },
      selectTuanDlg(date,stringify_date){
        let group = this.product_group_for_erp;

        for(let i in group){
          if(group[i].departure_date === stringify_date){
              if(group[i].product_group_no_from_erp === '0' || group[i].product_group_no_from_erp === ''){
                this.selectTuanVisible = true;
                this.curdayRow.departure_date = stringify_date;
                this.curdayRow.adult_peer_price = group[i].adult_peer_price;
                this.curdayRow.product_group_id = group[i].product_group_id;
                this.curdayRow.trip_days = group[i].trip_days;
              }else{
                this.$router.push({path:'/control',query:{tuan_no:this.product_group_for_erp[stringify_date].product_group_no_from_erp}})
                // window.location.href='#/control';
              }
          }else{
            this.curdayRow.sclass='datepicker-item-disable';
          }
        }

      },
      // 选团操作
      chooseTuan(){
        let para = {};
        para.data = this.curdayRow;

        setBpmChooseTuan({
          params: para,
          success: (res) => {
            let asyncObj = res.data.data;
            if(res.data.code == '0'){
              this.tuan_no = asyncObj.tuan_no;
              this.selectTuanVisible = false;
              this.dialogVisible = true;
              this.initPageFn();
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        });
      },
      chooseSuccess(){
        this.dialogVisible = false;
        this.initPageFn();
      }
    },
    mounted() {
      this.initPageFn();
    }
  };
</script>

<style lang="scss" scoped>
.tool a{display: inline-block; color: #20a0ff;}
.el-switch{margin-top:10px;}
.datepicker-dateRange-item-active .price{color: #fff;}
.el-dialog {
  .text{margin-bottom:10px;}
  .el-form-item{margin-bottom: 5px;}
}
.el-popover{
  border: 0;
  padding: 0 !important;
}
.col-purple{
  color: #b10c79;
}
</style>
