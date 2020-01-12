<template>
    <div class="baseInfo">
        <!-- 1.基本信息 -->
        <div class="base-head">
            <h3 class="base-h3">基本信息</h3>
            <ul class="product-list">
                <li class="product-item">
                    <div class="title">
                        <div tag="h3">
                            <el-button type="text">
                                <h3 class="name">
                                    <span v-for="(item,idx) in lineInfo.trip_type" :key="idx">[{{item.trip_name}}]</span>
                                    <span style="margin: 0 20px">{{lineInfo.line_title}}</span>
                                </h3>
                            </el-button>
                        </div>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            出 发 地：
                            <span v-for="(item,idx) in lineInfo.departure" :key="idx">{{item.city_name}}&nbsp;</span>
                        </el-col>
                        <el-col :span="6">
                            <span class="sp">|</span>
                            线路分类:{{lineInfo.class_id_1_name}}>{{lineInfo.class_id_2_name}}>{{lineInfo.class_id_3_name}}
                        </el-col>
                        <el-col :span="6">
                            <span class="sp">|</span>
                            行程天数:{{lineInfo.line_day}}天{{lineInfo.line_night}}晚
                        </el-col>
                        <el-col :span="6">
                            <span class="sp">|</span>
                            目 的 地:
                            <span v-for="(k,i) in lineInfo.destination" :key="i+'a'">{{k.city_name}}&nbsp;</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">线路负责人:{{lineInfo.operator.name}}</el-col>
                        <el-col :span="6">
                            <span class="sp">|</span>
                            创建时间:{{lineInfo.create_time}}
                        </el-col>
                        <el-col :span="6">
                            <span class="sp">|</span>
                            供应商:{{lineInfo.supply_info.name}}
                        </el-col>
                        <el-col :span="6">
                            <!-- <span class="sp">|</span>
              上架渠道:{{lineInfo.channel}}-->
                        </el-col>
                    </el-row>
                </li>
                <li>
                    <span style="margin-right:10px">线路标签:</span>
                    <el-tag type="info" v-for="(item,idx) in lineInfo.line_tags" :key="idx" style="margin:5px">{{item.theme_name}}</el-tag>
                </li>
                <li class="linePics">
                    <div>行程图片:</div>
                    <div v-for="(img, key) in lineInfo.line_imgs" :key="key" class="picInfo">
                        <div class="isDefault" v-if="img.is_cover==1">
                            <i>首</i>
                        </div>
                        <img :src="img.url" />
                    </div>
                </li>
            </ul>
        </div>

        <!--2.团期信息  -->
        <div class="tour-info" v-loading="stockLoading">
            <h3 class="base-h3">团期信息</h3>
            <el-row :gutter="20">
                <el-col :span="10" class="tuan-left">
                    <div class="tuanMod">
                        <span class="spBoxLeft">团期个数: {{calendarInfo.summary.total}}</span>
                        <span class="spBox">
                            <span style="item-span">
                                <i class="icons orange"></i>
                                销售中 {{calendarInfo.summary.sales}}
                            </span>
                            <span>
                                <i class="icons blue"></i>
                                已截止 {{calendarInfo.summary.ended}}
                            </span>
                            <span>
                                <i class="icons gray"></i>
                                已停团 {{calendarInfo.summary.stop}}
                            </span>
                        </span>
                    </div>
                    <stock-calendar v-model="selectedDate" class="calendar newCal" :calendarData="formatData" :multiple="false" :selectable="calendarCellDisabled">
                        <template v-slot:cell="{date, meta, disabled}">
                            <div class="coutent" v-if="Object.keys(meta).length !== 0" :class="meta | getClassNames">
                                <div class="item-date">
                                    <span>{{date.split('-')[2]}}</span>
                                </div>
                                <div class="date-data">
                                    <div v-if="meta.is_confirm==1" style="font-size:10px">二次确认</div>
                                    <div class="stock" v-else>{{meta | mapCountText}}</div>
                                    <div class="pirce">￥{{meta.sales_price}}</div>
                                </div>
                            </div>
                        </template>
                    </stock-calendar>
                </el-col>
                <el-col :span="14" class="tuan-right">
                    <h3 class="base-h3">
                        <span>团期:{{tourPrice.base.day}}</span>
                        <el-tag type="danger" size="mini" style="margin-left:10px">{{tourPrice.base.quote_status | tuanStatus}}</el-tag>
                    </h3>
                    <div class="tourList">
                        <div class="tuan-item">
                            <span>团号: {{tourPrice.base.quote_no}}</span>
                            <span>| 新增时间: {{tourPrice.base.create_time}}</span>
                        </div>
                        <div class="tuan-item" v-if="tourPrice.base.is_confirm==0">
                            <span>收客: 已收 {{tourPrice.base.booking_stock}}</span>
                            <span>| 余 {{tourPrice.base.balance}}</span>
                            <span>| 库存 {{tourPrice.base.stock}}</span>
                        </div>
                        <div class="tuan-item" v-else>
                            <span>收客: 已收 {{tourPrice.base.confirm_num}}</span>
                        </div>
                        <div class="tuan-item">
                            <span>报名截止时间: {{tourPrice.base.end_date_time}}</span>
                            <span v-if="tourPrice.base.is_confirm==0">| 预占位有效时间: {{tourPrice.base.seat_end_time}} {{tourPrice.base.seat_end_type | seatType}}</span>
                            <span v-if="tourPrice.base.is_confirm==0">| 付款有效时间: {{tourPrice.base.pay_end_time}} {{tourPrice.base.pay_end_type | endType}}</span>
                        </div>
                        <div class="tuan-item">
                            <span>定金: {{tourPrice.base.deposit}}</span>
                            <span>| 定金说明: {{tourPrice.base.deposit_desc}}</span>
                        </div>
                        <div class="tuan-item">
                            <span style="width:80px;">出发城市:</span>
                            <el-select v-model="departCity" placeholder="请选择">
                                <el-option v-for="item in cityOptions" :key="item.city_id" :label="item.city_name" :value="item.city_id"></el-option>
                            </el-select>
                            <span style="width:80px;">选择套餐:</span>
                            <el-select v-model="packages" placeholder="请选择">
                                <el-option v-for="item in packageOptions" :key="item.package_id" :label="item.package_name" :value="item.package_id"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <el-table border :data="tableData" class="tabRight" width="100%">
                        <el-table-column label="价格类型" header-align="center" align="center" prop="other_name"></el-table-column>
                        <el-table-column prop="settle_price" label="结算价" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="sales_price" header-align="center" align="center" label="销售价"></el-table-column>
                        <el-table-column prop="online_price" header-align="center" align="center" label="网上预定价"></el-table-column>
                        <el-table-column prop="price_desc" header-align="center" align="center" label="价格说明"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <!-- 3行程介绍 -->
        <div class="tour-progress" ref="scrollTop">
            <ol id="tripTour" :class="{'is_fixed' : isFixed}">
                <li @click="scrollTopPoint($event,'spec')" id="liSpec" v-if="lineInfo.special!=''" class="acticeClass">
                    <a>行程特色</a>
                </li>
                <li @click="scrollTopPoint($event,'line')" id="liLine">
                    <a>行程介绍</a>
                </li>
                <li @click="scrollTopPoint($event,'fee')" id="liFee">
                    <a>费用信息</a>
                </li>
                <li @click="scrollTopPoint($event,'shopAndFee')" id="lishopFee">
                    <a>购物计划和自费项目</a>
                </li>
                <li @click="scrollTopPoint($event,'visa')" id="liVisa" v-if="JSON.stringify(visaUpload) !== '{}' || vl!=0">
                    <a>签证信息</a>
                </li>
                <li @click="scrollTopPoint($event,'order')" id="liOrder" v-if="tourInfo.book.content!=''">
                    <a>预定须知</a>
                </li>
                <li @click="scrollTopPoint($event,'sef')" id="liSef" v-if="tourInfo.security.content!=''">
                    <a>安全说明</a>
                </li>
                <li @click="scrollTopPoint($event,'notice')" id="liNotice" v-if="tourInfo.notice.content!=''">
                    <a>温馨提示</a>
                </li>
            </ol>
            <div id="tourDetail">
                <div id="spec" class="detail-item" v-if="lineInfo.special!=''">
                    <h3>
                        <span class="spSquare">■</span>
                        <span>行程特色</span>
                    </h3>
                    <div class="con-item">{{lineInfo.special}}</div>
                </div>
                <div class="detail-item" id="line" v-if="tripInfo.is_full_trip==0">
                    <h3>
                        <span class="spSquare">■</span>
                        <span>行程介绍</span>
                    </h3>
                    <div>
                        <a class="el-button el-button--primary" :href="tripInfo.attachment">下载行程信息</a>
                    </div>
                </div>
                <div class="detailOne" id="line" v-else>
                    <ul id="dayDetail">
                        <li v-for="(item,idx) in tripInfo.trip_list" :key="idx" @click="addactiveClass($event,idx)" :class="`dayItem${idx}`">
                            <span>{{item.day_name}}</span>
                        </li>
                    </ul>
                    <div class="intTour">
                        <h3>
                            <span class="spSquare">■</span>
                            <span>行程介绍</span>
                        </h3>
                        <p style="margin:10px 0">集合时间:{{tripInfo.assemble.assemble_time}}</p>
                        <p>集合地点:{{tripInfo.assemble.location}}</p>
                        <div id="dayOne">
                            <div v-for="(item,idx) in tripInfo.trip_list" :key="idx" :class="`everyDay${idx}`">
                                <h3 style="margin:20px 0">
                                    <span style="color:rgba(179, 35, 139, 1)">{{item.day_name}}</span>
                                    <span style="margin-left:20px">{{item.title}}</span>
                                </h3>
                                <div class="tourPrice">
                                    <el-steps direction="vertical" :active="1" class="progress" space="100px">
                                        <el-step title="用餐">
                                            <i class="iconImg iconOne" slot="icon"></i>
                                            <template slot="description">
                                                <div v-for="(k,i) in item.diet" :key="i">{{k.type_name+" "+k.content}}</div>
                                            </template>
                                        </el-step>
                                        <el-step title="酒店" :description="item.hotel_name">
                                            <i class="iconImg iconTwo" slot="icon"></i>
                                        </el-step>
                                        <el-step title="交通" :description="item.traffic">
                                            <i class="iconImg iconThree" slot="icon"></i>
                                        </el-step>
                                        <el-step title="行程说明" class="last-step">
                                            <i class="iconImg iconFour" slot="icon"></i>
                                            <template slot="description">
                                                <div>{{item.desc}}</div>
                                                <div>
                                                    <img v-for="(k,i) in item.imgs" :key="i" :src="k.url" alt class="trip-imgs" />
                                                </div>
                                            </template>
                                        </el-step>
                                    </el-steps>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="fee" class="detail-item">
                    <div v-if="include">
                        <h3>
                            <span class="spSquare">■</span>
                            <span>费用包含</span>
                        </h3>
                        <el-table :data="include" border :show-header="false" style="width: 80%" class="feeTable">
                            <el-table-column width="200px" align="center">
                                <template slot-scope="scope">{{scope.row.fee_type_name}}</template>
                            </el-table-column>
                            <el-table-column align="left">
                                <template slot-scope="scope">{{scope.row.fee_desc}}</template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-if="exclude">
                        <h3>
                            <span class="spSquare">■</span>
                            <span>费用不包含</span>
                        </h3>
                        <el-table :data="exclude" border :show-header="false" style="width: 80%" class="feeTable">
                            <el-table-column width="200px" align="center">
                                <template slot-scope="scope">{{scope.row.fee_type_name}}</template>
                            </el-table-column>
                            <el-table-column align="left">
                                <template slot-scope="scope">{{scope.row.fee_desc}}</template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div id="shopAndFee" class="detail-item">
                    <div>
                        <h3>
                            <span class="spSquare">■</span>
                            <span>购物计划</span>
                        </h3>
                        <el-table :data="shopping" border style="width: 80%">
                            <el-table-column width="200px" align="center" label="具体时间" prop="start_time"></el-table-column>
                            <el-table-column align="left" label="地点" prop="place"></el-table-column>
                            <el-table-column align="left" label="购物场所名称" prop="shopping_location"></el-table-column>
                            <el-table-column align="left" label="经营项目" prop="detail"></el-table-column>
                            <el-table-column align="left" label="最长停留时间" prop="stay_time"></el-table-column>
                            <el-table-column align="left" label="其他说明" prop="remark"></el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <h3>
                            <span class="spSquare">■</span>
                            <span>自费项目</span>
                        </h3>
                        <el-table :data="selfPay" border style="width: 80%">
                            <el-table-column width="200px" align="center" label="具体时间" prop="start_time"></el-table-column>
                            <el-table-column align="left" label="地点" prop="place"></el-table-column>
                            <el-table-column align="left" label="项目名称和内容" prop="shopping_location"></el-table-column>
                            <el-table-column align="left" label="费用" prop="detail"></el-table-column>
                            <el-table-column align="left" label="项目时长" prop="stay_time"></el-table-column>
                            <el-table-column align="left" label="其他说明" prop="remark"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div id="visa" class="detail-item" v-if="JSON.stringify(visaUpload) !== '{}' || vl!=0">
                    <h3>
                        <span class="spSquare">■</span>
                        <span>签证信息</span>
                    </h3>
                    <div v-if="JSON.stringify(visaUpload) !== '{}'" style="margin:10px 0">
                        <a class="el-button el-button--primary" :href="uploadDown">下载签证信息</a>
                    </div>
                    <el-table :data="visaFill" border width="100%" v-if="vl!=0">
                        <el-table-column label="身份类型" align="center" width="250px" prop="id_desc"></el-table-column>
                        <el-table-column label="需要提交材料" align="center" prop="file_data"></el-table-column>
                        <el-table-column label="详细说明" align="center" prop="file_data_desc"></el-table-column>
                    </el-table>
                </div>
                <div id="order" class="detail-item" v-if="tourInfo.book.content!=''">
                    <h3>
                        <span class="spSquare">■</span>
                        <span>预定须知</span>
                    </h3>
                    <div class="con-item">{{tourInfo.book.content}}</div>
                </div>
                <div id="sef" class="detail-item" v-if="tourInfo.security.content!=''">
                    <h3>
                        <span class="spSquare">■</span>
                        <span>安全说明</span>
                    </h3>
                    <div class="con-item">{{tourInfo.security.content}}</div>
                </div>
                <div id="notice" class="detail-item" v-if="tourInfo.notice.content!=''">
                    <h3>
                        <span class="spSquare">■</span>
                        <span>温馨提示</span>
                    </h3>
                    <div class="con-item">{{tourInfo.notice.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StockCalendar from "src/components/template/common/stock-calendar";
import TourIntroduce from "./components/tourIntroduce";
import {
    lineOrderSaleLineInfo,
    lineOrderSaleTripInfo,
    lineOrderSaleMiscInfo,
    getStockDetail,
    getCalendarList
} from "src/api/touristroute";
import Moment from "moment";
import * as common from "src/utils/common";
export default {
    data() {
        return {
            value: new Date(),
            stockLoading: false,
            activeName: "first", //上方tabs
            tabPosition: "left", //左侧tabs
            lineInfo: {
                //基本信息
                trip_type: [],
                departure: [], //出发地
                destination: [], //目的地
                line_imgs: [], //行程图片
                supply_info: {}, //供应商
                operator: {}, //线路负责人
                line_tags: [] //线路标签
            },
            tripInfo: {
                //行程介绍
                assemble: {},
                trip_list: [],
                attachment: "", //建议行程下载地址
                is_full_trip: "" //0简易 1完整
            },
            tourInfo: {
                fee: {
                    //费用信息
                },
                trip_spec: {}, //行程特色
                fee: {
                    //费用信息
                },
                book: {}, //预定须知
                security: {}, //安全说明
                notice: {}, //温馨提示
                visa: [] //签证信息
            },
            include: [],
            exclude: [],
            shopping: [],
            selfPay: [],
            num: "",
            selectedDate: [], //日历
            tourPrice: {
                //团期报价
                base: {},
                pkg_list: []
            },
            calendarInfo: {
                summary: {}
            },
            // cityOptions: [], //出发城市
            // packageOptions: [], //选择套餐
            // tableData: [], //
            packageList: [], //套餐表格数据
            tableCitylist: [],
            departCity: "",
            packages: "",
            calendarList: [], //日历报价信息
            tuan_id: "",
            tuanDate: "",
            mrDate: "",
            dayTime: [],
            m: "",
            line_id: "",
            vh: "",
            isFixed: "",
            nowFixed: "",
            exFee: "",
            inFee: "",
            visaFill: [], //手动
            visaUpload: {}, //上传
            vl: "",
            uploadUrl: "",
            dataArr: null
        };
    },
    filters: {
        mapCountText(data) {
            if (data.is_confirm == 1) {
                return "二次确认";
            }
            if (data.stock != 0) {
                return "余 " + data.balance_stock;
            }
            return "";
        },
        mapPackageName(type) {
            switch (type) {
                case "1":
                    return "成人价";
                case "2":
                    return "儿童价";
                default:
                    return "老人价";
            }
        },
        tuanStatus(status) {
            let val = status * 1;
            switch (val) {
                case 1:
                    return "销售中";
                    break;
                case 2:
                    return "已截止";
                    break;
                case 3:
                    return "已出发";
                    break;
                case 4:
                    return "已停止";
                    break;
            }
        },
        seatType(status) {
            let val = status * 1;
            switch (val) {
                case 1:
                    return "分钟";
                    break;
                case 2:
                    return "小时";
                    break;
                case 3:
                    return "天";
                    break;
            }
        },
        endType(status) {
            let val = status * 1;
            switch (val) {
                case 1:
                    return "分钟";
                    break;
                case 2:
                    return "小时";
                    break;
                case 3:
                    return "天";
                    break;
            }
        },

        getClassNames(data) {
            // let data = datas[day];
            if (!data) {
                return {};
            }
            let quote_status = data.quote_status;
            return {
                sales: quote_status == 1,
                stop: quote_status == 2,
                end: quote_status == 4,
                over: quote_status == 3
            };
        }
    },
    computed: {
        formatData() {
            let data = {};
            this.calendarList.forEach(item => {
                data[item.day] = item;
            });
            return data;
        },
        uploadDown() {
            // return window.location.origin+window.location.pathname+this.uploadUrl
            return this.uploadUrl;
        },
        cityOptions() {
            if (this.packageList.length == 0) {
                return [];
            }
            return this.packageList.map(item => item.city);
        },
        packageOptions() {
            if (this.packageList.length === 0) {
                return [];
            }
            let selectedPackage = this.packageList.find(
                item => item.city.city_id === this.departCity
            );
            return selectedPackage.pkg;
        },
        tableData() {
            if (this.packageList.length === 0) {
                return [];
            }
            let cityData = this.packageList.find(
                item => item.city.city_id === this.departCity
            );
            let packageData = cityData.pkg.find(
                item => item.package_id == this.packages
            );
            return packageData.item;
        }
    },
    watch: {
        selectedDate(val) {
            // console.log("111val", val);
            // this.departCity = "";
            // this.packages = "";
            // this.tableData = [];
            // this.cityOptions = [];
            // this.packageOptions = [];
            // this.tuanDate = val[val.length - 1];
            // this.tuan_id = "";
            // this.calendarList.forEach(item => {
            //     if (this.tuanDate == item.day) {
            //         this.tuan_id = item.id;
            //     }
            // });

            //
            this.tuanDate = val[0];
            this.getTuanData();
        },

        cityOptions(newVal) {
            this.departCity = newVal[0].city_id;
        },
        packageOptions(newVal) {
            this.packages = newVal[0].package_id;
        }
        // selcetPackage(newVal) {
        // this.selcetPackage(newVal);
        // }
    },
    mounted() {
        this.getBaseInfo();
        this.line_id = this.$route.query.line_id;
        window.addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, true);
    },

    components: {
        StockCalendar,
        TourIntroduce
    },
    methods: {
        //滚动事件
        handleScroll() {
            // let scrollToTop = document.documentElement.scrollTop;
            let scrollToTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            let topHeight = document.getElementById("tripTour").offsetHeight;
            this.vh = this.$refs.scrollTop.offsetTop - topHeight;
            this.isFixed = scrollToTop > this.vh ? true : false;
            //顶部tab
            var navBoxChild1 = document.getElementById("tripTour").children;
            //底部切换
            var textChild1 = document.getElementById("tourDetail").children;
            for (var i = 0; i < navBoxChild1.length; i++) {
                if (scrollToTop + a >= textChild1[i].offsetTop) {
                    for (var j = 0; j < navBoxChild1.length; j++) {
                        navBoxChild1[j].classList.remove("acticeClass");
                    }
                    navBoxChild1[i].classList.add("acticeClass");
                }
            }

            //判断是否是完整行程 1完整 0简易
            if (this.tripInfo.is_full_trip == 1) {
                //第一天距顶高度
                let toTop =
                    document.getElementById("dayOne").offsetTop - topHeight;
                //费用高度
                let feeTop =
                    document.getElementById("fee").offsetTop - topHeight;
                if (scrollToTop >= toTop && scrollToTop <= feeTop) {
                    document.getElementById("dayDetail").className =
                        "now_Fixed";
                    document.getElementsByClassName(
                        "intTour"
                    )[0].style.marginLeft = 111 + "px";
                } else {
                    document.getElementById("dayDetail").className = "";
                    document.getElementsByClassName(
                        "intTour"
                    )[0].style.marginLeft = 48 + "px";
                }

                //左侧天数
                var navBoxChild = document.getElementById("dayDetail").children;
                //右侧行程
                var textChild = document.getElementById("dayOne").children;
                var a = document.getElementById("tripTour").offsetHeight;
                //右侧行程滚动左侧天数添加样式
                for (var i = 0; i < navBoxChild.length; i++) {
                    if (scrollToTop + a >= textChild[i].offsetTop - 80) {
                        for (var j = 0; j < navBoxChild.length; j++) {
                            navBoxChild[0].classList.remove("dayItem0");
                            navBoxChild[j].classList.remove("is_Active");
                        }
                        navBoxChild[i].classList.add("is_Active");
                    }
                }
            } //行程结束

            //顶部tab
            var navBoxChild1 = document.getElementById("tripTour").children;
            //底部切换
            var textChild1 = document.getElementById("tourDetail").children;
            var a = document.getElementById("tripTour").offsetHeight;
            for (var i = 0; i < navBoxChild1.length; i++) {
                if (scrollToTop + a >= textChild1[i].offsetTop) {
                    for (var j = 0; j < navBoxChild1.length; j++) {
                        navBoxChild1[j].classList.remove("acticeClass");
                    }
                    navBoxChild1[i].classList.add("acticeClass");
                }
            }
        },

        //行程特色tab切换点击
        scrollTopPoint($event, id) {
            let scrollToTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            let toTopEvery = document.getElementById(id).offsetTop;
            let topHeight = document.getElementById("tripTour").offsetHeight;
            document.documentElement.scrollTop = toTopEvery - topHeight;
            document.body.scrollTop = toTopEvery - topHeight;
        },
        //第几天点击
        addactiveClass($event, idx) {
            let scrollToTop = document.documentElement.scrollTop;
            let topHeight = document.getElementById("tripTour").offsetHeight;
            var d = document
                .getElementById("dayDetail")
                .getElementsByTagName("li");
            let dayClassName = "everyDay" + idx;
            document.documentElement.scrollTop =
                document.getElementsByClassName(dayClassName)[0].offsetTop -
                topHeight -
                80;
            document.body.scrollTop =
                document.getElementsByClassName(dayClassName)[0].offsetTop -
                topHeight -
                80;
        },
        //选择出发城市
        // selectDepartCity(val) {
        //     console.log("城市套餐嵌套数组", this.packageList);
        //     let selected_city_data = this.packageList.find(
        //         item => val === item.city.city_id
        //     );
        //     this.packageOptions = selected_city_data.pkg;
        //     this.packages = this.packageOptions[0].package_name;
        //     // this.selcetPackage(this.packages);
        // },
        //选择套餐
        // selcetPackage(val) {
        //     let selected_package_data = this.packageOptions.find(
        //         item => item.package_id === val
        //     );
        //     this.tableData = selected_package_data.item;
        // },

        calendarCellDisabled(day) {
            // let enableDays = Object.keys(this.formatData);
            // return !enableDays.includes(day);
            let isDisabled = true;
            let enableDays = Object.keys(this.formatData);
            let nowDate = new Date().getTime();
            let calenderTime = new Date(day).getTime();
            if (calenderTime > nowDate && enableDays.includes(day)) {
                isDisabled = false;
            }
            return isDisabled; //!enableDays.includes(day);
        },
        //获取数据
        getBaseInfo() {
            let params = {
                id: this.$route.query.line_id
            };
            //基本信息
            lineOrderSaleLineInfo(params).then(res => {
                const { code, msg, data } = res;
                if (code == 0) {
                    this.lineInfo = data;
                    console.log("基本信息lineInfo", this.lineInfo);
                } else {
                    this.$message.error(msg);
                }
            });

            //团期信息-日历信息
            let params1 = {
                line_id: this.$route.query.line_id
            };
            getCalendarList(params1).then(res => {
                const { code, msg, data } = res;
                if (code == 0) {
                    this.calendarInfo = data;
                    this.calendarList = data.calender;
                    // 时间戳
                    let date = Moment().format("YYYY-MM-DD");
                    let curDate = new Date(date).getTime();
                    this.calendarList.forEach(item => {
                        let everDate = new Date(item.day).getTime();
                        return this.dayTime.push(everDate);
                    });
                    // console.log("xxxcurDate", curDate);
                    let arr = [];
                    this.dayTime.map(k => {
                        arr.push(k - curDate < 0 ? Infinity : k - curDate);
                        return arr;
                    });
                    let idx = arr.indexOf(Math.min(...arr));
                    if (this.calendarList.length) {
                        this.mrDate = this.calendarList[idx].day;
                    }
                    console.log("日历信息calendarInfo", this.calendarInfo);
                    if(data.calender.length){
                        this.selectedDate = [data.calender[0].day];
                    }
                } else {
                    this.$message.error(msg);
                }
            });

            // 行程介绍;
            lineOrderSaleTripInfo(params).then(res => {
                const { code, msg, data } = res;
                if (code == 0) {
                    this.tripInfo = data;
                    console.log("行程介绍tripInfo", this.tripInfo);
                } else {
                    this.$message.error(msg);
                }
            });
            // 行程特色;
            lineOrderSaleMiscInfo(params).then(res => {
                const { code, msg, data } = res;
                if (code == 0) {
                    this.tourInfo = data;
                    this.visaUpload = data.visa_cb.upload;
                    if (data.visa_cb.upload.attachment_url) {
                        this.uploadUrl = data.visa_cb.upload.attachment_url;
                    }
                    this.visaFill = data.visa_cb.fill;
                    this.vl = this.visaFill.length;
                    this.include = data.fee.include;
                    this.exclude = data.fee.exclude;
                    data.shopping.forEach(item => {
                        if (item.type == 2) {
                            this.selfPay.push(item);
                        } else {
                            this.shopping.push(item);
                        }
                    });
                    console.log(this.selfPay, this.shopping, "gouwu");
                    // console.log("行程特色tourInfo", this.tourInfo);
                } else {
                    this.$message.error(msg);
                }
            });
        },
        getTuanData() {
            //团期信息
            let params2 = {
                line_id: this.$route.query.line_id
            };
            if (this.tuanDate) {
                params2.day = this.tuanDate;
            } else {
                params2.day = this.mrDate;
            }
            this.stockLoading = true;
            getStockDetail(params2).then(res => {
                const { code, msg, data } = res;
                this.stockLoading = false;
                if (code == 0) {
                    // console.log("data",data)
                    this.dataArr = data;
                    if (JSON.stringify(data) == "[]") {
                        return;
                    } else {
                        this.tourPrice = data;
                        console.log("团期报价tourPrice", this.tourPrice);
                        this.packageList = data.pkg_list;
                        //城市套餐
                        // data.pkg_list.forEach(item => {
                        //     this.cityOptions.push(item.city);
                        // });

                        // data.pkg_list[0].pkg.forEach(p => {
                        //     this.packageOptions.push({
                        //         package_id: p.package_id,
                        //         package_name: p.package_name
                        //     });
                        // });

                        // this.departCity = this.cityOptions[0].city_id;
                        // this.packages = this.packageOptions[0].package_id;
                        // this.tableData = data.pkg_list[0].pkg[0].item;
                    }
                } else {
                    this.$message.error(msg);
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
/deep/.el-table{
    td .cell{
        max-height: none;
    }
}
.baseInfo {
    width: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    padding-bottom: 200px;
    .base-head {
        .title {
            line-height: 30px;
            color: rgba(0, 0, 0, 1);
            .name {
                color: #333333;
                font-weight: bold;
            }
            .el-tag.el-tag--success:first-of-type {
                margin: 0 10px 0 20px;
            }
        }
        .el-row {
            line-height: 20px;
            margin: 10px 0;
            .sp {
                color: rgba(224, 224, 224, 1);
                margin-right: 5px;
            }
        }
    }
}
.base-h3 {
    border-left: solid 3px rgba(179, 35, 139, 1);
    padding-left: 10px;
    margin: 10px 0;
}
.linePics {
    margin: 20px 0;
    display: flex;
    & > div:first-of-type {
        margin-top: 60px;
        margin-right: 10px;
    }
    .picInfo {
        position: relative;
        float: left;
        margin: 0 20px 10px 0;
        width: 150px;
        height: 150px;
        .isDefault {
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 40px;
            &::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: 0;
                height: 0;
                border: 20px solid #b10c79;
                // border-right-color: transparent;
                border-left-color: transparent;
                border-bottom-color: transparent;
            }
            i {
                position: absolute;
                top: 2px;
                right: 4px;
                color: #fff;
                font-style: normal;
                line-height: normal;
                font-weight: 700;
            }
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.tour-info {
    margin-bottom: 50px;
    s h3 {
        border-left: solid 3px rgba(179, 35, 139, 1);
        padding-left: 10px;
        margin: 20px 0;
    }
    .tuan-left {
        .tuanMod {
            border: solid 1px #e6e6e6;
            border-bottom: none;
            padding: 10px 0;
            box-sizing: border-box;
            overflow: hidden;
            span {
                margin: 0 10px;
                box-sizing: border-box;
            }
            .icons {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 5px;
            }
            .orange {
                background-color: rgba(248, 140, 49, 0.2);
            }
            .blue {
                background-color: #75a9fd;
            }
            .gray {
                background-color: #cccaca;
            }
            .spBoxLeft {
                float: left;
            }
            .spBox {
                float: right;
            }
        }
        .calendar {
            .coutent {
                overflow: hidden;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                // padding-left: 10px;

                .item-date {
                    float: left;
                }
                .date-data {
                    font-size: 12px;
                    padding: 10px;
                    text-align: right;
                }
            }

            .sales {
                background-color: rgba(248, 140, 49, 0.2);
            }
            .stop {
                background-color: rgba(204, 202, 202, 0.2);
            }
            .end {
                background-color: rgba(85, 201, 126, 0.2);
            }
            .over {
                background-color: rgba(117, 169, 253, 0.2);
            }
        }
    }
    .tuan-right {
        .tuan-item {
            margin-bottom: 10px;
        }
        span {
            margin-right: 10px;
        }
        .el-select {
            width: 140px;
            margin-right: 10px;
        }
    }
}
.tour-progress {
    margin-bottom: 50px;
}
#tripTour {
    width: 100%;
    overflow: hidden;
    border-bottom: solid 1px #ccc;
    margin-bottom: 20px;
    li {
        float: left;
        padding: 15px 20px;
        box-sizing: border-box;
        a {
            color: #000;
            display: inline-block;

            &:hover {
                color: #b10c79;
                cursor: pointer;
            }
        }
    }
}
.acticeClass {
    border-bottom: solid 2px #b10c79;
    a {
        color: #b10c79 !important;
    }
}

.spSquare {
    color: #b10c79;
    margin-right: 10px;
}

ol.is_fixed {
    width: 80% !important;
    position: fixed;
    left: 220px;
    top: 0;
    z-index: 1000;
    background: #fff;
    border-bottom: none !important;
}

.detail-item {
    margin-left: 109px;
    margin-bottom: 20px;
    padding-top: 10px;
    h3 {
        margin: 10px 0;
    }
}
.now_Fixed {
    position: fixed;
    top: 50px;
    left: 220px;
    margin-right: 5;
}
.detailOne {
    overflow: hidden;
    padding-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    #dayDetail {
        float: left;
        margin-top: 20px;
        border-right: solid 1px #ccc;
        li {
            padding: 10px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            text-align: center;
            border-radius: 10px 0 0 10px;
            color: rgba(136, 136, 136, 1);
            border: solid 1px rgba(204, 204, 204, 1);
            border-right: none;
            margin-top: 10px;
            &:first-of-type {
                margin-top: 0;
            }
        }
        .is_Active {
            background-color: #b10c79;
            color: #fff;
            border: solid 1px transparent;
        }
        .dayItem0 {
            background-color: #b10c79;
            color: #fff;
            border: solid 1px transparent;
        }
    }
    .intTour {
        margin-left: 52px;
        float: left;
        width: 80%;
        #dayOne {
            padding-bottom: 10px;
            & > div {
                padding: 10px 0;
            }
        }
    }
}

.tourPrice {
    padding-bottom: 10px;
    // border: solid 1px;
    .progress {
        .trip-imgs {
            width: 200px;
            height: 200px;
            margin-right: 20px;
            margin-top: 20px;
        }
    }
    .el-step__description.is-finish {
        font-size: 14px;
        margin-top: 20px;
    }
}
.priInclud {
    // border-left: solid 3px rgba(179, 35, 139, 1);
    padding-left: 10px;
    margin: 13px 0;
}
</style>

<style lang="scss">
.newCal {
    .calendar-footer {
        display: none;
    }
}
.progress {
    padding-bottom: 20px;
    // border: solid 1px;
    .el-step__icon.is-text {
        border: none;
    }
    .el-step__line {
        background-color: #b10c79;
    }
    .el-step__title {
        color: rgba(51, 51, 51, 1);
    }
    .el-step__description {
        color: rgba(153, 153, 153, 1);
    }
    .el-step.is-vertical {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
}
.last-step {
    flex-basis: 300% !important;
}
.iconImg {
    width: 40px;
    height: 40px;
}
.iconOne {
    background: url("../../assets/icons/icon_eat.png") center no-repeat;
    background-size: 24px 24px;
}
.iconTwo {
    background: url("../../assets/icons/icon_hotel.png") center no-repeat;
    background-size: 24px 24px;
}
.iconThree {
    background: url("../../assets/icons/icon_bus.png") center no-repeat;
    background-size: 24px 24px;
}
.iconFour {
    background: url("../../assets/icons/icon_desc.png") center no-repeat;
    background-size: 24px 24px;
}
.tabRight {
    thead tr {
        th {
            background-color: rgba(247, 249, 251, 1);
            .cell {
                background: inherit;
            }
        }
    }
    tbody tr td:nth-of-type(2),
    td:nth-of-type(3),
    td:nth-of-type(4) {
        color: #f7ba2a;
    }
}
.feeTable {
    tbody tr td:first-of-type {
        background: rgba(246, 246, 246, 1);
    }
}
.tabsMod {
    .el-tabs__item {
        padding: 0 30px;
        text-align: center;
    }
}
</style>