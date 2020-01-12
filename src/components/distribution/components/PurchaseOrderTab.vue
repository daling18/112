<template>
  <div class="system-tab">
    <ul class="tab-box">
      <template v-for="(item, key) in TAB_LIST">
        <li :class="key == name ? 'on' : ''" :key="key" v-if="item.permission" @click="handleClickTab(key)">
          {{ item. name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
/**
 * 我的订单tab
 * 
 * 支持attr参数：
 * name | string | 当前tab的名称: line, hotel, ticket, flight, train, bx, qz
 * 
 * demo:
 *   <purchase-order-tab name="line" />
 */

export default {
  name: 'PurchaseOrderTab',
  props: {
    name: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      TAB_LIST: {
        line: {
          name: '线路订单',
          path: '/distribution/line-purchase-order',
          permission: this.$menuPermission('api/order/sale_purchase_order_list')
        },
        // hotel: {
        //   name: '酒店订单',
        //   path: '/distribution/hotel-purchase-order',
        //   permission: false
        // },
        // ticket: {
        //   name: '门票订单',
        //   path: '/distribution/ticket-purchase-order',
        //   permission: this.$menuPermission('api/flight/order_list/3')
        // },
        // flight: {
        //   name: '机票订单',
        //   path: '/distribution/flight-purchase-order',
        //   permission: this.$menuPermission('api/flight/order_list/3')
        // },
        // train: {
        //   name: '火车票订单',
        //   path: '/distribution/train-purchase-order',
        //   permission: false
        // },
        // bx: {
        //   name: '保险订单',
        //   path: '/distribution/bx-purchase-order',
        //   permission: true
        // },
        // 签证订单没有采购订单  -- 20181119
        // qz: {
        //   name: '签证订单',
        //   path: '/distribution/visa-purchase-order',
        //   permission: this.$menuPermission('api/selfsupport.visaorder/purchase_order_list')
        // },
        // localProduct: {
        //   name: '农特优订单',
        //   path: '/distribution/local-product-purchase-order',
        //   permission: this.$menuPermission('api/selfsupport.localproductorder/sale_lists')
        // }
      }
    }
  },
  methods: {
    handleClickTab(key){
        console.log('click tab', key);
      if(this.name != key){
        const tabInfo = this.TAB_LIST[key];
        this.$router.push(tabInfo.path);
      }
    },
  }
};
</script>