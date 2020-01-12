<template>
  <!-- 已不使用页面  by qzhchen 20181011 -->
  <div class="wrapper">
    <div class="system-content">
      <div class="table-title no-border">
        <div class="title">
          <span class="color-orange">【XM-JDCOM-170528-GD310】</span>【跟团游】东京不热——夏季双飞八日清爽之旅夏季双飞八日清爽之旅夏季双飞八日清</div>
        <table class="desc">
          <tr>
            <th>出发城市</th>
            <td>北京</td>
            <th>出发日期</th>
            <td>2012-12-12</td>
          </tr>
          <tr>
            <th>行程天数</th>
            <td>12</td>
            <th>返回日期</th>
            <td>2012-12-12</td>
          </tr>
          <tr>
            <th>总收客</th>
            <td colspan="3">成人 28 儿童 2 导游 1</td>
          </tr>
        </table>
        <div class="btn-areas">
          <el-button type="primary" @click="goto()">查看行程</el-button>
          <el-button @click="goto()">打印行程</el-button>
        </div>

      </div>
      <div class="content-title-extend">
        <table class="total">
          <tr>
            <td colspan="3" class="border-right">
              <div class="ceil">预估收入&ensp;
                <span class="color-orange">1212</span>&ensp;元</div>
            </td>
            <td colspan="3" style="padding:20px;">
              <div class="ceil">预估成本&ensp;
                <span class="color-green">1212</span>&ensp;元</div>
            </td>
            <!-- <td><el-button type="text">查看成本结算单列表</el-button></td> -->
          </tr>
          <tr>
            <td colspan="2" class="border-right">
              <div class="ceil">单团毛利&ensp;
                <span class="common">1212&ensp;元</span>
              </div>
            </td>
            <td colspan="2" class="border-right">
              <div class="ceil">人均毛利&ensp;
                <span class="common">1212&ensp;元</span>
              </div>
            </td>
            <td colspan="2">
              <div class="ceil">毛利率&ensp;
                <span class="common">1212&ensp;元</span>
              </div>
            </td>
            <!-- <td><el-button type="text">查看成本结算单列表</el-button></td> -->
          </tr>
        </table>
      </div>
      <div class="mod-form">
        <div class="title">收入明细
          <span class="desc">&ensp;应收总金额：
            <span class="color-orange">￥121212</span>
          </span>
        </div>
        <div class="table-box">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="pay_date" label="序号" align="center" width="250">
            </el-table-column>
            <el-table-column prop="pay_way" label="结算方" align="center">
            </el-table-column>
            <el-table-column prop="pay_account" label="应付金额" align="right">
            </el-table-column>
            <el-table-column prop="pay_man" label="已收金额" align="right">
            </el-table-column>
            <el-table-column prop="recieve_account_name" label="订单编号" align="left">
            </el-table-column>
            <el-table-column prop="recieve_account_bank" label="订单明细" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="title">成本明细
          <span class="desc">&ensp;应付总金额：
            <span class="color-orange">￥121212</span>
          </span>
        </div>
        <div class="table-box">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="pay_date" label="团号／应付款编号／项目类型名称" align="left" width="250">
            </el-table-column>
            <el-table-column prop="pay_way" label="应付金额／结算币种" align="right">
            </el-table-column>
            <el-table-column prop="pay_account" label="应付金额（本位币）" align="right">
            </el-table-column>
            <el-table-column prop="pay_man" label="已付金额（本位币）" align="right">
            </el-table-column>
            <el-table-column prop="recieve_account_name" label="本次实付金额（本位币）" align="right">
            </el-table-column>
            <el-table-column prop="recieve_account_bank" label="付款币种／金额" align="right">
            </el-table-column>
            <el-table-column prop="recieve_account_no" label="汇率" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="goto('/erp/finace/pay-record',{id:scope.id})">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        exchange: '',
        way: '',
        date: '',
        currency: '',
        total: '',
        department: '',
        people: '',
        pay_account: '',
        recive_account_name: '',
        recive_account_no: '',
        recive_account_bank: '',
        file: '',
        total_mount: ''
      },
      rules: {
        exchange: [
          { required: true, message: '请输入汇率', trigger: 'blur' }
        ],
        way: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        currency: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        total: [
          { required: true, message: '请输入总付款金额', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择所在部门', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请选择付款人', trigger: 'change' }
        ]
      },
      tableData: [
        {
          pay_date: "2012-12-12",
          pay_way: "现金",
          pay_account: "12122323232434343434",
          pay_man: "李嘉诚",
          recieve_account_name: "李伟",
          recieve_account_bank: "中国银行",
          recieve_account_no: "12122323232434343434",
          id: 1212
        }],
      dialogTableVisible: false,
      gridData: [{
        tuan_no: '121232311423',
        cost_item: '12.00',
        id: '122'
      }],
      form: {
        tuan_no: '',
        cost_no: ''
      },
      formLabelWidth: '120px',
      usa_checked: false,
      checked: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
           console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="scss">
.record-title {
  display: block;
  margin: 20px;
  text-align: left;
  font-size: 14px;
  font-size: 18px;

  th {
    color: #777;
    font-weight: 400;
    text-align: left;
  }
  td {
    padding-right: 20px;
    text-align: left;
    color: #555;
  }
}

.estimate {
  width: 100%;
  text-align: center; //border-collapse:separate;
  td {
    border: 1px solid #eee;
  }
}

.form {
  .title {
    padding-left: 14px;
    margin: 0 0 20px 20px;
    border-left: 2px solid purple;
  }
  .table-box {
    margin: 20px;
  }
  .btn-areas {
    margin-left: 20px;
  }
}
</style>
