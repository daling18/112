<template>
<!-- application\index\view\dev\src\components\plan\trip\add-new-trip3.vue -->
  <div class="wrapper trip-wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">说明</div>
        <div class="form-content">
          <el-form :model='data' label-width="100px">
            <el-form-item label="自费购物">
              <el-table :data="shoping" style="width: 100%" border>
                <el-table-column
                  label="自费购物名称"
                  align='center'
                  width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" placeholder="请输入自费名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="停留时间(分钟)"
                  align='center'
                  width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.stay_time" placeholder="请输入停留时间"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="经营项目"
                  align='center'>
                  <template slot-scope="scope">
                    <el-input type="textarea" v-model="scope.row.project" placeholder="请输入经营项目"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align='center'
                  width="100" >
                  <template slot-scope="scope">
                    <span class="shop-btn" @click="deleteShop(scope.$index)" v-if="!(scope.$index == 0 && scope.$index === shoping.length - 1)">删除</span>
                    <span class="shop-btn" v-show="scope.$index === shoping.length - 1" @click="addShop">新增</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="行程特色" class="trip-textarea">
              <!-- <el-input type="textarea" v-model="data.trip_features" placeholder="请编辑行程特色"></el-input> -->
              <vue-editor v-model="data.trip_features"/>
              <div class="fontlength">{{trip_features_length}}/10000</div>
            </el-form-item>
            <el-form-item label="费用包含" required="">
              <el-tabs v-model="feeIncludesType" type="border-card">
                <el-tab-pane label="富文本编辑" name="richText">
                  <vue-editor v-model="feeIncludesRichText"/>
                </el-tab-pane>
                <el-tab-pane label="表格编辑" name="table">
                  <el-table border :data="feeIncludesTable">
                    <el-table-column label="费用项" header-align="center" width="250">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入费用项"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="描述" header-align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.describe" placeholder="请输入描述"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                      <template slot-scope="scope">
                        <span v-if="feeIncludesTable.length - 1 == scope.$index" @click="handleTableItem('feeIncludesTable', '+', scope)" class="squire-btn">+</span>
                        <span v-if="feeIncludesTable.length > 1" @click="handleTableItem('feeIncludesTable', '-', scope)" class="squire-btn">-</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <div v-if="feeIncludesType == 'richText'" class="fontlength">{{fee_includes_length}}/8000</div>
            </el-form-item>
            <el-form-item label="费用不包含" required="">
              <el-tabs v-model="costExcludesType" type="border-card">
                <el-tab-pane label="富文本编辑" name="richText">
                  <vue-editor v-model="costExcludesRichText"/>
                </el-tab-pane>
                <el-tab-pane label="表格编辑" name="table">
                  <el-table border :data="costExcludesTable">
                    <el-table-column label="费用项" header-align="center" width="250">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入费用项"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="描述" header-align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.describe" placeholder="请输入描述"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                      <template slot-scope="scope">
                        <span v-if="costExcludesTable.length - 1 == scope.$index" @click="handleTableItem('costExcludesTable', '+', scope)" class="squire-btn">+</span>
                        <span v-if="costExcludesTable.length > 1" @click="handleTableItem('costExcludesTable', '-', scope)" class="squire-btn">-</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <div v-if="costExcludesType == 'richText'" class="fontlength">{{cost_excludes_length}}/8000</div>
            </el-form-item>
            <el-form-item label="预定须知">
              <vue-editor v-model="data.booking_info"></vue-editor>
              <div class="fontlength">{{booking_info_length}}/8000</div>
            </el-form-item>
            <el-form-item label="安全说明">
              <vue-editor v-model="data.safety_info"></vue-editor>
              <div class="fontlength">{{safety_info_length}}/8000</div>
            </el-form-item>
            <el-form-item label="备注">
              <vue-editor v-model="data.remark"></vue-editor>
              <div class="fontlength">{{remark_length}}/8000</div>
            </el-form-item>
            <el-form-item label="签证信息">
              <div>
                <el-checkbox v-model="data.visa_check" true-label="1" false-label="0">上传电子版签证信息</el-checkbox>
              </div>
              <el-table :data="visa" style="width: 100%" border>
                <el-table-column
                  label="身份类型"
                  align='center'
                  width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.card_type" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="需要提交材料"
                  align='center'
                  >
                  <template slot-scope="scope">
                    <el-input type="textarea" v-model="scope.row.need_reference" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="详细说明"
                  align='center'>
                  <template slot-scope="scope">
                    <el-input type="textarea" v-model="scope.row.instruction" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align='center'
                  width="100" >
                  <template slot-scope="scope">
                    <span class="shop-btn" @click="deleteVisa(scope.$index)" v-if="!(scope.$index == 0 && scope.$index === visa.length - 1)">删除</span>
                    <span class="shop-btn" v-show="scope.$index === visa.length - 1" @click="addVisa">新增</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <div class="submit-buttons left" style="padding-left: 100px;">
              <el-button type="primary" @click="goback()">上一步</el-button>
              <el-button type="primary" @click="doStep3()">保存</el-button>
              <el-button type="default" @click="cancel">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {doStep3, step3}from 'src/api/api';
  import {supplierDoStep3, supplierStep3} from 'src/api/supplier';
  import html5Editor from 'src/plugins/editor/vue-html5-editor.vue';
  export default {
    components: {
      'vue-editor': html5Editor
    },
    mounted() {
      if (this.$route.query.copyId) {
        this.isCopy = true;
      };
      this.step3();
    },
    watch: {
      'data.trip_features': {
        handler() {
          this.trip_features_length = this.noHtmlLength(this.data.trip_features);
        }
      },
      'feeIncludesRichText': {
        handler() {
          this.fee_includes_length = this.noHtmlLength(this.feeIncludesRichText);
        }
      },
      'costExcludesRichText': {
        handler() {
          this.cost_excludes_length = this.noHtmlLength(this.costExcludesRichText);
        }
      },
      'data.booking_info': {
        handler() {
          this.booking_info_length = this.noHtmlLength(this.data.booking_info);
        }
      },
      'data.safety_info': {
        handler() {
          this.safety_info_length = this.noHtmlLength(this.data.safety_info);
        }
      },
      'data.remark': {
        handler() {
          this.remark_length = this.noHtmlLength(this.data.remark);
        }
      }
    },
    data() {
      return {
        name: this.$route.name ? this.$route.name : '',
        data: {
          product_id: this.$route.query.id,
          name: [],
          stay_time: [],
          project: [],
          trip_features: '',
          fee_includes_type: 1,
          fee_includes: '',
          cost_excludes_type: 1,
          cost_excludes: '',
          booking_info: '',
          safety_info: '',
          remark: '',
          card_type: [],
          need_reference: [],
          instruction: [],
          visa_check: "0"
        },
        feeIncludesType: 'richText',  // 'table'
        feeIncludesRichText: '',
        feeIncludesTable: [{name: '', describe: ''}],
        fee_includes_length: 0,
        trip_features_length:0,
        costExcludesType: 'richText',  // 'table'
        costExcludesRichText: '',
        costExcludesTable: [{name: '', describe: ''}],
        cost_excludes_length: 0,
        booking_info_length: 0,
        safety_info_length: 0,
        remark_length: 0,
        isCopy: false,
        copyId: this.$route.query.copyId,
        shoping: [{
          name: '',
          stay_time: '',
          project: ''
        }],
        visa: [{
          card_type: '',
          need_reference: '',
          instruction: ''
        }]
      }
    },
    methods: {
      deleteShop(index) {
        if (index === 0 && this.shoping.length === 1) {
          this.shoping[0].name = '';
          this.shoping[0].stay_time = '';
          this.shoping[0].project = '';
          return ''
        }
        this.shoping.splice(index, 1);
      },
      addShop() {
        let shoping = {
          name: '',
          stay_time: '',
          project: ''
        };
        this.shoping.push(shoping)
      },
      deleteVisa(index) {
        if (index === 0 && this.visa.length === 1) {
          this.visa[0].card_type = '';
          this.visa[0].need_reference = '';
          this.visa[0].instruction = '';
          return ''
        }
        this.visa.splice(index, 1);
      },
      addVisa() {
        let visa = {
          card_type: '',
          need_reference: '',
          instruction: ''
        };
        this.visa.push(visa);
      },
      handleTableItem(name, type, row){
        console.log('name:', name, type, row);
        if(type == '+'){
          this[name].push({name: '', describe: ''});
        }else if(this[name].length > 1){
          this[name].splice(row.$index, 1);
        }
      },
      goback() {
        const h = this.$createElement;
        this.$confirm('', '操作提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          message: h('div', null, [
            h('p', null, '您当前行程内容未保存，是否要离开本界面？'),
            h('p', null, '（离开后，已编辑好的内容将不会被保存）, 是否继续?')
          ]),
          center: true
        }).then(() => {
          if (this.name === 'tripAddTripThree') {
            this.$router.push({
              path: '/touristroute/trip/addNewTrip2',
              query: {
                id: this.data.product_id
              }
            });
          } else if (this.name === 'lineTripAddTripThree') {
            this.$router.push({
              path: '/touristroute/lineTrip/addNewTrip2',
              query: {
                id: this.data.product_id
              }
            });
          } else if (this.name === 'operatingtripAddTripThree'){
            this.$router.push({
              path: '/touristroute/operating/trip/addNewTrip2',
              query: {
                id: this.data.product_id
              }
            });
          }
        }).catch(() => {
          
        });
      },
      doStep3() {
        console.log(this.data.trip_features.length)
        if(this.data.trip_features.length > 10000) {
          this.$message({
            message: '行程特色编辑内容及样式内容不能超过10000字符',
            type: 'error'
          })
          return ''
        };
        if(this.feeIncludesType == 'table'){
          this.data.fee_includes = this.feeIncludesTable;
          this.data.fee_includes_type = 2;
        }else{
          this.data.fee_includes = this.feeIncludesRichText;
          this.data.fee_includes_type = 1;
          if(this.fee_includes_length > 8000) {
            this.$message({
              message: '费用包含不能超过8000字符',
              type: 'error'
            })
            return ''
          };
        }
        if(this.costExcludesType == 'table'){
          this.data.cost_excludes = this.costExcludesTable;
          this.data.cost_excludes_type = 2;
        }else{
          this.data.cost_excludes = this.costExcludesRichText;
          this.data.cost_excludes_type = 1;
          if(this.cost_excludes_length > 8000) {
            this.$message({
              message: '费用不包含不能超过8000字符',
              type: 'error'
            })
            return ''
          };
        }

        if(this.booking_info_length > 8000) {
          this.$message({
            message: '预定须知不能超过8000字符',
            type: 'error'
          })
          return ''
        };
        if(this.safety_info_length > 8000) {
          this.$message({
            message: '安全说明不能超过8000字符',
            type: 'error'
          })
          return ''
        };
        if(this.remark_length > 8000) {
          this.$message({
            message: '备注不能超过8000字符',
            type: 'error'
          })
          return ''
        };
        this.data.name = [];
        this.data.stay_time = [];
        this.data.project = [];
        for (let i = 0; i < this.shoping.length; i++) {
          this.data.name.push(this.shoping[i].name);
          this.data.stay_time.push(this.shoping[i].stay_time);
          this.data.project.push(this.shoping[i].project);
        };
        this.data.card_type = [];
        this.data.need_reference = [];
        this.data.instruction = [];
        for (let j = 0; j < this.visa.length; j++) {
          this.data.card_type.push(this.visa[j].card_type);
          this.data.need_reference.push(this.visa[j].need_reference);
          this.data.instruction.push(this.visa[j].instruction);
        };
        let params = {
          data: this.data
        };
        let action = doStep3
        if (this.name === 'lineTripAddTripThree') {
          action = supplierDoStep3
        }
        action({
          params: params,
          success: (res) => {
            let result = res.data;
            if (result.code === 0) {
              this.loading = true;
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              if (this.name === 'tripAddTripThree') {
                this.$router.push({
                  path: '/touristroute/trip/bids',
                  query: {id: this.data.product_id}
                });
              } else if (this.name === 'lineTripAddTripThree') {
                this.$router.push({
                  path: '/touristroute/lineTrip/bids',
                  query: {id: this.data.product_id}
                });
              } else if (this.name === 'operatingtripAddTripThree') {
                this.$router.push({
                  path: '/touristroute/operating/trip/bids',
                  query: {id: this.data.product_id}
                });
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            };
          },
          showLoading: true
        });
      },
      cancel() {
        const h = this.$createElement;
        this.$confirm('', '操作提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          message: h('div', null, [
            h('p', null, '您当前行程内容未保存，是否要离开本界面？'),
            h('p', null, '（离开后，已编辑好的内容将不会被保存）, 是否继续?')
          ]),
          center: true
        }).then(() => {
          if (this.name === 'tripAddTripThree') {
            this.$router.push('/touristroute/trip/list')
          } else if (this.name === 'lineTripAddTripThree') {
            this.$router.push('/touristroute/lineTrip/list')
          }
        }).catch(() => {
          
        });
      },
      step3() {
        let params = {
          data: {
            id: this.data.product_id
          }
        };
        if (this.isCopy) {
          params.data.id = this.copyId
        };
        let action = step3
        if (this.name === 'lineTripAddTripThree') {
          action = supplierStep3
        }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              if (!result.cost_excludes || result.cost_excludes.length === 0) {
                return 
              };
              this.shoping.splice(0, this.shoping.length);
              if(result.own_info && result.own_info.length === 0) {
                let shop_obj = {
                  name: '',
                  project: '',
                  stay_time: ''
                };
                this.shoping.push(shop_obj)
              };
              for (let i = 0; i < result.own_info.length; i++) {
                let shop_obj = {
                  name: result.own_info[i].name,
                  project: result.own_info[i].project,
                  stay_time: result.own_info[i].stay_time
                };
                this.shoping.push(shop_obj)
              };
              this.visa.splice(0, this.visa.length);
              if(result.visa_info && result.visa_info.length === 0) {
                let visa_obj = {
                  card_type: '',
                  need_reference: '',
                  instruction: ''
                };
                this.visa.push(visa_obj)
              };
              for (let j = 0; j < result.visa_info.length; j++) {
                let visa_obj = {
                  card_type: result.visa_info[j].card_type,
                  need_reference: result.visa_info[j].need_reference,
                  instruction: result.visa_info[j].instruction
                };
                this.visa.push(visa_obj)
              };

              this.data.fee_includes_type = result.fee_includes_type || 1;
              if(result.fee_includes_type == 2){
                if(Array.isArray(result.fee_includes) && result.fee_includes.length > 0){
                  this.feeIncludesTable = result.fee_includes;
                }else{
                  this.feeIncludesTable = [{name: '', describe: ''}];
                }
                this.feeIncludesType = 'table';
              }else{
                this.feeIncludesRichText = result.fee_includes || '';
                this.feeIncludesType = 'richText';
              }

              this.data.cost_excludes_type = result.cost_excludes_type || 1;
              if(result.cost_excludes_type == 2){
                if(Array.isArray(result.cost_excludes) && result.cost_excludes.length > 0){
                  this.costExcludesTable = result.cost_excludes;
                }else{
                  this.costExcludesTable = [{name: '', describe: ''}];
                }
                this.costExcludesType = 'table';
              }else{
                this.costExcludesRichText = result.cost_excludes || '';
                this.costExcludesType = 'richText';
              }

              this.data.trip_features = result.trip_features ? result.trip_features : '';
              this.data.booking_info = result.booking_info ? result.booking_info : '';
              this.data.safety_info = result.safety_info ? result.safety_info : '';
              this.data.remark = result.remark ? result.remark : '';
              this.data.visa_check = result.visa_check + "";
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        })
      },
      noHtmlLength(val) {
        let str = val;
        // str = str.replace(/<[^>]+>/g, "");
        str = str.match(/[\u4E00-\u9FA5]/g);
        str = str ? str.join(""):'';
        return str.length
      }
    }
  }
</script>
<style lang="less" scoped>
  .trip-wrapper {
    .shop-btn {
      color: #b10c79;
      font-size: 14px;
      cursor: pointer;
    }
    .textareah {
      height: 200px;
    }
    .fontlength {
      text-align: right;
      color: #666;
    }
  }
  .el-tabs--border-card{
    box-shadow: none;
    clear: none;
    .vue-html5-editor, .el-table--border{
      border: none;
    }
  } 
  .squire-btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #b10c79;
    border-radius: 50%;
    line-height: 20px;
    color: #b10c79;
    cursor: pointer;
    text-align: center;
  }
</style>
<style>
.el-tabs .el-tabs__content{
  padding: 0;
}
.el-tabs__item.is-active{
  color: #b10c79;
}
</style>
