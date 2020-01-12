<template>
    <div id="app" v-loading.fullscreen="loading">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
    name: "app",
    data() {
        return {
            loading: false
        };
    },
    components: {},
    methods: {},
    mounted() {}
};
</script>

<style lang="scss">
body {
    margin: 0px;
    padding: 0px;
    color: #444;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
}
a {
    text-decoration: none;
}
</style>

