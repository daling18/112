<template>
	<div class="long-tab-box">
		<router-link :to="{ path: urlPath+'offline/tuanList', query: {id:id} }"
			:class="sub == 1 ? 'cur' : ''">
			线下业务汇总表
		</router-link>
		<router-link :to="{ path: urlPath+'contregList', query: {id:id} }"
			:class="sub == 2 ? 'cur' : ''">
			合同登记台账
		</router-link>
		<router-link :to="{ path: urlPath+'invoiceList', query: {id:id} }"
			:class="sub == 3 ? 'cur' : ''">
			发票开具表
		</router-link>
		<router-link :to="{ path: urlPath+'costList', query: {id:id} }"
			:class="sub == 4 ? 'cur' : ''">
			成本回票表
		</router-link>
		<router-link :to="{ path: urlPath+'cobankList', query: {id:id} }"
			:class="sub == 5 ? 'cur' : ''">
			分公司银行日记账
		</router-link>
		<router-link :to="{ path: urlPath+'monthList', query: {id:id} }"
			:class="sub == 6 ? 'cur' : ''">
			周数据明细
		</router-link>
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
		if(this.$route.meta.menu == 'StatrepoFinarepo'){
			this.urlPath = '/statrepo/fin/';
		}else{
			this.urlPath = '/statrepo/comp/';
		}
	},
	methods: {}
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
