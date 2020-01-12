// 用户中心
import Home from 'src/layouts/';

function getApproveDetailRouter(
  prefixPath,     // 以 / 结束，如：line/
  prefixName,     // 路由名称前缀
  parentLabel,    // 收款详情上级面包屑名称
  parentPath = 'list'      // 收款详情上级面包屑路径
) {
  return [
    // 审批单详情
    {
      path: prefixPath + 'detail',
      name: prefixName + 'Detail',
      component: function (resolve) {
        require(['src/pages/usercenter/ApprovalDetail.vue'], resolve);
      },
      meta: {
        label: '审批单详情',
        menu: 'approval',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: 'usercenter/approval/detail'
      }
    },
    // 审批单详情跳入审批内容预览
    {
      path: prefixPath + 'trip-detail',
      name: prefixName + 'TripDetail',
      component: function (resolve) {
        require(['src/pages/usercenter/ApprovalTripDetail.vue'], resolve);
      },
      meta: {
        label: '审批单内容详情',
        menu: 'approval',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: 'api/approval/approval_content'
      }
    }
  ]
}

const USERCENTER_ROUTE = {
  path: '/approval',
  component: Home,
  name: 'approval',
  meta: {
    label: '审批单'
  },
  children: [
    // 审批单列表页
    {
      path: 'index',
      name: 'approvalIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '审批单',
        paths: 'submit/list,check/list,checked/list',
        permission: 'usercenter/approval/myinitappr,usercenter/approval/waitmyapproval,usercenter/approval/myapprovaled'
      }
    },
    // 审批单列表页-我发起的
    {
      path: 'submit/list',
      name: 'approvalListsubmit',
      component: function (resolve) {
        require(['src/pages/usercenter/ApprovalList.vue'], resolve);
      },
      meta: {
        label: '我发起的',
        menu: 'approval',
        permission: 'usercenter/approval/myinitappr'
      }
    },
    ...getApproveDetailRouter('submit/', 'approvalListsubmit', '我发起的'),
    // 审批单列表页-我审批的
    {
      path: 'check/list',
      name: 'approvalListcheck',
      component: function (resolve) {
        require(['src/pages/usercenter/ApprovalList.vue'], resolve);
      },
      meta: {
        label: '待我审批',
        menu: 'approval',
        permission: 'usercenter/approval/waitmyapproval'
      }
    },
    ...getApproveDetailRouter('check/', 'approvalListcheck', '待我审批'),
    // 审批单列表页-我已审批
    {
      path: 'checked/list',
      name: 'approvalListchecked',
      component: function (resolve) {
        require(['src/pages/usercenter/ApprovalList.vue'], resolve);
      },
      meta: {
        label: '我已审批',
        menu: 'approval',
        permission: 'usercenter/approval/myapprovaled'
      }
    },
    ...getApproveDetailRouter('checked/', 'approvalListchecked', '我已审批'),
  ]
};
export default USERCENTER_ROUTE;