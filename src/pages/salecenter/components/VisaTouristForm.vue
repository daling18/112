// \src\components\distribution\components\VisaTouristForm.vue
<template>
  <el-form class="tourist-form" label-width="170px">
    <div class="index">
      <div class="index-no">{{ index }}</div>
      {{ isAdult ? '成人' : '儿童' }}
    </div>
    <el-form-item label="中文姓名" class="w530" required>
      <el-input v-model.trim="tourist.name" placeholder="请输入中文姓名"/>
    </el-form-item>
    <el-form-item label="英文姓名" class="w530">
      <el-input class="w175" v-model.trim="tourist.first_name" placeholder="姓（拼音或英文）"/><el-input class="ml10 w175" v-model="tourist.last_name" placeholder="名（拼音或英文）"/>
    </el-form-item>
    <el-form-item label="手机" class="w530" required>
      <el-input v-model="tourist.mobile" placeholder="请输入手机号码"/>
    </el-form-item>
    <el-form-item label="证件号码" class="w530">
      <el-select class="w100" v-model="tourist.id_type">
        <el-option v-for="(val, key) in idTypeMap" :key="key" :label="val" :value="key"/>
      </el-select><el-input class="ml10 w250" v-model="tourist.id_no" placeholder=""/>
    </el-form-item>
    <el-form-item label="证件有效期" class="w530">
      <el-date-picker class="w100p" type="date" v-model="idEndDate" @change="tourist.id_end_date=$event" />
    </el-form-item>
    <el-form-item label="国籍" class="w530">
      <world-select class="w100p" v-model="tourist.nation"/>
    </el-form-item>
    <el-form-item label="性别" class="w530">
      <el-radio-group v-model="tourist.gender">
        <el-radio v-for="(val, key) in genderMap" :key="key" :label="key">{{ val }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="游客类型" class="w530">
      <el-select class="w100p" placeholder="请选择" v-model="tourist.tourist_type">
        <el-option v-for="(val, key) in touristTypeMap" :key="key" :label="val" :value="key"/>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 签证游客信息表单
 * 
 * 支持attr参数：
 * tourist | object | 游客信息对象
 * idTypeMap | object | 证件类型映射对象
 * genderMap | object | 性别映射对象
 * touristTypeMap | object | 游客类型映射对象
 * isAdult | boolean | 是否是成人, 默认： true
 * index | number | 索引编号，默认：1
 * 
 * demo:
 *   <my-order-tab name="line" />
 */
import WorldSelect from 'src/plugins/WorldSelect.vue';

export default {
  name: 'VisaTouristForm',
  components:{
    WorldSelect
  },
  props: {
    tourist: {
      required: true,
      type: Object
    },
    idTypeMap: {
      required: true,
      type: Object
    },
    genderMap: {
      required: true,
      type: Object
    },
    touristTypeMap: {
      required: true,
      type: Object
    },
    isAdult: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      idEndDate: ''
    }
  },
  methods: {
  },
  getInitTourist() {

    return {
      name: '',
      first_name: '',
      last_name: '',
      mobile: '',
      gender: '1',
      id_type: '1',
      id_no: '',
      id_end_date: '',
      nation: '',
      tourist_type: '1'
    };
  }
};
</script>
<style scoped lang="less">
.w100p{
  width: 100%;
}

.w100{
  width: 100px;
}

.w175{
  width: 175px;
}

.w250{
  width: 250px;
}

.w530{
  width: 530px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}

.el-form-item {
  margin-bottom: 10px;
}

.tourist-form{
  position: relative;
  .index{
    position: absolute;
    top: 0;
    left: 5px;
    line-height: 30px;
    text-align: center;
    .index-no{
      width: 30px;
      height: 30px;
      font-size: 24px;
      border-radius: 30px;
      background: #ccc;
      color: #fff;
    }
  }
}

</style>