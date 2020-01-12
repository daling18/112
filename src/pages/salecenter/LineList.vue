// src\components\distribution\LineList.vue
<template>
    <div class="wrapper">
        <!-- system-search -->
        <div class="system-search">
            <div class="search-item search-list">
                <el-input placeholder="请输入搜索的关键字" v-model="searchInput.keyword" />
            </div>
            <div class="search-item search-list">
                <el-input placeholder="请输入产品编号/供应商" v-model="searchInput.number" />
            </div>
            <div class="search-item search-list">
                <el-input placeholder="请输入目的地" v-model="searchInput.name" />
            </div>
            <div class="search-item search-button">
                <el-button type="primary" @click="searchProduct">立即搜索</el-button>
            </div>
        </div>
        <div class="system-search">
            <div class="search-item" v-for="(item,key) in productSearchInfo" :key="key" :style="(key === 'city_list' && moreText===2) && 'height:auto'">
                <div class="type">{{ key==='trip_type' ? '产品类型' : key==='city_list' ? '出发城市':'线路分类' }}：</div>
                <ul class="classification" :ref="key==='city_list' && 'companyStyle'">
                    <li @click="classChecked(key,-1)" :class="activeAllClass(key)">全部</li>
                    <li v-for="(item,i,index) in item" :key="i" @click="classChecked(key,index,item.name || item.city_name)" :class="activeClass(key,item.name || item.city_name)">{{item.name || item.city_name}}</li>
                </ul>
                <span class="listMore" v-if="key==='city_list' && parseInt(citylistWidth / 80) <= item.length " @click="listMore" v-text="moreText === 1 ? '更多' :'收起'"></span>
                <el-checkbox v-model="local" v-if="key==='city_list'" class="local" @change="handlelicalCity()">本地出发</el-checkbox>
            </div>
            <div class="search-item" style="height:auto">
                <div class="type">行程天数：</div>
                <ul class="classification">
                    <li @click="classChecked('days',-1)" :class="!checked.days.length && 'active'">全部</li>
                    <li v-for="(item,index) in daysLsit" :key="index" :class="activeClass('days',item)" @click="classChecked('days',0,item)">{{item}}</li>
                </ul>
            </div>
            <div class="search-item" style="height:auto">
                <div class="type">出发日期：</div>
                <ul class="classification">
                    <li @click="classChecked('date',-1)" :class="!checked.date.length && 'active'">全部</li>
                    <li v-for="(item,index) in dateList" :key="index" :class="activeClass('date',item)" @click="classChecked('date',0,item)">{{item}}</li>
                    <li style="background:white; overflow:visible">
                        <search-item-date-range :label="''" v-model="departureDate" @change="handleChangeDeparture" style="width:340px" />
                        <span @click="searchProduct" class="searchdate">确定</span>
                    </li>
                </ul>
            </div>
            <div class="search-item" v-show="screenshow(checked)">
                <div class="type">筛选状态：</div>
                <ul class="search-checked">
                    <li v-for="(item,key) in checked" :key="key" v-show="item.length">
                        <span>{{key==='produceType' ? '产品类型' : key==='lineType' ? '线路分类': key==='cityList' ? '出发城市' :key==='days' ? '行程天数': '出发日期'}}：</span>
                        <span>{{ item | filtersItem}}</span>
                        <span class="cancel" @click="classChecked(key,-2)">
                            <i class="el-icon-close"></i>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- /system-search -->
        <div class="system-content">
            <div class="trip-content" style="background:white;">
                <div class="lineTop">
                    <span v-for="(item,key) in sortList" :key="key" :class="sortIndex===key && 'active'" @click="handlesort(key)">{{item}}</span>
                    <div class="search-item" style="width: 400px;overflow:hidden; position:reletive">
                        <div class="label labeltext">价格区间</div>
                        <div class="width2">
                            <el-input type="text" v-model="searchInput.minPrice" @keyup.native="searchInput.minPrice = oninput(searchInput.minPrice)" />
                        </div>
                        <span class="label line">—</span>
                        <div class="width2">
                            <el-input type="text" v-model="searchInput.maxPrice" @keyup.native="searchInput.maxPrice = oninput(searchInput.maxPrice)" />
                        </div>
                        <div class="searchprice" @click="searchProduct">确定</div>
                    </div>
                </div>
                <template v-if="lineList && lineList.length">
                    <div class="list-content">
                        <ul>
                            <li v-for="(item,key) in lineList" :key="key">
                                <div>
                                    <div class="list-img" :style="!item.img[0] ? 'background:#EBECF0' : ''">
                                        <div>{{item.tripType[0].trip_name || ''}}</div>
                                        <img v-if="item.img[0]" :src="url+item.cover" />
                                    </div>
                                    <div class="list-text">
                                        <div class="title">
                                            <span>产品编号：{{item.line_no}}</span>
                                            <span class="copy" @click="copy(item.line_no)">复制行程编号</span>
                                            <span>线路负责人：{{item.operator_name}}</span>
                                            <span>{{item.operator_phone}}</span>
                                        </div>
                                        <div class="desc">
                                            <p>
                                                <router-link :to="{
                                                  path: '/touristroute/trip/baseInfo/',
                                                  query: {
                                                    line_id: item.id
                                                  }
                                                }">{{item.line_title + item.traffic}}</router-link>
                                                <span> {{item.line_day}}天{{item.line_night}}晚</span>
                                                <span> {{item.tripType[0].trip_name}}</span>
                                                <!-- <span>{{item.line_subtitle}}</span> -->
                                            </p>
                                            <div v-if="item.tag">
                                                <span v-for="(i,k) in item.tag.slice(0,10)" :key="k" class="theme">{{i.theme_name}}</span>
                                            </div>
                                            <p>
                                                <!-- <span v-text="item.city.length > 1? '多地出发' : item.city[0].city_name+'出发'"></span> -->
                                                <span>{{item.start_city}}出发</span>
                                                <span v-for="(i,k) in item.quote" :key="k" v-show="k < 10">{{i.day | filtersdays}}</span>
                                            </p>
                                            <p>供应商:{{item.supply_name || '无'}}</p>
                                            <p class="download">
                                                <span class="poster" @click="openPage(item)">行程下载</span>
                                                <span class="downloadTrip" @click="handlepostersUrl(url+item.poster)" v-if="item.poster">下载宣传海报</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="list-price">
                                        <div class="price">
                                            ￥
                                            <span>{{item.min_sales_price || 0}}</span>起/人
                                        </div>
                                        <p class="profit">利润￥{{item.min_profit || '0'}} - ￥{{item.max_profit || '0'}}</p>
                                        <div class="confirm" @click="selectionLines(item.id,item.product_index_id,item)">预定</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="page">
                            <el-pagination layout="total, prev, pager, next, jumper" :page-size="10" :total="pages.total" :current-page="pages.index" @current-change="channelCurrentPageChange"></el-pagination>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="warm-tip">
                        <p>没有符合您搜索条件的信息，做些其他尝试吧</p>
                    </div>
                </template>
                <el-dialog title="团期查看" :visible.sync="ticketFormVis" size="small" :width="dialogWidth" custom-class="customWidth">
                    <div class="calendar">
                        <div class="calendar-year">
                            <div class="yearText">{{calender[0].year}}年{{calender[0].month}}月</div>
                            <div class="monthleft" @click="nextMonth(-1)">
                                <i class="el-breadcrumb__separator el-icon-arrow-left"></i>
                            </div>
                            <div class="monthright" @click="nextMonth(1)">
                                <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
                            </div>
                        </div>
                        <div class="calendar-week">
                            <span v-for="(item,key) in week" :key="key">{{item}}</span>
                        </div>
                        <div class="calendar-days">
                            <div class="dayslist" v-show="calender.length && calender[0].col" v-for="(item) in calender[0].col" :key="item"></div>
                            <div class="dayslist" v-for="(item,k,i) in calender" :key="i" @click="checkedCalendar(item)" :class="item.date && checkdate === item.date ? 'active' :''">
                                <span>{{item.day}}</span>
                                <div class="stock" v-if="item.sales_price">
                                    <p :style="item.is_ended === 1 ? 'color:#ccc' : ''" v-if="item.sales_price">￥{{item.sales_price}}</p>
                                    <p :style="item.is_ended === 1 ? 'color:#ccc' : ''" v-if="item.is_confirm == 1">二次确认</p>
                                    <p :style="item.is_ended === 1 ? 'color:#ccc' : ''" v-else>余{{item.stock}}</p>
                                </div>
                            </div>
                            <div class="dayslist" v-for="(i,k) in colWeek" :key="handlekey(k)"></div>
                        </div>
                    </div>
                    <div class="period">
                        <div class="search-item">
                            <div class="label">出发城市</div>
                            <el-select v-model="formdata.city" placeholder="请选择出发城市" @change="setcity">
                                <el-option :label="item.city.city_name" :value="k" v-for="(item,k) in pkgList" :key="k" />
                            </el-select>
                        </div>
                        <div class="search-item">
                            <div class="label">标准套餐</div>
                            <el-select v-model="formdata.meal" placeholder="请选择标准套餐" @change="setMeal">
                                <el-option :label="i.package_name" :value="k" v-for="(i,k) in pkg" :key="k" />
                            </el-select>
                        </div>
                        <div class="produceType" v-show="quote && quote.length">
                            <ul>
                                <li>
                                    <div>价格类型</div>
                                    <div>销售价格</div>
                                    <div>结算价</div>
                                    <div>利润</div>
                                    <div>占位人数</div>
                                </li>
                                <li v-for="(i,k) in quote" :key="k" v-show="i.sales_price && i.sales_price != 0">
                                    <div class="passtype">
                                        {{i.other_name}}
                                        <el-tooltip v-if="i.price_desc" class="item" effect="dark" :content="i.price_desc" placement="bottom-start">
                                            <el-button center=true class="childrenTips">?</el-button>
                                        </el-tooltip>
                                    </div>
                                    <div>{{i.sales_price}}</div>
                                    <div>{{i.settle_price}}</div>
                                    <div>{{i.profit || 0}}</div>
                                    <div>
                                        <span class="NumberAdd" @click="changeNumber(k,-1)">-</span>
                                        <input type="number" v-model="i.number" placeholder="0" class="NumberI" @input="i.number = Number($event.target.value.replace(/\D+/, ''))" />
                                        <span class="NumberCut" @click="changeNumber(k,1)">+</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm('同业')" v-if="orgType !== 5">同业下单</el-button>
                        <el-button type="primary" @click="submitForm('直客')" v-if="orgType !== 5">直客下单</el-button>
                        <el-button type="primary" @click="submitForm('门店')" v-if="orgType === 5">门店下单</el-button>
                        <div class="seize" v-if="orgType !== 5">
                            <div v-show="seize">
                                <span @click="submitForm('预占位','同业')">同业</span>
                                <span @click="submitForm('预占位','直客')">直客</span>
                            </div>
                            <el-button type="primary" @click="seize = !seize">预占位</el-button>
                        </div>
                        <el-button v-else type="primary" @click="submitForm('预占位','门店')">预占位</el-button>
                        <el-button @click="ticketFormVis = false">取 消</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="行程下载" :visible.sync="tripDownload" size="small" width="600px" custom-class="customWidth">
                    <div class="tips">微信扫描下方二维码</div>
                    <div class="triplist">
                        <div>
                            <img :src="tripList.trip_url_code" v-if="tripList.trip_url_code" />
                            <!-- <span></span> -->
                        </div>
                        <div @click="downloadTrip(tripList.trip_url)"><i class="word fa fa-file-pdf-o"></i></div>
                        <div @click="downloadTrip(tripList.trip_url_doc)"><i class="word fa fa-file-word-o"></i></div>
                    </div>
                </el-dialog>
                <el-dialog title="宣传海报下载" :visible.sync="postersDownload" size="small" width="500px" custom-class="customWidth">
                    <div class="posters">
                        <div class="postersIMG">
                            <img :src="postersUrl" />
                        </div>
                        <div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="downloadTrip(postersUrl)">下载</el-button>
                        <el-button @click="postersDownload = false">取消</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <!--选择可预订团期弹窗-->
    </div>
</template>

<script>
import SearchItemDateRange from "src/plugins/SearchItemDateRange";
import {
    linesearchwhere,
    getlineList,
    getPriceCalendar,
    getPriceCalendardetails,
    getLeaderInfo,
    linePlaceOrder
} from "src/api/product";
import CopyButton from "src/components/components/CopyButton";
import * as format from "src/utils/format";
import { Loading } from "element-ui";
import { download } from "@/utils/common";
const CHECKKEY = {
    trip_type: "produceType",
    city_list: "cityList",
    line_class: "lineType",
    days: "days",
    date: "date"
};
const DATE = new Date();
const TEMPYEAR = DATE.getFullYear();
const TEMPMPNTH =
    DATE.getMonth() + 1 < 10
        ? "0" + (DATE.getMonth() + 1)
        : DATE.getMonth() + 1; // 全局月
const QUOTETYPE = {
    "0": "其他",
    "1": "成人",
    "2": "儿童"
};
export default {
    components: {
        SearchItemDateRange,
        CopyButton
    },
    filters: {
        filtersItem(item) {
            item = item.length > 8 ? item.slice(0, 8) : item;
            return item ? item.join(",") : "";
        },
        filtersdays(day) {
            let temp = day.split("-");
            return temp[1] + "月" + temp[2] + "日";
        }
    },
    data() {
        const { query } = this.$route;
        return {
            Loading: true,
            week: ["日", "一", "二", "三", "四", "五", "六"],
            checkdate: 0,
            productSearchInfo: {
                trip_type: [],
                line_class: [],
                city_list: []
            },
            sortList: ["默认排序", "价格升序", "价格降序"],
            sortIndex: 0,
            departureDate: [
                query.departure_date_start,
                query.departure_date_end
            ],
            productType: [
                "全部",
                "跟团游",
                "自由行",
                "半自由行",
                "定制游",
                "周边游",
                "落地拼",
                "邮轮"
            ],
            daysLsit: [
                "1日",
                "2日",
                "3日",
                "4日",
                "5日",
                "6日",
                "7日",
                "8日",
                "9日",
                "10日以上"
            ],
            dateList: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
            ],
            searchInput: {
                keyword: "",
                number: "",
                name: "",
                minPrice: "",
                maxPrice: "",
                departure_date_start: "",
                departure_date_end: ""
            },
            checked: {
                produceType: [],
                lineType: [],
                cityList: [],
                days: [],
                date: []
            },
            lineList: [],
            pages: {
                total: 10,
                index: 1,
                ispages: false
            },
            ticketFormVis: false,
            currentDate: "", //当前日期
            calender: [
                {
                    col: 0,
                    year: "",
                    day: ""
                }
            ],
            colWeek: 0, //当前月份最后一天为周几
            line_id: "",
            product_index_id: "",
            pkgList: [],
            formdata: {
                city: 0,
                meal: 0
            },
            quote: [],
            pkg: [],
            item: {},
            base: {}, //基础信息
            tripList: {
                trip_url: "",
                trip_url_doc: "",
                trip_url_code: ""
            },
            tripDownload: false,
            postersDownload: false,
            postersUrl: "",
            dialogWidth: 0, //动态计算弹窗宽度
            moreText: 1,
            local_city: "北京", //本地出发城市
            local: false, //是否本地出发
            orgType: 1,
            seize: false,
            citylistWidth: 0,
            MonitorDate: false
        };
    },
    created() {
        this.setDialogWidth();
        let self = this;
        this.$nextTick(function() {
            this.citylistWidth = self.$refs.companyStyle[0].clientWidth;
        });
    },
    watch: {},
    mounted() {
        this._getSearchWhere();
        this._getlineList();
        this.getLeaderInfo(); //获取负责人信息
        this.currentDate = `${DATE.getFullYear()}-${DATE.getMonth() + 1}-01`;
    },
    methods: {
        getLeaderInfo() {
            getLeaderInfo({
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.orgType = data.org_type;
                }
            });
        },
        setDialogWidth() {
            var val = document.body.clientWidth;
            const def = 1200; // 默认宽度
            if (val < def) {
                this.dialogWidth = "100%";
            } else {
                this.dialogWidth = def + "px";
            }
        },
        initCalendar(newDate) {
            newDate = newDate || this.currentDate;
            const now = new Date(newDate);
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const endDay = new Date(
                now.getMonth() === 11
                    ? new Date(now.getFullYear() + 1, 0, 1).getTime() - 8640000
                    : new Date(
                          now.getFullYear(),
                          now.getMonth() + 1,
                          1
                      ).getTime() - 8640000
            );
            let month =
                now.getMonth() + 1 < 10
                    ? "0" + (now.getMonth() + 1)
                    : now.getMonth() + 1; // 全局月
            let row = 0;
            let col = firstDay.getDay();
            let calendar = [];
            let thisDay = 1;
            const end = endDay.getDate();
            while (thisDay <= end) {
                // row ++;
                col = col > 6 ? 0 : col;
                calendar.push({
                    day: thisDay < 10 ? "0" + thisDay : thisDay,
                    col,
                    month,
                    year: now.getFullYear()
                });
                thisDay++;
                col++;
            }
            this.colWeek = 6 - calendar[calendar.length - 1].col;
            return calendar;
        },
        nextMonth(index, bool) {
            //index 1为+
            let { calender } = this;
            if (index === 1) {
                let newdate =
                    calender[0].month < 12
                        ? `${calender[0].year}-${Number(calender[0].month) +
                              1}-${calender[0].day}`
                        : `${Number(calender[0].year) + 1}-01-${
                              calender[0].day
                          }`;
                this.currentDate = newdate;
                this.popDetails(bool);
            } else {
                let year = DATE.getFullYear();
                let month = DATE.getMonth() + 1;
                if (
                    calender[0].year > year ||
                    (calender[0].month > month && calender[0].year >= year)
                ) {
                    let newdate =
                        calender[0].month == 1
                            ? `${Number(calender[0].year - 1)}-12-${
                                  calender[0].day
                              }`
                            : `${Number(calender[0].year)}-${Number(
                                  calender[0].month
                              ) - 1}-${calender[0].day}`;
                    this.currentDate = newdate;
                    this.popDetails(bool);
                }
            }
        },
        checkedCalendar(item) {
            if (item.is_ended !== 0)
                return this.$message.error("该日期已截止报名");
            //选中日历
            if (!item.sales_price) return;
            this.checkdate = item.date;
            let date = item.date;
            let params = {
                data: {
                    line_id: this.line_id,
                    day: date
                }
            };
            getPriceCalendardetails({
                params,
                success: res => {
                    let {
                        data: {
                            code,
                            data: { base, pkg_list },
                            msg
                        }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.pkgList = pkg_list;
                    this.pkg = pkg_list[0].pkg;
                    // let quote = pkg_list[0].pkg[0].item.map((item,i)=>{
                    //   item.number = i == 0 ? 1 : 0 ;
                    //   return item;
                    // })
                    this.quote = pkg_list[0].pkg[0].item;
                    this.formdata = {
                        city: 0,
                        meal: 0
                    };
                    this.base = base;
                    console.log(this.quote, "quote");
                }
            });
        },
        _getSearchWhere() {
            linesearchwhere({
                method: "get",
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.productSearchInfo = data;
                }
            });
        },
        _getlineList() {
            let loadingInstance = Loading.service();
            let {
                sortIndex,
                searchInput: {
                    keyword,
                    number,
                    name,
                    // departure_date_start,
                    // departure_date_end,
                    minPrice,
                    maxPrice
                },
                checked: { produceType, lineType, cityList, days, date },
                productSearchInfo,
                pages: { index, ispages }
            } = this;
            let trip_type = [],
                class_id = [],
                departure_city = [];

            let [departure_date_start, departure_date_end] = this.departureDate;

            productSearchInfo.trip_type.forEach((item, i, array) => {
                if (produceType.includes(item.name)) trip_type.push(item.id);
            });
            productSearchInfo.line_class.forEach((item, i, array) => {
                if (lineType.includes(item.name)) class_id.push(item.id);
            });
            productSearchInfo.city_list.forEach((item, i, array) => {
                if (cityList.includes(item.city_name))
                    departure_city.push(item.city_id);
            });
            days = days.map((item, i) => item.replace(/[^0-9]/gi, ""));
            date = date.map((item, i) => item.replace(/[^0-9]/gi, ""));
            let params = {
                data: {
                    trip_type, //产品类型
                    class_id, //线路分类
                    departure_city: departure_city,
                    local_city: this.local ? 1 : 0,
                    end_city: name || "", //目的地
                    price_sort: sortIndex === 0 ? "" : sortIndex, //价格排序
                    price_start: minPrice,
                    price_end: maxPrice,
                    line_no_supply_name: number,
                    trip_day: days,
                    keyword,
                    departure_date: date, //出团日期
                    departure_date_start,
                    departure_date_end,
                    page_index: ispages ? index : 1,
                    page_size: 10
                }
            };
            getlineList({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.lineList = data.list;
                    this.url = data.static_url;
                    this.local_city = data.local_city; //勾选本地出发
                    this.pages.total = Number(data.total_count);
                    this.productSearchInfo.city_list = data.start_city_list; //对后端接口无语
                    this.pages.ispages = false;
                    this.pages.index = data.page_index;
                    this.$nextTick(() => {
                        // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                }
            });
        },
        setcity(k) {
            let pkg = this.pkgList[k].pkg;
            this.pkg = pkg;
            this.formdata.meal = 0;
            this.quote = pkg[0].item;
        },
        setMeal(k) {
            this.quote = this.pkg[k].item;
        },
        changeNumber(i, n) {
            let number = Number(this.quote[i].number) || 0;
            if (number === 0 && n === -1) return;
            this.$set(this.quote[i], "number", number + n);
        },
        submitForm(i, name) {
            let { quote, base, formdata } = this;
            let tempquote = quote.some((item, i) => {
                return item.number && item.number > 0;
            });
            if (!this.checkdate) return this.$message.error("请选择团期");
            //库存判断
            let tempStock = 0;
            let curStock = base.balance_stock;
            this.quote.forEach((item, i) => {
                tempStock += item.number || 0;
            });
            if (base.is_confirm === "0" && tempStock > curStock)
                return this.$message.error("库存不足");
            //下单
            const ORDERTYPE = {
                门店: 1,
                同业: 2,
                直客: 3
            };
            if (i !== "预占位") {
                let {
                    pkgList,
                    item: {
                        id,
                        product_index_id,
                        line_title,
                        line_subtitle,
                        city,
                        tripType,
                        line_no,
                        line_day,
                        line_night
                    }
                } = this;
                let starting_city = [];
                let line_type = [];
                let end_city = [];
                city.forEach((item, i) => {
                    if (item.type === "1") {
                        starting_city.push(item.city_name);
                    } else if (item.type === "2") {
                        end_city.push(item.city_name);
                    }
                });
                tripType.forEach((item, i) => {
                    line_type.push(item.trip_name);
                });
                if (!tempquote) {
                    quote[0].number = 1;
                }
                let lineInfo = {
                    product_id: id,
                    product_index_id: product_index_id,
                    orderType: ORDERTYPE[i],
                    line_title,
                    line_subtitle,
                    line_no,
                    starting_city: starting_city.join(","),
                    line_type: line_type.join(","),
                    line_day,
                    line_night,
                    end_city: end_city.join(","),
                    pkgList,
                    quote,
                    formdata, //选中的城市套餐
                    roomDiff: base.room_diff_price, //单房差
                    deposit: base.deposit //定金
                };
                this.$router.push({
                    path: "/salecenter/line/Tourist-Info",
                    query: {
                        lineInfo: JSON.stringify(lineInfo)
                    }
                });
                return;
            }
            if (!tempquote) return this.$message.error("请添加乘客类型");
            let loadingInstance = Loading.service();
            let { line_id, product_index_id } = this;
            let tourist_list = [];
            quote.forEach((i, index) => {
                if (i.number && i.number > 0) {
                    tourist_list.push({
                        item_id: i.id,
                        num: i.number
                    });
                }
            });
            let params = {
                data: {
                    product_id: line_id,
                    product_index_id,
                    quote_id: quote[0].quote_id,
                    packages_id: quote[0].package_id,
                    agent_org_id: "",
                    order_from: ORDERTYPE[name],
                    tourist_list
                }
            };
            linePlaceOrder({
                params,
                success: res => {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.$message.success("预占位下单成功");
                }
            });
        },
        activeAllClass(key) {
            return this.checked[CHECKKEY[key]].length ? "" : "active";
        },
        activeClass(key, name) {
            return this.checked[CHECKKEY[key]].includes(name) ? "active" : "";
        },
        searchProduct() {
            this._getlineList();
            //搜索
        },
        selectionLines(line_id, product_index_id, item) {
            this.MonitorDate = true;
            this.seize = false;
            this.pkgList = []; //清空pkgList
            this.pkg = []; //清空pkg
            this.quote = []; //清空quote
            this.checkdate = 0; //清空选中
            this.formdata = {
                city: "",
                meal: ""
            };
            this.item = item;
            this.line_id = line_id;
            this.product_index_id = product_index_id;
            this.popDetails(true);
        },
        popDetails(bool) {
            let { MonitorDate } = this;
            let params = {
                data: {
                    line_id: this.line_id
                }
            };
            getPriceCalendar({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    let calender = data.calender;
                    let temoDay = calender.filter((item, i) => {
                        let curdate = new Date(
                            TEMPYEAR + "-" + TEMPMPNTH + "-1"
                        );
                        let oldDate = new Date(item.day);
                        return oldDate.getTime() > curdate.getTime();
                    });
                    let oldCalendar = this.initCalendar(
                        MonitorDate
                            ? calender.length
                                ? temoDay[0].day
                                : ""
                            : ""
                    );
                    if (MonitorDate) this.MonitorDate = false;
                    // let oldCalendar = this.initCalendar(calender.length ? calender[0].day : '');
                    let result = [];
                    oldCalendar.forEach((item, i) => {
                        calender.forEach((oldTemp, j) => {
                            let month = oldTemp.day.split("-")[1];
                            let day = oldTemp.day.split("-")[2];
                            if (item.month == month && item.day == day) {
                                item.stock = oldTemp.balance_stock; //库存
                                item.is_confirm = oldTemp.is_confirm; //是否需要二次确认
                                item.is_ended = oldTemp.is_ended; //是否已截止
                                item.sales_price = oldTemp.sales_price;
                                item.date = oldTemp.day;
                                item.id = oldTemp.id;
                            }
                        });
                        result.push(item);
                    });
                    this.calender = result;
                    // let checked = result.filter(
                    //     (item, i) =>
                    //         Number(item.sales_price) >= 0.01 &&
                    //         item.is_ended === 0
                    // );
                    // this.checkdate = checked.length ? checked[0].date : 0;
                    for (let i in this.calender) {
                        if (this.calender[i].is_ended === 0) {
                            this.checkdate = this.calender[i].date;
                            this.checkedCalendar(this.calender[i]);
                            break;
                        }
                    }
                    if (!this.checkdate) {
                        this.checkdate = this.calender[
                            this.calender.length - 1
                        ].date;
                    }
                    if (bool) {
                        let month = this.checkdate.split("-")[1];
                        let year = this.checkdate.split("-")[0];
                        if (
                            oldCalendar[0].year != year ||
                            oldCalendar[0].month != month
                        ) {
                            this.nextMonth(1, true);
                        }
                    }
                }
            });
            this.$set(this, "ticketFormVis", true);
        },
        classChecked(key, index, name) {
            Array.prototype.removeByValue = function(val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) {
                        this.splice(i, 1);
                        break;
                    }
                }
            };
            if (index === -1) {
                this.checked[CHECKKEY[key]] = [];
            } else if (index === -2) {
                this.checked[key] = [];
            } else if (name && this.checked[CHECKKEY[key]].includes(name)) {
                this.checked[CHECKKEY[key]].removeByValue(name);
            } else if (name && !this.checked[CHECKKEY[key]].includes(name)) {
                this.checked[CHECKKEY[key]].push(name);
                this.local = false;
            }
            this._getlineList();
        },
        screenshow(arr) {
            let temp = false;
            for (let i in arr) {
                if (arr[i].length) return (temp = true);
            }
            return temp;
        },
        oninput(val) {
            return val ? val.replace(/\D+/, "") : null;
        },
        handleChangeDeparture(date) {
            // this.searchInput.departure_date_start = format.date(date[0]) || "";
            // this.searchInput.departure_date_end = format.date(date[1]) || "";
        },
        channelCurrentPageChange(val) {
            this.pages.index = val;
            this.pages.ispages = true;
            this._getlineList();
        },
        handlesort(k) {
            this.sortIndex = k;
            this._getlineList();
        },
        listMore() {
            let { moreText } = this;
            this.moreText = moreText === 1 ? 2 : 1;
        },
        handlelicalCity() {
            this.classChecked("cityList", -2); //选中本地出发清除出发城市
        },
        copy(id) {
            let input = document.createElement("input");
            input.value = id;
            document.body.appendChild(input);
            input.select();
            document.execCommand("Copy");
            document.body.removeChild(input);
            this.$message.success("复制成功");
        },
        handlepostersUrl(url) {
            this.postersDownload = true;
            this.postersUrl = url;
        },
        openPage(item) {
            let { trip_url, trip_url_doc, trip_url_code } = item;
            this.tripDownload = true;
            this.tripList = {
                trip_url,
                trip_url_doc,
                trip_url_code
            };
        },
        async downloadTrip(url) {
            //行程下载
            // const elt = document.createElement("a");
            // elt.setAttribute("href", url);
            // elt.setAttribute("download", "盈科旅游");
            // elt.style.display = "none";
            // document.body.appendChild(elt);
            // elt.click();
            // document.body.removeChild(elt);
            if (url) {
                let type = url.split(".").pop();
                let downloadRes = await download(url, "行程单", true, type);
                if (!downloadRes) return this.$message.warning("下载失败");
            } else {
                this.$message.warning("暂无文件");
            }
        },
        handlekey(key) {
            return key + Math.random();
        }
    }
};
</script>

<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}
.el-message-box__btns .el-button,
.el-dialog__footer .el-button {
    line-height: 1;
}
.system-search .search-item > .el-input {
    width: 100%;
    float: none;
}
.system-search .search-item {
    padding-left: 0;
    float: none;
    overflow: hidden;
    border: none;
    position: relative;
}
.system-search .search-list {
    float: left;
}
.type {
    float: left;
    color: #333333;
    font-size: 14px;
    line-height: 35px;
}
.listMore {
    cursor: pointer;
    position: absolute;
    width: 60px;
    right: 20%;
    margin-right: -120px;
    top: 0;
    color: #ccc;
    line-height: 30px;
}
.local {
    position: absolute;
    right: 20%;
    margin-right: -200px;
    top: 0;
    color: #ccc;
    line-height: 30px;
}
.classification {
    max-width: 80%;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 70px;
        height: 30px;
        color: #888888;
        background: #f2f2f2;
        font-size: 14px;
        margin: 0 5px 10px 5px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .searchdate {
            display: inline-block;
            vertical-align: top;
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #ba3891;
            color: white;
        }
    }
    li.active {
        background: #b3238b;
        color: white;
    }
}
.search-checked {
    display: flex;
    li {
        width: auto;
        padding: 0 10px;
        height: 30px;
        color: #888888;
        background: #f2f2f2;
        font-size: 14px;
        margin: 0 5px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
}
.lineTop {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    > span {
        cursor: pointer;
        padding: 0 30px;
        color: #000000;
        font-size: 12px;
        text-align: center;
        line-height: 45px;
    }
    > span.active {
        color: #b5338b;
    }
}
.search-item .labeltext {
    float: left;
    padding: 0 30px;
    line-height: 45px;
}
.list-content {
    width: 100%;
    min-height: 400px;
    ul {
        display: block;
        padding: 0 10px;
        box-sizing: border-box;
        margin: 15px 0 10px 0;
        li {
            border-bottom: 1px solid #dcdee3;
            > div {
                margin: 10px 30px 10px 10px;
                position: relative;
                div.list-img {
                    width: 200px;
                    height: 150px;
                    display: inline-block;
                    div {
                        position: absolute;
                        top: 0;
                        left: 0;
                        padding: 0 12px;
                        color: white;
                        font-size: 12px;
                        background: #f47e20;
                    }
                    img {
                        width: 100%;
                        height: 150px;
                    }
                }
                div.list-text {
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 15px;
                    width: 70%;
                    line-height: 20px;
                    .title {
                        width: 100%;
                        span {
                            color: #888888;
                            font-size: 12px;
                            margin-right: 10px;
                        }
                        .copy {
                            cursor: pointer;
                            color: #b3238b;
                        }
                    }
                    .desc {
                        > p {
                            max-width: 100%;
                            overflow: hidden; /*超出部分隐藏*/
                            text-overflow: ellipsis; /* 超出部分显示省略号 */
                            white-space: nowrap; /*规定段落中的文本不进行换行 */
                            margin: 6px 0;
                            color: black;
                            font-size: 12px;
                            line-height: 20px;
                            > span {
                                margin-right: 8px;
                            }
                        }
                        .theme {
                            padding: 0 8px;
                            line-height: 18px;
                            font-size: 12px;
                            color: #f47e20;
                            border: 1px solid #f47e20;
                            border-radius: 3px;
                            margin-right: 8px;
                        }
                        .download {
                            span {
                                cursor: pointer;
                            }
                            .poster {
                                color: #b3238b;
                            }
                            .downloadTrip {
                                padding: 0 0 0 10px;
                                border-left: 1px solid #ccc;
                                color: #b3238b;
                            }
                        }
                    }
                }
                div.list-price {
                    position: absolute;
                    right: 0;
                    top: 30px;
                    line-height: 36px;
                    div.price {
                        font-size: 16px;
                        color: #f47e20;
                        text-align: right;
                        span {
                            font-size: 24px;
                        }
                    }
                    p.profit {
                        background: #fdf6fb;
                        text-align: center;
                    }
                    p {
                        color: #b3238b;
                        font-size: 16px;
                    }
                    .confirm {
                        cursor: pointer;
                        color: white;
                        font-size: 14px;
                        background: #b3238b;
                        width: 180px;
                        height: 34px;
                        text-align: center;
                        line-height: 34px;
                    }
                }
            }
        }
    }
}
.customWidth {
    width: 80%;
}
.calendar {
    border: 1px solid #e0e0e0;
    width: 500px;
    display: inline-block;
    box-sizing: border-box;
    .calendar-p {
        color: #b3238b;
        font-size: 12px;
    }
    .is-selected {
        border: 1px solid #b3238b;
    }
    .calendar-year {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e0e0e0;
        div.yearText {
            color: #333333;
            font-size: 14px;
            text-align: center;
        }
        div.monthleft {
            cursor: pointer;
            position: absolute;
            left: 10px;
            top: 0;
            display: block;
            width: 16px;
            height: 16px;
            text-align: center;
        }
        div.monthright {
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 0;
            display: block;
            width: 16px;
            height: 16px;
            text-align: center;
        }
    }
    .calendar-week {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        span {
            flex: 7;
            text-align: center;
            color: #333333;
            font-size: 12px;
        }
        span:nth-last-child(1),
        span:nth-child(1) {
            color: #b3238b;
        }
    }
    .calendar-days {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        > div.dayslist {
            cursor: pointer;
            width: 14.28%;
            height: 60px;
            box-sizing: border-box;
            border-top: 1px solid #e0e0e0;
            border-right: 1px solid #e0e0e0;
            .stock {
                color: #b3238b;
                p {
                    font-size: 10px;
                }
            }
            span {
                padding: 6px;
                color: #333333;
                font-size: 12px;
            }
            span.active {
                background: #fdf6fb;
                border: 1px solid #b3238b;
            }
        }
        > div.active {
            border: 1px solid #b3238b;
        }
        div:nth-child(7n + 7) {
            border-right: none;
        }
    }
}
.period {
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
    border: 1px solid #e0e0e0;
    .search-item {
        margin: 10px 0;
        display: inline-block;
        .label {
            display: inline-block;
            padding: 0 10px;
        }
    }
    .produceType {
        width: 600px;
        border-top: 1px solid #e0e0e0;
        box-sizing: border-box;
        ul li {
            border-bottom: 1px solid #e0e0e0;
            display: grid;
            grid-template-columns: 17% 17% 17% 17% 32%;
            width: 100%;
            height: 40px;
            div {
                height: 40px;
                line-height: 40px;
                font-size: 12px;
                color: #333333;
                display: inline-block;
                text-align: center;
                border-right: 1px solid #e0e0e0;
                > span {
                    display: inline-block;
                    height: 30px;
                    text-emphasis: center;
                    line-height: 30px;
                    width: 40px;
                    border-radius: 3px;
                    border: 1px solid #c4c6cf;
                    cursor: pointer;
                }
                .NumberI {
                    height: 30px;
                    text-emphasis: center;
                    line-height: 30px;
                    width: 80px;
                    border: 1px solid #c4c6cf;
                    margin: 0 2px;
                    text-align: center;
                }
                .NumberCut {
                }
            }
            div:nth-last-child(1) {
                flex-grow: 2;
                border-right: none;
            }
        }
    }
}
.width2 {
    width: 80px !important;
    margin-top: 6px;
    display: inline-block;
}
.searchprice {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #ba3891;
    color: white;
    margin-left: 20px;
}
// .cleanbutton{
//   position: absolute;
//   margin-left:120px;
//   z-index: 9;
//   width: 170px;
//   height: 40px;
//   background: white;
//   span{
//     cursor: pointer;
//     display: inline-block;
//     margin: 0 6px;
//   }
//   .cleanPrice{
//     color:blue;
//   }
//   .cleanspan{
//     padding:5px 10px;
//     text-align: center;
//     border:1px solid #ccc;
//   }
// }
.line {
    display: inline-block;
    vertical-align: text-top;
}
.dialog-footer {
    .seize {
        display: inline-block;
        padding: 0px 20px;
        width: 130px;
        position: relative;
        > div {
            border: 1px solid #cccccc;
            border-top: none;
            border-bottom: none;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            position: absolute;
            top: -60px;
            width: 130px;
            box-sizing: border-box;
        }
        span {
            cursor: pointer;
            border-top: 1px solid #cccccc;
            display: block;
            // width: 110px;
            // height: 30px;
            line-height: 30px;
            text-align: center;
            color: #4a4a4a;
            font-size: 14px;
        }
        span:hover {
            color: #c6169d;
        }
    }
}
.tips {
    width: 33.3%;
    text-align: center;
    font-size: 16px;
    line-height: 36px;
    color: #b3238b;
}
.triplist {
    width: 100%;
    display: flex;
    height: 200px;
    line-height: 200px;
    > div {
        cursor: pointer;
        flex: 3;
        border: 1px solid #ccc;
        box-sizing: border-box;
        text-align: center;
        font-size: 30px;
        // line-height: 100px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.posters {
    width: 100%;
    .postersIMG {
        width: 100%;
        img {
            display: block;
            margin: auto;
            width: 300px;
            height: 300px;
        }
    }
}
.word {
    color: #b3238b;
    font-size: 60px;
}
.passtype {
    position: relative;
}
.childrenTips {
    background: #e0e0e0;
    border-radius: 50%;
    padding: 3px 6px;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    position: absolute;
    top: 8px;
    right: 6px;
}
.warm-tip {
    background: #fff;
    padding: 70px 0 130px;
    p {
        text-align: center;
        padding-top: 85px;
        color: #5e7382;
        background: url("../../assets/icons/empty_data.png") no-repeat center
            top;
        background-size: 80px 60px;
    }
}
</style>
