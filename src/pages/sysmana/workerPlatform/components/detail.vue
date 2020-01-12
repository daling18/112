<template>
  <div id="workerDetail" v-loading="loading">
    <div class="workerDetail-header">
      <div class="workerDetail-title" style="margin-bottom:5px;">
        <!-- {{ headerTitle }} -->
        {{ objData.title }}
      </div>
      <div>
        更新时间：<span>{{ objData.update_time }}</span>
      </div>
    </div>
    <div class="workerDetail-body">
      <div v-html="objData.content"></div>
    </div>
    <div class="workerDetail-footer">
      <div v-if="objData.noticeDataFile && objData.noticeDataFile.length > 0">
        <div class="workerDetail-title">附件下载</div>
        <div>
          <span
            style="margin-right:20px;"
            v-for="item in objData.noticeDataFile"
            :key="item.id"
            ><a
              :href="item.file_path"
              :download="item.file_name"
              target="_blank"
              >{{ item.file_name }}</a
            ></span
          >
        </div>
      </div>
      <div style="text-align:center">
        <el-button
          class="right-btn"
          type="primary"
          @click="
            welcomeentry
              ? $router.push({ path: '/welcome' })
              : $emit('switchPage', 0)
          "
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkerDetail } from "src/api/orgination";
export default {
  name: "workerDetail",
  props: {
    type: {
      //公告1  资料 2 说明3
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      objData: {
        id: "0",
        title: "",
        content: "",
        update_time: "",
        noticeDataFile: [
          //   {
          //     file_name: "",
          //     file_path: ""
          //   }
        ]
      }
    };
  },
  watch: {
    id() {
      this.init();
    }
  },
  computed: {
    id() {
      let query = this.$route.query || {};
      return query.id;
    },
    welcomeentry() {
      let query = this.$route.query || {};
      return query.welcomeentry;
    },
    headerTitle() {
      let str =
        this.type == 1
          ? "盈科公告管理"
          : this.type == 2
          ? "宣传资料管理"
          : "系统说明管理";
      return str;
    }
  },
  methods: {
    async init() {
      if (this.id) {
        this.loading = true;
        let result = await getWorkerDetail({
          data: { id: this.id }
        });
        this.loading = false;
        if (result.data.code == 0) {
          let data = result.data.data;
          for (const key in data) {
            let value = data[key];
            this.objData[key] = value;
          }
        } else {
          this.$message.error(result.data.msg);
        }
      } else {
        this.$emit("switchPage", 0);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
#workerDetail {
  color: #4c4c4c;
  height: 100%;
  overflow: auto;
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  padding: 30px 50px 40px 50px;
  .workerDetail-header {
    text-align: center;
  }
  .workerDetail-title {
    font-size: 30px;
    color: #4c4c4c;
  }
  .workerDetail-body {
    > div {
      width: 100%;
      box-sizing: border-box;
    }
    min-height: 300px;
    margin: 26px 0;
  }
  .workerDetail-footer {
    & > div {
      margin: 30px 0;
    }
  }
}
</style>