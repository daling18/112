<template >
    <div>
        <router-link class="logo" :to="{path:'/'}">
            <!-- <img src="../assets/logo-new.png" /> -->
            <img src="../assets/images/logo.png" v-if="!isCollapse" />
            <img v-else src="../assets/images/logo-breviary.png" />
        </router-link>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <!--导航菜单-->
            <el-menu :default-active="$route.meta.menu" unique-opened :background-color="variables.menuBg" :text-color="variables.menuText" :collapse="isCollapse" :collapse-transition="false">
                <template v-for="(first, firstIndex) in usableNavigation">
                    <el-submenu :index="firstIndex+''" :key="firstIndex">
                        <template slot="title">
                            <i :class="first.iconCls" />
                            <span slot="title">{{ first.name }}</span>
                        </template>
                        <template v-for="(second, secondIndex) in first.children">
                            <template>
                                <el-menu-item v-if="!second.children" @click="handleMenuClick(second.menu, second.path)" :index="second.menu" :key="secondIndex">{{ second.name }}</el-menu-item>
                                <el-submenu v-else :index="firstIndex+'-'+secondIndex+''" :key="secondIndex">
                                    <span slot="title">{{ second.name }}</span>
                                    <template v-for="third in second.children">
                                        <el-menu-item @click="$router.push(third.path)" :index="third.menu" :key="third">{{ third.name }}</el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { navigation } from "src/configuration/navigation";
import variables from "src/assets/css/variables.scss";
export default {
    name: "Sidebar",
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            navigation
        };
    },
    computed: {
        usableNavigation() {
            let vm = this;
            function recursion(navigation) {
                return navigation.filter(nav => {
                    if (nav.children && nav.children.length !== 0) {
                        nav.children = recursion(nav.children);
                    }
                    return vm.$menuPermission(nav.permission);
                });
            }

            return recursion(navigation);
        },
        variables() {
            return variables;
        }
    },
    mounted() {},
    methods: {
        handleMenuClick(menu, path) {
            if (path === this.$route.meta.path) {
                return;
            }
            this.$router.push(path);
        }
    }
};
</script>

<style lang="scss">
.sidebar-container {
}
</style>