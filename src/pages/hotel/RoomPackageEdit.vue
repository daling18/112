<style lang="stylus" scoped>
.room-package-edit
  padding 20px
  background #fff
  .require-position
    position relative
    .require-booking
      position absolute
      left -133px
    .require-fixdloss
      position absolute
      left -77px
    .require-bed-type
      position absolute
      left -48px
    .require-date
      position absolute
      left -120px
    .require-bed-type::before,.require-fixdloss::before,.require-booking::before,.require-date::before
      content '*'
      color #F56C6C
      margin-right 4px 
    .item-select
      width 150px
    .tiem-middle
      margin 0 10px      
  .hotel-name
    font-size 18px
  .select-roomtype
    padding 20px 0
    .radio-roomtype
      min-height 150px
    .next
      text-align center
  .small-input
    width 55px
    &.middle
      margin 0 6px
  .input-right
    padding-left 6px
  .textarea-input
    display block
    margin 10px 0
    width 400px
  .form-box
    padding 20px 0
    .long
      width 400px
    .room-type-row
      display inline-block
      .item-row
        margin-right 10px
        .bedtype-name
          width 120px
          // margin-left 10px
        .bedtype-input
          width 120px
          margin-left 10px
        // span 
        //   margin 0 10px
    i 
      font-size 20px
    .item-foods
      margin-bottom 10px 
</style>
<template lang="pug">
  .room-package-edit
    .hotel-name
      span {{hotelName}}
    //- .select-roomtype(v-if="!showForm")
    //-   el-radio-group(class="radio-roomtype", v-model="roomType", @change="checkRoomtype")
    //-     el-radio(v-for="item in roomTypeList", :key="item.id", :label="item.id") {{item.name}}
    //-   .next
    //-     el-button(type="primary", :disabled="nextDisabled", @click="nextToPackage") 下一步
    .form-box
      el-form(ref="packageform", :model="formData", :rules="rules", label-width="130px")
        //- el-form-item(label="套餐名称", prop="package_name")
        //-   el-input(class="long", v-model="formData.package_name", placeholder="如：标准价")
        el-form-item(label="最大入住人数", prop="limit_adults")
          el-input-number(v-model="formData.limit_adults", :min="1")
        el-form-item(label="床型", class="require-position", prop="bed_info")
          span(class="require-bed-type")
          .room-type-row
            .item-row(v-for="(item,index) in formData.bed_info", :key="index")
              el-input(class="small-input", v-model="item.number")
              span 张
              el-select(class="bedtype-name", v-model="item.one_level", placeholder="请选择", @change="twoBedTypeChange($event, index)")
                el-option(v-for="item in bedtypeList", :key="item.id", :label="item.name", :value="item.id")
              el-select(class="bedtype-name", v-model="item.bed_type_id", placeholder="请选择", @change="sizeBedTypeChange($event, index)")
                el-option(v-for="item in item.bedtypeListTwo", :key="item.id", :label="item.name", :value="item.id")
              el-select(class="bedtype-name", v-model="item.size" filterable)
                el-option(
                  v-for="item in item.bedsize_options",
                  :key="item.id",
                  :label="item.name",
                  :value="item.name"
                )
              //- el-input(class="bedtype-input", v-model="item.size", placeholder="如1.5-1.8")
              span 米
              i(v-if="index>0", @click="cutBedType(index)", class="el-icon-remove-outline")
          span(class="add")
            i(@click="addBedType", class="el-icon-circle-plus-outline")
        el-form-item(label="宽带", required)
          el-col(:span="3")
            span 是否有WIFI网络
          el-col(:span="21")
            el-form-item(prop="wifi")
              el-radio-group(v-model="formData.wifi")
                el-radio(v-for="item in wifiList", :key="item.id", :label="item.id") {{item.name}}
          el-col(:span="3")
            span 是否有有线宽带
          el-col(:span="21")
            el-form-item(prop="broadnet")
              el-radio-group(v-model="formData.broadnet")
                el-radio(v-for="item in broadnetList", :key="item.id", :label="item.id") {{item.name}}
        el-form-item(label="吸烟", prop="smoke")
          el-select(class="bedtype-name", v-model="formData.smoke", placeholder="请选择")
            el-option(label="不可吸烟", value="0")
            el-option(label="有吸烟区域", value="1")
        el-form-item(label="餐食", prop="foods")
          el-radio-group(v-model="formData.foods.type", @change="changeFoods")
            .item-foods
              el-radio(label="10") 不含餐
            .item-foods
              el-radio(label="0") 含餐
              el-radio(label="1") 含早餐
              el-radio(label="2") 含中餐
              el-radio(label="3") 含晚餐
            .item-foods
              el-radio(label="6") 早餐 + 中餐
              el-radio(label="7") 早餐 + 晚餐
              el-radio(label="8") 全餐
              el-radio(label="9") 中餐 + 晚餐
        el-form-item(label="餐食数量", prop="foods", v-if="this.formData.foods.type != '10'")
          el-input(class="small-input reset_input__inner_padding_10", v-model="formData.foods.foods_number")
          span 份
        el-form-item(label="最少提前预订时间", class="require-position", prop="booking_time")
          span(class="require-booking")
          .room-type-row
            .item-row
              span 提前
              el-input(class="small-input", v-model="booking_day")
              span 天
              el-input(class="small-input reset_input__inner_padding_10", v-model="booking_time", type="number")
              //- el-select(class="bedtype-name", v-model="booking_time")
              //-   el-option(
              //-     v-for="item in hoursArr",
              //-     :key="item.value",
              //-     :label="item.label",
              //-     :value="item.value"
              //-   )
              span 时 前订当日房
              //- el-input(class="textarea-input", type="textarea", :rows="2", placeholder="请输入内容", v-model="booking_day_text")
        el-form-item(label="预订房间数量限制")
          el-radio-group(v-model="booking_roomNumStatus")
            el-radio(label="0") 不限
            el-radio(label="1") 
              el-input(class="small-input", v-model="booking_roomNum")
              span(class="input-right") 间 起预订
          //- el-input(class="textarea-input", type="textarea", :rows="2", placeholder="请输入内容", v-model="booking_roomNum_text")
        el-form-item(label="预订房晚限制")
          el-radio-group(v-model="booking_limitNight")
            el-radio(label="0") 不限
            el-radio(label="1")
              span 连续
              el-input(class="small-input middle", v-model="booking_nightNum")
              span 晚 起预订
          //- el-input(class="textarea-input", type="textarea", :rows="2", placeholder="请输入内容", v-model="booking_nightNum_text")
        el-form-item(label="取消规则", prop="cancel_rules")
          el-radio(v-model="cancel_rules", label="1") 不可取消
          //- el-radio(v-model="cancel_rules", label="2") 限时取消
          //- el-input(class="textarea-input", type="textarea", :rows="2", placeholder="请输入内容", v-model="cancel_rules_text")
        el-form-item(label="每日售卖时间段", class="require-position",)
          span(class="require-date")
          el-time-select(
            class="item-select",
            placeholder="起始时间",
            v-model="startTime",
            :picker-options ="{start: '00:00',step: '01:00',end: '23:00'}"
          )
          span(class="tiem-middle") 至
          el-time-select(
            class="item-select",
            placeholder="结束时间",
            v-model="endTime",
            :picker-options ="{start: '00:00',step: '01:00',end: '24:00', minTime: formData.startTime}"
          )
        el-form-item(label="支付方式", prop="pay_way")
          el-radio(v-model="formData.pay_way", label="1") 线上支付
        //- el-form-item(label="取消定损", class="require-position", prop="fixd_loss")
        //-   span(class="require-fixdloss")
        //-   el-radio(v-model="fixd_loss", label="1") 系统定损
        //-   el-radio(v-model="fixd_loss", label="2") 人工定损
        //- el-form-item
        //-   p 注：当符合限时取消规则时，系统定损：按照限时取消规则自动处理退款；人工定损：人工定损退款金额后，确认后退款
        el-form-item(class="footer")
          el-button(type="primary", @click="backStatuList") 取消  
          el-button(type="primary", v-if="!IsAddPage", v-loading='saveLoading',@click="_submitPackage") 保存 
          el-button(type="primary", v-else, v-loading='saveLoading', @click="_submitPackage") 下一步 
</template>

<script>
import {
  promise_getRoomList,
  promise_hotelAddPackage,
  promise_getHotelBedType,
  promise_getPackageDetail,
  promise_editPackage
} from "src/api/promise_api";

export default {
  data() {
    return {
      holteId: "",
      // showForm: false,
      nextDisabled: true,
      hotelName: "",
      roomType: "",
      formData: {
        product_id: "",
        room_id: "",
        package_name: "",
        limit_adults: "",
        bed_info: [
          {
            one_level: "",
            bed_type_id: "",
            number: "1",
            size: "",
            bedtypeListTwo: [],
            bedsize_options: []
          }
        ],
        broadnet: "0", //无有线宽带
        smoke: "0", //0不可吸烟
        wifi: "0", //0没有WiFi
        pay_way: "1", //1线上支付
        foods: {
          type: "10", //不含餐
          foods_number: "1"
        }
      },
      fixd_loss: "",
      startTime: "00:00",
      endTime: "24:00",
      booking_day_id: "",
      booking_day: 0,
      booking_time: 0,
      booking_day_text: "",
      booking_roomNum_id: "",
      booking_roomNumStatus: "0",
      booking_roomNum: "",
      booking_roomNum_text: "",
      booking_night_id: "",
      booking_limitNight: "0",
      booking_nightNum: "",
      booking_nightNum_text: "",
      cancel_rules_id: "",
      cancel_rules: "1",
      cancel_rules_text: "",
      rules: {
        package_name: [
          { required: true, message: "请输入套餐名称", trigger: "blur" }
        ],
        limit_adults: [
          { required: true, message: "请选择最大入住人数", trigger: "blur" }
        ],
        // bed_info: [
        //   { required: true, message: '请填写床型信息', trigger: 'change' }
        // ],
        broadnet: [
          { required: true, message: "请选择宽带", trigger: "change" }
        ],
        wifi: [{ required: true, message: "请选择WiFi", trigger: "change" }],
        smoke: [
          { required: true, message: "请选择是否可以吸引", trigger: "change" }
        ],
        pay_way: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        foods: [{ required: true, message: "请选择餐食", trigger: "change" }]
      },
      bedtypeList: [],
      bedtypeListTwo: [],
      two_level_list: [],
      bed_size_list: [],
      wifiList: [
        {
          id: "0",
          name: "无WIFI网络"
        },
        {
          id: "1",
          name: "有WIFI网络"
        },
        {
          id: "2",
          name: "免费WIFI网络"
        },
        {
          id: "3",
          name: "收费WIFI网络"
        },
        {
          id: "4",
          name: "部分免费WIFI网络"
        }
      ],
      bedsize_options: [],
      broadnetList: [
        {
          id: "0",
          name: "无有线宽带"
        },
        {
          id: "1",
          name: "有有线宽带"
        },
        {
          id: "2",
          name: "免费有线宽带"
        },
        {
          id: "3",
          name: "收费有线宽带"
        },
        {
          id: "4",
          name: "部分有线宽带"
        }
      ],
      roomTypeList: [],
      package_id: "",
      hoursArr: [],
      IsAddPage: "",
      saveLoading:false
    };
  },
  mounted() {
    // !this.showForm && this._getRoomTypeList()
    this.holteId = this.$route.query.hotelId;
    this.hotelName = this.$route.query.hotelName;
    this.formData.room_id = this.$route.query.room_id;
    this.package_id = this.$route.query.package_id;
    this.IsbackPage = this.$route.query.back;
    this.IsAddPage = this.$route.query.IsAddPage;
    this.package_id && this._getDetails();
    this._getBedType();

    // for(let i = 0; i <= 24; i++) this.hoursArr.push({value: i,label: i})
  },
  methods: {
    sizeBedTypeChange(val, index) {
      this.formData.bed_info[index].size = "";
      this.formData.bed_info[index].bedtypeListTwo.forEach(item => {
        if (val === item.id) {
          this.formData.bed_info[index].bedsize_options = item.bed_size;
        }
      });
      let sizeList = [];
      this.formData.bed_info[index].bedsize_options.forEach((item, index) => {
        sizeList.push({
          id: index,
          name: item
        });
      });
      this.formData.bed_info[index].bedsize_options = sizeList;
    },
    twoBedTypeChange(val, index) {
      this.formData.bed_info[index].bed_type_id = "";
      this.formData.bed_info[index].size = "";
      this.bedtypeList.forEach(item => {
        if (val === item.id) {
          this.formData.bed_info[index].bedtypeListTwo = item.two_level;
        }
      });
    },
    async _getDetails() {
      try {
        const { data } = await promise_getPackageDetail({
          data: { package_id: this.package_id }
        });

        if (data.code !== 0) return this.$message.error(data.msg);
        const details = data.data;
        details.foods = {
          type: details.foods,
          foods_number: details.foods_number
        };
        delete details.foods_number;
        this.formData = details;
        this.package_id = details.id;
        details.booking_rules.forEach(item => {
          //售卖时间段
          if (item.type == 1) {
            this.startTime = item.min;
            this.endTime = item.max;
          }
          if (item.type == 2) {
            //连续几晚
            this.booking_night_id = item.id;
            this.booking_nightNum = item.min;
            if (item.min) {
              this.booking_limitNight = "1";
            } else {
              this.booking_limitNight = "0";
            }
            this.booking_nightNum_text = item.desc;
          }
          if (item.type == 3) {
            //几间起预定
            this.booking_roomNum_id = item.id;
            this.booking_roomNum = item.min;
            if (item.min) {
              this.booking_roomNumStatus = "1";
            } else {
              this.booking_roomNumStatus = "0";
            }
            this.booking_roomNum_text = item.desc;
          }
          if (item.type == 4) {
            //提前预定时间
            this.booking_day_id = item.id;
            let min = item.min;
            let minArr = min.split(".");
            this.booking_day = minArr[0];
            this.booking_time = minArr[1];
          }
        });
        this.cancel_rules = details.cancel_rules && details.cancel_rules.type;
        this.cancel_rules_text =
          details.cancel_rules && details.cancel_rules.desc;
        this.cancel_rules_id = details.cancel_rules && details.cancel_rules.id;
        this.fixd_loss = details.cancel_rules && details.cancel_rules.fixd_loss;
      } catch (err) {
        console.log(err);
      }
    },
    async _getBedType() {
      try {
        const params = {
          data: {
            product_id: this.holteId,
            room_id: this.formData.room_id || this.$route.query.room_id
          }
        };
        const {
          data: { code, data, msg }
        } = await promise_getHotelBedType(params, true);

        if (code !== 0) return this.$message.error(msg);

        this.bedtypeList = data.bed_type;
        if (!this.package_id) {
          this.bedtypeList.forEach(item => {
            if (data.default[0] == item.id) {
              this.formData.bed_info[0].one_level = item.id;
              this.formData.bed_info[0].bedtypeListTwo = item.two_level;
              item.two_level.forEach(i => {
                if (data.default[1] == i.id) {
                  this.formData.bed_info[0].bed_type_id = i.id;
                  i.bed_size.forEach((m, index) => {
                    this.formData.bed_info[0].bedsize_options.push({
                      id: index,
                      name: m
                    });
                  });
                }
              });
            }
          });
          this.formData.bed_info[0].bedsize_options.forEach(j => {
            if (data.default[2] == j.name) {
              this.formData.bed_info[0].size = j.name;
            }
          });
        } else {
          this.formData.bed_info.forEach(item => {
            this.bedtypeList.forEach(it => {
              if (item.one_level == it.id) {
                item.bedtypeListTwo = it.two_level;
                it.two_level.forEach(i => {
                  if (item.bed_type_id == i.id) {
                    let sizeList = [];
                    i.bed_size.forEach((m, index) => {
                      sizeList.push({
                        id: index,
                        name: m
                      });
                    });
                    item.bedsize_options = sizeList;
                  }
                });
              }
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async _getRoomTypeList() {
      try {
        const { data } = await promise_getRoomList({
          data: { product_id: this.holteId }
        });

        if (data.code !== 0) return this.$message.error(data.msg);
        this.roomTypeList = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // checkRoomtype() {
    //   this.nextDisabled = !this.roomType
    //   console.log(this.roomType)
    // },
    // nextToPackage() {
    //   console.log(this.roomType)
    //   // this.showForm = true;
    // },
    async _submitPackage() {
      this.$refs.packageform.validate(async valid => {
        if (valid) {
          const reg = /^\d*$/;
          for (let i = 0; i < this.formData.bed_info.length; i++) {
            if (
              !this.formData.bed_info[i].number ||
              !this.formData.bed_info[i].one_level ||
              !this.formData.bed_info[i].bed_type_id ||
              !this.formData.bed_info[i].size
            )
              return this.$message.warning("房型信息不能为空");
          }
          if (this.formData.foods.type !== "10") {
            if (!reg.test(this.formData.foods.foods_number))
              return this.$message.warning("餐食数量不正确");
            if (this.formData.foods.foods_number === "0")
              return this.$message.warning("餐食设置不能为0");
          }
          if (
            (this.booking_day !== 0 && !this.booking_day) ||
            (this.booking_time !== 0 && !this.booking_time)
          )
            return this.$message.warning("请设置最少提前预订时间");
          if (
            !reg.test(this.booking_day) ||
            !reg.test(this.booking_time) ||
            this.booking_time * 1 < 0 ||
            this.booking_time * 1 > 24
          )
            return this.$message.warning(
              "提前预订天数需输入整数，输入的时间值为0时-24时"
            );
          if (!this.startTime || !this.endTime)
            return this.$message.warning("请选择售卖时间段");
          // if(!this.fixd_loss) return this.$message.warning("请选择取消定损")
          let formDataParams = this.formData;
          let booking_rules = [];
          let cancel_rules = {};
          if (this.package_id) {
            delete formDataParams["id"];
            delete formDataParams["room_id"];
            formDataParams["package_id"] = this.package_id;
            booking_rules = [
              {
                type: 1,
                min: this.startTime,
                max: this.endTime,
                desc: ""
              },
              {
                id: this.booking_night_id,
                type: 2,
                min: this.booking_limitNight == "1" ? this.booking_nightNum : "",
                max: "",
                desc: this.booking_nightNum_text
              },
              {
                id: this.booking_roomNum_id,
                type: 3,
                min: this.booking_roomNumStatus == "1" ? this.booking_roomNum : "",
                max: "",
                desc: this.booking_roomNum_text
              },
              {
                id: this.booking_day_id,
                type: 4,
                min: this.booking_day + "." + this.booking_time,
                max: "",
                desc: this.booking_day_text
              }
            ];

            cancel_rules = {
              id: this.cancel_rules_id,
              type: this.cancel_rules,
              desc: this.cancel_rules_text,
              fixd_loss: this.fixd_loss
            };
          } else {
            booking_rules = [
              {
                type: 1,
                min: this.startTime,
                max: this.endTime,
                desc: ""
              },
              {
                type: 2,
                min: this.booking_limitNight ? this.booking_nightNum : "",
                max: "",
                desc: this.booking_nightNum_text
              },
              {
                type: 3,
                min: this.booking_roomNumStatus ? this.booking_roomNum : "",
                max: "",
                desc: this.booking_roomNum_text
              },
              {
                type: 4,
                min: this.booking_day + "." + this.booking_time, //this.booking_day * 24 + this.booking_time *1,
                max: "",
                desc: this.booking_day_text
              }
            ];

            cancel_rules = {
              type: this.cancel_rules,
              desc: this.cancel_rules_text,
              fixd_loss: this.fixd_loss
            };
          }
          formDataParams["booking_rules"] = booking_rules;
          formDataParams["cancel_rules"] = cancel_rules;
          formDataParams["product_id"] = this.holteId; //118560,//
          formDataParams["room_id"] = this.formData.room_id; //1 //
          formDataParams["foods"].type === "10"
            ? (formDataParams["foods"].foods_number = "0")
            : "";
          delete formDataParams["id"];
          formDataParams["bed_info"].forEach(item => {
            delete item.bedtypeListTwo;
            delete item.bedsize_options;
          });
          //供应商
          formDataParams["channel"]= this.$route.query.supplier 
          const params = {
            data: formDataParams
          };
          // return console.log(params,'params')

          if (this.package_id) {
            this.saveLoading=true
            const { data } = await promise_editPackage(params, true);
            this.saveLoading=false
            if (data.code !== 0) return this.$message.error(data.msg);
            // this.$message.success(data.msg)
            if (this.IsbackPage) {
              this.$router.push({
                path: "/hotel/packagePrice",
                query: {
                  hotelId: this.holteId,
                  package_id: this.package_id,
                  room_id: this.$route.query.room_id,
                  back: 1,
                  channel: this.$route.query.supplier
                }
              });
            } else {
              this.$router.push(
                `/hotel/roomtStatus?hotel_id=${this.holteId}&channel=${this.$route.query.supplier}`
              );
            }
          } else {
            this.saveLoading=true
            const { data } = await promise_hotelAddPackage(params, true);
            this.saveLoading=false
            if (data.code !== 0) return this.$message.error(data.msg);
            this.package_id = data.data.package_id;
            this.$router.push({
              path: "/hotel/packagePrice",
              query: {
                hotelId: this.holteId,
                package_id: this.package_id,
                room_id: this.formData.room_id,
                supplier: this.$route.query.supplier
              }
            });
          }
        } else {
          console.log("err");
          return false;
        }
      });
    },
    addBedType() {
      let bedtype = {
        number: "1",
        one_level: "",
        bed_type_id: "",
        size: ""
      };
      this.formData.bed_info.push(bedtype);
    },
    cutBedType(index) {
      this.formData.bed_info.splice(index, 1);
    },
    backStatuList() {
      this.$router.push({
        path: "/hotel/roomtStatus",
        query: {
          hotel_id: this.holteId,
          channel: this.$route.query.supplier
        }
      });
    },
    changeFoods(val) {
      this.formData.foods.foods_number = val !== "10" ? "1" : "0";
    }
  }
};
</script>
