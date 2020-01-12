<template>
  <div class="currency-picker el-input" ref="currency_picker">
    <input type="text"
           ref="input"
           class="el-input__inner"
           :value="currencyName"
           :placeholder="placeholder"
           :readonly="readonly"
           @click="init">
    <div class="currency-list"
         ref="popper"
         v-show="showPopper"
         :style="'left:'+left+'px;top:'+top+'px'" 
         >
      <ul class="tabs"
          ref="tabs">
        <template v-for="(value, name) in currencyList">
          <li :class="(name==currentCurrencyData['currencyClassify']) && 'on'"
              @click="changeCurrencyList(name)">{{ name }}</li>
        </template>
      </ul>
      <ul class="currency-content">
        <li  :class="(value.value==currencyName) && 'on'"  v-for="value in currentCurrencyData['currencyDataList']"
            @click="chooseCurrency(value['value'])">
          {{value.value}}
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
import { on, off } from "src/utils/dom"
import { currency_data} from "./src/currency";
export default {
  name:"CurrencyPicker",
  data() {
    return {
      currentValue:this.value,
      currencyList:currency_data,
      showPopper:false,
      currentCurrencyData: {
        currencyClassify: '',
        currencyDataList: [],
      },
      left:'',
      top:''
    }
  },
  props: {
    value: [String],
    placeholder: String,
    readonly: String,
    type:String,
    item:String
  },
  computed:{
    currencyName(){
      if(!this.value){
        return "";
      }
      for (let key in this.currencyList) {
        for(let i=0,ii=this.currencyList[key].length; i<ii; i++){
          if (this.currencyList[key][i]["value"] == this.value) {
              return this.currencyList[key][i]["value"]
          }
        }
      }
    }
  },
  watch:{
    value(val, oldVal){
      this.setPickerData(val);
    }
  },
  methods: {
    changeCurrencyList(name){
      this.currentCurrencyData['currencyClassify'] = name;
      this.currentCurrencyData['currencyDataList'] = this.currencyList[name];
    },
    chooseCurrency(value) {
      this.showPopper = false;
      this.$emit('input', value);
    },
    init(){
      let target=this.$refs.input;

      // console.log(this.left,this.top)
      if(this.item=='table'){
        this.left=this.getElementViewLeft(target);
        this.top=this.getElementTop(target)+31;
        document.body.appendChild(this.$refs.popper)
      }else{
        this.top=33;
        this.left=0;
      }
      
      this.showPopper=true;
      let classifys = Object.keys(this.currencyList);
      const input = this.$refs.input;
      if(!this.currentCurrencyData['currencyClassify'] || !this.currentCurrencyData['currencyDataList']){
        this.currentCurrencyData['currencyClassify'] = classifys[0];
        this.currentCurrencyData['currencyDataList'] = this.currencyList[classifys[0]];
      }

      on(document, 'click', this.handleDocumentClick);
    },
    setPickerData(value){
      if(value == this.currentValue)return;
      this.currentValue = value;
      for (let key in this.currencyList) {
        for(let i=0,ii=this.currencyList[key].length; i<ii; i++){
          if (this.currencyList[key][i]["value"] == value) {
              return this.currentCurrencyData = {
                currencyClassify: key,
                currencyDataList: this.currencyList[key],
              }
          }
        }
      }
    },
    getElementLeft(element){
　　　　let actualLeft = element.offsetLeft;
　　　　let current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
　　},
　　getElementTop(element){
　　　　let actualTop = element.offsetTop;
　　　　let current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
　　},
    getElementViewLeft(element){
　　　　let actualLeft = element.offsetLeft;
　　　　let current = element.offsetParent;
        let elementScrollLeft=0;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent; 

            if(current&&current!=(document.body)){
             elementScrollLeft+=current.scrollLeft;

             console.log(current.scrollLeft)
            }
　　　　}
　　　　return actualLeft-elementScrollLeft;
　　},
　　getElementViewTop(element){
　　　　let actualTop = element.offsetTop;
　　　　let current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current. offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　 if (document.compatMode == "BackCompat"){
　　　　　　let elementScrollTop=document.body.scrollTop;
　　　　} else {
　　　　　　let elementScrollTop=document.documentElement.scrollTop; 
　　　　}
　　　　return actualTop-elementScrollTop;
　　},
    handleDocumentClick(e) {
      const popper = this.$refs.popper;

      if (this.$el.contains(e.target) || popper.contains(e.target)) return;

      this.showPopper = false;
    }
  },
  mounted() {
    
  },
  destroyed() {
   off(document, 'click', this.handleDocumentClick);
  }
}
</script>

<style lang="scss">
.current-picker{
  position: relative;
  display: inline-block;
  z-index:99999;
}
.currency-list {
  position: absolute;
  top: 36px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  width: 360px;
  z-index: 9999;

  .tabs {
    margin: 0;
    padding: 0;
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;

    li {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      background-color: #f4f4f4;
      color: #666;
      margin: 0 1px;
      line-height: 24px;
      padding: 0 8px;
      cursor: pointer;

      &.on {
        background-color: #b10c79;
        color: #fff;
      }
    }
  }
  .currency-content {
    padding: 10px 0 0 0;
    margin: 0;
    list-style: none;

    &::after {
      content: '';
      display: table;
      clear: both;
    }

    li {
      cursor: pointer;
      color: #333;
      float: left;
      padding: 4px 8px;
      text-align: center;
      width: 164px;
      line-height: 24px;
      text-align:left;

      &.on {
        background-color: #b10c79;
        color: #fff;
      }
    }
  }
}
</style>
