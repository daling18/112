<template>
    <el-dialog :visible.sync="visible" custom-class="gallery-layer" @open="handleLayerOpen" @close="handleClose">
        <h3 class="gallery-header" slot="title">图片选择</h3>
        <div class="gallery-body">
            <div class="gallery-aside">
                <div class="gallery-search">
                    <el-input size="small" placeholder="请输入图片名称" v-model="name" class="keyword"></el-input>
                    <el-button size="small" class="submit" type="primary" @click="handleImageSearch">搜索</el-button>
                </div>

                <el-menu :default-active="defaultActive" @select="handleTabChange">
                    <el-scrollbar>
                        <el-menu-item v-for="album in albumlist" :key="album.id" :index="album.id">{{album.name}}</el-menu-item>
                    </el-scrollbar>
                </el-menu>
            </div>
            <div class="gallery-content">
                <ul class="image-list" is="el-checkbox-group" v-model="selectImgs" :max="max">
                    <li is="el-checkbox" class="image-item" v-for="picture in pictureList" :key="picture.id" :label="picture">
                        <el-card :body-style="{padding: 0}" shadow="never">
                            <el-image type="cover" class="cover" :src="picture.sub_pic_url"></el-image>
                            <p class="name">{{picture.name}}</p>
                        </el-card>
                    </li>
                </ul>
                <el-pagination v-if="pagination.total_count >= 10" layout="prev, pager, next" :total="pagination.total_count" :current-page="pagination.page_index" @current-change="handlePageChange">
                </el-pagination>
            </div>
        </div>
        <div slot="footer">
            <el-button class="button" @click="handleClose">取消</el-button>
            <el-button class="button" type="primary" @click="handleSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { getPhotoalbumSubList, getPhotoalbumcate } from "src/api/tuan";
export default {
    props: {
        max: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            visible: false,
            albumlist: [],
            pictureList: [],
            album_id: "",
            loading: true,
            selectImgs: [],
            name: "",
            pagination: {
                page_index: 1,
                total_count: 0
            },
            defaultActive: "0"
        };
    },
    computed: {
        // defaultActive() {
        //     if (this.albumlist.length === 0) {
        //         return "";
        //     }
        //     return this.albumlist[0].id + "";
        // }
    },
    created() {
        // this.init();
    },
    methods: {
        handleLayerOpen() {
            this.name = "";
            this.init();
        },
        show(data = [], callback) {
            this.visible = true;
            this.showCallback = callback;
            this.selectImgs = [...data];
        },
        close() {
            this.visible = false;
        },
        // 获取相册
        getPhotoalbumcate() {
            return new Promise((resolve, reject) => {
                let params = {
                    data: {
                        name: this.name
                    }
                };
                getPhotoalbumcate({
                    params,
                    success: res => {
                        let { code, data, msg } = res.data;
                        if (code !== 0) {
                            return reject(msg);
                        }
                        resolve(data);
                    },
                    showLoading: false
                });
            });
        },
        // 照片
        getPhotoalbumSubList() {
            return new Promise((resolve, reject) => {
                this.loading = true;
                let params = {
                    data: {
                        // name: this.name,
                        id: this.album_id,
                        page: this.pagination.page_index
                    }
                };
                getPhotoalbumSubList({
                    params,
                    success: res => {
                        let result = res.data;
                        let { code, data, msg } = result;
                        if (code !== 0) {
                            return reject(msg);
                        }
                        this.loading = false;
                        this.pictureList = data.data;
                        this.pagination.page_index = data.page_index;
                        this.pagination.total_count = data.total_count;
                        resolve(data.data);
                    },
                    showLoading: false
                });
            });
        },
        handleTabChange(index) {
            this.$log.debug(index);
            this.album_id = this.defaultActive = index + "";
            this.pagination.page_index = 1;
            this.getPhotoalbumSubList();
        },
        handlePageChange(page) {
            this.pagination.page_index = page;
            this.getPhotoalbumSubList();
        },
        handleImageSearch() {
            this.init();
        },
        handleClose() {
            this.selectImgs = [];
            this.visible = false;
            this.$emit("close");
        },
        handleSubmit() {
            let images = this.selectImgs.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    path: item.sub_pic_url,
                    photoalbum_id: item.photoalbum_id
                };
            });
            this.$emit("confirm", images);
            this.showCallback && this.showCallback(images);
            this.handleClose();
        },
        init() {
            this.getPhotoalbumcate()
                .then(res => {
                    this.$log.debug(res);
                    if (!res || res.length == 0) {
                        this.$message.warning("搜索无数据");
                        return;
                    }
                    this.albumlist = res.map(item => {
                        return {
                            ...item,
                            id: String(item.id)
                        };
                    });
                    this.album_id = this.defaultActive = this.albumlist[0].id;
                    return this.getPhotoalbumSubList();
                })
                .catch(error => {
                    this.$log.error(error);
                    this.$message.error(error);
                    this.albumlist = [];
                });
        }
    }
};
</script>
<style lang="scss">
@import "src/assets/css/variables.scss";
.gallery {
    &-layer {
        min-height: 300px;
        width: 940px;
        .el-dialog__header {
            border-bottom: 1px solid $borderColor;
        }
        .el-dialog__body {
            padding: 0;
        }
        .el-dialog__footer {
            padding: 18px;
            background: #fdf6fb;
        }
        .button {
            margin: 0 25px;
        }
        .gallery-header{
            font-size: 18px;
        }
    }
    &-body {
        display: flex;
        height: 510px;
    }
    &-aside {
        display: flex;
        flex-direction: column;
        width: 300px;
        border-right: 1px solid $borderColor;
        .el-menu {
            border: none;
            flex: 1;
            overflow: hidden;
        }
    }
    &-content {
        flex: 1;
        max-height: 100%;
        .image-list {
            display: flex;
            padding: 0 10px;
            flex-wrap: wrap;
            .el-checkbox__inner {
                display: none;
            }
            .el-checkbox__label {
                padding-left: 0;
            }
            .cover {
                width: 100px;
                height: 100px;
            }
            .image-item {
                padding: 2px;
                margin: 10px 5px;
                text-align: center;
                border: 1px solid $borderColor;
                .el-card {
                    border: none;
                }
                &.is-checked {
                    border-color: $themeColor;
                }
                .name {
                    width: 100px;
                    line-height: 30px;
                    padding: 0 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    box-sizing: border-box;
                }
            }
        }
    }
    &-search {
        display: flex;
        padding: 10px;
        .keyword {
            flex: 1;
        }
        .submit {
            margin-left: 10px;
            min-width: 110px;
        }
    }
}
</style>