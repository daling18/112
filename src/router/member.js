// 采购订单
import Home from 'src/layouts/';

const MEMBER_ROUTE = {
  path: '/member',
  component: Home,
  name: 'member',
  meta: {
    label: 'C端用户管理'
  },
  children: [
    {
      path: 'list',
      component(reslove) {
        require(['src/pages/member/MemberList.vue'], reslove);
      },
      name: 'MemberList',
      meta: {
        topMenuConst: 'member',
        label: '用户管理',
        isPurchase: 1,
        menu: 'MemberList',
        permission: 'member/list'
      }
    },
    {
      path: 'detail',
      component(reslove) {
        require(['src/pages/member/MemberDetail.vue'], reslove);
      },
      name: 'MemberDetail',
      meta: {
        topMenuConst: 'MemberList',
        label: '用户信息',
        isPurchase: 1,
        menu: 'MemberList',
        permission: 'member/detail'
      }
    },
    {
      path: 'invitation',
      component(reslove) {
        require(['src/pages/member/Invitation.vue'], reslove);
      },
      name: 'MemberInvitation',
      meta: {
        topMenuConst: 'MemberList',
        label: '邀请好友记录',
        isPurchase: 1,
        menu: 'MemberList',
        permission: 'member/invitation'
      }
    },
    {
      path: 'earnings',
      component(reslove) {
        require(['src/pages/member/Earnings.vue'], reslove);
      },
      name: 'MemberEarnings',
      meta: {
        topMenuConst: 'MemberList',
        label: '收益明细',
        isPurchase: 1,
        menu: 'MemberList',
        permission: 'member/earnings'
      }
    },
    {
      path: 'withdraw',
      component(reslove) {
        require(['src/pages/member/withdraw.vue'], reslove);
      },
      name: 'MemberWithdraw',
      meta: {
        topMenuConst: 'MemberList',
        label: '提现明细',
        isPurchase: 1,
        menu: 'MemberList',
        permission: 'member/withdraw'
      }
    },
    {
      path: 'passengerDetail',
      component(reslove) {
        require(['src/pages/member/PassengerDetail.vue'], reslove);
      },
      name: 'MemberPassengerDetail',
      meta: {
        topMenuConst: 'MemberList',
        label: '旅客信息详情',
        isPurchase: 1,
        menu: 'MemberList',
        permission: 'member/passengerdetail'
      }
    }

    
  ]
};
export default MEMBER_ROUTE;
