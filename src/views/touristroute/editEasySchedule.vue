<template>
    <div class="edit-easy-schedule">
        <h3 class="title">简易行程</h3>
        <el-menu class="nav-menu" mode="horizontal" router :default-active="$route.path">
            <el-menu-item :index="'/touristroute/trip/editSchedule/'+ productId">完整行程</el-menu-item>
            <el-menu-item :index="'/touristroute/trip/editEasySchedule/'+ productId">简易行程
            </el-menu-item>
        </el-menu>
        <el-form class="section">
            <el-form-item label="行程附件" size="small">
                <el-upload class="upload-demo" ref="upload" action="/api/v1/lineservice/line/trip-attachment" :on-success="handleTripPicSuccess" :data="{type: 2}" :file-list="fileList" :on-remove="handleRemove" :before-upload="beforeTripDocUpload" name="trip_attachment" :multiple="false">
                    <el-button class="el-button" slot="trigger" type="primary">选取附件</el-button>
                    <div class="el-upload__tip">仅支持.doc格式或.docx格式word文档上传，最大文件为3M</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="handlePrev">
                    上一步</el-button>
                <!-- <el-button @click="handleShowChooseTripLayer">使用其他线路行程</el-button> -->
                <el-button @click="handleNext" type="primary">下一步</el-button>
            </el-form-item>
        </el-form>
        <choose-trip-layer ref="chooseTripLayer" @confirm="handleChooseTripConfirm" />
    </div>
</template>
<script>
import ChooseTripLayer from "src/components/template/touristroute/chooseTripLayer";
import { createTrip, lineOrderSaleTripInfo } from "src/api/touristroute";
export default {
    components: {
        ChooseTripLayer
    },
    props: {
        productId: {
            required: true
        }
    },
    data() {
        return {
            fileList: []
        };
    },
    computed: {
        postData() {
            return {
                line_id: this.productId,
                attachment: this.fileList[0] ? this.fileList[0].url : "",
                attachment_name: this.fileList[0] ? this.fileList[0].name : ""
            };
        }
    },
    mounted() {
        this.chooseTripLayer = this.$refs.chooseTripLayer;
        this.getTrip(this.productId);
    },
    methods: {
        async getTrip(id) {
            let { code, data, msg } = await lineOrderSaleTripInfo({
                id
            });
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            // 附件存在
            if (data.attachment) {
                this.fileList.push({
                    url: data.attachment,
                    name: data.attachment_name
                });
            }
        },
        beforeTripDocUpload(file) {
            const isLt10M = file.size / 1024 / 1024 < 3;
            if (!isLt10M) {
                this.$message.error("上传附件大小不能超过 3MB!");
            }
            return isLt10M;
        },
        handleTripPicSuccess({ code, data, msg }, file, filelist) {
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.fileList = [
                {
                    name: data.file_name,
                    id: data.id,
                    url: data.file_path
                }
            ];
        },
        handleRemove() {
            this.fileList = [];
        },
        handleShowChooseTripLayer() {
            this.chooseTripLayer.show();
        },
        handleChooseTripConfirm(response, file, fileList) {},
        handlePrev() {
            this.$router.push({
                path: `/touristroute/trip/addTripBasic/${this.productId}`,
                query: {
                    type: this.$route.query.type || "edit"
                }
            });
        },
        async handleNext() {
            let { code, data, msg } = await createTrip(this.postData);
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.$router.push({
                path: "/touristroute/trip/explain",
                query: {
                    line_id: this.productId
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
/deep/.el-form-item {
    max-width: 500px;
}
.nav-menu .el-menu-item {
    height: auto;
    line-height: 20px;
    padding: 10px 40px;
}
.title {
    border-left: 3px solid $themeColor;
    font-weight: bolder;
    font-size: 18px;
    line-height: 28px;
    margin: 10px 0;
    padding: 0 10px;
}
</style>
<style lang="scss">
.edit-easy-schedule {
    .title {
        margin-bottom: 20px;
    }
    .section {
        padding: 30px;
    }
}
</style>
