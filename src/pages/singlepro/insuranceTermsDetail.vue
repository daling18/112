<template>
  <div class="wrapper">
    <div v-html="termsDetail"></div>
  </div>
</template>

<script>
import{
  getProductTerms
} from 'src/api/insurance.js';

export default {
  components: {
  },
  data () {
    return {
      termsDetail: ''
    }
  },
  computed: {
  },
  mounted(){
    this.getTerms(this.$route.query.id,this.$route.query.index);
  },
  methods:{
    getTerms(id,index) {
      getProductTerms({
      params: {'plan_id':id},
      method: 'post',
      success: (data) => {
        if (data.status == '200') {
          if(data.data.status == 'success') {
            this.$nextTick(()=>{
              this.termsDetail = data.data.data.prodTerms[index].productterm;
            })
          }else {
            this.$message.error(data.data.status);
          }
        } else {
          this.$message.error(data.statusText);
        }
      },
      showLoading: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/iconfont/iconfont.css";
</style>
