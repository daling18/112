<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">所在城市</div>
        <zone-autocomplete v-model="filter.city_id"></zone-autocomplete>
      </div>
      <div class="search-item">
        <div class="label">景区状态</div>
        <el-select v-model="filter.scenic_status" placeholder="请选择">
          <el-option :value="0" label="全部"/>
          <el-option :value="1" label="启用"/>
          <el-option :value="-1" label="停用"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">门票状态</div>
        <el-select v-model="filter.ticket_status" placeholder="请选择">
          <el-option :value="0" label="全部"/>
          <el-option :value="1" label="启用"/>
          <el-option :value="-1" label="停用"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">套餐状态</div>
        <el-select v-model="filter.quote_status" placeholder="请选择">
          <el-option :value="0" label="全部"/>
          <el-option :value="1" label="启用"/>
          <el-option :value="-1" label="停用"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">景区名称</div>
        <el-input v-model="filter.scenic_title" placeholder="景区名称" />
      </div>
      <div class="search-item">
        <div class="label">门票名称</div>
        <el-input v-model="filter.ticket_title" placeholder="门票名称" />
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="queryFilterHandler(1)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="scenic-table-module" v-for="(scenic,idx) in tableData" :key="idx">
          <el-row class="top-level">
            <el-col :span="16">
                <span class="name" v-if="$menuPermission('singlepro/ticket/aeticketpricedet')"
                  @click="$router.push({path:'/singlepro/scenic/detail',query:{id:scenic.id}})">{{scenic.title}}</span> 
                <span class="name" v-else>{{scenic.title}}</span> 
                <span class="space"> | </span>
                <strong class="grade">
                  <template v-if="scenic.grade>0">
                    <span v-for="(g,i) in scenic.grade" :key="i">A</span>
                  </template>
                  <template v-else>未评级</template>
                </strong>
                <span :class="scenic.status == 1? 'canuse':'dontuse'">{{scenic.status == 1?'启用':'禁用'}}</span>
                <div class="address">
                  {{scenic.address}}
                </div>
            </el-col>
            <el-col :span="8">
              <div class="btn-tools">
                <el-button type="text" v-if="$menuPermission('singlepro/ticket/aescen')" 
                  @click="$router.push({path:'/singlepro/scenic/edit',query:{id:scenic.id}})">编辑景区</el-button>
                <el-button type="text" v-if="$menuPermission('singlepro/ticket/aeticket')" 
                  @click="initTicketForm(scenic)">新增门票</el-button>
                <el-button type="text" v-if="$menuPermission('singlepro/ticket/chgscestatus')" 
                  @click="changeScenicStatus(scenic)">{{scenic.status == 1?'禁用':'启用'}}</el-button>
              </div>
            </el-col>
          </el-row>
          <template v-for="(ticket,key) in scenic.ticket_list">
          <div :key="key">
          <el-row class="sub-level">
            <el-col :span="16">
              <div>
                <span class="name" v-if="$menuPermission('singlepro/ticket/ticketdet')"
                  @click="ticketDetailShow(ticket.id,'detail')">{{ticket.name}}</span>
                <span class="name" v-else>{{ticket.name}}</span>
                <span :class="ticket.status == 1? 'canuse':'dontuse'">{{ticket.status == 1?'启用':'禁用'}}</span>
                <i class="fa fa-caret-square-o-down" v-if="ticket.quote_list && ticket.quote_list.length"
                  @click="openShowTicketQuote(idx,key,ticket.isOpenShow)"></i>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="btn-tools">
                <el-button type="text" v-if="$menuPermission('singlepro/ticket/aeticketprice')" 
                  @click="thirdQuoteShowPannel(ticket)">第三报价</el-button>
                <el-button type="text" v-if="$menuPermission('singlepro/ticket/aeticketprice')" 
                  @click="$router.push({path:'/singlepro/scenic/quote',query:{ticketId:ticket.id}})">新增报价</el-button>
                <el-button type="text" v-if="$menuPermission('singlepro/ticket/aeticket')" 
                  @click="ticketDetailShow(ticket.id,'form')">编辑门票</el-button>
                <el-button type="text" v-if="$menuPermission('singlepro/ticket/chgticketstatus')" 
                  @click="changeTicketStatus(ticket)">{{ticket.status == 1?'禁用':'启用'}}</el-button>
              </div>
            </el-col>
          </el-row>
          <table class="table-level" v-if="ticket.quote_list && ticket.quote_list.length && ticket.isOpenShow">
            <tr>
              <th>套餐名称</th>
              <th>挂牌价</th>
              <th>零售价</th>
              <th>结算价</th>
              <th>成本价</th>
              <th>上架状态</th>
              <th>供应商</th>
              <th width="120">操作</th>
            </tr>
            <tr v-for="(quote,keys) in ticket.quote_list" :key="keys">
              <td class="quote_name">
                {{quote.quote_name}}
                <span :class="quote.status == 1? 'canuse':'dontuse'">
                  {{quote.status == 1?'启用':'禁用'}}</span>  
              </td>
              <td class="col-orange">&yen;{{quote.shop_price}}</td>
              <td class="col-orange">&yen;{{quote.sale_price}}</td>
              <td class="col-orange">&yen;{{quote.settlement_price}}</td>
              <td class="col-orange">&yen;{{quote.cost_price}}</td>
              <td>{{quote.sale_status | filterSaleStatus(quote.sale_status)}}</td>
              <td>{{quote.src_name}}</td>
              <td>
                <!-- 销售状态： 1 未上架 2 审批中 3 已上架 4 上架失败 5 已下架 6 已撤回 -->
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="$menuPermission('singlepro/ticket/aeticketpricedet')"
                      @click.native="$router.push({path:'/singlepro/scenic/quote-detail',
                      query:{quoteId:quote.id}})">详情</el-dropdown-item>
                    <el-dropdown-item @click.native="$router.push({path:'/singlepro/scenic/quote',
                      query:{ticketId:quote.ticket_id,quoteId:quote.id}})" 
                      v-if="$menuPermission('singlepro/ticket/aeticketprice') && quote.sale_status != 2 &&
                      quote.sale_status != 3 && quote.src_id == 2">
                      编辑
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="changeQuoteOperaStatus(quote.id,1)" 
                      v-if="$menuPermission('singlepro/ticket/ticketstatus') && (quote.sale_status == 1 || 
                      quote.sale_status == 4 ||
                      quote.sale_status == 5 ||
                      quote.sale_status == 6)
                      ">上架</el-dropdown-item>
                    <el-dropdown-item @click.native="changeQuoteOperaStatus(quote.id,2)" 
                      v-if="$menuPermission('singlepro/ticket/ticketstatus') && quote.sale_status == 3">下架</el-dropdown-item>
                    <el-dropdown-item @click.native="changeQuoteStatus(quote)" 
                      v-if="$menuPermission('singlepro/ticket/chgticketprice') && quote.sale_status != 2 &&
                      quote.sale_status != 3
                      ">{{quote.status == 1?'禁用':'启用'}}</el-dropdown-item>
                    <el-dropdown-item @click.native="changeQuoteOperaStatus(quote.id,3)" 
                      v-if="$menuPermission('singlepro/ticket/ticketstatus') && quote.sale_status == 2">撤回</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </td>
            </tr>
            <!-- <tr v-else>
              <td colspan="8">
                <div class="warm-tip">
                  <p>暂无数据信息 :)</p>
                </div>
              </td>
            </tr> -->
          </table>
          </div>
          </template>
        </div>
      </div>
    </div>
    <div class="page" v-if="pagination.total_count">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="pagination.total_count"
        :current-page="pagination.page_index"/>
    </div>





  <!-- dialog -->
  <el-dialog
    title="新增门票"
    :visible.sync="ticketFormVis"
    size="small">
      <el-form :model="ticketForm" label-width="100px" ref="ticketForm"
        style="width:300px;"
        class="mod-form" 
        v-if="ticketForm">
        <el-form-item label="景区名称">{{ticketForm.scenic_name}}</el-form-item>
        <el-form-item label="门票名称" prop="name"
          :rules="[
          { required: true, message: '请填写门票名称', trigger: 'blur' },
          { max: 20, message:'门票名称最多 20 个字符', trigger: 'blur'}]"
          >
          <el-input v-model="ticketForm.name" placeholder="门票名称"></el-input>
        </el-form-item>
        <el-form-item label="门票类型" prop="type"
          :rules="[{ required: true, type:'number', message: '门票类型', trigger: 'change' }]"
          >
          <el-select v-model="ticketForm.type" placeholder="请选择">
            <el-option :value="1" label="成人票"/>
            <el-option :value="2" label="儿童票"/>
            <el-option :value="3" label="学生票"/>
            <el-option :value="4" label="老人票"/>
            <el-option :value="5" label="亲子票（1大1小）"/>
            <el-option :value="6" label="家庭票（2大1小）"/>
            <el-option :value="7" label="家庭票（2大2小）"/>
            <el-option :value="8" label="双人票"/>
            <el-option :value="9" label="团队票"/>
            <el-option :value="10" label="优惠票"/>
          </el-select>
        </el-form-item>
        <el-form-item label="门票介绍">
          <el-input type="textarea" v-model="ticketForm.introduce" placeholder="门票介绍"></el-input>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="ticketFormVis = false">取 消</el-button>
      <el-button type="primary" @click="submitTicketForm">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="门票详情"
    :visible.sync="ticketDetailVis"
    size="small">
      <div class="detail-section" v-if="ticketForm">
      <div class="detail-item">
        <div class="detail-lab">景区名称</div>
        <div class="detail-con">{{ticketForm.scenic_name}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">门票名称</div>
        <div class="detail-con">{{ticketForm.name}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">门票类型</div>
        <div class="detail-con">{{ticketForm.type_name}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">门票介绍</div>
        <div class="detail-con">{{ticketForm.introduce}}</div>
      </div>
    </div>  
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ticketDetailVis = false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="第三方报价"
    :visible.sync="thirdPriceVis"
    size="small">
    <div class="third-price-module">
      <div class="system-search">
        <div class="search-item">
          <div class="label">景区名称</div>
          <el-input v-model="thirdFilter.scenic_keyword" placeholder="景区名称" />
        </div>
        <div class="search-item">
          <div class="label">门票名称</div>
          <el-input v-model="thirdFilter.ticket_keyword" placeholder="门票名称" />
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="queryThirdPartTicketQuote">立即搜索</el-button>
        </div>
      </div>
      <div class="third-price-list" v-if="thirdQuote">
        <el-checkbox-group v-model="thirdForm.ids">
        <ul v-if="thirdQuote">
          <li v-for="(quote,idx) in thirdQuote" :key="idx">
            <el-checkbox :label="quote.id">&nbsp;</el-checkbox>
            <p class="name">{{quote.scenic_title}}/{{quote.ticket_title}}/{{quote.src_text}}</p>
            <div class="price-area">
              <span>结算价: {{quote.settlement_price}}</span>
              <span>销售价: {{quote.sale_price}}</span>
              <span>挂牌价: {{quote.shop_price}}</span>
            </div>
          </li>
        </ul>
        </el-checkbox-group>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="thirdPriceVis = false">取 消</el-button>
      <el-button type="primary" @click="toDoThirdPartTicketQuote">确 定</el-button>
    </span>
  </el-dialog>


  </div>
</template>

<script>
import { getSelfSupportScenicList, getYkTicketDetail, 
        setChangeScenicStatus, setChangeTicketStatus, 
        setChangeQuoteStatus, setChangeQuoteSaleStatus,
        setSubmitTicketForm, getThirdPartTicketQuote,
        setSubmitThirdPartQuote } from 'src/api/self_support.goodscate'
import ZoneAutocomplete from './components/HotelZoneAutocomplete.vue';

export default {
  data () {
    return {
      filter:{
        city_id: "",
        scenic_status: 0,
        ticket_status: 0,
        quote_status: 0,
        scenic_title: "",
        ticket_title: "",
      },
      tableData: [],
      ticketFormVis:false,
      ticketForm:null,
      ticketDetailVis:false,
      thirdPriceVis:false,
      thirdFilter:{
        scenic_keyword: "",
        ticket_keyword: ""
      },
      thirdQuote:null,
      thirdForm:{
        ticket_id:'',
        ids:[]
      },
      pagination:{
        total_count: 1,
        total_page: 1,
        page_index: 1,
        page_size: 10,
      }
    }
  },
  components:{
    ZoneAutocomplete
  },
  filters:{
    filterSaleStatus(status){
      // 销售状态 int： 1 未上架 2 审批中 3 已上架 4 上架失败 5 已下架 6 已撤回
      console.log(status)
      let text = '';
      switch(status){
        case 1:
          text = '未上架';
          break;
        case 2:
          text = '审批中';
          break;
        case 3:
          text = '已上架';
          break;
        case 4:
          text = '上架失败';
          break;
        case 5:
          text = '已下架';
          break;
        case 6:
          text = '已撤回';
          break;
      }
      return text;
    }
  },
  watch: {
    $route () {
      this.initFilterHandler();
    },
    thirdPriceVis(val){
      if(!val){
        let thirdFilter = {
          scenic_keyword: "",
          ticket_keyword: ""
        };
        let thirdForm = {
          ticket_id:'',
          ids:[]
        };
        this.$set(this,'thirdFilter',thirdFilter);
        this.$set(this,'thirdQuote',null);
        this.$set(this,'thirdForm',thirdForm);
        
      }
    }
  },
  methods: {
    // 初始化筛选项
    initFilterHandler(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filter = {
          city_id: "",
          scenic_status: 0,
          ticket_status: 0,
          quote_status: 0,
          scenic_title: "",
          ticket_title: "",
        };
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        let jsonFilter = JSON.parse(filter);
        this.$set(this, 'filter', jsonFilter);
        this.$set(this.pagination, 'page_index', jsonFilter.page_index);
      }
      this.scenicDataList();
    },
    scenicDataList() {
      let para = {};
      para.data = JSON.parse(JSON.stringify(this.filter));
      para.data.page_index = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;

      getSelfSupportScenicList({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (!code) {
            this.$set(this,'tableData',data.list);
            this.$set(this.pagination,'page_index', data.page_index);
            this.$set(this.pagination,'total_count', data.total_count);
            this.$set(this.pagination,'total_page', data.total_page);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 搜索筛选函数
    queryFilterHandler(page){
      let filter = {};

      filter = this.filter;
      filter.page_index = page;
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    currentPageChange(page){
      this.queryFilterHandler(page);
    },
    // 切换套餐显隐
    openShowTicketQuote(idx,key,isOpenShow){
      this.$set(this.tableData[idx].ticket_list[key],'isOpenShow',!isOpenShow);
    },
    // 景区状态
    changeScenicStatus(row){
      let para = {};
      para.data = {};
      para.data.id = row.id;
      para.data.status = row.status == 1 ? -1 : 1;

      setChangeScenicStatus({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          this.$message({
            type:code?'error':'success',
            message:msg
          });
          if(!code){
            this.scenicDataList();
          }
        },
        showLoading: true
      });
    },
    // 门票状态
    changeTicketStatus(row){
      let para = {};
      para.data = {};
      para.data.id = row.id;
      para.data.status = row.status == 1 ? -1 : 1;

      setChangeTicketStatus({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          this.$message({
            type:code?'error':'success',
            message:msg
          });
          if(!code){
            this.scenicDataList();
          }
        },
        showLoading: true
      });
    },
    // 报价状态
    changeQuoteStatus(row){
      let para = {};
      para.data = {};
      para.data.quote_type_id = row.id;
      para.data.status = row.status == 1 ? -1 : 1;

      setChangeQuoteStatus({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          this.$message({
            type:code?'error':'success',
            message:msg
          });
          if(!code){
            this.scenicDataList();
          }
        },
        showLoading: true
      });
    },
    // 修改门票套餐状态（上架/下架/撤回）
    changeQuoteOperaStatus(id,status){
      console.log(id)
      let para = {};
      para.data = {};
      para.data.quote_type_id = id;
      para.data.sale_status = status;

      setChangeQuoteSaleStatus({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          this.$message({
            type:code?'error':'success',
            message:msg
          });
          if(!code){
            this.scenicDataList();
          }
        },
        showLoading: true
      });
    },
    // 门票详情
    ticketDetailShow(ticketId,type){
      let para = {};
      para.data = {};
      para.data.id = ticketId;

      getYkTicketDetail({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (!code) {
            this.$set(this,'ticketForm',data);
            if(type == 'detail'){
              this.$set(this,'ticketDetailVis', true);
            }else{
              this.$set(this,'ticketFormVis', true);
            }
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 门票表单初始化
    initTicketForm(scenic){
      let form = {
        id: '',
        scenic_id: scenic.id,
        scenic_name: scenic.title,
        name: '',
        type: '',
        introduce: ''
      }
      this.$set(this,'ticketForm',form);
      this.$set(this,'ticketFormVis', true);
    },
    // 新增编辑门票表单提交
    submitTicketForm(){
      this.$refs['ticketForm'].validate((valid) => {
        if(valid){
          let para = {};
          para.data = JSON.parse(JSON.stringify(this.ticketForm));

          setSubmitTicketForm({
            params: para,
            success: (params) => {
              let {code, msg, data } = params.data;

              this.$message({
                type:code?'error':'success',
                message:msg
              });
              if(!code){
                this.scenicDataList();
                this.$set(this,'ticketFormVis', false);
              }
            },
            showLoading: true
          });
        }
      })

    },
    thirdQuoteShowPannel(ticket){
      this.thirdPriceVis = true;
      this.$set(this.thirdForm,'ticket_id',ticket.id)
    },
    // 获取第三方报价
    queryThirdPartTicketQuote(){
      let para = {};
      para.data = JSON.parse(JSON.stringify(this.thirdFilter));

      getThirdPartTicketQuote({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          this.$message({
            type:code?'error':'success',
            message:msg
          });
          if(!code){
            this.$set(this,'thirdQuote', data);
          }
        },
        showLoading: true
      });
    },
    // 添加第三方门票到报价类型
    toDoThirdPartTicketQuote(){
      let para = {};
      para.data = JSON.parse(JSON.stringify(this.thirdForm));

      setSubmitThirdPartQuote({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;
          this.thirdPriceVis = false;
          
          if(!code){
            this.scenicDataList();
          }else{
            this.$message({
              type:'error',
              message:msg
            });
          }
        },
        showLoading: true
      });
    },
  },
  mounted(){
    this.scenicDataList();
  }
}
</script>

<style lang="scss" scoped>
.scenic-table-module{
  margin-bottom: 20px;
  .el-button--text{
    color: #b10c79;
  }
  .top-level{
    vertical-align: middle;
    padding-bottom:15px;
    border-bottom: 1px solid #ddd;
    .name{
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }
    .grade{
      font-size: 14px;
      color: #b10c79;
    }
    .space{
      color: #ccc;
      margin: 0 10px;
    }
    .address{
      margin-top: 2px;
      font-size: 14px;
      color: #999;
    }
    .btn-tools{
      padding-top: 10px;
      text-align: right;
    }
  }
  .btn-tools{
    text-align: right;
  }
  .sub-level{
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    .name{
      font-size: 14px;
      color: #b10c79;
    }
    .fa-caret-square-o-down{
      color: #999;
    }
  }
  .table-level{
    width: 100%;
    th{
      padding: 10px 0;
      font-size: 14px;
      font-weight: 400;
      color: #999;
      text-align: center;
      background: #fafafa;
      border-bottom: 1px solid #ddd;
    }
    td{
      padding: 15px 0;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }
    .col-orange{
      color: #f60;
    }
    .quote_name{
      text-align: left;
      padding:0 10px; 
    }
  }
}
.warm-tip {
  background: #fff;
  padding: 70px 0 130px;
  p {
    text-align: center;
    padding-top: 85px;
    color: #5e7382;
    background: url("../../assets/icons/empty_data.png") no-repeat center top;
    background-size: 80px 60px;
  }
}

.detail-section{
  padding: 0;
  .detail-tit{
    border-left: 5px solid #b10c79;
    line-height: 1;
    margin: 20px 0;
    padding-left: 10px;
    color: #b10c79;
    font-size: 18px;
  }
  .detail-item{
    display: flex;
    align-items: flex-start;
    line-height: 1.8;
    .detail-lab{
      width: 90px;
      color: #999;
      text-align: right;
    }
    .detail-con{
      flex: 1;
      padding-left: 15px;
      word-break: break-all;
      .detail-thumb{
        width: 100px;
        margin-right: 8px;
        margin-bottom: 8px;
        text-align: center;
        display: inline-block;
        position: relative;
        img {
          width: 100px;
          height: 100px;
          display: block;
        }
        .preview-btn{
          padding: 6px;
          background-color: rgba(0,0,0,0.5);
          color: #fff;
          position: absolute;
          right: 0;
          line-height: 1;
          top: 74px;
        }
      }
    }
  }
}
// detail-section.end
.canuse{
  color: #019f3d;
  background-color: #f2faf5;
  border:1px solid #e6f5eb;
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 2px;
}
.dontuse{
  color: #fff;
  background-color: #999;
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 2px;
}
.third-price-list{
  border: 1px solid #ccc;
  padding: 0 15px;
  li{
    padding: 15px 10px 10px 30px;
    position: relative;
    border-bottom: 1px dashed #e4e4e4;
  }
  .el-checkbox{
    position: absolute;
    left: 0;
    top: 15px;
  }
  .name{
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }
  .price-area{
    display: flex;
    margin-top: 3px;
    span{
      font-size: 12px;
      color: #999;
      flex: 1;
    }
  }
}
</style>
