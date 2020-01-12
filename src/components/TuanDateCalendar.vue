<template>
  <div class="calendar-wrap">
    <div class="calendar-tit">
      <b @click="prevMonth" class="mouth-btn">&lt;上个月</b>
      <b class="mouth-tit">{{date.onYear}}年{{date.onMonth}}月</b>
      <b @click="nextMonth" class="mouth-btn">下个月></b>
    </div>
    <div class="calendar-week">
      <div class="calendar-week-info">一</div>
      <div class="calendar-week-info">二</div>
      <div class="calendar-week-info">三</div>
      <div class="calendar-week-info">四</div>
      <div class="calendar-week-info">五</div>
      <div class="calendar-week-info">六</div>
      <div class="calendar-week-info">日</div>
    </div>
    <div class="calendar-con" v-if="!isnewPiliang">
      <div v-for="(item, index) in date.onCalendar" :key="index" class="calendar-item">
        <div :class="item.id >=0 && item.status == 0 ? 'hui':''">
          <div v-show="item.id >= 0 && item.show" class="day-close">
            <span @click="delDate(item)" class="day-close-in">X</span>
          </div>
          <div class="day-con">{{item.day}}</div>
          <el-tooltip
            v-if="item.id >= 0"
            class="item"
            effect="dark"
            :content="item.quote_name"
            placement="top"
          >
          <div v-show="item.id >= 0" class="day-info1 ellipsis">{{item.quote_name}}</div>
          </el-tooltip>
          <div v-show="item.id >= 0" class="day-info">
            <span v-show="item.id >= 0 && item.is_confirm == 0">{{item.stock * 1 - item.booking_stock * 1}}/{{item.stock}}</span>
            <span @click="selDay(item)" v-if="item.show" class="calendat-btn">修改</span>
          </div>
          <div v-show="item.id >= 0" class="day-2qr">
            <template v-if="item.is_confirm == 0">(无需二次确认)</template>
            <template v-else>(需二次确认)</template>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="calendar-con">
      <div
        @click="dayPiliang(item, index)"
        v-for="(item, index) in date.onCalendar"
        :class="{nosel: item.nosel || item.day === '',sel: item.piliang}"
        :key="index"
        class="calendar-item"
      >
        <div class="day-con">{{item.day}}</div>
        <div v-show="item.plan_num >= 0" class="day-info1">{{item.name}}</div>
        <div v-show="item.plan_num >= 0" class="day-info">
          <span v-show="item.plan_num > 0">{{item.remain_num}}/{{item.plan_num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TuanDatecalendar",
  props: {
    isnewPiliang: {
        type: Boolean,
        default: null
    },
    date: {
        type: Object,
        default: null
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    //判断是否闰年
    isLeap(year) {
        let _year = year;
        if(_year % 4 === 0 && _year % 100 > 0) {
            return true ;
        }
        if(_year % 400 === 0 && _year % 3200 > 0) {
            return true ;
        }
        return false ;
    },
    delDate(item){
        this.$emit('delDate', item);
    },
    selDay(item){
        this.$emit('selDay', item);
    },
    prevMonth() {
        this.date.allSelectStatus = true;
        this.date.workSelectStatus = true;
        this.date.weekSelectStatus = true;
        this.date.onCalendar = [];
        --this.date.onMonth;

        if(this.date.onMonth < 1){
            this.date.onMonth = 12;
            --this.date.onYear;
            if(this.date.onYear < 1){
            console.log('超过允许的时间范围');
            return false;
            }
        };
        this.$emit('createCalendar', this.date.onCalendar);
        this.$emit('showPriceDate');
    },
    nextMonth() {
        this.date.allSelectStatus = true;
        this.date.workSelectStatus = true;
        this.date.weekSelectStatus = true;
        this.date.onCalendar=[];
        ++this.date.onMonth;

        if(this.date.onMonth>12){
            this.date.onMonth=1;
            this.date.onYear+=1;
        };
        this.$emit('createCalendar', this.date.onCalendar);
        this.$emit('showPriceDate');
    },
    dayPiliang(item,index){
      this.$emit('dayPiliang',item,index);
    }
  }
};
</script>
<style lang="less">
    .calendar-wrap {
    margin-top: 15px;
    border: 1px solid #cccccc;
    min-width: 940px;
    .calendar-tit {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      .mouth-btn {
        display: inline-block;
        width: 80px;
        cursor: pointer;
        background-color: #f4f4f4;
        height: 26px;
        line-height: 26px;
        border-radius: 8px;
        user-select: none;
      }
      .mouth-tit {
        display: inline-block;
        width: 100px;
      }
      b {
        color: #b10c79;
      }
    }
    .calendar-week {
      width: 100%;
      font-size: 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background-color: #f4f4f4;
      .calendar-week-info {
        display: inline-block;
        width: 14.28%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #b10c79;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
        &:last-child {
          border-right: 0;
        }
      }
    }
    .calendar-con {
      width: 100%;
      font-size: 0;
      clear: both;
      overflow: hidden;
      .hui {
        width: 100%;
        height: 100%;
        background: #ddd;
      }
      .calendar-item {
        float: left;
        position: relative;
        width: 14.28%;
        height: 100px;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        .day-con {
          padding: 10px 0 0 10px;
          font-size: 18px;
          color: #444444;
          min-height: 22px;
        }
        .day-2qr {
          font-size: 12px;
          color: #aaa;
          padding: 0 10px;
        }
        .day-info1 {
          font-size: 14px;
          color: #333;
          padding: 10px 10px 0;
          // text-align: center;
          .calendat-btn {
            float: right;
            color: #b10c79;
            padding-left: 5px;
          }
        }
        .day-info {
          font-size: 14px;
          color: #333;
          padding: 0px 10px 0;
          // text-align: center;
          .calendat-btn {
            float: right;
            color: #b10c79;
            padding-left: 5px;
          }
        }
        &:hover {
          background-color: #fbf3f8;
          .day-close-in {
            display: block;
          }
        }
        &.sel {
          background-color: #fad8ed;
        }
        &.nosel {
          background: #ddd;
          &.sel {
            background-color: #ddd;
          }
        }
        .day-close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 14px;
          color: #b10c79;
        }
      }
    }
  }
</style>
