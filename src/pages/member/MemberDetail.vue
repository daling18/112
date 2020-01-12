<!--src/components/finace/report/branch.vue-->
<template>
  <div class="content-wrapper">
    <div class="headerBox">
        <h2>用户详情</h2>
        <div class="left">
            <div class="imgBox"><img :src="userData.mem_photo" alt=""></div>
            <div class="account">{{userData.mobile}}</div>
        </div> 
        <div class="right">
            <ul>
                <li>
                    <span>用户昵称</span>
                    <span>{{userData.nick_name}}</span>
                </li>
                <li>
                    <span>注册时间</span>
                    <span>{{userData.create_time}}</span>
                </li>
                <li>
                    <span>会员ID</span>
                    <span>{{userData.yingke_code}}</span>
                </li>
                <li>
                    <span>出生日期</span>
                    <span>{{userData.birthday}}</span>
                </li>
                <li>
                    <span>用户账号</span>
                    <span></span>
                </li>
                <li>
                    <span>证件号</span>
                    <span>{{userData.id_card}}</span>
                </li>
                <li>
                    <span>姓名</span>
                    <span>{{userData.real_name}}</span>
                </li>
                <li>
                    <span>邮箱</span>
                    <span>{{userData.mem_email}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span>{{userData.gender ? '女':'男'}}</span>
                </li>
            </ul> 
        </div> 
    </div>
    <div class="contItem">
        <h2>统计信息</h2>
        <el-table
            :data="[userData]"
            style="width: 100%">
            <el-table-column
                prop="total_order_amount"
                label="消费金额"
                width="180">
            </el-table-column>
            <el-table-column
                prop="total_order_num"
                label="订单数量"
                width="180">
            </el-table-column>
            <el-table-column
                prop="total_invite_income"
                label="拉新收益">
                <template slot-scope="scope">
                    <router-link :to="'earnings?id='+ id">{{scope.row.total_invite_income}}</router-link>
                </template>
            </el-table-column>
            <el-table-column
                prop="total_invite_num"
                label="邀请好友">
                <template slot-scope="scope">
                    <router-link :to="'invitation?id=' + id">{{scope.row.total_invite_num}}</router-link>
                </template>
            </el-table-column>
            <el-table-column
                prop="invite_name"
                label="邀请人昵称">
            </el-table-column>
            <el-table-column
                prop="org_name"
                label="所属营业部">
            </el-table-column>
        </el-table>
    </div>
    <div class="contItem">
        <h2>收货信息</h2>
        <el-table
            :data="deliveryList"
            style="width: 100%">
            <el-table-column
                prop="contact_name"
                label="收货人姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="contact_phone"
                label="手机号码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="详细地址">
            </el-table-column>
            <el-table-column
                prop="postcode"
                label="邮编">
            </el-table-column>
            <!-- <el-table-column
                prop="address"
                label="默认地址">
            </el-table-column> -->
        </el-table>
    </div>
    <div class="contItem">
        <h2>旅客信息</h2>
        <el-table
            :data="travellerList"
            style="width: 100%">
            <el-table-column
                prop="chinese_name"
                label="中文姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="es_name"
                label="英文姓/名"
                width="180">
            </el-table-column>
            <el-table-column
                label="性别">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.sex == 1 ? '男':'女' }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="birth"
                label="出生日期">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="nationality"
                label="国籍">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <router-link :to="'passengerDetail?id=' + scope.row.user_id + toUrlString(scope.row)">查看更多</router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>

import { getUserDetail } from "src/api/member";
import qs from 'qs';
export default {
    name:"MemberDetail",
  data() {
    var that = this;
    return {
      id: this.$route.query.id,
      userData: {},
      tableData: [],
      travellerList:[],
      deliveryList:[]
    }
  },
  computed: {},
  watch: {},
  methods: {
    initData(){
        var params = {
            data : {
                member_id: this.id
            }
        }
        getUserDetail({
            params,
            success: (res) => {
            let data = res.data;
         
                if(data.code == 0){
                    this.userData = data.data;
                    this.travellerList = data.data.travellerList;
                    this.deliveryList = data.data.deliveryList
                    console.log(this.travellerList);
                    
                }else{
                    this.$message.error(data.msg);  
                    return false;
                }
            },
            showLoading: true
        })
    },
    toUrlString(obj) {
        return qs.stringify(obj)
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
                white-space: nowrap;
                span {
                    float: left;
                    box-sizing: border-box;
                    line-height: 40px;
                    padding: 0 5px;
                    text-align: center;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    &:nth-child(1){
                        width: 30%;
                        background: #ccc;
                    }
                     &:nth-child(2){
                        width: 70%;
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