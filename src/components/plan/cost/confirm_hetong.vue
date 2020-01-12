<template>
<div class="wrapper">

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
              <th ><div class="cell">直客 / 代理商</div></th>
              <th ><div class="cell">确认上传状态</div></th>
            </tr>
          <template v-for="(item,index) in comfirmData.info">
            <tr :key="index">
              <td><div class="cell">{{item.item_no}}</div></td>
              <!-- <td><div class="cell">{{item.item_type_name}}</div></td> -->
              <td><div class="cell">{{item.num}}</div></td>
              <td><div class="cell" style="text-align:right;">{{item.rmb_total_amount}}</div></td>
              <td><div class="cell">{{item.distributor_org_name}}</div></td>
              <td><div class="cell">{{item.order_status_name}}</div></td>
            </tr>
            <tr :key="index">
              <th><div class="cell">说明</div></th>
              <td colspan="5"><div class="cell" style="text-align:left;">{{item.remark}}</div></td>
            </tr>
          </template>
            
          </table>
        </table>
        <table class="diy-table" width="100%;"  v-if="$route.query.type==2">
          <tr>
            <th width="180"><div class="cell">成本编号</div></th>
            <th width="100"><div class="cell">项目类型</div></th>
            <th width="100"><div class="cell">名称</div></th>
            <th ><div class="cell">数量</div></th>
            <th ><div class="cell">应付金额</div></th>
            <th ><div class="cell">供应商（结算方）</div></th>
            <th ><div class="cell">摊派</div></th>
            <th ><div class="cell">确认状态</div></th>
          </tr>
          <template v-for="(item,index) in comfirmData.info">
             <tr :key="index">
              <td><div class="cell" style="text-align:left;">{{item.item_no}}</div></td>
              <td><div class="cell">{{item.item_type_name}}</div></td>
              <td><div class="cell">
								<div class="ellipsis-clamp2" :title="item.item_name">{{item.item_name}}</div>
							</div></td>
              <td><div class="cell">{{item.num}}</div></td>
              <td><div class="cell" style="text-align:right;">{{item.rmb_total_amount}}</div></td>
              <td><div class="cell">{{item.supplier_org_name}}</div></td>
              <td><div class="cell">{{item.apportion_name}}</div></td>
              <td><div class="cell">{{item.order_status_name}}</div></td>
            </tr>
            <tr :key="index">
              <th><div class="cell">说明</div></th>
              <td colspan="7"><div class="cell" style="text-align:left;">{{item.remark}}</div></td>
            </tr>
          </template>
           
        </table>
      </div>
    </div>
    <div class="module-box">
		<div class="module-title">
			<h5>合同信息</h5>
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
								<el-button v-if="$menuPermission('api/tuan/upload_confirm_piece')" type="primary">新增确认件</el-button>
						</el-upload>
				</div>

				 <ul class="comfirm-list">
					<li v-for="(obj,idx) in comfirmData.contract_lists" :key="idx">
            <a :href="obj.path" target="_blank" class="avatar-uploader" style="display: block;">
              <img v-if="obj.path" :src="obj.path" class="avatar" style="width: 176px;">
            </a>
							<!-- <el-upload
								class="avatar-uploader"
								:data="{att_id:obj.att_id}"
								:show-file-list="false">
								<img v-if="obj.path" :src="obj.path" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload> -->
							<div class="btns">
								<!-- <el-button v-if="$menuPermission('api/tuan/del_confirm_piece')" type="text" @click="confirmPieceRemove(obj.att_id)">删除</el-button> -->
								<!-- <el-button v-if="$menuPermission('api/tuan/change_confirm_piece')" type="text">修改</el-button> -->
								<!-- |  -->
                <el-button type="text"><a :href="obj.path" target="_blank">查看</a></el-button>
							</div>
					</li>
				</ul>


		</div>
	</div>

	<!--工具条-->
	<div class="mode-toolbar" style="text-align:center;">
		<el-button size="large" @click="goback">返 回</el-button>
	</div>
  </div>
  <!-- <div class="system-content">
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


	

</div>
</template>
<script>
	import {getConfirmPiece,
          getContractDetail,
          getSaleContractDetail,
					delConfirmPiece,
					setCostForm} from 'src/api/api';

	export default {
		data() {
			return {
				imageUrl:'',
				costVisible:false,
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
					{prop: 'item_no', label: '成本编号', width:'180',align:'left'},
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
					{prop: 'distributor_org_name', label: '直客/同行（结算方）', width:'',minwidth:'230'},
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
				const getContractDetailFunc = this.$route.meta && this.$route.meta.isSale ? getSaleContractDetail : getContractDetail;
				let para = {};
			  para.data = {};
				para.data.id =  this.$route.query.id;
			  para.data.tuan_id = this.$route.query.parent_id;
			  para.data.type = this.$route.query.type;

				getContractDetailFunc({
          params: para,
          success: (res) => {
            console.l
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
			/*confirmPieceRemove(att_id){
				this.costVisible = true;
				let para = {};
				para.data = {};
				para.data.att_id = att_id;
				para.data.bill_id = this.$route.query.id;

				delConfirmPiece({
          params: para,
          success: (res) => {
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
			}*/

		},
		mounted() {
			this.initPageFn();
		}
	};
</script>

<style  lang="scss">
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
