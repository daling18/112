<template>
<div class="wrapper">
<!-- application\index\view\dev\src\components\plan\cost\confirm.vue -->
  <div class="system-content">
    <div class="table-title no-border" v-if="comfirmData.tuan_info">
      <div class="title">
        <span class="color-orange">【{{comfirmData.tuan_info.tuan_no}}】</span>
        {{comfirmData.tuan_info.tuan_name}}</div>
      <table class="desc">
          <tr>
            <th>出发城市</th>
            <td colspan="3">{{comfirmData.tuan_info.departure_city }}</td>
          </tr>
          <tr>
            <th>出发日期</th>
            <td>{{comfirmData.tuan_info.departure_date}}</td>
            <th>返回日期</th>
            <td>{{comfirmData.tuan_info.back_date}}</td>
          </tr>
        </table>
        <div class="btn-areas">
          <el-button type="primary"  @click="goto()">查看行程</el-button>
          <el-button @click="goto()">打印行程</el-button>
        </div>
    </div>
  </div>
  <div class="system-content">
    <div class="content-list">
      <div class="mode-table el-table">
        <table class="diy-table" width="100%;"  v-if="$route.query.type==1">
          <tr>
              <th width="250"><div class="cell">收入编号</div></th>
              <!-- <th width="100"><div class="cell">项目类型</div></th> -->
              <th width="80"><div class="cell">数量</div></th>
              <th ><div class="cell">应收金额</div></th>
              <th ><div class="cell">直客/代理商</div></th>
              <th ><div class="cell">确认上传状态</div></th>
            </tr>
          <template v-for="(item,index) in comfirmData.info">
            <tr>
              <td><div class="cell" style="text-align:left;">{{item.item_no}}</div></td>
              <!-- <td><div class="cell">{{item.item_type_name}}</div></td> -->
              <td><div class="cell">{{item.num}}</div></td>
              <td><div class="cell" style="text-align:right;">{{item.rmb_total_amount}}</div></td>
              <td><div class="cell">{{item.distributor_org_name}}</div></td>
              <td><div class="cell">{{item.order_status_name}}</div></td>
            </tr>
            <tr>
              <th><div class="cell">说明</div></th>
              <td colspan="5"><div class="cell" style="text-align:left;">{{item.remark}}</div></td>
            </tr>
          </template>

          </table>
        </table>
        <table class="diy-table" width="100%;"  v-if="$route.query.type==2">
          <tr>
            <th width="180"><div class="cell">成本id</div></th>
            <th width="100"><div class="cell">项目类型</div></th>
            <th width="100"><div class="cell">名称</div></th>
            <th ><div class="cell">数量</div></th>
            <th ><div class="cell">应付金额</div></th>
            <th ><div class="cell">供应商（结算方）</div></th>
            <th ><div class="cell">摊派</div></th>
            <th ><div class="cell">确认状态</div></th>
          </tr>
          <template v-for="(item,index) in comfirmData.info">
             <tr>
              <td><div class="cell" style="text-align:left;">{{item.item_no}}</div></td>
              <td><div class="cell">{{item.item_type_name}}</div></td>
              <td><div class="cell">
                <div class="ellipsis" :title="item.item_name">{{item.item_name}}</div>
              </div></td>
              <td><div class="cell">{{item.num}}</div></td>
              <td><div class="cell" style="text-align:right;">{{item.rmb_total_amount}}</div></td>
              <td><div class="cell">{{item.supplier_org_name}}</div></td>
              <td><div class="cell">{{item.apportion_name}}</div></td>
              <td><div class="cell">{{item.order_status_name}}</div></td>
            </tr>
          </template>

        </table>
      </div>
    </div>
    <div class="module-box">
        <div class="module-title">
          <h5>确认件信息</h5>
        </div>
        <div class="module-content">
             <div class="" style="margin-top:20px;" v-if="$route.query.condition !== 'into'">
                <el-upload
                    class=""
                    action="/bom/api/tuan/upload_confirm_piece"
                    name="image[]"
                    :data="{id: $route.query.id,tuan_id:$route.query.parent_id}"
                    :on-success="addComfireSuccess"
                    :show-file-list="false">
                    <el-button v-if="$menuPermission('tuancontro/line/costlist/updateSure')" type="primary">新增确认件</el-button>
                </el-upload>
            </div>
            <ul class="comfirm-list" v-if="$route.query.view == 'disabled'">
              <li v-for="(obj,idx) in comfirmData.confirm_piece_lists" :key="idx">
                <a :href="obj.url" target="_blank" class="avatar-uploader" style="display: block;">
                  <img v-if="obj.url" :src="obj.url" class="avatar" style="width: 176px;">
                </a>
                <div class="btns">
                  <el-button type="text"><a :href="obj.download_url" target="_blank">查看</a></el-button>
                </div>
              </li>
            </ul>
             <ul class="comfirm-list" v-else>
              <li v-for="(obj,idx) in comfirmData.confirm_piece_lists" :key="idx">
                  <el-upload
                    class="avatar-uploader"
                    action="/bom/api/tuan/change_confirm_piece"
                    name="image[]"
                    :on-success="addComfireSuccess"
                    :data="{att_id:obj.att_id}"
                    :show-file-list="false">
                    <img v-if="obj.url" :src="obj.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div class="btns">
                    <!-- <el-button v-if="$menuPermission('api/tuan/del_confirm_piece')" type="text" @click="confirmPieceRemove(obj.att_id)">删除</el-button> -->
                    <el-button v-if="$menuPermission('tuancontro/line/costlist/updateSure')" type="text" @click="confirmPieceRemove(obj.att_id)">删除</el-button>
                    <!-- <el-button v-if="$menuPermission('api/tuan/change_confirm_piece')" type="text">修改</el-button> -->
                    | <el-button type="text"><a :href="obj.download_url" target="_blank">查看</a></el-button>
                  </div>
              </li>
            </ul>


        </div>
      </div>

      <!--工具条-->
      <div class="mode-toolbar" style="text-align:center;">
        <el-button size="large" @click="goback">返 回</el-button>
      </div>
      <!--确认件删除提示-->
      <el-dialog title="删除确认件" :visible.sync="dialogVisible" size="tiny">
        <span>是否确认删除确认件？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible =false">取 消</el-button>
          <el-button type="primary" @click="confirmPieceRemoveAction">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>

 <!--  <div class="system-content">
      <div class="content-list">
        <div class="mode-table">
        <el-table :data="comfirmData.info" style="width: 100%" border v-if="$route.query.type==1">
          <el-table-column
            v-for="(col,idx) in colsincome"
            :align="col.align?col.align:'center'"
            :key="idx"
            :prop="col.prop"
            :label="col.label"
            :fixed="col.fixed"
            :formatter="col.formatter"
            :min-width="col.minwidth?col.minwidth:''"
            :width="col.width?col.width:''">
          </el-table-column>
        </el-table>
        <el-table :data="comfirmData.info" style="width: 100%" border v-if="$route.query.type==2">
          <el-table-column
            v-for="(col,idx) in colscost"
            :align="col.align?col.align:'center'"
            :key="idx"
            :prop="col.prop"
            :label="col.label"
            :fixed="col.fixed"
            :formatter="col.formatter"
            :min-width="col.minwidth?col.minwidth:''"
            :width="col.width?col.width:''">
          </el-table-column>
        </el-table>
      </div>
      </div>
  </div> -->

  <!--工具条-->
  <!-- <div class="page">
    <el-pagination  layout="prev, pager, next" @current-change="currentPageChange"
                    :total="pagination.total_count"
                    >
    </el-pagination>
  </div> -->



</template>
<script>
  import {getConfirmPiece,
          getSaleConfirmPiece,
          delConfirmPiece} from 'src/api/api';

  export default {
    data() {
      return {
        imageUrl:'',
        costVisible:false,
        // 删除弹窗
        dialogVisible: false,
        // 删除弹窗用的obj参数临时存放
        dialogVisibleTmp: '',
        is_scope:{},
        comfirmData:{},
        comfirm_type:this.$route.query.type,
        middle_cols:[],
        row:{},
        filters: {
          apportion: '',
          order_status: '',
          item_type: ''
        },
        tableList:[],
        pagination:{
          total_count:0,
          total_page: 0,
          page_size:15,
          page_index: 1,
        },
        colscost: [
          {prop: 'item_no', label: '成本id', width:'180',align:'left'},
          {prop: 'item_type_name', label: '项目类型', width:'150'},
          {prop: 'item_name', label: '名称', width:'',minwidth:'200'},
          {prop: 'num', label: '数量', width:'80',template:true},
          {prop: 'rmb_total_amount', label: '应付金额', width:'80',align:'right'},
          {prop: 'supplier_org_name', label: '供应商（结算方）', width:'',minwidth:'230'},
          {prop: 'apportion_name', label: '摊派', width:'80'},
          {prop: 'order_status_name', label: '确认状态', width:'100'},
          {prop: 'remark', label: '说明', width:'180'}
        ],
        colsincome: [
          {prop: 'item_no', label: '收入编号', width:'180',align:'left'},
          {prop: 'item_type_name', label: '项目类型', width:'150'},
          {prop: 'num', label: '数量', width:'80',template:true},
          {prop: 'rmb_total_amount', label: '应收金额', width:'80',align:'right'},
          {prop: 'distributor_org_name', label: '直客/代理商', width:'',minwidth:'230'},
          {prop: 'order_status_name', label: '确认上传状态', width:'180'},
          {prop: 'remark', label: '说明', width:'180'}
        ]
      }
    },
    components:{},
    watch:{
      'is_scope.bills_info.order_no':{
        handler(val){
          console.log(val)
        },
        deep:true
      }
    },
    methods: {
      goback(){
        history.go(-1);
      },
      initPageFn(){
        const getConfirmPieceFunc = this.$route.meta && this.$route.meta.isSale ? getSaleConfirmPiece : getConfirmPiece
        let para = {};
        para.data = {};
        para.data.id =  this.$route.query.id;
        para.data.tuan_id = this.$route.query.parent_id;
        para.data.type = this.$route.query.type;

        getConfirmPieceFunc({
          params: para,
          success: (res) => {
            this.comfirmData = res.data.data;
            if(this.$route.query.type == 1){
              this.middle_cols = this.colsincome;
            }else{
              this.middle_cols = this.colscost;
            }
          },
          showLoding: true
        });
      },
      currentPageChange(val) {
        this.pagination.page_index = val;
        this.initPageFn();
      },
      // 删除确认件
      confirmPieceRemove(att_id){
        this.dialogVisible = true;
        this.dialogVisibleTmp = att_id;
      },
      confirmPieceRemoveAction(){
        this.costVisible = true;
        let para = {};
        para.data = {};
        para.data.att_id = this.dialogVisibleTmp;
        para.data.bill_id = this.$route.query.id;

        delConfirmPiece({
          params: para,
          success: (res) => {
            this.dialogVisible = false;
            this.$message({
              message:res.data.msg,
              type:res.data.code == '0' ? 'success':'error'
            });
            this.initPageFn();
          },
          showLoding: true
        });
      },
      addComfireSuccess(response, file, fileList){

        this.$message({
          message:response.msg,
          type:response.code == '0' ? 'success':'error'
        });
        this.initPageFn();
      }

    },
    mounted() {
      this.initPageFn();
    }
  };
</script>

<style  lang="scss" scoped>
.search-item{line-height: 30px;}
.note{float: left; margin:0 20px 0 5px;}
.w80{width: 50px !important;}
.module-box{
  background: #fff;
  padding-top:20px;
  .module-title{
    padding:0 15px;
    h5{
      padding-left: 5px;
      font-size: 18px;
      color: #b10c79;
      border-left: 5px solid #c10c79;
      line-height: 18px;
    }
  }
  .module-content{
    padding:0 15px;
  }
  .system-search{
    padding-bottom: 0;
  }
}

.el-button{
  a{
    color: #20a0ff;
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.comfirm-list{
  padding-bottom: 50px;
  &::after {
      content: '';
      display: block;
      clear: both;
  }

  li{
    list-style-type:none;
    margin:20px 15px 0 0;
    width: 180px;
    height: 220px;
    float: left;
    .avatar-uploader .el-upload{
      overflow: inherit;
    }
    .el-upload__input{
      // display: block;
      // opacity: 0;
      // filter:alpha(opacity=0);
      // position: absolute;
      // left: 38px;
      // bottom: -30px;
      // width: 45px;
    }
  }
  .btns{
    padding-right: 10px;
    text-align:center;
    color: #ccc;
  }
}
.avatar-uploader{
  height: 178px;
  border:2px solid #ccc;
  .el-upload{
    border: 0;
    &:hover{
      border:0;
    }
    img{
      display: block;
      width: 176px;
    }
  }
}
.system-content .table-title{
  padding-bottom: 0;
}
.diy-table{
  th{
    text-align:center;
    border-right: 1px solid #dfe6ec;
  }
  td{
    border-right-color:#ccc;
    border-right: 1px solid #dfe6ec;
    border-top: 1px solid #ccc;
    background-clip: padding-box;
    text-align:center;
  }
}
.ellipsis-clamp2{
  max-height: 40px;
}
</style>
