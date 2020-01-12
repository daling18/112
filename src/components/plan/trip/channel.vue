<template>
  <div class="wrapper trip-wrapper">
    <div class="system-content">
      <div class="mod-form">
        <h1 class="base-tit">
          {{ baseInfo.name }} 
          <span class="base-line">{{baseInfo.line_type}}</span>
        </h1>
        <div class="title">基本信息</div>
        <div class="base-list">
          <div class="base-con" v-if="baseInfo.departure_city_name">
            <div class="base-pd">
              <div class="base-contit">出发地：</div>
              <div class="base-coninfo">{{baseInfo.departure_city_name}}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.assembing_time">
            <div class="base-pd">
              <div class="base-contit">集合时间：</div>
              <div class="base-coninfo">{{ baseInfo.assembing_time }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.destination_city_name">
            <div class="base-pd">
              <div class="base-contit">目的地：</div>
              <div class="base-coninfo">{{baseInfo.destination_city_name}}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.assembing_place">
            <div class="base-pd">
              <div class="base-contit">集合地点：</div>
              <div class="base-coninfo">{{ baseInfo.assembing_place }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.trip_days || baseInfo.trip_night">
            <div class="base-pd">
              <div class="base-contit">行程天数：</div>
              <div class="base-coninfo">
                {{ baseInfo.trip_days }}天
                {{ baseInfo.trip_night }}夜
              </div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.category_name_1">
            <div class="base-pd">
              <div class="base-contit">行程类别：</div>
              <div class="base-coninfo">{{ baseInfo.category_name_1 }}<span v-if="baseInfo.category_name_2">></span>{{ baseInfo.category_name_2 }}<span v-if="baseInfo.category_name_3">></span>{{ baseInfo.category_name_3 }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.departure_traffic_type_name">
            <div class="base-pd">
              <div class="base-contit">去程交通：</div>
              <div class="base-coninfo">
                <span>{{baseInfo.departure_traffic_type_name}}</span>
                <span v-if="baseInfo.departure_traffic_content">({{baseInfo.departure_traffic_content}})</span>
              </div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.seattime">
            <div class="base-pd">
              <div class="base-contit">占位有效时间：</div>
              <div class="base-coninfo">{{ baseInfo.seattime }}{{ baseInfo.seattime_type_name }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.back_traffic_type_name">
            <div class="base-pd">
              <div class="base-contit">返程交通：</div>
              <div class="base-coninfo">
                <span>{{baseInfo.back_traffic_type_name}}</span>
                <span v-if="baseInfo.back_traffic_content">({{baseInfo.back_traffic_content}})</span>
              </div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.operator_name">
            <div class="base-pd">
              <div class="base-contit">OP：</div>
              <div class="base-coninfo">{{ baseInfo.operator_name }}</div>
            </div>
          </div>
        </div>
        <el-table :data="productList" border style="width: 100%; margin-top: 30px;">
          <el-table-column label="渠道" align='center'>
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.channel_name">
                {{ scope.row.channel_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" align='center'>
            <template slot-scope="scope">
              <div :class="scope.row.submit_status | getStatusColor">
                {{ SUBMIT_STATUS_MAP[scope.row.submit_status] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align='center'>
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- 这里行程的状态加一是因为0也是false -->
                  <el-dropdown-item>
                    <router-link v-if="$menuPermission('api/bpm/product')" :to="{path: '/tdmDetail', query: {id: scope.row.product_id}}">{{scope.row.edit_name}}</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a v-if="$menuPermission('api/product/send_back') && scope.row.submit_status == 2" href="javascript:;" @click="handleProductOperation(scope.row, 'withdraw')">撤回</a>
                    <a v-else-if="$menuPermission('api/product/sold_out') && scope.row.submit_status == 3" href="javascript:;" @click="handleProductOperation(scope.row, 'soldout')">下架</a>
                    <a 
                      v-else-if="$menuPermission('api/product/putaway') && (scope.row.submit_status == 1 || scope.row.submit_status == 4 || scope.row.submit_status == 5)"
                      href="javascript:;" 
                      @click="handleProductOperation(scope.row, 'putaway')">上架</a>
                    <span v-else href="javascript:;">--</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
/** 暂时没有使用 qzh -- 20180327 */
import { channelOperation, putaway, soldOut, sendBack }from 'src/api/product'
  import Calendar from 'src/plugins/Calendar.vue';
  export default {
    components:{
      calendar: Calendar
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
    },
    data() {
      return {
        product_id: this.$route.query.id,
        order_no: this.$route.query.order_no,
        baseInfo: {},
        SUBMIT_STATUS_MAP: {},
        productList: []
      }
    },
    computed: {
      priceDateList() {
        if(this.baseInfo && Array.isArray(this.baseInfo.price_date_lists)){
          return this.baseInfo.price_date_lists.map(item => item.quotation_date);
        }else{
          return [];
        }
      }
    },
    methods: {
      getInfo() {
        let params = {
          data: {
            product_id: this.product_id,
            order_no: ''
          }
        };
        channelOperation({
          params,
          success: ({data: resp}) => {
            const {code, data, msg} = resp;

            if (code === 0) {
              this.productList = data.channel_info || [];
              this.baseInfo = data;
              this.SUBMIT_STATUS_MAP = data.submit_status;
            } else {
              this.$message({
                message: msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        })
      },
      withdrawProduct(id){
        this.$confirm(
          '确认撤回该行程？',
          '撤回',
          {type: 'warning'}
        ).then(() => {
          //  console.log('撤回')
          sendBack({
            params: {data: { id }},
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getInfo();
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
          //  console.log('撤回失败', e)
        });
      },
      putawayProduct(id){
        this.$confirm(
          '确认上架该行程？',
          '上架',
          {type: 'warning'}
        ).then(() => {
          //  console.log('上架')
          putaway({
            params: {data: { id }},
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getInfo();
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
          //  console.log('上架失败', e)
        });
      },
      soldoutProduct(id){

        this.$confirm(
          '确认下架该行程？',
          '下架',
          {type: 'warning'}
        ).then(() => {
          //  console.log('下架')
          soldOut({
            params: {data: {id}},
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.getInfo();
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
          //  console.log('下架失败', e)
        });
      },
      handleProductOperation(data, oper){
        if(oper == 'withdraw'){
          this.withdrawProduct(data.product_id);
        }else if(oper == 'putaway'){
          this.putawayProduct(data.product_id);
        }else if(oper == 'soldout'){
          this.soldoutProduct(data.product_id);
        }else{
          console.error('错误的操作符: ', oper);
          // this.$message({type: 'error', message: '非法操作'});
        }
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>
<style lang="less" scoped>
  .price_date_btn{
    color: #b10c79;
    float: right;
    font-size: 14px;
  }
  .trip-wrapper {
    .base-tit {
      font-size: 18px;
      color: #333333;
      .base-line {
        display: inline-block;
        padding: 5px 10px;
        background-color: #fbf3f8;
        color: #b10c79;
        font-size: 12px;
        border-radius: 5px;
      }
    }
    .base-list {
      width: 100%;
        font-size: 0;
      // .base-item {
      //   padding: 10px 0 0;
      // }
      .base-con {
        display: inline-block;
        padding: 10px 0 0;
        width: 50%;
        min-height: 28px;
        vertical-align: top;
      }
      .base-pd {
        position: relative;
        padding-left: 100px;
        font-size: 14px;
        line-height: 28px;
        .base-contit {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100px;
          text-align: right;
          color: #999999;
          min-height: 28px;
        }
        .base-coninfo {
          color: #333333;
          padding-left: 30px;
          // font-weight: bold;
          min-height: 28px;
        }
      }
    }
    .easy-trip-doclist {
      list-style: none;
      li {
        font-size: 14px;
        line-height: 28px;
        color: #333333;
        .doc-idx {
          padding-right: 10px;
        }
        .doc-size {
          font-size: 12px;
          color: #999999;
          font-style: normal;
          padding: 0 10px
        }
        .doc-down {
          color: #b10c79;
          padding-left: 40px;
        }
      }
    }
    .pc-wrapper.pd20 {
        width: auto;
        padding: 0 0 0 20px;
    }
    .pc-wrapper {
      width: 100%;
      margin-top: 30px;
      font-size: 0;
      .pc-item {
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 15px;
        width: 190px;
        height: 120px;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        &>a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .trip-detail-wrap {
      .trip-detail-inner {
        color: #333333;
        padding-left: 100px;
        .trip-detail-tit {
          font-size: 18px;
          color: #333333;
        }
        .trip-detail-itemtit {
          font-size: 14px;
          color: #b10c79;
          margin-bottom: 10px;
        }
        .trip-detial-row-box {
          .trip-detail-row:first-child {
            margin: 20px 0 0 0;
            padding: 0px 0 0 50px;
            .traffic-btn {
              top: -5px;
            }
          }
          .trip-detail-row:last-child {
            border-left: 1px solid #fff;
            padding-bottom: 10px;
            &:before {
              content: '';
              position: absolute;
              top: -10px;
              left: -1px;
              width: 0.5px;
              height: 40px;
              background-color: #afafaf;
            }
          }
        }
        .trip-detail-row {
          position: relative;
          padding: 20px 0 0 50px;
          border-left: 1px solid #afafaf;
          &.first {
            margin: 20px 0 0 0;
            padding: 0px 0 0 50px;
            .traffic-btn {
              top: -5px;
            }
          }
          &.last {
            border-left: 1px solid #fff;
            &:before {
              content: '';
              position: absolute;
              top: -10px;
              left: -1px;
              width: 0.5px;
              height: 75%;
              background-color: #afafaf;
            }
          }
          .traffic-btn {
            position: absolute;
            top: 15px;
            left: -15px;
          }
        }
        .eat-on {
          display: inline-block;
          width: 17px;
          height: 17px;
          border: 1px solid #afafaf;
          text-align: center;
          line-height: 17px;
          font-size: 12px;
          color: #fff;
          background-color: #b10c79;
        }
        .eat-off {
          display: inline-block;
          width: 17px;
          height: 17px;
          border: 1px solid #afafaf;
          text-align: center;
          line-height: 17px;
          font-size: 12px;
          color: #fff;
        }
        .hotel-tip {
          color: #999999;
          font-style: normal;
          &>span {
            padding-right: 15px;
          }
        }
      }
    }
    .tip-tab-wrap {
      border: 1px solid #cccccc;
      padding: 0 0 10px;
    }
  }
</style>
