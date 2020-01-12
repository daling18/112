 <template>
    <div class="approval-detail">
        <h2 class="title">基本信息</h2>
        <div class="section" v-if="basicInfo">
            <h3 class="section-title">线路上架</h3>
            <div class="section-content">
                <h4 class="product-name">
                    <span class="name">{{basicInfo.line_title}}</span>
                    <el-link type="primary" @click="handleEditTitle" v-if="$menuPermission(editCaption)">编辑</el-link>
                    <el-link type="primary" @click="$refs.tripLayer.show">行程查看></el-link>
                </h4>
                <el-row class="basic-info">
                    <el-col class="label" :span="8">产品编号：{{basicInfo.line_no}}</el-col>
                    <el-col class="label" :span="8">出发地：{{basicInfo.departure}}</el-col>
                    <el-col class="label" :span="8">行程天数：{{basicInfo.travel_time}}</el-col>
                    <el-col class="label" :span="8">供应商：{{basicInfo.supply_info_name}}</el-col>
                    <el-col class="label" :span="8">线路分类：{{basicInfo.trip_type}}</el-col>
                    <el-col class="label" :span="8">创建时间：{{basicInfo.create_time}}</el-col>
                    <el-col class="label" :span="8">
                        产品标签：
                        <el-tag type="success" size="small" :key="name" v-for="name in basicInfo.line_tags">{{name}}</el-tag>
                    </el-col>
                </el-row>
                <el-radio-group class="images" v-model="coverImage" :disabled="!$menuPermission(editPoster)" @change="handleCoverChange">
                    <span class="label">行程图片：</span>
                    <div class="image" v-for="image in basicInfo.line_imgs" :key="image.id">
                        <el-image :src="image.url" fit="fill" class="cover-image"></el-image>
                        <el-radio :label="image.id">设为首图</el-radio>
                    </div>
                </el-radio-group>
                <el-row class="stock-detail" :gutter="30">
                    <el-col :span="12">
                        <stock-calendar v-model="selectedDate" class="calendar" :selectable="handleSelectable" :multiple="false" :calendar-data="calendarData">
                            <template v-slot:cell="{date, meta, disabled}">
                                <div v-if="Object.keys(meta).length" class="cell" :class="{
                  hasStock: !!Object.keys(meta).length
                }">
                                    <p class="date">{{date.split('-')[2]}}</p>
                                    <p class="price">
                                        ￥{{meta.sales_price}}
                                        <br />
                                        {{meta | mapCountText}}
                                    </p>
                                </div>
                                <div v-else class="cell">
                                    <p class="date">{{date.split('-')[2]}}</p>
                                </div>
                            </template>
                        </stock-calendar>
                        <ul class="sotck-total">
                            <li class="sotck-item">
                                <span>团期个数</span>
                                {{summary.total}}
                            </li>
                            <li class="sotck-item sales">
                                <span>销售中</span>
                                {{summary.sales}}
                            </li>
                            <li class="sotck-item ended">
                                <span>已截止</span>
                                {{summary.ended}}
                            </li>
                            <li class="sotck-item stop">
                                <span>已停团</span>
                                {{summary.stop}}
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="12" class="stock-detail">
                        <h5 class="title">团期：{{quoteBasic.day}}</h5>
                        <p class="stock-number">团号：{{quoteBasic.line_no}}</p>
                        <p class="stock-storage">
                            收客：已收 {{quoteBasic.booking_stock}}
                            <template v-if="quoteBasic.is_confirm != 1">| 余 {{quoteBasic.balance}} | 库存 {{quoteBasic.stock}}</template>
                        </p>
                        <p class="stock-end-time">报名截止时间：{{quoteBasic.end_date_time}}</p>
                        <p class="package">
                            <el-select placeholder="请选择出发城市" v-model="selectedCity">
                                <el-option v-for="city in cityData" :key="city.city_id" :value="city.id" :label="city.city_name"></el-option>
                            </el-select>
                            <el-select placeholder="请选择套餐" v-model="selectedPackage">
                                <el-option v-for="item in packageList" :key="item.package_id" :value="item.package_id" :label="item.package_name"></el-option>
                            </el-select>
                            <span class="deposit">定金说明:{{quoteBasic.deposit_desc}}</span>
                        </p>
                        <el-table class="package-detail" :data="packageDetail">
                            <el-table-column label="价格类型" prop="other_name"></el-table-column>
                            <el-table-column label="结算价" prop="settle_price"></el-table-column>
                            <el-table-column label="销售价" prop="sales_price"></el-table-column>
                            <el-table-column label="网上预定价" prop="online_price"></el-table-column>
                            <el-table-column label="价格说明" prop="price_desc"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="section approval-wrap">
            <h3 class="section-title">审批进度</h3>
            <div class="section-content">
                <el-steps direction="vertical" v-if="approvalData" :active="approvalData.logs.length" class="approval-progress">
                    <el-step v-for="(item, index) in approvalData.logs" :key="item.id" size="large">
                        <p class="approval-title" slot="title">
                            {{item.operator_name}}: {{item.deal_name}}
                        </p>
                        <div class="approval-description" slot="description">
                            <p v-if="index == 0">
                                所属组织：{{approvalData.org_code_name}} {{approvalData.create_time}}
                            </p>
                            <p v-if="item.remark">
                                备注:{{item.remark}}
                            </p>
                            <p v-for="image in item.attachment" :key="image.attachment" class="img">
                                <img :src="image" alt="审批截图">
                            </p>
                        </div>

                    </el-step>
                </el-steps>
            </div>
        </div>

        <div class="fixed-footer" v-if="approvalData && approvalData.status == 1">
            <Affix :offset-bottom="0">
                <div class="button-group">
                    <el-button @click="handleRefuse">审批不通过</el-button>
                    <el-button @click="handleAgree" type="primary">审批通过</el-button>
                </div>
            </Affix>
        </div>

        <el-dialog :visible.sync="approvalLayerVisible" title="审批操作" center>
            <el-form size="small" label-width="80px">
                <el-form-item label="审批">
                    <el-radio-group v-model="approvalForm.operation">
                        <el-radio :label="1">同意</el-radio>
                        <el-radio :label="2">不同意</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传附件">
                    <el-upload action="/api/v1/system/bom-notice/upload-data-file" :limit="3" list-type="picture-card" name="file_name" :on-success="handleFileUpload" :disabled="approvalForm.attachment.length >= 3" class="upload" :class="{
                        max:approvalForm.attachment.length >= 3
                    }">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="approvalForm.remark" placeholder="请输入备注信息"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="approvalLayerVisible =false">取消</el-button>
                <el-button @click="handleApproval">确定</el-button>
            </div>
        </el-dialog>
        <trip-layer :product-id="productId" ref="tripLayer" />
    </div>
</template>
<script>
import {
    lineOrderSaleLineInfo,
    lineOrderSaleTripInfo,
    getCalendarList,
    getStockDetail,
    getApprovalDetail,
    postLineTitle,
    dealApproval,
    setCoverImage,
    lineOrderSaleMiscInfo
} from "src/api/touristroute";
import StockCalendar from "src/components/template/common/stock-calendar";
import TripLayer from "src/views/touristroute/components/approvalDetail/triplayer";
import Affix from "src/components/template/common/affix";
import Moment from "moment";

export default {
    name: "approval-detail",
    components: {
        StockCalendar,
        TripLayer,
        Affix
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
        }
    },
    props: {
        approvalId: {
            required: true,
            type: null
        }
    },
    data() {
        return {
            basicData: null,
            stockData: null,
            quoteData: null,
            travelData: null,
            approvalData: null,
            informationData: null,
            editCaption: "/touristroute/trip/approval-detail/edit-caption",
            editPoster: "/touristroute/trip/approval-detail/edit-poster",
            selectedDate: [],
            selectedPackage: "",
            selectedCity: "",
            coverImage: "",
            fileList: [],
            approvalForm: {
                attachment: [],
                remark: "",
                operation: ""
            },
            tripLayerVisible: true,
            approvalLayerVisible: false
        };
    },
    computed: {
        productId() {
            if (!this.approvalData) {
                return "";
            }
            return String(this.approvalData.out_id);
        },
        basicInfo() {
            if (!this.basicData) {
                return null;
            }
            let basicData = this.basicData;
            return {
                line_title: basicData.line_title,
                line_no: basicData.line_no,
                departure: basicData.departure
                    .map(item => item.city_name)
                    .join(" "),
                travel_time: `${basicData.line_day}天${basicData.line_night}晚`,
                supply_info_name: basicData.supply_info.name,
                trip_type: basicData.trip_type
                    .map(item => item.trip_name)
                    .join(">"),
                create_time: basicData.create_time,
                line_tags: basicData.line_tags.map(item => item.theme_name),
                line_imgs: basicData.line_imgs
            };
        },
        calendarData() {
            let data = {};
            if (!this.stockData) {
                return data;
            }
            this.stockData.calender.forEach(element => {
                data[element.day] = element;
            });
            return data;
        },
        summary() {
            if (!this.stockData) {
                return {};
            }
            return this.stockData.summary;
        },
        quoteBasic() {
            if (!this.quoteData) {
                return {};
            }
            return this.quoteData.base;
        },
        cityData() {
            if (!this.quoteData) {
                return [];
            }
            return this.quoteData.pkg_list.map(item => item.city);
        },

        packageList() {
            if (!this.quoteData) {
                return [];
            }
            let selectedPackage = this.quoteData.pkg_list.find(
                item => item.city.id === this.selectedCity
            );
            return selectedPackage.pkg;
        },
        packageDetail() {
            if (!this.quoteData) {
                return [];
            }
            let cityData = this.quoteData.pkg_list.find(
                item => item.city.id === this.selectedCity
            );
            let packageData = cityData.pkg.find(
                item => item.package_id === this.selectedPackage
            );
            return packageData.item;
        }
    },
    watch: {
        $route: {
            handler: function(val, oldVal) {
                // this.getTravelData();
                this.getApprovalDetail().then(() => {
                    this.getBasicInfo();
                    this.getCalendarData();
                });
                // this.getMiscInfo();
            },
            immediate: true,
            deep: true
        },
        calendarData(newVal) {
            let days = Object.keys(newVal);
            // if (days.length !== 0) {
            //    this.selectedDate = days.slice(-1);
            // }
        },
        selectedDate(newVal) {
            console.log(newVal,'日期')
            this.getPackageData(this.selectedDate[0]);
        },
        cityData(newVal) {
            this.selectedCity = newVal[0].id;
        },
        packageList(newVal) {
            this.selectedPackage = newVal[0].package_id;
        },
        basicData(newVal) {
            let coverImage = newVal.line_imgs.filter(
                image => image.is_cover == 1
            )[0];
            this.coverImage = coverImage && coverImage.id;
        }
    },
    methods: {
        // 基本信息
        async getBasicInfo() {
            let { code, data, msg } = await lineOrderSaleLineInfo({
                id: this.productId
            });
            if (code != 0) {
                this.$message.error(msg || "");
                return;
            }
            this.basicData = data;
        },
        // 获取日历数据概览
        async getCalendarData() {
            let { code, data, msg } = await getCalendarList({
                line_id: this.productId
            });
            if (code != 0) {
                this.$message.error(msg || "");
                return;
            }
            this.stockData = data;
            if (data.calender.length !== 0) {
                const nowDate = Moment().format('YYYY-MM-DD')
                const nowDateTime = Moment(nowDate).valueOf();
                for (let i = 0; i < data.calender.length; i++) {
                    let calenderTime = new Date(data.calender[i].day).getTime();
                    if (nowDateTime <= calenderTime && data.calender[i].is_ended == 0) {
                    return  this.selectedDate.push(data.calender[i].day);
                    } 
                }
                this.selectedDate.push(data.calender[data.calender.length-1].day);
            }
        },
        // 审批详情
        async getApprovalDetail() {
            let { code, data, msg } = await getApprovalDetail({
                approval_id: this.approvalId
            });
            if (data.code != 0) {
                this.$message.error(msg || "");
                return;
            }
            this.approvalData = data.data;
            return Promise.resolve();
        },
        // 套餐
        async getPackageData(day) {
            let { code, data, msg } = await getStockDetail({
                line_id: this.productId,
                day
            });
            if (code != 0) {
                this.$message.error(msg);
                return;
            }
            this.quoteData = data;
        },
        // 处理日历是否可选
        handleSelectable(day) {
            return !this.calendarData[day];
        },
        handleEditTitle() {
            this.$prompt("请输入线路名称", "线路名称修改", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputErrorMessage: "线路名称不能为空",
                inputPattern: /.+/
            })
                .then(({ value }) => {
                    return postLineTitle({
                        line_id: this.productId,
                        line_title: value
                    });
                })
                .then(({ code, data, msg }) => {
                    if (code !== 0) {
                        this.$message.error(msg);
                        return;
                    }
                    this.$message.success(msg);
                    this.getBasicInfo();
                })
                .catch(this.$log.info);
        },
        async handleApproval() {
            let { code, data, msg } = await dealApproval({
                approval_ids: [this.approvalId],
                operation: this.approvalForm.operation,
                remark: this.approvalForm.remark,
                attachment: this.approvalForm.attachment.join(",")
            });

            this.$log.debug(code, data, msg);
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.$message.success(msg);
            this.approvalLayerVisible = false;
            this.getApprovalDetail();
        },
        // 审批通过
        handleAgree() {
            this.approvalForm.operation = 1;
            this.approvalLayerVisible = true;
        },
        // 审批拒绝
        handleRefuse() {
            this.approvalForm.operation = 2;
            this.approvalLayerVisible = true;
        },
        handleFileUpload(response, file, fileList) {
            this.approvalForm.attachment = fileList.map(({ response }) => {
                return response.data.file_path;
            });
        },
        async handleCoverChange(id) {
            let { code, data, msg } = await setCoverImage({
                line_id: this.productId,
                id
            });
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.$message.success(msg);
            this.getBasicInfo();
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
.section {
    padding: 0 20px;
    .section-title {
        line-height: 30px;
        padding: 10px;
        font-size: 18pxpx;
        border-bottom: 1px solid $borderColor;
        margin-bottom: 20px;
        &::before {
            content: "";
            display: inline-block;
            width: 5px;
            height: 5px;
            margin: 0 5px;
            background-color: $themeColor;
            vertical-align: middle;
        }
    }
    .product-name {
        margin-bottom: 10px;
        .name,
        .el-link {
            margin-right: 10px;
        }
    }
    .basic-info {
        .el-col {
            line-height: 1;
            margin-bottom: 10px;
        }
    }
}
.approval-progress {
    .approval-title {
        font-size: 14px;
        color: #333;
        
    }
    .approval-description {
        color: #999999;
        font-size: 14px;
        .img {
            width: 200px;
            height: 200px;
            float: left;
            margin-right: 20px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    /deep/.el-step__main {
        padding-bottom: 30px;
    }
}
.approval-wrap {
    padding-bottom: 80px;
    margin-bottom: 0;
}
.fixed-footer {
    height: 52px;
    text-align: center;
    .button-group {
        padding: 10px 0;
        background: $gray;
    }
}
</style>
<style lang="scss">
@import "src/assets/css/variables.scss";
.approval-detail {
    .max .el-upload {
        display: none;
    }
    .title {
        border-left: 3px solid $themeColor;
        font-weight: bolder;
        font-size: 18px;
        line-height: 28px;
        margin: 10px 0;
        padding: 0 10px;
    }
    .images {
        display: flex;
        text-align: center;
        margin-bottom: 10px;
        align-items: center;
        .label {
            font-size: 14px;
            margin-right: 10px;
        }
        .image {
            margin-right: 10px;
        }
        .el-image {
            width: 100px;
            height: 80px;
        }
        .el-radio {
            display: block;
            margin-top: 5px;
        }
    }
    .calendar {
        .el-checkbox__label {
            padding-left: 0;
        }
        .calendar-footer {
            display: none;
        }
        .cell {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            line-height: 1.2;
            font-size: 12px;
            padding: 5px;
            .price {
                text-align: right;
            }
            &.hasStock {
                background-color: #fffaf3;
            }
        }
    }
    // 团期信息
    .stock-detail {
        .title {
            font-size: 14px;
            line-height: 20px;
        }
        .stock-number,
        .stock-storage,
        .stock-end-time {
            margin-bottom: 10px;
        }
        .package {
            margin-bottom: 15px;
            .el-select {
                margin-right: 10px;
            }
        }
        .package-detail .el-table {
            &__footer-wrapper thead div,
            &__header-wrapper thead div,
            &__fixed-header-wrapper thead div,
            th {
                background-color: #f7f9fb !important;
            }
        }
    }
    .sotck-total {
        border: 1px solid $borderColor;
        margin-top: -1px;
        display: flex;
        padding: 15px 10px;
        justify-content: flex-end;
        .sotck-item {
            margin: 0 10px;
            span {
                margin-right: 5px;
            }
            &:before {
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 5px;
            }
            &.sales:before {
                background-color: #f88c31;
            }
            &.ended:before {
                background-color: #cccaca;
            }
            &.stop:before {
                background-color: #75a9fd;
            }
        }
        :first-child {
            margin-right: auto;
        }
    }
    .el-timeline-item__tail {
        border-color: $themeColor;
    }
}
</style>