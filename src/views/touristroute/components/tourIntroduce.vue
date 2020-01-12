<template>
  <div class="tour-progress">
    <el-tabs v-model="activeName" class="tabsMod">
      <el-tab-pane label="行程介绍" name="first">
        <el-tabs :tab-position="tabPosition" class="chooseDate">
          <el-tab-pane
            v-for="(item,idx) in tripInfo.trip_list"
            :key="idx"
            :label="item.day_name"
            class="choose"
          >
            <ul class="ulList">
              <li class="assemble">
                <p>集合时间:{{tripInfo.assemble.assemble_time}}</p>
                <p>集合地点:{{tripInfo.assemble.location}}</p>
              </li>
              <li style="margin:20px 0">
                <h3>
                  <span style="color:rgba(179, 35, 139, 1)">{{item.day_name}}</span>
                  <span>{{item.title}}</span>
                </h3>
              </li>
              <li class="int">
                <div class="tourPrice">
                  <el-steps direction="vertical" :active="1" class="progress">
                    <el-step title="用餐">
                      <i class="iconImg iconOne" slot="icon"></i>
                      <template slot="description">
                        <div v-for="(k,i) in item.diet" :key="i">{{k.type_name+""+k.content}}</div>
                      </template>
                    </el-step>
                    <el-step title="酒店" :description="item.hotel_name">
                      <i class="iconImg iconTwo" slot="icon"></i>
                    </el-step>
                    <el-step title="交通" :description="item.traffic">
                      <i class="iconImg iconThree" slot="icon"></i>
                    </el-step>
                    <el-step title="行程说明" :description="item.des">
                      <i class="iconImg iconFour" slot="icon"></i>
                    </el-step>
                  </el-steps>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="行程特色" name="second" v-if="tourInfo.trip_spec.content!=''">
        <div>{{tourInfo.trip_spec.content}}</div>
      </el-tab-pane>
      <el-tab-pane label="费用信息" name="third">
        <div>
          <h3 class="priInclud">费用包含</h3>
          <el-table
            :data="tourInfo.fee.include"
            border
            :show-header="false"
            style="width: 80%"
            class="feeTable"
          >
            <el-table-column width="200px" align="center">
              <template slot-scope="scope">{{scope.row.fee_type_name}}</template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">{{scope.row.fee_desc}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <h3 class="priInclud">费用不包含</h3>
          <el-table
            :data="tourInfo.fee.include"
            border
            :show-header="false"
            style="width: 80%"
            class="feeTable"
          >
            <el-table-column width="200px" align="center">
              <template slot-scope="scope">{{scope.row.fee_type_name}}</template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">{{scope.row.fee_desc}}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="签证信息" name="fourth" v-if="num!= 0">
        <div v-for="(item,idx) in tourInfo.visa" :key="idx">
          <p v-if="item.attachment_url!==''">
            <a :href="item.attachment_url">下载签证信息</a>
          </p>
        </div>
        <el-table :data="tourInfo.visa" border width="80%" v-if="num!= 0">
          <el-table-column label="身份类型" align="center" width="250px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.id_desc"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="需要提交材料" align="center">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="scope.row.file_data" placeholder="请详细说明签证信息"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="详细说明" align="center">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="scope.row.file_data_desc" placeholder="请详细说明签证信息"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="预定须知" name="fifth" v-if="tourInfo.book.content!=''">
        <div>{{tourInfo.book.content}}</div>
      </el-tab-pane>
      <el-tab-pane label="安全说明" name="sixth" v-if="tourInfo.security.content!=''">
        <div>{{tourInfo.security.content}}</div>
      </el-tab-pane>
      <el-tab-pane label="温馨提示" name="seventh" v-if="tourInfo.notice.content!=''">
        <div>{{tourInfo.notice.content}}</div>
      </el-tab-pane>
    </el-tabs>
    <div></div>
  </div>
</template>
<script>
import {
  lineOrderSaleTripInfo,
  lineOrderSaleMiscInfo
} from "src/api/touristroute";
export default {
  props: ["line_id"],
  data() {
    return {
      activeName: "first", //上方tabs
      tabPosition: "left", //左侧tabs
      tripInfo: {
        //行程介绍
        assemble: {},
        trip_list: []
      },
      tourInfo: {
        fee: {
          //费用信息
          include: [],
          exclude: []
        },
        trip_spec: {}, //行程特色
        fee: {
          //费用信息
        },
        book: {}, //预定须知
        security: {}, //安全说明
        notice: {}, //温馨提示
        visa: [] //签证信息
      },
      num: ""
    };
  },
  methods: {
    getTourData() {
      let params = {
        id: this.line_id
      };
      //行程介绍
      lineOrderSaleTripInfo(params).then(res => {
        const { code, msg, data } = res;
        if (code == 0) {
          this.tripInfo = data;
          console.log("行程介绍tripInfo", this.tripInfo);
        } else {
          this.$message.error(msg);
        }
      });
      //行程特色
      lineOrderSaleMiscInfo(params).then(res => {
        const { code, msg, data } = res;
        if (code == 0) {
          this.tourInfo = data;
          if (this.tourInfo.visa.length) {
            this.num = this.tourInfo.visa.length;
          }
          console.log("行程特色tourInfo", this.tourInfo);
        } else {
          this.$message.error(msg);
        }
      });
    }
  },
  mounted() {
    this.getTourData();
  }
};
</script>
<style lang="scss" scoped>
.chooseDate {
  .el-tabs__item.is-active {
    background: #b10c79;
    color: white;
    border-radius: 10px 0px 0px 10px;
  }
}
.priInclud {
  // border-left: solid 3px rgba(179, 35, 139, 1);
  padding-left: 10px;
  margin: 13px 0;
}
</style>