// src\components\system\cooperation\detail.vue
<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">合作客户</div>
        <div class="form-content">
          <el-form
            label-width="140px"
            :model="form"
            ref="refForm">
            <el-form-item label="公司名称">
              {{allData.company_name}}
            </el-form-item>
            <el-form-item label="地区"
              v-if="allData.province != '' || allData.city != ''">
              {{allData.province}}{{allData.city}}
            </el-form-item>
            <el-form-item label="合作状态">
              <span class="col-gray"
                v-if="allData.cooperation_status == 0">
                待确认
              </span>
              <span class="col-green"
                v-else-if="allData.cooperation_status == 1">
                合作中
              </span>
              <span class="col-red"
                v-else-if="allData.cooperation_status == 2">
                已退回
              </span>
              <span class="col-red"
                v-else-if="allData.cooperation_status == 3">
                合作到期
              </span>
            </el-form-item>
            <template v-if="pageType == 'view'">
              <el-form-item label="合作有效期截止">
                {{allData.cooperation_validity_period}}
              </el-form-item>
              <!-- <el-form-item label="返佣比例">
                {{allData.share_benefit_proportion}}%
              </el-form-item> -->
              <el-form-item label="合作线路列表">
                <div class="line-con">
                  <div class="line-tree">
                    <div class="line-wrap" v-for="(item, index) in class_ids_list" :key="index">
                      <div class="line-one">
                        <el-checkbox @change="handleCheck(1, item)" v-model="item.check" :indeterminate="item.isIndeterminate" :disabled="isDis"></el-checkbox>
                        <span class="line-tit po"><span v-if="item.child && item.child.length > 0" @click="item.showchild=!item.showchild" class="arror" :class="item.showchild ? '' : 'rotate'"></span>{{item.name}}</span>
                      </div>
                      <el-collapse-transition>
                        <div v-show="item.showchild">
                          <div class="line-two" v-for="(item2, index2) in item.child" :key="index2">
                            <el-checkbox @change="handleCheck(2, item2)" v-model="item2.check" :indeterminate="item2.isIndeterminate" :disabled="isDis"></el-checkbox>
                            <span class="line-tit po"><span v-if="item2.child && item2.child.length > 0" @click="item2.showchild=!item2.showchild" class="arror" :class="item2.showchild ? '' : 'rotate'"></span>{{item2.name}}</span>
                            <el-collapse-transition>
                              <div v-show="item2.child && item2.child.length > 0 && item2.showchild" class="line-three clearfix">
                                <span v-for="(item3, index3) in item2.child" :key="index3" class="line-item">
                                  <el-checkbox @change="handleCheck(3, item3)" v-model="item3.check" :indeterminate="item3.isIndeterminate" :disabled="isDis"></el-checkbox>
                                  <span class="line-tit">{{item3.name}}</span>
                                </span>
                              </div>
                            </el-collapse-transition>
                          </div>
                        </div>
                      </el-collapse-transition>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="合作有效期截止"
                required>
                <el-date-picker 
                  v-model="cooperationValidityPeriod"
                  type="date"
                  placeholder="选择日期"
                  :editable="false"
                  :picker-options="pickerOption"
                  @change="form.cooperation_validity_period=$event||''"
                />
              </el-form-item>
              <!-- <el-form-item label="返佣比例"
                required>
                <input-number  v-model="form.share_benefit_proportion" :number='true' :max='100' :min='0' class="ipt" /> %
              </el-form-item> -->
              <el-form-item label="合作线路列表"
                required>
                <div class="line-con">
                  <div class="line-tree">
                    <div class="line-wrap" v-for="(item, index) in class_ids_list" :key="index">
                      <div class="line-one">
                        <el-checkbox @change="handleCheck(1, item)" v-model="item.check" :indeterminate="item.isIndeterminate" :disabled="isDis"></el-checkbox>
                        <span class="line-tit po"><span v-if="item.child && item.child.length > 0" @click="item.showchild=!item.showchild" class="arror" :class="item.showchild ? '' : 'rotate'"></span>{{item.name}}</span>
                      </div>
                      <el-collapse-transition>
                        <div v-show="item.showchild">
                          <div class="line-two" v-for="(item2, index2) in item.child" :key="index2">
                            <el-checkbox @change="handleCheck(2, item2)" v-model="item2.check" :indeterminate="item2.isIndeterminate" :disabled="isDis"></el-checkbox>
                            <span class="line-tit po"><span v-if="item2.child && item2.child.length > 0" @click="item2.showchild=!item2.showchild" class="arror" :class="item2.showchild ? '' : 'rotate'"></span>{{item2.name}}</span>
                            <el-collapse-transition>
                              <div v-show="item2.child && item2.child.length > 0 && item2.showchild" class="line-three clearfix">
                                <span v-for="(item3, index3) in item2.child" :key="index3" class="line-item">
                                  <el-checkbox @change="handleCheck(3, item3)" v-model="item3.check" :indeterminate="item3.isIndeterminate" :disabled="isDis"></el-checkbox>
                                  <span class="line-tit">{{item3.name}}</span>
                                </span>
                              </div>
                            </el-collapse-transition>
                          </div>
                        </div>
                      </el-collapse-transition>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </template>
          </el-form>
          <div class="submit-buttons"
            v-if="!isDis">
            <el-button type="primary" @click="handleSubmit('refForm')" size="large" :disabled="submitBtnDisable">
              {{btnName}}
            </el-button>
            <el-button @click="$router.go(-1)" size="large">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  cooperativeCustomersInfo,
  editCooperation,
  renewContract
} from 'src/api/api_supplier';
import InputNumber from 'src/plugins/InputNumber.vue';
import {
  formattDate
} from 'src/assets/js/common.js';
export default {
  data () {
    let valiClassIds = (rule, value, callback) => {
      if(this.form.class_ids_1.length == 0){
        callback(new Error('请选择合作列表'))
      }
    };
    return {
      id: this.$route.query.id,
      allData: [],
      class_ids_list: [],
      isDis: false,
      pageType: null,
      btnName: '',
      submitBtnDisable: false,
      cooperationValidityPeriod: null,
      form:{
        id: this.$route.query.id,
        cooperation_validity_period: '',
        share_benefit_proportion: '',
        class_ids_1: [],
        class_ids_2: [],
        class_ids_3: {},
      },
      pickerOption:{
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
      // rulesForm:{
      //   cooperation_validity_period:[{
      //     required: true,
      //     message: '请选择合作有效期截止日',
      //     trigger: 'blur'
      //   }],
      //   share_benefit_proportion:[{
      //     required: true,
      //     type: 'number',
      //     message: '请填写返佣比例',
      //     trigger: 'blur'
      //   }],
      //   class_ids:[{
      //     validator: valiClassIds,
      //     trigger: 'blur'
      //   }]
      // }
    }
  },
  components:{
    InputNumber
  },
  created(){
    switch(this.$route.name){
      case 'cooperationViewDetail':
        this.pageType = 'view';
        break;
      case 'cooperationEditDetail':
        this.pageType = 'edit';
        this.btnName = '保存';
        break;
      case 'cooperationResignDetail':
        this.pageType = 'resign';
        this.btnName = '重新签约';
        break;
    }
  },
  methods: {
    initialize(){
      cooperativeCustomersInfo({
        params:{
          data:{
            id: this.id
          }
        },
        success: (res) => {
          let {code, data, msg} = res.data
          if (code === 0) {
            this.allData = data;
            // 处理线路类别初始化数据
            this.class_ids_list = data.line_of_cooperation;
            this.class_ids_list.forEach((v,i,a)=>{
              v.check = v.check === 1 ? true : false;
              v.index = i;
              this.$set(v, 'showchild', false);
              let vChildCheck = 0;
              v.child.forEach((v2,i2,a2)=>{
                v2.check = v2.check === 1 ? true : false;
                v2.parindex = [i];
                v2.index = i2;
                this.$set(v2, 'showchild', false);
                this.$set(v2, 'isIndeterminate', false);
                let v2ChildCheck = 0;
                v2.child.forEach((v3,i3,a3)=>{
                  v3.check = v3.check === 1 ? true : false;
                  v3.parentid = v2.id;
                  v3.parindex = [i, i2];
                  v3.index = i3;
                  if(v3.check){
                    v2ChildCheck++;
                  }
                });
                if(v2ChildCheck > 0 && v2ChildCheck < v2.child.length){
                  this.$set(v2, "isIndeterminate", true);
                  v2.check = false;
                }
                if(v2.check){
                  vChildCheck++;
                }
              });
              if(vChildCheck > 0 && vChildCheck < v.child.length){
                this.$set(v, "isIndeterminate", true);
              }else{
                this.$set(v, "isIndeterminate", false);
                if(v.child.length == vChildCheck){
                  v.check = true;
                }
              }
            });
            if(this.pageType == 'view'){
              this.isDis = true;
            }else{
              // 填充表单数据
              this.cooperationValidityPeriod = this.allData.cooperation_validity_period;
              this.form.cooperation_validity_period = this.allData.cooperation_validity_period;
              this.form.share_benefit_proportion = this.allData.share_benefit_proportion;
            }
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCheck (type, itm) {
      if (type === 1) {
        if (this.class_ids_list[itm.index].check) {
          this.class_ids_list[itm.index].child.forEach((item, index) => {
            item.check = true
            item.isIndeterminate = false
            if (item.child.length > 0) {
              item.child.forEach((item2, index2) => {
                item2.check = true
              })
            }
          })
        } else {
          this.class_ids_list[itm.index].child.forEach((item, index) => {
            item.check = false
            item.isIndeterminate = false
            if (item.child.length > 0) {
              item.child.forEach((item2, index2) => {
                item2.check = false
              })
            }
          })
        }
        this.class_ids_list[itm.index].isIndeterminate = false
      } else if (type === 2) {
        if (this.class_ids_list[itm.parindex[0]].child[itm.index].check) {
          this.class_ids_list[itm.parindex[0]].child[itm.index].child.forEach((item, index) => {
            item.check = true
          })
        } else {
          this.class_ids_list[itm.parindex[0]].child[itm.index].child.forEach((item, index) => {
            item.check = false
          })
        }
        this.class_ids_list[itm.parindex[0]].child[itm.index].isIndeterminate = false
        let len = 0
        this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
          if (item.check) {
            len = len + 1
          }
        })
        if (len === this.class_ids_list[itm.parindex[0]].child.length) {
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = false
        } else if (len === 0) {
          this.class_ids_list[itm.parindex[0]].check = false
          this.class_ids_list[itm.parindex[0]].isIndeterminate = false
        } else {
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
        }
      } else if (type === 3) {
        let len = 0
        this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].child.forEach((item, index) => {
          if (item.check) {
            len = len + 1
          }
        })
        if (len === this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].child.length) {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = true
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = false
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
          let pLen = 0
          this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
            // 添加item.isIndeterminate，避免前面分组有勾选，最后一组全选导致一级复选框是全选的现象
            if (item.check && !item.isIndeterminate) {
              pLen = pLen + 1
            }
          })
          if (pLen === this.class_ids_list[itm.parindex[0]].child.length) {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          }
        } else if (len === 0) {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = false
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = false
          let item2len = 0
          this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
            if (item.check) {
              item2len = item2len + 1
            }
          })
          if (item2len === 0) {
            this.class_ids_list[itm.parindex[0]].check = false
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          } else if (item2len === this.class_ids_list[itm.parindex[0]].child.length) {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          } else {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = true
          }
        } else {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = true
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = true
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
        }
      }
    },
    handleSubmit(formName){
      let api = this.pageType == 'edit' ? editCooperation : renewContract;
      this.form.class_ids_1 = [];
      this.form.class_ids_2 = [];
      this.form.class_ids_3 = {};
      this.class_ids_list.forEach(v=>{
        if(v.check){
          this.form.class_ids_1.push(v.id);
          v.child.forEach(v2=>{
            if(v2.check){
              this.form.class_ids_2.push(v2.id);
              let keyId = v2.id,
                a = [];
              v2.child.forEach(v3=>{
                if(v3.check){
                  a.push(v3.id);
                }
              });
              this.form.class_ids_3[keyId] = a;
            }
          });
        }
      });
      // this.$refs[formName].validate(valid=>{
        // if(valid){
          // this.form.cooperation_validity_period = formattDate(this.form.cooperation_validity_period);
      api({
        params:{
          data: this.form
        },
        success: (res) => {
          let {code, data, msg} = res.data;
          if (code === 0) {
            this.$message.success(msg);
            this.$router.push({
              path: '../cooperation'
            });
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
      //   }else{
      //     console.log('error submit');
      //     return false;
      //   }
      // });
    }
  },
  mounted() {
    this.initialize();
  },
}
</script>
<style lang="less" scoped>
.el-form-item {
  margin-bottom: 15px;
}
.col-gray{
  color: #666;
}
.col-red{
  color: red;
}
.col-green{
  color: green;
}
.line-con{
  overflow: hidden;
}
.ipt{
  width: 180px;
}
</style>
