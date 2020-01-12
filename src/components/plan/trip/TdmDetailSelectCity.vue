<template>
  <div>
    <el-checkbox :value="checkedCityIdMap[areaObject.id]" @input="handleInput(areaObject, $event)">全选</el-checkbox>
    <div :class="{'sel-citybtn': 1, 'show': isExpend}" @click="handleToggle">选择城市</div>
    <div class="city-box" v-show="isExpend">
      <span class="city-box-close" @click="handleToggle"></span>
      <div class="city-box-line" v-for="area in areaObject.child" :key="area.id">
        <el-checkbox 
          class="city-box-tit" 
          :value="checkedCityIdMap[area.id]"
          @input="handleInput(area, $event)"
        >{{ area.name }}</el-checkbox>
        <div class="city-box-item" v-for="province in area.child" :key="province.id">
          {{ province.name }} <span v-show="province.selectedNum">(已选<span class="color-purple">{{province.selectedNum}}</span>项)</span>
          <div class="box-item-con">
            <div>
              <el-checkbox 
                class="box-item-nomg"
                :value="checkedCityIdMap[province.id]"
                @input="handleInput(province, $event)"
              >全选</el-checkbox>
            </div>
            <el-checkbox
              v-for="city in province.child"
              :key="city.id"
              class="box-item-nomg"
              :value="checkedCityIdMap[city.id]"
              @input="handleInput(city, $event)">{{ city.name }}</el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// <tdm-detail-select-city />
// import TdmDetailSelectCity from './TdmDetailSelectCity';
/**
 * 城市列表勾选
 * 
 * 支持attr参数：
 * value | array | 选中城市列表数组
 * cityList  | array | 城市列表数据，调用ykReserveCitys接口返回的data部分数据
 * 
 * 支持事件：
 * input  | (item)  | 输入事件，传入选中项，以支持v-model
 * 
 * demo:
 *  <tdm-detail-select-city v-model="selectCity" />
 * 
 */
import {
  ykReserveCitys,
} from 'src/api/api'

export default {
  props: {
    value: {
      type: Array,
      default: ()=>[]
    },
    cityList: {
      type: Array,
      default: null
    },
    defaultCheckAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      areaObject: {id: -1, name: '全选', child: []},
      cityIdMap: {},
      checkedCityIdMap: {},
      isExpend: false,
      isLoadingData: false,
      selected: []
    }
  },
  watch: {
    value(val, old){
      if(val != this.selected && !this.isLoadingData){
        this.updateSelected(val);
      }
    },
    cityList(cityList, old){
      if(cityList != old){
        this.selected = []; // 重置当前选中列表
        this.generateAreaObject(cityList);
      }
    }
  },
  methods: {
    getInitCity(){
      this.isLoadingData = true;
      ykReserveCitys({
        params: { },
        success: ({data: resp}) => {
          const {code, data, msg} = resp;

          this.isLoadingData = false;
          if(code == 0){
            this.generateAreaObject(data);
          }else{
            this.$message({
              type: 'error',
              message: '获取城市信息失败'
            });
          }
        }
      });
    },
    generateAreaObject(cityList){
      let areaArray = [], checkedCityIdMap = {}, cityIdMap = {};
      checkedCityIdMap[this.areaObject.id] = false;
      cityList.forEach((item, idx) => {
        let area = {name: item.diqu, id: idx, child: [], parent: this.areaObject};
        let provinceMap = {};
        
        checkedCityIdMap[idx] = false;
        areaArray.push(area);
        if(Array.isArray(item.citylist)){
          item.citylist.forEach((city)=>{
            let province = provinceMap[city.parentId], cityItem;
            
            if(city.parentId == 100000){ // 直辖市，使用自己的id和name
              city.parentId = city.cityId;
              city.parentName = city.cityName;
            }
            if(!province){  // 创建省、直辖市节点
              province = {
                id: city.parentId, 
                name: city.parentName, 
                child: [], 
                selectedNum: 0,
                parent: area
              };
              provinceMap[city.parentId] = province;
              checkedCityIdMap[city.parentId] = false;
              area.child.push(province);
            }
            cityItem = {
              id: city.cityId,
              name: city.cityName,
              parent: province
            };
            checkedCityIdMap[city.cityId] = false;
            province.child.push(cityItem);
            cityIdMap[cityItem.id] = cityItem;
          });
        }
      });
      this.cityIdMap = cityIdMap;
      this.checkedCityIdMap = checkedCityIdMap;
      this.areaObject.child = areaArray;
      if(this.defaultCheckAll){
        areaArray.forEach(area => {
          this.handleInput(area, true);
        })
      }else{
        // 勾选选中项
        this.updateSelected(this.value);
      }
    },
    updateSelected(value){
      if(this.selected == value){
        //  console.log('this.selected and value is same array', value);
        return false;
      }

      let unselected = this.selected;
      
      //  console.log('update selected', unselected, value);
      this.selected = value;
      if(Array.isArray(value)){
        value.forEach(item => {
          let checkedIdx = unselected.indexOf(item);

          if(checkedIdx != -1){
            unselected.splice(checkedIdx, 1);
          }else{
            this.handleInput(this.cityIdMap[item], true, false, true)
          }
        });
      }
      //  console.log('unselected: ', unselected);
      unselected.forEach(item => {
        if(item && this.cityIdMap[item]){
          this.handleInput(this.cityIdMap[item], false, false, true)
        }
      })
    },
    updateParentChecked(city){
      let parent = city.parent;

      if(parent && Array.isArray(parent.child)){
        let selectedNum = 0;
        parent.child.forEach(item => {
          if(this.checkedCityIdMap[item.id]){
            selectedNum ++;
          }
        });
        parent.selectedNum = selectedNum;
        this.checkedCityIdMap[parent.id] = parent.child.length == selectedNum;
        //  console.log('checked parent item', city.id, city.name, parent, this.checkedCityIdMap[parent.id]);
        this.updateParentChecked(parent);
      }
    },
    handleToggle(){
      this.isExpend = !this.isExpend;
    },
    handleInput(city, checked, isNotBubbling, isNotEmit){

      //  console.log('checked', city, checked, isNotBubbling, isNotEmit)
      if(!city){
         console.log('city is null', city, checked);
        return false;
      }
      this.checkedCityIdMap[city.id] = checked;
      if(Array.isArray(city.child)){
        city.child.forEach(item => {
          this.handleInput(item, checked, true, true);
        })
        city.selectedNum = checked ? city.child.length : 0;
      }

      if(!isNotBubbling){
        this.updateParentChecked(city);
      }

      if(!city.child){
        let idx = this.selected.indexOf(city.id);
        if(checked && idx == -1){
          this.selected.push(city.id);
          //  console.log('push:', this.selected.push(city.id), city.id);
        }else if(!checked && idx != -1){
          this.selected.splice(idx, 1);
          //  console.log('push:', idx, this.selected.splice(idx, 1));
        }
        //  console.log('checked item', city.id, city.name, idx);
      }

      if(!isNotEmit){
        //  console.log('selected: ', this.selected);
        this.$emit('input', this.selected);
      }
    }
  },
  mounted() {
    if(this.cityList){
      this.generateAreaObject(this.cityList);
    }else{
      this.getInitCity();
    }
  }
}
</script>
<style lang="less" scoped>
.sel-citybtn {
  position: relative;
  display: inline-block;
  color: #ae1f77;
  margin-left: 50px;
  cursor: pointer;
  &:after {
    position: absolute;
    top: 15px;
    left: 60px;
    content: "";
    width: 0px;
    height: 0px;
    border-top: 5px solid #aaa;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid transparent;
    // transition: transform .3s;
  }
  &.show:after{
    top: 10px;
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
.city-box {
  position: relative;
  border: 1px solid #cccccc;
  background-color: #f4f4f4;
  padding: 10px;
  .city-box-close {
    position: absolute;
    top: 3px;
    right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 1000;
    &:after {
      position: absolute;
      content: '';
      top: 6px;
      right: 10px;
      width: 1px;
      height: 15px;
      background-color: #aaa;
      transform: rotate(45deg);
    }
    &:before {
      position: absolute;
      content: '';
      top: 6px;
      right: 10px;
      width: 1px;
      height: 15px;
      background-color: #aaa;
      transform: rotate(-45deg);
    }
  }
  .city-box-line {
    position: relative;
    padding-left: 100px;
    min-height: 18px;
    font-size: 0;
    .city-box-tit {
      position: absolute;
      top: 9px;
      left: 0px;
      font-size: 12px;
      line-height: 18px;
    }
    .city-box-item {
      position: relative;
      display: inline-block;
      margin: 9px 20px 0 0;
      padding: 0 30px 0 0;
      font-size: 12px;
      line-height: 18px;
      &:after {
        position: absolute;
        top: 6px;
        right: 10px;
        content: "";
        width: 0px;
        height: 0px;
        border-top: 5px solid #aaa;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
      &:hover .box-item-con {
        display: block;
      }
      .box-item-con {
        display: none;
        position: absolute;
        top: 18px;
        left: 0px;
        padding: 5px;
        background-color: #fff;
        width: 200px;
        border: 1px solid #aaa;
        z-index: 10;
        .box-item-nomg {
          margin-left: 0;
          padding: 0 15px 10px 5px;
        }
      }
    }
  }
}
    
</style>
