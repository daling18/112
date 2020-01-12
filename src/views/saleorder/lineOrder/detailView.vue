<template>
  <div class="detail-view">
    <el-menu v-if="navOptions.length > 1" mode="horizontal" :default-active="activeNav" class="nav" @select="handleSelect">
      <el-menu-item
        v-for="nav in navOptions"
        :key="nav.path"
        :index="nav.path"
        active-text-color="#B10C79"
      >{{nav.label}}</el-menu-item>
    </el-menu>
    <router-view @init="getTabs"/>
  </div>
</template>
<script>
import {
  lineOrderSaleOrderList
} from 'src/api/touristroute';
export default {
  data () {
    return {
      queryStr: '',
      navOptions: [],
    }
  },
  computed: {
    activeNav() {
      return this.$route.fullPath
    }
  },
  mounted () {
    this.getTabs()
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({
        path: key
      })
    },
    getTabs () {
      lineOrderSaleOrderList({
        keyword1: this.$route.query.order_no
      }).then((res) => {
        this.loading = false;
        const {
          code,
          data,
          msg
        } = res
        if (code == 0) {
          for (let i in data.list) {
            this.navOptions = [{
              label: "订单详情",
              path: `/saleorder/v2/lineOrder/detail/order?order_id=${ data.list[i].id }&order_no=${ data.list[i].order_no }`
            }]
            for (let l in data.list[i].lineRefund) {
              if (data.list[i].lineRefund[l] && data.list[i].lineRefund[l].order_no && data.list[i].lineRefund[l].cancel_no) {
                this.navOptions.push({
                  label: "退款详情",
                  path: `/saleorder/v2/lineOrder/detail/refund?order_no=${ data.list[i].lineRefund[l].order_no }&cancel_no=${ data.list[i].lineRefund[l].cancel_no }`
                })
              }
            }
            break;
          }
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
.detail-view{
  padding: 0 15px;
  background: #fff;
}
.nav{
  margin-bottom: 10px;
}
</style>

<style>
</style>
