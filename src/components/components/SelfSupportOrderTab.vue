// src\components\distribution\components\SelfSupportOrderTab.vue
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
  name: 'SelfSupportOrderTab',
  props: {
    name: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      TAB_LIST: {
        hotel: {
          name: '酒店订单',
          path: '/singlepro/selfsupport-order/hotel',
          permission: this.$menuPermission('singlepro/selforder/hotel')
        },
        ticket: {
          name: '门票订单',
          path: '/singlepro/selfsupport-ticket-order',
          permission: this.$menuPermission('api/ticket/order_list/3')
        },
        // bx: {
        //   name: '保险订单',
        //   path: '/distribution/bx-purchase-order',
        //   permission: true
        // },
        qz: {
          name: '签证订单',
          path: '/singlepro/selfsupport-visa-order',
          permission: this.$menuPermission('singlepro/selforder/visaorder/orderlist')
        },
        localProduct: {
          name: '农特优订单',
          path: '/singlepro/selfsupport-local-product-order',
          permission: this.$menuPermission('singlepro/selforder/localproductorder/orderlist')
        },
        insurance: {
          name: '保险订单',
          path: '/singlepro/selfsupport-order/insurance',
          permission: this.$menuPermission('singlepro/selforder/insurance')
        }
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