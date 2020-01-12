<template>
  <div class="wrapper" >
    <!-- {{ruleForm}} -->
    <div class="system-content">
      <div class="mod-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <div class="title">团队信息</div>
          <div class="form-content">
            <el-form-item label="团队编号" prop="tuan_no">
              <el-input v-model="ruleForm.tuan_no"></el-input>
            </el-form-item>
            <el-form-item label="团队名称" prop="tuan_name">
              <el-input v-model="ruleForm.tuan_name" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="团队日期" required>
              <el-col :span="12">
                <el-form-item  prop="departure_date">
                  <el-date-picker v-model="show_departure_date" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="back_date">
                  <el-date-picker v-model="show_back_date" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions1"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="出发抵达" required>
              <el-col :span="11">
                <el-form-item  prop="departure_city">
                  <!-- <el-input v-model="ruleForm.departure_city" placeholder="出发城市"></el-input> -->
                  <el-select v-model="ruleForm.departure_city" remote filterable :remote-method="remoteMethod" placeholder="出发城市" @click.native="suggest(ruleForm.departure_city)">
                    <el-option v-for="item in AddressList" :key="item.zone_id" :label="item.zone_name" :value="item.zone_name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col  :span="2">&ensp;</el-col>
              <el-col :span="11">
                <el-form-item  prop="destination_city">
                  <!-- <el-input v-model="ruleForm.destination_city" placeholder="到达城市"></el-input> -->
                  <el-select v-model="ruleForm.destination_city" remote filterable :remote-method="remoteMethod" placeholder="到达城市" @click.native="suggest(ruleForm.destination_city)">
                    <el-option v-for="item in AddressList" :key="item.zone_id" :label="item.zone_name" :value="item.zone_name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="产品类型" prop="product_large_type">
              <el-select v-model="ruleForm.product_large_type" placeholder="请选择产品类型">
                <el-option label="跟团游" :value="1"></el-option>
                <el-option label="商务考察" :value="2"></el-option>
                <el-option label="自助游" :value="4"></el-option>
                <!-- <el-option label="游轮" :value="5"></el-option> -->
                <el-option label="短途游（汽车团）" :value="11"></el-option>
                <el-option label="快捷旅游" :value="12"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="出境/国内">
              <el-radio v-model="ruleForm.tour_type" label="1">国内</el-radio>
              <el-radio v-model="ruleForm.tour_type" label="2">出境</el-radio>
            </el-form-item>
          </div>
          <div class="title">团队报价信息</div>
          <div class="form-content">
            <el-form-item label="成人同行价" prop="adult_in_price">
              <el-col :span="12"><input-number  v-model="ruleForm.adult_in_price" :disabled="price_edit_desabled==0?false:true" :precision="3" number /></el-col>
              
            </el-form-item>
            <el-form-item label="成人对外价" prop="adult_out_price">
              <el-col :span="12"><input-number  v-model="ruleForm.adult_out_price" :disabled="price_edit_desabled==0?false:true" :precision="3" number /></el-col>
              
            </el-form-item>
            <el-form-item label="儿童同行价" prop="child_in_price">
              <el-col :span="12"><input-number  v-model="ruleForm.child_in_price"  :disabled="price_edit_desabled==0?false:true" :precision="3" number /></el-col>
              
            </el-form-item>
            <el-form-item label="儿童对外价" prop="child_out_price">
              <el-col :span="12"><input-number  v-model="ruleForm.child_out_price" :disabled="price_edit_desabled==0?false:true" :precision="3" number /></el-col>
              
            </el-form-item>
            <div class="new-baojia">
              <el-row>
                <el-col :span="4">
                  <template v-if="price_edit_desabled==0">
                    <el-button type="text" @click="number++;">新增报价</el-button>
                  </template>
                </el-col>
                <el-col :span="20"><p class="remain">对外价为销售指导价，需要大于等于同行价格</p></el-col>
              </el-row>
              <div class="baojia-box">
                <div class="unit" v-for="(n,index) in number" :key="index">
                  <template v-if="price_edit_desabled==0">
                    <span class="close" @click="del(index)">×</span>
                  </template>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="价格类型" :prop="'type_name_arr_prev.' + index" :rules="[{required: true, message: '价格类型不能为空'},{ validator: checkRepeat}]">
                        <el-input v-model="ruleForm.type_name_arr_prev[index]" :disabled="price_edit_desabled==0?false:true" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="同行价" :prop="'peer_price_arr_prev.' + index" :rules="[{required: true, message: '同行价不能为空'},{ validator: checkNumber}]">
                        <input-number  v-model="ruleForm.peer_price_arr_prev[index]"  :disabled="price_edit_desabled==0?false:true" :precision="3" number />
                      </el-form-item>
                      <el-form-item label="对外价" :prop="'out_price_arr_prev.' + index" :rules="[{required: true, message: '对外价不能为空'},{ validator: checkNumber}]">
                        <input-number  v-model="ruleForm.out_price_arr_prev[index]"  :disabled="price_edit_desabled==0?false:true" :precision="3" number />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <el-form-item label="单房差" prop="diff_price">
              <el-col :span="12"><input-number  v-model="ruleForm.diff_price" :disabled="price_edit_desabled==0?false:true" :precision="3" number /></el-col>
              
            </el-form-item>
            <el-form-item label="计划位" prop="stock">
              <el-col :span="12"><input-number  v-model="ruleForm.stock" /></el-col>
              
            </el-form-item>
          </div> 
          <div class="submit-buttons">           
            <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnDisabled">保存</el-button>&ensp;
            <el-button type="default" @click="$router.go(-1)">取消</el-button>&ensp;
            <el-checkbox v-model="save" v-if="!this.ruleForm.id">保留报价信息</el-checkbox>
          </div>
        </el-form>   
      </div>
    </div>
  </div>
</template>

<script>
import { tuanTodoAdd , tuanDoAdd , searchZone} from 'src/api/api'
import * as format from 'src/utils/format';
import InputNumber from "src/plugins/InputNumber.vue";
export default {
  name: 'tuan-gain',
  components: {
    InputNumber
  },
  data() {
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('日期不能为空'));
      }else{
        callback();
      }
    };
    var checkNumber = (rule, value, callback) => {
      let re =/^\d+(\.{0,1}\d+){0,1}$/;
      if(!re.test(value)&&value!=''){
        return callback(new Error('请输入正数值'));
      }else if(value!=''&&(value<1||value>999999)){
        return callback(new Error('填入数值必须在1-999999之间'));
      }else{
        return callback();
      }
    };
    var checkInt = (rule, value, callback) => {
      let re =/^\d+$/;
      if (!re.test(value)||value<0) {
        return callback(new Error('请输入正整数值'));
      }else{
        return callback();
      }
    };
    var checkRepeat = (rule, value, callback) => {
      let times=0,
          initArr=['成人','儿童'],
          typeArr=initArr.concat(this.ruleForm.type_name_arr_prev);

      typeArr.forEach(function(a,b,c){
        if(value==a){
          times++;
        }
      });

      if(times>1){
        return callback(new Error('不能与已有价格类型重复'));
      }else{
        return callback();
      }
      
    };
    return {
      show_departure_date:'',
      show_back_date:'',
      ruleForm:{
        id:'0',
        tuan_name:'',
        tuan_no:'',
        product_large_type:1,
        departure_date:'',
        back_date:'',
        type_name_arr_prev:[],
        peer_price_arr_prev:[],
        out_price_arr_prev:[],
        diff_price:'',
        stock:'',
        departure_city:'',
        destination_city:'',
        adult_in_price:'',
        adult_out_price:'',
        child_in_price:'',
        child_out_price:'',
        type_name_arr:["成人", "儿童"],
        peer_price_arr:[],
        out_price_arr:[],
        tour_type: "1"
      },
      rules: {
        tuan_no: [
          { required: true, message: '请输入团队编号', trigger: 'blur' },
        ],
        tuan_name: [
          { required: true, message: '请输入团队名称', trigger: 'blur' },
        ],
        departure_date: [
          { required: true, message: '请输入出发日期', trigger: 'blur' },
        ],
        back_date: [
          { required: true, message: '请输入回程日期', trigger: 'blur' },
        ],
        departure_city: [
          { required: true, message: '请输入出发城市', trigger: 'blur' },
        ],
        destination_city: [
          { required: true, message: '请输入到达城市', trigger: 'blur' },
        ],
        adult_in_price: [
          { required: true, message: '请输入成人同行价'},
          { validator: checkNumber}
        ],
        adult_out_price: [
          { required: true, message: '请输入成人对外价'},
          { validator: checkNumber}
        ],
        child_in_price: [
          { validator: checkNumber}
        ],
        child_out_price: [
          { validator: checkNumber}
        ],
        stock: [
          { required: true, message: '请输入计划位'},
          { validator: checkInt}
        ],
        product_large_type: [
          { required: true, message: '请输入计划位'}
        ],
        diff_price:[
          { validator: checkNumber}
        ]
      },
      number:0,
      type_name_arr_prev:[],
      btnDisabled:false,
      save:false,
      checkNumber:checkNumber,
      checkRepeat:checkRepeat,
      price_edit_desabled:0,
      address:'',
      initArr:[
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
      AddressList:[]
    }
  },
  computed:{
    datepickerOptions1(){
      let depart_date = this.show_departure_date;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime()- 8 * 60 * 60 * 1000;
        }
      }
    },
    datepickerOptions2(){
      let depart_date = this.show_back_date;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      }
    }
  },
  watch: {
    show_departure_date(val) {
      this.ruleForm.departure_date=this.show_departure_date?format.date(this.show_departure_date):'';
    },
    show_back_date(val) {
      this.ruleForm.back_date=this.show_back_date?format.date(this.show_back_date):'';
    }
  },
  methods: {
    submitForm(formName) {
      // this.tuanTodoAddHandler();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tuanTodoAddHandler();
        }else {
           console.log('error submit!!');
          return false;
        }
      });
    },
    del(index){
      this.ruleForm.type_name_arr_prev.splice(index,1);
      this.ruleForm.peer_price_arr_prev.splice(index,1);
      this.ruleForm.out_price_arr_prev.splice(index,1);
      this.number--;
    },
    tuanTodoAddHandler(){
      let _this=this,
          out_price=[this.ruleForm.adult_out_price,this.ruleForm.child_out_price],
          in_price=[this.ruleForm.adult_in_price,this.ruleForm.child_in_price];

      this.ruleForm.type_name_arr=["成人", "儿童"];

      this.ruleForm.type_name_arr=this.ruleForm.type_name_arr.concat(this.ruleForm.type_name_arr_prev);
      this.ruleForm.out_price_arr=out_price.concat(this.ruleForm.out_price_arr_prev);
      this.ruleForm.peer_price_arr=in_price.concat(this.ruleForm.peer_price_arr_prev);

      let params = {
        data:this.ruleForm
      };
      params.data.price_edit_desabled=this.price_edit_desabled;
      this.btnDisabled=true;
      tuanTodoAdd({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == '0') {
            this.$message.success(data.msg);
            // this.$router.push({path:'/role/power',query:{id:data.data.id}});
            if(this.save&&(!this.ruleForm.id)){
              this.ruleForm.tuan_name="";
              this.ruleForm.tuan_no="";
            }else{
              setTimeout(function(){
                _this.$router.push({path:'/control'});
              },1000)
            }
          } else {
            this.$message.error(data.msg);
          }

          this.btnDisabled=false;
        },
        showLoading: true
      });
    },
    tuanDoAddHandler(){  
      let params = {
        data:{
          id:this.$route.query.id
        }
      };
      tuanDoAdd({
        params: params,
        success: (params) => {
          let _this=this,
              data = params.data;
          this.loading = false;

          if (data.code == '0') {
            let tuan_info=data.data.tuan_info,
                tuan_price=data.data.tuan_price;


            tuan_info.type_name_arr_prev=[];
            tuan_info.peer_price_arr_prev=[];
            tuan_info.out_price_arr_prev=[];

            tuan_price.forEach(function(obj,index,c){
              // obj.out_price=obj.out_price/1;
              // alert(typeof obj.out_price)
              if(index==0){
                tuan_info.adult_in_price=obj.peer_price;
                tuan_info.adult_out_price=obj.out_price;
              }else if(index==1){
                tuan_info.child_in_price=obj.peer_price==0?'':obj.peer_price;
                tuan_info.child_out_price=obj.out_price==0?'':obj.out_price;
              }else{
                tuan_info.type_name_arr_prev.push(obj.type_name);
                tuan_info.peer_price_arr_prev.push(obj.peer_price);
                tuan_info.out_price_arr_prev.push(obj.out_price);
              }
              
            });
            this.number=tuan_price.length-2;
            this.ruleForm=tuan_info;
            this.ruleForm.tour_type = this.ruleForm.tour_type ? this.ruleForm.tour_type + "" : "1";
            this.ruleForm.diff_price=data.data.diff_price==0?'':data.data.diff_price;
            this.ruleForm.stock=data.data.stock;
            this.ruleForm.type_name_arr=["成人", "儿童"],
            this.show_departure_date=tuan_info.departure_date;
            this.show_back_date=tuan_info.back_date;
            this.price_edit_desabled=data.data.price_edit_desabled;
          } else {
            this.$message.error(data.msg);
          }

          this.btnDisabled=false;
        },
        showLoading: true
      });
    },
    remoteMethod(query) {
      if (query !== '') {
        let para = {};
        para.data = {};
        para.data.name = query;

        searchZone(para).then((params) => {
          let { code, data, msg } = params['data'];

          if (!code) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.AddressList=data.filter(item => {
                return item.zone_name.indexOf(query) > -1;
              });
            }, 200);
          } else {
            this.$message({
              message: msg,
              type: 'error'
            })
          }

        });
      }else{
        this.AddressList=this.initArr
      }
    },
    suggest(a){
      if(!a){
        this.AddressList=this.initArr;
      }else{
        this.remoteMethod(a)
      }
    }
  },
  mounted() {
    this.ruleForm.id=this.$route.query.id?this.$route.query.id:0;
    if(this.ruleForm.id!=0){
      this.tuanDoAddHandler();
    }
    this.AddressList=this.initArr;
  }
}
</script>

<style scoped lang="scss">
.mod-form{

  .el-form{
    width:500px;
  }
  .el-select{
    display:block;
  }

  .new-baojia{
    padding-left:10px;
    margin-bottom:20px;

    .remain{
      line-height:34px;
      font-size:12px;
      color:#999;
    }

    .baojia-box{

      .unit{
        padding:20px 20px 0 20px;
        background:#eee;
        margin-bottom:20px;
      }
      
    }
      
  }
}
.unit{
  position: relative;
  font-style: normal;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  padding: 2px 15px 2px 5px;
  cursor: pointer;
}
.unit .close{
  color: #b10c79;
  border-color: #b10c79;
}
.unit .close{
  content: '×';
  position: absolute;
  right: 3px;
  top: 1px;
  font-size:20px;
}
.unit .close:hover {
  color: #b10c79;
}

</style>
