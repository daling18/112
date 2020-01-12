<template>
  <div class="container" v-loading.screen="loading">
    <div class="header">
      <!-- <span>ERP管理系统</span> -->
      <router-link class="logo" :to="{path:'/'}">
        <img src="../assets/logo-new.png">
      </router-link>
      <div class="name">盈科旅游云平台</div>
      <div class="userinfo">
        <ul class="tools">
          <!-- <li><NTKF>NTKF</NTKF></li> -->
          <li>
            <a href="https://fankui.yktour.com.cn/" target="_blank" style="color: #fff">盈科社区</a>
          </li>
          <li @click="$router.push({path:'/'})" style=" cursor: pointer;">
            <span class="worker-platform"></span> 工作台
          </li>
          <li
            v-if="$menuPermission('usercenter/approval/myinitappr,usercenter/approval/waitmyapproval,usercenter/approval/myapprovaled')"
            @click="$router.push({path:'/approval/index'})"
          >
            <el-badge :value="unapprovalNum" :max="999" class="shenpidantiao">
              <i class="icon-shenpidantiao" aria-hidden="true"></i>审批单
            </el-badge>
          </li>
          <li>
            <i class="fa fa-address-card" aria-hidden="true"/>
            {{ sysUserOrgName }}
          </li>
          <li>
            <el-dropdown v-if="sysUserName" trigger="click">
              <span class="el-dropdow n-link username">
                <i class="fa fa-user" aria-hidden="true"/>
                {{ RealName }}
                <i class="fa fa-caret-down" aria-hidden="true"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled style="background:#f9f9f9">账号：{{ sysUserName }}</el-dropdown-item>
                <!-- <el-dropdown-item
                  @click.native="$router.push({path:'/passwd'})"
                  divided
                >修改密码</el-dropdown-item>-->
                <el-dropdown-item
                  v-if="$menuPermission('usercenter/chgpassword')"
                  @click.native="$router.push({path:'/passwd'})"
                  divided
                >修改密码</el-dropdown-item>
                <!-- <el-dropdown-item
                  v-if="$menuPermission('usercenter/approval/myinitappr,usercenter/approval/waitmyapproval,usercenter/approval/myapprovaled')"
                  @click.native="$router.push({path:'/approval/index'})"
                  divided
                >审批单</el-dropdown-item>-->
                <!-- <el-dropdown-item @click.native="handleShowQrcode">绑定微信</el-dropdown-item> -->
                <!-- <el-dropdown-item v-if="$menuPermission('usercenter/bindwechat')" @click.native="handleShowQrcode">绑定微信</el-dropdown-item> -->
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <div class="system-switch" v-if="loginType == 1">
        <el-select v-model="systemSwitch.value" placeholder="切换系统" @change="systemSwitchEvent">
          <el-option
            v-for="item in systemSwitch"
            :key="item.index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="main">
      <aside :class="sideBtn?'menu-expanded':'menu-expanded hidden'" ref="menu-expanded">
        <!--导航菜单-->
        <el-menu :default-active="$route.meta.menu" class="el-menu-vertical-demo" unique-opened>
          <template
            v-for="(first, firstIndex) in navigation"
            v-if="$menuPermission(first.permission)"
          >
            <el-submenu :index="firstIndex+''" :key="firstIndex">
              <template slot="title">
                <i :class="first.iconCls"/>
                {{ first.name }}
              </template>
              <template
                v-for="(second, secondIndex) in first.children"
                v-if="$menuPermission(second.permission) && (!second.pRoleCode || second.pRoleCode.inArray(orgType))"
              >
                <template>
                  <el-menu-item
                    v-if="!second.children"
                    @click="$router.push(second.path)"
                    :index="second.menu"
                    :key="secondIndex"
                  >{{ second.name }}</el-menu-item>
                  <el-submenu v-else :index="firstIndex+'-'+secondIndex+''" :key="secondIndex">
                    <template slot="title">{{ second.name }}</template>
                    <template
                      v-for="third in second.children"
                      v-if="$menuPermission(second.permission)"
                    >
                      <el-menu-item
                        @click="$router.push(third.path)"
                        :index="third.menu"
                        :key="third"
                      >{{ third.name }}</el-menu-item>
                    </template>
                  </el-submenu>
                </template>
              </template>
            </el-submenu>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <!--<ul class="el-menu el-menu-vertical-demo item collapsed" v-show="collapsed" ref="menuCollapsed">
  					<li v-for="(first,firstIndex) in $router.options.routes" class="el-submenu">
  						<template>
  							<div class="el-submenu__title" @mouseover="showMenu(firstIndex,true)" @mouseout="showMenu(firstIndex,false)"><i :class="first.iconCls"></i></div>
  							<ul class="el-menu submenu" :class="'submenu-hook-'+firstIndex" @mouseover="showMenu(firstIndex,true)" @mouseout="showMenu(firstIndex,false)">
  								<li v-for="(second, secondIndex) in first.children">
  									<template v-if="!second.children">
  										<div class="el-menu-item" :class="$route.path==second.path?'is-active':''" @click="$router.push(second.path)">{{second.name}}</div>
  									</template>
  									<template v-else>
  										<div class="el-menu-item" @mouseover="showSubMenu(firstIndex,secondIndex,true)" @mouseout="showSubMenu(firstIndex,secondIndex,false)">{{second.name}}</div>
  										<ul class="el-menu submenuchild" :class="'submenuchild-hook-'+firstIndex+'-'+secondIndex" @mouseover="showSubMenu(firstIndex,secondIndex,true)" @mouseout="showSubMenu(firstIndex,secondIndex,false)">
  											<li v-for="third in second.children" :class="$route.path==third.path?'is-active':''">
  												<div class="el-menu-item" style="padding-left:40px" @click="$router.push(third.path)">{{third.name}}</div>
  											</li>
  										</ul>
  									</template>
  								</li>
  							</ul>
  						</template>
  					</li>
        </ul>-->
      </aside>
      <section class="content-container">
        <div :class="sideBtn?'grid-content bg-purple-light':'grid-content bg-purple-light ml0'">
          <div class="breadcrumb-container">
            <!-- <strong class="title">{{$route.meta.label}}</strong> -->
            <div class="telescopic" @click="side(sideBtn)">
              <i :class="sideBtn?'icon-left':'icon-right'"/>
              <i class="icon-list"/>
            </div>

            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <template v-for="item in $route.matched">
                <el-breadcrumb-item v-if="item.meta.parent_label">
                  <router-link
                    :to="{path:item.meta.parent_path,query:{id:parent_id}}"
                  >{{ item.meta.parent_label }}</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ item.meta.label }}</el-breadcrumb-item>
              </template>
            </el-breadcrumb>
            <div class="notice-header" v-if="noticeList&&noticeList.length>0&&!$route.meta.btnName">
              <span class="worker-scroll-notice"></span>
              <marquee
                style="width:260px;vertical-align:middle"
                onMouseOut="this.start()"
                onMouseOver="this.stop()"
                behavior="scroll"
                direction="left"
                scrolldelay="100"
              >
                <span
                  @click="$router.push({path:'/sysmana/workplatform/notice',query:{id:item.id,welcomeentry:true}})"
                  v-for="item in noticeList"
                  :key="item.id"
                >{{item.title}}</span>
              </marquee>
            </div>
            <template v-if="$route.meta.btnName">
              <span style="display:none;">{{ $menuPermission($route.meta.btnPermission) }}</span>
              <el-button
                v-if="$menuPermission($route.meta.btnPermission)"
                type="primary"
                @click="goto($route.meta.btnPath, $route.meta.btnQueryMap)"
              >{{ $route.meta.btnName }}</el-button>
            </template>
          </div>
          <div class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view v-if="!loading"/>
            </transition>
          </div>
        </div>
        <NTKF class="service"></NTKF>
      </section>
    </div>
  </div>
</template>

<script>
import { loginOut, getUserName, wxacode } from "src/api/api";
import { getWorkerList } from "src/api/orgination";
import { navigation } from "src/configuration/navigation";
import Cookie from "src/utils/cookie";
import NTKF from "src/components/ntkf.vue";

export default {
  components: {
    NTKF
  },
  data() {
    return {
      navigation,
      sysUserName: "",
      sysUserOrgName: "",
      RealName: "",
      qrcodeBase64: "", // 微信绑定二维码
      loginType: null,
      loading: true,
      sideBtn: true,
      parent_id: "", //上一级id
      orgType: null,
      systemSwitch: [
        {
          label: "AM",
          // value: 'https://pms.yktour.com.cn/am/'
          value: "https://testam.yktour.com.cn/am/"
        },
        {
          label: "PMS",
          // value: 'http://admin.yktour.com.cn/'
          value: "http://test.admin.yktour.com.cn/"
        }
      ],
      unapprovalNum: null, //未审批数量
      noticeList: []
    };
  },
  watch: {
    $route(n) {
      console.log({ n });
      window.scroll(0, 0);
      this.initBreadNav();
      //权限暂时不知如何控制只是判断了路由
      // if(n.name=='welcome'){
      this.getScrollNotice();
      // }else{
      //  this.noticeList=[]
      // }
    }
  },
  methods: {
    getUserNameHandler() {
      if (process.env.NODE_ENV === "development") {
        this.systemSwitch[0].value = "https://testam.yktour.com.cn/am/";
      }
      this.loading = true;
      getUserName().then(params => {
        let { code, data, msg } = params["data"];

        this.loading = false;
        if (code == "10000") {
          window.location.href = data;
        } else {
          this.$set(this, "sysUserName", data.user_name);
          this.$set(this, "sysUserOrgName", data.org_name);
          this.$set(this, "RealName", data.real_name);
          this.$set(this, "loginType", data.login_type);
          window.$username = data.user_name;
          localStorage.setItem("username", data.user_name);
          localStorage.setItem("sysUserName", data.real_name);
          localStorage.setItem("orgtype", data.org_type);
          this.orgType = data.org_type;
          this.unapprovalNum = data.wait_me_approval;
        }
      });
    },
    //退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示").then(() => {
        // this.loading = true;
        loginOut({
          params: {},
          success: data => {
            window.location.href = data.data.data.url;
          }
        });
      });
    },
    showQrCode() {
      const h = this.$createElement;

      this.$msgbox({
        title: "微信绑定",
        customClass: "bind-dlg",
        message: h("div", null, [
          h("div", { class: "bind-item" }, [
            h("img", {
              attrs: { src: this.qrcodeBase64[0] }
            }),
            h("h2", null, "收客小助手")
          ])
          // h('div', { class: 'bind-item' }, [
          //   h('img', {
          //     attrs: {src: this.qrcodeBase64[1]}
          //   }),
          //   h('h2', null, '材料部小程序')
          // ]),
        ]),
        showCancelButton: false,
        confirmButtonText: "确定"
      }).then(action => {
        console.log("action: ", action);
      });
    },
    handleShowQrcode() {
      if (this.qrcodeBase64) {
        return this.showQrCode();
      }
      wxacode({
        params: {},
        success: data => {
          if (data.data.code == 0) {
            this.qrcodeBase64 = data.data.data.map(item => item.qrcode_url);
            this.showQrCode();
            // this.$alert('userid:' + data.data.data.user_id, "微信绑定");
          } else {
            this.$alert("获取失败");
          }
        },
        showLoading: true
      });
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
    },
    side(bool) {
      this.sideBtn = !bool;
      Cookie.set("sideBtn", this.sideBtn);
    },
    menuScrollHandler() {
      let topScroll = window.scrollY,
        menuExpanded = this.$refs["menu-expanded"];
      if (topScroll >= 65) {
        menuExpanded.classList.add("scroll");
      } else {
        menuExpanded.classList.remove("scroll");
      }
    },
    initBreadNav() {
      this.parent_id = this.$route.query.parent_id
        ? this.$route.query.parent_id
        : this.$route.params.parent_id
        ? this.$route.params.parent_id
        : this.$route.query.id
        ? this.$route.query.id
        : "";
    },
    systemSwitchEvent(val) {
      console.log(val);
      window.location.href = val;
    },
    async getScrollNotice() {
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
    }
  },
  mounted() {
    if (!!Cookie.get("sideBtn")) {
      this.sideBtn = Cookie.get("sideBtn") == "true" ? true : false;
    }
    window.addEventListener("scroll", this.menuScrollHandler);
    this.getUserNameHandler();
    this.initBreadNav();
    // if(this.$route.name=="welcome"){
    this.getScrollNotice();
    // }
  },
  destroyed() {
    window.removeEventListener("scroll", this.menuScrollHandler);
  }
};

Array.prototype.inArray = function(e) {
  let r = new RegExp("," + e + ",");
  return r.test("," + this.join(this.S) + ",");
};
</script>

<style lang="scss">
.service {
  width: 50px;
  height: 130px;
  background-image: url("../assets/侧熊猫2x.png");
  background-repeat: no-repeat;
  background-size: 100%;
  right: -5px;
  bottom: -25px;
  position: fixed;
  cursor: pointer;
  transform: translate(0, -50%);
  z-index: 100;
  &:after {
    content: "";
    width: 90px;
    height: 65px;
    position: absolute;
    right: 45px;
    top: 45px;
    background-image: url("../assets/气泡2x.png");
    background-repeat: no-repeat;
    background-size: 100%;
    display: none;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
}
.service:hover {
  transition: right 0.5s;
  right: 0;
  &:after {
    display: inline;
    animation-name: task;
  }
}
@keyframes task {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
.shenpidantiao {
  cursor: pointer;
  .icon-shenpidantiao {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;
    top: 5px;
    background-image: url("../assets/approval.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
.bind-dlg {
  width: auto;
  .bind-item {
    display: inline-block;
    text-align: center;
    padding: 0 15px;
    img {
      width: 256px;
    }
  }
}
.system-switch {
  float: right;
  width: 92px;
  margin: 20px 20px 0 0;
  .el-select {
    .el-input {
      input {
        background-color: transparent;
        border-color: transparent;
        &::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #fff;
        }
        &:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #fff;
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #fff;
        }
        &:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #fff;
        }
      }
      .el-input__icon {
        color: #fff;
        font-size: 12px;
        transform: translateY(-50%) rotateZ(180deg) scale(0.7, 0.7);
      }
    }
  }
}
.notice-header {
  right: 20px;
  top: 0px;
  line-height: 50px;
  height: 50px;
  color: #ff0000;
  width: 300px;
  position: absolute;
  marquee span {
    cursor: pointer;
    margin: 0px 5px;
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
.worker-platform {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  background: url("../assets/icons/worker-platform.png") no-repeat center center;
  background-size: 100%;
}
</style>
