<!--src/components/finace/report/branch.vue-->
<template>
  <div class="content-wrapper">
    <div class="contItem">
        <h2>邀请好友记录</h2>
        <el-table
            :data="allData"
            style="width: 100%">
            <el-table-column
                prop="nick_name"
                label="被邀请人昵称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="被邀请人手机号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="注册时间">
            </el-table-column>
            <el-table-column
                label="注册来源">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.resource_os | fromType}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="allData && allData.length" class="page">
            <el-pagination
            layout="prev, pager, next"
            :page-size="page_size"
            :current-page="page_index"
            :total="total_count"
            @current-change="pageChange"
            ></el-pagination>
        </div>
    </div>
  </div>
</template>
<script>

import { getInviteList } from "src/api/member";

export default {
  data() {
    return {
        id: this.$route.query.id,
        allData: [],
        page_size: 10,
        page_index: 1,
        total_count: ""
    }
  },
  filters: {
    fromType(type){
        let num = type * 1;
         switch (num){
            case '0':
                return '未知';
            case '1':
                return 'PC';
            case '2':
                return 'IOS';
            case '3':
                return 'Android';
            case '4':
                return '微信平台';
            case '5':
                return 'H5页面';
            case '6':
                return '微信小程序';
            case '99':
                return '其他';
         }
    }
  },
  computed: {},
  watch: {},
  methods: {
    pageChange(page) {
      this.page_index = page;
      this.initData();
    },
    initData (){
        var params = {
            page_index: 1,
            data : {
                member_id: this.id,
                page: this.page_index
            }
        }
        getInviteList({
            params,
            success: (res) => {
                let data = res.data;
                if(data.code == 0){
                    console.log(data);
                    this.allData = data.data.list;
                }else{
                    this.$message.error(data.msg);
                }
            },
            showLoading : true
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