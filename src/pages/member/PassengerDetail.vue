<!--src/components/finace/report/branch.vue-->
<template>
  <div class="content-wrapper">
    <div class="contItem">
        <h2>基本信息</h2>
        <el-table
            :data="[userData]"
            style="width: 100%">
            <el-table-column
                prop="chinese_name"
                label="中文姓名"
                width="180">
            </el-table-column>
            <el-table-column
                label="性别"
                width="180">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.sex == 1 ? '男':'女'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="nationality"
                label="国籍">
            </el-table-column>
            <!-- <el-table-column
                prop="address"
                label="身份类型">
            </el-table-column> -->
            <el-table-column
                prop="es_name"
                label="英文姓/名">
            </el-table-column>
            <el-table-column
                prop="birth"
                label="出生日期">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="手机号">
            </el-table-column>

        </el-table>
    </div>
    <div class="contItem">
        <h2>证件信息</h2>
        <el-table
            :data="certificateData"
            style="width: 100%">
            <el-table-column
                label="证件名称"
                width="180">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.category | getType}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="id_no"
                label="证件号码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="valid"
                label="证件有效期">
            </el-table-column>
            <el-table-column
                prop="delive"
                label="证件签发地">
            </el-table-column>
            <el-table-column
                label="签注类型">
                <template sole-scope="scope">
                    <div>
                        <!-- {{scope.row.visa_type | visaType}} -->
                    </div>
                </template>
                
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>


import { getCardDetail } from "src/api/member";

export default {
  data() {
    var that = this;
    return {
        id: this.$route.query.id,
        userData: {
            chinese_name: this.$route.query.chinese_name,
            sex: this.$route.query.sex,
            nationality: this.$route.query.nationality,
            es_name: this.$route.query.es_name,
            birth: this.$route.query.birth,
            mobile: this.$route.query.mobile
        },
        _categoryLabel: null,
        certificateData: []
    }
  },
  filters: {
     getType (type){
        if(!this._categoryLabel){
            return '';
        }
        return this._categoryLabel[type];
     },
     visaType (type){
         let num = type * 1;
         switch (num){
            case '1':
                return 'G签个人旅游';
            case '2':
                return 'L签团队旅游';
            case '3':
                return '商务注签';
            case '4':
                return '其他';
         }
     }   
  },
  computed: {},
  watch: {},
  methods: {
    initData(){
        var params = {
            data : {
                id: this.id
            }
        }
        getCardDetail({
            params,
            success: (res) => {
            let data = res.data;  
                if(data.code == 0){
                    this.certificateData = data.data.list;
                    this._categoryLabel = data.data._categoryLabel;
                }else{
                    this.$message.error(data.msg);  
                    return false;
                }
            },
            showLoading: true
        })
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style lang="less" scoped>
    h2 {
        line-height: 40px;
    }
    .headerBox {
        overflow: hidden;
        height: 300px;
        padding: 10px 20px;
        background: #fff;
        .left {
            float: left;
            width: 200px;
            height: 240px;;
            // border: 1px solid #333;
            box-shadow: 1px 2px 3px #ccc;
            .imgBox {
                width: 150px;
                height: 150px;
                border-radius: 75px;
                overflow: hidden;
                background: #ccc;
                margin: 20px auto;
            }
            .account {
                color: #333;
                font-size: 16px;
                font-weight: bold;
                line-height: 30px;
                text-align: center;
            }
        }
        .right {
            float: left;
            width: 500px;
            border-left: 1px solid #ddd;
            border-top: 1px solid #ddd;
            margin-left: 50px;
            li {
                width: 250px;
                float: left;
                height: 40px;
                border-bottom: 1px solid #ddd;
                border-right: 1px solid #ddd;
                box-sizing: border-box;
                span {
                    display: block;
                    float: left;
                    height: 100%;
                    padding: 0 5px;
                    line-height: 40px;
                    text-align: center;
                    &:nth-child(1){
                        width: 30%;
                        background: #ccc;
                    }
                }
            }
        }
    }
    .contItem {
        background: #fff;
        margin-top: 10px;
        padding: 10px 20px;
    }
</style>