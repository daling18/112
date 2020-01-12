<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="wechat-module">
        <div class="wechat-hd clearfix"><h5>工作交接</h5></div>

        <div class="transfer-box">
          <div class="transfer">
            <div class="title">工作交出人</div>
            <div class="filter">
              <el-input placeholder="输入姓名" v-model="fromFilter"></el-input>
            </div>
            <div class="transfer-list">
              <ul v-for="(item,idx) in fromList" :key="idx">
                <li>
                  <el-radio class="radio" v-model="fromId" 
                    :label="item.userId"
                    :disabled="item.disabled">
                    {{item.userName}}
                  </el-radio>
                </li>
              </ul>
            </div>
          </div>
          <img src="../../assets/icons/transfer-icon.png" alt="" class="transfer-icon">
          <div class="transfer">
            <div class="title">工作交出人</div>
            <div class="filter">
              <el-input placeholder="输入姓名"></el-input>
            </div>
            <div class="transfer-list">
              <ul v-for="(item,idx) in toList" :key="idx">
                <li>
                  <el-radio class="radio" v-model="toId" 
                    :label="item.userId" 
                    :disabled="item.disabled">
                    {{item.userName}}
                  </el-radio>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="transfer-footer">
          <el-button type="primary" @click="changeHandlerMan">确定</el-button>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
import { queryBomUserList,setHandoveruser } from 'src/api/wechat';

export default ({
  data() {
    return {
      dataList:null,
      fromId:'',
      toId:'',
      fromList:null,
      toList:null,
      fromFilter:'',
      toFilter:'',
    }
  },
  watch:{
    fromId(val){
      this.toList.map(item => {
        if(val == item.userId){
          item.disabled = true;
        }else{
          item.disabled = false;
        }
        return item;
      })
      this.$set(this,'toId','');
    },
    fromFilter(query){
      if(query){
        let queryArr = [];
        this.fromList.map(item => {
          console.log(item.userName.indexOf(query))
          if(item.userName.indexOf(query) > -1){
            queryArr.push(item)
          }
        })
        this.$set(this,'fromList',queryArr);
      }else{
        this.$set(this,'fromList',this.dataList);
      }
    },
  },
  methods: {
    getBomUserList() {
      let params = {};
      params.loginName = '110099';
      params.userName = '吴双双';
      params.pageNum = 1;
      params.pageSize = 10;

      queryBomUserList({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          console.log(params.data)
          let aa = [{
            userId:100071,
            userName:'陈文艺'
          },{
            userId:100072,
            userName:'陈文yi'
          },
          {
            userId:100073,
            userName:'陈文xue'
          },
          {
            userId:100074,
            userName:'陈文话'
          }
          ]
          if(ret == '0'){
            this.$set(this,'fromList',aa);
            this.$set(this,'toList',JSON.parse(JSON.stringify(aa)));
            this.$set(this,'dataList',JSON.parse(JSON.stringify(aa)));
          }else{
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        },
        showLoading: true
      });
    },
    changeHandlerMan() {
      let params = {};
      params.fromId = this.fromId;
      params.toId = this.toId;

      setHandoveruser({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          console.log(params.data)
          // if(ret == '0'){}
          this.$message({
            message: ret=='0' ? '操作成功' :msg,
            type: ret=='0' ? 'success' :'error'
          })
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getBomUserList();
  },
});
</script>



<style scoped lang="scss">
.system-content{
  background: #fff;
  .wechat-module{
    &:last-child{padding-bottom: 50px;}
    .wechat-hd{
      padding: 25px 15px;
      h5{
        float: left;
        font-size: 14px;
        font-weight: 700;
        color: #333;
      }
    }
  }
  .transfer-box{
    padding: 0 15px 0 80px;
    .transfer-icon{
      width: 42px;
      height: 25px;
      vertical-align: top;
      margin: 120px 15px 0;
    }
  }
  .transfer-footer{
    padding: 30px 0 30px 360px;
  }
  .transfer{
    width: 300px;
    display: inline-block;
    border: 1px solid #ccc;
    .title{
      padding: 15px;
      background: #f4f4f4;
    }
    .filter{
      padding: 10px 15px;
      background: #fff;
      border-bottom: 1px solid #ccc;
    }
    .transfer-list{
      height: 300px;
      overflow-y: auto;
      li{
        padding:0 15px;
        border-bottom: 1px solid #ccc;
      }
    }
    .el-radio{
      display: block;
      padding:15px 0;
    }
  }
}

</style>

