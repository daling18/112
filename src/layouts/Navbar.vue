<template>
  <div class="navbar clearfix">
    <div class="hamburger" @click="$emit('collapse-click')">
      <i class="el-icon-s-fold"></i>
    </div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right" class="app-breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <a v-if="item.meta.parent_label" @click.prevent="handleLink(item)">{{item.meta.label}}</a>
        <span v-else>{{item.meta.label}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="right-menu tools">
      <li>
          <a href="https://fankui.yktour.com.cn/" target="_blank">盈科社区</a>
        </li>
        <li @click="$router.push({path:'/'})" style=" cursor: pointer;" :class="{licheced:$route.path === '/welcome'}">
          <span class="worker-platform"></span> 工作台
        </li>
        <li
          v-if="$menuPermission('usercenter/approval/myinitappr,usercenter/approval/waitmyapproval,usercenter/approval/myapprovaled')"
          @click="$router.push({path:'/approval/index'})"
          :class="{licheced:$route.path === '/approval/submit/list'}"
        >
          <el-badge :value="unapprovalNum" :max="999" class="shenpidantiao">
            <i class="icon-shenpidantiao" aria-hidden="true"></i>审批单
          </el-badge>
        </li>
        <li>
          <i class="fa fa-address-card" aria-hidden="true" />
          {{ org_name }}
        </li>
        <li>
          <el-dropdown v-if="userNo" trigger="click">
            <span class="el-dropdow n-link username">
              <i class="fa fa-user" aria-hidden="true" />
              {{ userName }}
              <i class="fa fa-caret-down" aria-hidden="true" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled style="background:#f9f9f9">账号：{{ userNo }}</el-dropdown-item>
              <el-dropdown-item
                @click.native="$router.push({path:'/passwd'})"
                divided
              >修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
    </ul>
  </div>
</template>
<script>
import { loginOut, getUserName, wxacode } from "src/api/api";
export default {
  name: "Navbar",
  props: {
    unapprovalNum: {
      default: ""
    },
    userNo: {
      default: ""
    },
    org_name: {
      default: ""
    },
    userName: {
      default: ""
    }
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route: {
      handler(route) {
        let matched = route.matched.filter(
          item => item.meta && item.meta.label
        );
        this.levelList = matched.filter(item => !item.meta.breadcrumb);
      },
      immediate: true
    }
  },
  methods: {
    logout() {
      this.$confirm("确认退出吗?", "提示").then(() => {
        loginOut({
          params: {},
          success: data => {
            window.location.href = data.data.data.url;
          }
        });
      });
    },
    handleLink(item) {
      this.$router.push({
        path: item.path,
        params: item.params,
        query: item.query
      });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/css/variables.scss";

.navbar {
  display: flex;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid $borderColor;

  .hamburger {
    font-size: 14px;
    line-height: 50px;
    padding: 0 15px;
    border-right: 1px solid $borderColor;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  .app-breadcrumb {
    line-height: 50px;
    margin-left: 10px;
  }

  .right-menu {
    margin-left: auto;
    list-style: none;
    padding: 0;
    display: flex;
    li {
      padding-right: 25px;
      color: #909399;
      line-height: 50px;
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
      a {
        color: #909399;
      }
    }
    li:hover {
      color: #303133;
      a:hover {
        color: #303133;
      }
    }
    .licheced {
      border-bottom: 2px solid $themeColor;
    }
    // .menu-ul {
    //   height: 50px;
    //   .menu-li {
    //     height: 50px;
    //     line-height: 50px;
    //     .el-link.is-underline:hover:after {
    //       border-bottom: 2px solid transparent;
    //     }
    //     .n-link {
    //       margin-right: 15px;
    //     }
    //     .submenu-title {
    //       .el-submenu__title:hover {
    //         background: #fff;
    //       }
    //     }
    //   }
    // }
    .username {
      line-height: 50px;
      padding: 0 20px;
      color: $textColor;
      border-left: 1px solid $borderColor;
    }
  }
  .worker-platform {
    //先加这里了
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    background: url("../assets/icons/worker-platform.png") no-repeat center
      center;
    background-size: 100%;
  }
}
</style>