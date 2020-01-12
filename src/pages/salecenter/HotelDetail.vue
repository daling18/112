<template>
  <div class="wrapper">
    <div class="hotel">
      <div v-if="hotelDetail" class="hotel-content">
        <div class="hotel-info">
          <div class="hotel-picture">
            <img :src="hotelAlbum[0]">
          </div>
          <div class="hotel-inner">
            <h2 class="hotel-title">
              {{ hotelDetail.hotel_name }}
            </h2>
            <div class="hotel-star">
              <i v-for="(num, key) in 5" :key="key" :class="{ 'on': num <= hotelDetail.star_code }" class="fa fa-star"></i>
            </div>
            <div class="hotel-address">
              {{ hotelDetail.hotel_address }}
            </div>
            <div class="hotel-introduction">
              <h3>酒店简介<span>（以下信息仅供参考，请以实际入住为准）</span></h3>
              <p v-html="hotelDetail.hotel_intro" :class="showMore ? 'autoCont' : 'setHeight'"></p>
              <template>
                 <a href="javascript:;" @click="showMore = true" v-if="!showMore"> 查看更多>></a>
                 <a href="javascript:;"  @click="showMore = false" v-if="showMore"> 收起>></a>
              </template>
            </div>
          </div>
        </div>
        <div class="hotel-album">
          <ul :style="{ width: (hotelAlbum.length * 190) + 'px' }">
            <li v-for="(img, index) in hotelAlbum" :key="index" @click="bigImg(index)">
              <img :src="img">
            </li>
          </ul>
        </div>
      </div>
      <div v-if="$menuPermission('salecenter/hotel')" class="hotel-rooms">
        <div class="system-search">
          <div class="search-item">
            <div class="label">入离时间</div>
            <el-date-picker
              :class="'date-picker'"
              v-model="filter.time"
              type="daterange"
              placeholder="选择日期范围"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="search-item search-button">
            <el-button type="primary" @click="getHolelRoomsAsyncRequestHandler">重新搜索</el-button>
          </div>
        </div>
        <!-- <el-table :data="rooms"
                  style="width: 100%">
          <el-table-column
            label="房型名称"
            header-align="center">
            <template slot-scope="prop">
              <el-popover
                placement="bottom"
                trigger="click">
                <table class="rooms-set-table">
                  <thead>
                    <tr>
                      <th colspan="4">{{ prop.row.room_name }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>房间类型：</th>
                      <td>{{ prop.row.room_name || '暂无该数据' }}</td>
                      <th>床型：</th>
                      <td>{{ prop.row.bed_type || '暂无该数据' }}</td>
                    </tr>
                    <tr>
                      <th>楼层：</th>
                      <td>{{ prop.row.floor || '暂无该数据' }}</td>
                      <th>面积：</th>
                      <td>{{ prop.row.room_area || '暂无该数据' }}</td>
                    </tr>
                    <tr>
                      <th>wifi：</th>
                      <td>{{ prop.row.wifi || '暂无该数据' }}</td>
                      <th>窗户：</th>
                      <td>{{ prop.row.window || '暂无该数据'  }}</td>
                    </tr>
                    <tr>
                      <th>宽带：</th>
                      <td>{{ prop.row.broadnet || '暂无该数据' }}</td>
                      <th>卫浴：</th>
                      <td>{{ prop.row.bath || '暂无该数据' }}</td>
                    </tr>
                    <tr>
                      <th>最大入住人数：</th>
                      <td>{{ prop.row.maxCustomers || '暂无该数据' }}</td>
                      <th>&nbsp;</th>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <span slot="reference">{{ prop.row.room_name }}&nbsp;<i class="fa fa-caret-square-o-down"></i></span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="bed_type"
            label="床型"
            header-align="center"
            align="center">
          </el-table-column>
          <el-table-column
            label="早餐"
            header-align="center"
            align="center">
            <template slot-scope="prop">
              {{ prop.row.date_price[0].breakfast }}
            </template>
          </el-table-column>
          <el-table-column
            label="取消政策"
            header-align="center"
            align="center">
            <template slot-scope="prop">
              {{ prop.row.date_price[0].cancel }}
            </template>
          </el-table-column>
          <el-table-column
            label="结算价"
            header-align="center"
            align="center">
            <template slot-scope="prop">
              <span class="rooms-price">￥{{ prop.row.date_price[0].market_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销售价"
            header-align="center"
            align="center">
            <template slot-scope="prop">
              <span class="rooms-price">￥{{ prop.row.date_price[0].price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            align="center">
            <template slot-scope="prop">
              <router-link :to="{ name: 'DistributionHotelCheckout', params: { hotelId: $route.params.hotelId, roomId: prop.row.room_code }, query: { time: +new Date(filter.time[0]) + '|' + +new Date(filter.time[1]) } }">预订</router-link>
            </template>
          </el-table-column>
        </el-table> -->
        <div class="rooms">
          <div class="rooms-head">
            <div class="rooms-h-name">房型名称</div>
            <div class="rooms-h-combo">价格类型（套餐）</div>
            <div class="rooms-h-type">床型</div>
            <div class="rooms-h-food">早餐</div>
            <div class="rooms-h-cancel">取消政策</div>
            <!-- <div class="rooms-h-peer">同行价</div> -->
            <div class="rooms-h-sale">销售价</div>
            <div class="rooms-h-operate">操作</div>
          </div>
          <template v-if="rooms && rooms.length">
            <div v-for="(room, key) in rooms" :key="key" class="rooms-item">
              <div class="rooms-name">
                <el-popover
                  placement="bottom"
                  trigger="click">
                  <table class="rooms-set-table">
                    <thead>
                      <tr>
                        <th colspan="4">{{ room.room_info.room_name }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>房间类型：</th>
                        <td>
                          <span v-if="room.room_info.room_sys_type == 1">大床房</span>
                          <span v-if="room.room_info.room_sys_type == 2">双床标准间</span>
                          <span v-if="room.room_info.room_sys_type == 3">多人间</span>
                          <span v-if="room.room_info.room_sys_type == 4">套房</span>
                        </td>
                        <th>床型：</th>
                        <td>{{ room.room_info.bed_type || '暂无该数据' }}</td>
                      </tr>
                      <tr>
                        <th>楼层：</th>
                        <td>{{ room.room_info.floor || '暂无该数据' }}</td>
                        <th>面积：</th>
                        <td>{{ room.room_info.room_area || '暂无该数据' }}</td>
                      </tr>
                      <tr>
                        <th>wifi：</th>
                        <td>{{ room.room_info.wifi || '暂无该数据' }}</td>
                        <th>窗户：</th>
                        <td>{{ room.room_info.window || '暂无该数据'  }}</td>
                      </tr>
                      <tr>
                        <th>宽带：</th>
                        <td>{{ room.room_info.broadnet || '暂无该数据' }}</td>
                        <th>卫浴：</th>
                        <td>{{ room.room_info.bath || '暂无该数据' }}</td>
                      </tr>
                      <tr>
                        <th>最大入住人数：</th>
                        <td>{{ room.room_info.maxCustomers || '暂无该数据' }}</td>
                        <th>&nbsp;</th>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <span slot="reference">{{ room.room_info.room_name }}&nbsp;<i class="fa fa-caret-square-o-down"></i></span>
                </el-popover>
              </div>
              <div class="rooms-content">
                <div v-for="(price, keys) in room.price_info" :key="keys" class="rooms-info">
                  <div class="rooms-combo">{{ price.rate_name }}</div>
                  <div class="rooms-type">{{ room.room_info.bed_type }}</div>
                  <div class="rooms-food">{{ price.breakfast }}</div>
                  <div class="rooms-cancel">
                    {{ !price.confirm_type ? "" : (price.confirm_type == 1 ? '立即确认' : '二次确认') }}
                    <template v-if="price.cancel_type">
                      <el-popover
                        placement="bottom"
                        trigger="hover">
                        <div v-html="price.cancel"></div>
                        <p slot="reference"><a href="javascript:;">限时取消</a></p>
                      </el-popover>
                    </template>
                    <template v-else>
                      <p>不可取消</p>
                    </template>
                  </div>
                  <!-- <div class="rooms-peer">￥{{ price.price }}</div> -->
                  <div class="rooms-sale">￥{{ price.sale_price }}</div>
                  <div class="rooms-operate">
                    <!-- <el-button v-if="$menuPermission('salecenter/hotel')" type="primary" @click="$router.push({ name: 'SalecenterHotelCheckout', query: { source: price.source, hotelId: $route.query.hotelId, rateCode: price.rate_code, time: +new Date(filter.time[0]) + '|' + +new Date(filter.time[1]) } })">预订</el-button> -->
                    <el-button v-if="$menuPermission('salecenter/hotel')" type="primary" @click="$router.push({ name: 'SalecenterHotelCheckout', query: { source: price.source, hotelId: price.hotel_code, rateCode: price.rate_code, time: +new Date(filter.time[0]) + '|' + +new Date(filter.time[1]) } })">预订</el-button>

                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="rooms-tips">
              暂无套餐信息
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="mask" v-if="imgShow">
      <div class="closed" @click="close">
        <img src="../../assets/close.png" alt="">
      </div>
      <el-carousel trigger="click" :autoplay='false' :interval='0' :initial-index="index" indicator-position='none'>
        <el-carousel-item v-for="(img, key) in hotelAlbum" :key="key" >
          <img :src="img">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import * as format from "src/utils/format";
import { getDistributionHolelDetailAsyncRequest, getDistributionHolelRoomsAsyncRequest } from 'src/api/hotel';

export default {
  data(){
    return {
      showMore: false,
      hotelId: this.$route.query.hotelId,
      hotelDetail: null,
      hotelAlbum: null,
      rooms: null,
      filter:{
        time: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      imgShow:false,
      index:0,
      
    }
  },
  methods: {
    bigImg(index){
      this.imgShow = true;
      this.index = index
      console.log('dianji');
      
    },
    close(){
      this.imgShow = false;
    },
    getHolelDetailAsyncRequestHandler(){
      let params = {
        data: {
          hotel_code: this.hotelId
        }
      };
      getDistributionHolelDetailAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.hotelDetail = data.hotel_info;
            this.hotelAlbum = data.img_list;
            this.getHolelRoomsAsyncRequestHandler();
          }else{
            this.$message.error(msg);
            this.$router.back();
          }
        },
        showLoading: true
      });
    },
    getHolelRoomsAsyncRequestHandler(){
      let params = {
        data: {
          hotel_code: this.hotelId,
          check_in_date: format.date(this.filter.time[0]),
          check_out_date: format.date(this.filter.time[1])
        }
      }
      getDistributionHolelRoomsAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.rooms = data.price_list;
          }else{
            this.rooms = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      })
    }
  },
  mounted(){
    if(this.$route.query.time){
      this.$set(this.filter.time, 0, format.date(Number(this.$route.query.time.split('|')[0])));
      this.$set(this.filter.time, 1, format.date(Number(this.$route.query.time.split('|')[1])));
    }
    this.getHolelDetailAsyncRequestHandler();
  }
}
</script>
<style scoped lang="less">
  .mask{
    background: rgba(0,0,0,.4);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .closed{
      position: absolute;
      right: 140px;
      top: 140px;
    }
    .el-carousel{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 40%;
      height: 40%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .hotel{
    .hotel-content{
      background-color: #fff;
      margin-bottom: 8px;
      padding: 25px 15px;
      
      .hotel-info{
        display: flex;
        // align-items: center;
        margin-bottom: 15px;
        .hotel-picture{
          width: 320px;
          height: 180px;
          margin-right: 12px;
          margin-top: 5px;
          img{
            height: 100%;
            width: 100%;
          }
        }

        .hotel-inner{
          flex: 1;
          .hotel-title{
            font-size: 16px;
            margin-bottom: 10px;
          }

          .hotel-star{
            font-size: 15px;
            margin-bottom: 10px;

            .fa-star{
              color: #eeeeee;

              &.on{
                color: #ffdd00;
              }
            }
          }

          .hotel-address{
            margin-bottom: 10px;
          }

          .hotel-introduction{
            h3{
              font-weight: 700;
              margin-bottom: 8px;
              span{
                font-weight: 100;
                font-size: 12px;
                color: #cccccc;
              }
            }
            p.setHeight{
              display:-moz-box; 
              display:-webkit-box; 
              display:-o-box; 
              display:box;
              -moz-box-orient:vertical; 
              -webkit-box-orient:vertical; 
              -o-box-orient:vertical; 
              box-orient:vertical; 
              -moz-line-clamp:3;
              -webkit-line-clamp:3;
              -o-line-clamp:3;
              line-clamp:3;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p.autoCont{
              height: auto;
            }
          }
        }
      }

      .hotel-album{
        padding: 10px 5px;
        background-color: #f4f4f4;
        overflow: hidden;
        overflow-x: auto;
        ul{
          &::after{
            content: '';
            display: block;
            clear: both;
          }
          li{
            float: left;
            width: 180px;
            height: 125px;
            display: block;
            margin: 0 5px;

            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .rooms{
      .rooms-head{
        display: flex;
        align-items: center;
        height: 45px;
        background-color: #fafafa;
        color:#999999;
        text-align: center;
        line-height: 45px;
        border-bottom: 2px solid #cccccc;

        .rooms-h-name{
          width: 150px;
        }
        .rooms-h-combo{
          flex: 1 1 165px;
        }
        .rooms-h-type{
          flex: 1 1 110px;
        }
        .rooms-h-food{
          flex: 1 1 90px;
        }
        .rooms-h-cancel{
          flex: 1 1 170px;
        }
        .rooms-h-peer{
          flex: 1 1 115px;
        }
        .rooms-h-sale{
          flex: 1 1 85px;
        }
        .rooms-h-operate{
          flex: 1 1 175px;
        }
      }
      .rooms-item{
        display: flex;
        align-items: stretch;
        background-color: #fff;
        border-bottom: 2px solid #cccccc;

        .rooms-name{
          box-sizing: border-box;
          width: 150px;
          padding: 15px 0;
          line-height: 30px;
          border-right: 1px solid #cccccc;
          text-align: center;
          span{
            cursor: pointer;
          }
          .fa-caret-square-o-down{
            color: #aaaaaa;
            font-size: 16px;
          }
        }
        .rooms-content{
          flex: 1;
          .rooms-info{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #cccccc;
            padding: 15px 0;

            &:last-child{
              border: 0;
            }
            .rooms-combo{
              flex: 1 1 165px;
              line-height: 30px;
              text-align: center;
            }
            .rooms-type{
              flex: 1 1 110px;
              line-height: 30px;
              text-align: center;
            }
            .rooms-food{
              flex: 1 1 90px;
              line-height: 30px;
              text-align: center;
            }
            .rooms-cancel{
              flex: 1 1 170px;
              text-align: center;
            }
            .rooms-peer{
              flex: 1 1 115px;
              line-height: 30px;
              text-align: center;
              text-align: center;
              color: #ff6600;
            }
            .rooms-sale{
              flex: 1 1 85px;
              line-height: 30px;
              text-align: center;
              color: #ff6600;
            }
            .rooms-operate{
              flex: 1 1 175px;
              line-height: 30px;
              text-align: center;
            }
          }
        }
      }
    }
  }
.rooms-set-table{
  thead{
    th{
      padding: 4px;
      background-color: #f4f4f4;
    }
  }
  tbody{
    th,td{
      padding: 4px;
    }
    td{
      padding-right: 15px;
    }
    th{
      text-align: right;
    }
  }
}
.rooms-price{
  color: #ff6600;
}
.rooms-tips{
  padding: 15px;
  text-align: center;
  background-color: #fff;
}
.date-picker{
  width: 200px !important;
}
</style>
  

