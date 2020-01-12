
<template>
  <div id="addEidt" v-loading="loading">
    <div class="addEidtContainer">
      <div class="addEdit-header">{{ headerTitle }}</div>
      <el-form
        :model="dataObj"
        :rules="dataObjRules"
        ref="dataObj"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="标题:" prop="title">
          <el-input v-model.trim="dataObj.title" placeholder="请输入1-30个字符" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="content" label-width="auto">
          <html5Editor
            v-model.trim="dataObj.content"
            :autoHeight="false"
          ></html5Editor>
        </el-form-item>
      </el-form>
      <div class="addEdit-upload" v-if="type != 1">
        <el-upload
          class="upload-demo"
          name="file_name"
          action="/api/v1/system/bom-notice/upload-data-file"
          :before-upload="handleBeforeUpload"
          :on-error="handleError"
          :on-remove="handleRemove"
          :on-success="handleUploadsucc"
          multiple
          :file-list="fileList"
        >
          <el-button size="small" type="primary" v-loading="uploadloading"
            >点击上传</el-button
          >
          <span slot="tip" class="el-upload__tip">
            上传附件大小50m以内
          </span>
        </el-upload>
      </div>
      <div class="addEdit-footer">
        <el-button @click="$emit('switchPage', 0)">取消</el-button>
        <el-button
          class="right-btn"
          type="primary"
          @click="save"
          :disabled="uploadloading"
          v-loading="saveLoading"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import html5Editor from "src/plugins/editor/vue-html5-editor.vue";
import {
  getWorkerDetail,
  saveWorkerRow,
  removeUploadData
} from "src/api/orgination";

export default {
  name: "addEdit",
  components: {
    html5Editor
  },
  props: {
    type: {
      default: 1
    }
  },
  computed: {
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
  data() {
    return {
      loading: false,
      uploadloading: false,
      saveLoading: false,
      isAdd: true,
      dataObj: {
        id: "",
        title: "", //标题
        content: "", //内容
        update_time: "",
        org_id: 0 //组织id
        // noticeDataFile:[ {
        //   file_name: "",
        //   file_path: ""
        // }]
      },
      dataObjRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value.replace(/ /g) == "")
                return callback(new Error("内容不能为空"));
              callback();
            }
          }
        ]
      },
      fileList: [
        // {
        //   id:"0",
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ]
    };
  },
  methods: {
    async init(item) {
      if (item) {
        let params = {
          data: {
            id: item.id
          }
        };
        this.loading = true;
        this.isAdd = false;
        let result = await getWorkerDetail(params);
        this.loading = false;
        if (result.data.code == 0) {
          let data = result.data.data;
          if (data.noticeDataFile && data.noticeDataFile.length > 0) {
            this.fileList = data.noticeDataFile.map(v => {
              return {
                id: v.id,
                name: v.file_name,
                url: v.file_path
              };
            });
          }
          for (const key in this.dataObj) {
            this.dataObj[key] = data[key];
          }
        } else {
          this.$message.error(result.data.msg);
          this.$emit("switchPage", 0);
        }
      } else {
        this.isAdd = true;
      }
    },
    save() {
      // console.log({ fileList: this.fileList });
      this.$refs.dataObj.validate(async vaild => {
        if (!vaild) return;
        let file_list = this.fileList
          .filter(v => v.status == "success")
          .map(v => {
            return v.id || (v.response ? v.response.data.id : 0);
          });
        let params = null;
        if (this.isAdd) {
          params = {
            data: {
              title: this.dataObj.title,
              content: this.filterContent(this.dataObj.content)
            }
          };
        } else {
          params = {
            data: JSON.parse(JSON.stringify(this.dataObj))
          };
        }
        params.data.file_list = file_list.length > 0 ? file_list : undefined;
        params.data.type = this.type;
        this.saveLoading = true;
        let result = await saveWorkerRow(params);
        this.saveLoading = false;
        if (result.data.code == 0) {
          this.$message.success(this.isAdd ? "创建成功" : "修改成功");
          this.$emit("switchPage", 0);
        } else {
          this.$message.error(result.data.msg);
        }
      });
    },
    filterContent(content) {
      var badTags = [
        "style",
        "script",
        "applet",
        "embed",
        "noframes",
        "noscript",
      ];
      content = content.replace(
        /<a([\s]+|[\s]+[^<>]+[\s]+)href=(\"([^<>"\']*)\"|\'([^<>"\']*)\')[^<>]*>/gi,
        function($0,$1,$2) {
          console.log({arf:arguments})
          if (!/(http[s]{0,1}|ftp):\/\//g.test($2)) {
            return $0.replace($2,"http://"+$2.replace(/"/g,""));
          } else {
            return $0;
          }
        }
      );

      for (var i = 0; i < badTags.length; i++) {
        let tagStripper = new RegExp(
          "<" + badTags[i] + ".*?" + badTags[i] + "(.*?)>",
          "gi"
        );
        content = content.replace(tagStripper, "");
      }
      let div = document.createElement("div");
      div.innerHTML = content;
      let els = div.getElementsByTagName("*");
      Array.from(els).forEach(el => {
        if (
          el.nodeName == "IFRAME" ||
          el.nodeName == "STYLE" ||
          el.nodeName == "INPUT" ||
          el.nodeName == "BUTTON"
        ) {
          el.parentNode.removeChild(el);
        }
        if (el.nodeName == "A") {
          el.target = "_blank";
        }
        if (el.nodeName == "IMG") {
          el.style.maxWidth = "100%";
        }
      });
      let filterContent = div.innerHTML;
      div = null;
      return filterContent;
    },

    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleBeforeUpload(file) {
      this.uploadloading = false;
      let isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 50MB!");
        this.uploadloading = false;
        return false;
      }
      return isLt2M;
    },
    handleUploadsucc(response, file, fileList) {
      // console.log({ response, file, fileList });
      this.uploadloading = false;
      if (response.code == 0) {
        this.fileList = fileList;
      } else {
        let index = fileList.findIndex(v => v.uid == file.uid);
        fileList.splice(index, 1);
        this.fileList = fileList;
        this.$message.error(response.msg);
      }
    },
    handleError() {
      this.uploadloading = false;
      this.$message.error("上传失败");
    },
    async beforeRemove(file, fileList) {
      //  let params={data:{}}
      // removeUploadData()
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="scss" >
#addEidt {
  height: 100%;
  overflow: auto;
  .addEidtContainer {
    max-width: 70%;
  }
  .el-form-item__label {
    color: #4c4c4c;
  }
  .addEdit-header {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 17px;
  }
  .addEdit-upload {
    margin-top: 20px;
    width: 260px;
  }
  .addEdit-footer {
    margin: 20px 0px 40px 0px;
    text-align: center;
  }
}
</style>
