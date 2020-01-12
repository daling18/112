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
 * 单项订单tab
 * 
 * 支持attr参数：
 * name | string | 当前tab的名称: hotel, ticket, flight, train, bx, qz
 * 
 * demo:
 *   <my-order-tab name="line" />
 */

export default {
  name: 'SingleOrderTab',
  props: {
    name: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      TAB_LIST: {
        hotel: {
          name: '酒店订单',
          path: '/plan/single-hotel-order',
          permission: this.$menuPermission('api/hotel/orderList/1')
        },
        ticket: {
          name: '门票订单',
          path: '/plan/single-ticket-order',
          permission: this.$menuPermission('api/ticket/order_list/2')
        },
        flight: {
          name: '机票订单',
          path: '/plan/single-flight-order',
          permission: this.$menuPermission('api/flight/order_list/2')
        },
        train: {
          name: '火车票订单',
          path: '/plan/single-train-order',
          permission: this.$menuPermission('api/train/train_order_list')
        },
        // bx: {
        //   name: '保险订单',
        //   path: '/plan/single-bx-order',
        //   permission: true
        // },
        qz: {
          name: '签证订单',
          path: '/plan/single-visa-order',
          permission: this.$menuPermission('api/selfsupport.visaorder/op_order_list')
        },
        localProduct: {
          name: '农特优订单',
          path: '/plan/single-local-product-order',
          permission: this.$menuPermission('api/selfsupport.localproductorder/lists')
        }
      }
    }
  },
  methods: {
    handleClickTab(key){
      //  console.log('click tab', key);
      if(this.name != key){
        const tabInfo = this.TAB_LIST[key];
        this.$router.push(tabInfo.path);
      }
    },
  }
};
</script>