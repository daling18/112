<template>
	<div class="long-tab-box">
		<router-link :to="{ path: urlPath+'report', query: {id:id} }"
			:class="sub == 1 ? 'cur' : ''">
			线下业务汇总表
		</router-link>
		<router-link :to="{ path: urlPath+'report-contract', query: {id:id} }">
			合同登记台账
		</router-link>
		<router-link :to="{ path: urlPath+'report-invoice', query: {id:id} }">
			发票开具表
		</router-link>
		<router-link :to="{ path: urlPath+'report-cost', query: {id:id} }">
			成本回票表
		</router-link>
		<router-link :to="{ path: urlPath+'report-journal', query: {id:id} }">
			分公司银行日记账
		</router-link>
		<router-link :to="{ path: urlPath+'report-month', query: {id:id} }">
			周数据明细
		</router-link>
		<!-- <router-link :to="{ path: '/fin/report-fp' }">
			各营业部业绩明细表
		</router-link> -->
	</div>
</template>

<script>
export default{
	data(){
		return{
			urlPath: null
		}
	},
	props: ['id','sub'],
	created(){
		if(this.$route.meta.menu == 'branchReport'){
			this.urlPath = '/fin/b/';
		}else{
			this.urlPath = '/fin/';
		}
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
.long-tab-box{
	background: #fff;
	height: 45px;
	line-height: 46px;
	overflow: hidden;
	padding: 0 20px;
	a{
		color: #333333;
		margin-left: 15px;
		&:first-child{
			margin-left: 0;
		}
		&:hover{
			color: #ae1f77;
		}
	}
	.router-link-active,
	.cur{
		color: #ae1f77;
	}
}
</style>
