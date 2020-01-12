export let filterStatusMap = {
  // contract_status: {
  //   id: "contract_status",
  //   label: "合同状态"
  // },
  order_source: {
    id: "order_source",
    label: "下单渠道"
  },
  order_status: {
    id: "order_status",
    label: "订单状态"
  },
  settle_status: {
    id: "is_balance",
    label: "结算状态"
  },
  trip_type: {
    id: "line_type",
    label: "产品类型"
  },
  orderStatusCfg: {
    id: "order_status",
    label: "订单状态"
  },
  lineTypeCfg: {
    id: "line_type",
    label: "订单类型"
  },
  contractStatusCfg: {
    id: "contract_status",
    label: "合同状态"
  }
};
//证件类型
export const identityTypeMap = {
  "0": {
    title: "其他"
  },
  "1": {
    title: "身份证"
  },
  "2": {
    title: "护照"
  },
  "3": {
    title: "军官证"
  },
  "4": {
    title: "港澳通行证"
  },
  "5": {
    title: "台胞证"
  },
  "6": {
    title: "回乡证"
  },
  "7": {
    title: "户口簿"
  },
  "8": {
    title: "台湾通行证"
  },
  "9": {
    title: "士兵证"
  },
  "10": {
    title: "出生证明"
  }
};
// 1: "身份证"
// 2: "护照"
// 3: "军官证"
// 4: "港澳通行证"
// 5: "台胞证"
// 6: "回乡证"
// 7: "户口簿"
// 8: "台湾通行证"
// 9: "士兵证"
// 10: "出生证明"
// 99: "其他"
//合同类型
export const templateList = {
  A00001: "境内游",
  C00001: "出境游",
  D00001: "一日游",
  F00001: "赴台游",
  E00001: "代订代办"
};
//详情接口mao
export let dataMap = {
  detailInfo: {
    productInfo: {
      tuan_no: "YK20190810-01020190807110421602-001", //团号
      departure_date: "2019-08-10", //出发日期
      end_date: "2019-08-12", //返回日期
      line_title: "嘎嘎嘎", //产品标题
      line_subtitle: "", //产品浮标起
      line_no: "20190807110421602", //产品编号
      line_type_text: "出境>亚洲>日韩", //线路类型
      starting_city: "北京", //出发地
      end_city: "上海", //目的地
      line_day: "3", //行程天数
      line_night: "0", //行程夜晚数
      supplier_org_id: "16161", //供应商
      supplier_org_name: "北京测试分公司", //供应商
      wholesaler_org_id: "16161", //批发商
      wholesaler_org_name: "北京测试分公司", //批发商
      operator_name: "北京测试分公司-002", //线路负责人
      operator_phone: "", //负责人电话
      is_deposit: "0", //是否有定金
      deposit: "0.000" //定金金额
    },
    orderInfo: {
      order_no: "", //订单编号
      order_status: "3", //订单状态
      order_status_text: "部分付款", //订单状态text
      operator_id: "404069", //下单人
      operator_name: "分公司管理员", //下单人
      operator_account: "admin_bj", //下单人账号
      create_time: "2019-08-30 08:33:30", //下单时间
      order_source: "1", //订单来源
      order_source_text: "云平台 ", //订单来源
      contacts_real_name: "董建丰", //订单联系人
      contacts_mobile: "18031386867", //订单联系人电话
      org_code_name: "北京测试分公司/盈科美辰国际旅行社有限公司", //下单人所属组织
      enrollment: "1", //订单人数
      agent_org_name: "测试数据啊", //代理商
      insurance_order_no: "123131313123123", //保险单号
      remark: "test", //备注
      seattime: "0000-00-00 00:00:00", //清位时间
      confirm_time: "1970-01-00 12:00:00", //订单确认时间
      is_seat: "0", //是否预占位订单
      is_tourist_cancel: "0", //是否退团
      tourist_info: [] //人数类型
    },
    priceInfo: {
      total_amount: "9199.000", //应收金额
      total_received_amount: "50.000", //已收金额
      total_unreceived_amount: "9149", //未收金额
      total_peer_amount: "9000.000", //应结算金额
      total_real_peer_amount: "9000.000", //实际结算金额
      total_settled_amount: "0.000", //已结算金额
      total_unsettled_amount: "9000", //未结算金额
      sales_profit: "199", //销售利润
      //表格信息
      price_info: [
        {
          item_name: "北京市->标准套餐->成人", //项目名称
          num: "1", //数量
          sale_price: 100, //销售单价
          settle_price: "10.0", //结算单价
          remark: "test" //备注
        },
        {
          item_name: "订单调价-销售价",
          type: "销售",
          price: "+5",
          remark: "test"
        },
        {
          item_name: "订单调价-销售价",
          type: "销售",
          price: "-6",
          remark: "test"
        }
      ]
    },
    touristListInfo: [
      {
        nationality: "中国",
        id: "0", //游客id
        username: "", //游客名字
        gender: "1", //性别 1男2女
        gender_text: "男", //性别 1男2女
        tourist_type: "", //游客类型
        tourist_type_text: "成人", //游客类型
        identity_type: "", //证件类型
        identity_type_text: "身份证", //证件类型
        identity_no: "1", //证件号
        identity_end_date: "", //证件有效期
        mobile: "18031386867", //手机号
        birthday: "", //生日
        remark: "测试", //备注
        visa: "", //签发地
        is_contract_sign: "0" // 判断是否为签字人
      }
    ],
    contractSignerInfo: [
      {
        id: "3179",
        username: "djf",
        is_signed: "0",
        signed_text: "未签署"
      }
    ],
    payInfo: [
      {
        id: "3",
        pay_type: "1", //付款类型
        payment_type: "1", //付款方式
        pay_type_text: "微信",
        payment_no: "276487264872235", //支付单号
        payment_order_no: "87895326787562387", //三方交易单号
        amount: "50.000", //支付金额
        received_amount: "0.000", //到账金额
        pay_time: "2019-08-23 00:00:00", //支付时间
        payee_org_name: "北京测试分公司", //收款公司
        subscriber_name: "", //认款人
        operator_name: "收款人",
        subscription_time: "0000-00-00 00:00:00" //认款时间
      },
      {
        id: "4",
        pay_type: "1",
        payment_type: "1",
        pay_type_text: "微信",
        payment_no: "276487264872235",
        payment_order_no: "87895326787562387",
        amount: "50.000",
        received_amount: "0.000",
        pay_time: "2019-08-23 00:00:00",
        payee_org_name: "北京测试分公司",
        subscriber_name: "",
        subscription_time: "0000-00-00 00:00:00"
      },
      {
        id: "6",
        pay_type: "1",
        payment_type: "1",
        pay_type_text: "微信",
        payment_no: "276487264872235",
        payment_order_no: "87895326787562387",
        amount: "50.000",
        received_amount: "0.000",
        pay_time: "2019-08-23 00:00:00",
        payee_org_name: "北京测试分公司",
        subscriber_name: "",
        subscription_time: "0000-00-00 00:00:00"
      },
      {
        id: "7",
        pay_type: "1",
        payment_type: "1",
        pay_type_text: "微信",
        payment_no: "276487264872235",
        payment_order_no: "87895326787562387",
        amount: "50.000",
        received_amount: "0.000",
        pay_time: "2019-08-23 00:00:00",
        payee_org_name: "北京测试分公司",
        subscriber_name: "",
        subscription_time: "0000-00-00 00:00:00"
      },
      {
        id: "11",
        pay_type: "2",
        payment_type: "0",
        pay_type_text: "线下支付",
        payment_no: "0750851566544515",
        payment_order_no: "",
        amount: "50.000",
        received_amount: "0.000",
        pay_time: "2019-08-23 15:15:15",
        payee_org_name: "北京测试分公司",
        subscriber_name: "",
        subscription_time: "0000-00-00 00:00:00"
      },

      {
        id: "11",
        pay_type: "2",
        payment_type: "0",
        pay_type_text: "线下支付",
        payment_no: "0750851566544515",
        payment_order_no: "",
        amount: "50.000",
        received_amount: "0.000",
        pay_time: "2019-08-23 15:15:15",
        payee_org_name: "北京测试分公司",
        subscriber_name: "",
        subscription_time: "0000-00-00 00:00:00"
      },
      {
        id: "14",
        pay_type: "2",
        payment_type: "0",
        pay_type_text: "线下支付",
        payment_no: "0445271566967039",
        payment_order_no: "",
        amount: "50.000",
        received_amount: "0.000",
        pay_time: "2019-08-28 12:37:19",
        payee_org_name: "北京测试分公司",
        subscriber_name: "",
        subscription_time: "0000-00-00 00:00:00"
      },
      {
        id: "15",
        pay_type: "1",
        payment_type: "1",
        pay_type_text: "微信",
        payment_no: "276487264872235",
        payment_order_no: "87895326787562387",
        amount: "50.000",
        received_amount: "0.000",
        pay_time: "2019-08-23 00:00:00",
        payee_org_name: "北京测试分公司",
        subscriber_name: "",
        subscription_time: "0000-00-00 00:00:00"
      }
    ],
    settlementInfo: [
      {
        settlement_no: "ads", //结算单号
        final_amount: "123123", // 金额
        create_time: "asd", //发起时间
        status: "asd", //状态
        handle_time: "asd", //结算时间
        settlement_name: "1313", //结算对象
        create_user: "1313" //发起人
      }
    ],
    btnInfo: {
      btn: [
        {
          str: "申请退款/退团",
          type: 7
        },
        {
          str: "取消订单",
          type: 9
        },
        {
          str: "订单调价",
          type: 8
        },
        {
          str: "重新下单",
          type: 17
        },
        {
          str: "付款",
          type: 10,
          btn: [
            {
              str: "线上付款",
              type: 12,
              btn: []
            },
            {
              str: "线上支付定金",
              type: 13,
              btn: []
            },
            {
              str: "线上支付全款",
              type: 14,
              btn: []
            },
            {
              str: "线上支付尾款",
              type: 15,
              btn: []
            },
            {
              str: "线下付款",
              type: 16
            }
          ]
        },
        {
          str: "操作记录",
          type: 19
        }
      ]
    }
  }
};
export let contract_data = {
  publicAttachments: [
    // 1
  ],
  attachments: [
    // {
    //     url: "https://testerp.yktour.com.cn/bom/contract/安全告知书.pdf",
    //     type: "pdf"
    // },
    // {
    //     url: "https://testerp.yktour.com.cn/bom/contract/文明旅游倡议书.pdf",
    //     type: "pdf"
    // },
    // {
    //     url: "https://testerp.yktour.com.cn/bom/contract/中国公民国内旅游文明行为公约.pdf",
    //     type: "pdf"
    // }
  ],
  // ERPContractId: "YKLY-GN-E-1907291512340869377",
  // templateId: "A00001",
  // callbackURL: "https://testerp.yktour.com.cn/api/v1/lineservice/line-quote-order/refund_contract",
  // isMultiSignatory: true,
  // supplementaryClause: "费用包含:1     费用不包含:1",
  travelAgency: {
    // travelAgencyLicenseNumber: "L-BJ-98372674",
    // businessLicenseNumber: "91110105585835838D",
    // transactorName: "总部管理员",
    // agencyName: "盈科美辰国际旅行社有限公司",
    // transactorPhone: "13696954018"
  },
  itinerary: {
    // startDate: "2019-07-30",
    // endDate: "2019-07-30",
    // days: "1",
    // groupId: "YK20190730-01020190725202834174-001",
    // routeName: "海的行程测试（周边游）",
    routes: [
      {
        // day: "1",
        // title: "",
        // description: "阿三打扫"
      }
    ]
  },
  touristsInfo: {
    // totalNumber: "1",
    // adultNumber: "0",
    tourists: [
      {
        // number: 1,
        // name: "zzz",
        // gender: "男",
        // phone: "13456789087",
        // isSigner: true,
        ID: {
          // IDType: "3",
          // IDNumber: "1122345"
        }
      }
    ]
  },
  cost: {
    // singleSupplementCost: "",
    // adultCost: "300.000",
    // childCost: "",
    // totalCost: "300.000",
    // paymentTime: "1970-01-00",
    // paymentMethod: 3
  },
  insurance: {
    // purchaseMethod: 2
  },
  dispute: {
    // resolution: 2,
    // tribunalName: "被告所在地"
  },
  activities: [],
  groupAgreement: {
    // leastCustomerNumber: "1",
    // agreeToTransfer: true,
    // agreeToDelay: false,
    // agreeToChangeLine: false,
    // agreeToTerminate: false,
    // agreeToMerge: true,
    // mergeToCompanyName: "同等资质"
  }
};
//订单状态
export let statusMap = {
  "-1": {
    id: "-1",
    title: "已取消",
    type: "info"
  },
  "0": {
    id: "0",
    title: "待付款",
    type: "danger"
  },
  "1": {
    id: "1",
    title: "待确认",
    type: "warning"
  },
  "2": {
    id: "2",
    title: "占位中",
    type: "warning"
  },
  "3": {
    id: "3",
    title: "部分付款",
    type: "warning"
  },
  "4": {
    id: "4",
    title: "已付款",
    type: "success"
  },
  "5": {
    id: "5",
    title: "已完成",
    type: "info"
  }
};
//操作按钮类型
// $btnConfig = [
//   1 => '补录游客信息',

//   2 => '电子合同',
//   3 => '合同预览',
//   4 => '下载电子合同',
//   5 => '编辑合同',
//   6 => '合同管理',

//   7 => '申请退款/退团',
//   8 => '订单调价',
//   9 => '取消订单',

//   10 => '付款',
//   12 => '线上付款(无定金)',
//   13 => '线上支付定金(有定金)',
//   14 => '线上支付全款(有定金)',
//   15 => '线上支付尾款(有定金)',
//   16 => '线下付款',

//   17 => '重新下单',
//   18 => '下载出团通知书',
//   19 => '操作记录',

//   22 => '确认件',
//   23 => '查看',
//   24 => '下载',
// ];
