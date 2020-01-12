<template>
    <el-dialog title="酒店房型对比" id="diffRoom" width="70%" :visible="visible" :before-close="handleBeforeClose" :close-on-click-modal="false">
        <div class="diffHotel-container" v-loading="loading">
            <div>
                <div class="diffhotel-header">盈科酒店</div>
                <el-scrollbar class="diffhotel-list">
                    <ul ref="scrollA">
                        <li :class="{'diffHotel-item':true, 'diffHotel-bg':item.roomTypeId}" v-for="item in YKHotel" :key="item.room_id">
                            <p>
                                <span class="diffHotel-yk diffHotel-index">{{item.room_id}}</span>
                                <span v-if="item.roomTypeId" class="diffHotel-index diffHotel-jl">{{item.roomTypeId}}</span>
                            </p>
                            <div class="diffHotel-content">
                                <el-radio v-show="!isCat" v-model="leftCheckId" :label="item.room_id" :disabled="item.disabled">&nbsp;</el-radio>
                                <div>
                                    <div class="diffHotel-blod">{{item.name}}</div>
                                    <div>
                                        <span>面积: {{item.size || '无'}}</span> |
                                        <span>楼层: {{item.floor || '无'}}</span> |
                                        <span>窗户: {{item.window || '无'}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-if="YKHotel.length==0" class="diffRoomEmpty">无数据</li>
                    </ul>
                </el-scrollbar>
            </div>
            <div>
                <div class="diffhotel-header" style="background:#000">捷旅酒店</div>
                <el-scrollbar class="diffhotel-list">
                    <ul ref='scrollB'>
                        <li :class="{'diffHotel-item':true, 'diffHotel-bg':item.room_id}" v-for="(item,index) in JlHotel" :key="item.roomTypeId">
                            <p>
                                <span class="diffHotel-index diffHotel-jl">{{item.roomTypeId}}</span>
                                <span class="diffHotel-yk diffHotel-index" v-if="item.room_id">{{item.room_id}}</span>
                            </p>
                            <div class="diffHotel-content">
                                <el-radio v-show="!isCat" v-model="rightCheckId" :disabled="item.disabled" :label="item.roomTypeId">&nbsp;</el-radio>
                                <div>
                                    <div class="diffHotel-blod title ">
                                        <span> {{item.roomTypeCn}}</span>
                                        <div v-if="!isCat">
                                            <el-button type="primary" v-if="item.room_id" @click="splitRoom(item)">拆分</el-button>
                                            <el-button v-else :type="generaterType(item)" :disabled="generaterDis(item)" @click="megerRoom(item)">合并</el-button>
                                        </div>

                                    </div>
                                    <div>
                                        <span>面积: {{item.acreage}}</span> |
                                        <span>楼层: {{item.floorDistribute}}</span> |
                                        <span>窗户: {{item.window}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-if="JlHotel.length==0" class="diffRoomEmpty">无数据</li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="$emit('close')">取 消</el-button>
            <el-button v-if="!isCat" type="primary" :disabled="loading" :loading="buttonLoading" @click="mergeConfirm">确 定</el-button>
            <el-button v-if="isCat&&status!=0&&status!=1" type="primary" :disabled="loading" :loading="buttonLoading" @click="reMerge">重新合并</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mergeApi } from "src/api/hotel.js";
export default {
    name: "diffRoom",
    props: {
        visible: {
            type: Boolean
        },
        roomObj: {
            type: Object
        },
        loading: {
            type: Boolean
        },
        status:{
            default:function () {
                return "1"
            }
        }
    },
    data() {
        return {
            rightCheckId: null,
            leftCheckId: null,
            JlHotel: [],
            YKHotel: [],
            conInfo: [],
            buttonLoading: false,
            product_id: 0,
            hotel_id: 0,
            isCat: false
        };
    },
    methods: {
        handleBeforeClose() {
            this.$emit("close");
        },
        init(params, isCat, item) {
            let errorList = [];
            this.isCat = Boolean(isCat);
            this.product_id = params.product_id;
            this.hotel_id = params.hotel_id;
            let conInfo = [...this.roomObj.conInfo];
            this.YKHotel = this.roomObj.YKHotel.map(v => {
                return {
                    disabled: false,
                    ...v
                };
            });
            this.JlHotel = this.roomObj.JlHotel.map(v => {
                let jlRoom = conInfo.find(
                    c => c.roomTypeId == v.roomTypeId
                ) || {
                    roomTypeId: null,
                    room_id: null
                };
                let { room_id, roomTypeId } = jlRoom;
                if (room_id) {
                    let ykRoom = this.YKHotel.find(y => y.room_id == room_id);
                    if (ykRoom) {
                        ykRoom.roomTypeId = roomTypeId;
                        ykRoom.disabled = true;
                    } else {
                        errorList.push({
                            roomTypeId: v.roomTypeId,
                            room_id
                        });
                        room_id = null;
                    }
                }
                if (errorList.length > 0)
                    console.error("当前房型关系数据有误", +errorList);
                return {
                    room_id,
                    disabled: Boolean(room_id),
                    ...v
                };
            });
            //虽然没有编辑 但是加了一层保护
            this.isCheckNull();
            this.scrollTop();
        },
        generaterDis(item) {
            let ykItem = this.YKHotel.find(v => v.room_id == this.leftCheckId);
            let jlItem = this.JlHotel.find(
                v => v.roomTypeId == this.rightCheckId
            );
            if (!jlItem || jlItem.disabled || !ykItem || ykItem.disabled)
                return true;
            return this.rightCheckId != item.roomTypeId;
        },
        generaterType(item) {
            let ykItem = this.YKHotel.find(v => v.room_id == this.leftCheckId);
            let jlItem = this.JlHotel.find(
                v => v.roomTypeId == this.rightCheckId
            );
            if (!jlItem || jlItem.disabled || !ykItem || ykItem.disabled)
                return "info";
            return this.rightCheckId != item.roomTypeId ? "info" : "primary";
        },
        megerRoom(item) {
            let YKHotel = this.YKHotel.find(v => v.room_id == this.leftCheckId);
            // console.log({ YKHotel });
            YKHotel.roomTypeId = item.roomTypeId;
            item.room_id = this.leftCheckId;
            YKHotel.disabled = true;
            item.disabled = true;
            // this.isCheckNull();
        },
        isCheckNull() {
            let ykItem = this.YKHotel.find(v => !v.roomTypeId);
            let jlItem = this.JlHotel.find(v => !v.room_id);
            if (ykItem) {
                this.leftCheckId = ykItem.room_id;
            } else {
                this.leftCheckId = null;
            }
            if (jlItem) {
                this.rightCheckId = jlItem.roomTypeId;
            } else {
                this.rightCheckId = null;
            }
        },
        splitRoom(item) {
            let YKHotel = this.YKHotel.find(v => v.room_id == item.room_id);
            item.room_id = null;
            YKHotel.roomTypeId = null;
            YKHotel.disabled = false;
            item.disabled = false;
        },
        //合并确定
        async mergeConfirm() {
            let { YKHotel, JlHotel } = this;
            let mergeRoom = JlHotel.filter(v => v.room_id);
            let params = {
                product_id: this.product_id,
                hotel_id: this.hotel_id
            };
            if (mergeRoom && mergeRoom.length > 0) {
                params.roomTypeArr = mergeRoom.map(v => {
                    return {
                        room_id: v.room_id,
                        roomTypeId: v.roomTypeId
                    };
                });
            }
            this.buttonLoading = true;
            let result = await mergeApi.combineRoom(params);
            this.buttonLoading = false;
            let { code, msg } = result;
            if (code != 0) return this.$message.error(msg);
            this.$message.success(msg);
            this.$emit("close");
        },
        reMerge() {
            this.$emit("reMerge", {
                product_id: this.product_id, //捷旅 id
                hotel_id: this.hotel_id, //酒店id
                is_select: 0 //   0 查看房型列表 1 查看
            });
            // this.isCat = false;
            // this.YKHotel.map(v => {
            //     if (v.roomTypeId) {
            //         v.roomTypeId = undefined;
            //         v.disabled = false;
            //     }
            // });
            // this.JlHotel.map(v => {
            //     if (v.room_id) {
            //         v.room_id = undefined;
            //         v.disabled = false;
            //     }
            // });
        },
        scrollTop() {
            setTimeout(() => {
                this.$refs.scrollA.scrollIntoView &&
                    this.$refs.scrollA.scrollIntoView(true);
                this.$refs.scrollB.scrollIntoView &&
                    this.$refs.scrollB.scrollIntoView(true);
            }, 0);
        }
    },
    mounted() {
        // this.init();
    }
};
</script>
<style scoped>
>>> .diffhotel-list {
    overflow-x: hidden;
}
</style>
<style lang="scss" scoped>
$height: 75px;
#diffRoom {
    .diffHotel-index {
        // height: 20px;
        padding: 3px;
        font-size: 12px;
        color: #fff;
        display: inline-block;
        text-align: center;
        border-radius: 2px;
        // vertical-align: middle;
        // line-height: 20px;
        // margin-right: 5px;
    }
    .diffHotel-yk {
        background: #b10c79;
    }
    .diffHotel-jl {
        background: #000;
    }
    .diffHotel-blod {
        font-weight: 800;
        font-size: 18px;
    }
    .diffHotel-bg {
        background: #fbf8f8;
    }
    .diffRoomEmpty {
        line-height: $height;
        height: $height;
        text-align: center;
    }
    .diffHotel-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        & > div {
            flex: 1;
            margin: 10px;
            .diffhotel-header {
                text-align: center;
                line-height: $height;
                height: $height;
                color: #fff;
                background: #b10c79;
            }
            .diffhotel-list {
                height: 500px;
                ul {
                    width: 100%;
                }
                .diffHotel-item {
                    padding: 5px 10px;
                    border: 1px solid #ccc;
                    height: $height;
                    margin: 10px 0px;
                    .diffHotel-content {
                        display: flex;
                        // justify-content: space-around;
                        align-items: center;
                        > label {
                            flex-basis: 26px;
                        }
                        .title {
                            display: flex;
                            justify-content: space-between;
                        }
                        > div {
                            flex: 1;
                        }
                    }
                }
            }
        }
    }
}
</style>