<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">合同邮寄地址</li>
      </ul>
      <el-button class="right-btn" v-if="$menuPermission('api/express/edit')" type="primary" @click="showEditDlg('')">+ 新增</el-button>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">地址类型</div>
        <el-select v-model="searchInput.type" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in typeMap" :label="val" :value="key" :key="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">关键词</div>
        <el-input v-model="searchInput.key_word" style="width: 250px;" placeholder="地址、联系方式、收件人"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="类型" align="left" width="100">
              <template slot-scope="scope">
                {{ typeMap[scope.row.type] }}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="地址信息" align="left">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.address">
                  {{ scope.row.address }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center" width="180"/>
            <el-table-column prop="name" label="收件人" align="left" width="120"/>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <template v-if="($menuPermission('api/express/form') && $menuPermission('api/express/edit')) || $menuPermission('api/express/del')">
                  <a v-if="$menuPermission('api/express/form') && $menuPermission('api/express/edit')" href="javascript:;" @click="showEditDlg(scope.row)">修改</a>
                  <a v-if="$menuPermission('api/express/del')" href="javascript:;" @click="showDelConfirm(scope.row)">删除</a>
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchParams.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog 
      :title="formDialog.type" 
      :visible.sync="formDialog.show" 
      size="small" 
      :close-on-click-modal="false" 
      @close="selectArea = {area_0: '1', area_1: '', area_2: ''}"
    >
      <div class="form-content">
        <el-form :model="formDialog.form" ref="dlgForm" :rules="formDialog.rules">
          <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="formDialog.form.type">
              <el-option v-for="(val, key) in typeMap" :label="val" :value="key" :key="key"/>
            </el-select>
          </el-form-item>
          <el-form-item label="收件人" :label-width="formLabelWidth" prop="name">
            <el-input v-model="formDialog.form.name" placeholder="收件人"/>
          </el-form-item>
          <el-form-item label="所在地区" :label-width="formLabelWidth" prop="area_id_3">
            <select-area :value="selectArea" @change="handleSelectArea"/>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="formDialog.form.address" placeholder="详细地址"/>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="formDialog.form.phone" placeholder="联系电话"/>
          </el-form-item>
        </el-form>
        <div v-if="formDialog.form.type == '2'" :style="'padding-left: ' + formLabelWidth">
          <el-checkbox v-model="formDialog.form.is_default" :true-label="1" :false-label="-1">
            设为默认收件地址
          </el-checkbox>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="formDialog.show = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { expressIndex, expressForm, expressEdit, expressDel } from 'src/api/api';
import SelectArea from 'src/plugins/SelectArea.vue';
export default {
  name: 'ExpressList',
  components: {
    'select-area': SelectArea
  },
  data() {
    return {
      totalPage: 1,
      pageShow: false,
      searchInput: {
        type: '',
        key_word: ''
      },
      searchParams: {
        page: 1,
        page_size: 10,
        type: '',
        key_word: ''
      },
      typeMap: {},
      tableData: [],
      selectArea: null,
      formLabelWidth: '80px',
      formDialog: {
        type: '填写快递信息',
        show: false,
        form: {},
        rules: {
          type: [{ required: true, message: '类型不能为空'}],
          name: [{ required: true, message: '收件人不能为空'}],
          area_id_3: [{ required: true, message: '所在地区不能为空', trigger: 'blur'}],
          address: [{ required: true, message: '详细地址不能为空'}],
          phone: [{ required: true, message: '联系电话不能为空'}]
        }
      }
    };
  },
  mounted() {
    this.getList(true);
  },
  methods: {
    handleCurrentChange(val) {
      if(this.searchParams.page != val){
        this.searchParams.page = val;
        this.getList();
      }
    },
    getList(bool) {
      if (bool) {
        this.searchParams = {... this.searchInput};
        this.searchParams.page = 1;
        this.searchParams.page_size = 10;
      }else{
        this.searchInput = {... this.searchParams};
      }

      expressIndex({
        params: {data: this.searchParams},
        success: ({data}) => {

          if (data.code == '0') {
            this.tableData = data.data.data;
            this.totalPage = data.data.total_page;
            this.typeMap = data.data.type_config;
            this.pageShow = this.totalPage > 0;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    showEditDlg(data){
      
      if(this.$refs.dlgForm){
        this.$refs.dlgForm.resetFields();
      }
      if(data){
        let loading = this.$loading({target: '.el-dialog'});
        this.formDialog.type = '修改快递信息';

        expressForm({
          params: {data: {id: data.id}},
          success: (resp) => {
            const { code, data, msg } = resp['data'];
            
            if(code == 0){
              this.formDialog.form = {... data};
              this.formDialog.form.type = '' + this.formDialog.form.type; // 获取的类型是数值的需要转成字符串格式
              this.selectArea = {area_0: data.area_id_1, area_1: data.area_id_2, area_2: data.area_id_3};
            }else{
              this.$message.error(msg);
            }
            if(loading){
              loading.close();
            }
          }
        });
        
      }else{
        this.formDialog.type = '填写快递信息';
        this.formDialog.form = {
          type: '2',
          name: '',
          area_id_1: '',
          area_id_2: '',
          area_id_3: '',
          address: '',
          phone: '',
          is_default: -1
        };
        // 在close时 area_0: '1'是为了触发Form.resetFields()方法的忽略第一次change逻辑，
        //  否则会出现第一次选择省份不会触发错误提示
        this.selectArea = {area_0: '', area_1: '', area_2: ''};
      }
      this.formDialog.show = true;
    },
    handleSelectArea: function(level, val, data){
      if(data){
        this.formDialog.form.area_id_1 = data.area_0;
        this.formDialog.form.area_id_2 = data.area_1;
        this.formDialog.form.area_id_3 = data.area_2;
      }
      this.selectArea = data;
    },
    handleSubmit: function(){
      this.$refs.dlgForm.validate((result)=>{
        if(!result){
          return false;
        }
        expressEdit({
          params: {data: this.formDialog.form},
          success: ({data}) => {
            const { code, msg } = data;
            
            if(code == 0){
              this.$message.success('操作成功');
              this.formDialog.show = false;
              this.getList(true);
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
    },
    showDelConfirm(data){
      this.$confirm('确认删除该地址信息？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        expressDel({
          params: {data: {id: data.id}},
          success: ({data}) => {
            const { code, msg } = data;
            
            if(code == 0){
              this.$message.success('操作成功');
              this.getList(true);
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.right-btn{
  position: absolute;
  right: 15px;
  top: 6px;
}
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.el-form-item {
  margin-bottom: 15px;
  .el-select{width: 33%}
  .el-input{width: 66.5%}
}
.align-center{ text-align: center;}
</style>
