<template >
  <div class="Calendar">
    <header>
      <section>
        <div v-if="firstDateWeek !== ''">
          <div class="month"> {{month | plusZero}}</div>
          <div class="other">
            <span v-for="(item,index) in String(year)" :key="index">{{ item }}</span>
            <p> {{firstDateWeek | getWeek}}-{{date}}</p>
          </div>
          <i class="icon iconfont icon-left" v-if="isCanPre" @click="changeMonth(1)">
            <!-- v-svg(:data="'jikediancanicon13'") -->
          </i>
          <i class="icon iconfont icon-right" v-if="isCanNext" @click="changeMonth(2)">
            <!-- v-svg(:data="'jikediancanicon13'") -->
           </i>
        </div>
       </section>
    </header>        
    <nav>
      <span v-for="(item,index) in weeks" :key="index"> {{ item }}</span>
    </nav> 
    <div class="main">
      <span v-for="(item,index) in list" :key="index" :class="[{active:isActive(item),selected:isSelected(item)}]" @click="confirm(item)">
        <h4> {{ item.depart_date | getDate }}</h4>
        <p> {{ item.price | money }}</p>
        <!-- v-svg(v-if="isSelected(item)", :data="'date-jiaobiao-copy'") -->
      </span>
    </div>   
</div>
</template>
<script>
export default {
  data() {
    return {
      year: "",
      month: "",
      isIos: "",
      lastDate: "",
      firstDateWeek: "",
      inite: false, //初始化操作
      originList: [],
      currentList: [],
      monthList: new Set(),
      list: [],
      weeks: ["日", "一", "二", "三", "四", "五", "六"]
    }
  },
  props: {
    selectedDate: {
      type: String,
      default: ''
    }
  },
  computed: {
    date: {
      get: function() {
        return this.selectedDate
      }
    },
    isCanPre() {
      let { month, year, rangeDeteStringArr, originList } = this
      if (!originList.length) return false
      let newMonth = month < 10 ? `0${month}` : month
      return new Date(`${year}-${newMonth}`).getTime() > rangeDeteStringArr[0]
    },
    isCanNext() {
      let { month, year, rangeDeteStringArr, originList } = this
      if (!originList.length) return false
      let newMonth = month < 10 ? `0${month}` : month
      return new Date(`${year}-${newMonth}`).getTime() < rangeDeteStringArr[1]
    },
    rangeDeteStringArr() { // 精确到月份的 时间戳区间
      let { originList } = this
      if (!originList.length)  return [0, 0] // 数组为空的时候
      let depArr = originList[0].depart_date.split('-')
      let depTime = new Date(`${depArr[0]}-${depArr[1]}`).getTime()

      let arriveArr = originList[originList.length - 1].depart_date.split('-')
      let arriveTime = new Date(`${arriveArr[0]}-${arriveArr[1]}`).getTime()
      return [depTime, arriveTime]
    },
  },
  components: {},
  watch: {},
  filters: {
    getWeek(data) {
      return "星期" + ["日", "一", "二", "三", "四", "五", "六"][data]
    },
    getDate(data) {
      return data ? Number(data.split("-")[2]) : ''
    },
    plusZero(data) {
      return (data < 10 && String(data).split("")[0] != 0 ? "0" : "") + data;
    },
    terminalFilter(data, item, type) {
      return type == 0
        ? data.split(item.journey_segment_list[0].depart_city_name)[1]
        : data.split(item.journey_segment_list[0].arrive_city_name)[1];
    },
    money(date) {
      return date ? "￥" + date : "";
    }
  },
  created() {
  },
  mounted() {
    this.isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  methods: {
    setList(list, inite) {
      //父级调用，设置初始列表
      // console.log("setList::", list, inite);
      inite ? (this.inite = true) : null;
      this.originList = [...list];
      this.initeList(this.originList);
    },
    initeList(list) {
      if (!list.length) return
      this.year = Number(list[0].depart_date.split("-")[0]); //当前操作年
      this.month = Number(list[0].depart_date.split("-")[1]); //当前操作月
      let monthListSet = new Set(this.monthList)
      list.forEach(element =>
        monthListSet.add(element.depart_date.split("-")[1])
      );
      this.monthList = [...monthListSet]; //获取可选月份列表
      this.getList();
    },
    getList() {
      //获取完整当月列表
      this.list = []
      //当月数据
      this.currentList = this.originList.filter(i => i.depart_date.split("-")[1] == this.month)
      this.lastDate = this.getMonthLastDate(this.year, this.month);
      this.firstDateWeek = this.getFirstDateWeek(this.year, this.month);
      
      //填充空白
      for (let i = 0;i < this.firstDateWeek;++i ) {
        this.list.push( {depart_date: "",price: ""} );
      }

      for (let i = 1; i <= this.lastDate; i++) {
        //填充数据
        let data = this.currentList.find(item => item.depart_date.split("-")[2] == i)
        this.list.push({
          depart_date: `${this.year}-${(this.month < 10 ? "0" : "") + this.month}-${(i < 10 ? "0" : "") + i}`,
          // price: data? data.msg
          //     ? data.msg[0].peerPrice / 100
          //     : data.peerPrice / 100
          //   : ""
          price: data ? data.price : ''
        });
      }

      this.inite ? this.getFirstDay() : null;
    },
    getFirstDay() {
      //初始化首个可选数据
      this.firstData = this.list.filter(i => i.price)[0];
      this.date = this.firstData.depart_date;
      this.$emit("confirm", this.firstData.depart_date, this.firstData.price);
    },
    getMonthLastDate(year, month) {
      //获取当月最大天数
      return new Date(Date.parse(new Date(year, month, 1)) - 1).getDate();
    },
    getFirstDateWeek(year, month) {
      //获取首日星期
      if (this.isIos) {
        return new Date(year, month - 1, 1, "00", "00").getDay();
      } else return new Date(`${year}-${month}-1 00:00`).getDay();
    },
    getTimeStack(year, month, date) {
      //获取时间戳
      if (this.isIos) {
        return new Date(year, month - 1, date, "00", "00").getTime();
      } else return new Date(`${year}-${month}-${date} 00:00`).getTime();
    },
    changeMonth(type) {
      //月份改变时重置列表
      if (type == 1) {
        let preMonth = this.monthList[
          this.monthList.findIndex(i => this.month == i) - 1
        ];
        this.year -= preMonth > this.month ? 1 : 0;
        this.month = Number(preMonth);
      } else {
        let nextMonth = this.monthList[
          this.monthList.findIndex(i => this.month == i) + 1
        ];
        this.year += nextMonth < this.month ? 1 : 0;
        this.month = Number(nextMonth);
      }
      this.getList();
    },
    confirm(item) {
      if (item.price) {
        // this.date = item.depart_date;
        this.$emit("confirm", item.depart_date, item.price);
      }
    },
    isActive(item) {
      //判断是否激活
      let destStack = this.getTimeStack(
        item.depart_date.split("-")[0],
        item.depart_date.split("-")[1],
        item.depart_date.split("-")[2]
      );
      let nowStack = this.getTimeStack(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      );
      return destStack >= nowStack && item.price;
    },
    isSelected(item) {
      //判断是否选中
      return item.depart_date && item.depart_date == this.date;
    }
  }
}
</script>
<style scoped lang="less">
// @import "../../assets/less/mixins.less";
@base: #666;

.Calendar {
  width: 558px;
  background-color: #fff;
  header {
    font-weight: bold;
    section {
      text-align: center;
      position: relative;
      height: 70px;
      .month {
        font-size: 46px;
        margin: 0 14px;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        top: 2px;
      }
      .other {
        display: inline-block;
        vertical-align: middle;
        span {
          font-size: 14px;
          display: inline-block;
          margin: 0 2px 2px;
          border-bottom: 2px solid #e7e7e7;
        }
        p {
          font-size: 12px;
        }
      }
      i {
        position: absolute;
        width: 26px;
        height: 26px;
        svg {
          width: 100%;
          height: 100%;
        }
      }
      .icon-left {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
        svg {
          transform: rotate(180deg);
          color: #333;
        }
      }

      .icon-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        svg {
          color: #333;
        }
      }
    }
  }
  nav {
    width: 100%;
    padding: 10px 8px;
    border-top: 1px solid #DFE4E8;
    border-bottom: 1px solid #DFE4E8;
    span {
      font-size: 15px;
      text-align: center;
      display: inline-block;
      width: 14.28%;
      font-weight: bold;
      color: #919EAB;
      font-weight: 400;
    }
  }
  .main {
    color: #878787;
    padding: 6px 8px;
    cursor: no-drop;
    &::after {
      content: "";
      display: block;
      height: '';
      clear: both;
    }
    span {
      color: #bdbdbd;
      vertical-align: top;
      text-align: center;
      width: 14.28%;
      height: 55px;
      box-sizing: border-box;
      border: 1px solid transparent;
      position: relative;
      float: left;
      &.active {
        cursor: pointer;
        h4{
          color: #0FAAFE;
        }
      }
      &.selected {
        border: 1px solid #00A4FF;
        svg {
          position: absolute;
          bottom: 0;
          right: 0;
          color: #00A4FF;
          width: 15px;
          height: 15px;
        }
      }
      h4 {
        color: #212B35;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        padding-top: 5px;
      }
      p {
        width: 100%;
        line-height: 28px;
        color: #FF0000;
        font-size: 12px;
      }
    }
  }
}
</style>