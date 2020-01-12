<template>
  <div class="calendarquotation">
    <div class="calendar-tool">
      <div class="prev">
        <i class="el-icon-d-arrow-left" @click="handleChangeYear(-1)"></i>
        <i class="el-icon-arrow-left" @click="handleChangeMonth(-1)"></i>
      </div>
      <div class="select">
        <el-select v-model="year" @change="setCalendarDaysData">
          <el-option v-for="(num, key) in yearList" 
                    :key="key" 
                    :label="num" 
                    :value="num">
          </el-option>
        </el-select>
        &nbsp;&nbsp;年&nbsp;&nbsp;
        <el-select v-model="month" @change="setCalendarDaysData">
          <el-option v-for="(num, key) in monthList" 
                    :key="key" 
                    :label="num" 
                    :value="num - 1">
          </el-option>
        </el-select>
        &nbsp;&nbsp;月
      </div>
      <div class="next">
        <i class="el-icon-arrow-right" @click="handleChangeMonth(1)"></i>
        <i class="el-icon-d-arrow-right" @click="handleChangeYear(1)"></i>
      </div>
    </div>
    <div class="calendar-week">
      <div v-for="(week, key) in weeks" :key="key" class="week">
        {{ week }}
      </div>
    </div>
    <div class="calendar-day">
      <div class="day" v-for="(day, key) in days" :key="key" :class="{'disabled': day.disabled }">
        <div class="str">
          {{ day.day }}
        </div>
        <div class="cont">
          <slot :name="day.date"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CalendarQuotation',
  data(){
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        weeks = ['日','一','二','三','四','五','六'],
        monthList = [1,2,3,4,5,6,7,8,9,10,11,12],
        minYear = year - 5,
        maxYear = year + 5,
        len = maxYear - minYear,
        yearList;
    
    yearList = new Array(len).fill(len).map((mun,index) => index + minYear);

    return {
      year,
      month,
      weeks,
      monthList,
      yearList,
      days: []
    }
  },
  methods:{
    stringifyDate(date){
      let year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate();
      
      return year + '-' + (month+'').replace(/(^\d$)/, '0$1') + '-' + (day+'').replace(/(^\d$)/, '0$1');
    },
    setCalendarDaysData(){
      let year = this.year,
          month = this.month,
          prevMonth = this.getYearMonth(year, month - 1),
          nextMonth = this.getYearMonth(year, month + 1),
          prevMonthDays = this.countMonthDays(prevMonth.year, prevMonth.month),
          currMonthDays = this.countMonthDays(year, month),
          fristDay = new Date(year,month,1),
          firstDayWeek = fristDay.getDay(),
          i,j;
      this.days = [];
      for(i = 0; i < 6; i++){
        for(j = 0; j < 7; j++){
          let day = i * 7 + j + 1 - firstDayWeek,
              disabled = false,
              date;
          if(day < 1){
            day = prevMonthDays + day;
            date = this.stringifyDate(new Date(prevMonth.year, prevMonth.month,day));
            disabled = true;
          }else if(day > currMonthDays){
            day = day - currMonthDays;
            date = this.stringifyDate(new Date(nextMonth.year,nextMonth.month,day));
            disabled = true;
          }else{
            date = this.stringifyDate(new Date(year,month,day));
          }
          this.days.push({
            date,
            day,
            disabled
          });
        }
      }
    },
    getYearMonth(year, month){
      if(month > 11){
        year++;
        month = 0;
      }
      if(month < 0){
        year--;
        month = 11;
      }

      return {
        year,
        month
      }
    },
    countMonthDays(year, month){
      let date = +new Date(year, month + 1, 1) - 86400000;
      return new Date(date).getDate();
    },
    handleChangeYear(num){
      this.year = this.year + num;
      this.setCalendarDaysData;
    },
    handleChangeMonth(num){
      let year = this.year,
          month = this.month + num,
          yearMonth = this.getYearMonth(year, month);
      this.year = yearMonth.year;
      this.month = yearMonth.month;
    }
  },
  mounted(){
    this.setCalendarDaysData();
  }
}
</script>

<style lang="less" scoped>
.calendarquotation{
  width: 966px;
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 4px;

  .calendar-tool{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;

    .prev,.next{
      i{
        margin:0 10px;
        font-size: 16px;
        color:#b10c79;
        cursor: pointer;
      }
    }
  }
  .calendar-week{
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .week{
      float: left;
      width: 130px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 4px;
    }
  }
  .calendar-day{
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .day{
      float: left;
      display: flex;
      flex-direction: column;
      width: 130px;
      height: 170px;
      margin: 4px;
      background-color: #fdfdfd;
      &.disabled{
        background-color: #f9f9f9;
        .str{
          color: #ddd;
        }
      }

      .str{
        padding: 10px;
        text-align: right;
        line-height: 20px;
        font-weight: 700;
      }
      .cont{
        flex: 1px;
        padding: 0 10px 10px;
      }
    }
  }
  
}
</style>

