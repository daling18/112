<template>
    <div>
        <div class="notice-header">
            <div v-if="isShow" class="notice">
                <span class="worker-scroll-notice"></span>
                <marquee style="vertical-align:middle" onMouseOut="this.start()" onMouseOver="this.stop()" behavior="scroll" direction="left" scrolldelay="100">
                    <span @click="$router.push({path:'/sysmana/workplatform/notice',query:{id:item.id,welcomeentry:true}})" v-for="item in noticeList" :key="item.id">{{item.title}}</span>
                </marquee>
                <span style="font-size:18px;cursor: pointer;" @click="close">&times;</span>
            </div>
            <div v-if="$route.meta.btnName" class="notice-btn">
                <span style="display:none;">{{ $menuPermission($route.meta.btnPermission) }}</span>
                <el-button v-if="$menuPermission($route.meta.btnPermission)" type="primary" @click="goto($route.meta.btnPath, $route.meta.btnQueryMap)">{{ $route.meta.btnName }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getWorkerList } from "@/api/orgination";
export default {
    name: "workerNotice",
    props: {
        // noticeList: {
        //   type: Array,
        //   default: function() {
        //     return [];
        //   }
        // }
    },
    data() {
        return {
            show: true,
            noticeList: []
        };
    },
    computed: {
        isShow() {
            let noticeHidde = sessionStorage.getItem("noticeHidde");
            return (
                !noticeHidde &&
                this.show &&
                this.noticeList &&
                this.noticeList.length > 0
            );
        }
    },
    watch: {
        "$route.path"(n) {
            this.getScrollNotice();
        }
    },
    methods: {
        async getScrollNotice() {
            let noticeHidde = sessionStorage.getItem("noticeHidde");
            if (noticeHidde) return;
            let result = await getWorkerList({
                data: {
                    page_size: 3,
                    type: 1,
                    page_index: 1
                }
            });
            if (result.data.code == 0) {
                this.noticeList = result.data.data.list;
            } else {
                this.$message.error(result.data.msg);
            }
        },
        close() {
            sessionStorage.setItem("noticeHidde", "hidden");
            this.show = false;
        },
        goto(path, queryMap) {
            let query = {};

            if (queryMap) {
                Object.keys(queryMap).forEach(key => {
                    query[key] = this.$route.query[queryMap[key]];
                });
            } else {
                query.id = this.$route.query.id;
            }

            this.$router.push({
                path: path,
                query: query
            });
        }
    },
    mounted() {
        this.getScrollNotice();
    }
};
</script>

<style lang="scss" scoped>
.notice-header {
    display: flex;
    // height: 50px;
    align-items: center;
    margin-bottom: 10px;
    // padding: 0 20px;
    .notice {
        flex: 1;
        display: flex;
        border: 1px solid #e6e6e6;
        background: #fff;
        align-items: center;
        justify-content: center;
        // margin-right: 20px;
        padding: 0 20px;
        line-height: 50px;
        marquee span {
            color: #ff0000;
            cursor: pointer;
            margin: 0px 5px;
        }
        marquee {
            margin: 0 20px;
        }
    }
    .notice-btn {
      margin-left: auto;
      padding-left: 20px;
    }
}

.worker-scroll-notice {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: url("../assets/icons/worker-scroll-notic.png") no-repeat center
        center;
    background-size: 100%;
}
</style>