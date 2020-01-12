<template>
    <div class="edit-schedule">
        <h3 class="title">行程信息</h3>
        <el-menu class="nav-menu" mode="horizontal" :default-active="defaultActive" router ref="menu">
            <el-menu-item :index="'/touristroute/trip/editSchedule/'+ productId">完整行程</el-menu-item>
            <el-menu-item :index="'/touristroute/trip/editEasySchedule/'+ productId">简易行程</el-menu-item>
        </el-menu>
        <div class="section">
            <el-form inline size="samll" class="basic-form" ref="basicForm">
                <el-form-item label="集合时间：">
                    <el-input placeholder="请输入集合时间" v-model="form.assemble.assemble_time"></el-input>
                    <!-- <el-date-picker v-model="form.assemble_time" type="date" placeholder="选择日期"></el-date-picker> -->
                    <!-- <el-date-picker v-model="form.assemble.assemble_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="集合地点：">
                    <el-input placeholder="请输入集合地点" v-model="form.assemble.location"></el-input>
                </el-form-item>
            </el-form>
            <div class="schedule-form" label-width="104px" size="small">
                <el-form class="module" v-for="(trip, index) in trip_list" :key="index" :model="trip" ref="scheduleForm" label-width="100px">
                    <el-button class="add-module" @click="handleDeleteSchedule(index)" size="small" v-if="index !== 0">删除行程</el-button>
                    <div class="module-label">第{{index + 1}}天</div>
                    <el-form-item label="行程简介：" prop="title" :rules="[{
                required: true,
                message:'行程简介不能为空'
              }]">
                        <el-input placeholder="请输入您的行程简介" v-model="trip.title"></el-input>
                        <el-popover placement="right" popper-class="subtitle-popover" trigger="hover">
                            <img src="../../assets/images/addTrip/schedule-desc.png" alt />
                            <i class="el-icon-question" slot="reference"></i>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="交通：">
                        <el-col :span="5">
                            <el-input v-model="trip.traffic"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <ul class="traffic">
                                <li v-for="item in trafficData" :key="item.id" @click="handleTrafficClick(trip, item.name)">
                                    <i class="fa" :class="item.icon"></i>
                                </li>
                            </ul>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="餐食" class="meals" prop="diet" :rules="[{
            required: true,
            message:'餐食不能为空'
          }]">
                        <template v-for="diet in trip.diet">
                            <span :key="diet.type">
                                {{diet.type_name}}
                                <el-switch v-model="diet.include"></el-switch>
                                <el-input v-if="diet.include" v-model="diet.content"></el-input>
                            </span>
                        </template>
                        <p class="form-tip">默认餐食为自理，开启后可填写特色餐食</p>
                    </el-form-item>
                    <div class="inline">
                        <el-form-item label="酒 店：" prop="hotel_name" :rules="[{
              required: true,
              message: '酒店名称不能为空'
            }]">
                            <el-input placeholder="请输入酒店名称" v-model="trip.hotel_name" :rules="[{
                  required: true,
                  message:'酒店名称不能为空'
                }]"></el-input>
                        </el-form-item>
                        <el-form-item prop="hotel_type">
                            <span>请点亮星级：</span>
                            <el-rate v-model="trip.hotel_type" class="hotel-type"></el-rate>
                        </el-form-item>
                    </div>
                    <el-form-item label="景 点：">
                        <el-button @click="handleShowScenicLayer(trip.scenic, trip, 'scenic')">添加景点</el-button>
                    </el-form-item>
                    <!-- 景点 START -->
                    <template v-for="(scenic, index) in trip.scenic">
                        <el-form-item :key="scenic.id" class="scenic-item">
                            <el-col :span="3">
                                <el-tag closable @close="handleDeleteScenic(trip.scenic, index)" size="default">
                                    <span class="name">{{scenic.scm_scenic_title}}</span>
                                </el-tag>
                            </el-col>
                            <el-col :span="4">
                                <el-input placeholder="游玩时长" v-model="scenic.stay_duration"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-input placeholder="说明" v-model="scenic.desc"></el-input>
                            </el-col>
                        </el-form-item>
                    </template>
                    <!-- 景点 END -->

                    <el-form-item label="行程图片：">
                        <upload-image v-model="trip.imgs" :max="3" :isAgreement="is_agreed" />
                    </el-form-item>
                    <el-form-item label="行程描述 ：" :rules="[{
            required: true,
            message:'行程描述不能为空'
          }]">
                        <!-- <editor class="editor" v-model="trip.desc" /> -->
                        <el-input type="textarea" v-model="trip.desc" class="trip-desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="footer">
                <Affix :offset-bottom="0">
                    <div class="fixed-footer">
                        <el-button type="primary" @click="handleAddTrip">新增行程</el-button>
                        <el-button type="primary" @click="handlePerv">上一步</el-button>
                        <el-button type="primary" @click="handleSaveNext">保存下一步</el-button>
                    </div>
                </Affix>
            </div>
        </div>
        <scenic-layer ref="scenicLayer" />
        <!-- <gallery-layer ref="galleryLayer" :max="3" /> -->
        <choose-trip-layer ref="chooseTripLayer" @confirm="handleChooseTripConfirm" />
    </div>
</template>
<script>
import {
    createTrip,
    lineOrderSaleTripInfo,
    updateShowFornt
} from "src/api/touristroute";
// import Editor from "src/plugins/editor/vue-html5-editor";
import ScenicLayer from "src/components/template/touristroute/scenicLayer";
import GalleryLayer from "src/components/template/touristroute/galleryLayer";
import ChooseTripLayer from "src/components/template/touristroute/chooseTripLayer";
import UploadImage from "src/views/touristroute/components/addTrip/uploadImage";
import Affix from "src/components/template/common/affix";
import { Promise } from "q";

// import ScenicLayer from "src/components/template/touristroute/scenicLayer";
export default {
    name: "editSchedule",
    components: {
        // Editor,
        ScenicLayer,
        // GalleryLayer,
        ChooseTripLayer,
        UploadImage,
        Affix
        // ScenicLayer
    },
    props: {
        productId: {
            required: true,
            type: null
        }
    },
    filters: {
        mapDietText(type) {
            switch (type) {
                case 1:
                    return "早餐";
                case 2:
                    return "午餐";
                case 3:
                    return "晚餐";
                default:
                    return "";
            }
        }
    },
    data() {
        return {
            trip_list: [],
            previewLayerVisible: false,
            is_agreed: false,
            meals: {
                breakfast: {
                    isOpen: false,
                    type: 1,
                    content: ""
                },
                lunch: {
                    isOpen: true,
                    type: 2,
                    content: ""
                },
                supper: {
                    isOpen: false,
                    type: 3,
                    content: ""
                }
            },
            trafficData: [
                {
                    name: "【飞机】",
                    id: 1,
                    icon: "fa-plane"
                },
                {
                    name: "【大巴】",
                    id: 2,
                    icon: "fa-bus"
                },
                {
                    name: "【火车】",
                    id: 3,
                    icon: "fa-train"
                },
                {
                    name: "【游轮】",
                    id: 4,
                    icon: "fa-ship"
                },
                {
                    name: "【动车】",
                    id: 5,
                    icon: "fa-dong"
                },
                {
                    name: "【高铁】",
                    id: 6,
                    icon: "fa-gao"
                }
            ],
            form: {
                assemble: {
                    //集合信息
                    location: "", //集合地点
                    assemble_time: "" //集合时间
                }
            },
            showFront: true
        };
    },
    computed: {
        defaultActive() {
            return this.$route.path;
        },
        isAgreeUpload() {
            // if (!this.initData.is_agreed) {
            //   return false;
            // }
            // return this.initData.is_agreed;
            return false;
        },
        accountInfo() {
            return {};
        },
        postData() {
            // let formData = this.form;
            return {
                line_id: this.productId,
                assemble: {
                    location: this.form.assemble.location,
                    assemble_time: this.form.assemble.assemble_time
                },
                trip_list: this.trip_list.map((trip, index) => {
                    return {
                        title: trip.title,
                        day: index + 1,
                        traffic: trip.traffic,
                        hotel_type: trip.hotel_type,
                        hotel_id: 0,
                        hotel_name: trip.hotel_name,
                        desc: trip.desc,
                        diet: trip.diet.map(item => {
                            return {
                                ...item,
                                include: item.include ? 1 : 0
                            };
                        }),
                        scenic: trip.scenic,
                        imgs: trip.imgs.map(img => {
                            return {
                                url: img.url
                            };
                        })
                    };
                })
            };
        }
    },
    mounted() {
        this.scenicLayer = this.$refs.scenicLayer;
        // this.galleryLayer = this.$refs.galleryLayer;
        this.chooseTripLayer = this.$refs.chooseTripLayer;
        this.scheduleForm = this.$refs.scheduleForm;

        let copy_id = this.$route.query.copy_id;
        this.handleChooseTripConfirm(copy_id ? copy_id : this.productId);
    },
    methods: {
        createTrip() {
            return {
                title: "", //行程简介
                day: "", //第几天的行程
                traffic: "", //交通
                hotel_type: 0, //酒店星级类型
                hotel_id: "", //酒店编码
                hotel_name: "", //酒店名称
                desc: "", //行程描述
                diet: [
                    //餐食
                    {
                        content: "",
                        id: 0,
                        include: false,
                        type: 1,
                        type_name: "早餐"
                    },
                    {
                        content: "",
                        id: 0,
                        include: false,
                        type: 2,
                        type_name: "午餐"
                    },
                    {
                        content: "",
                        id: 0,
                        include: false,
                        type: 3,
                        type_name: "晚餐"
                    }
                ],
                scenic: [],
                imgs: []
            };
        },
        handleShowScenicLayer(data, parent, key) {
            this.scenicLayer.show(data, function(selected) {
                parent[key] = selected.map(({ id, theme_name }) => {
                    return {
                        scm_scenic_id: id,
                        scm_scenic_title: theme_name,
                        stay_duration: "",
                        desc: ""
                    };
                });
            });
        },
        handleDeleteScenic(data, index) {
            data.splice(index, 1);
        },
        handleShowGalleryLayer(data, parent, key) {
            this.galleryLayer.show(data, function(images) {
                parent[key] = images;
            });
        },
        handleUploadSuccess({ code, data, msg }, parent, key) {
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            parent[key].push(data.path);
        },
        handleDeleteSchedule(index) {
            this.trip_list.splice(index, 1);
        },
        handleAddTrip() {
            this.trip_list.push(this.createTrip());
        },
        handleShowTripLayer() {
            this.chooseTripLayer.show();
        },
        async handleChooseTripConfirm(id) {
            // console.log(id);
            let { code, data, msg } = await lineOrderSaleTripInfo({
                id
            });
            if (code !== 0) {
                this.$message.error(msg);
                return Promise.reject(msg);
            }
            this.$log.debug(data);
            this.form.assemble = {
                assemble_time: data.assemble.assemble_time || "",
                location: data.assemble.location || ""
            };
            this.showFront = data.show_front == 1;
            // 无数据不做覆盖
            if (data.trip_list.length === 0) {
                this.trip_list = new Array(data.line_day).fill(1).map(_ => {
                    return this.createTrip();
                });
                return;
            }
            this.trip_list = data.trip_list.map(item => {
                item.hotel_type = Number(item.hotel_type);
                item.diet = item.diet.map(diet => {
                    diet.include = diet.include == 0 ? false : true;
                    return diet;
                });
                // item.traffic = [];
                return item;
            });
        },
        // handleDeleteImg(image) {
        //   this.$log.debug(image);
        //   this.images = this.images.filter(ele => ele.url !== image.url);
        // },
        // 删除图片
        handleDeleteImg(images, index) {
            images.splice(index, 1);
        },
        // 图片预览
        handleImagePreview(file) {
            this.previewLayerVisible = true;
            this.imagePreviewUrl = file.url;
        },
        // 图片预览关闭
        handlePreviewLayerClose() {
            this.imagePreviewUrl = "";
        },
        // 同意本地上传回调
        handleSignSuccess() {},
        async postCreateTrip() {
            let { code, data, msg } = await createTrip(this.postData);
            if (code !== 0) {
                this.$message.error(msg);
                return Promise.reject(msg);
            }
            return Promise.resolve();
        },
        validate() {
            let fromValidate = this.$refs.scheduleForm.map(form => {
                return new Promise((resolve, reject) => {
                    form.validate(valid => {
                        if (valid) {
                            resolve();
                        } else {
                            reject(valid);
                        }
                    });
                });
            });
            return Promise.all(fromValidate);
        },
        handleSaveNext() {
            this.validate()
                .then(() => {
                    return this.postCreateTrip(this.postData);
                })
                .then(res => {
                    this.$log.debug(res);
                    this.$router.push({
                        path: "/touristroute/trip/explain",
                        query: {
                            line_id: this.productId
                        }
                    });
                })
                .catch(error => {
                    this.$log.error(error);
                });
        },
        handlePerv() {
            this.$confirm("当前页面未保存数据将会丢失，确定离开?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    this.$router.push({
                        path: `/touristroute/trip/addTripBasic/${this.productId}`,
                        query: {
                          type: this.$route.query.type || 'edit'
                        }
                    });
                })
                .catch(this.$log.debug);
        },
        handleTrafficClick(path, value) {
            path.traffic += value;
        },
        async updateShowFornt() {
            console.log(423);
            let { code, data, msg } = await updateShowFornt({
                line_id: this.productId,
                show: 0
            });
            if (code !== 0) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    },

    beforeRouteLeave(to, form, next) {
        let url = to.path;
        let vm = this;
        if (url.search("editEasySchedule") !== -1 && this.showFront) {
            this.$confirm(
                "“网站展示产品只能录入完整行程，简易行程产品不能在网站显示，是否更改网站发布为【否】！?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                }
            )
                .then(() => {
                    return this.updateShowFornt();
                })
                .then(next)
                .catch(() => {
                    this.$refs.menu.activeIndex = `/touristroute/trip/editSchedule/${this.productId}`;
                });
        } else {
            next();
        }
    }
};
</script>
<style lang="scss" scoped>
.form-tip {
    color: #ccc;
}
.nav-menu .el-menu-item {
    height: auto;
    line-height: 20px;
    padding: 10px 40px;
}
.footer {
    height: 54px;
    text-align: center;
    // height: 52px;
    .el-button {
        min-width: 180px;
    }
}
.fixed-footer {
    background: #fff;
    padding: 10px 0;
}
</style>
<style lang="scss">
@import "src/assets/css/variables.scss";
.edit-schedule {
    // .el-tag--small{
    //   height: auto;
    // }
    .title {
        border-left: 3px solid $themeColor;
        font-weight: bolder;
        font-size: 18px;
        line-height: 28px;
        margin: 10px 0;
        padding: 0 10px;
    }
    .el-input {
        max-width: 360px;
    }
    .basic-form {
        padding: 0 30px;
        padding-top: 30px;
    }
    .schedule-form {
        padding: 0 30px;
        .module {
            border: 1px solid $borderColor;
            padding: 30px 0;
            margin-left: 20px;
            position: relative;
            .add-module {
                position: absolute;
                right: 30px;
                top: 30px;
                z-index: 100;
            }
            .module-label {
                position: absolute;
                left: 0;
                top: 0;
                width: 35px;
                padding: 10px;
                box-sizing: border-box;
                text-align: center;
                margin-left: -35px;
                border-radius: 10px 0 0 10px;
                color: #fff;
                background-color: $themeColor;
            }
        }
        .meals {
            .el-input {
                width: 160px;
                margin-right: 20px;
            }
            .el-switch {
                margin: 0 5px;
            }
        }
        .el-rate {
            display: inline-block;
        }
        .scenic-item {
            .el-tag {
                display: flex;
                align-items: center;
                .name {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .el-col {
                margin-right: 10px;
            }
        }
        .images-list {
            display: flex;
            .image-item {
                margin-right: 10px;
                .cover {
                    position: relative;
                    width: 100px;
                    height: 80px;
                    .mark {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        background: rgba(0, 0, 0, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        color: #fff;
                        opacity: 0;
                    }
                    &:hover {
                        .mark {
                            opacity: 1;
                        }
                    }
                }
                .el-image {
                    width: 100px;
                    height: 80px;
                }
            }
        }
        .local-upload-button {
            display: inline-block;
            margin-left: 10px;
        }

        .editor {
            height: 150px;
        }

        .traffic {
            display: flex;
            margin-left: 20px;
            li {
                margin-right: 5px;
                cursor: pointer;
            }
            .fa {
                display: inline-block;
                width: 25px;
                height: 25px;
                background-color: $themeColor;
                border-radius: 50%;
                color: #fff;
                text-align: center;
                line-height: 25px;
                &-gao::before {
                    content: "高";
                }
                &-dong::before {
                    content: "动";
                }
            }
        }
    }
    .el-upload-list {
        display: flex;
        &__item {
            height: auto;
            border: none;
            padding: 0;
            border-radius: 0;
            margin-right: 10px;
            width: 100px;
            .el-image {
                width: 100px;
                height: 80px;
            }
            .el-radio {
                display: block;
            }
        }
        .image-item {
            .cover {
                position: relative;
                height: 80px;
                margin-bottom: 10px;
                &:hover .mark {
                    opacity: 1;
                }
            }
            .mark {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: space-around;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                color: #fff;
                opacity: 0;
            }
        }
    }
    .preview-image-layer {
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__headerbtn {
            z-index: 20;
        }
        .el-dialog__body {
            padding: 0;
            font-size: 0;
        }
    }

    .trip-desc {
        width: 720px;
    }
    .inline {
        display: flex;
        .el-form-item:not(:first-child) {
            .el-form-item__content {
                margin-left: 10px !important;
            }
        }
    }
}
</style>
