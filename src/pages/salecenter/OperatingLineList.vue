// src\components\distribution\LineList.vue
<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link
          v-if="$menuPermission('salecenter/operating/list')"
          :class="isOther ? '' : 'on'"
          to="/salecenter/operating/list"
          tag="li"
        >本公司产品</router-link>
        <router-link
          v-if="$menuPermission('salecenter/other-operating/list')"
          :class="isOther ? 'on' : ''"
          to="/salecenter/other-operating/list"
          tag="li"
        >其他公司产品</router-link>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">行程编号</div>
        <el-input v-model="searchInput.product_no"/>
      </div>
      <div class="search-item">
        <div class="label">行程名称</div>
        <el-input placeholder="" v-model="searchInput.name"/>
      </div>
      <div class="search-item">
        <div class="label">计调</div>
        <el-input v-model="searchInput.operator_name"/>
      </div>
      <div class="search-item">
        <div class="label">出发地</div>
        <el-input v-model="searchInput.departure_city"/>
      </div>
      <div class="search-item">
        <div class="label">目的地</div>
        <el-input v-model="searchInput.destination_city"/>
      </div>
      <div class="search-item">
        <div class="label">供应商</div>
        <el-input v-model="searchInput.supplier_name"/>
      </div>
      <search-item-date-range :label="'出发日期'" v-model="departureDate" @change="handleChangeDeparture"/>
      <div class="search-item">
        <div class="label">出行方式</div>
        <el-select v-model="searchInput.line_type" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in LINE_TYPE_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item" style="width: 200px;overflow:hidden;">
        <div class="label">价格区间</div>
        <el-input class="width2" v-model="searchInput.search_min_money"/>
        <span class="label zhi">—</span>        
        <el-input class="width2" v-model="searchInput.search_max_money"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="trip-content">
        <template v-if="lineList && lineList.length">
          <div v-for="item in lineList" class="trip-item" :key="item.id" >
            <router-link :to="{path: 'detail', query: {id: item.id,product_index_id:item.product_index_id}}">
              <img class="trip-left" src="../../assets/bitmap.png">
              <div class="trip-left" >
                <div class="trim-img" :style="{'background-image':'url('+item.trip_pic_url+')','z-index':6}">
                  <span class="type-tag" :style="{'background-color': LINE_TYPE_COLOR_MAP[item.line_type]}">{{ item.line_type_name }}</span>
                </div>
              </div>
            </router-link>
            <div class="trip-middle">
              <div>
                <div class="trip-code">
                  <span :title="item.product_no">行程编号：{{ item.product_no }}</span>
                  <copy-button v-model="item.product_no" :lable="'复制行程编号'"></copy-button>
                  <span :title="[item.operator_name + ' / ' + item.mobile]">
                    OP：{{ item.operator_name }} / {{ item.mobile }}
                  </span>
                </div>
                <p class="trip-title" :title="item.name">
                  {{ item.name | limitNum('60') }}
                  <span class="trip-day" v-if="item.trip_days">{{ item.trip_days }}天</span>
                </p>
                <div class="trip-message">
                  <template v-if="item.departure_city && item.departure_city.length">
                    <span class="trip-departureCity">{{ item.departure_city[0] }}等地</span>出发
                  </template>
                  &nbsp;&nbsp;
                  <span>
                    团期：
                    <template v-for="(n,index) in limitDate(item.departure_date)">
                      <span v-if="index !== 0" :key="index">,&nbsp;</span>
                      {{ n }}
                    </template>
                  </span>
                  <span v-if="item.departure_date && item.departure_date.length > 3">
                    ...<a class="color-purple" href="javascript:;" @click.prevent="handleBook(item.id, item.sale_org_id)"> 更多</a>
                  </span>
                </div>
                <div class="trip-message color-black" v-if="!isOther && item.sale_org_name">供应商：{{ item.sale_org_name }}</div>
                <div class="trip-message color-black" v-if="isOther && item.supplier">供应商：{{ item.supplier }}</div>
                <div class="linkBox">
                  <el-link class="downloadJourney" :href="'/bom/api/product/save_travel_detail_pdf?product_id='+item.id">下载行程单</el-link>
                  <router-link :to="{path: 'detail', query: {id: item.id,product_index_id:item.product_index_id}}">查看行程详情</router-link>
                </div>
              </div>
            </div>
            <div class="trip-right">
              <div class="right-box">
                <p class="mb15">
                  <span class="price-title">建议价：</span>
                  <span class="price-content">
                    <span class="color-orange">¥ <span class="price">{{ item.out_price }}</span> </span> 起
                  </span>
                </p>
                <el-button type="primary" @click.prevent="handleBook(item.id, item.sale_org_id)">预订</el-button>
                <el-button v-if="$menuPermission('salecenter/operations/cansell')" @click.prevent="handleSetCanCell(item.id)" style="margin-top: 5px;">设置可售</el-button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="warm-tip">
            <p>没有符合您搜索条件的信息，做些其他尝试吧。 :)</p>
          </div>
        </template>
      </div>
    </div>

    <!--工具条-->
    <div class="page" v-show="totalPage > 1">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handlePageChange"
        :page-count="totalPage"
        :current-page="searchData.page"
      />
    </div>

    <!--选择可预订团期弹窗-->
    <el-dialog title="选择可预订团期" :visible.sync="showTuanListDialog">
      <div class="table-content" v-loading="tuanListLoading">
        <el-table :data="tuanList" border style="width: 100%">
          <el-table-column
            prop="departure_date"
            label="出发日期"
            width="100"
            align="center"
          />
          <el-table-column
            prop="remain_num"
            label="余位"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.need_second_confirm == 1">需二次确认</span>
              <span v-else>{{ scope.row.remain_num }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price_info" label="建议价" header-align="center" min-width="250">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="hover" :open-delay="500">
                <template v-for="(price, index) in scope.row.price_info">
                  <p v-if="price.detail_name.length" :key="index">
                    {{ price.detail_name.join('+') }}：
                    <span class="color-orange">{{ price.sum_out_price }}</span>
                  </p>
                </template>
                <div slot="reference">
                  <template v-for="(price, index) in filterPriceInfo(scope.row.price_info)">
                    <p v-if="price.detail_name.length" :key="index">
                      {{ price.detail_name.join('+') }}：
                      <span class="color-orange">{{ price.sum_out_price }}</span>
                      <span v-if="scope.row.price_info.length > 2 && index == 1">...</span>
                    </p>
                  </template>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="price_info" :label="peer_price_name" header-align="center" min-width="250">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="hover" :open-delay="500">
                <template v-for="(price, index) in scope.row.price_info">
                  <p v-if="price.detail_name.length" :key="index">
                    {{ price.detail_name.join('+') }}：
                    <span class="color-orange">{{ price.sum_peer_price }}</span>
                  </p>
                </template>
                <div slot="reference">
                  <template v-for="(price, index) in filterPriceInfo(scope.row.price_info)">
                    <p v-if="price.detail_name.length" :key="index">
                      {{ price.detail_name.join('+') }}：
                      <span class="color-orange">{{ price.sum_peer_price }}</span>
                      <span v-if="scope.row.price_info.length > 2 && index == 1">...</span>
                    </p>
                  </template>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            align="center"
            width="160"
            fixed="right"
          >
            <template slot-scope="scope">
              <router-link
                v-if="canBookOrder"
                :to="{path: 'order',query:{id:scope.row.id}}"
              >同行下单</router-link>
              <router-link
                v-if="canBookStoreOrder"
                :to="{path: 'order',query:{id:scope.row.id, sale_org_id: tuanListParams.sale_org_id}}"
              >门店下单</router-link>
              <router-link
                v-if="canBookZhikeOrder"
                :to="{path: 'zhike-order', query: {id: scope.row.id, sale_org_id: tuanListParams.sale_org_id}}"
              >直客下单</router-link>
              <span v-if="!canBookOrder && !canBookStoreOrder && !canBookZhikeOrder">--</span>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <div class="page" v-show="tuanListTotalPage > 1">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleTuanListPageChange"
            :page-count="tuanListTotalPage"
            :current-page="tuanListParams.page"
          />
        </div>
      </div>
    </el-dialog>
    <!-- 设置可售 -->
    <el-dialog title="设置可售" :visible.sync="showProductListDlg" style="width: 100%;" @close="handleCloseDialog">
      <div class="system-search" style="padding: 0; padding-left: 10px;">
        <div class="search-item" style="padding-left: 0;">
          <el-input v-model="search.city_name" placeholder="输入城市"></el-input>
          <el-input v-model="search.name" placeholder="输入营业部"></el-input>
        </div>
        <div class="search-item" style="padding-left: 20px;">
          <div class="label" style="margin-left: -25px;">状态</div>
          <el-select v-model="search.is_sell">
            <el-option v-for="(item, idx) in classId1_list" :label="item" :value="idx" :key="idx"></el-option>
          </el-select>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="handleSearchFun">搜索</el-button>
        </div>
      </div>
      <div style="padding: 0 0 10px;">
        <el-button @click="handleCanSellProduct('')">可售</el-button>
        <el-button @click="handleNoSellProduct('')">不可售</el-button>
      </div>
      <el-table :data="productList" border style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column label="营业部" align="center" prop="org_name" />
        <el-table-column label="状态" align="center" width="100" prop="is_sell_label" />
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <a v-if="scope.row.is_sell == 1" @click="handleNoSellProduct(scope.row.org_id)">不可售</a>
            <a v-if="scope.row.is_sell == 2" @click="handleCanSellProduct(scope.row.org_id)">可售</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="page" v-if="productList">
        <el-pagination  layout="total, prev, pager, next, jumper" :page-size="5" :total="channel_total_page" :current-page="search.page" @current-change="channelCurrentPageChange"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import {
//   newDistributionProductList,
//   newSelfSaleProductList,
  operationsProductList,               // 运营中心-本公司产品
  operationsOtherProductList,          // 运营中心-其他公司产品
  getProductYybList,
  setProductCanSaleList,
  setProductNoSaleList
} from 'src/api/product';

import { saleBookTuanList , downJourney} from 'src/api/tuan';
import * as format from 'src/utils/format';
import CopyButton from 'src/components/components/CopyButton';


export default ({
  components: {
    SearchItemDateRange,
    CopyButton
  },
  filters:{
    //限制字数，超出省略号
    limitNum(val,num) {
      if(val && val.length > num) {
        return val.substr(0,num) + '...';
      } else {
        return val;
      }
    }
  },
  data() {
    const { query } = this.$route;

    return {
      LINE_TYPE_MAP: {},
      LINE_TYPE_COLOR_MAP: ['#FF6600', '#FF6600', '#B10C79', '#019F3D', '#7471F9', '#E33DBE', '#019F3D'],
      classId1_list:['全部','售卖中','不可售'],
      departureDate: [query.departure_date_start, query.departure_date_end],
      searchInput: {
        // trip_days: '',
        // product_no: query.product_no || '',
        // name: query.name || '',
        // operator_name: query.operator_name || '',
        // departure_date_start: query.departure_date_start || '',
        // departure_date_end: query.departure_date_end || '',
        // departure_city: query.departure_city || '',
        // page: parseInt(query.page) || 1,
        // page_size: query.page_size || 10
      },
      searchData: {
        trip_days: '',
        product_no: query.product_no || '',
        name: query.name || '',
        operator_name: query.operator_name || '',
        departure_date_start: query.departure_date_start || '',
        departure_date_end: query.departure_date_end || '',
        departure_city: query.departure_city || '',
        line_type: query.line_type || '',
        page: parseInt(query.page) || 1,
        supplier_name: query.supplier_name || "",
        destination_city: query.destination_city || "",
        search_max_money: query.search_max_money || "",
        search_min_money: query.search_min_money || ""
        // page_size: query.page_size || 10
      },
      lineList: [],
      totalPage: parseInt(query.page) || 1,
      tuanListParams: {
        product_id: 0,
        sale_org_id: '',  // 其他公司产品下单时使用，对应产品的sale_org_id字段
        page: 1,
        page_size: 10
      },
      tuanListTotalPage: 1,
      tuanListLoading: false,
      tuanList: [],
      userType: 1,  // 1 分公司  2 门店
      showTuanListDialog: false,
      showProductListDlg: false,
      search: {
        is_sell: 0,
        city_name: "",
        name: "",
        page: 1,
        page_size: 5
      },
      productList: [],
      channel_total_page: 0,
      allSelectData: [],
      allSelectOrgId: [],
      id: ""
    };
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isSale() { // 是否从销售中心进入
      return this.topMenuConst == 'sale';
    },
    isStore() { // 是否门店
      return this.userType == 2;
    },
    isOther() { // 是否其他公司产品
      return this.$route.name == 'SalecenterOperatingOtherOperating';
    },
    canBookOrder() {
      const perm = this.$menuPermission('salecenter/tuan/compro/peerorder')
      return perm && !this.isOther && !this.isStore;
    },
    canBookZhikeOrder() {
      const perm = this.$menuPermission(!this.isOther ? 'salecenter/tuan/compro/guestorder' : 'salecenter/tuan/othercompro/guestorder')
      return perm && !this.isStore;
    },
    canBookStoreOrder() {
      const perm = this.$menuPermission(!this.isOther ? 'salecenter/tuan/compro/storeorder' : 'salecenter/tuan/othercompro/storeorder')
      return perm && this.isStore;
    },
    canBook() {
      return this.canBookOrder || this.canBookZhikeOrder || this.canBookStoreOrder
    },
    peer_price_name() {
      return '同行价';
    },
    out_price_name() {
      return '建议价';
    }
  },
  watch:{
    '$route.path':function(path){
      const query = this.$route.query;

      this.searchData = {
        trip_days: '',
        product_no: query.product_no || '',
        name: query.name || '',
        operator_name: query.operator_name || '',
        departure_date_start: query.departure_date_start || '',
        departure_date_end: query.departure_date_end || '',
        departure_city: query.departure_city || '',
        line_type: query.line_type || '',
        page: parseInt(query.page) || 1,
        // page_size: query.page_size || 10
      },
      
      this.getLineList();
    }
  },
  mounted() {
    this.getLineList();
  },
  methods: {
    handleDownJourney(item){
      // var params = {
      //   data: {
      //     product_id: item.product_no
      //   }
      // }
      // downJourney({
      //   params: params,
      //   method: "get",
      //   success: (params) => {
      //     let data = params.data;
      //     console.log(data)
      //   },
      //   formdata: true
      // })
    },
    setProductCanSaleList(org_ids){
      var params = {
        product_id: this.id,
        org_ids: org_ids
      }
      setProductCanSaleList({
        params: {data: params},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            // this.showProductListDlg = false;
            this.getProductYybList();
            this.allSelectData = [];
            this.allSelectOrgId = [];
            this.$message("操作成功！");
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      })
    },
    setProductNoSaleList(org_ids){
      var params = {
        product_id: this.id,
        org_ids: org_ids
      }
      setProductNoSaleList({
        params: {data: params},
        success: (params) => {
          let data = params.data;
          console.log(data);
          if (data.code == '0') {
            // this.showProductListDlg = false;  
            this.getProductYybList();
            this.allSelectData = [];
            this.allSelectOrgId = [];
            this.$message("操作成功！");
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      })
    },
    handleNoSellProduct(org_id){
      var arr = [];

      if(org_id){
        arr = [org_id];
      }else{
        if(this.allSelectData.length > 0){
          for(let i=0;i<this.allSelectData.length;i++){
            if(this.allSelectData[i]){
              for(let y=0; y<this.allSelectData[i].length;y++){
                // if(this.allSelectData[i][y].is_sell == 2){
                //   this.$message.error("选中的营业部已在不可售列表中~");
                //   return false;
                // }
                arr.push(this.allSelectData[i][y].org_id)
              }
            }
          }
        }else{
          this.$message.error("您未选择不可售营业部");
          return false;
        }
      }

      this.setProductNoSaleList(arr);
    },
    handleCanSellProduct(org_id){
      var arr = [];
      if(org_id){
        arr = [org_id];
      }else{
        console.log(this.allSelectData.length)
        if(this.allSelectData.length > 0){
          for(let i=0;i<this.allSelectData.length;i++){
            if(this.allSelectData[i]){
              for(let y=0; y<this.allSelectData[i].length;y++){
                // if(this.allSelectData[i][y].is_sell == 1){
                //   this.$message.error("选中的营业部已在可售卖列表中~");
                //   return false;
                // }
                arr.push(this.allSelectData[i][y].org_id)
              }
            }
          }
        }else{
          this.$message.error("您未选择可售营业部");
          return false;
        }
      }
      if(arr.length > 0){
        this.setProductCanSaleList(arr);
      }else{
        this.$message.error("您未选择可售营业部");
      }
    },
    handleCloseDialog(){
      this.allSelectData = [];
      this.allSelectOrgId = [];
    },
    channelCurrentPageChange(e){
      this.search.page = e;
      this.getProductYybList();
    },
    handleSelectionChange(e){
      this.allSelectData[this.search.page] = e; 
      console.log(e);
    },
    handleSetCanCell(id){
      this.id = id;
      this.showProductListDlg = true;
      this.getProductYybList();
    },
    handleSearchFun(){
      this.search.page = 1;
      this.allSelectData = [];
      this.allSelectOrgId = [];
      this.getProductYybList();
    },
    getProductYybList(){
      let params = {...this.search};
      params.product_id = this.id;
      getProductYybList({
        params: {data: params},
        success: (params) => {
          let data = params.data;
          console.log(data);
          if (data.code == '0') {
            this.productList = data.data.list;
            this.channel_total_page = data.data.total_count * 1;
            this.search.page = data.data.page_index;
            var arr = [];
              for(var i=0;i<data.data.list.length;i++){
                if(this.allSelectData[this.search.page]){
                  for(var y=0;y<this.allSelectData[this.search.page].length;y++){
                    if(this.allSelectData[this.search.page][y].org_id == data.data.list[i].org_id){
                      arr.push(data.data.list[i]);
                    }
                  }
                }
              }
              this.allSelectOrgId[this.search.page] = arr;
              this.$nextTick(function(){
                this.toggleSelection(); //每次更新了数据，触发这个函数即可。
              })
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      })
    },
    toggleSelection() {
      var that = this;
      if (that.allSelectOrgId[that.search.page]) {
        that.allSelectOrgId[that.search.page].forEach(row => {
          that.$refs.multipleTable.toggleRowSelection(row,true);
        });
      } 
    },
    getLineList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      this.searchData.page_size = 10;
      const productListFunc = !this.isOther ? operationsProductList : operationsOtherProductList;

      productListFunc({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.lineList = data.data.list;
            this.LINE_TYPE_MAP = data.data.line_type_list || {};
            this.totalPage = data.data.total_page;
            this.searchData.page = data.data.page_index;
            // this.searchData.page_size = data.data.page_size;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getSaleBookTuanList() {
      this.tuanListLoading = true;

      saleBookTuanList({
        params: {data: this.tuanListParams},
        success: (params) => {
          const {code, msg, data} = params.data;

          this.tuanListLoading = false;
          if (code == '0') {
            this.tuanList = data.data;
            this.userType = data.user_type;
            this.tuanListParams.page = data.page_index;
            this.tuanListTotalPage = data.total_page;
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    handleChangeDeparture(date) {
      this.searchInput.departure_date_start = format.date(date[0]) || '';
      this.searchInput.departure_date_end = format.date(date[1]) || '';
    },
    handleSearch(){
      this.getLineList(true);
      this.$router.replace({query: this.searchData});
    },
    handlePageChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.departureDate = [this.searchData.departure_date_start, this.searchData.departure_date_end];
        this.getLineList();
        this.$router.replace({query: this.searchData});
      }
    },
    handleBook(id, sale_org_id){
      this.tuanListParams.product_id = id;
      this.tuanListParams.page = 1;
      if(this.isOther){
        this.tuanListParams.sale_org_id = sale_org_id
      }else{
        this.tuanListParams.sale_org_id = ''
      }
      this.showTuanListDialog = true;
      this.getSaleBookTuanList();
    },
    handleTuanListPageChange(val){
      if(val != this.tuanListParams.page){
        this.tuanListParams.page = val;
        this.getSaleBookTuanList();
      }
    },
    //最多截取前3条日期
    limitDate(dateList) {
      if(dateList && dateList.length > 3) {
        return dateList.slice(0,3);
      } else {
        return dateList;
      }
    },
    orderCurrentPageChange(val) {
      if(this.reservePagination.page_index != val){
        this.reservePagination.page_index = val;
        this.getReserveList();
      }
    },
    reserve(productId) {
      this.productId = productId;
      this.dialogReserveVisible= true;
      this.reservePagination.page_index = 1;
      this.getReserveList();
    },
    getReserveList() {
      const getReserveList = getTripReserveList;
      let params = {
        'data':{
          'product_id':this.productId,
          'page':this.reservePagination.page_index,
          'page_size':this.reservePagination.page_size
        }
      };

      getReserveList({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.reserveList = data.data.data;
            this.reservePagination.total_count = data.data.total_count;
            this.reservePagination.page_index = data.data.page_index;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    //过滤价格列表
    filterPriceInfo(priceInfo) {
      if(priceInfo) {
        return priceInfo.slice(0,2);
      } else {
        return [];
      }
    }
  }
});
</script>

<style scoped lang="scss">
  .linkBox {
    line-height: 30px;
  }
  .downloadJourney {
    padding: 5px;
    color: #aa0371;
  }
  .trip-item {
    position: relative;
    min-height: 145px;
    border: 1px solid #e6e7e7;
    padding: 15px;
    margin-bottom: 10px;
    background: #fff;
    color: #999;
    cursor: pointer;
    display: block;

    .trip-left {
      position: absolute;
      width: 220px;
      height: 145px;
      top: 15px;
      left: 15px;
      .trim-img {
        position: relative;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;

        .type-tag {
          position: absolute;
          padding: 4px 6px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          top: 0;
          left: 0;
          background: #ff6600;
        }
      }
    }
    .trip-middle {
      position: relative;
      margin: 0 235px;
      left: 0;
      bottom: 0;

      .trip-code {
        line-height: 1;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;

        span {
          // width: 49%;
          display: inline-block;
          padding-right: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
      .trip-title {
        max-height: 48px;
        font-size: 18px;
        line-height: 24px;
        margin-top: 8px;
        color: #333;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        .trip-day {
          font-weight: bold;
          margin-left: 8px;
        }
      }
      .trip-message {
        margin-top: 12px;
        .trip-departureCity {
          padding: 5px 8px;
          background-color: #eee;
          color: #333;
          border-radius: 3px;
          margin-right: 8px;
        }
      }
    }
    .trip-right {
      position: absolute;
      right: 15px;
      top: 15px;

      .right-box {
        float: right;
        width: 150px;
        padding-top: 25px;

        p {
          position: relative;
          height: 28px;
          line-height: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          .price-title {
            position: absolute;
            left: 0;
            bottom: 0;
          }
          .price-content {
            position: absolute;
            right: 0;
            bottom: 0;
          }
          .price {
            font-size: 24px;
          }
        }
        button {
          display: block;
          width: 125px;
          height: 35px;
          margin: 16px auto 0;
        }
      }
    }
  }
  .zhi {
    float:left; 
    color: #ccc;
    line-height: 30px;
    width: 50px;
    height: 30px;
  }
  .width2 {
    width: 80px!important;
    float: left;
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
</style>
