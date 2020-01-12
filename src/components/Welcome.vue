<template>
    <div class="sys-wrap">
        <div class="tips">欢迎使用</div>
        <div class="sysname-text">
            <p class="cn">盈科旅游云平台</p>
            <p class="en" style="display: none">
                BUSINESS OPERATION MANAGEMENT SYSTEM
            </p>
        </div>
        <!-- <div class="intro-pic">∏
      <div class="action">
        <div
          class="unit make-bill-icon"
          style="margin-right:150px;"
          @click="goto('/group',{})"
        >
          <p class="name">选团制作账单</p>
        </div>
        <div
          class="unit plan-action-icon"
          @click="goto('/control/list-line',{})"
        >
          <p class="name">计调操作控制台</p>
        </div>
      </div>
    
    </div> -->
        <div class="workerPlatform" v-loading="loading">
            <div v-for="(item, key) in workerPlatform" :key="key">
                <div class="platform-header">
                    <h4>
                        <span :class="{ [item.icon]: true, 'worker-icon': true }"></span>{{ item.title }}
                    </h4>
                    <span style=" cursor: pointer;" @click="$router.push(item.path)">查看更多</span>
                </div>
                <div class="platform-list">
                    <ul>
                        <li v-show="!item.data || item.data.length == 0">暂无数据</li>
                        <li v-for="subItem in item.data" :key="subItem.id" :title="subItem.title" @click="
                $router.push({
                  path: item.path,
                  query: { id: subItem.id, welcomeentry: true }
                })
              ">
                            <span>{{ subItem.title }}</span>
                            <span>{{ subItem.update_time.split(" ")[0] }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { changePasswd } from "src/api/api";
import { getWelcomeList } from "src/api/orgination";
export default {
    data() {
        return {
            formData: {
                password: "",
                new_passowrd: "",
                repassword: ""
            },
            loading: false,
            workerPlatform: {
                notice: {
                    title: "盈科旅游公告",
                    icon: "worker-notice",
                    path: "/sysmana/workplatform/notice",
                    data: []
                }, //公告
                means: {
                    title: "宣传资料下载",
                    icon: "worker-means",
                    path: "/sysmana/workplatform/means",
                    data: []
                }, //资料
                title: {
                    title: "系统说明",
                    icon: "worker-title",
                    path: "/sysmana/workplatform/title",
                    data: [
                        {
                            title: "暂无数据",
                            id: 0,
                            update_time: "2019-23-01"
                        }
                    ]
                } //说明
            }
        };
    },
    methods: {
        submitChangePasswd() {
            changePasswd(this.formData, params => {
                let { code, msg, data } = params["data"];
                if (code != 0) {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                } else {
                    this.$router.push("Home");
                }
            });
        },
        goto(path, query) {
            this.$router.push({
                path: path,
                query: query
            });
        },
        async getWelcomeList() {
            this.loading = true;
            let result = await getWelcomeList({
                page_size: 10
            });
            this.loading = false;
            if (result.data.code == 0) {
                this.workerPlatform.notice.data = result.data.data.data.notice;
                this.workerPlatform.means.data = result.data.data.data.data;
                this.workerPlatform.title.data =
                    result.data.data.data.system_description;
            } else {
                this.$message.error(result.data.msg);
            }
        }
    },
    mounted() {
        this.getWelcomeList();
    }
};
</script>

<style lang="scss" scoped>
.sys-wrap {
    background: #fff;
    text-align: center;
    padding-top: 40px;
    height: 100%;
    box-sizing: border-box;
    .tips {
        font-size: 18px;
        color: #b10c79;
    }
    .sysname-text {
        padding-bottom: 40px;
        .cn {
            font-size: 30px;
            color: #444;
        }
        .en {
            font-size: 24px;
            color: #999;
        }
    }
    .intro-pic {
        height: 375px;
        background: url("../assets/welcome-bg.jpg") no-repeat center center;
        background-size: cover;
        overflow: hidden;

        .action {
            width: 476px;
            height: 162px;
            margin: 90px auto;
        }

        .unit {
            float: left;
            width: 160px;
            height: 160px;
            border-radius: 14px;
            border: 1px solid #eee;
            overflow: hidden;
            cursor: pointer;
            background-color: #fff;
            background-repeat: no-repeat;
            background-size: 44px 46px;
            background-position: center 40px;

            &.plan-action-icon {
                background-image: url("../assets/icons/plan-action-icon.png");
            }
            &.make-bill-icon {
                background-image: url("../assets/icons/make-bill-icon.png");
            }
        }
        .name {
            margin-top: 110px;
            text-align: center;
        }
    }
    .workerPlatform {
        width: 100%;
        // min-height: 300px;
        display: flex;
        padding: 0px 50px 50px 50px;
        box-sizing: border-box;
        justify-content: space-around;
        & > div {
            flex: 1;
            margin: 0px 3%;
            max-height: 400px;
            overflow: auto;
        }
        .platform-header {
            .worker-icon {
                margin-right: 9px;
                width: 20px;
                height: 20px;
                display: inline-block;
                vertical-align: middle;
            }
            .worker-notice {
                background: url("../assets/icons/worker-notice.png") no-repeat
                    center center;
                background-size: 100%;
            }
            .worker-means {
                background: url("../assets/icons/worker-means.png") no-repeat
                    center center;
                background-size: 100%;
            }
            .worker-title {
                background: url("../assets/icons/worker-title.png") no-repeat
                    center center;
                background-size: 100%;
            }
            h4 {
                float: left;
            }
            & > span {
                float: right;
                color: #999;
            }
            height: 50px;
            line-height: 50px;
            border-bottom: 2px solid rgba(222, 222, 222, 1);
        }
        .platform-list {
            ul > li {
                cursor: pointer;
                height: 32px;
                line-height: 32px;
                text-align: left;
                color: rgba(76, 76, 76, 1);
                & > span:first-child {
                    float: left;
                    width: calc(100% - 80px);
                    overflow: hidden; //超出的文本隐藏
                    text-overflow: ellipsis; //溢出用省略号显示
                    white-space: nowrap; //溢出不换
                }
                & > span:last-child {
                    float: right;
                }
            }
            ul > li:active {
                color: #b10b79;
            }
        }
    }
}
</style>

