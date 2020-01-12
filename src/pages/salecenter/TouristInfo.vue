// src\components\distribution\TouristInfo.vue
<template>
    <div class="wrapper">
        <div class="wrapper-left">
            <div class="title">
                <span>添加订单</span>
            </div>
            <div class="linesInfo">
                <p class="p">
                    {{lineInfo.line_title | filtertitle}}
                    <span class="activity">{{lineInfo.line_subtitle}}</span>
                    <span>产品编号:{{lineInfo.line_no}}</span>
                </p>
                <div class="div">
                    <span v-if="lineInfo.starting_city">出发地：{{lineInfo.starting_city}}</span>
                    <span v-if="lineInfo.line_type">线路分类：{{lineInfo.line_type}}</span>
                    <span>行程天数：{{lineInfo.line_day}}天{{lineInfo.line_night}}晚</span>
                    <span v-if="lineInfo.end_city">目的地：{{lineInfo.end_city}}</span>
                </div>
            </div>
            <div class="touristInfo">
                <div class="Info-title">
                    <div>游客信息</div>
                    <div class="download">
                        <span @click="download">游客信息模板下载</span>
                        <div>
                            <span class="excel">导入Excel</span>
                            <input ref="referenceUpload" type="file" accept=".xls, .xlsx, .excel" @change="readExcel($event.target)" />
                        </div>
                    </div>
                </div>
                <div class="info-content">
                    <!-- <div class="info-number">
            <div class="label">出游人数</div>
            <div v-for="(i,k,index) in Numbers" :key="index">
              <div class="k">{{k}}</div>
              <div>
                <span class="NumberAdd" @click="Numbercount(k,-1)">-</span>
                <span class="NumberI">{{i}}</span>
                <span class="NumberCut" @click="Numbercount(k,1)">+</span>
              </div>
            </div>
          </div> -->
                    <div v-for="(item,k) in searchInput" :key="k">
                        <div class="listsign">
                            <h2>游客{{k+1}}</h2>
                            <div class="countNumbers">
                                <span @click="Numbercount('成人',1)">+</span>
                                <span @click="deleteTouristInfo(k)" :class="(searchInput.length<=1 || isorderID === 0) && 'active'">-</span>
                            </div>
                        </div>
                        <div class="search-item search-list form-group">
                            <div class="label">游客姓名</div>
                            <el-input placeholder="请输入游客真实姓名" v-model="item.name" />
                        </div>
                        <div class="search-item form-group">
                            <div class="label">证件类型</div>
                            <el-select v-model="item.idType" placeholder="请输入证件类型" @change="setIdType">
                                <el-option v-for="(item,k,i) in idType" :key="i" :label="k" :value="item" />
                            </el-select>
                        </div>
                        <div class="search-item form-group">
                            <div class="label">证件号</div>
                            <el-input placeholder="请输入证件号" v-model="item.id" @change="changeIdCard(item.id,item.idType,k)" />
                        </div>
                        <div class="search-item form-group" v-show="item.idType !== 1">
                            <div class="label">证件有效期</div>
                            <el-date-picker v-model="item.idDate" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="search-item form-group">
                            <div class="label">性别</div>
                            <el-radio v-model="item.gender" label="1">男</el-radio>
                            <el-radio v-model="item.gender" label="2">女</el-radio>
                        </div>
                        <!-- <div class="search-item search-list" v-show="item.idType !== 1 && item.idType !== 2">
                            <div class="label">国籍</div>
                            <el-input placeholder="请输入国籍" v-model="item.nationality" />
                        </div> -->
                        <div class="search-item search-list form-group">
                            <div class="label">手机号码</div>
                            <el-input placeholder="请输入手机号码" v-model="item.phone" />
                        </div>
                        <div class="search-item search-list" v-if="roomDiff > 0">
                            <div class="label">单房差</div>
                            <el-checkbox v-model="item.roomDiff" @change="countTotalPrice(searchInput)">单房差</el-checkbox>
                        </div>
                        <div class="search-item search-list">
                            <div class="label">出发城市</div>
                            <div class="Packagechecked" v-if="isorderID===1">
                                <span :class="key === item.cityIndex && 'active'" v-for="(i,key) in pkgList" :key="key" @click="checkedCity(k,key)">{{i.city.city_name ||'北京'}}</span>
                            </div>
                            <div class="Packagechecked" v-else>
                                <span class="active">{{orderTouristNum[0].city_name || '北京'}}</span>
                            </div>
                        </div>
                        <div class="search-item search-list">
                            <div class="label">套餐集合</div>
                            <div class="Packagechecked" v-if="isorderID===1">
                                <span :class="key === item.packageNameIndex && 'active'" v-for="(i,key) in item.pkgList" :key="key" @click="checkedPackageName(k,key)">{{i.package_name}}</span>
                            </div>
                            <div class="Packagechecked" v-else>
                                <span class="active">{{orderTouristNum[0].package_name}}</span>
                            </div>
                        </div>
                        <div class="search-item search-list">
                            <div class="label">游客类型</div>
                            <div class="Packagechecked" v-if="isorderID===1">
                                <span :class="key === item.touriTypeIndex && 'active'" v-for="(i,key) in item.touriType" :key="key" v-if="i.sales_price && i.sales_price != 0" @click="checkedType(k,key)">
                                    {{i.other_name || 0}}</span>
                            </div>
                            <div class="Packagechecked" v-else>
                                <span class="active">{{item.touristTypeName || '成人'}}</span>
                            </div>
                        </div>
                        <div class="search-item search-list">
                            <div class="label">签发地</div>
                            <el-input placeholder="请输入签发地" v-model="item.issue" />
                        </div>
                        <div class="search-item search-list">
                            <div class="label">出生日期</div>
                            <el-date-picker v-model="item.date" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contract" v-if="orderType !== 2">
                <div class="contract-title">
                    <h2>合同签字人</h2>
                    <span>*选择游客后，对应游客信息必填，同时会给对应游客手机号发送签署合同短信*</span>
                </div>
                <div class="contract-Info">
                    <span @click="chencksig(k,i.issign)" v-for="(i,k) in searchInput" :key="k" v-show="i.name" :class="i.issign && 'active'">{{i.name}}</span>
                </div>
            </div>
            <div class="contacts">
                <div class="contacts-title">
                    <h2>联系人信息</h2>
                </div>
                <div class="search-item search-list form-group">
                    <div class="label">代理商:</div>
                    <div v-if="orderType===3" style="line-height:35px;">直客</div>
                    <div v-else-if="orderType===1" style="line-height:35px;">{{contacts.org_name}}</div>
                    <el-select v-else v-model="contacts.org" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getOrgList">
                        <el-option v-for="(item,k) in orgList" :key="k" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
                <div class="search-item search-list form-group">
                    <div class="label">订单负责人</div>
                    <el-input placeholder="请输入订单负责人" v-model="contacts.name" />
                </div>
                <div class="search-item search-list form-group">
                    <div class="label">联系电话</div>
                    <el-input placeholder="请输入联系电话" v-model="contacts.phone" />
                </div>
                <div class="search-item search-list">
                    <div class="label">备注</div>
                    <el-input type="textarea" v-model="contacts.remark" show-word-limit maxlength="200" placeholder="请输入备注" />
                </div>
            </div>
        </div>
        <!--right-->
        <div class="wrapper-right">
            <div class="title">
                <span>价格明细</span>
            </div>
            <p class="secondTitle">出游团费</p>
            <div class="tourfee">
                <div v-for="(item,k) in TotalNumber" :key="k">
                    <span>{{item.type}}+{{item.city_name}}+{{item.package_name}}*
                        {{item.index}}({{Number(item.price).toFixed(2)}})</span>
                    <span>=</span>
                    <span class="totalPrice">{{(item.price*item.index).toFixed(2)}}</span>
                </div>
                <div v-if="arrRoomDiff.TotalPrice">
                    <span>单房差*{{arrRoomDiff.price}}（{{arrRoomDiff.index}}）= {{arrRoomDiff.price*arrRoomDiff.index}}</span>
                </div>
            </div>
            <!-- <p class="secondTitle">投保信息</p>
      <div class="Insurance">
        <ul>
          <li><span>保险名称</span><span class="Insurance-val">国内游集出版计划</span></li>
          <li><span>投保时间</span><span class="Insurance-val">20191919</span></li>
          <li><span>保险期限</span><span class="Insurance-val">5天</span></li>
          <li><span>投保金额</span><span class="Insurance-val">100万</span></li>
        </ul>
      </div>-->
            <p class="secondTitle">订单详情</p>
            <div class="order-details">
                <ul>
                    <li>
                        <span>订单总金额</span>
                        <span class="details-val" v-if="orderType === 2">￥{{touristInfo.total_peer_amount}}</span>
                        <span class="details-val" v-else>￥{{touristInfo.total_amount}}</span>
                    </li>
                    <li>
                        <span>定金</span>
                        <span class="details-val">￥{{touristInfo.deposit || deposit}}</span>
                    </li>
                    <li>
                        <span>结算总价</span>
                        <span class="details-price">￥{{touristInfo.total_peer_amount}}</span>
                    </li>
                    <li>
                        <span>利润</span>
                        <span class="details-price" v-if="orderType === 2">￥0</span>
                        <span v-else class="details-price">￥{{touristInfo.profit || touristInfo.total_amount-touristInfo.total_peer_amount}}</span>
                    </li>
                </ul>
                <div class="submit">
                    <!-- <div class="submit-left" @click="linePlaceOrder">预占位</div> -->
                    <div class="submit-right" @click="formalPlaceOrder">正式报名</div>
                </div>
            </div>
            <div class="changePrice" @click="changePrice(1)">订单调价</div>
            <div v-for="(item,k) in changePriceInput" :key="k" class="changePriceList">
                <div>
                    <div class="div-top">
                        <h2>订单调价</h2>
                        <span @click="changePrice(-1)">删除</span>
                    </div>
                    <div class="div-content">
                        <div class="search-item search-list">
                            <div class="label">项目名称</div>
                            <el-input placeholder="请输入项目名称" v-model="item.item_name" />
                        </div>
                        <div class="search-item">
                            <div class="label">价格</div>
                            <el-select v-model="item.operator" style="width:60px;float:left">
                                <el-option label="-" :value="2" />
                                <el-option label="+" :value="1" />
                            </el-select>
                            <div class="inputembed">
                                <input placeholder="请输入调整金额" v-model="item.unit_price" maxlength="10" />
                                <span>元</span>
                            </div>
                        </div>
                        <div class="search-item search-list">
                            <div class="label">备注</div>
                            <el-input type="textarea" v-model="item.remark" show-word-limit maxlength="100" placeholder="请输入备注信息" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SearchItemDateRange from "src/plugins/SearchItemDateRange";
import {
    getRecordOrderTourist,
    RecordOrderTouristSave,
    normalPlaceOrder,
    linePlaceOrder,
    getOrgList,
    getLeaderInfo, //获取负责人信息
    importTourist //上传excel
} from "src/api/product";
import CopyButton from "src/components/components/CopyButton";
import * as format from "src/utils/format";
import { Loading } from "element-ui";
const _REG = {
    regMobile: /^[1][3,4,5,7,8][0-9]{9}$/, //验证手机号
    regFullname: /^[\u4e00-\u9fa5]{2,8}$/, //验证中文姓名
    regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, //验证邮箱
    regCredentials: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/, //验证身份证
    regPassport: /^[a-zA-Z]{5,17}$|^[a-zA-Z0-9]{5,17}$/, //护照身份证
    regHongKongMacao: /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/, //验证港澳通行证
    regTaiwan: /^[0-9]{8}$|^[0-9]{10}$/, //验证台湾通行证
    regLetters: /^[A-z]{2,}$/, // 必须是英文并且是两个字以上
    regOfficers: /^\w+$/, // 正英文数字，不限制字数 验证军官证
    regTaiwanCompatriots: /^\w+$/, // 正英文数字，不限制字数 验证台胞证
    regHometown: /^\w+$/, // 正英文数字，不限制字数 验证回乡证
    regAccount: /^\w{15,18}$/ // 正英文数字，不限制字数 验证户口本
};
export default {
    components: {
        SearchItemDateRange,
        CopyButton
    },
    filters: {
        filtersItem(item) {
            return item ? item.join(",") : "";
        },
        filtertitle(title) {
            return title && title.length > 26
                ? title.slice(1, 26) + "..."
                : title;
        }
    },
    data() {
        const { query } = this.$route;
        return {
            isorderID: 1, //1为补录2位正式预定
            touristInfo: {},
            touristInfoNum: [],
            orderTouristNum: [],
            newOrderTourist: [],
            lineInfo: {},
            pkgList: [],
            pkg: [],
            roomDiff: 0, //单房差
            arrRoomDiff: {
                price: 0,
                index: 0,
                TotalPrice: 0
            }, //单房差价格
            idType: {
                身份证: 1,
                护照: 2,
                军官证: 3,
                港澳通行证: 4,
                台胞证: 5,
                回乡证: 6,
                户口簿: 7,
                台湾通行证: 8,
                士兵证: 9,
                出生证明: 10
            },
            Numbers: {
                成人: 0,
                儿童: 0,
                老人: 0
            },
            TotalNumber: [],
            numberTotal: 1,
            searchInput: [
                {
                    name: "",
                    nationality: "中国",
                    phone: "",
                    issue: "",
                    issign: "", //是否签署人
                    idType: 1,
                    id: "",
                    idDate: "",
                    date: "",
                    gender: "1",
                    roomDiff: 0, //单房差
                    cityIndex: 0,
                    packageNameIndex: 0,
                    touriTypeIndex: 0,
                    pkgList: [],
                    pkg: {},
                    touriType: {},
                    touristTypeName: "成人" //补录游客信息使用
                }
            ],
            touristTypeName: "",
            contacts: {
                org: "",
                name: "",
                phone: "",
                remark: ""
            },
            deposit: 0, //定金
            orderType: 1, //1门店2同业3直客
            changePriceInput: [
                {
                    item_name: "",
                    operator: 2,
                    unit_price: "",
                    remark: ""
                }
            ],
            checked: true,
            orgList: []
        };
    },
    computed: {},
    watch: {},
    mounted() {
        let { lineInfo, orderId } = this.$route.query;
        // orderId = 4689;
        if (orderId) {
            this.isorderID = 0; //0为补录1为正式下单
            this.orderId = orderId;
            this.getRecordOrderTourist(); //补录游客信息
        } else {
            this.isorderID = 1; //0为补录1为正式下单
            lineInfo = JSON.parse(lineInfo);
            this.lineInfo = lineInfo;
            let {
                formdata: { city, meal }
            } = lineInfo;
            this.pkgList = lineInfo.pkgList; //出发城市与套餐集合
            this.pkg = lineInfo.pkgList[meal].pkg; //套餐集合
            this.searchInput[0].pkgList = lineInfo.pkgList[city].pkg; //套餐集合
            this.searchInput[0].touriType = lineInfo.quote; //游客类型
            this.searchInput[0].cityIndex = city;
            this.searchInput[0].packageNameIndex = meal;
            this.deposit = lineInfo.deposit;
            this.orderType = lineInfo.orderType; //orderType为2时利润为0，订单总金额改为结算价*人数
            this.roomDiff = lineInfo.roomDiff;
            lineInfo.quote.forEach((item, i) => {
                item.number && this.touristNum(item.number, item);
            });
            this.searchInput.shift();
            //初始化价格
            this.countTotalPrice(this.searchInput);
        }
        this.getLeaderInfo(); //获取负责人信息end_city
    },
    methods: {
        getRecordOrderTourist() {
            let params = {
                data: {
                    order_id: this.orderId
                }
            };
            getRecordOrderTourist({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.touristInfo = data;
                    this.lineInfo = data.lineOrderProduct;
                    this.orderTouristNum = data.orderTouristNum;
                    this.orderType = Number(data.order_from); //后端一会数字一会字符串
                    this.roomDiff = data.room_diff_price;
                    this.deposit = data.deposit;
                    let temp = [];
                    data.orderTouristNum.forEach(item => {
                        this.TotalNumber.push({
                            type: item.name,
                            city_name: item.city_name,
                            package_name: item.package_name,
                            index: item.num,
                            price: item.sale_price
                        });
                        this.Numbers[item.name] =
                            Number(this.Numbers[item.name]) + Number(item.num);
                        item.num &&
                            this.retouristNum(Number(item.num) || 0, item.name);
                        item.num && this.sorttourist(Number(item.num), item);
                    });
                    this.searchInput.shift();
                    this.touristInfo.deposit = (
                        Number(this.deposit) * this.searchInput.length
                    ).toFixed(2);
                    // this.countTotalPrice(this.searchInput);
                    console.log(this.newOrderTourist, "newOrderTourist");
                }
            });
        },
        RecordOrderTouristSave() {
            //补录游客信息提交
            let {
                newOrderTourist,
                touristInfo,
                searchInput,
                contacts,
                orgList,
                orderType,
                changePriceInput
            } = this;
            let tourist_list = [];
            let org = {};
            org = orgList.find(i => i.id == contacts.org) || {
                id: "",
                name: ""
            };
            searchInput.forEach((i, index) => {
                let temp = {
                    item_id: newOrderTourist[index].item_id,
                    packages_id: newOrderTourist[index].package_id,
                    username: i.name,
                    gender: i.gender,
                    identity_type: i.idType,
                    identity_no: i.id,
                    identity_end_date: i.idDate, //证件有效期
                    is_room_diff: i.roomDiff ? 1 : "",
                    issue_place: i.issue,
                    mobile: i.phone,
                    birthday: i.date,
                    nationality: i.nationality,
                    is_contract_sign: i.issign,
                    remark: ""
                };
                tourist_list.push(temp);
            });
            let params = {
                data: {
                    order_id: this.orderId,
                    agent_org_id:
                        orderType === 3 || orderType === 1 ? 0 : org.id,
                    agent_org_name:
                        orderType === 3
                            ? "直客"
                            : orderType === 1
                            ? contacts.org_name
                            : org.name,
                    contacts_real_name: contacts.name,
                    contacts_mobile: contacts.phone,
                    remark: contacts.remark,
                    tourist_list,
                    order_modify_price: changePriceInput
                }
            };
            let isempty = this.Verification(params.data);
            console.log(isempty, "isempty");
            if (!isempty) return;
            RecordOrderTouristSave({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.JumptoOrderdetails(data);
                }
            });
        },
        normalPlaceOrder() {
            //正式下单
            let {
                searchInput,
                orgList,
                contacts,
                changePriceInput,
                lineInfo: { product_id, product_index_id, orderType }
            } = this;
            let org = {};
            org = orgList.find(i => i.id == contacts.org) || {
                id: "",
                name: ""
            };
            let tourist_list = [];
            searchInput.forEach(i => {
                console.log(i.idDate, "idDate");
                let temp = {
                    item_id: i.touriType[i.touriTypeIndex].id || "",
                    packages_id: i.touriType[i.touriTypeIndex].package_id,
                    username: i.name,
                    gender: i.gender,
                    identity_type: i.idType,
                    identity_no: i.id,
                    identity_end_date: i.idDate, //证件有效期
                    is_room_diff: i.roomDiff ? 1 : "",
                    issue_place: i.issue,
                    mobile: i.phone,
                    birthday: i.date,
                    nationality: i.nationality,
                    is_contract_sign: i.issign, //签署人
                    remark: ""
                };
                tourist_list.push(temp);
            });

            let params = {
                data: {
                    product_id,
                    product_index_id,
                    order_from: orderType,
                    agent_org_id:
                        orderType === 3 && orderType === 1 ? 0 : org.id,
                    agent_org_name:
                        orderType === 3
                            ? "直客"
                            : orderType === 1
                            ? contacts.name
                            : org.name,
                    quote_id: this.pkg[0].item[0].quote_id,
                    contacts_real_name: contacts.name,
                    contacts_mobile: contacts.phone,
                    remark: contacts.remark,
                    tourist_list,
                    order_modify_price: changePriceInput
                }
            };
            let isempty = this.Verification(params.data);
            console.log(isempty, "isempty");
            if (!isempty) return;
            let loadingInstance = Loading.service();
            normalPlaceOrder({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.JumptoOrderdetails(data);
                }
            });
        },
        getOrgList(name) {
            //获取所有组织
            let params = {
                data: {
                    name
                }
            };
            getOrgList({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.orgList = data;
                }
            });
        },
        deleteTouristInfo(k) {
            let { searchInput, isorderID } = this;
            if (isorderID === 0)
                return this.$message.error("补录游客信息提交不可更改人数");
            if (searchInput.length <= 1)
                return this.$message.error("最少录入一位游客");
            this.searchInput.splice(k, 1);
            this.countTotalPrice(searchInput);
        },
        Numbercount(k, n) {
            let { Numbers, isorderID } = this;
            let Newly = false;
            if (isorderID === 0)
                return this.$message.error("补录游客信息提交不可更改人数");
            let num = 0;
            for (let key in Numbers) {
                num = num + Numbers[key];
            }
            if ((Numbers[k] === 0 && n === -1) || (num <= 1 && n === -1))
                return;
            if (n === -1) {
                Newly = this.deleteNumber(k);
            } else {
                //选择成人儿童
                Newly = this.addTouristType(k);
            }
            if (Newly) {
                this.numberTotal = num + n;
                this.Numbers[k] = Numbers[k] + n;
            }
            this.countTotalPrice(this.searchInput); //价格计算
        },
        formalPlaceOrder() {
            //正式下单
            const ACTIVE = ["RecordOrderTouristSave", "normalPlaceOrder"];
            this[ACTIVE[this.isorderID]]();
        },
        checkedCity(k, i) {
            this.$set(this.searchInput[k], "cityIndex", i);
            this.$set(this.searchInput[k], "pkgList", this.pkgList[i].pkg);
            this.pkg = this.pkgList[i].pkg;
            this.checkedPackageName(k, 0);
        },
        checkedPackageName(k, i) {
            this.$set(this.searchInput[k], "packageNameIndex", i);
            this.$set(this.searchInput[k], "touriType", this.pkg[i].item);
            this.checkedType(k, 0);
        },
        checkedType(k, i) {
            this.$set(this.searchInput[k], "touriTypeIndex", i);
            this.countTotalPrice(this.searchInput);
        },
        chencksig(k, issign) {
            let { searchInput } = this;
            let temp = issign === 1 ? "" : 1;
            this.$set(this.searchInput[k], "issign", temp);
        },
        readExcel(e) {
            let file = e.files[0];
            let self = this;
            const types = file.name.split(".")[1];
            const fileType = [
                "excel",
                "xlsx",
                "xlc",
                "xlm",
                "xls",
                "xlt",
                "xlw",
                "csv"
            ].some(item => item === types);
            this.$confirm("此次操作将覆盖您所输入的数据是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    if (!fileType)
                        return self.$message.error("格式错误！请重新选择");
                    let formData = new FormData();
                    formData.append("file", file);
                    importTourist({
                        processData: false, // 不处理数据
                        contentType: false, // 不设置内容类型
                        params: formData,
                        success: res => {
                            let {
                                data: { code, data, msg }
                            } = res;
                            if (code !== 0)
                                return self.$message.error(msg || "接口错误");
                            let temp = [];
                            data.tourist.forEach((i, index) => {
                                if (
                                    self.isorderID === 0 &&
                                    index >= self.searchInput.length
                                )
                                    return;
                                temp.push({
                                    name: i.username,
                                    idType: self.idType[i.identity_type],
                                    id: i.identity_no,
                                    idDate: i.identity_end_date,
                                    gender: i.gender === "男" ? "1" : "2",
                                    nationality: i.nationality,
                                    phone: i.mobile,
                                    issue: i.issue_place, //签发地
                                    issign: i.is_contract_sign, //签署人
                                    date: i.birthday,
                                    roomDiff: 0, //单房差
                                    cityIndex: 0,
                                    packageNameIndex: 0,
                                    touriTypeIndex: 0,
                                    pkgList: self.searchInput[0].pkgList,
                                    pkg: self.searchInput[0].pkg,
                                    touriType: self.searchInput[0].touriType
                                });
                                if (self.isorderID === 0) {
                                    self.$set(
                                        self.searchInput,
                                        index,
                                        temp[index]
                                    );
                                }
                            });
                            if (self.isorderID === 1) {
                                self.searchInput = temp;
                                self.countTotalPrice(temp);
                            }
                            self.$refs.referenceUpload.value = null;
                        }
                    });
                })
                .catch(() => {
                    self.$refs.referenceUpload.value = null;
                });
        },
        getLeaderInfo() {
            getLeaderInfo({
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    let contacts = {
                        org_name: data.org_name,
                        name: data.name,
                        phone: data.mobile
                    };
                    this.contacts = Object.assign(this.contacts, contacts);
                }
            });
        },
        Verification(params) {
            let { tourist_list, order_modify_price } = params;
            const VERIF = {
                username: "姓名",
                identity_type: "证件类型",
                identity_no: "证件号码",
                // nationality: "国籍",
                gender: "性别"
                // mobile: "手机号"
            };
            let temp = true;
            let tempObj = {};
            try {
                tourist_list.filter((item, k) => {
                    //验证是否为空
                    for (let i in item) {
                        let text = item["username"] || `游客${k + 1}`;
                        if (!item[i] && VERIF[i]) {
                            this.$message.error(`${text}的${VERIF[i]}不可为空`);
                            temp = false;
                            return;
                        }
                        if (
                            i === "identity_no" &&
                            !_REG.regCredentials.test(item[i]) &&
                            item.identity_type === 1
                        ) {
                            this.$message.error(
                                `${text}的${VERIF[i]}格式不正确`
                            );
                            temp = false;
                            return;
                        }
                        if (tempObj[item[i]] && i === "identity_no") {
                            //验证身份证号是否重复
                            this.$message.error(`${text}的${VERIF[i]}格式重复`);
                            temp = false;
                            return;
                        } else {
                            tempObj[item[i]] = 1;
                        }
                        if (
                            i === "identity_end_date" &&
                            !item[i] &&
                            item.identity_type !== 1
                        ) {
                            this.$message.error("证件有效期不可为空");
                            temp = false;
                            return;
                        }
                        if (!temp) foreach.break = new Error("StopIteration");
                    }
                });
            } catch (e) {
                if (e.message === "foreach is not defined") {
                    return;
                } else throw e;
            }
            const ORGLIST = {
                agent_org_name: "代理商组织名称",
                contacts_real_name: "订单负责人",
                contacts_mobile: "联系电话"
            };
            if (temp) {
                for (let i in params) {
                    if (ORGLIST[i] && !params[i]) {
                        this.$message.error(`${ORGLIST[i]}不可为空`);
                        temp = false;
                        return;
                    }
                }
            }
            if (temp && this.orderType !== 2) {
                temp = tourist_list.some(i => i.is_contract_sign === 1);
                !temp && this.$message.error(`请选择合同签署人`);
            }
            if (temp) {
                temp = tourist_list.every(i =>
                    i.is_contract_sign === 1 ? i.mobile !== "" : true
                );
                !temp && this.$message.error(`请填写合同签署人联系电话`);
            }
            if (temp) {
                let PhoneList = {};
                tourist_list.forEach(i => {
                    if (i.is_contract_sign === 1 && PhoneList[i.mobile]) {
                        temp = false;
                    } else if (i.is_contract_sign === 1) {
                        PhoneList[i.mobile] = 1;
                    }
                });
                !temp && this.$message.error(`合同签署人手机号不可重复!`);
            }
            if (temp) {
                const CHANGEPRICEARR = {
                    item_name: "项目名称",
                    unit_price: "调价金额"
                };
                temp = order_modify_price.every(arr => {
                    let at = 0;
                    for (let j in arr) {
                        at = CHANGEPRICEARR[j] && arr[j] ? at + 1 : at;
                    }
                    return at === 2 || at === 0;
                });
                !temp && this.$message.error(`请认真填写订单调价信息`);
            }
            return temp;
        },
        download() {
            let url =
                "https://staticimage.yktour.com.cn/template/linetourist-SXRES2ZSOTExNTY4Mjc3NDgz.xlsx";
            let elt = document.createElement("a");
            elt.setAttribute("href", url);
            elt.setAttribute("download", "游客信息模板");
            elt.style.display = "none";
            document.body.appendChild(elt);
            elt.click();
            document.body.removeChild(elt);
        },
        JumptoOrderdetails(data) {
            this.$router.push({
                path: "/saleorder/v2/lineOrder/detail/order",
                query: {
                    order_id: data.order_id,
                    order_no: data.order_no
                }
            });
        },
        setIdType(k) {},
        changePrice(index) {
            let { changePriceInput } = this;
            if (index === 1) {
                this.changePriceInput.push({
                    item_name: "",
                    operator: 2,
                    unit_price: "",
                    remark: ""
                });
            } else {
                if (changePriceInput.length === 0) return;
                this.changePriceInput.pop();
            }
        },
        deleteNumber(k) {
            //游客删除
            let { searchInput } = this;
            let temp = false;
            let index = 0;
            searchInput.forEach((item, i) => {
                if (item.touriType[item.touriTypeIndex].other_name === k) {
                    index = i;
                }
            });
            this.searchInput.splice(index, 1);
            return true;
        },
        retouristNum(index, name) {
            //补录游客信息初始化游客
            if (index < 1) return;
            let searchInput = [];
            for (let i = 0; i < index; i++) {
                this.searchInput.push(
                    Object.assign({}, this.searchInput[0], {
                        touristTypeName: name
                    })
                );
            }
        },
        touristNum(index, item) {
            //初始化游客数量
            console.log(index, "index");
            if (index >= 1) {
                this.Numbercount(item.other_name || "成人", 1);
                index - 1 > 0 && this.touristNum(index - 1, item);
            }
        },
        addTouristType(k) {
            //选择游客类型并添加到searchInput
            let pkgList = this.searchInput[0].pkgList;
            let index = k === "成人" ? 1 : k === "儿童" ? 2 : 0;
            let temp = "";
            let Newly = false;
            let packageNameIndex = 0,
                touriTypeIndex = "";
            for (let i in pkgList) {
                temp = pkgList[i].item.filter((j, tourIndex) => {
                    if (Number(j.type) === index) {
                        packageNameIndex = Number(i);
                        touriTypeIndex = tourIndex;
                    }
                });
                if (touriTypeIndex !== "") break;
            }
            if (touriTypeIndex === "") {
                this.$message.error(`当前套餐下没有您选择的游客类型`);
                Newly = false;
                return;
            } else {
                let data = this.searchInput[0];
                this.searchInput.push({
                    name: "",
                    nationality: "中国",
                    phone: "",
                    issue: "",
                    idType: 1,
                    id: "",
                    idDate: "",
                    issign: "",
                    date: "",
                    gender: "1",
                    roomDiff: 0, //单房差
                    cityIndex: this.searchInput[0].cityIndex || 0,
                    packageNameIndex,
                    touriTypeIndex,
                    pkgList: data.pkgList,
                    pkg: {},
                    touriType: data.pkgList[packageNameIndex].item
                });
                Newly = true;
            }
            return Newly;
        },
        sorttourist(num, item) {
            if (num > 0) {
                this.newOrderTourist.push(item);
                num = num - 1;
                num && this.sorttourist(num, item);
            }
        },
        countTotalPrice(searchInput) {
            //初始化价格
            let { newOrderTourist, isorderID } = this;
            searchInput = searchInput.length ? searchInput : this.searchInput;
            if (searchInput.length === 1) {
                let Info = searchInput[0];
                let pkgList = Info.pkgList;
                console.log(newOrderTourist, "newOrderTourist");
                let data =
                    isorderID === 0
                        ? newOrderTourist[0]
                        : pkgList[Info.packageNameIndex].item[
                              Info.touriTypeIndex
                          ];
                if (searchInput[0].roomDiff) {
                    this.arrRoomDiff = {
                        //单房差
                        price: Number(this.roomDiff),
                        index: 1,
                        TotalPrice: this.roomDiff * 1
                    };
                } else {
                    this.arrRoomDiff.TotalPrice = 0;
                }
                this.touristInfo = {
                    total_amount:
                        Number(
                            this.numPR([
                                isorderID === 0
                                    ? data.sale_price
                                    : data.sales_price
                            ])
                        ) + this.arrRoomDiff.TotalPrice,
                    total_peer_amount:
                        Number(this.numPR([data.settle_price])) +
                        this.arrRoomDiff.TotalPrice,
                    profit: this.numPR([data.profit])
                };
                this.TotalNumber = [
                    {
                        id: data.id,
                        type: data.other_name, //类型
                        index: 1,
                        price:
                            this.orderType === 2
                                ? data.settle_price
                                : isorderID === 0
                                ? data.sale_price
                                : data.sales_price, //套餐单价
                        // totalPrice: (Number(data.sales_price)*1).toFixed(2),//套餐总价
                        package_name: data.package_name, //套餐名
                        city_name: data.city_name //出发城市
                    }
                ];
                return;
            }
            let touristInfo = {
                    total_amount: 0,
                    total_peer_amount: 0,
                    profit: 0
                },
                TotalNumber = [],
                obj = {};
            let arrRoomDiff = {
                //单房差
                price: this.roomDiff,
                index: 0
            };
            searchInput.forEach((cur, i) => {
                let data =
                    isorderID === 0
                        ? newOrderTourist[i]
                        : cur.pkgList[cur.packageNameIndex].item[
                              cur.touriTypeIndex
                          ];
                //计算单房差
                if (cur.roomDiff) {
                    arrRoomDiff.index = arrRoomDiff.index + 1;
                }
                if (obj[data.id]) {
                    obj[data.id] = obj[data.id] + 1;
                } else {
                    TotalNumber.push({
                        id: data.id,
                        type: data.other_name || data.name, //类型
                        index: 1,
                        price:
                            this.orderType === 2
                                ? data.settle_price
                                : isorderID === 0
                                ? data.sale_price
                                : data.sales_price, //套餐单价
                        package_name: data.package_name, //套餐名
                        city_name: data.city_name //出发城市
                    });
                    obj[data.id] = 1;
                }
                if (i === 0) return;
                let pre = searchInput[i - 1];
                let newCur = cur.touriType[cur.touriTypeIndex];
                let newPer = pre.touriType[pre.touriTypeIndex];
                let curSales_price =
                    isorderID === 0
                        ? newOrderTourist[i].sale_price
                        : newCur.sales_price || 0;
                let preSales_price =
                    isorderID === 0
                        ? newOrderTourist[i - 1].sale_price
                        : newPer.sales_price || 0;
                let curSettle_price =
                    isorderID === 0
                        ? newOrderTourist[i].settle_price
                        : newCur.settle_price || 0;
                let preSettle_price =
                    isorderID === 0
                        ? newOrderTourist[i - 1].settle_price
                        : newPer.settle_price || 0;
                let curProfit =
                    isorderID === 0
                        ? newOrderTourist[i].profit
                        : newCur.profit || 0;
                let preprofit =
                    isorderID === 0
                        ? newOrderTourist[i].profit
                        : newPer.profit || 0;
                touristInfo = {
                    total_amount: this.numPR([
                        touristInfo.total_amount,
                        curSales_price,
                        i > 1 ? 0 : preSales_price
                    ]),
                    total_peer_amount: this.numPR([
                        curSettle_price,
                        i > 1 ? 0 : preSettle_price,
                        touristInfo.total_peer_amount
                    ]),
                    profit: this.numPR([
                        curProfit,
                        i > 1 ? 0 : preprofit,
                        touristInfo.profit
                    ]),
                    deposit: (
                        Number(this.deposit) * searchInput.length
                    ).toFixed(2)
                };
            });
            TotalNumber.forEach((i, j) => {
                if (obj[i.id]) {
                    TotalNumber[j].index = obj[i.id];
                }
            });
            //单房差计算
            arrRoomDiff.TotalPrice = arrRoomDiff.price * arrRoomDiff.index;
            touristInfo.total_amount =
                Number(touristInfo.total_amount) + arrRoomDiff.TotalPrice;
            touristInfo.total_peer_amount =
                Number(touristInfo.total_peer_amount) + arrRoomDiff.TotalPrice;
            this.arrRoomDiff = arrRoomDiff;
            console.log(touristInfo, "touristInfo");
            this.TotalNumber = TotalNumber;
            this.touristInfo = touristInfo;
        },
        numPR(cur, total = 0) {
            total =
                cur.length === 0 ? total : Number(cur.shift()) + Number(total);
            return cur.length === 0 ? total.toFixed(2) : this.numPR(cur, total);
        },
        changeIdCard(id, idType, k) {
            if ((id.length !== 15 || id.length !== 18) && idType !== 1) return;
            let sex = this.getSex(id);
            let Birth = this.getBirth(id);
            this.$set(this.searchInput[k], "gender", sex + "");
            this.$set(this.searchInput[k], "date", Birth);
        },
        getSex(idCard) {
            let temp = parseInt(idCard.slice(-2, -1)) % 2 == 1 ? 1 : 2;
            return temp;
        },
        getBirth(idCard) {
            var birthday = "";
            if (idCard) {
                if (idCard.length == 15) {
                    birthday = "19" + idCard.slice(6, 12);
                } else if (idCard.length == 18) {
                    birthday = idCard.slice(6, 14);
                }
                birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
            }
            return birthday;
        }
    }
};
</script>

<style scoped lang="scss">
.el-radio,
.el-checkbox {
    line-height: 35px;
}
.wrapper {
    width: 1220px;
    overflow: hidden;
    background: #f5f5f5;
}
.wrapper-left {
    width: 850px;
    overflow: hidden;
    display: inline-block;
    .title {
        width: 100%;
        height: 58px;
        line-height: 58px;
        padding-left: 20px;
        color: black;
        font-size: 18px;
        font-weight: bold;
        span {
            display: inline-block;
            vertical-align: top;
        }
    }
    .title::before {
        content: "";
        width: 3px;
        height: 28px;
        background: #b3238b;
        display: inline-block;
        margin: 15px 10px 15px 0;
    }
    .info-number {
        > div {
            display: inline-block;
            margin-right: 10px;
            .k {
                margin: 0 6px;
            }
            > div {
                display: inline-block;
            }
        }
        div span {
            display: inline-block;
            height: 30px;
            text-emphasis: center;
            line-height: 30px;
            width: 40px;
            border-radius: 3px;
            border: 1px solid #c4c6cf;
            cursor: pointer;
            text-align: center;
            font-size: 18px;
        }
        .NumberI {
            width: 80px;
            margin: 0 2px;
        }
    }
}
.wrapper-right {
    width: 350px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
}
.linesInfo {
    width: 100%;
    background: white;
    padding: 15px 20px;
    box-sizing: border-box;
    .p {
        font-size: 14px;
        span {
            color: #888888;
            font-size: 12px;
            margin-left: 20px;
        }
        span.activity {
            color: #b3238b;
            font-size: 14px;
        }
    }
    .div {
        margin-top: 15px;
        span {
            color: #000000;
            font-size: 14px;
            // margin: 0 3px;
            padding: 0 10px;
            border-right: 1px solid #cccccc;
        }
        span:nth-child(1) {
            padding: 0 10px 0 0;
        }
        span:nth-last-child(1) {
            border-right: 0;
        }
    }
}
.touristInfo {
    padding: 0 20px 20px 20px;
    background: white;
    margin-top: 20px;
    .Info-title {
        position: relative;
        border-bottom: 1px solid #e0e0e0;
        div {
            color: black;
            font-weight: bold;
            line-height: 45px;
            font-size: 16px;
        }
        div.download {
            position: absolute;
            right: 30px;
            top: 0;
            > span {
                color: #b3238b;
                font-size: 14px;
                margin-right: 20px;
                cursor: pointer;
            }
            div {
                display: inline-block;
                width: 110px;
                height: 34px;
                position: relative;
                input {
                    position: absolute;
                    opacity: 0;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 110px;
                    height: 34px;
                    cursor: pointer;
                }
            }
            .excel {
                display: block;
                border: 1px solid #b3238b;
                width: 110px;
                height: 34px;
                color: #b3238b;
                font-size: 14px;
                line-height: 34px;
                text-align: center;
            }
        }
    }
    .info-content {
        margin-top: 20px;
        .listsign {
            width: 100%;
            overflow: hidden;
            margin: 20px 0;
            position: relative;
            border-bottom: 1px solid #e0e0e0;
            h2 {
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
            .countNumbers {
                position: absolute;
                top: 0;
                right: 0;
            }
            span {
                cursor: pointer;
                display: inline-block;
                margin-right: 20px;
                width: 30px;
                font-size: 30px;
                color: white;
                background: #c6169d;
                text-align: center;
                border-radius: 50%;
                line-height: 30px;
                height: 30px;
            }
            span.active {
                background: #cccccc;
            }
        }
        .search-item {
            width: 100%;
            overflow: hidden;
            margin: 11px 0;
            .Packagechecked {
                display: inline-block;
                overflow: hidden;
                span {
                    display: inline-block;

                    padding: 0 10px;
                    color: black;
                    font-size: 14px;
                    line-height: 30px;
                    text-align: center;
                    border: 1px solid #fdf6fb;
                    background: #fdf6fb;
                    margin-right: 10px;
                    cursor: pointer;
                }
                .active {
                    color: #b3238b;
                    border: 1px solid #b3238b;
                }
            }
            .label {
                width: 100px;
                float: left;
                color: #999999;
                line-height: 35px;
                text-align: right;
                margin-right: 30px;
            }
            .el-input {
                float: left;
                width: 360px;
            }
        }
    }
}
.contract {
    background: white;
    margin-top: 20px;
    overflow: hidden;
    .contract-title {
        height: 55px;
        line-height: 55px;
        width: 100%;
        margin: 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #e0e0e0;
        h2 {
            display: inline-block;
            color: #333;
            font-weight: bold;
            font-size: 16px;
        }
        span {
            margin-left: 20px;
            display: inline-block;
            color: #888888;
            font-size: 12px;
        }
    }
    .contract-Info {
        width: 100%;
        margin: 20px 20px 80px 20px;
        span {
            cursor: pointer;
            display: inline-block;
            padding: 8px 20px;
            margin-right: 10px;
            border: 1px solid white;
            text-align: center;
            background: #fdf6fb;
            color: #333;
            font-size: 14px;
        }
        span.active {
            border: 1px solid #b3238b;
            color: #b3238b;
        }
    }
}
.contacts {
    width: 100%;
    overflow: hidden;
    background: white;
    margin: 20px 0;
    .contacts-title {
        height: 55px;
        line-height: 55px;
        width: 100%;
        margin: 0 20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #e0e0e0;
        h2 {
            color: #333;
            font-weight: bold;
            font-size: 16px;
        }
    }
    .search-item {
        margin: 8px 0;
    }
    .search-item .label {
        width: 100px;
        float: left;
        color: #999999;
        line-height: 35px;
        text-align: right;
        margin-right: 30px;
    }
    .search-item .el-input {
        width: 360px;
    }
    .el-textarea {
        width: 360px;
    }
}
.wrapper-right {
    width: 350px;
    display: inline-block;
    vertical-align: top;
    margin-left: 12px;
    margin-top: 58px;
    .title {
        background: white;
        width: 100%;
        height: 58px;
        line-height: 58px;
        padding-left: 20px;
        color: black;
        font-size: 18px;
        font-weight: bold;
        span {
            display: inline-block;
            vertical-align: top;
        }
    }
    .title::before {
        content: "";
        width: 3px;
        height: 28px;
        background: #b3238b;
        display: inline-block;
        margin: 15px 10px 15px 0;
    }
    .tourfee {
        background: white;
        padding: 10px 20px;
        width: 100%;
        box-sizing: border-box;
        div {
            margin-bottom: 6px;
            span {
                color: #333333;
                margin: 3px;
            }
            .totalPrice {
                color: #f47e20;
            }
        }
    }
    .secondTitle {
        color: #333333;
        line-height: 30px;
        margin-left: 10px;
    }
    .Insurance {
        background: white;
        padding: 0 20px;
        ul li {
            padding: 20px 3px;
            width: 100%;
            box-sizing: border-box;
            span {
                color: #888888;
                font-size: 12px;
                float: left;
            }
            .Insurance-val {
                float: right;
                color: #333333;
            }
        }
    }
    .order-details {
        background: white;
        padding: 0 20px;
        ul {
            margin: 10px 0;
        }
        ul li {
            padding: 20px 3px;
            width: 100%;
            box-sizing: border-box;
            span {
                color: #888888;
                font-size: 12px;
                float: left;
            }
            .details-val {
                float: right;
                color: #f47e20;
            }
            .details-price {
                float: right;
                color: #333333;
            }
        }
        .submit {
            margin: 70px 12px 20px 0;
            > div {
                cursor: pointer;
                width: 110px;
                border: 1px solid #b3238b;
                color: #b3238b;
                font-size: 14px;
                text-align: center;
                line-height: 34px;
                margin: auto;
            }
            .submit-right {
                width: 160px;
                color: white;
                background: #c6169d;
            }
        }
    }
    .changePrice {
        cursor: pointer;
        border: 1px solid #dbdbdb;
        background: white;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        margin: 10px 0;
    }
    .changePriceList {
        margin-bottom: 10px;
        width: 100%;
        background: white;
        padding: 10px;
        box-sizing: border-box;
        .div-top {
            width: 100%;
            overflow: hidden;
            border-bottom: 1px solid #e0e0e0;
            line-height: 40px;
            h2 {
                color: #333333;
                font-size: 14px;
                float: left;
            }
            span {
                cursor: pointer;
                color: #b3238b;
                font-size: 12px;
                float: right;
            }
        }
        .div-content {
            margin: 20px 0;
            .search-item {
                width: 100%;
                overflow: hidden;
                margin-bottom: 10px;
            }
            .label {
                width: 60px;
                float: left;
                color: #999999;
                line-height: 35px;
                text-align: right;
                margin-right: 30px;
            }
            .el-input {
                width: 230px;
                float: left;
            }
            .el-textarea {
                width: 230px;
                float: left;
            }
            .inputembed {
                border: 1px solid #dcdfe6;
                float: left;
                width: 160px;
                overflow: hidden;
                margin-left: 8px;
                input {
                    width: 130px;
                    border: none;
                    display: inline-block;
                    line-height: 35px;
                    font-size: 12px;
                    color: #333333;
                    outline: none;
                    padding: 0 6px;
                }
                span {
                    line-height: 35px;
                    color: #333333;
                    font-size: 12px;
                    display: inline-block;
                }
            }
        }
    }
}
.form-group .label::before {
    content: " *";
    color: #ff3000;
    margin-right: 6px;
    font-size: 150%;
    vertical-align: -webkit-baseline-middle;
    vertical-align: middle;
}
</style>
