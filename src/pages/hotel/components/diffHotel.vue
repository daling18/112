<template>
    <el-dialog title="酒店信息对比" id="diffHotel" width='70%' :visible="visible" :before-close="handleBeforeClose" :close-on-click-modal="false">
        <div class="table-warpper">
            <div class="loaddingPage" v-if="loadingPage" v-loading="true"></div>
            <el-table :data="tableRowKey" width='100%' v-if="!loadingPage" border :span-method="arraySpanMethod" :cell-class-name="cellClassName" :header-cell-class-name='headerClassName'>
                <el-table-column prop="title" fixed="left" label="对应条件/供应商" :header-row-style="{width:colWidth}"></el-table-column>
                <template>
                    <el-table-column v-for="(value,index) in tableList" :key="index" :header-row-style="{width:colWidth}" :label="value.colName" align="center">
                        <template slot="header">
                            <div v-if="value.colType=='1'" @click="searchHotel(value)">
                                <span>{{ value.colName}}</span>
                                <span class="el-icon-s-fold pointer"></span>
                            </div>
                            <div v-else>
                                {{ value.colName }}
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <div v-if="!scope.row.isHandle">{{filterKey(value,scope.row.keyName)}}</div>
                            <div v-else>
                                <div v-if="scope.row.keyName=='longitudeLatitude'">
                                    <span>经度 {{value['latitude']}}</span>
                                    <span>纬度 {{value['longitude']}}</span>
                                    <div>
                                        <a @click="checkMap(value)" class="pointer">查看地图</a>
                                    </div>
                                </div>
                                <div v-else>无</div>
                            </div>
                        </template>
                    </el-table-column>
                </template>
                <template slot="append">
                    <div class="footer cell">
                        <div>
                            选择并合并酒店
                            <el-radio-group v-model="checkedHotelId">
                                <el-radio v-for="item in  recommendList" :label='item.id' :key="item.id">{{item.colName}}</el-radio>
                                <el-radio label="0">直接合并(平台酒店信息无匹配)</el-radio>
                            </el-radio-group>
                        </div>
                        <div>
                            <el-button type="primary" @click="cancel">取消</el-button>
                            <el-button type="primary" :loading="mergeconfirmLoading" @click="mergeconfirm">确认</el-button>
                        </div>
                    </div>
                </template>
            </el-table>
        </div>
        <!-- 后期合并成一个组件 -->
        <el-dialog :title="isSearch?'自定义查找酒店':'经纬度'" :visible.sync="mapShow" append-to-body>
            <bMap v-model="pointArray" :mapShow='mapShow' :isSearch="isSearch"></bMap>
            <span slot="footer" class="dialog-footer">
                <div v-if="!isSearch">
                    <el-button type="primary" @click="mapShow = false">关闭</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" @click="mapShow=false">取 消</el-button>
                    <el-button type="primary" :disabled='loadingPage' @click="checkHotel" :loading='checkHotelLoading'>确 定</el-button>
                </div>
            </span>
        </el-dialog>

    </el-dialog>
</template>
<script>
import bMap from "./bMap.vue";
import { mergeApi } from "src/api/hotel.js";
export default {
    name: "diffTable",
    components: { bMap },
    props: ["visible", "id"],
    watch: {
        id() {
            this.init();
        },
        visible(n) {
            if (n) this.checkedHotelId = "0";
        }
    },
    computed: {
        checkHotelDisabled() {
            let isHas = this.pointArray.find(v => v.colType == 1);
            return !isHas;
        },
        colWidth() {
            return (1 / (this.tableList.length + 1)) * 100 + "%";
        },
        colList() {
            let list = [];
            this.tableList.forEach((item, i) => {
                if (item.isCol) {
                    list.push({ index: i + 1, item });
                }
            });
            return list;
        },
        keyLength() {
            return this.tableRowKey.length;
        },
        recommendList() {
            return this.tableList.filter(v => {
                return v.colType != "2" && !v.isCol;
            });
        }
    },
    data() {
        return {
            tableRowKey: [
                {
                    title: "酒店名称",
                    keyName: "hotel_name",
                    isHeader: true,
                    isHandle: false
                },
                {
                    title: "所在城市",
                    keyName: "city",
                    isHandle: false
                },
                {
                    title: "地址",
                    keyName: "address",

                    isHandle: false
                },
                {
                    title: "经纬度",
                    keyName: "longitudeLatitude",
                    isHandle: true
                },
                {
                    title: "品牌",
                    keyName: "brand",

                    isHandle: false
                },
                {
                    title: "电话",
                    keyName: "phone",
                    isHandle: false
                },
                {
                    title: "星级",
                    keyName: "star",
                    isHandle: false
                },
                {
                    title: "开业时间",
                    keyName: "opening_date",
                    isHandle: false
                },
                {
                    title: "装修时间",
                    keyName: "decorate_date",
                    isHandle: false
                }
            ],

            tableList: [],
            addKeyObj: {
                isCol: true, //是都合并行
                colType: "1", //0 推荐匹配结果 //1 是自定义添加  //1 对比酒店
                colName: "自定义酒店",
                channel: "自定义酒店",
                hotel_name: "无任何数据信息",
                city: "无",
                longitude: "无",
                latitude: "无",
                brand: "无",
                phone: "无",
                star:"",
                decorate_date: "无",
                opening_date: "无"
            },
            point: {
                lng: null,
                lat: null
            },
            checkedHotelId: "0",
            loadingPage: false,
            //地图
            mapShow: false,
            pointArray: [],
            isSearch: false,
            checkHotelLoading: false,
            mergeconfirmLoading: false
        };
    },
    mounted() {},
    methods: {
        handleBeforeClose() {
            this.$emit("close");
        },
        cancel() {
            this.$emit("close");
        },
        async mergeconfirm() {
            let item = this.tableList.find(v => v.colType == 2);
            let product_id = item.id;
            if (this.checkedHotelId == 0 || !this.checkedHotelId) {
                this.mergeconfirmLoading = true;
                let result = await mergeApi.combineHotel({
                    product_id
                });
                this.mergeconfirmLoading = false;
                let { code, msg, data } = result;
                if (code != 0) return this.$message.error(msg);
                this.$message.success(msg);
                this.$emit("confirm");
            } else {
                this.$emit("confirm", {
                    product_id, //捷旅 id
                    hotel_id: this.checkedHotelId, //酒店id
                    is_select: 0 //   0 查看房型列表 1 查看
                });
            }
        },

        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            let isHas = this.colList.find(v => v.index == columnIndex);
            if (isHas) {
                if (rowIndex == 0) {
                    return [this.keyLength, 1];
                } else {
                    return [0, 0];
                }
            }
        },
        cellClassName({ row, column, rowIndex, columnIndex }) {},
        headerClassName({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == this.tableList.length) {
                return "jlHeaderBg";
            }
            return "headerBg";
        },
        filterKey(value, key) {
            return value[key] || "无";
        },
        async init() {
            if (!this.id || !this.visible){
                this.tableList=[]
                return;
            } 
            this.loadingPage = true;
            let result = await mergeApi.getHotelRecommend({
                hotel_id: this.id
            });
            this.loadingPage = false;
            let { code, data, msg } = result;
            let { match_hotel_info, recommend_list } = data;
            if (code != 0) {
                this.$emit("close");
                this.$message.error(msg);
                return;
            }
            if (!match_hotel_info) {
                this.$emit("close");
                this.$message.error("酒店不存在");
            }
            //0推荐酒店
            let recommendList = (recommend_list || []).map((item, i) => {
                return {
                    colName: "盈科旅游" + String.fromCharCode(i + 65),
                    colType: "0",
                    ...item
                };
            });
            //1自定义酒店
            let custom = JSON.parse(JSON.stringify(this.addKeyObj));
            this.tableList = recommendList;
            ////2匹配酒店
            this.tableList.push(custom, {
                colName: match_hotel_info.channel,
                colType: "2",
                ...match_hotel_info
            });
        },
        //选择自定义
        searchHotel(item, isSelect) {
            this.isSearch = true;
            let center = this.tableList.find(v => v.colType == 2);
            this.pointArray = [
                {
                    colType: "2",
                    center: true,
                    marker: false,
                    y: center.latitude,
                    x: center.longitude,
                    ...center
                }
            ];
            this.mapShow = true;
        },
        async checkHotel() {
            let chekedHotel = this.pointArray.find(v => v.colType == 1);
            let item = this.tableList.find(v => v.colType == 1);

            if (chekedHotel) {
                this.checkHotelLoading = true;
                let result = await mergeApi.getHotelInfo({
                    id: chekedHotel.id
                });
                this.checkHotelLoading = false;
                let { code, data, msg } = result;
                if (code != 0) return this.$message.warning(msg);
                item.isCol = false;
                Object.assign(item, data);
                this.checkedHotelId = data.id;
                this.mapShow = false;
            } else {
                this.$message.warning("请选择酒店");
            }
        },
        //查看地图.id
        checkMap(value) {
            this.isSearch = false;
            this.mapShow = true;
            this.pointArray = this.tableList
                .filter(v => !v.isCol)
                .map((v, index) => {
                    return {
                        center: v.id == value.id,
                        marker: true,
                        label: v.hotel_name,
                        y: v.latitude,
                        x: v.longitude,
                        ...v
                    };
                });
        }
    }
};
</script>
<style scoped>
</style>>

<style lang='less'>
#diffHotel {
    .jlHeaderBg {
        background: #000;
        div {
            background: #000;
            color: #fff;
        }
    }
    .headerBg {
        background: #b10c79;
        div {
            background: #b10c79;
            color: #fff;
        }
    }

    .pointer {
        cursor: pointer;
    }
    .table-warpper .el-table {
        max-width: 100%;
    }
    .loaddingPage {
        height: 100%;
    }
    .footer {
        text-align: center;
        padding: 12px 0px;
    }
}
</style>
