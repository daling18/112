<template>
  <div class="system-search">
		<div class="search-line-item">
      <div class="search-item">
				<div class="label">机票类型</div>
        <el-select  placeholder="机票类型"  v-model="searchData.order_flight_type">
          <el-option label="全部" :value="''"></el-option>
          <el-option label="国内机票（单程）" :value="'1'"></el-option>
          <el-option label="国内机票（往返）" :value="'2'"></el-option>
          <el-option label="国际机票（单程）" :value="'3'"></el-option>
          <el-option label="国际机票（往返）" :value="'4'"></el-option>
        </el-select>
			</div>
      <div class="search-item">
				<div class="label">订单分类</div>
        <el-select  placeholder="订单分类"  v-model="searchData.sub_type">
          <el-option label="全部" :value="'0'"></el-option>
          <el-option label="有退款" :value="'1'"></el-option>
          <el-option label="有变更" :value="'2'"></el-option>
          <el-option label="有儿童" :value="'3'"></el-option>
        </el-select>
			</div>
			<div class="search-item">
				<div class="label">订单状态</div>
				<el-select  placeholder="订单状态" v-model="searchData.status_code">
          <el-option label="全部" :value="''"></el-option>
          <el-option label="待处理" :value="'OS000'"></el-option>
          <el-option label="正在处理" :value="'OS001'"></el-option>
          <el-option label="待付款" :value="'OS003'"></el-option>
          <el-option label="出票中" :value="'OS013'"></el-option>
          <el-option label="已完成（已出票）" :value="'OS009'"></el-option>
          <el-option label="已取消" :value="'OS011'"></el-option>
          <el-option label="退票处理中" :value="'EA017'"></el-option>
          <el-option label="退票成功" :value="'OS018'"></el-option>
          <el-option label="变更处理中" :value="'OS037'"></el-option>
          <el-option label="变更待付款" :value="'OS042'"></el-option>
          <el-option label="变更已付款" :value="'OS029'"></el-option>
        </el-select>
			</div>
      <div class="search-item">
				<div class="label">代理商</div>
        <el-input placeholder="代理商"  v-model="searchData.keyword"></el-input>
			</div>
      <div class="search-item calendar">
				<div class="label">出发日期</div>
        <el-date-picker v-model="searchData.depart_date_start"
                            placeholder="选择日期"
                            type="date"></el-date-picker>
        <div class="label zhi"> - </div>
        <el-date-picker v-model="searchData.depart_date_end"
                            :picker-options="datepickerOptions2"
                            placeholder="选择日期"
                            type="date"></el-date-picker>
			</div>
      <div class="search-item calendar">
				<div class="label">下单日期</div>
        <el-date-picker v-model="searchData.create_date_start"
                            placeholder="选择日期"
                            type="date"></el-date-picker>
        <div class="label zhi"> - </div>
        <el-date-picker v-model="searchData.create_date_end"
                            :picker-options="datepickerOptions2"
                            placeholder="选择日期"
                            type="date"></el-date-picker>
			</div>
      <div class="search-item">
				<div class="label">关键词</div>
        <el-input placeholder="订单编号/乘机人"  v-model="searchData.keyword"></el-input>
			</div>
      <div class="search-item">
				<el-button type="primary"
            @click="searchSubmit()">查询</el-button>
			</div>

    </div>
  </div>

</template>

<script>
  import * as format from 'src/utils/format';
  export default {
    name: "OrderSearchForm",
    data(){
      return {
        searchData: {
          status_code:this.$route.query.status_code || "",
          sub_type :this.$route.query.sub_type  || "",
          source :this.$route.query.source  || "",
          depart_date: this.$route.query.depart_date || "",
          depart_date2: this.$route.query.depart_date2 || "",
          order_flight_type: this.$route.query.order_flight_type ||"",
          order_resource: this.$route.query.order_resource ||"",
          keyword: this.$route.query.keyword || "",
        }
      }
    },
    computed:{
      datepickerOptions2(){
        let depart_date = this.searchData.depart_date;
        return {
          disabledDate(time) {
            return time.getTime() < (new Date(depart_date)).getTime();
          }
        }
      }
    },
    methods:{
      searchSubmit(){
            let searchData = {};

            searchData = JSON.parse(JSON.stringify(this.searchData));
            searchData.depart_date = searchData.depart_date?format.date(searchData.depart_date):'';
            searchData.depart_date2 = searchData.depart_date2?format.date(searchData.depart_date2):'';

            this.$router.push({
              path:this.$router.path,
              query:{
                status_code:searchData.status_code,
                sub_type : searchData.sub_type,
                source : searchData.source,
                depart_date:searchData.depart_date,
                depart_date2:searchData.depart_date2,
                order_flight_type: searchData.order_flight_type,
                order_resource: searchData.order_resource,
                keyword:searchData.keyword
              }
            });
            window.location.reload();
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-bar{
    padding: 20px 20px 0;
    margin-bottom: 10px;
    background-color: #fff;
  }
</style>
