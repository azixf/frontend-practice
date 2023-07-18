<template>
  <div class="calendar">
    <div class="today"></div>
    <div class="start">
      <a :class="{ active: state.weekStart === 0 }" @click="setStart(0)"
        >周日起</a
      >
      <a :class="{ active: state.weekStart === 1 }" @click="setStart(1)"
        >周一起</a
      >
    </div>
    <div class="title">
      <input
        type="text"
        v-model="state.year"
        placeholder="阳历年"
        @blur="render"
      />
    </div>
    <div class="body">
      <ul v-for="month in state.months">
        <h3>{{ month.month }}月</h3>
        <li class="week" v-for="head in state.heads">
          {{ head }}
        </li>
        <li
          v-for="day in month.days"
          class="day-item"
          :class="{
            festival: day.isFestival,
            today: day.isToday,
            rest: day.isRest,
            other: !day.isCurrentMonth,
          }"
          :title="day.text"
        >
          {{ day.day }}
          <i>{{ day.text }}</i>
          <u v-if="day.isHoliday"> {{ day.isRest ? "休" : "班" }}</u>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Solar, SolarYear, HolidayUtil } from "lunar-typescript";

defineOptions({
  name: "日历",
});

const now = Solar.fromDate(new Date());

class Day {
  public day = "";
  public text = "";
  public isFestival = false;
  public isToday = false;
  public isHoliday = false;
  public isRest = false;
  public isCurrentMonth = false;
}

class Month {
  public month = 0;
  public days: Day[] = [];
}

const state = reactive({
  year: now.getYear(),
  weekStart: 0,
  heads: new Array<string>(),
  months: new Array<Month>(),
});

function buildDay(d: Solar, month: number) {
  const lunar = d.getLunar();
  const day = new Day();
  day.day = d.getDay() + "";
  let text = lunar.getDayInChinese();
  if (1 === d.getDay()) {
    text = lunar.getMonthInChinese() + "月";
  }
  let festivals = d.getFestivals();
  if (festivals.length > 0) {
    text = festivals[0];
    day.isFestival = true;
  }
  festivals = lunar.getFestivals();
  if (festivals.length > 0) {
    text = festivals[0];
    day.isFestival = true;
  }
  const jq = lunar.getJieQi();
  if (jq) {
    text = jq;
    day.isFestival = true;
  }
  day.text = text;
  if (d.toYmd() === now.toYmd()) {
    day.isToday = true;
  }
  const h = HolidayUtil.getHoliday(d.getYear(), d.getMonth(), d.getDay());
  if (h) {
    day.isHoliday = true;
    day.isRest = !h.isWork();
  }
  day.isCurrentMonth = d.getMonth() == month;
  return day;
}

function render() {
  const heads = ["日", "一", "二", "三", "四", "五", "六"];
  state.heads = heads
    .slice(state.weekStart)
    .concat(heads.slice(0, state.weekStart - 7));
  const year = SolarYear.fromYear(parseInt(state.year + "", 10));
  const months: Month[] = [];
  year.getMonths().forEach((m) => {
    const month = new Month();
    month.month = m.getMonth();
    const weeks = m.getWeeks(state.weekStart);
    weeks.forEach((w) => {
      w.getDays().forEach((d) => {
        month.days.push(buildDay(d, month.month));
      });
    });
    months.push(month);
  });
  state.months = months;
}

render();

function setStart(start: number) {
  state.weekStart = start;
  render();
}
</script>

<style lang="scss" scoped>
.calendar * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.calendar {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  width: 1110px;

  div.start {
    position: absolute;
    right: 20px;
    top: 20px;
    border: 1px solid #646cff;
    border-radius: 6px;

    a {
      padding: 5px;
      cursor: pointer;
    }

    a.active {
      background: #646cff;
      color: #ffffff;
    }
  }

  div.title {
    font-size: 15px;
    color: #606266;
    margin-bottom: 10px;

    input {
      border: 1px solid #d7d9e0;
      padding: 7px;
      border-radius: 6px;
      background: #ffffff;
      width: 100px;
      text-align: center;
      font-size: 20px;
    }
  }

  div.body {
    overflow: hidden;

    ul {
      position: relative;
      display: block;
      width: 350px;
      height: 334px;
      float: left;
      list-style: none;
      background-color: #fafafa;
      margin: 10px;

      h3 {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 80px;
        width: 100%;
        height: 334px;
        text-align: center;
        line-height: 334px;
        color: #333;
        opacity: 0.1;
        filter: alpha(opacity=10);
      }

      li {
        position: relative;
        float: left;
        width: 50px;
        height: 50px;
        cursor: default;
        color: #444;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        i {
          width: 100%;
          text-align: center;
          display: block;
          font-size: 9px;
          font-style: normal;
          color: #999999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        u {
          font-size: 9px;
          font-style: normal;
          text-decoration: none;
          position: absolute;
          right: 4px;
          top: 0;
          color: #333;
        }
      }

      li.week {
        height: 34px;
        line-height: 33px;
        font-size: 12px;
        color: #333333;
        border-bottom: 1px solid #e3e3e3;
      }

      li.rest {
        u {
          color: #5cb85c;
        }
      }

      li.festival {
        i {
          color: #d02f12;
        }
      }

      li.today {
        font-weight: bold;
        // color: #1f80a9;
        background-color: #ff7579;
        border-radius: 50%;
        color: #ffffff;

        i {
          // color: #1f80a9;
          color: #ffffff;
        }
      }

      li.other {
        opacity: 0.3;
      }
    }
  }
}
</style>
