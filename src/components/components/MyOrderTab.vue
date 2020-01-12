// src\components\distribution\components\MyOrderTab.vue
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
 *   <my-order-tab name="line" />
 */

export default {
  name: 'MyOrderTab',
  props: {
    name: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      TAB_LIST: {
        line: {
          name: '线路订单',
          path: '/distribution/line-order',
          permission: this.$menuPermission('api/order/sale_order_list')
        },
        hotel: {
          name: '酒店订单',
          path: '/saleorder/hotel',
          permission: this.$menuPermission('saleorder/hotel/orderlist')
        },
        ticket: {
          name: '门票订单',
          path: '/distribution/ticket-order',
          permission: this.$menuPermission('api/ticket/order_list/1')
        },
        flight: {
          name: '机票订单',
          path: '/distribution/flight-order',
          permission: this.$menuPermission('api/flight/order_list/1')
        },
        train: {
          name: '火车票订单',
          path: '/saleorder/train',
          permission: this.$menuPermission('saleorder/train/orderlist')
        },
        // bx: {
        //   name: '保险订单',
        //   path: '/distribution/bx-order',
        //   permission: true
        // },
        qz: {
          name: '签证订单',
          path: '/distribution/visa-order',
          permission: this.$menuPermission('api/selfsupport.visaorder/order_list')
        },
        localProduct: {
          name: '农特优订单',
          path: '/distribution/local-product-order',
          permission: this.$menuPermission('api/selfsupport.localproductorder/my_sale_lists')
        }
      }
    }
  },
  methods: {
    handleClickTab(key){
      // console.log('click tab', key);
      if(this.name != key){
        const tabInfo = this.TAB_LIST[key];
        this.$router.push(tabInfo.path);
      }
    },
  }
};
</script>