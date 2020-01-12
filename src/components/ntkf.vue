<template>
  <div @click="open">
    <slot></slot>
  </div>
</template>

<script>
  import { getUserName } from 'src/api/api';
  export default {
    name: 'NTKF',
    props: {
      productId: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        userInfo: {}
      }
    },
    computed:{
    },
    mounted (){
      if(process.env.NODE_ENV !== 'production'){
        return
      }
      getUserName().then(params => {
        let { code, data, msg } = params['data'];
        if (code != '10000') {
          console.log(data)
          this.userInfo = data;
          // this.shoukuan.name = data.real_name;
          // this.shoukuan.org = data.org_name;
        }
        this.init()
      });
    },
    computed: {
    },
    methods: {
      init () {
        window.NTKF_PARAM = {
          //企业ID，为固定值，必填
          siteid: 'ke_1000',
          //接待组ID，为固定值，必填
          settingid: 'ke_1000_1553588998435',
          //用户ID，未登录可以为空，但不能给null，uid赋予的值显示到小能客户端上
          uid: this.userInfo.user_name,
          //用户名，未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
          uname: this.userInfo.real_name,
          //是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
          isvip: '0',
          //网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
          userlevel: '1',
          itemid: this.productId,
          //erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
          erpparam: 'abc'
        }
        let ntkfUrl = document.createElement('script')
        // ntkfUrl.src = "//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_1000";
        ntkfUrl.src = "//dl.ntalker.com/js/b2b/ntkfstat.js?siteid=ke_1000"
        ntkfUrl.id = "ntalker";
        document.body.appendChild(ntkfUrl)
      },
      open () {
        console.log('open NTKF')
        window.NTKF.im_openInPageChat("ke_1000_1553588998435");
      }
    },
    destroyed(){
    }
  }
</script>

<style lang="scss" scoped>
</style>

