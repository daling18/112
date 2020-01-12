<template>
    <div class="explain">
        <h3 class="model">说明信息</h3>
        <div class="priceInfo">
            <ul class="planList" ref="ulPlain" :class="{'is_fixed' : isFixed}" id="ulList">
                <li @click="scrollTopPoint('feePlain')" id="plan-fee" class="is_Active">费用信息</li>
                <li @click="scrollTopPoint('gwPlain')" id="plan-shop">购物计划</li>
                <li @click="scrollTopPoint('visaPlain')" id="plan-visa">签证信息</li>
                <li @click="scrollTopPoint('sefPlain')" id="plan-sef">安全说明</li>
            </ul>
            <div class="baseDetail">
                <!-- tab1 费用 -->
                <div class="feeInfo" style="padding:20px 0" id="feePlain">
                    <div>
                        <h3>
                            <span class="spSquare">■</span>
                            <span>费用包含</span>
                        </h3>
                        <el-divider></el-divider>
                        <div class="price-content">
                            <el-form :inline="true" :model="includeType" class="demoIn" label-width="80px">
                                <el-form-item label="其他">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type0" placeholder="行程中包含其他费用等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="交通">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type1" placeholder="行程中所含机票等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="小交通">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type12" placeholder="当地或景区内用车信息"></el-input>
                                </el-form-item>
                                <el-form-item label="住宿">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type2" placeholder="行程中所列酒店标准等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="餐食">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type3" placeholder="行程中所列用餐等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="门票">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type4" placeholder="行程中标明的景点门票等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="导服">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type5" placeholder="专业领队以及当地司机，导游服务费等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="儿童标准">
                                    <el-input type="textarea" class="modelInp" v-model="includeType.type11" placeholder="儿童年龄身高及特殊说明"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="priceDetail" style="margin-top:20px">
                        <h3>
                            <span class="spSquare">■</span>
                            <span>费用不包含</span>
                        </h3>
                        <el-divider></el-divider>
                        <div class="price-content">
                            <el-form :inline="true" :model="excludeType" class="demoEx" label-width="80px">
                                <el-form-item label="其他">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type0" placeholder="行程中包含其他费用等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="交通">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type1" placeholder="行程中所含机票等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="小交通">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type12" placeholder="当地或景区内用车信息"></el-input>
                                </el-form-item>
                                <el-form-item label="住宿">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type2" placeholder="行程中所列酒店标准等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="餐食">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type3" placeholder="行程中所列用餐等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="门票">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type4" placeholder="行程中标明的景点门票等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="导服">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type5" placeholder="专业领队以及当地司机，导游服务费等信息"></el-input>
                                </el-form-item>
                                <el-form-item label="儿童标准">
                                    <el-input type="textarea" class="modelInp" v-model="excludeType.type11" placeholder="儿童年龄身高及特殊说明"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <!-- tab2 购物 -->
                <div class="plainDetail" style="padding:30px 0" id="gwPlain">
                    <!-- 购物计划 -->
                    <div class="shopDetail">
                        <div class="plain">
                            <h3>
                                <span class="spSquare">■</span>
                                <span>购物计划</span>
                            </h3>
                            <el-button type="primary" class="btn" @click="addRow(1)">新增计划</el-button>
                        </div>
                        <el-divider></el-divider>
                        <div class="table">
                            <el-table :data="shopInfo" border width="100%">
                                <el-table-column label="具体时间" align="center" width="250px">
                                    <template slot-scope="scope">
                                        <el-date-picker v-model="scope.row.start_time" type="date" placeholder="请选择时间" :value-format="'yyyy-MM-dd'"></el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column label="地点" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.place" placeholder="请输入集合地点"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center">
                                    <template slot="header">
                                        <span class="spColor">*</span>
                                        <span>购物场所名称</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.shopping_location" placeholder="请输入购物场所名称"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center">
                                    <template slot="header">
                                        <span class="spColor">*</span>
                                        <span>经营项目</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input type="textarea" v-model="scope.row.detail" placeholder="请输入经营项目"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center">
                                    <template slot="header">
                                        <span class="spColor">*</span>
                                        <span>最长停留时间</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.stay_time" placeholder="请输入停留时间"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="其他说明" align="center">
                                    <template slot-scope="scope">
                                        <el-input type="textarea" v-model="scope.row.remark" placeholder="请输入其他说明"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="100px">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="delRow(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <!-- 自费项目 -->
                    <div class="shopDetail" style="margin-top:20px">
                        <div class="plain">
                            <h3>
                                <span class="spSquare">■</span>
                                <span>自费项目</span>
                            </h3>
                            <el-button type="primary" class="btn" @click="addRow(2)">新增项目</el-button>
                        </div>
                        <el-divider></el-divider>
                        <div class="table">
                            <el-table :data="payInfo" border width="100%">
                                <el-table-column label="具体时间" align="center" width="250px">
                                    <template slot-scope="scope">
                                        <el-date-picker v-model="scope.row.start_time" type="date" placeholder="请选择日期" :value-format="'yyyy-MM-dd'"></el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column label="地点" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.place" placeholder="请输入集合地点"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center">
                                    <template slot="header">
                                        <span class="spColor">*</span>
                                        <span>项目名称和内容</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.shopping_location" placeholder="请输入项目名称和内容"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center">
                                    <template slot="header">
                                        <span class="spColor">*</span>
                                        <span>费用</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input v-model.number="scope.row.detail" placeholder="请输入费用"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="项目时长" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.stay_time" placeholder="请输入项目时长"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="其他说明" align="center">
                                    <template slot-scope="scope">
                                        <el-input type="textarea" v-model="scope.row.remark" placeholder="请输入其他说明"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="100px">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="delRow1(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <!-- tab3 签证信息 -->
                <div class="priceDetail" style="padding:30px 0" id="visaPlain">
                    <div class="plain">
                        <h3>
                            <span class="spSquare">■</span>
                            <span>签证信息</span>
                        </h3>
                        <el-button type="primary" class="btn" @click="addRow(3)">新增签证信息</el-button>
                    </div>
                    <el-divider></el-divider>
                    <el-upload class="upload-demo" action="/api/v1/lineservice/line/trip-attachment" :before-upload="beforeUpload" :on-preview="handlePreview" :on-success="onSuccess" :limit="1" :file-list="visaInfo1" name="trip_attachment">
                        <el-button size="small" type="primary">上传电子版签证信息</el-button>
                        <div slot="tip" class="el-upload__tip">仅支持上传一张图片/文件,图片仅支持jpeg、png、jpg、pdf 格式</div>
                    </el-upload>
                    <div class="table" style="margin-top:20px">
                        <el-table :data="visaInfo" border width="100%">
                            <el-table-column label="身份类型" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.id_desc"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="需要提交材料" align="center">
                                <template slot-scope="scope">
                                    <el-input type="textarea" v-model="scope.row.file_data" placeholder="请详细说明签证信息"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="详细说明" align="center">
                                <template slot-scope="scope">
                                    <el-input type="textarea" v-model="scope.row.file_data_desc" placeholder="请详细说明签证信息"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="150px">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="delRow2(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- tab4 安全说明 -->
                <div class="sefNotice" style="padding:30px 0" id="sefPlain">
                    <h3>
                        <span class="spSquare">■</span>
                        <span>安全说明</span>
                    </h3>
                    <el-divider></el-divider>
                    <div class="item-jr">
                        <div>预定须知</div>
                        <el-input type="textarea" class="modelInp" v-model="book.content" style="width:500px;margin-left:20px" placeholder="请输入预定须知"></el-input>
                    </div>
                    <div class="item-jr">
                        <div>安全说明</div>
                        <el-input type="textarea" class="modelInp" v-model="security.content" style="width:500px;margin-left:20px" placeholder="请输入安全说明"></el-input>
                    </div>
                    <div class="item-jr">
                        <div>温馨提示</div>
                        <el-input type="textarea" class="modelInp" v-model="notice.content" style="width:500px;margin-left:20px" placeholder="请输入温馨提示"></el-input>
                    </div>
                </div>
            </div>
            <Affix :offset-bottom="20">
                <div class="footer-bar">
                    <el-button type="primary" @click="returnBack">返回上一步</el-button>
                    <el-button type="primary" @click="returnList(1)">保存,返回产品列表</el-button>
                    <el-button type="primary" @click="returnList(2)">保存,添加团期</el-button>
                    <el-button type="primary" class="cancelBtn" @click="cancelBtn">取消</el-button>
                </div>
            </Affix>
        </div>
    </div>
</template>
<script>
import VueEditor from "src/plugins/editor/vue-html5-editor.vue";
import { lineOrderSaleCreateMisc } from "src/api/touristroute";
import Affix from "src/components/template/common/affix";
export default {
    data() {
        return {
            fileList: [],
            isFixed: "",
            activeName: "first",
            input: "",
            value1: "",
            includeType: {
                //费用包含
                type0: "",
                type1: "",
                type12: "",
                type2: "",
                type3: "",
                type4: "",
                type5: "",
                type11: ""
            },
            excludeType: {
                //费用不包含
                type0: "",
                type1: "",
                type12: "",
                type2: "",
                type3: "",
                type4: "",
                type5: "",
                type11: ""
            },
            shopInfo: [
                {
                    //购物计划
                    type: 1,
                    start_time: "",
                    stay_time: "",
                    place: "",
                    shopping_location: "",
                    detail: "",
                    remark: ""
                }
            ],
            payInfo: [
                {
                    //自费项目
                    type: 2,
                    start_time: "",
                    stay_time: "",
                    place: "",
                    shopping_location: "",
                    detail: "",
                    remark: ""
                }
            ],
            value: "",
            visaInfo: [
                //签证信息--手动
                {
                    type: 1,
                    id_desc: "",
                    file_data: "",
                    file_data_desc: "",
                    attachment_url: ""
                }
            ],
            visaInfo1: [
                //签证信息--附件上传
                // {
                //     type: 0,
                //     id_desc: "",
                //     file_data: "",
                //     file_data_desc: "",
                //     attachment_url: "",
                //     attachment_name: ""
                // }
            ],
            file_path: "",
            spliceLine: {
                line: "",
                order: "",
                safe: "",
                prompt: ""
            },

            feeIncludesRichText: "",
            fee_includes_length: 0,
            data: null,
            obj: {},
            shopping: [],
            visa: [],
            include: [], //fee包含
            exclude: [], //fee不包含
            trip_spec: {
                //行程特色
                content: ""
            },
            book: {
                //预定须知
                content: ""
            },
            security: {
                //安全说明
                content: ""
            },
            notice: {
                //温馨提示
                content: ""
            },
            dialogVisible: false
        };
    },
    components: { VueEditor, Affix },
    mounted() {
        this.returnList("");
        window.addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, true);
    },
    methods: {
        handleScroll() {
            let scrollToTop = document.documentElement.scrollTop;
            let planList = this.$refs.ulPlain.offsetTop;
            this.isFixed = scrollToTop > planList ? true : false;
            // let pi = document.getElementsByClassName("priceInfo")[0].offsetTop;
            // console.log("pi", pi);
            // console.log("滚动距离", scrollToTop);
            // console.log("ul到顶部距离", planList);

            //顶部tab
            var navBoxChild = document.getElementById("ulList").children;
            //底部切换
            var textChild = document.getElementsByClassName("baseDetail")[0]
                .children;
            var a = document.getElementById("ulList").offsetHeight;
            for (var i = 0; i < navBoxChild.length; i++) {
                if (scrollToTop + a >= textChild[i].offsetTop) {
                    for (var j = 0; j < navBoxChild.length; j++) {
                        navBoxChild[j].classList.remove("is_Active");
                    }
                    navBoxChild[i].classList.add("is_Active");
                }
            }
        },
        scrollTopPoint(id) {
            let scrollToTop = document.documentElement.scrollTop;
            console.log("滚动距离scrollToTop", scrollToTop);
            let toTopEvery = document.getElementById(id).offsetTop;
            console.log("每个盒子距顶部距离toTopEvery", toTopEvery);
            console.log(
                "this.$refs.ulPlain.offsetHeight",
                this.$refs.ulPlain.offsetHeight
            );
            document.documentElement.scrollTop =
                toTopEvery - this.$refs.ulPlain.offsetHeight;
        },
        //费用--数据回显
        holder() {
            if (this.include.length) {
                for (let i in this.include) {
                    this.includeType[
                        "type" + this.include[i].fee_type
                    ] = this.include[i].fee_desc;
                }
            }

            if (this.exclude.length) {
                for (let i in this.exclude) {
                    this.excludeType[
                        "type" + this.exclude[i].fee_type
                    ] = this.exclude[i].fee_desc;
                }
            }
        },
        addRow(item) {
            if (item == 1) {
                // 购物计划--新增计划
                var list = {
                    type: 1,
                    start_time: "",
                    stay_time: "",
                    place: "",
                    shopping_location: "",
                    detail: "",
                    remark: ""
                };
                // console.log("list",list)
                console.log("shopinfo", this.shopInfo);
                this.shopInfo.push(list);
            }
            if (item == 2) {
                // 购物自费项目--新增项目
                var list = {
                    type: 2,
                    start_time: "",
                    stay_time: "",
                    place: "",
                    shopping_location: "",
                    detail: "",
                    remark: ""
                };
                this.payInfo.push(list);
            }
            if (item == 3) {
                //签证信息--新增计划
                console.log("this.visaInfo", this.visaInfo);
                var list = {
                    //手动
                    type: 1,
                    id_desc: "",
                    file_data: "",
                    file_data_desc: "",
                    attachment_url: ""
                };
                this.visaInfo.push(list);
            }
        },

        // 购物--删除操作
        delRow(index) {
            if (this.shopInfo.length > 1) {
                this.shopInfo.splice(index, 1);
            }
        },
        delRow1(index) {
            if (this.payInfo.length > 1) {
                this.payInfo.splice(index, 1);
            }
        },
        delRow2(index) {
            if (this.visaInfo.length > 1) {
                this.visaInfo.splice(index, 1);
            }
        },
        // 点击上传电子凭证
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log("点击上传的文件", file);
        },
        beforeUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error("图片大小不能超过 5MB!");
            }
            return isLt5M;
        },
        onSuccess({ code, data, msg }, file, fileList) {
            console.log("上传文件response", data);
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.visaInfo1 = [
                {
                    url: data.file_path,
                    name: data.file_name
                }
            ];
        },
        returnBack() {
            this.$confirm("当前页面未保存数据将会丢失，确定离开?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    this.$router.push({
                        path: `/touristroute/trip/editSchedule/${this.$route.query.line_id}`
                    });
                })
                .catch(this.$log.debug);
        },

        //保存,返回产品列表
        returnList(item) {
            if (item == "") {
                let params = { init: "1", line_id: this.$route.query.line_id };
                lineOrderSaleCreateMisc(params).then(res => {
                    const { code, msg, data } = res;
                    if (code == 0) {
                        this.data = data;
                        console.log("说明信息data", data);
                        this.exclude = data.fee.exclude;
                        this.include = data.fee.include;
                        this.trip_spec = data.misc_cb.trip_spec;
                        this.book = data.misc_cb.book;
                        this.security = data.misc_cb.security;
                        this.notice = data.misc_cb.notice;
                        this.holder();
                        if (data.shopping_cb.plan) {
                            this.shopInfo = data.shopping_cb.plan;
                        }
                        if (data.shopping_cb.self) {
                            this.payInfo = data.shopping_cb.self;
                        }
                        if (data.visa_cb.fill) {
                            this.visaInfo = data.visa_cb.fill;
                        }
                        if (
                            data.visa_cb.upload &&
                            data.visa_cb.upload.length !== 0
                        ) {
                            this.visaInfo1 = data.visa_cb.upload.map(item => {
                                return {
                                    url: item.attachment_url,
                                    name: item.attachment_name
                                };
                            });
                        }

                        if (item == "") {
                            return;
                        } else {
                            if (item == 1) {
                                this.$router.push("/touristroute/trip/list");
                            } else if (item == 2) {
                                this.$router.push({
                                    name: "trip/addStock",
                                    params: {
                                        productId: this.$route.query.line_id
                                    }
                                });
                            } else {
                                let id =
                                    "/touristroute/trip/editSchedule/" +
                                    this.$route.query.line_id;
                                this.$router.push({ path: id });
                            }
                        }
                    } else {
                        this.$message.error(msg);
                    }
                });
            } else {
                this.shopping = this.shopInfo.concat(this.payInfo);
                // this.visa = this.visaInfo.concat(this.visaInfo1);
                let uploadVisaInfo = this.visaInfo1.map(file => {
                    return {
                        type: 0,
                        attachment_url: file.url,
                        attachment_name: file.name,
                        id_desc: ""
                    };
                });
                this.visa = [...this.visaInfo, ...uploadVisaInfo];
                let misc = [
                    {
                        type: 2,
                        content: this.book.content
                    },
                    {
                        type: 3,
                        content: this.security.content
                    },
                    {
                        type: 4,
                        content: this.notice.content
                    }
                ];
                let params = {
                    line_id: this.$route.query.line_id, //线路id
                    fee: [
                        {
                            type: 1, //费用包含
                            fee_type: 0,
                            fee_desc: this.includeType.type0
                        },
                        {
                            type: 1, //费用包含
                            fee_type: 1,
                            fee_desc: this.includeType.type1
                        },
                        {
                            type: 1, //费用包含
                            fee_type: 12,
                            fee_desc: this.includeType.type12
                        },
                        {
                            type: 1, //费用包含
                            fee_type: 2,
                            fee_desc: this.includeType.type2
                        },
                        {
                            type: 1, //费用包含
                            fee_type: 3,
                            fee_desc: this.includeType.type3
                        },
                        {
                            type: 1, //费用包含
                            fee_type: 4,
                            fee_desc: this.includeType.type4
                        },
                        {
                            type: 1, //费用包含
                            fee_type: 5,
                            fee_desc: this.includeType.type5
                        },
                        {
                            type: 1, //费用包含
                            fee_type: 11,
                            fee_desc: this.includeType.type11
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 0,
                            fee_desc: this.excludeType.type0
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 1,
                            fee_desc: this.excludeType.type1
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 12,
                            fee_desc: this.excludeType.type12
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 2,
                            fee_desc: this.excludeType.type2
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 3,
                            fee_desc: this.excludeType.type3
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 4,
                            fee_desc: this.excludeType.type4
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 5,
                            fee_desc: this.excludeType.type5
                        },
                        {
                            type: 0, //费用不包含
                            fee_type: 11,
                            fee_desc: this.excludeType.type11
                        }
                    ],
                    shopping: [...this.shopping],
                    visa: [...this.visa],
                    misc: misc
                };

                console.log("费用信息保存params", params);
                lineOrderSaleCreateMisc(params).then(res => {
                    const { code, msg, data } = res;
                    if (code !== 0) {
                        this.$message.error(msg);
                        return;
                    }

                    if (item == 1) {
                        this.$router.push("/touristroute/trip/list");
                    } else {
                        this.$router.push({
                            name: "trip/addStock",
                            params: {
                                productId: this.$route.query.line_id
                            }
                        });
                    }
                });
            }
        },
        //取消
        cancelBtn() {
            this.$router.push("/touristroute/trip/list");
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
.explain {
    width: 100%;
    .model {
        border-left: solid 3px rgba(179, 35, 139, 1);
        padding-left: 10px;
        margin: 13px 0;
    }
    .priceInfo {
        background: #fff;
        padding: 20px;
        box-sizing: border-box;

        .footer-bar {
            // margin: 50px auto;
            // width: 1000px;
            text-align: center;
            .cancelBtn {
                background: #fff;
                color: rgba(179, 35, 139, 1);
            }
        }
    }
}

.spSquare {
    color: #b10c79;
    margin-right: 10px;
}
.is_fixed {
    width: 80% !important;
    position: fixed;
    left: 220px;
    top: 0;
    z-index: 1000;
    background: #fff;
    // border-bottom: none !important;
}
.planList {
    overflow: hidden;
    li {
        float: left;
        padding: 20px;
    }
}
.is_Active {
    border-bottom: solid 2px #b10c79;
}

.item-jr {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    margin: 20px 0;
}
.price-content {
    .el-row {
        margin: 10px 0;
        .el-col {
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            .con-item {
                width: 150px;
                text-align: center;
            }
        }
    }
}
.shopDetail {
    margin-top: 10px;
    .spColor {
        display: inline-block;
        color: #ff0000;
        margin-right: 5px;
    }
}
.plain {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    .btn {
        background: #fff;
        color: rgba(179, 35, 139, 1);
    }
}
.btn1 {
    background: #fff;
    color: rgba(179, 35, 139, 1);
}
.table-custom {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 20px;
    th {
        height: 40px;
        background: #f4f4f4;
        color: #999;
        font-weight: 400;
        text-align: center;
        border: 1px solid #ccc;
        .spColor {
            color: #ff0000;
        }
    }
    td {
        border: 1px solid #ccc;
        padding: 10px;
    }
}
.vue-html5-editor {
    width: 60%;
    margin-left: 20px;
}
</style>
<style lang="scss">
.tabsMod {
    .el-tabs__item {
        padding: 0 30px;
        text-align: center;
    }
}
.modelInp {
    .el-textarea__inner {
        width: 400px;
        height: 120px;
    }
}
.demoIn {
    .el-form-item {
        width: 49%;
    }
}
.demoEx {
    .el-form-item {
        width: 49%;
    }
}
</style>