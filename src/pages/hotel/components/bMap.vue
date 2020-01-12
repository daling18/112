
<template>
    <div id="bMap">
        <div class="bMap-header" v-if="isSearch">
            <span>酒店名称：</span>
            <el-autocomplete v-model="keyword" :fetch-suggestions="querySearchAsync" placeholder="请输入酒店名称" @select="handleSelect">
                <template slot-scope="scope">
                    <div :title="scope.item.value" class="ellipsis" style="line-height:24px;font-size:14px;margin-bottom:-10px;width:100%">{{scope.item.value}}</div>
                    <span :title=" scope.item.address" style="font-size:12px">{{scope.item.address}}</span>
                </template>
            </el-autocomplete>
        </div>
        <div class="bMap-content" v-loading="pageLoading">
            <div id="bMap-container"></div>
        </div>
    </div>
</template>
<script>
import { mergeApi } from "src/api/hotel.js";
export default {
    name: "bMapSearch",
    data() {
        return {
            BMap: null,
            timer: null,
            searchTimer: null,
            keyword: "",
            pageLoading: false
        };
    },
    props: {
        // layout: {
        //     type: String,
        //     default: function() {
        //         return "search";
        //     }
        // },
        isSearch: {
            type: Boolean
        },
        mapShow: {
            type: Boolean
        },
        value: {
            type: Array,
            default: function() {
                return [
                    {
                        x: 116.400244,
                        y: 39.92556,
                        marker: true,
                        center: true,
                        label: "盈科旅游"
                    }
                ];
            }
        }
    },
    computed: {
        centerPoint() {
            let point = this.value.find(v => v.center);
            return (
                point || {
                    x: 116.400244,
                    y: 39.92556
                }
            );
        }
    },
    watch: {
        value: {
            handler() {
                if (!this.mapShow) {
                    return;
                }

                clearTimeout(this.timer);
                this.pageLoading = true;
                this.timer = setTimeout(() => {
                    this.init();
                    this.pageLoading = false;
                }, 300);
            },
            deep: true
        },
        mapShow() {
            this.keyword = "";
        }
    },
    methods: {
        async querySearchAsync(query, cb) {
            if (!this.mapShow) return cb([]);
            let reuslt = await mergeApi.autoMatch({
                keyword: this.keyword,
                city_name: this.centerPoint.city //对比酒店的地址
            });
            let { code, msg, data } = reuslt;
            if (code != 0) {
                this.$message.warning(msg);
                return cb([]);
            }
            data = Array.isArray(data) ? data : [];
            data = data.map(v => {
                return {
                    value: v.hotel_name,
                    id: v.id,
                    ...v
                };
            });
            if (data.length == 0)
                this.$message.warning("当前城市暂无匹配酒店信息");
            return cb(data);
        },
        handleSelect(val) {
            // let arr = this.value.filter(v => v.center);
            let value = [
                {
                    colType: "1",
                    center: true,
                    marker: true,
                    label: val.hotel_name,
                    y: val.latitude,
                    x: val.longitude,
                    ...val
                }
            ];
            // this.value = arr;
            this.$emit("input", value);
            this.$emit("change", value);
        },
        init() {
            let map = this.BMap;
            map.clearOverlays();
            map.centerAndZoom(
                new BMap.Point(this.centerPoint.x, this.centerPoint.y),
                15
            );
            map.setZoom(10);
            if (this.value && this.value.length > 0) {
                let pointMap = {};
                this.value.forEach(point => {
                    let isMarker = point.marker;
                    let labeltext = point.label;
                    let pointer = new BMap.Point(point.x, point.y);
                    if (isMarker) {
                        let marker = new BMap.Marker(pointer);
                        if (labeltext) {
                            let offset = {};
                            // if (pointMap[point.id]) {
                            //     offset = new BMap.Size(-200, -15);
                            // } else {
                            //     offset = new BMap.Size(20, -15);
                            // }
                            let label = new BMap.Label(labeltext, {
                                offset: new BMap.Size(20, -15)
                            });
                            label.setStyle({
                                color: "#333",
                                fontSize: "12px",
                                // height: "20px",
                                border: "1px solid",
                                borderRadios: "2px",
                                padding: "3px",
                                lineHeight: "20px",
                                fontFamily: "微软雅黑"
                            });
                            marker.setLabel(label);
                        }
                        map.addOverlay(marker);
                        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

                        // pointMap[point.id] = point;
                    }
                });
            }
        }
    },
    mounted() {
        this.BMap = new BMap.Map("bMap-container");
        this.BMap.addControl(new BMap.NavigationControl());
        this.BMap.addControl(new BMap.ScaleControl());
        this.BMap.addControl(new BMap.OverviewMapControl());
        this.BMap.enableScrollWheelZoom();
        this.init();
    }
};
</script>
<style lang="less">
#bMap {
    position: relative;
    .bMap-header {
        margin-bottom: 15px;
    }
    #bMap-container {
        height: 400px;
        width: 100%;
    }
}
</style>
