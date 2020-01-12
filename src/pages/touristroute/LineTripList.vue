<template>
<!-- application\index\view\dev\src\components\plan\trip\trip-list.vue -->
  <div class="wrapper trip-wrpper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link :class='name === "trip" ? "on" : ""' to="/touristroute/trip/list" v-if="$menuPermission('touristroute/linetravel/company') && (ORG_TYPE !== '6')" tag="li">本公司行程</router-link>
        <router-link :class='name === "supplierTrip" ? "on" : ""' to="/touristroute/supplierTrip/list" v-if="$menuPermission('touristroute/linetravel/supplier')" tag="li">供应商行程</router-link>
        <router-link :class='name === "lineTrip" ? "on" : ""' to="/touristroute/lineTrip/list" v-if="$menuPermission('touristroute/linetravel/line')" tag="li">线路行程</router-link>
        <router-link :class='name === "other" ? "on" : ""' to="/touristroute/other/list" v-if="$menuPermission('touristroute/other/list')" tag="li">其他公司行程</router-link>
        <!-- <router-link :class='name === "operating" ? "on" : ""' to="/touristroute/operating/list" v-if="$menuPermission('touristroute/operating/line')" tag="li">合作运营中心行程</router-link> -->
        <!-- <router-link v-if="$menuPermission('api/bpm/product')"  to="/group" tag="li">TDM行程</router-link> -->
      </ul>
      <div class="search-item tab-button">
        <router-link v-if='name === "trip" && $menuPermission("touristroute/linetravel/company/addpro")' :to="{path: 'addNewTrip'}">
          <el-button type="primary">+ 新增</el-button>
        </router-link>
        <router-link v-else-if='name === "lineTrip" && $menuPermission("touristroute/linetravel/line/addpro")' :to="{path: 'addNewTrip'}">
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
      <div v-if="name === 'supplierTrip'" class="search-item long">
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
          <input-number  v-model="search.trip_days" placeholder="请输入行程天数" />
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
              min-width="80">
              <template slot-scope="scope">
                <div class="ellipsis"><a class="fontcolor1" href="javascript: void(0);" :title="scope.row.departure_city_name">{{ scope.row.departure_city_name }}</a></div>
              </template>
            </el-table-column>
            <el-table-column
              label="目的地"
              align="center"
              min-width="80">
              <template slot-scope="scope">
                <div class="ellipsis"><a class="fontcolor1" href="javascript: void(0);" :title="scope.row.destination_city_name">{{ scope.row.destination_city_name }}</a></div>
              </template>
            </el-table-column>
            <el-table-column
              :label='name === "lineTrip" ? "op" : (name === "trip" ? "供应商/本公司OP" : "供应商")'
              align="center"
              min-width="150"
              key="b">
              <template slot-scope="scope">
                <span class="ellipsis text-c" :title="scope.row.operator_name">{{ scope.row.operator_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="name === 'supplierTrip'"
              label='审核状态'
              align='center'
              width='80'
              key="a">
              <template slot-scope='scope'>
                <div v-if="scope.row.supplier_audit_status === 1" class="">待审核</div>
                <div v-if="scope.row.supplier_audit_status === 2" class="color-green">通过</div>
                <div v-if="scope.row.supplier_audit_status === -1">不通过</div>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              label="发布渠道"
              align="center"
              width="130">
              <template slot-scope="scope">
                <div v-if="$menuPermission('touristroute/linetravel/company/channel') && !isEmptyArray(scope.row.channel_info) && name === 'trip'">  
                  <div
                    v-for="(channel, idx) in scope.row.channel_info"
                    :key="idx"
                    class="ellipsis pointer"
                    @click="handleProductOperation(scope, 'show')">
                    <template v-if="channel.type === 1">
                      <!-- <span :class="channel.submit_status | getStatusTagColor">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</span> -->
                      <el-tag v-if="channel.submit_status === 3" type="success">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                      <el-tag v-else-if="channel.submit_status === 2" type="danger">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                      <el-tag v-else type="gray">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                    </template>
                    <template v-else-if="channel.type === 3">
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
                <div
                  v-else-if="$menuPermission('touristroute/linetravel/line/channel') && !isEmptyArray(scope.row.channel_info) && name === 'lineTrip'"
                  v-for="(channel, idx) in scope.row.channel_info"
                  :key="idx"
                  class="ellipsis  pointer"
                  @click="handleProductOperation(scope, 'show')">
                  <template v-if="channel.type === 1">
                    <!-- <span :class="channel.submit_status | getStatusTagColor">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</span> -->
                    <el-tag v-if="channel.submit_status === 3" type="success">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                    <el-tag v-else-if="channel.submit_status === 2" type="danger">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                    <el-tag v-else type="gray">{{ SUBMIT_STATUS_MAP[channel.submit_status] }}</el-tag>
                  </template>
                  <template v-else-if="channel.type === 3">
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
                <div v-else>--</div>
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
                <div v-if='name === "supplierTrip"'>
                  <el-dropdown v-if="($menuPermission('usercenter/approval/detail') || $menuPermission('touristroute/linetravel/supplier/getstrockdetail'))" trigger="click">
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$menuPermission('usercenter/approval/detail')">
                        <router-link :to="{path: '/approval/submit/detail', query: {id: scope.row.approval_id}}">审批单</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('touristroute/linetravel/supplier/getstrockdetail')">
                        <router-link :to="{ path: 'tripDetail', query: { id: scope.row.id }}">查看</router-link>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div v-else>--</div>
                </div>
                <div v-if='!showBtn(0, scope) && (name === "trip" || name === "lineTrip")'>--</div>
                <el-dropdown v-else-if='name === "trip" || name === "lineTrip"' trigger="click">
                  <span class="el-dropdown-link">
                    操作
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>
                      <router-link v-if="showBtn(1, scope)" :to="{ path: 'addNewTrip', query: { id: scope.row.id, type: scope.row.product_type + 1 }}">编辑</router-link>
                      <router-link v-else-if="showBtn(1, scope)" :to="{ path: 'addNewTrip', query: { id: scope.row.id, type: scope.row.product_type + 1 }}">编辑</router-link>
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="showBtn(1, scope)">
                      <router-link :to="{ path: 'addNewTrip', query: { id: scope.row.id, type: scope.row.product_type + 1 }}">编辑</router-link>
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>
                      <div v-if="showBtn(2, scope)" @click="handleDelete(scope.row)">删除</div>
                      <div v-else-if="showBtn(2, scope)" @click="handleDelete(scope.row)">删除</div>
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="showBtn(2, scope)">
                      <div @click="handleDelete(scope.row)">删除</div>
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>
                      <router-link v-if="showBtn(3, scope)" :to="{ path: 'addNewTrip', query: { copyId: scope.row.id, type: scope.row.product_type + 1  }}">复制行程</router-link>
                      <router-link v-else-if="showBtn(3, scope)" :to="{ path: 'addNewTrip', query: { copyId: scope.row.id, type: scope.row.product_type + 1 }}">复制行程</router-link>
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="showBtn(3, scope)">
                      <router-link :to="{ path: 'addNewTrip', query: { copyId: scope.row.id, type: scope.row.product_type + 1  }}">复制行程</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="showBtn(4, scope)"><div @click="changeStatus(scope.row.id, -1)">禁用</div></el-dropdown-item>
                    <el-dropdown-item v-else-if="showBtn(5, scope)"><div @click="changeStatus(scope.row.id, 1)">启用</div></el-dropdown-item>
                    <!-- <el-dropdown-item v-if="showBtn(4, scope)"><div @click="changeStatus(scope.row.id, -1)">禁用</div></el-dropdown-item>
                    <el-dropdown-item v-else-if="showBtn(5, scope)"><div @click="changeStatus(scope.row.id, 1)">启用</div></el-dropdown-item> -->
                    <!-- <el-dropdown-item>
                      <router-link v-if="showBtn(6, scope)" :to="{ path: 'bids', query: { id: scope.row.id }}">团期报价</router-link>
                      <router-link v-else-if="showBtn(6, scope)" :to="{ path: 'bids', query: { id: scope.row.id }}">团期报价</router-link>
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="showBtn(6, scope)">
                      <router-link :to="{ path: 'bids', query: { id: scope.row.id }}">团期报价</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="showBtn(7, scope)">
                      <a href="javascript:;" @click="handleProductOperation(scope, 'show')">渠道操作</a>
                    </el-dropdown-item>
                    <!-- <el-dropdown-item v-else-if="showBtn(7, scope)">
                      <a href="javascript:;" @click="handleProductOperation(scope, 'show')">渠道操作</a>
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="showBtn(8, scope)">
                      <div @click="openDownloadDig(scope.row.id)">下载行程单</div>
                      <!-- <a :href='`api/product/save_travel_detail_pdf?product_id=${scope.row.id}`'>下载行程单</a> -->
                    </el-dropdown-item>
                    <!-- <el-dropdown-item v-else-if="showBtn(8, scope)">
                      <div @click="openDownloadDig(scope.row.id)">下载行程单</div>
                    </el-dropdown-item> -->
                    <el-dropdown-item v-if="showBtn(9, scope)">
                      <router-link :to="{ path: 'tripDetail', query: { id: scope.row.id }}">查看行程</router-link>
                    </el-dropdown-item>
                    <!-- <el-dropdown-item v-else-if="showBtn(9, scope)">
                      <router-link :to="{ path: 'tripDetail', query: { id: scope.row.id }}">查看行程</router-link>
                    </el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination  layout="total, prev, pager, next, jumper" :total="total_page" :current-page="res_search.page" @current-change="currentPageChange">
      </el-pagination>
    </div>
    <el-dialog title="渠道操作" :visible.sync="showProductListDlg">
      <el-table :data="productList" border style="width: 100%">
        <el-table-column label="渠道" align="center">
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row.channel_name">
              {{ scope.row.channel_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1" :class="scope.row.submit_status | getStatusColor">
              {{ SUBMIT_STATUS_MAP[scope.row.submit_status] }}
            </div>
            <div v-else-if="scope.row.type === 3">
              {{YUERYOU_STATUS_MAP[scope.row.submit_status]}}
            </div>
            <div :class="scope.row.submit_status | getStatusColor"
              v-else>
              {{ SUBMIT_STATUS_MAP2[scope.row.submit_status] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <!-- type判断来源 1、盈科tdm，2、未知，3、鱼儿游同步，4、盈科体系，5、本公司 -->
            <template v-if="scope.row.type == 1">
              <router-link 
                v-if="$menuPermission('touristroute/linetravel/company/channel')"  
                :to="{path: '/tdmDetail', query: {id: scope.row.product_id}}"
              >{{scope.row.edit_name}}</router-link>
              <a
                v-if="$menuPermission('touristroute/linetravel/company/channel') && scope.row.submit_status == 2"
                href="javascript:;" @click="handleProductOperation(scope, 'withdraw')"
              >撤回</a>
              <a 
                v-else-if="$menuPermission('touristroute/linetravel/company/channel') && scope.row.submit_status == 3" 
                href="javascript:;" 
                @click="handleProductOperation(scope, 'soldout')"
              >下架</a>
              <a 
                v-else-if="$menuPermission('touristroute/linetravel/company/channel') && (scope.row.submit_status == 1 || scope.row.submit_status == 4 || scope.row.submit_status == 5)"
                href="javascript:;" 
                @click="handleProductOperation(scope, 'putaway')"
              >上架</a>
            </template>
            <template v-else-if="scope.row.type == 3">
              <span class="link-col" @click="yeySync(scope.row.product_id)">同步</span>
            </template>
            <template v-if="scope.row.type === 5 || scope.row.type === 0">
              <el-button type='text' @click="handleSelfPutOn(scope)" v-if="scope.row.submit_status === 1 || scope.row.submit_status === 4">上架</el-button>
              <el-button type='text' @click="handleDoPutOff(scope)" v-else-if="scope.row.submit_status === 3">下架</el-button>
              <el-button type='text' @click="handldRecall(scope)" v-else-if="scope.row.submit_status === 2">撤回</el-button>
              <el-button type='text' @click="handleSelfPutOn(scope)" v-else-if="scope.row.submit_status === 5 || scope.row.submit_status === 6">重新上架</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
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
  import {product,  changeStatus, getCateInfo, getArea}from 'src/api/api'
  import {putaway, 
          soldOut,
          sendBack,
          saveTravelDetailWord,
          synYueryou,
          delProduct,
          selfPutOn,
          doPutOff,
          recall,
          supplierProductLists}from 'src/api/product'
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
        name: this.$route.name ? this.$route.name : '',
        ORG_TYPE: localStorage.getItem('orgtype') + '',
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
          line_save_type: '0'
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
          line_save_type: '0'
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
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      showBtn (type, data) {
        if (!type) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9].some(i => this.showBtn(i, data))
        }
        if (this.name === 'trip') {
          switch (type) {
            case 1:
              if (this.$menuPermission('touristroute/linetravel/company/addpro') && data.row.type != 2) {
                return true
              }
              break;
            case 2:
              if (this.$menuPermission('touristroute/linetravel/company/delstroke') && data.row.type != 2) {
                return true
              }
              break;
            case 3:
              if (this.$menuPermission('touristroute/linetravel/company/addpro')) {
                return true
              }
              break;
            case 4:
              if (data.row.status === 1 && this.$menuPermission('touristroute/linetravel/company/openoff') && data.row.type != 2) {
                return true
              }
              break;
            case 5:
             if (data.row.status === -1 && this.$menuPermission('touristroute/linetravel/company/openoff') && data.row.type != 2) {
               return true
             };
             break;
            case 6:
              if (this.$menuPermission('touristroute/linetravel/company/groupoffer') && data.row.type != 2) {
                return true
              }
              break;
            case 7:
              if (this.$menuPermission('touristroute/linetravel/company/channel') && !this.isEmptyArray(data.row.channel_info)) {
                return true
              }
              break;
            case 8:
             if (this.$menuPermission('touristroute/linetravel/company/downloadstroke')) {
               return true
             }
             break;
            case 9:
              if (this.$menuPermission('touristroute/linetravel/company/getstrockdetail')) {
                return true
              }
              break;
          }
        } else if (this.name === 'lineTrip') {
          switch (type) {
            case 1:
              if (this.$menuPermission('touristroute/linetravel/line/addpro')) {
                return true
              }
              break;
            case 2:
              if (this.$menuPermission('touristroute/linetravel/line/delstroke')) {
                return true
              }
              break;
            case 3:
              if (this.$menuPermission('touristroute/linetravel/line/addpro')) {
                return true
              }
              break;
            case 4:
              if (data.row.status === 1 && this.$menuPermission('touristroute/linetravel/line/openoff')) {
                return true
              }
              break;
            case 5:
             if (data.row.status === -1 && this.$menuPermission('touristroute/linetravel/line/openoff')) {
               return true
             };
             break;
            case 6:
              if (this.$menuPermission('touristroute/linetravel/line/groupoffer')) {
                return true
              }
              break;
            case 7:
              if (this.$menuPermission('touristroute/linetravel/line/channel') && !this.isEmptyArray(data.row.channel_info)) {
                return true
              }
              break;
            case 8:
             if (this.$menuPermission('touristroute/linetravel/line/downloadstroke')) {
               return true
             }
             break;
            case 9:
              if (this.$menuPermission('touristroute/linetravel/line/getstrockdetail')) {
                return true
              }
              break;
          }
        }
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
        if (this.$menuPermission('touristroute/linetravel/line') && this.ORG_TYPE === '6' && this.name !== "lineTrip") {
          this.$router.push({
            path: '/touristroute/lineTrip'
          })
          return false
        }
        let action = product;
        if (this.name === 'lineTrip') {
          action = supplierProduct
        } else if (this.name === 'supplierTrip') {
          action = supplierProductLists
        }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              this.res_list = result.data;
              this.total_page = result.total_count;
              this.classId1_list = result.cfg_cate_info;
              this.SUBMIT_STATUS_MAP = result.submit_status;
              this.product_audit_status = result.product_audit_status;
              if (this.middleProduct.row && result.data.length > 0) {
                let flag = false
                result.data.forEach((item, index) => {
                  if (this.middleProduct.row.id === item.id) {
                    this.productList = [...item.channel_info]
                    flag = true
                  }
                })
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
      changeStatus(id, status) {
        let params = {
          data: {
            id: id,
            status: status
          }
        }
        let action = changeStatus
        if (this.name === 'lineTrip') {
          action = supplierChangeStatus
        }
        action({
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
        this.productList = data;
      },
      withdrawProduct(id){
        this.$confirm(
          '确认撤回该行程？',
          '撤回',
          {type: 'warning'}
        ).then(() => {
          // console.log('撤回')
          sendBack({
            params: {data: { id }},
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
          let action = delProduct
          if (this.name === 'lineTrip') {
            action = supplierDelProduct
          }
          action({
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
      putawayProduct(id){
        this.$confirm(
          '确认上架该行程？',
          '上架',
          {type: 'warning'}
        ).then(() => {
          // console.log('上架')
          putaway({
            params: {data: {id}},
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
      soldoutProduct(id){
        this.$confirm(
          '确认下架该行程？',
          '下架',
          {type: 'warning'}
        ).then(() => {
          // console.log('下架')
          soldOut({
            params: {data: {id}},
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
        let data = scope.row
        this.middleProduct = scope
        if(oper == 'show'){
          this.showProductList(data.channel_info)
        }else if(oper == 'withdraw'){
          this.withdrawProduct(data.product_id);
        }else if(oper == 'putaway'){
          this.putawayProduct(data.product_id);
        }else if(oper == 'soldout'){
          this.soldoutProduct(data.product_id);
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
          } else if (this.name === 'lineTrip') {
            window.location.href = `api_supplier/product/save_travel_detail_pdf?product_id=${this.downLoadId}`
          }
        } else if (type === 'word') {
          let params = {
            data: {
              product_id: this.downLoadId
            }
          };
          let action = saveTravelDetailWord
          if (this.name === 'lineTrip') {
            action = supplierSaveTravelDetailWord
          }
          action({
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
      },
      handleSelfPutOn (scope) {
        let params = {
          data: {
            product_id: scope.row.product_id
          }
        }
        let action = selfPutOn
        if (this.name === 'lineTrip') {
          action = supplierDoPutOn
          params.data.org_ids = [scope.row.org_id]
        }
        action({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.getProduct()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      },
      handleDoPutOff (scope) {
        let params = {
          data: {
            product_id: scope.row.product_id,
            org_ids: [this.middleProduct.row.org_id]
          }
        }
        let action = doPutOff
        if (this.name === 'lineTrip') {
          action = supplierDoPutOff
          params.data.org_ids = [scope.row.org_id]
        }
        action({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              // this.showProductListDlg = false
              this.getProduct()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      },
      handldRecall (scope) {
        let params = {
          data: {
            product_id: scope.row.product_id,
            org_ids: [this.middleProduct.row.org_id]
          }
        }
        let action = recall
        if (this.name === 'lineTrip') {
          action = supplierRecall
          params.data.org_ids = [scope.row.org_id]
        }
        action({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: "success",
                message: result.msg
              })
              // this.showProductListDlg = false
              this.getProduct()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
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

