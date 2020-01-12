<template lang="pug">
  .checkbox-img
    //- el-checkbox-group(class="outward-imglist")
    div(class="outward-imglist")
      div(class="img-list-item", v-for="(item, index) in imgList")
        el-checkbox(class="outward-check", :label="item", :checked='item.checked' :key="index", @change='change(index)')
          .iamge
            img(:src="item.url")
          .imgInfo
            span 名称{{item.checked}}
            el-input(class="img-name", v-model="item.imgName")
          .outward-btns
            el-button(type="primary") 保存
            el-button(type="primary") 清空
        i(class="el-icon-close del", @click.stop='delImg(index)')
        i(class="setting", @click="handleSetFristImg") 设为首图
        .isDefault(v-if="item.is_default")
          i 首
</template>
<script>
export default {
  props: {
    imgList: {
      type: Array
    }
  },
  methods: {
    delImg(index) {
      this.$emit("delSingleImg", index)
    },
    change (ind) {
     this.$emit("changeItem", ind)
    },
    changeChecked() {
      this.imgList.forEach(item => {
        item.checked = true
      })
    },
    handleSetFristImg(k){
      this.imgList.map(img => {
        if(img.is_default == 1){
          img.is_default = 0;
        }else{
          if(img.k == k){
            img.is_default = 1;
          }
        }
      });
      console.log(this.imgList)
    },
  }
}
</script>
<style lang="stylus" scoped>
.outward-imglist
  display flex
  flex-wrap wrap
  .img-list-item
    position relative 
    margin-right 20px
    .outward-check
      display flex
      margin-bottom 20px
      .iamge
        width 180px
        height 180px
        position relative
        img 
          width 100%
          height 100%
      .imgInfo
        .img-name
          width 150px
          margin 5px
      .outward-btns
        .el-button
          width 85px
    .del
      position: absolute;
      top: 0;
      right: 38px;
      background-color: rgba(0, 0, 0, .5);
      color: #fff;
      padding: 4px;
      cursor: pointer; 
    .setting
      position absolute
      right 38px
      top 152px
      background-color rgba(0, 0, 0, .5)
      color #fff
      padding 4px
      cursor pointer
      line-height 20px
      font-style normal
    .isDefault{
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border: 20px solid #f7ba2a;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
      i{
        position: absolute;
        top: 2px;
        left: 4px;
        color: #fff;
        font-style: normal;
        line-height: normal;
        font-weight: 700;
      }
    }
</style>

