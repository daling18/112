<template>
  <div class="wrapper">
    <div class="hotel-content" v-if="scenicDetail && scenicDetail.scenic_info">
    <div class="hotel-info">
      <div class="hotel-picture">
        <img :src="scenicDetail.scenic_info.img_list[0]">
      </div>
      <div class="hotel-inner">
        <h2 class="hotel-title">
          {{ scenicDetail.scenic_info.title }}
        </h2>
        <div class="hotel-star">
          {{scenicDetail.scenic_info.grade}}
        </div>
        <div class="hotel-address">
          {{ scenicDetail.scenic_info.brief }}
        </div>
        <div class="hotel-address">
          【{{ scenicDetail.scenic_info.city_info.province_name + 
          scenicDetail.scenic_info.city_info.area_name }}】{{ scenicDetail.scenic_info.address }}
        </div>
        <div class="hotel-address">
          营业时间：{{ scenicDetail.scenic_info.runtime }}
        </div>
        <div class="hotel-address">
          联系电话：{{ scenicDetail.scenic_info.tel }}
        </div>

        <!-- <div class="hotel-introduction">
          <h3>酒店简介<span>（以下信息仅供参考，请以实际入住为准）</span></h3>
          <p>
            {{ scenicDetail.scenic_info.introduce }}
          </p>
        </div> -->
      </div>
    </div>
    <div class="hotel-album">
      <ul :style="{ width: (scenicDetail.scenic_info.img_list.length * 190) + 'px' }">
        <li v-for="(img, key) in scenicDetail.scenic_info.img_list" :key="key">
          <img :src="img">
        </li>
      </ul>
    </div>
  </div>

  <div class="intro-detail-module"  v-if="scenicDetail && scenicDetail.scenic_info">
    <div class="system-tab">
    <ul class="tab-box">
      <template>
        <li tag="li" class="on" @click="scrollTopAnchorPoint('md-ticket')">
          门票预订
        </li>
        <li tag="li" @click="scrollTopAnchorPoint('md-notice')">
          预订须知
        </li>
        <li tag="li" @click="scrollTopAnchorPoint('md-introduce')">
          景区介绍
        </li>
        <li tag="li" @click="scrollTopAnchorPoint('md-traffic')">
          景区交通
        </li>
      </template>
    </ul>
    </div>
    <div class="system-search" id="md-ticket">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">门票类型</div>
          <el-radio-group v-model="ticket_type_filter" style="padding-top:8px;" @change="ticketFilterTypeFn(ticket_type_filter)">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">成人票</el-radio>
            <el-radio :label="2">儿童票</el-radio>
            <el-radio :label="3">学生票</el-radio>
            <el-radio :label="4">老人票</el-radio>
            <el-radio :label="5">亲子票（1大1小）</el-radio>
            <el-radio :label="6">家庭票（2大1小）</el-radio>
            <el-radio :label="7">家庭票（2大2小）</el-radio>
            <el-radio :label="8">双人票</el-radio>
            <el-radio :label="9">团队票</el-radio>
            <el-radio :label="10">优惠票</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

    <div class="rooms">
      <div class="rooms-head">
        <div class="rooms-h-name"></div>
        <div class="rooms-h-combo">门票名称</div>
        <div class="rooms-h-type">挂牌价</div>
        <div class="rooms-h-peer">零售价</div>
        <!-- <div class="rooms-h-sale">结算价</div> -->
        <div class="rooms-h-operate">操作</div>
      </div>
      <template v-if="ticket_info && ticket_info.length">
      <div v-for="(ticket, key) in filterTicket" :key="key" class="rooms-item">
        <div class="rooms-name" @click="selectTicketRow(ticket)">
          {{ticket.name}} <i class="fa fa-caret-square-o-down"></i>
        </div>
        <div class="rooms-content">
          <div v-for="(price, keys) in ticket.quote_type_list" :key="keys" class="rooms-info">
            <div class="rooms-combo">
              <el-popover
                placement="bottom"
                width="400"
                trigger="click">
                <span slot="reference">{{price.quote_name}}</span>
                <div class="detail-section">
                  <div class="detail-tit">预订须知</div>
                  <!-- <div class="detail-item">
                    <div class="detail-lab">使用有效期：</div>
                    <div class="detail-con">
                      <span v-if="price.use_type == 0">游玩日期起有效</span>
                      <span v-if="price.use_type == 1">下单日期起有效</span>
                      <span v-if="price.use_type == 2">{{price.start_date}}至{{price.end_date}}</span>
                    </div>
                  </div> -->
                  <div class="detail-item">
                    <div class="detail-lab">预订限制：</div>
                    <div class="detail-con">
                      <span v-if="price.advance_days == 0 && !price.advance_time">出行当天可购买</span>
                      <span v-if="price.advance_days > 0  && !price.advance_time">最晚需在【出行{{price.advance_days}}天】前购买</span>
                      <span v-if="(!price.advance_days || price.advance_days==0) && price.advance_time">最晚需在【出行当天{{price.advance_time}}】前购买</span>
                      <span v-if="price.advance_days > 0 && price.advance_time">最晚需在【出行{{price.advance_days}}天{{price.advance_time}}】前购买</span>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-lab">取票信息：</div>
                    <div class="detail-con">{{price.get_ticket}}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-lab">退票规则：</div>
                    <div class="detail-con">
                      <!-- <div v-if="price.refund_rule == 0">
                        <span v-if="price.refund_type == 0">游玩日期内可退，退票扣门票价格的{{price.refund_fee}}%</span>
                        <span v-if="price.refund_type == 1">游玩日期内可退，退票扣{{price.refund_fee}}元</span>
                      </div>
                      <div v-if="price.refund_rule == 1">
                        <span v-if="price.refund_type == 0">游玩日期前可退，退票扣门票价格的{{price.refund_fee}}%</span>
                        <span v-if="price.refund_type == 1">游玩日期前可退，退票扣{{price.refund_fee}}元</span>
                      </div>
                      <div v-if="price.refund_rule == 2">不可退</div> -->
                      <div class="popover-table">
                          <table>
                            <tr>
                              <th>退票规则</th>
                              <td>{{ price.refund_rule.refund_rule }}</td>
                            </tr>
                            <tr>
                              <th>是否需要审核</th>
                              <td>{{ price.refund_rule.refund_audit }}</td>
                            </tr>
                            <tr>
                              <th>退票手续费</th>
                              <td>
                                {{ price.refund_rule.refund_rule == '不可退' ? 0 : price.refund_rule.refund_fee }}
                              </td>
                            </tr>
                            <tr v-if="price.refund_rule.refund_rule != '不可退'">
                              <th>阶梯退票</th>
                              <td>
                                <p v-for="(item,idx) in price.refund_rule.refund_cost" :key="idx">
                                  {{item}}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </div>
                    </div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-lab">购买须知：</div>
                    <div class="detail-con" v-html="price.notice"></div>
                  </div>
                </div>  
              </el-popover>
            </div>
            <div class="rooms-type">￥{{ price.shop_price }}</div>
            <div class="rooms-peer">￥{{ price.sale_price }}</div>
            <!-- <div class="rooms-sale">￥{{ price.settlement_price }}</div> -->
            <div class="rooms-operate">
              <a href="javascript:;" @click="$router.push({path:'/distribution/ticket-checkout',query:{quote_type_id: price.id}})">预订</a>
            </div>
          </div>
        </div>
      </div>
      <p class="see-more" v-if="ticket_info.length > 2">
        <span v-if="maxShowNum == 2" @click="filterTicketItemMore">查看更多报价 <i class="el-icon-arrow-down"></i></span>
        <span v-if="maxShowNum > 2" @click="maxShowNum = 2">收起报价 <i class="el-icon-arrow-up"></i></span>
      </p>
      </template>
      <template v-else>
        <div class="rooms-item" style="display:block;">
          <div class="warm-tip">
            <p>没有符合条件的门票信息 :)</p>
          </div>
        </div>
      </template>
    </div>

    

    <div class="intro-legend-module" id="md-notice">
      <div class="title">预订须知</div>
      {{scenicDetail.scenic_info.notice}}
    </div>
    <div class="intro-legend-module" id="md-introduce">
      <div class="title">景区介绍</div>
      <div v-html="scenicDetail.scenic_info.introduce"></div>
    </div>
    <div class="intro-legend-module" id="md-traffic">
      <div class="title">景区交通</div>
      {{scenicDetail.scenic_info.traffic_guide}}
    </div>
  </div>



<!-- dialog对话框 -->
<el-dialog
  title="门票详情"
  :visible.sync="dialogVisible"
  size="tiny">

  <div class="detail-section" v-if="ticketRowData && scenicDetail && scenicDetail.scenic_info">
    <div class="detail-item">
      <div class="detail-lab">景区名称</div>
      <div class="detail-con">{{scenicDetail.scenic_info.title}}</div>
    </div>
    <div class="detail-item">
      <div class="detail-lab">门票名称</div>
      <div class="detail-con">{{ticketRowData.name}}</div>
    </div>
    <div class="detail-item">
      <div class="detail-lab">门票类型</div>
      <div class="detail-con">{{ticketRowData.type_text}}</div>
    </div>
    <div class="detail-item">
      <div class="detail-lab">门票介绍</div>
      <div class="detail-con">{{ticketRowData.introduce}}</div>
    </div>
  </div>  

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import {getScenicDetails } from 'src/api/ticket';

export default ({
  data() {
    return {
      scenicDetail:null,
      ticketRowData:null,
      ticket_info:null,
      ticket_type_filter:0,
      dialogVisible:false,
      maxShowNum:2,
      pagination:{
        total_count: 0,
        total_page: 1,
        page_index: 1,
        page_size: 10,
      }
    };
  },
  computed:{
    filterTicket(){
      let ticket_info = this.ticket_info;
      return ticket_info.filter((item,idx) => {
        return idx < this.maxShowNum
      })
    }
  },
  methods: {
    ticketDetailsInfo() {
      let para = {};
      para.data = {};
      para.data.scenic_id = this.$route.query.id;
      para.data.page_index = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;

      getScenicDetails({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (code == '0') {
            this.$set(this,'scenicDetail',data);
            this.$set(this,'ticket_info',data.ticket_info);
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
    selectTicketRow(row){
      this.$set(this,'dialogVisible',true);
      this.$set(this,'ticketRowData',row);
    },
    ticketFilterTypeFn(type){
      let ticket_info = this.scenicDetail.ticket_info;
      if(type != 0){
        let filterTicket = ticket_info.filter(i => {
          return i.type == type
        })
        this.$set(this,'ticket_info',filterTicket);
      }else{
        this.$set(this,'ticket_info',ticket_info);
      }
    },
    scrollTopAnchorPoint(id){
      let isAnchorPoint = document.getElementById(id);
      let judge = isAnchorPoint.offsetTop - document.documentElement.scrollTop;
      window.scrollTo(0,judge);
    },
    // 查看更多报价
    filterTicketItemMore(){
      let ticket_info = this.ticket_info,
          len = ticket_info.length;

      this.maxShowNum = len;
    }
  },
  mounted() {
    this.ticketDetailsInfo();
  },
});
</script>

<style scoped lang="scss">

    .hotel-content{
      background-color: #fff;
      margin-bottom: 8px;
      padding: 25px 15px;
      
      .hotel-info{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .hotel-picture{
          width: 320px;
          height: 180px;
          margin-right: 12px;

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
            p{
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
            .rooms-type{
              flex: 1 1 115px;
              line-height: 30px;
              text-align: center;
              text-align: center;
              color: #ff6600;
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


.intro-detail-module{
  .el-radio{
    margin-left: 0;
    margin:0 15px 10px 0;
  }
  background: #fff;
  .intro-legend-module{
    padding:20px;
    .title{
      padding: 0 0 10px;
      font-weight: 700;
      font-size: 14px;
      color: #444;
    }
  }
  
}

.detail-section{
  padding: 0;
  .detail-tit{
    margin: 5px 0;
    color: #333;
    font-weight: 700;
    font-size: 12px;
  }
  .detail-item{
    display: flex;
    align-items: flex-start;
    line-height: 1.8;
    .detail-lab{
      width: 75px;
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
          padding-left: 10px;
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
.warm-tip {
  background: #fff;
  padding: 70px 0 130px;
  p {
    text-align: center;
    padding-top: 85px;
    color: #5e7382;
    background: url('../../assets/icons/empty_data.png') no-repeat center top;
    background-size: 80px 60px;
  }
}
.see-more{
  text-align: center;
  padding: 8px 0;
  color: #999;
  font-size: 14px;
  border-bottom: 2px solid #ccc;
  cursor: pointer;
}
.popover-text{
  color: #0066FF;
  cursor: pointer;
}
.popover-table{
  padding: 10px 0;
  table{
    width: 100%;
  }
  th,td{
    border:1px solid #ddd;
    padding: 10px 8px;
    text-align: left;
    font-weight: 400；
  }
  th{
    width: 100px;
    background-color: #f4f4f4;
  }
}
</style>
