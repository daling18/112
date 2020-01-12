<template>
    <div>
	    <el-tabs type="border-card">
		  <el-tab-pane label="添加付款">
		  	<el-form ref="searchForm"
		               :model="searchData"
		               :inline="true">
		      <el-form-item label="结算方名称" prop="keyword">
			    <el-input placeholder="结算方名称" v-model="searchData.keyword"></el-input>
			  </el-form-item>
			  <el-form-item>
			   <el-button type="primary"
			   >查询</el-button>
			  </el-form-item>
		    </el-form>
		  </el-tab-pane>
		</el-tabs>
		<div class="list">
			<div class="table-title">总付款<span class="total-pay">1998</span>总收款<span class="total-receive">2004</span></div>
	    	<el-table
	      	  :data="tableData"
	      	  style="width: 100%"
	      	  >
	      	  <el-table-column
	        	prop="name"
	        	label="结算方名称"
	        	align="center"
	        	>
	      	  </el-table-column>
	          <el-table-column
	            prop="cost"
	            label="成本结算（剩余应付款）"
	            align="center"
	            >
	          </el-table-column>
	          <el-table-column
	    		label="操作"
	    		align="center"
	    		>
	    		<template slot-scope="scope">
		      		<el-button v-if="$menuPermission('api/finance/payment_list')" type="text" @click="open()">付款记录</el-button>
		    	</template>
	  		  </el-table-column>
	          <el-table-column
	            prop="income"
	            label="收入结算（应收款）"
	            align="center"
	            >
	          </el-table-column>
	          <el-table-column
	    		label="操作"
	    		align="center"
	    		>
	    		<template slot-scope="scope">
		      		<el-button v-if="$menuPermission('api/finance/receipt_list')" type="text" @click="open()">收款记录</el-button>
		    	</template>
	  		  </el-table-column>
	        </el-table>
		</div>
		<div class="page" v-show="pageShow">
	        <el-pagination
	          layout="prev, pager, next"
	          @current-change="handleCurrentChange"
	          :page-count="totalPage">
	        </el-pagination>
	    </div>
	</div>
</template>

<script>
// 没有使用页面 -- qzh 2018-03-09
export default {
  name: 'setting',
  data () {
    return {
      totalPage: 1,
      currentPage:1,
      page:1,
      pageShow:true,
      searchData: {
      	keyword: this.$route.query.keyword || "",
      },
      tableData: [
        {
          name: '王小虎',
          cost: '1212',
          income: '2323',
        }
      ]
    }
  },
  methods:{
  	handleCurrentChange(){}
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .list{

  	.table-title{
  		font-size: 14px;
  		line-height: 20px;
  		margin:16px 0 10px 0;

  		.total-receive{
  			font-size: 16px;
  			color:#00CC00;

  		}
  		.total-pay{
  			font-size: 16px;
  			color: #FF9900;
  			margin-right:20px;
  		}
  	}
  }
  .page{
      position:relative;
      background:#fff;
      padding:20px 0;
      height:30px;
    }
</style>
