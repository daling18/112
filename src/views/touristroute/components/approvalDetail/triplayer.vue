<template>
  <el-dialog :visible.sync="visible" custom-class="approval-trip-layer" title="行程查看" center>
    <div class="approval-detail appoval-travel-detail" v-if="travelData">
      <!-- <el-menu default-active="1" class="el-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">行程介绍</el-menu-item>
        <el-menu-item index="2">行程特色</el-menu-item>
        <el-menu-item index="3">费用信息</el-menu-item>
        <el-menu-item index="4">签证信息</el-menu-item>
        <el-menu-item index="5">预定须知</el-menu-item>
        <el-menu-item index="6">安全说明</el-menu-item>
        <el-menu-item index="7">温馨提示</el-menu-item>
      </el-menu>-->
      <div class="blcok">
        <h4 class="block-title">行程介绍</h4>
        <div class="blcok-content">
          <p class="product-name"></p>
          <p class="assemble-time">集合时间：{{travelData.assemble.assemble_time}}</p>
          <p class="assemble-location">结合地点：{{travelData.assemble.location}}</p>
          <ul class="schedule">
            <li v-for="travel in travelData.trip_list" :key="travel.id">
              <p class="traffic-info">交通：{{travel.traffic}}</p>
              <h5 class="schedule-title">
                <span class="day-name">{{travel.day_name}}</span>
                {{travel.title}}
              </h5>
              <el-steps class="playbill" direction="vertical" :active="4">
                <el-step type="primary" size="large" title="用餐">
                  <span class="icon diet" slot="icon"></span>
                  <h6 class="play-name" slot="title">用餐</h6>
                  <div class="play-content" slot="description">
                    <template v-for="item in travel.diet">
                      <span :key="item.type">
                        {{item.type_name}}
                        {{item.content}}
                      </span>
                    </template>
                  </div>
                </el-step>
                <el-step icon type="primary" size="large" title="酒店">
                  <span class="icon hotel" slot="icon"></span>
                  <h6 class="play-name" slot="title">酒店</h6>
                  <div class="play-content">{{travel.hotel_name}}</div>
                </el-step>
                <el-step icon type="primary" size="large" title="交通">
                  <span class="icon traffic" slot="icon"></span>
                  <h6 class="play-name" slot="title">交通</h6>
                  <div class="play-content">{{travel.traffic}}</div>
                </el-step>
                <el-step icon type="primary" size="large" title="行程说明">
                  <span class="icon explain" slot="icon"></span>
                  <h6 class="play-name" slot="title">行程说明</h6>
                  <div class="play-content">{{travel.desc}}</div>
                </el-step>
              </el-steps>
            </li>
          </ul>
        </div>
      </div>
      <template v-if="informationData">
        <!-- <div class="block">
          <h4 class="block-title">行程特色</h4>
          <div class="block-content">{{informationData.trip_spec.content}}</div>
        </div> -->
        <div class="block">
          <h4 class="block-title">费用包含</h4>
          <div class="block-content">
            <el-table :data="informationData.fee.include" border :show-header="false">
              <el-table-column prop="type_name" width="100"></el-table-column>
              <el-table-column prop="fee_desc"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="block">
          <h4 class="block-title">费用不包含</h4>
          <div class="block-content">
            <el-table :data="informationData.fee.exclude" border :show-header="false">
              <el-table-column prop="type_name" width="100"></el-table-column>
              <el-table-column prop="fee_desc"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="block">
          <h4 class="block-title">签证信息</h4>
          <div class="block-content">{{informationData.visa.content}}</div>
        </div>
        <div class="block">
          <h4 class="block-title">预定须知</h4>
          <div class="block-content">{{informationData.book.content}}</div>
        </div>
        <div class="block">
          <h4 class="block-title">安全说明</h4>
          <div class="block-content">{{informationData.security.content}}</div>
        </div>
        <div class="block">
          <h4 class="block-title">温馨提示</h4>
          <div class="block-content">{{informationData.notice.content}}</div>
        </div>
      </template>
    </div>
    <div slot="footer" class="footer">
      <el-button type="primary" @click="visible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  lineOrderSaleTripInfo,
  lineOrderSaleMiscInfo
} from "src/api/touristroute";
export default {
  props: {
    productId: String
  },
  filters: {},
  data() {
    return {
      visible: false,
      travelData: null,
      informationData: null
    };
  },
  watch: {
    productId() {
      this.getTravelData();
      this.getMiscInfo();
    }
  },
  created() {},
  methods: {
    // 行程数据
    async getTravelData() {
      let { code, data, msg } = await lineOrderSaleTripInfo({
        id: this.productId
      });
      if (code != 0) {
        this.$message.error(msg || "");
        return;
      }
      this.travelData = data;
    },
    // 说明信息
    async getMiscInfo() {
      let { code, data, msg } = await lineOrderSaleMiscInfo({
        id: this.productId
      });
      if (code !== 0) {
        this.$message.error(msg);
        return;
      }
      this.informationData = data;
    },
    show() {
      this.visible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
/deep/.approval-trip-layer {
  min-width: 960px;
  color: #000;

  overflow-y: scroll;
}
.appoval-travel-detail {
  // height: 500px;
  // overflow-y: scroll;
  // display: flex;
  // flex-direction: column;
}
/deep/.el-step {
  min-height: 80px;
  .el-step__main {
    margin-left: 20px;
  }
  .el-step__line {
    background: $themeColor;
  }
  .el-step__icon {
    border: none;
  }
  .play-name,.play-content {
    color: #000;
    font-size: 14px;
    font-weight: 400;
  }
}
/deep/.el-table td:first-child {
  background: #f6f6f6;
}
/deep/.el-dialog__footer {
  padding: 10px 0;
}
.icon {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  &.diet {
    background-image: url("~src/assets/icons/icon_eat.png");
  }
  &.hotel {
    background-image: url("~src/assets/icons/icon_hotel.png");
  }
  &.traffic {
    background-image: url("~src/assets/icons/icon_bus.png");
  }
  &.explain {
    background-image: url("~src/assets/icons/icon_desc.png");
  }
}
.el-menu {
  margin-bottom: 20px;
}
.block {
  margin-bottom: 20px;
  &-title {
    font-size: 18px;
    line-height: 30px;
    margin-bottom: 20px;
    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      background: $themeColor;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}

.assemble-time,
.assemble-location,
.traffic-info {
  margin-bottom: 10px;
}
.schedule-title {
  margin-bottom: 20px;
  font-size: 16px;
  .day-name {
    color: $themeColor;
  }
}
</style>