<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="easy-trip-wrapper">
          <el-form label-width="100px">
            <div class="title">行程信息</div>
            <el-form-item label="行程天数" required>
              <el-form-item class="item2">
                <el-input class="width1" @input="insertNum($event, 'trip_days')" v-model="trip_days" placeholder=""></el-input>
                <span>天</span>
              </el-form-item>
              <el-form-item class="item2">
                <el-input class="width1" @input="insertNum($event, 'trip_night')" v-model="trip_night" placeholder=""></el-input>
                <span>夜</span>
              </el-form-item>
            </el-form-item>
            <el-form-item label="行程附件" required>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="/bom/api/product/upload_pic"
                :on-success="handleTripPicSuccess"
                :data='{type: 2}'
                multiple
                :file-list="fileList"
                :on-remove="handleRemove"
                :before-upload="beforeTripDocUpload"
              >
                <el-button class="el-button" slot="trigger" type="primary">选取附件</el-button>
                <div class="el-upload__tip">仅支持.doc格式或.docx格式word文档上传，最大文件为10M／10个</div>
              </el-upload>
            </el-form-item>
            <div class="submit-buttons">
              <el-button class="el-button" type="primary" @click="goback">上一步</el-button>
              <el-button class="el-button" type="primary" @click="doEasyStep2">保存</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {doEasyStep2, easyStep2} from 'src/api/api';
  import {supplierEasyStep2, supplierDoEasyStep2} from 'src/api/supplier';
  export default {
    data() {
      return {
        topMenuConst: this.$route.meta.topMenuConst ? this.$route.meta.topMenuConst : '',
        id: this.$route.query.id,
        flag: false,
        fileList: [],
        file_lists: [],
        copyId: this.$route.query.copyId,
        isCopy: false,
        limit_doc: 0,
        trip_days: 0,
        trip_night: 0,
      };
    },
    methods: {
      beforeTripDocUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        this.limit_doc++;
        if (!isLt10M) {
          this.$message.error('上传附件大小不能超过 10MB!');
          this.limit_doc--;
        }
        return isLt10M
      },
      handleTripPicSuccess(res, file, filelist) {
        if (res.code === 0) {
          this.limit_doc--;
          if ((filelist.length + this.limit_doc) > 10) {
            this.$message({
              message: "行程附件上传不能超过10个",
              type: 'error'
            });
            filelist.splice(filelist.indexOf(file), 1);
            return ''
          };
          let result = res.data;
          let res_obj = {};
          res_obj.name = result.name;
          res_obj.path = result.path;
          res_obj.size = result.size;
          this.file_lists.push(res_obj);
          this.$message({
            message: res.msg,
            type: 'success'
          });
        } else {
          filelist.splice(filelist.indexOf(file), 1);
          this.$message({
            message: res.msg,
            type: 'error'
          });
          file.status = 'error'
        }
      },
      handleRemove(file) {
        if(file.response) {
          for (let i = 0; i < this.file_lists.length; i++) {
            if (this.file_lists[i].path == file.response.data.path) {
              this.file_lists.splice(i, 1)
            };
          };
          return ''
        };
        for (let i = 0; i < this.file_lists.length; i++) {
          if (this.file_lists[i].path == file.url) {
            this.file_lists.splice(i, 1)
          };
        };
      },
      doEasyStep2() {
        if(this.trip_days == 0 || this.trip_days > 999999999) {
          this.$message({
            message: '行程天数限制范围为1-999999999',
            type: 'error'
          });
          return ''
        };
        if(this.trip_night === "") {
          this.$message({
            message: '行程夜数不能为空',
            type: 'error'
          });
          return ''
        };
        if(this.trip_night > 999999999) {
          this.$message({
            message: '行程夜数限制范围为0-999999999',
            type: 'error'
          });
          return ''
        };
        if(this.file_lists.length === 0) {
          this.$message({
            message: '请尽快上传附件完善行程内容',
            type: 'error'
          });
          return ''
        };
        let params = {
          data: {
            id: this.id,
            file_lists: this.file_lists,
            trip_days: this.trip_days,
            trip_night: this.trip_night
          }
        };
        let action = doEasyStep2
        if (this.topMenuConst === 'supplier') {
          action = supplierDoEasyStep2
        }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              if (this.topMenuConst === 'operator') {
                this.$router.push('/trip');
              } else if (this.topMenuConst === 'supplier') {
                this.$router.push('/lineTrip')
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            };
          },
          showLoading: true
        })
      },
      easyStep2() {
        let params = {
          data: {
            id: this.id
          }
        };
        if (this.isCopy) {
          params.data.id = this.copyId
        };
        let action = easyStep2
        if (this.topMenuConst === 'supplier') {
          action = supplierEasyStep2
        }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              this.trip_days = result.trip_days ? result.trip_days : 0;
              this.trip_night = result.trip_night ? result.trip_night : 0;
              if (result.attachment_lists.length > 0) {
                for (let i = 0; i < result.attachment_lists.length; i++) {
                  this.fileList.push(result.attachment_lists[i]);
                  let res_file = {};
                  res_file.name = result.attachment_lists[i].name;
                  res_file.size = result.attachment_lists[i].size;
                  res_file.path = result.attachment_lists[i].url;
                  this.file_lists.push(res_file);
                };
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: false
        })
      },
      goback() {
        const h = this.$createElement;
        this.$confirm('', '操作提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          message: h('div', null, [
            h('p', null, '您当前行程内容未保存，是否要离开本界面？'),
            h('p', null, '（离开后，已编辑好的内容将不会被保存）, 是否继续?')
          ]),
          center: true
        }).then(() => {
          if (this.topMenuConst === 'operator') {
            this.$router.push({
              path: '/addNewTrip',
              query: {
                id: this.id,
                type: 1
              }
            });
          } else if (this.topMenuConst === 'supplier') {
            this.$router.push({
              path: '/supplierAddNewTrip',
              query: {
                id: this.id,
                type: 1
              }
            });
          }
        }).catch(() => {
          
        });
      },
      insertNum(val, type) {
        if(/^\d+$/.test(val)){
          return
        };
        this.$nextTick(()=>{
          let match = val.match(/\d+/);
          this[type] = match ? match[0] : '';
        })
      }
    },
    mounted() {
      if (this.$route.query.copyId) {
        this.isCopy = true;
      };
      this.easyStep2();
    }
  }
</script>
<style lang="less" scoped>
  .easy-trip-wrapper {
    width: 500px;
    .el-upload__tip {
      display: inline-block;
    }
    .width1 {
      width: 150px;
    }
    .item2 {
      display: inline-block;
    }
  }
</style>
