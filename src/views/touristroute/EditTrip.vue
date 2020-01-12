<template>
    <div class="edit-trip">
        <h2 class="title">基本信息</h2>
        <div class="section">
            <el-form class="edit-form" size="small" label-width="80px" :rules="rules" :model="postData" ref="editForm">
                <el-form-item label="产品类型" prop="trip_type" :rules="[{
                    required: true,
                    message:'产品类型为必填项'
                }]">
                    <el-checkbox-group v-model="trip_type">
                        <el-checkbox v-for="item in trip_type_data" :key="item.id" :label="item.id">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="行程名称" prop="line_title">
                    <el-input placeholder="请输您的行程名称" v-model="line_title"></el-input>
                    <p class="form-tip">
                        注：系统展示行程名称为行程名称+交通+行程天数+产品类型
                        <el-popover placement="right" trigger="click">
                            <img src="../../assets/images/addTrip/title-eg.png" />
                            <el-link slot="reference" type="primary">示例图片</el-link>
                        </el-popover>
                    </p>
                </el-form-item>
                <div class="form-inline">
                    <el-form-item prop="traffic">
                        <el-input placeholder="交通 例：双飞" class="traffic" v-model="traffic"></el-input>
                    </el-form-item>
                    <!-- <el-form-item prop="line_day" :rules="[{
                        type: 'number',
                        max: 20,
                        message: '出行天数不能超过20天'
                    }]"> -->
                    <el-form-item prop="line_day" :rules="[{ type: 'number', min:1, message:'请输入大于等于1的正整数'}]">
                        <el-input placeholder="行程天数" class="line_day" v-model.number="line_day">
                            <template slot="suffix">天</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="line_night">
                        <el-input class="line_night" v-model="line_night">
                            <span slot="suffix">晚</span>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item prop="line_subtitle">
                    <span slot="label">副标题</span>
                    <el-input placeholder="请输入2~50个字符" v-model="line_subtitle"></el-input>
                    <el-popover placement="right" trigger="hover">
                        <img src="../../assets/images/addTrip/subhead-eg.jpg" />
                        <i class="el-icon-info" slot="reference"></i>
                    </el-popover>
                </el-form-item>
                <el-form-item label="出发城市" prop="departure">
                    <!-- <el-input placeholder="请输入国家/地区/城市/机场" v-model="departure"></el-input> -->
                    <el-select v-model="departure" placeholder="请选择出发城市" :remote-method="handleSearchDeparture" multiple remote filterable clearable :loading="searchLoading" value-key="id" class="city-select">
                        <el-option v-for="city in departure" :key="city.id" :label="city.simple_name" :value="city">{{city.whole_name}}</el-option>
                        <el-option v-for="city in usableDepartureData" :key="city.id" :value="city" :label="city.simple_name">{{city.whole_name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目的地" prop="destination">
                    <el-select v-model="destination" placeholder="请选择出发城市" :remote-method="handleSearchDestination" multiple remote filterable clearable :loading="searchLoading" value-key="id" class="city-select">
                        <el-option v-for="city in destination" :key="city.id" :label="city.simple_name" :value="city"></el-option>
                        <el-option v-for="city in usableDestinationData" :key="city.id" :value="city" :label="city.simple_name">{{city.whole_name}}</el-option>
                    </el-select>
                </el-form-item>
                <div class="form-inline">
                    <el-form-item label="线路类型" prop="class_id_1">
                        <el-select v-model="class_id_1" placeholder="请选择">
                            <el-option v-for="item in class_1_data" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="class_id_1">
                        <el-select v-model="class_id_2">
                            <el-option v-for="item in class_2_data" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="class_id_1">
                        <el-select v-model="class_id_3">
                            <el-option v-for="item in class_3_data" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item label="成团人数" prop="minimum_team_num">
                    <el-input v-model="minimum_team_num"></el-input>人
                </el-form-item>
                <el-form-item label="供应商" prop="supply_info" v-if="!isSupplier" :rules="[{
                    required: true,
                    message: '供应商不能为空'
                }]">
                    <el-select placeholder="请输入2-50个字符" v-model="supply_info" :remote-method="querySupplier" reserve-keyword remote filterable value-key="id">
                        <el-option v-for="supply in supplier_data" :key="supply.id" :label="supply.name" :value="supply"></el-option>
                    </el-select>
                    <!-- <el-autocomplete placeholder="请输入2-50个字符" v-model="supply_info.name" :fetch-suggestions="querySupplier" @select="handleSupplierSelect"></el-autocomplete> -->
                </el-form-item>
                <el-form-item label="线路标签">
                    <el-tag v-for="tag in line_tags" :key="tag.id" closable type="info" size="default" @close="handleTagDelete(tag)">{{tag.theme_name}}</el-tag>
                    <el-button type="primary" plain @click="handleShowLabel" v-if="line_tags.length < 5" class="add-tag">
                        <i class="el-icon-circle-plus-outline"></i>&nbsp;选择
                    </el-button>
                </el-form-item>
                <el-form-item label="网站发布" prop="show_front">
                    <el-radio-group v-model="show_front" @change="handleShowFrontChange" :rules="[{
                        required: true,
                        message:'请选择是否发布到网站'
                    }]">
                        <el-radio label="1">是（显示）</el-radio>
                        <el-radio label="0">否（隐藏）</el-radio>
                    </el-radio-group>
                    <span class="form-tip">（注：选择网站发布后，不能进行简易开团，只能录入完整行程）</span>
                </el-form-item>
                <el-form-item label="负责人" prop="operator.name" :rules="[{
                    required: true,
                    message:'线路负责人不能为空'
                }]">
                    <el-autocomplete v-model="operator.name" placeholder="请输入联系人" :fetch-suggestions="queryOperator" @select="handleOperatorSelect"></el-autocomplete>
                    <i class="el-icon-link"></i>
                    <el-input v-model="operator.phone"></el-input>
                </el-form-item>
                <el-form-item label="行程图片" prop="line_imgs" :rules="[{
                    required: true,
                    message:'行程图片不能为空'
                }]">
                    <el-radio-group class="image-list" v-model="coverImage">
                        <upload-image v-model="images" :isAgreement="initData.is_agreed">
                            <template v-slot:image-item="{file}">
                                <el-radio :label="file.uid" class="cover-radio">设为首图</el-radio>
                            </template>
                        </upload-image>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="行程特色" prop="special" :rules="[{
                    required: true,
                    message:'行程特色不能为空'
                }]">
                    <el-input type="textarea" v-model="special" :autosize="{ minRows: 2, maxRows:1000  }"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer">
                <Affix :offset-bottom="0">
                    <div class="fixed-button">
                        <el-button type="primary" @click="saveAddStage('editForm')">保存，添加团期</el-button>
                        <el-button type="primary" @click="saveTrip('editForm')">保存，完善行程</el-button>
                        <el-button type="primary" plain @click="$router.go(-1)">取消</el-button>
                    </div>
                </Affix>
            </div>
        </div>
        <label-layer ref="labelLayer" @confirm="handleLayerConfirm" v-model="line_tags"></label-layer>
    </div>
</template>
<script>
import {
    getCreateLineInitData,
    getCreateLineType,
    getCreateOperator,
    searchDeparture,
    searchDestination,
    getCreateSupplier,
    createLineTrip,
    lineOrderSaleLineInfo as getLineInfo
} from "src/api/touristroute";

import GalleryLayer from "src/components/template/touristroute/galleryLayer";
import LabelLayer from "src/components/template/touristroute/labelLayer";
import UploadImgAgreementLayer from "src/plugins/uploadImgAgreement";
import UploadImage from "src/views/touristroute/components/addTrip/uploadImage";
import Affix from "src/components/template/common/affix";

import Moment from "moment";
import { Promise } from "q";

const regex = {
    number: /^\d*$/
};

export default {
    name: "editTrip",
    components: {
        GalleryLayer,
        LabelLayer,
        UploadImgAgreementLayer,
        UploadImage,
        Affix
    },
    props: {
        productId: null
    },
    data() {
        return {
            is_full_trip: true,
            galleryVisible: false,
            searchLoading: false,
            imagePreviewUrl: "",
            previewLayerVisible: false,
            tagData: [], //
            line_tags: [], // 线路标签
            initData: {}, // 初始化数据
            trip_type: ["1"], // 产品类型
            show_front: "1", // 网站发布
            class_id_1: "", // 线路一级
            class_id_2: "",
            class_id_3: "",
            // class_1_data:[],
            class_2_data: [],
            class_3_data: [],
            line_title: "", // 行程名称
            destination: [], // 目的地
            departure: [], //出发城市
            line_day: "", // 线路完整天数
            line_night: "", //线路完整夜晚数
            minimum_team_num: "", // 最小成团人数
            line_imgs: [], //线路图片
            line_subtitle: "", // 线路副标题
            supply_info: {
                id: "",
                name: ""
            }, // 采购供应商
            supplier_data: [],
            // 联系人
            operator: {
                name: "",
                mobile: "",
                id: ""
            },
            traffic: "",
            special: "", // 行程特色
            images: [],
            coverImage: "", // 首图
            departureData: [], // 城市数据
            destinationData: [],
            // 验证规则
            rules: {
                line_title: [
                    {
                        required: true,
                        message: "请输入行程名称"
                    }
                ],
                traffic: {
                    required: true,
                    message: "请输入交通信息"
                },
                line_day: [
                    {
                        required: true,
                        message: "请输入行程天数"
                    },
                    {
                        pattern: regex.number,
                        message: "行程天数必须为数字"
                    }
                ],
                line_night: [
                    {
                        required: true,
                        message: "请输入线路夜晚"
                    },
                    {
                        pattern: regex.number,
                        message: "线路夜晚必须为数字"
                    }
                ],
                trip_type: [
                    {
                        required: true,
                        message: "请选择产品类型"
                    },
                    {
                        type: "array",
                        message: "请选择2个以上的产品类型",
                        min: 2
                    }
                ],
                departure: [
                    {
                        required: true,
                        message: "请选择出发城市"
                    }
                ],
                destination: [
                    {
                        required: true,
                        message: "请输入目的地城市"
                    }
                ],
                minimum_team_num: [
                    {
                        required: true,
                        message: "请输入成团人数"
                    },
                    {
                        pattern: regex.number,
                        message: "请输入正确成团人数"
                    }
                ],
                supply_info: [],
                class_id_1: {
                    required: true,
                    message: "请选择线路类型"
                },
                class_id_2: {
                    required: true,
                    message: "请选择线路类型"
                },
                class_id_3: {
                    required: true,
                    message: "请选择线路类型"
                }
            }
        };
    },
    computed: {
        isSupplier() {
            return this.initData.is_supplier == 1;
        },
        copy_id() {
            return this.$route.query.copy_id;
        },
        // 产品类型数据
        trip_type_data() {
            if (!this.initData.trip_type) {
                return [];
            }
            return Object.entries(this.initData.trip_type).map(
                ([id, label]) => ({
                    id,
                    label
                })
            );
        },
        // 线路一级数据
        class_1_data() {
            if (!this.initData.line_type) {
                return [];
            }
            return this.initData.line_type;
        },
        // 可用出发城市
        usableDepartureData() {
            return this.departureData.filter(item => {
                return !this.departure.find(ele => ele.id === item.id);
            });
        },
        // 可用目的地
        usableDestinationData() {
            return this.destinationData.filter(item => {
                return !this.destination.find(ele => ele.id === item.id);
            });
        },
        postData() {
            // http://apidoc.yktour.com.cn/docs/bom/bom-1bfinid3d30r5
            return {
                id: this.productId,
                line_title: this.line_title,
                trip_type: this.trip_type,
                destination: this.destination.map(city => {
                    return {
                        city_id: city.id,
                        city_name: city.simple_name
                    };
                }),
                departure: this.departure.map(city => {
                    return {
                        city_id: city.id,
                        city_name: city.simple_name
                    };
                }),
                line_day: parseFloat(this.line_day),
                line_night: this.line_night,
                minimum_team_num: this.minimum_team_num,
                show_front: this.show_front,
                operator: this.operator,
                line_imgs: this.images.map(image => {
                    return {
                        url: image.url,
                        is_cover: image.uid == this.coverImage ? 1 : 0
                    };
                }),
                line_subtitle: this.line_subtitle,
                class_id_1: this.class_id_1,
                class_id_2: this.class_id_2,
                class_id_3: this.class_id_3,
                traffic: this.traffic,
                supply_info: this.supply_info,
                line_tags: this.line_tags.map(tag => tag.id),
                special: this.special
            };
        }
    },
    watch: {
        async class_id_1(newVal, oldVal) {
            let data = await this.getLineType({
                type: 2,
                pid: newVal
            });
            this.$log.debug(data);
            // oldVal 存在表示为默认值
            oldVal && (this.class_id_2 = "");
            this.class_2_data = data;
        },
        async class_id_2(newVal, oldVal) {
            let data = await this.getLineType({
                type: 3,
                pid: newVal
            });
            this.$log.debug(data);
            oldVal && (this.class_id_3 = "");
            this.class_3_data = data;
        },
        images: {
            handler(newVal) {
                // 自动设置首图
                let isSelected = newVal.find(image => {
                    if (this.coverImage) {
                        if(image.uid == this.coverImage){
                            return true;
                        }
                    }else{
                        if(image.is_cover == 1){
                            return true;
                        }
                    }
                    return false;
                });
                
                if (!isSelected) {
                    this.$nextTick(() => {
                        let image = newVal[0];
                        this.coverImage = image ? image.uid : "";
                    })
                } else {
                     this.$nextTick(()=> {
                         this.coverImage = isSelected.uid;
                     })
                }
            },
            deep: true
        },
        $route: {
            handler() {
                this.initPage();
            },
            immediate: true
        }
    },
    created() {
        // this.initPage();
    },
    mounted() {
        this.labelLayer = this.$refs.labelLayer;
        this.galleryLayer = this.$refs.galleryLayer;
        this.uploadImgAgreementLayer = this.$refs.uploadImgAgreementLayer;
    },
    methods: {
        initPage() {
            getCreateLineInitData()
                .then(res => {
                    this.$log.info(res);
                    let { code, data, msg } = res;
                    if (code !== 0) {
                        return Promise.reject(msg);
                    }
                    this.initData = data;
                    this.operator = data.operator;
                })
                .catch(this.$log.error);
            // 数据回填 (编辑时的数据回填)
            if (this.productId) {
                this.getLineInfo(this.productId);
            }
            // 数据回填 (编辑时的数据回填)
            if (this.copy_id) {
                this.getLineInfo(this.copy_id);
            }
        },
        getLineInfo(id) {
            getLineInfo({
                id
            }).then(({ code, data, msg }) => {
                if (code != 0) {
                    this.$message.error(msg);
                    return;
                }
                this.trip_type = data.trip_type.map(item => item.trip_type);
                this.line_title = data.line_title;
                this.traffic = data.traffic;
                this.line_day = data.line_day;
                this.line_night = data.line_night;
                this.minimum_team_num = data.minimum_team_num;
                this.line_subtitle = data.line_subtitle;
                this.is_full_trip = data.is_full_trip != 0;
                this.departure = data.departure.map(city => {
                    return {
                        id: city.city_id,
                        whole_name: city.city_name,
                        simple_name: city.city_name
                    };
                });
                this.destination = data.destination.map(city => {
                    return {
                        id: city.city_id,
                        whole_name: city.city_name,
                        simple_name: city.city_name
                    };
                });
                this.class_id_1 = data.class_id_1;
                this.class_id_2 = data.class_id_2;
                this.class_id_3 = data.class_id_3;
                this.supply_info = data.supply_info;
                this.supplier_data = [data.supply_info];
                this.line_tags = data.line_tags.map(tag => {
                    return {
                        id: tag.theme_id,
                        theme_name: tag.theme_name
                    };
                });
                this.show_front = data.show_front;
                this.operator = data.operator;
                // let coverImage = data.line_imgs.find(
                //     image => image.is_cover == 1
                // );
                // this.coverImage = coverImage ? coverImage.id : "";
                this.images = data.line_imgs;
                this.special = data.special;
            });
        },
        getLineType(data) {
            return getCreateLineType(data)
                .then(res => {
                    let { code, data, msg } = res;
                    if (!code === 0) {
                        return Promise.reject(msg);
                    }
                    return Promise.resolve(data.line_type);
                })
                .catch(error => {
                    this.$log.debug(error);
                    return Promise.resolve([]);
                });
        },
        queryOperator(keyword, done) {
            getCreateOperator({
                name: keyword
            })
                .then(res => {
                    let { code, data, msg } = res;
                    if (!code === 0) {
                        return Promise.reject(msg);
                    }
                    let results = data.map(item => {
                        return {
                            value: item.name,
                            ...item
                        };
                    });
                    done(results);
                })
                .catch(error => {
                    this.$log.error(error);
                    done([]);
                });
        },
        // 联系人选择事件
        handleOperatorSelect(value) {
            this.$log.debug(value);
            this.operator = {
                id: value.id,
                name: value.name,
                phone: value.mobile
            };
        },
        // 显示图片上传 协议
        handleShowUploadProtocol() {
            this.uploadImgAgreementLayer.show();
        },
        // 上传成功
        handleUploadSuccess(response, file, fileList) {
            this.$log.debug(response, file, fileList);
            let { code, data, msg } = response;

            if (!code === 0) {
                this.$message.error(msg);
                return;
            }
            this.images.push({
                url: data.path,
                is_cover: 0
            });
        },
        // type 1 出发地 2 目的地
        searchCity(keyword, type) {
            let searchFun = type === 1 ? searchDeparture : searchDestination;
            return new Promise((resolve, reject) => {
                if (!keyword) {
                    // resolve([]);
                    return;
                }
                searchFun({
                    name: keyword
                })
                    .then(res => {
                        this.searchLoading = false;
                        this.$log.debug(res);
                        let { code, data, msg } = res;
                        if (code !== 0) {
                            resolve([]);
                        }
                        resolve(data);
                    })
                    .catch(error => {
                        resolve([]);
                    });
            });
        },
        // 搜索出发地
        handleSearchDeparture(keyword) {
            this.searchCity(keyword, 1).then(res => {
                this.departureData = res.filter(item => {
                    return !this.departureData.find(ele => ele.id === item.id);
                });
            });
        },
        // 搜索目的地
        handleSearchDestination(keyword) {
            this.searchCity(keyword, 2).then(res => {
                this.destinationData = res;
            });
        },
        // 是否显示到网站
        handleShowFrontChange(value) {
            if (value == 1) {
                return;
            }
            this.$confirm(
                "网站发布选择【否】后，该产品将不在官网店铺、APP店铺、小程序各端口展示，是否确认选择?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                }
            )
                .then(() => {})
                .catch(() => {
                    this.show_front = "1";
                });
        },
        // 供应商查询
        async querySupplier(keyword) {
            let { code, data, msg } = await getCreateSupplier({
                name: keyword
            });
            if (code !== 0) {
                this.supplier_data = [];
                return Promise.reject(msg);
            }
            this.supplier_data = Object.entries(data).map(([id, name]) => {
                return {
                    id,
                    name
                };
            });
        },
        handleSupplierSelect(val) {
            this.supply_info.name = val.name;
        },
        handleShowLabel() {
            this.labelLayer.show();
        },
        handleLayerConfirm() {},
        // 标签关闭
        handleTagDelete(selected) {
            this.line_tags = this.line_tags.filter(
                tag => tag.id !== selected.id
            );
        },
        // 本地上传协议签署成功实践
        handleSignSuccess(is) {
            this.initData.is_agreed = is;
        },
        async createLineTrip() {
            let { code, data, msg } = await createLineTrip(this.postData);
            if (code !== 0) {
                this.$message.error(msg);
                return Promise.reject(msg);
            }
            return Promise.resolve(data);
        },
        validate(form) {
            return new Promise((resolve, reject) => {
                this.$refs[form].validate(valid => {
                    this.$log.debug(valid);
                    if (valid) {
                        resolve();
                    }
                });
            });
        },
        // 保存新增团期
        saveAddStage(form) {
            this.validate(form)
                .then(() => {
                    return this.createLineTrip(this.postData);
                })
                .then(data => {
                    this.$router.push({
                        name: "trip/addStock",
                        params: {
                            productId: data.id
                        }
                    });
                })
                .catch(error => {
                    this.$log.error(error);
                });
        },
        saveTrip(form) {
            this.validate(form)
                .then(() => {
                    return this.createLineTrip(this.postData);
                })
                .then(data => {
                    if (this.is_full_trip || this.$route.query.type == "add") {
                        this.$router.push({
                            name: "trip/editSchedule",
                            params: {
                                productId: data.id
                            },
                            query: this.$route.query
                        });
                    } else {
                        this.$router.push({
                            name: "trip/editEasySchedule",
                            params: {
                                productId: data.id
                            },
                            query: this.$route.query
                        });
                    }
                })
                .catch(error => {
                    this.$log.error(error);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
.title {
    border-left: 3px solid $themeColor;
    font-weight: bolder;
    font-size: 18px;
    line-height: 28px;
    margin: 10px 0;
    padding: 0 10px;
}
.edit-form {
    max-width: 800px;
    padding: 30px 20px;
    .el-input {
        max-width: 360px;
        margin-right: 10px;
    }
    .traffic,
    .line_day,
    .line_night {
        max-width: 130px;
    }
    .el-select {
        width: 160px;
        margin-right: 10px;
    }
}
.form-tip {
    color: #ccc;
}
.tag-layer {
    .tag-search {
        display: flex;
        margin-bottom: 10px;
    }
    .tag-keywords {
        margin-right: 20px;
    }
    .tip {
        background: rgba(253, 246, 251, 1);
        color: $themeColor;
    }
}
.local-upload-button {
    display: inline-block;
    margin-left: 10px;
}
.city-select {
    width: 360px !important;
}
.image-desc,
.image-tip {
    line-height: 20px;
}
.image-tip {
    color: #e0e0e0;
}
.add-tag {
    margin-left: 5px;
}
.cover-radio {
    margin-top: 10px;
}
.footer {
    height: 52px;
}
.fixed-button {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px 100px;
    // padding: 0 100px;
    // height: 72px;
}
.affix {
    background-color: #fff;
}
</style>
<style lang="scss">
.subtitle-popover {
    padding: 0;
}
.edit-trip {
    .upload-tip {
        font-size: 14px;
        margin-top: 10px;
    }
    .form-inline {
        display: flex;
        .el-form-item:not(:first-child) {
            .el-form-item__content {
                margin-left: 0 !important;
            }
        }
    }
}
</style>