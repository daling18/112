<template>
    <el-form class="package-item" ref="stock-pageage-list" :model="packages" label-width="100px">
        <el-form-item label="出发城市：" :rules="[{
        required: true,
        message: '出发城市不能为空'
      }]" prop="city">
            <el-row type="flex">
                <el-col :span="4">
                    <el-select v-model="packages.city" filterable remote placeholder="请输入关键词" :remote-method="handleSearchDeparture" value-key="id">
                        <el-option v-for="item in cityList" :key="item.id" :label="item.simple_name" :value="item">{{item.whole_name}}</el-option>
                    </el-select>
                </el-col>
                <div class="package-button" style="margin-left:auto;">
                    <el-button @click="$emit('delete', index)" v-if="isDelete" plain type="primary">删除套餐</el-button>
                </div>
            </el-row>
        </el-form-item>
        <!-- <el-form-item label="行程天数：">
            <el-input placeholder="请输入国家/地区/城市/机场" v-model="packages."></el-input>
    </el-form-item>-->
        <el-form-item label="套餐名称：" prop="package_name" :rules="[{
        required: true,
        message:'套餐名称不能为空'
      }]" v-if="isDelete">
            <el-input placeholder="例酒店星级" v-model="packages.package_name"></el-input>
            <el-input placeholder="简介" v-model="packages.package_desc"></el-input>
            <!-- <el-select v-model="packages.package_stock_type">
          <el-option label="共享" :value="1"></el-option>
          <el-option label="独立" :value="2"></el-option>
      </el-select>-->
        </el-form-item>
        <el-table :data="packages.pkg_item" border>
            <el-table-column label="价格类型">
                <el-form-item slot-scope="scoped" :prop="'pkg_item.'+scoped.$index+'.other_name'" :rules="[{
            required: checkRequired(scoped.row),
            message: '价格名称不能为空'
          }]">
                    <el-input v-model="scoped.row.other_name" :disabled="scoped.row.type | isLockType"></el-input>
                </el-form-item>
            </el-table-column>
            <el-table-column label="结算价">
                <el-form-item slot-scope="scoped" :prop="'pkg_item.'+scoped.$index+'.settle_price'" :rules="[{
            required: checkRequired(scoped.row),
            message: '结算价不能为空'
          },{
            pattern: amountPattern,
            message: '请输入正确结算价',
          }]">
                    <el-input v-model="scoped.row.settle_price"></el-input>
                </el-form-item>
            </el-table-column>
            <el-table-column label="销售价">
                <el-form-item slot-scope="scoped" :prop="'pkg_item.'+scoped.$index+'.sales_price'" :rules="[{
            required: checkRequired(scoped.row),
            message: '销售价不能为空'
          },{
            pattern: amountPattern,
            message: '请输入正确的销售价'
          },{
            validator(rule, value, callback, source, options){
              if(parseFloat(value) < parseFloat(scoped.row.settle_price)){
                callback(handleError('销售价不能小于结算价'));
              }else{
                callback();
              }
            }
          }]">
                    <el-input v-model="scoped.row.sales_price"></el-input>
                </el-form-item>
            </el-table-column>
            <el-table-column label="网上预订价">
                <el-form-item slot-scope="scoped" :prop="'pkg_item.'+scoped.$index+'.online_price'" :rules="[{
            required: checkRequired(scoped.row) && show_front,
            message: '网上预订价不能为空'
          },{
            pattern: amountPattern,
            message: '请输入正确的网上预订价'
          },{
            validator(rule, value, callback, source, options){
              if(parseFloat(value) < parseFloat(scoped.row.settle_price)){
                callback(handleError('网上预订价不能小于结算价'));
              }else{
                callback();
              }
            }
          }]">
                    <el-input v-model="scoped.row.online_price"></el-input>
                </el-form-item>
            </el-table-column>
            <el-table-column label="价格类型说明">
                <el-form-item slot-scope="scoped" :prop="'pkg_item.'+scoped.$index+'.price_desc'" :rules="[{
            validator(rule, value, callback, source, options) {
                // 价格总和为0 表示没有儿童
                let total_price = [scoped.row.settle_price,scoped.row.sales_price,scoped.row.online_price].reduce((r, p) => {
                  return r + parseFloat(p);
                }, 0)
                if(scoped.row.type == 2 && total_price > 0){
                  if(!value){
                    callback(handleError('价格类型说明不能为空'));
                  }else{
                    callback();
                  }
                  
                }else{
                  callback();
                }
            }
          }]">
                    <el-input v-model.trim="scoped.row.price_desc" :maxlength="scoped.row.type == 2 ? 10 : Number.MAX_SAFE_INTEGER" :showWordLimit="scoped.row.type == 2"></el-input>
                </el-form-item>
            </el-table-column>
            <el-table-column label="操作">
                <el-form-item slot-scope="scoped">
                    <el-button type="text" @click="handleAddPrice(scoped.row, packages.pkg_item)">添加</el-button>
                    <el-button type="text" @click="handleDeletePrice(scoped.row, packages.pkg_item, scoped.$index)" :disabled="scoped.row.type | isLockType">删除</el-button>
                </el-form-item>
            </el-table-column>
        </el-table>
    </el-form>
</template>
<script>
import { searchDeparture } from "src/api/touristroute";
const lockType = [1, 2];
export default {
    name: "packageForm",
    props: {
        value: Object,
        index: Number,
        isDelete: Boolean,
        show_front: false
    },
    filters: {
        isLockType(type) {
            type = Number(type);
            var arr = [1, 2];
            return arr.includes(type);
        }
    },
    data() {
        return {
            cityList: [],
            // 金额正则
            amountPattern: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
            // 检查是否必填
            checkRequired(data) {
                if (lockType.includes(data.type)) {
                    return true;
                }
                let values = Object.values(data).filter(value => !!value);
                return !!values.length;
            }
        };
    },
    computed: {
        packages: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        },
        formRules() {
            return {};
        },
    },
    watch:{
        'value.city': {
            handler() {
                this.handleSearchDeparture(this.packages.city.whole_name)
            },
            immediate: true
        }
    },
    mounted() {
        // this.handleSearchDeparture(this.packages.city.whole_name)
    },
    updated(){
        // this.handleSearchDeparture(this.packages.city.whole_name);
    },
    methods: {
        handleError(msg) {
            return new Error(msg);
        },
        createdPriceRow() {
            return {
                type: 0,
                settle_price: "",
                sales_price: "",
                price_desc: "",
                online_price: "",
                other_name: ""
            };
        },
        handleAddPrice(priceData, priceList) {
            priceList.push(this.createdPriceRow());
        },
        handleDeletePrice(priceData, priceList, index) {
            if (priceList.length === 1) {
                this.$message.error("至少保留一个价格");
                return;
            }
            priceList.splice(index, 1);
        },
        // 搜索出发地
        handleSearchDeparture(query) {
            searchDeparture({
                name: query
            })
                .then(({ code, data, msg }) => {
                    if (code !== 0) {
                        return Promise.reject("msg");
                    }
                    this.cityList = data;
                })
                .catch(error => {
                    this.cityList = [];
                });
        },
        validate() {
            return new Promise((resolve, reject) => {
                this.$refs["stock-pageage-list"].validate(valid => {
                    if (valid) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "src/assets/css/variables";
.package-item {
    border: 1px solid $borderColor;
    padding: 10px;
    margin-bottom: 30px;
}
.el-button:disabled {
    color: #c0c4cc !important;
}
.el-input,
.el-select {
    max-width: 160px;
    & + & {
        margin-left: 10px;
    }
}
</style>