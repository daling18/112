<template>
    <div class="trip-imgs-choose">
        <el-upload action="/api/v1/photo/upload" :on-success="handleUploadSuccess" :before-upload="handleUploadBefore" class="trip-image-upload" :disabled="disabled" list-type="picture" :file-list="images" :limit="max">
            <el-button type="primary" plain @click.stop="handleShowGallery" :disabled="disabled">图库选择</el-button>
            <template v-if="!is_agreed">
                <el-button type="primary" plain :disabled="disabled" @click.stop="handleShowUploadProtocol">本地上传</el-button>
            </template>
            <template v-else>
                <el-button type="primary" plain :disabled="disabled">本地上传</el-button>
            </template>
            <div slot="tip" class="upload-tip">最多上传{{max}}张，支持jpg，jpeg，gif，png格式，10M以内图片 <el-link @click="handleShowUploadProtocol" v-if="is_agreed" type="primary">查看协议</el-link>
            </div>
            <div slot="file" slot-scope="{file}" class="image-item">
                <div class="cover">
                    <el-image :src="file.url"></el-image>
                    <div class="mark">
                        <i class="el-icon-zoom-in" @click="handleImagePreview(file)"></i>
                        <i class="el-icon-delete" @click="handleDeleteImg(file)"></i>
                    </div>
                </div>
                <slot name="image-item" :file="file"></slot>
            </div>
        </el-upload>
        <!-- 本地上传 -->
        <upload-img-agreement-layer ref="uploadImgAgreementLayer" />
        <!-- 图库 -->
        <gallery-layer ref="galleryLayer" @confirm="handleGalleryConfirm" :max="galleryMax" />
        <!-- 图片预览 -->
        <el-dialog :visible.sync="previewLayerVisible" @close="handlePreviewLayerClose" class="preview-image-layer">
            <el-image :src="imagePreviewUrl" v-if="imagePreviewUrl"></el-image>
        </el-dialog>
    </div>
</template>
<script>
import UploadImgAgreementLayer from "src/plugins/uploadImgAgreement";
import GalleryLayer from "src/components/template/touristroute/galleryLayer";
import Moment from "moment";
import { isImmutable } from "babel-types";
import { mapState } from "vuex";
import { USER_INFO } from "src/configuration/mutation-types";

export default {
    components: {
        UploadImgAgreementLayer,
        GalleryLayer
    },
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        },
        isAgreement: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            accepts: ["png", "jpg", "jpeg", "gif"],
            imagePreviewUrl: "",
            previewLayerVisible: false
            // is_agreed: false,
        };
    },
    computed: {
        ...mapState("uploadImage", {
            is_agreed(state) {
                return state.isAgree;
            }
        }),
        images: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        },

        disabled() {
            return this.images.length >= this.max;
        },
        galleryMax() {
            return this.max - this.images.length;
        }
    },
    mounted() {
        this.galleryLayer = this.$refs.galleryLayer;
        this.uploadImgAgreementLayer = this.$refs.uploadImgAgreementLayer;
    },
    methods: {
        // 显示图片上传 协议
        handleShowUploadProtocol() {
            this.uploadImgAgreementLayer.show();
        },
        // 本地上传协议签署成功
        // handleSignSuccess(is) {
        //     this.is_agreed = is;
        // },
        handlePreviewLayerClose() {
            this.imagePreviewUrl = "";
        },
        // 图片预览
        handleImagePreview(file) {
            this.previewLayerVisible = true;
            this.imagePreviewUrl = file.url;
        },
        handleUploadBefore(file) {
            let fileTypes = this.accepts.map(type => `image/${type}`);
            let isLt10M = file.size / 1024 / 1024 < 10;
            // 合法格式
            let isLegalFormat = fileTypes.includes(file.type);
            if (!isLegalFormat) {
                this.$message.error(
                    "只能上传" + this.accepts.join("，") + "格式的图片"
                );
            }

            if (!isLt10M) {
                this.$message.error("请上传10M以下图片");
            }

            return isLegalFormat && isLt10M;
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
                id: data.id,
                is_cover: 0
            });
        },
        handleDeleteImg(file) {
            this.images = this.images.filter(image => image.uid !== file.uid);
        },
        handleGalleryConfirm(images) {
            this.images = images.reduce(function(results, image) {
                results.push({
                    id: image.id,
                    url: image.path
                });
                return results;
            }, this.images);
            // this.images = [...this.images, {}];
            // this.galleryVisible = false;
        },
        // 显示图库
        handleShowGallery() {
            this.galleryLayer.show();
        }
    }
};
</script>
<style lang="scss">
@import "src/assets/css/variables.scss";
.trip-imgs-choose {
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
            .el-image {
                display: block;
            }
        }
    }
    .upload-tip {
        color: #888888;
    }
}
</style>