<template>
  <div class="bill-wrap">
    <div class="bill-table-tit">
      基本信息
      <el-button class="right-btn" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="bill-table-wrap">
      <el-table :data="adjustment" border style="width: 100%">
        <el-table-column
          align="center"
          prop="tuan_no"
          label="团号"
          width="150">
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row.tuan_no">
              {{ scope.row.tuan_no }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="item_no"
          header-align="center"
          align="left"
          label="申请单编号"
          width="150"/>
        <el-table-column
          prop="op_name"
          align="center"
          label="申请人"
          width="200">
          <template slot-scope="scope">
            <div class="ellipsis tc" :title="scope.row.op_name">
              {{ scope.row.op_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="org_name"
          align="center"
          label="部门">
          <template slot-scope="scope">
            <div class="ellipsis tc" :title="scope.row.org_name">
              {{ scope.row.org_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="apply_time"
          align="center"
          label="创建时间"
          width="150"/>
      </el-table>
    </div>
    <div class="bill-table-tit">申请内容</div>
    <div class="bill-table-wrap">
      <div class="billinner-table-wrap">
        <el-table
          :data="adjustment_detail"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            label="调整项目"
            width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.bill_type === 1? '收入' : '成本' }}{{ scope.row.bill_style === 1 ? '调账' : '新增' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="bill_id"
            align="center"
            label="ID"
            width="80">
            <template slot-scope="scope">
              <div>
                {{ scope.row.bill_id }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="op_name"
            align="center"
            label="客户／供应商名称"
            width="200">
            <template slot-scope="scope">
              <div class="ellipsis tc" :title="scope.row.org_name">
                {{ scope.row.org_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="front_amount"
            align="center"
            label="调整前金额"
            width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.front_amount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="back_amount"
            align="center"
            label="调账后金额"
            width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.back_amount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            label="调整金额"
            width="100">
            <template slot-scope="scope">
              {{ scope.row.amount }}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            prop="reason"
            align="left"
            label="备注／调整原因">
            <template slot-scope="scope">
              <div>{{ scope.row.reason }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-table
        :data="adjustment"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="tuan_no"
          label="团号">
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row.tuan_no">
              {{ scope.row.tuan_no }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="front_profit"
          align="center"
          label="调整前毛利"/>
        <el-table-column
          prop="back_profit"
          align="center"
          label="调账后毛利"/>
        <el-table-column
          prop="profit"
          align="center"
          label="调整毛利"/>
      </el-table>
    </div>
    <!-- <div class="bill-table-tit">
      审批记录
    </div>
    <div class="bill-table-wrap">
      <el-table
        :data="adjustment_verify"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="create_time"
          label="时间"/>
        <el-table-column
          prop="op_type"
          align="center"
          label="操作内容"/>
        <el-table-column
          prop="op_name"
          align="center"
          label="操作人">
          <template slot-scope="scope">
            <div class="ellipsis tc">
              {{ scope.row.op_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          align="center"
          label="备注">
          <template slot-scope="scope">
            {{ scope.row.remark ? scope.row.remark : '--' }}
          </template>
        </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>
<script>
import {financeAdjustmentDetail} from 'src/api/finance'
import {adjustmentDetail} from 'src/api/tuan'

export default {
  data () {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      adjustment: [],
      adjustment_detail: [],
      adjustment_verify: [],
      status: '',
      remark: '',
      verifyType: false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail () {
      let params = {
        data: {
          adjustment_id: this.id
        }
      };
      let getDetail = adjustmentDetail;
      if (this.$route.meta.topMenuConst === 'finance') {
        getDetail = financeAdjustmentDetail
      };
      getDetail({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.adjustment = [];
            this.adjustment.push(result.data.adjustment);
            this.adjustment_detail = result.data.adjustment_detail;
            this.adjustment_verify = result.data.adjustment_verify;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          };
        },
        showLoading: true
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .bill-wrap {
    background-color: #fff;
    padding: 15px;
    .bill-table-wrap {
      .tc {
        text-align: center;
      }
    }
    .bill-table-tit {
      border-left: 5px solid #b10c79;
      margin: 20px 0 20px;
      padding: 0px 0 0px 15px;
      color: #b10c79;
      font-size: 20px;
    }
    .bill-form-wrap {
      margin-bottom: 15px;
      padding: 15px 15px 15px 0px;
      border-left: 1px solid #bfcbd9;
      border-right: 1px solid #bfcbd9;
      border-bottom: 1px solid #bfcbd9;
    }
    .right-btn {
      float: right;
      width: 120px;
      padding: 0 10px;
      margin: 0 0 0 10px;
    }
    .billinner-table-wrap {
      overflow: hidden;
      margin-bottom: -3px;
    }
  }
</style>
