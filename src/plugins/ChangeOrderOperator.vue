<template>
  <el-dialog
    title="修改订单责任人"
    :visible.sync="dialogVisable"
    @close="handleCloseDialog"
    size="tiny">
    <el-form :model="opForm" :rules="rules" label-width="100px" ref="opForm" style="width: 300px">
      <el-form-item label="订单负责人" prop="op_id">
        <el-select 
          v-model="opForm.op_id"
          filterable
          placeholder="请输入订单负责人名称"
          @change="handleSelectedOperator">
          <el-option 
            v-for="(op, key) in opList"
            :key="key"
            :value="op.op_id"
            :label="op.op_name">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseDialog">取 消</el-button>
      <el-button type="primary" @click="handleSubmitChangeOrderOperator">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
/**
 * 订单操作人选择
 * 
 * 支持attr参数：
 * orderType | string,number | 订单类型：1：机票 2：酒店 3：门票 4：火车票 6: 农特优 7：签证
 * change-success  | function  | 指派负责人成功后的回调函数
 * 
 * 对外暴露方法
 * 
 * changeOrderOperator(orderId[, opId])
 * 
 * demo:
 *  <change-order-operator ref="operator" :order-type="3" @change-success="callback"/>
 * 
 * js:
 * this.$refs.operator.changeOrderOperator(order_id, op_id);
 * 
 * 
 */
import { getChangeOrderOperatorList, setOrderOperator } from  'src/api/api'
export default {
  name: 'ChangeOrderOperator',
  props: {
    orderType: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      opForm:{
        order_id: null,
        op_name: null,
        op_id: null,
        order_type: null
      },
      rules:{
        op_id: [
          { required: true, type: 'number', message: '请选择订单负责人', trigger: 'change' }
        ]
      },
      opList: [],
      dialogVisable: false
    }
  },
  methods: {
    changeOrderOperator(orderId, opId){
      this.dialogVisable = true;
      this.opForm.order_id = orderId;
      this.opForm.op_id = opId || '';
      if(opId){
        this.handleSelectedOperator(opId);
      }
    },
    handleSelectedOperator(val){
      if(val){
        let selected = this.opList.filter(i => i.op_id == val);
        this.opForm.op_name = selected[0].op_name;
      }
    },
    handleGetChangeOrderOperatorList(){
      let params = {
        data: {
          order_type: this.orderType,
          op_name: ''
        }
      }
      getChangeOrderOperatorList({
        params,
        success: (params) =>{
          let { code, data, msg } = params['data'];
          this.loading = false;
          if(code == 0){
            this.opList = data;
          }else{
            this.opList = [];
          }
        }
      });
    },
    handleSubmitChangeOrderOperator(){
      this.$refs.opForm.validate((valid) => {
        if(valid){
          let params = {
                data: this.opForm
              };
          params['data'].order_type = this.orderType;
          setOrderOperator({
            params,
            success: (params) => {
              let { code, data, msg } = params['data'];
              if(code == 0){
                this.$message.success(msg);
                this.dialogVisable = false;
                this.$emit('change-success');
              }else{
                this.$message.error(msg);
              }
            }
          });
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCloseDialog(){
      this.dialogVisable = false;
    }
  },
  mounted(){
    this.handleGetChangeOrderOperatorList();
  }
}
</script>

