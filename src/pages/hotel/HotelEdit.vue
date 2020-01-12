<style lang="stylus" scoped>
.long
  width 400px
  
.add-hotel
  .hotel-form
    padding  20px
    background #fff
    .country-select
      // .item-select
      //   width 20%
      //   margin-right 5px
    .lng-lat
      width 350px
      &::after
        content ''
        display block
        clear both
      .el-col
        box-sizing border-box
        padding-right 8px
      .el-input
        width auto
      
      
    
</style>    
<template lang="pug">
  .add-hotel
    .system-tab
      ul.tab-box
        router-link(class="on", tag="li", to="") 基础信息
        router-link(tag="li", v-if="hotelId", :to="{path:'/hotel/HotelFacilities',query:{hotel_id:hotelId}}") 酒店设施
        router-link(tag="li", v-else, to="") 酒店设施
        router-link(tag="li", v-if="hotelId", :to="{path:'/hotel/HotelDetail', query:{hotel_id:hotelId}}") 酒店详情
        router-link(tag="li", v-else, to="") 酒店详情
        router-link(tag="li", v-if="hotelId", :to="{path:'/hotel/HotelGraphic', query:{hotel_id:hotelId}}") 图文详情
        router-link(tag="li", v-else, to="") 图文详情
        router-link(tag="li", v-if="hotelId", :to="{path:'/hotel/Hotelpic', query:{hotel_id:hotelId}}") 酒店图片
        router-link(tag="li", v-else, to="") 酒店图片
    .hotel-form
      el-form(ref="hotelEdit", :model="formData", :rules="rules", label-width="100px")
        el-form-item(label="酒店名称", prop="name")
          el-input(:class="'long'", v-model="formData.name", placeholder="请输入酒店名称")
        el-form-item(label="酒店英文名称")
          el-input(:class="'long'", v-model="formData.en_name", placeholder="请输入酒店英文名称")
        el-form-item(label="酒店地址", prop="address")
          el-input(:class="'long'", v-model="formData.address", placeholder="请输入酒店地址")
        el-form-item(class="country-select", label="所在城市", required)
          el-col(:span="3")
            el-form-item(prop="country_id")
              el-select(class="item-select", v-model="formData.country_id", placeholder="国家", value-key="country_id",  @change="_getProvinces($event)")
                el-option(v-for="item in country_list", :key="item.country_id", :label="item.country_name", :value="item")
          el-col(:span="3")
            el-form-item(prop="province_id")
              el-select(class="item-select", v-model="formData.province_id", placeholder="省", value-key="province_id", @change="_getCity")
                el-option(v-for="item in province_list", :key="item.province_id", :label="item.province_name", :value="item")
          el-col(:span="3")
            el-form-item(prop="city_id")
              el-select(class="item-select", v-model="formData.city_id", placeholder="市", value-key="city_id", @change="_getAreas")
                el-option(v-for="item in city_list", :key="item.city_id", :label="item.city_name", :value="item")
          el-col(:span="3")
            el-form-item
              el-select(class="item-select", v-model="formData.area_id", value-key="area_id", placeholder="区")
                el-option(v-for="item in area_list", :key="item.area_id", :label="item.area_name", :value="item")  
          //- zone-autocomplete(v-model="postArea", @change="handleArea" :class="'long'")
        el-form-item(label="所属品牌")
          brand-autocomplete(v-model="formData.brand", :defaultList="{id:formData.brand_code,brand_name:formData.brand_name}", placeholder="请输入选择酒店品牌名称")
        el-form-item(label="酒店标签")
          el-tag(:class="'tag-item'", v-for="(tag, key) in formData.tags", :key="key", :closable="true", v-if="key < 3", type="gray", @close="handleTagClos(key)") {{tag.name}}
          a(href="javascript:;", @click="_changeSelectTagsVisible") 选择标签
        el-form-item(label="所处经纬度", required)
          div(class="lng-lat")
            el-col(:span="8")
              el-form-item(prop="longitude")
                el-input(v-model="formData.longitude", readonly, placeholder="经度")
            el-col(:span="1") -
            el-col(:span="8")
              el-form-item(prop="latitude")
                el-input(v-model="formData.latitude", readonly, placeholder="纬度")
            el-col(:span="6")
              a(href="javascript:;", @click="changeItudeSelectVisible") 选择经纬度
        el-form-item(label="所在商圈", prop="business_name")
          el-select(v-model="formData.business_name", filterable)
            el-option(
              v-for="item in business_area_options",
              :key="item.business_id",
              :label="item.business_name",
              :value="item.business_name"
            )
        el-form-item(label="前台电话", prop="telephone")
          el-input(:class="'long'", v-model="formData.telephone", placeholder="请输入酒店前台电话")
        el-form-item(label="开业时间", prop="opening_date")
          el-date-picker(v-model="formData.opening_date", align="right", type="month", placeholder="请输入选择开业时间")
        el-form-item(label="装修时间")
          el-date-picker(v-model="formData.decorate_date", align="right", type="month", placeholder="请选择装修时间")
        el-form-item(label="酒店星级", prop="star_id")
          el-select(v-model="formData.star_id", placeholder="请选择酒店星级")
            el-option(v-for="(item, index) in starList", :key="index", :label="item.label", :value="item.value")
        el-form-item
          el-button(@click="backList") 取消
          el-button(v-if="hotelId", type="primary", @click="_addSubmitForm") 保存
          el-button(v-else, type="primary", @click="_addSubmitForm") 下一步

    el-dialog(title="经纬度", :visible.sync="itudeVisible")
      bd-map(:point.sync="point")
      span(slot="footer", class="dialog-footer")
        el-button(@click="itudeVisible = false") 取 消
        el-button(type="primary", @click="handleItudeSelectSubmit") 确 定
    el-dialog(title="选择标签", :visible.sync="tagsVisible")
      el-checkbox-group(:class="'select-checkbox-group'", v-model="checkedTagsId", :max="3",@change="handleCheckedTagsChange")
        el-checkbox(:class="'select-checkbox'", v-for="tag in tags", :label="tag.id", :key="tag.name") {{tag.name}}
      span(slot="footer", class="dialog-footer")
        el-button(@click="tagsVisible = false") 取 消
        el-button(type="primary", @click="handleSelectTagsSubmit") 确 定
</template>
<script>
import BdMap from './components/BaiduMap.vue';
import ZoneAutocomplete from './components/FourLevelZoneAutocomplete.vue';
import BrandAutocomplete from './components/HotelBrandAutocomplete.vue';
import {
  promise_getTags,
  promise_getDetailList,
  promise_hotelInfo,
  promise_editHotelInfo,
  promise_getProvinces,
  promise_getCountry,
  promise_getCity,
  promise_getAreas,
  hotel_searchBusinessCircle
} from 'src/api/promise_api'
import * as format from 'src/utils/format';

export default {
  data() {
    return {
      hotelId: '',
      formData:{
        name: '',
        en_name: '',
        country_id: null,
        province_id: null,
        area_id: null,
        city_id: null,
        address: '',
        brand: null,
        longitude: '',
        latitude: '',
        star_id: null,
        telephone: '',
        tags: [],
        opening_date: null,
        decorate_date: null,
        business_name: "不属于任何商圈"
      },
      itudeVisible: false,
      tagsVisible: false,
      tags: null,
      checkedTags: [],
      checkedTagsId: [],
      point: {
        lng: 116.400244,
				lat: 39.92556
        // lng: null,
        // lat: null
      },
      rules:{
        name: [
          { required: true, message: '请输入酒店名称', trigger: 'blur' }
        ],
        country_id: [
          { required: true, message: '请输选择所在国家', trigger: 'change' }
        ],
        province_id: [
          { required: true, message: '请输选择所在省', trigger: 'change' }
        ],
        city_id: [
          { required: true, message: '请输选择所在城市', trigger: 'change' }
        ],
        // area_id: [
        //   { required: true, message: '请输选择所在区域', trigger: 'change' }
        // ],
        address: [
          { required: true, message: '请输入酒店详细地址', trigger: 'blur' }
        ],
        brand_code: [
          { required: true, message: '请输入选择酒店品牌名称', trigger: 'change' }
        ],
        longitude: [
          { required: true, message: '请选择酒店经纬度', trigger: 'change' }
        ],
        latitude: [
          { required: true, message: '请选择酒店经纬度', trigger: 'change' }
        ],
        business_name:[
          { required: true, message: '请选择商圈', trigger: 'change' }
        ],
        telephone: [
          { required: true, message: '请输入酒店前台电话', trigger: 'blur'},
          // { pattern: /^[0-9]{3,4}[-][0-9]{8}$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        opening_date: [
          { required: true, message: '请输入酒店开业时间', trigger: 'blur'}
        ],
        star_id: [
          { required: true, message: '请选择酒店星级', trigger: 'change' }
        ]
      },
      postArea:{},
      selPostArea: {
        '0': {},
        '1': {},
        '2': {},
        '3': {}
      },
      starList: [
        {
          value: "0,0",
          label: "无星/经济型",
        },
        {
          value: "1,0",
          label: "一星/经济型",
        },
         {
          value: "2,0",
          label: "二星/经济型",
        },
        {
          value: "3,0",
          label:"三星/舒适型",
        },
        {
          value: "4,0",
          label:"四星/高档型",
        },
        {
          value: "5,0",
          label:"五星/豪华型",
        },
        {
          value: "1,1",
          label: "一钻/经济型",
        },
         {
          value: "2,1",
          label: "二钻/经济型",
        },
        {
          value: "3,1",
          label:"三钻/舒适型",
        },
        {
          value: "4,1",
          label:"四钻/高档型",
        },
        {
          value: "5,1",
          label:"五钻/豪华型",
        },
      ],
      country_list:[],
      province_list: [],
      city_list: [],
      area_list: [],
      business_area_options: [],
    }
  },
  components:{
    BdMap,
    ZoneAutocomplete,
    BrandAutocomplete
  },
  mounted() {
    this.hotelId = this.$route.query.hotel_id;
    this.hotelId ? this._queryHotelDetailBase(this.hotelId) : ''
    this._initCountry()
    
  },
  methods: {
    async _initCountry() {
      this.province_list = []
      this.city_list = []
      this.area_list = []
      if(this.formData.province_id) {
        this.formData.province_id['province_id'] = ''
        this.formData.province_id['province_name'] = ''
        this.formData.province_id = null
      }
      if(this.formData.city_id) {
        this.formData.city_id['city_id'] = ''
        this.formData.city_id['city_name'] = ''
        this.formData.city_id = null
      }
      if(this.formData.area_id) {
        this.formData.area_id['area_id'] = ''
        this.formData.area_id['area_name'] = ''
        this.formData.area_id = null
      }

      try {
        const { data } = await promise_getCountry({}, true)

        if(data.code !== 0 ) return this.$message.error(data.msg);
        this.country_list = [...data.data.Chin];
      }
      catch(err) {
        console.log(err)
      }
    },
    async _getProvinces(event) {
      this.province_list = []
      this.city_list = []
      this.area_list = []
      if(this.formData.province_id) {
        this.formData.province_id['province_id'] = ''
        this.formData.province_id['province_name'] = ''
        this.formData.province_id = null
      }
      if(this.formData.city_id) {
        this.formData.city_id['city_id'] = ''
        this.formData.city_id['city_name'] = ''
        this.formData.city_id = null
      }
      if(this.formData.area_id) {
        this.formData.area_id['area_id'] = ''
        this.formData.area_id['area_name'] = ''
        this.formData.area_id = null
      }
      try {
        const params = {
          data: {
            country_id: event.country_id
          }
        }
        const { data } = await promise_getProvinces(params)

        if(data.code !== 0 ) return this.$message.error(data.msg);
        this.province_list = data.data
      }
      catch(err) {
        console.log(err)
      }
    },
    async _getCity(event) {
      this.formData.business_name = "不属于任何商圈"
          this.business_area_options = []
      this.city_list = []
      this.area_list = []
      if(this.formData.city_id) {
        this.formData.city_id['city_id'] = ''
        this.formData.city_id['city_name'] = ''
        this.formData.city_id = null
      }
      if(this.formData.area_id) {
        this.formData.area_id['area_id'] = ''
        this.formData.area_id['area_name'] = ''
        this.formData.area_id = null
      }
      
      try {
        const params = {
          data: {
            province_id: event.province_id
          }
        }
        const { data } = await promise_getCity(params)

        if(data.code !== 0 ) return this.$message.error(data.msg);
        this.city_list = data.data;
      }
      catch(err) {
        console.log(err)
      }
    },
    async _getAreas(event) {
      
      if(this.formData.area_id) {
        this.formData.area_id['area_id'] = ''
        this.formData.area_id['area_name'] = ''
        this.formData.area_id = null
        this.area_list = []
      }
      try {
        const params = {
          data: {
            city_id: event.city_id
          }
        }
        const { data } = await promise_getAreas(params)
        const searchData = await this._searchBusinessCircle(event.city_id)

        if(data.code !== 0 ) return //this.$message.error(data.msg);
        this.area_list = data.data;
      }
      catch(err) {
        console.log(err)
      }
    },
    async _searchBusinessCircle(cityId, circleName) {
      
      const params = {
        data: {
          city_id: cityId,
          circleName: circleName
        }
      }
      try {
        const { data: {code, data, msg} } = await hotel_searchBusinessCircle(params)

        if(code !== 0) {
          this.formData.business_name = "不属于任何商圈"
          this.business_area_options = []
          this.business_area_options.unshift({
            business_id: "不属于任何商圈",
            business_name: "不属于任何商圈"
          })
          return
        } //this.$message.error(data.msg)
        this.business_area_options = data
        data.unshift({
          business_id: "不属于任何商圈",
          business_name: "不属于任何商圈"
        })

      }
      catch(err) {
        console.log(err)
      }
    },
    async _queryHotelDetailBase(hotel_id) {
      try {
        const params = {
          data: {
            product_id: hotel_id
          }
        }
        const { data } = await promise_getDetailList(params, true)

        if( data.code !== 0) return this.$message(data.msg)
        const detail = data.data;
        this.formData.name = detail.products.name
        this.formData.en_name = detail.products.en_name
        this.formData.telephone = detail.products.telephone
        this.formData.brand = detail.brand_name
        this.formData.opening_date = detail.hotels.opening_date
        this.formData.decorate_date = detail.hotels.decorate_date
        this.formData.latitude = detail.addres.latitude
        this.formData.longitude = detail.addres.longitude
        this.formData.address = detail.addres.address
        this.formData.tags = detail.tags
        this.formData.star_id = '5,1'//detail.star
        this.formData.country_id = {country_id: detail.addres.country_id, country_name: detail.addres.country_name}
        this._getProvinces(this.formData.country_id)
        this.formData.province_id = {province_id: detail.addres.province_id, province_name: detail.addres.province_name}//detail.addres.province_id
        this._getCity(this.formData.province_id)
        this.formData.city_id = {city_id: detail.addres.city_id, city_name: detail.addres.city_name}//detail.addres.province_id
        this._getAreas(this.formData.city_id)
        this.formData.area_id = {area_id: detail.addres.area_id, area_name: detail.addres.area_name}//detail.addres.province_id
        // this.postArea = {
        //   area_0: detail.addres.country_id,
        //   area_1: "CN22",//detail.addres.province_name,
        //   area_2: "CN2204",//detail.city_id,
        //   area_3: "CN220401",//detail.district_id
        // }
      } catch(err) {
        console.log(err)
      }
    },
    handleCheckedTagsChange(value){
      this.checkedTags = this.tags.filter((i) => { return value.indexOf(i.id) > -1 });
    },
    handleSelectTagsSubmit(){
      this.formData.tags = this.checkedTags;
      this.tagsVisible = false;
    },
     handleArea (level, area, value) {
      if(level == 0 && area.country_id){
        this.$set(this.formData,'country_id',area.country_id)
        this.selPostArea[level] = {id: area.country_id || '', area_name: area.country_name || ''}
      }
      if(level == 1 && area.province_id){
        this.$set(this.formData,'province_id',area.province_id)
        this.$set(this.formData,'province_name',area.province_name)
        this.selPostArea[level] = {id: area.province_id || '', area_name: area.province_name || ''}
      }
      if(level == 2 && area.city_id){
        this.$set(this.formData,'city_id',area.city_id)
        this.$set(this.formData,'city_name',area.city_name)
        this.selPostArea[level] = {id: area.city_id || '', area_name: area.city_name || ''}
      }
      if(level == 3 && area.area_id){
        this.$set(this.formData,'area_id',area.area_id)
        this.$set(this.formData,'area_name',area.area_name)
        this.selPostArea[level] = {id: area.area_id || '', area_name: area.area_name || ''}
      }
      if(level != 2 && level != 3){
          this.$set(this.formData,'area_id','')
      }
    },
    async _addSubmitForm() {
      this.$refs.hotelEdit.validate(async valid => {
        if(valid) {
          const params = {
            data: JSON.parse(JSON.stringify(this.formData))
          }
          let tags = []
          params['data'].brand = this.formData.brand && this.formData.brand.id
          params['data'].country_id = this.formData.country_id.country_id
          params['data'].country_name = this.formData.country_id.country_name
          params['data'].province_id = this.formData.province_id.province_id
          params['data'].province_name = this.formData.province_id.province_name
          params['data'].city_id = this.formData.city_id.city_id
          params['data'].city_name = this.formData.city_id.city_name
          params['data'].area_id = this.formData.area_id ? this.formData.area_id.area_id : ""
          params['data'].area_name = this.formData.area_id ? this.formData.area_id.area_name : ""
          params['data'].business_name = this.formData.business_name === "不属于任何商圈" ? "" : this.formData.business_name
          params['data'].opening_date = params['data'].opening_date && format.date(params['data'].opening_date)
          params['data'].decorate_date = params['data'].decorate_date && format.date(params['data'].decorate_date)
          params['data'].tags && params['data'].tags.forEach(item => {
            tags.push(Number(item.id))
          })
          params['data'].tag_id = tags
          delete params['data'].tags;
          try {
            if(this.hotelId) {
              params['data'].product_id = this.hotelId
               const { data } = await promise_editHotelInfo(params)

              if( data.code !== 0) return this.$message.error(data.msg)
              this.$message({
                message: "保存成功",
                type: 'success'
              })
            } else {
              const { data } = await promise_hotelInfo(params)
  
              if( data.code !== 0) return this.$message.error(data.msg)
              this.$message({
                message: "保存成功",
                type: 'success'
              })
              this.$router.push(`/hotel/HotelFacilities?hotel_id=${data.data.product_id}&isAdd=1`)
            }
            
          }
          catch(err) {
            console.log(err)
          }
       } else {
          console.log('err')
          return false
        }
      })
    },
    async _editSubmitForm() {

      this.$refs.hotelEdit.validate(async valid => {
        if(valid) {
          const params = {
            data: JSON.parse(JSON.stringify(this.formData))
          }
          let tags = []
          params['data'].brand = this.formData.brand && this.formData.brand.id 
          params['data'].product_id = this.formData.brand && this.hotelId
          params['data'].opening_date = params['data'].opening_date && format.date(params['data'].opening_date)
          params['data'].decorate_date = params['data'].decorate_date && format.date(params['data'].decorate_date)
          params['data'].tags.forEach(item => {
            tags.push(Number(item.id))
          })
          params['data'].tag_id = tags
          delete params['data'].tags;
         
          try {
            const { data } = await promise_editHotelInfo(params)

            if( data.code !== 0) return this.$message.error(data.msg)
            this.$message({
              message: "保存成功",
              type: 'success'
            })

          }
          catch(err) {
            console.log(err)
          }
        } else {
          console.log(err)
          return false
        }
      })
      
    },
    backList() {
      this.$router.push('/hotel/hotelList')
    },
    handleTagClos(key) {
      this.formData.tags.splice(key, 1);
    },
    changeItudeSelectVisible() {
      // this.point.lng = this.formData.longitude || "";
      // this.point.lat = this.formData.latitude || "";
      this.itudeVisible = true;
    },
    handleItudeSelectSubmit(){
      this.formData.longitude = '' + this.point.lng;
      this.formData.latitude = '' + this.point.lat;
      this.itudeVisible = false;
    },
    async _changeSelectTagsVisible() {
      try {
        const { data } = await promise_getTags();

         if(data.code == 0){
            this.tags = data.data;
            this.checkedTags = [... this.formData.tags];
            this.checkedTagsId = this.checkedTags.map((i)=>{ return i.id });
            this.tagsVisible = true;            
          }else{
            this.$message.error(msg);
          }
      } catch(err) {
        console.log(err)
      }
    },
  }
}
</script>

