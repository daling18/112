<template>
    <el-dialog :visible.sync="visible" title="景点选择" custom-class="scenic-layer" center @open="getScenicData" @close="handleLayerClose">
        <div class="search-bar">
            <el-input placeholder="请输入景点名称" v-model.trim="name" class="keyword" size="small"></el-input>
            <el-button class="submit" size="small" @click="getScenicData">搜索</el-button>
        </div>
        <el-checkbox-group class="scenic-list" v-model="selected" v-loading="loading">
            <el-scrollbar class="scroll-area" :view-style="{
                  padding: '0 10px' }">
                <el-row type="flex" :gutter="20">
                    <el-col :span="8" v-for="scenic in scenicData" :key="scenic.id">
                        <el-checkbox :label="scenic.id" @change="(checked)=>{handleSingleChange(checked, scenic)}">{{scenic.theme_name}}</el-checkbox>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </el-checkbox-group>
        <div slot="footer" class="footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { getScenic } from "src/api/touristroute";
import { Promise } from "q";
export default {
    data() {
        return {
            defaultSelected: [],
            visible: false,
            scenicData: [],
            loading: false,
            name: "",
            selected: []
        };
    },
    computed: {
        // selected: {
        //   get() {
        //     return this.defaultSelected.map(item => item.id);
        //   },
        //   set(newValue) {
        //     this.defaultSelected = this.scenicData.filter(item =>
        //       newValue.includes(item.id)
        //     );
        //   }
        // }
    },
    mounted() {},
    methods: {
        async getScenicData() {
            this.loading = true;
            let { code, data, msg } = await getScenic({
                scenic_title: this.name,
                page_index: 1,
                page_size: 100
            });
            this.loading = false;
            this.$log.debug(data);
            if (code !== 0) {
                this.$message.error(msg);
                return Promise.reject(msg);
            }
            this.scenicData = data.list.map(item => {
                return {
                    id: item.scenic_id,
                    theme_name: item.scenic_title
                };
            });
        },
        handleConfirm() {
            // let selected = this.scenicData.filter((item => {
            //     return this.selected.find( id => id === item.id);
            // }))
            this.$emit("confirm", this.defaultSelected);
            this.callback(this.defaultSelected);
            this.visible = false;
        },
        handleLayerClose() {
            this.name = "";
        },
        handleSingleChange(selected, data) {
            if (selected) {
                this.defaultSelected.push(data);
            } else {
                this.defaultSelected = this.defaultSelected.filter(
                    s => s.id !== data.id
                );
            }
        },
        show(defaultSelected, callback) {
            this.visible = true;
            this.defaultSelected = defaultSelected.map(item => {
                return {
                    id: item.scm_scenic_id,
                    theme_name: item.scm_scenic_title
                };
            });
            this.selected = this.defaultSelected.map(item => item.id);
            this.callback = callback;
        }
    }
};
</script>
<style lang="scss">
.scenic-layer {
    width: 490px;
    .el-dialog__body {
        padding: 0 20px;
    }
    .search-bar {
        display: flex;
        margin-bottom: 10px;
        .keyword {
            flex: 1;
        }
        .submit {
            width: 110px;
            margin-left: 20px;
        }
    }
    .scroll-area {
        height: 200px;
    }
    .tip {
        margin: 10px 0;
        background: #fdf6fb;
        color: #b3238b;
    }
    .scenic-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 5px;
        .el-checkbox {
            margin-bottom: 20px;
            margin-right: 0;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .el-checkbox__label {
                flex: 1;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .el-row--flex {
            flex-wrap: wrap;
        }
    }
    // .footer .el-button {
    //   min-width: 110px;
    //   margin: 25px;
    // }
}
</style>