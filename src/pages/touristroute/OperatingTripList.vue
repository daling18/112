<template>
<!-- application\index\view\dev\src\components\plan\trip\trip-list.vue -->
  <div class="wrapper trip-wrpper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link :class='name === "operatingTrip" ? "on" : ""' to="/touristroute/operating/trip/list" v-if="$menuPermission('touristroute/operating/linetravel/company') && (ORG_TYPE !== '6')" tag="li">本公司行程</router-link>
        <router-link :class='name === "operatingSupplierTrip" ? "on" : ""' to="/touristroute/operating/supplier/list" v-if="$menuPermission('touristroute/operating/supplier/list')" tag="li">供应商行程</router-link>
        <router-link :class='name === "operatingOtherTrip" ? "on" : ""' to="/touristroute/operating/other/list" v-if="$menuPermission('touristroute/operating/other/list')" tag="li">其他分公司行程</router-link>

        <router-link :class='name === "operatingCooperationTrip" ? "on" : ""' to="/touristroute/operating/cooperation/list" v-if="$menuPermission('touristroute/operating/cooperation/list')" tag="li">合作运营中心行程</router-link>
      </ul>
      <div class="search-item tab-button">
        <router-link v-if='name === "operatingTrip" && $menuPermission("touristroute/operating/trip/list/addpro")' :to="{path: 'addNewTrip'}">
          <el-button type="primary">+ 新增</el-button>
        </router-link>
      </div>
    </div>
    <div class="system-search">
      <div class="search-item">
				<div class="label">关键词</div>
				<el-input v-model="search.name" placeholder="搜索行程名称"></el-input>
			</div>
      <div class="search-item">
				<div class="label">线路类别</div>
				<el-select v-model="class_id_1" @change="classId1" filterable>
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="(item, idx) in classId1_list" :label="item" :value="idx" :key="idx"></el-option>
        </el-select>
        <el-select v-model="class_id_2" @change="classId2" filterable>
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="(item, idx) in classId2_list" :label="item.name" :value="item.id" :key="idx"></el-option>
        </el-select>
        <el-select v-model="class_id_3" filterable>
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="(item, idx) in classId3_list" :label="item.name" :value="item.id" :key="idx"></el-option>
        </el-select>
			</div>
      <div v-if="name === 'trip'" class="search-item long">
        <div class="label">上架状态</div>
        <el-select v-model="search.product_audit_status">
          <el-option label='全部' value='0'></el-option>
          <el-option v-for="(item, key) in product_audit_status" :label='item' :value='key' :key="key"></el-option>
        </el-select>
      </div>
      <div v-if="name === 'operatingSupplierTrip'" class="search-item long">
        <div class="label">供应商名称</div>
        <el-input v-model="search.supplier_name" placeholder="供应商名称"></el-input>
      </div>
      <div class="search-item">
				<div class="label">产品编号</div>
				<el-input v-model="search.product_no" placeholder="搜索产品编号"></el-input>
			</div>
      <div class="search-item">
				<div class="label">线路行程</div>
				<el-select v-model="search.line_save_type" filterable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="简易开团" value="1"></el-option>
          <el-option label="完整行程" value="2"></el-option>
        </el-select>
			</div>
      <div class="search-item" v-if="name === 'operatingCooperationTrip'">
				<div class="label">渠道来源</div>
				<el-input v-model="search.channel_source" placeholder="运营中心/分公司/供应商名称"></el-input>
			</div>
      <!-- <div class="search-item" v-else>
				<div class="label">渠道来源</div>
				<el-select v-model="search.line_save_type" filterable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="简易开团" value="1"></el-option>
          <el-option label="完整行程" value="2"></el-option>
        </el-select>
			</div> -->
      <div class="trip-search-wid">
        <div class="search-item">
          <div class="label">出发地</div>
          <el-select clearable v-model="search.departure_city" remote filterable :remote-method="remoteMethod" placeholder="" @click.native="suggest(search.departure_city)">
            <el-option label="不限" value="0"></el-option>
            <el-option v-for="(item, index) in res_citylist" :key="index" :label="item.area_name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">目的地</div>
          <el-select clearable v-model="search.destination_city" remote filterable :remote-method="remoteMethod" placeholder="" @click.native="suggest(search.destination_city)">
            <el-option label="不限" value="0"></el-option>
            <el-option v-for="(item, index) in res_citylist" :key="index" :label="item.area_name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">行程天数</div>
          <input-number v-model="search.trip_days" placeholder="请输入行程天数" />
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="getProduct('1')">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <div class="mode-table">
          <el-table :data="res_list" class="el-table--middle" border style="width: 100%">
            <el-table-column
              label="行程名称"
              align="center"
              width="200">
              <template slot-scope="scope">
                <p class="protit">{{ scope.row.product_no }}
                  <span class="canuse" v-if="scope.row.status === 1">启用</span>
                  <span class="nouse" v-if="scope.row.status === -1">禁用</span>
                </p>
                <p class="ellipsis text-l"><a class="fontcolor1" href="javascript: void(0);" :title="scope.row.name"><span class="day-bold">{{ scope.row.trip_days }}天</span> {{ scope.row.name }}</a></p>
              </template>
            </el-table-column>
            <el-table-column
              label='线路行程'
              align='center'
              width='100'>
              <template slot-scope='scope'>
                <p v-if="scope.row.line_save_type === 1">简易开团</p>
                <p v-if="scope.row.line_save_type === 2">完整行程</p>
              </template>
            </el-table-column>
            <el-table-column
              label='价格'
              align='center'
              width='100'>
              <template slot-scope='scope'>
                <div class="ellipsis color-orange text-c" :title="scope.row.min_price">¥{{scope.row.min_price}}起</div>
              </template>
            </el-table-column>
            <el-table-column
              label="线路类别"
              align="center"
              min-width="160">
              <template slot-scope="scope">
                <div class="ellipsis"><a class="fontcolor1" href="javascript: void(0);" :title="scope.row.category_name_1+ (scope.row.category_name_2 ? '>' : '') +scope.row.category_name_2 + (scope.row.category_name_3 ? '>' : '') + scope.row.category_name_3">{{ scope.row.category_name_1 }}<span v-if="scope.row.category_name_2">></span>{{ scope.row.category_name_2 }}<span v-if="scope.row.category_name_3">></span>{{ scope.row.category_name_3 }}</a></div>
              </template>
            </el-table-column>
            <el-table-column
              label="出发地"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <div class="ellipsis"><a class="fontcolor1" href="javascript: void(0);" :title="scope.row.departure_city_name">{{ scope.row.departure_city_name }}</a></div>
              </template>
            </el-table-column>
            <el-table-column
              label="目的地"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <div class="ellipsis"><a class="fontcolor1" href="javascript: void(0);" :title="scope.row.destination_city_name">{{ scope.row.destination_city_name }}</a></div>
              </template>
            </el-table-column>
            <el-table-column
              label='分公司/OP'
              align="center"
              min-width="200"
              key="b">
              <template slot-scope="scope">
                <span class="ellipsis text-c" style="height: auto;" :title="scope.row.operator_name">
                  {{scope.row.channel_source_name}} 
                  <br>
                  {{ scope.row.operator_name }}
                </span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              v-if="name === 'operatingSupplierTrip'"
              label='审核状态'
              align='center'
              width='80'
              key="a">
              <template slot-scope='scope'>
                <div v-if="scope.row.supplier_audit_status === 1" class="">待审核</div>
                <div v-if="scope.row.supplier_audit_status === 2" class="color-green">通过</div>
                <div v-if="scope.row.supplier_audit_status === 4">已下架</div>
                <div v-if="scope.row.supplier_audit_status === -1">不通过</div>
              </template>
            </el-table-column> -->
            <el-table-column
              label="发布渠道"
              align="center"
              width="130">
              <template slot-scope="scope">
                <div>  
                  <div
                    v-for="(channel, idx) in scope.row.channel_info"
                    :key="idx"
                    class="ellipsis pointer"
                    @click="handleProductOperation(scope, 'show')">
                    <template v-if="channel.type == 1">
                      <!-- <span :class="channel.submit_status | getStatusTagColor">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</span> -->
                      <el-tag v-if="channel.submit_status === 3" type="success">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                      <el-tag v-else-if="channel.submit_status === 2" type="danger">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                      <el-tag v-else type="gray">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                    </template>
                    <template v-else-if="channel.type == 3">
                      <!-- <span :class="channel.submit_status == 0 ? 'tag-gray' : 'tag-green'">{{YUERYOU_STATUS_MAP[channel.submit_status]}}</span> -->
                      <el-tag v-if="channel.submit_status == 0" type="gray">{{YUERYOU_STATUS_MAP[channel.submit_status]}}</el-tag>
                      <el-tag v-else type='success'>{{YUERYOU_STATUS_MAP[channel.submit_status]}}</el-tag>
                    </template>
                    <template v-else>
                      <!-- <span :class="channel.submit_status | getStatusTagColor">{{ SUBMIT_STATUS_MAP2[channel.submit_status] }}</span> -->
                      <el-tag v-if="channel.submit_status === 3" type='success'>{{SUBMIT_STATUS_MAP2[channel.submit_status]}}</el-tag>
                      <el-tag v-else-if="channel.submit_status === 2" type='danger'>{{SUBMIT_STATUS_MAP2[channel.submit_status]}}</el-tag>
                      <el-tag v-else type='gray'>{{SUBMIT_STATUS_MAP2[channel.submit_status]}}</el-tag>
                    </template>
                    <span :title="channel.channel_name">
                      {{ channel.channel_name }}
                    </span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              fixed='right'
              width="150"
             >
              <template slot-scope="scope">
                <el-dropdown v-if='name === "operatingTrip"' trigger="click">
                  <span class="el-dropdown-link">
                    操作
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/editstroke')">
                      <router-link :to="{ path: 'addNewTrip', query: { id: scope.row.id, type: scope.row.product_type * 1 + 1 }}">编辑</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/delstroke')">
                      <div @click="handleDelete(scope.row)">删除</div>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/copystroke')">
                      <router-link :to="{ path: 'addNewTrip', query: { copyId: scope.row.id, type: scope.row.product_type * 1 + 1  }}">复制行程</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/openoff') && scope.row.status == 1"><div @click="changeStatus(scope.row.id, -1)">禁用</div></el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/openoff') && scope.row.status == -1"><div @click="changeStatus(scope.row.id, 1)">启用</div></el-dropdown-item>

                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/groupoffer')">
                      <router-link :to="{ path: 'bids', query: { id: scope.row.id}}">团期报价</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('touristroute/linetravel/company/channel')">
                      <a href="javascript:;" @click="handleProductOperation(scope, 'show')">渠道操作</a>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/downloadstroke')">
                      <div @click="openDownloadDig(scope.row.id)">下载行程单</div>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('touristroute/operating/trip/list/getstrockdetail')">
                      <router-link :to="{ path: 'tripDetail', query: { id: scope.row.id }}">查看行程</router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

                <div v-else-if='name === "operatingSupplierTrip"'>
                  <el-dropdown v-if="($menuPermission('touristroute/linetravel/supplier/getstrockdetail') || $menuPermission('touristroute/operating/supplier/list/channel'))" trigger="click">
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$menuPermission('touristroute/operating/supplier/list/getstrockdetail')">
                        <router-link :to="{ path: 'tripDetail', query: { id: scope.row.id }}">查看</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('touristroute/operating/supplier/list/channel')">
                        <a href="javascript:;" @click="handleProductOperation(scope, 'show')">渠道操作</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div v-else>--</div>
                </div>

                <div v-else-if='name === "operatingOtherTrip"'>
                  <el-dropdown v-if="($menuPermission('touristroute/other/supplier/list/channel') || $menuPermission('touristroute/other/supplier/list/getstrockdetail'))" trigger="click">
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$menuPermission('touristroute/other/supplier/list/getstrockdetail')">
                        <router-link :to="{ path: 'tripDetail', query: { id: scope.row.id }}">查看</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('touristroute/other/supplier/list/channel')">
                        <a href="javascript:;" @click="handleProductOperation(scope, 'show')">渠道操作</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div v-else>--</div>
                </div>

                <div v-else-if='name === "operatingCooperationTrip"'>
                  <el-dropdown v-if="($menuPermission('touristroute/cooperation/cooperation/list/channel') || $menuPermission('touristroute/cooperation/cooperation/list/getstrockdetail'))" trigger="click">
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$menuPermission('touristroute/cooperation/cooperation/list/getstrockdetail')">
                        <router-link :to="{ path: 'tripDetail', query: { id: scope.row.id }}">查看</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('touristroute/cooperation/cooperation/list/channel')">
                        <a href="javascript:;" @click="handleProductOperation(scope, 'show')">渠道操作</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div v-else>--</div>
                </div>

                <div v-else>--</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="page" v-if="res_list">
      <el-pagination  layout="total, prev, pager, next, jumper" :total="total_page" :current-page="res_search.page" @current-change="currentPageChange">
      </el-pagination>
    </div>
    <el-dialog title="渠道操作" :visible.sync="showProductListDlg">

      <div class="system-search" style="padding: 0; padding-left: 20px;">
        <div class="search-item">
          <div class="label">渠道名称</div>
          <el-input v-model="channelSearch.company_name" placeholder="搜索渠道名称"></el-input>
        </div>
        <div class="search-item">
          <div class="label">状态</div>
          <el-select v-model="channelSearch.status">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="(item, idx) in SUBMIT_STATUS_MAP2" :label="item" :value="idx" :key="idx"></el-option>
          </el-select>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="handleSeachChannel">搜索</el-button>
        </div>
      </div>
      <div style="padding: 0 0 10px;">
        <el-button @click="handleAllSelectPutWay">上架</el-button>
        <el-button @click="handleAllSelectDownWay">下架</el-button>
      </div>
      <el-table :data="productList" ref="multipleTable" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column label="渠道" align="center">
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row.channel_name">
              {{ scope.row.channel_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            <!-- <div v-if="channelType === 1" :class="scope.row.submit_status | getStatusColor">
              {{ SUBMIT_STATUS_MAP[scope.row.submit_status] }}
            </div>
            <div v-else-if="channelType === 3">
              {{YUERYOU_STATUS_MAP[scope.row.submit_status]}}
            </div> -->
            <div :class="scope.row.submit_status | getStatusColor">
              {{ SUBMIT_STATUS_MAP2[scope.row.submit_status] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
              <el-button type='text' @click="handleProductOperation(scope, 'putaway')" v-if="scope.row.submit_status == 1 || scope.row.submit_status == 4">上架</el-button>
              <el-button type='text' @click="handleProductOperation(scope, 'soldout')" v-else-if="scope.row.submit_status == 3">下架</el-button>
              <el-button type='text' @click="handleProductOperation(scope, 'withdraw')" v-else-if="scope.row.submit_status == 2">撤回</el-button>
              <el-button type='text' @click="handleProductOperation(scope, 'putaway')" v-else-if="scope.row.submit_status == 5 || scope.row.submit_status == 6">重新上架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page" v-if="productList">
        <el-pagination  layout="total, prev, pager, next, jumper" :page-size="5" :total="channel_total_page" :current-page="channelSearch.page" @current-change="channelCurrentPageChange"></el-pagination>
      </div>
    </el-dialog>
    <!-- 下载行程单 -->
    <el-dialog title="下载行程单" :visible.sync="downloadDlg">
      <div class="upload-wrap">
        <div class="upload-box" @click="downloadHander('pdf')">pdf版</div>
        <div class="upload-box" @click="downloadHander('word')">word版</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    //   product,  
      changeStatus, 
      getCateInfo, 
      getArea}from 'src/api/api'
  import {
          // handleNewPutOn, 
          // handleNewSelfDown,
          // handleNewSupplierDown,
          // handleNewOtherDown,
          newSendBack,
          soldOut,
          sendBack,
          saveTravelDetailWord,
          synYueryou,
          delProduct,
          selfPutOn,
          doPutOff,
          recall,
          supplierProductLists,
          otherProductList,
          // getChannelList,
          // 运营中心
          operationsTravelSelfList,  // 本公司
          operationsSupplierList,    // 供应商
          operationsOtherList,       // 其他分公司
          operationsCooperationList, // 合作运营中心
          operationsUpChannel,       // 操作渠道列表
          operationsUpOn,            // 渠道上架
          operationsRecalled,        // 渠道撤回
          operationsDownShelf,       // 渠道下架
          }from 'src/api/product'
  import {supplierDoPutOn,
          supplierDoPutOff,
          supplierRecall,
          supplierProduct,
          supplierDelProduct,
          supplierChangeStatus,
          supplierSaveTravelDetailWord} from 'src/api/supplier'
  import InputNumber from "src/plugins/InputNumber.vue";

  export default {
    components: {
      InputNumber
    },
    filters: {
      getStatusColor(status){
        if(status == 1 || status == 4 || status == 5){
          return 'color-gray';
        }else if(status == 3){
          return 'color-green';
        }else{
          return '';
        }
      },
      getStatusTagColor(status){
        if(status == 3){
          return 'tag-green';
        }else if(status == 2){
          return 'tag-red';
        }else{
          return 'tag-gray';
        }
      }
    },
    data() {
      return {
        channel_source_type: "",
        name: this.$route.name ? this.$route.name : '',
        ORG_TYPE: localStorage.getItem('orgtype') + '',
        channelSearch: {
          status: '0',
          company_name: "",
          page: 1,
          page_size: 5
        },
        channelType: "",
        allSelectData: [],
        allSelectOrgId: [],
        channel_total_page: 0,
        search: {
          name: "",
          page: 1,
          class_id_1: '',
          class_id_2: '',
          class_id_3: '',
          departure_city: '0',
          destination_city: '0',
          trip_days: '',
          product_audit_status: '0',
          supplier_name: '',
          product_no: '',
          line_save_type: '0',
          channel_source: ''
        },
        res_search: {
          name: "",
          page: 1,
          class_id_1: '',
          class_id_2: '',
          class_id_3: '',
          departure_city: '0',
          destination_city: '0',
          trip_days: '',
          product_audit_status: '0',
          supplier_name: '',
          product_no: '',
          line_save_type: '0',
          channel_source: ''
        },
        class_id_1: '0',
        class_id_2: '0',
        class_id_3: '0',
        classId1_list: [],
        classId2_list: [],
        classId3_list: [],
        p_id: 0,
        p_type: 1,
        total_page: 1,
        res_list: [],
        res_citylist: [],
        init_citylist: [
          {
              "zone_id": 110100,
              "CN": "北京",
              "zone_name": "北京市",
              "EN": "Beijing"
          },
           {
              "zone_id": 310100,
              "CN": "上海",
              "zone_name": "上海市",
              "EN": "Shanghai"
          },
           {
              "zone_id": 440100,
              "CN": "广州",
              "zone_name": "广州市",
              "EN": "Guangzhou"
          },
           {
              "zone_id": 440300,
              "CN": "深圳",
              "zone_name": "深圳市",
              "EN": "Shenzhen"
          },
          {
              "zone_id": 320100,
              "CN": "南京",
              "zone_name": "南京市",
              "EN": "Nanjing"
          },
          {
              "zone_id": 350200,
              "CN": "厦门",
              "zone_name": "厦门市",
              "EN": "Xiamen"
          },
          {
              "zone_id": 350100,
              "CN": "福州",
              "zone_name": "福州市",
              "EN": "Fuzhou"
          }
        ],
        SUBMIT_STATUS_MAP: {},
        YUERYOU_STATUS_MAP: {
          0: '未同步',
          1: '同步',
        },
        SUBMIT_STATUS_MAP2: {
          1: '未上架',
          2: '审核中',
          3: '已上架',
          4: '已下架',
          5: '已退回',
          6: '上架失败'
        },
        product_audit_status: {},
        showProductListDlg: false,
        productList: [],
        middleProduct: {},
        downloadDlg: false,
        downLoadId: ''
      }
    },
    watch: {
      '$route' () {
        this.name = this.$route.name ? this.$route.name : '';
        this.res_search.name = ''
        this.res_search.page = 1
        this.res_search.class_id_1 = ''
        this.res_search.class_id_2 = ''
        this.res_search.class_id_3 = ''
        this.res_search.departure_city = '0'
        this.res_search.destination_city = '0'
        this.res_search.trip_days = ''
        this.res_search.product_audit_status = '0'
        this.res_search.supplier_name = ''
        this.class_id_1 = '0'
        this.class_id_2 = '0'
        this.class_id_3 = '0'
        this.getProduct()
      }
    },
    methods: {
      // checkboxT(row,index){
      //   // if (row.type == 5) {
			// 	// 	return false
			// 	// }else{
			// 	// 	return true
			// 	// }
      // },
      handleAllSelectDownWay(){
        if(this.allSelectData){
          var arr = [];
          for(var i=0; i<this.allSelectData.length;i++){
            if(this.allSelectData[i]){
              for(var y=0; y<this.allSelectData[i].length;y++){
                if(this.allSelectData[i][y].submit_status == 3){
                  arr.push(this.allSelectData[i][y].org_id)
                }else{
                  this.$message({
                    message: "此操作只能对已上架产品",
                    type: 'error'
                  })
                  return false;
                }
              }
            }
          }
          this.soldoutProduct(this.middleProduct.row,arr)
        }else{
          this.$message({
            message: "请选择下架渠道！",
            type: 'error'
          })
        }
      },
      handleAllSelectPutWay(){
        if(this.allSelectData){
          var arr = [];
          for(var i=0; i<this.allSelectData.length;i++){
            if(this.allSelectData[i]){
              for(var y=0; y<this.allSelectData[i].length;y++){
                if(this.allSelectData[i][y].submit_status == 1 || this.allSelectData[i][y].submit_status== 4 ||  this.allSelectData[i][y].submit_status == 5 || this.allSelectData[i][y].submit_status == 6){
                  arr.push(this.allSelectData[i][y].org_id)
                }else{
                  this.$message({
                    message: "选中的产品已在选择的渠道分公司上架或审批中",
                    type: 'error'
                  })
                  return false;
                }
              }
            }
          }
          this.putawayProduct(this.middleProduct.row,arr)
        }else{
          this.$message({
            message: "请选择上架渠道！",
            type: 'error'
          })
        }
      },
      handleSelectionChange(e){
        console.log(e);
        this.allSelectData[this.channelSearch.page] = e;        
      },  
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      isEmptyArray(arr){
        return !Array.isArray(arr) || arr.length == 0
      },
      getProduct(type) {
        this.search.class_id_1 = this.class_id_1 || '';
        this.search.class_id_2 = this.class_id_2 || '';
        this.search.class_id_3 = this.class_id_3 || '';
        if (type === '1') {
          this.search.page = 1;
          this.res_search = {... this.search};
        } else {
          this.search = {... this.res_search};
        };
        let data = this.res_search;
        let params={
    			data
        };
        // if (this.$menuPermission('touristroute/linetravel/line') && this.ORG_TYPE === '6' && this.name !== "lineTrip") {
        //   this.$router.push({
        //     path: '/touristroute/lineTrip'
        //   })
        //   return false
        // }
        let action = operationsTravelSelfList;
        if (this.name === 'operatingSupplierTrip') {
          action = operationsSupplierList
        } else if (this.name === 'operatingOtherTrip'){
          action = operationsOtherList
        } else if (this.name === 'operatingCooperationTrip'){
           action = operationsCooperationList
        }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              this.res_list = result.data || result.list;
              this.total_page = result.total_count * 1;
              this.classId1_list = result.cfg_cate_info;
              this.SUBMIT_STATUS_MAP = result.submit_status;
              this.product_audit_status = result.product_audit_status;
              if (this.middleProduct.row && this.res_list.length > 0) {
                let flag = false
                if(result.data){
                  result.data.forEach((item, index) => {
                    if (this.middleProduct.row.id === item.id) {
                      this.productList = [...item.channel_info]
                      flag = true
                    }
                  })
                }else if(result.list){
                  result.list.forEach((item, index) => {
                    if (this.middleProduct.row.id === item.id) {
                      this.productList = [...item.channel_info]
                      flag = true
                    }
                  })
                }
                // 下架供应商的行程。就关闭弹窗
                if (!flag) {
                  this.showProductListDlg = false
                }
              }
            } else {
              this.res_list = [];
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        });
      },
      remoteMethod(query) {
        if (query !== '') {
          let params = {
            data: {
              country_id: '',
              area_name: query,
              eng_name: '',
              level: '',
              parent_id: ''
            }
          };
          getArea({
            params: params,
            success: (res) => {
              let result = res.data;
              if (result.code === 0) {
                this.loading = true;
                setTimeout(() => {
                  this.loading = false;
                  this.res_citylist = result.data.filter(item => {
                    return item.area_name.indexOf(query) > -1;
                  });
                }, 200);
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              };
            },
            showLoading: false
          });
        }else{
          this.res_citylist = this.init_citylist
        }
      },
      suggest(cityCode){
        if(!cityCode){
          this.res_citylist = this.init_citylist;
        }else{
          // let cityname = cityCode.split(',')
          this.remoteMethod(cityCode)
        }
      },
      currentPageChange(val) {
        this.res_search.page = val;
        this.getProduct();
      },
      channelCurrentPageChange(val){
        this.channelSearch.page = val;
        this.getChannelList();
      },
      changeStatus(id, status) {
        let params = {
          data: {
            id: id,
            status: status
          }
        }
        changeStatus({
          params: params,
          success: (res) => {
            let result = res.data;
            if (result.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.getProduct();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
        })
      },
      classId1(value) {
        if(value != 0) {
          this.p_type = 1;
          this.p_id = value;
          this.class_id_2 = '0';
          this.class_id_3 = '0';
          this.classId2_list = [];
          this.classId3_list = [];
          this.getCateInfo(1);
        };
      },
      classId2(value) {
        this.p_type = 2;
        this.p_id = value;
        this.class_id_3 = '0';
        this.classId3_list = [];
        this.getCateInfo(2);
      },
      getCateInfo(type) {
        // console.log(this.p_id)
        let params = {
          data: {
            type: this.p_type,
            p_id: this.p_id ? this.p_id : 1
          }
        };
        getCateInfo({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              if (type == 1) {
                this.classId2_list = res.data.data
              };
              if(type == 2) {
                this.classId3_list = res.data.data
              };
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: false
        });
      },
      showProductList(data){
        this.showProductListDlg = true;
        this.channelSearch.product_id = data.id;
        this.channelType = data.type;
        this.getChannelList();
      },
      handleSeachChannel(){
        this.channelSearch.page = 1;
        this.allSelectData = [];
        this.getChannelList();
      },
      toggleSelection() {
        var that = this;
        console.log(that.allSelectOrgId);
        if (that.allSelectOrgId[that.channelSearch.page]) {
          that.allSelectOrgId[that.channelSearch.page].forEach(row => {
            that.$refs.multipleTable.toggleRowSelection(row,true);
          });
        } 
      },
      getChannelList(){

        let params = {
          data: {...this.channelSearch}
        }
        if(this.name == 'operatingTrip'){
          params.data.type = 1;
        }else if(this.name == 'operatingSupplierTrip'){
          params.data.type = 2;
        }else if(this.name == 'operatingOtherTrip'){
          params.data.type = 3;
        }else if(this.name == 'operatingCooperationTrip'){
          params.data.type = 4;
        }
        operationsUpChannel({
          params,
          success: (res) => {
            let result = res.data;
            if(result.code === 0) {
              this.productList = result.data.list;
              this.channel_total_page = result.data.total_count * 1;
              var arr = [];
              for(var i=0;i<result.data.list.length;i++){
                if(this.allSelectData[this.channelSearch.page]){
                  for(var y=0;y<this.allSelectData[this.channelSearch.page].length;y++){
                    if(this.allSelectData[this.channelSearch.page][y].org_id == result.data.list[i].org_id){
                      arr.push(result.data.list[i]);
                    }
                  }
                }
              }
              this.allSelectOrgId[this.channelSearch.page] = arr;
              this.$nextTick(function(){
                this.toggleSelection(); //每次更新了数据，触发这个函数即可。
              })
            } else {
              this.productList = [];
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: false
        })
      },
      withdrawProduct(data){
        this.$confirm(
          '确认撤回该行程？',
          '撤回',
          {type: 'warning'}
        ).then(() => {
          newSendBack({
            params: {data: { 
              type: this.channel_source_type,
              product_id: data.product_id,
              org_ids: [data.org_id]
             }},
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getProduct();
                this.showProductListDlg = false;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            },
            showLoading: true
          })
        }).catch((e)=>{
          console.log('撤回失败', e)
        });
      },
      handleDelete(trip){
        this.$confirm('确认删除该行程？', '删除确认', {type: 'warning'}).then(() => {
          // console.log('上架')
          delProduct({
            params: {data: {product_id: trip.id}},
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getProduct();
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            },
            showLoading: true
          });
        }).catch((e)=>{
          // console.log('上架失败', e)
        });
      },
      putawayProduct(data,org_ids){
        console.log(data);
        this.$confirm(
          '确认上架该行程？',
          '上架',
          {type: 'warning'}
        ).then(() => {
          // console.log('上架')
          operationsUpOn({
            params: {data: {
              type: this.channel_source_type,
              product_id: data.product_id || data.id,
              org_ids
            }},
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getProduct();
                this.showProductListDlg = false;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            },
            showLoading: true
          })
        }).catch((e)=>{
          // console.log('上架失败', e)
        });
      },
      soldoutProduct(data,org_ids){
        
        let action = operationsDownShelf;

        this.$confirm(
          '确认下架该行程？',
          '下架',
          {type: 'warning'}
        ).then(() => {
          // console.log('下架')
          action({
            params: {data: {
              type: this.channel_source_type,
              product_id: data.product_id || data.id,
              org_ids
            }},
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getProduct();
                this.showProductListDlg = false;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            },
            showLoading: true
          })
        }).catch((e)=>{
          // console.log('下架失败', e)
        });
      },
      handleProductOperation(scope, oper){
        this.allSelectData = [];
        this.allSelectOrgId = [];
        let data = scope.row
        this.middleProduct = scope
        if(oper == 'show'){
          this.channel_source_type = data.channel_source_type;
          this.showProductList(data)
        }else if(oper == 'withdraw'){
          this.withdrawProduct(data);
        }else if(oper == 'putaway'){
          this.putawayProduct(data,[data.org_id]);
        }else if(oper == 'soldout'){
          this.soldoutProduct(data,[data.org_id]);
        }else{
          console.error('错误的操作符: ', oper);
          // this.$message({type: 'error', message: '非法操作'});
        }
      },
      openDownloadDig(id) {
        this.downloadDlg = true;
        this.downLoadId = id;
      },
      downloadHander(type) {
        if (type === 'pdf') {
          if (this.name === 'trip') {
            window.location.href = `api/product/save_travel_detail_pdf?product_id=${this.downLoadId}`
          }
        } else if (type === 'word') {
          let params = {
            data: {
              product_id: this.downLoadId
            }
          };
          saveTravelDetailWord({
            params,
            success: (res) => {
              let result = res.data;
              if(result.code === 0) {
                window.location.href = result.data.url
              } else {
                this.$message({
                  type: 'error',
                  message: result.msg
                })
              }
            },
            showLoading: false
          })
        }
      },
      yeySync(id){
        this.$message({
          message: '正在同步',
          type: 'success'
        });
        let data = {
          product_id: id
        };
        synYueryou({
          params: {data},
          success: (res) => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.getProduct();
              this.showProductListDlg = false;
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        })
      }
    },
    mounted() {
      this.getProduct();
    }
  }
</script>
<style lang="scss" scoped>
  .trip-wrpper {
    .tab-button {
      float: right;
      padding: 5px 10px 0 0;
    }
    .system-search {
      .trip-search-wid {
        float: left;
        // width: 600px;
      }
      .search-item {
        &.long {
          padding-left: 110px;
          .label {
            margin-left: -110px;
            width: 100px;
          }
        }
      }
    }
    .text-c {
      text-align: center;
    }
    .text-l {
      text-align: left;
      a {
        color: #333;
      }
    }
    .fontcolor1 {
      color: #333;
    }
    .canuse {
      color: #fff;
      background-color: #019f3d;
      padding: 2px 5px;
      font-size: 12px;
      border-radius: 2px;
    }
    .nouse {
      color: #fff;
      background-color: #999999;
      padding: 2px 5px;
      font-size: 12px;
      border-radius: 2px;
    }
    .day-bold {
      font-weight: bold;
      color: #444444;
    }
    .protit {
      color: #b10c79;
    }
    .pointer{
      cursor: pointer
    }
    .upload-wrap {
      text-align: center;
      font-size: 0;
      .upload-box {
        display: inline-block;
        font-size: 16px;
        margin: 0 10px;
        width: 80px;
        height: 80px;
        border: 1px solid #b10c79;
        color: #b10c79;
        line-height: 80px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  .link-col{
    color: #b10c79; 
    cursor: pointer;
  }
</style>

