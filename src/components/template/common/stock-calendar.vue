<template>
  <div class="stock-calendar">
    <div class="calendar-header">
      <el-button type="text" class="prev-month" @click="handlePrevMonth">
        <i type="text" class="el-icon-arrow-left"></i>
      </el-button>
      <b class="current-month">{{YM}}</b>
      <el-button type="text" class="next-month" @click="handleNextMonth">
        <i type="text" class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <el-checkbox-group v-model="selectedDate" class="calendar-content" :disabled="calendarDisabled">
      <el-calendar ref="stockCalendar" v-model="date" class="calendar">
        <template slot="dateCell" slot-scope="{date, data}">
          <el-checkbox
            :key="data.day"
            class="calendar-cell"
            :label="data.day"
            :disabled="isDisabled(data.day)"
          >
            <div :key="data.day">
              <slot
                name="cell"
                :date="data.day"
                :meta="calendarData[data.day] || {}"
                :disabled="isDisabled(data.day)"
              >{{data.day.split('-')[2]}}</slot>
            </div>
          </el-checkbox>
        </template>
      </el-calendar>
    </el-checkbox-group>
    <div class="calendar-footer">
      <span class="label">快速选择</span>
      <el-link class="button" @click="handleSelectedMonth" :disabled="calendarDisabled">全选</el-link>
      <el-link class="button" @click="handleSelectWeekdays" :disabled="calendarDisabled">选择工作日</el-link>
      <el-link class="button" @click="handleSelectDayOff" :disabled="calendarDisabled">选择周六日</el-link>
    </div>
  </div>
</template>
<script>
import Moment from "moment";
const dateFormatStr = "YYYY-MM-DD";
export default {
  props: {
    calendarDisabled: {
      type: Boolean,
      default: false
    },
    calendarData: {
      type: Object,
      default() {
        return {};
      }
    },
    value: {
      required: true,
      default() {
        return [];
      }
    },
    selectable: Function,
    multiple: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    isBefore(day) {
      if (!day) {
        return false;
      }
      let current = Moment(new Date()).format(dateFormatStr);
      return Moment(day).isBefore(current);
    },
    isDisabled(day, selectable) {
      if (!selectable(day)) {
        return false;
      }
      return day;
    }
  },
  data() {
    return {
      date: new Date()
    };
  },
  computed: {
    isDisabled() {
      if (this.selectable) {
        return this.selectable;
      }
      const isBefore = day => {
        if (!day) {
          return false;
        }
        let current = Moment(new Date()).format(dateFormatStr);
        return Moment(day).isBefore(current);
      };

      return isBefore;
    },
    selectedDate: {
      get() {
        return this.value;
      },
      set(results) {
        results = results.filter((item, index) => {
          return results.indexOf(item) === index;
        });
        if (!this.multiple) {
          results = results.slice(-1);
        }
        this.$emit("input", results);
      }
    },
    YMD() {
      return Moment(this.date).format(dateFormatStr);
    },
    YM() {
      return Moment(this.date).format("YYYY年MM月");
    },
    nextMonthDate() {
      return Moment(this.date)
        .add(1, "months")
        .format(dateFormatStr);
    },
    prevMonthDate() {
      return Moment(this.date)
        .subtract(1, "months")
        .format(dateFormatStr);
    }
  },
  mounted() {},
  methods: {
    handlePrevMonth() {
      this.date = this.prevMonthDate;
    },
    handleNextMonth() {
      this.date = this.nextMonthDate;
    },
    getSelectedDate(filterFn) {
      let date = Moment(this.YMD);
      let minDate = Moment(new Date()).format(dateFormatStr);
      let daysInMonth = date.daysInMonth();
      let results = new Array(daysInMonth).fill(1);

      return results
        .map((item, index) => {
          date.date(index + 1);
          // if (date.isBefore(minDate)) {
          //   return "";
          // }
          if (this.isDisabled(date.format(dateFormatStr))) {
            return "";
          }
          // return date.format(dateFormatStr);
          return filterFn(date);
        })
        .filter(item => !!item);
    },
    handleSelectedMonth() {
      let results = this.getSelectedDate(date => {
        return date.format(dateFormatStr);
      });
      this.selectedDate = this.selectedDate.concat(results);
    },
    getWeekends() {
      let legalValues = [0, 6];
      return this.getSelectedDate(date => {
        let days = date.day();
        if (!legalValues.includes(days)) {
          return "";
        }
        return date.format(dateFormatStr);
      });
    },
    getWeekdays() {
      let legalValues = [1, 2, 3, 4, 5];
      return this.getSelectedDate(date => {
        let days = date.day();
        if (!legalValues.includes(days)) {
          return "";
        }
        return date.format(dateFormatStr);
      });
    },
    handleSelectWeekdays() {
      let weekdays = this.getWeekdays();
      let weekends = this.getWeekends();
       
      this.selectedDate = this.selectedDate.concat(weekdays).filter(day => !weekends.includes(day));
    },
    // 休息日
    handleSelectDayOff() {
      let weekdays = this.getWeekdays();
      let weekends = this.getWeekends();
      this.selectedDate = this.selectedDate.concat(weekends).filter(day => !weekdays.includes(day));
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/css/variables.scss";
.stock-calendar {
  .el-calendar-table {
    border: 1px solid $borderColor;
  }
  td {
    border: 1px solid $borderColor;
    height: 50px;
  }
  td.is-selected {
    background: none !important;
  }
  .el-calendar__header {
    display: none;
  }
  .el-calendar__body {
    padding: 0;
  }

  .el-calendar-day {
    height: 100%;
    padding: 0;
    margin: -1px;
    position: relative;
    // border: 1px solid transparent;
    &:hover {
      background: none;
    }
  }
  .calendar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    text-align: center;
    border: 1px solid $borderColor;
    margin-bottom: -1px;

    .prev-month,
    .next-month {
      margin: 0 10px;
    }
  }
  .calendar-content {
    font-size: 14px;
  }
  .calendar-cell {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    &.is-checked {
      border: 1px solid $themeColor;
    }
    .el-checkbox__label {
      display: block;
      padding-left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .el-checkbox__input {
      display: none;
    }
  }
  .calendar-footer {
    padding: 15px;
    border: 1px solid $borderColor;
    margin-top: -1px;
    .label,
    .button {
      margin-right: 30px;
    }
  }
}
</style>