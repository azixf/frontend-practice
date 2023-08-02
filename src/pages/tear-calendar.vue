<template>
  <div class="page">
    <el-space>
      <el-button type="success" @click="tear">撕掉</el-button>
      <el-button type="info" @click="refresh">重置</el-button>
    </el-space>
  </div>
</template>
<script setup>
import * as d3 from "d3";
import { onMounted } from "vue";

d3.timeFormatDefaultLocale({
  dateTime: "%x %A %X",
  date: "%Y年%-m月%-d日",
  time: "%H:%M:%S",
  periods: ["上午", "下午"],
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  shortDays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  months: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  shortMonths: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
});

defineOptions({
  name: "手撕日历",
});

const current = new Date();
let dataArray = null;
onMounted(() => {
  d3.select(".el-space")
    .style("position", "fixed")
    .style("bottom", "50px")
    .style("left", "50%")
    .style("transform", "translateX(-50%)");

  init();
});

function createCalendar() {
  const _svg = d3
    .select(".page")
    .append("svg")
    .style("position", "absolute")
    .style("left", "calc(50% - 150px)")
    .style("top", "calc(50% - 230px)")
    .style(
      "z-index",
      Number(
        10000 - d3.timeFormat("%Y")(current) - d3.timeFormat("%j")(current)
      )
    )
    .attr("width", "300")
    .attr("height", "460");

  _svg
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("stroke", "#964d22")
    .attr("stroke-width", 5)
    .attr("fill", "#f9e9cd");

  _svg
    .append("circle")
    .attr("fill", "#f8c387")
    .attr("stroke", "#e5a256")
    .attr("stroke-width", 7)
    .attr("cx", "50%")
    .attr("cy", "45%")
    .attr("r", "120");

  genText(_svg)
    .attr("fill", "#584717")
    .style("font-size", "26px")
    .attr("x", "40px")
    .attr("y", "25px")
    .text(current.getFullYear());

  genText(_svg)
    .attr("fill", "#132c33")
    .style("font-size", "42px")
    .attr("y", "12%")
    .text(d3.timeFormat("%B")(current));

  genText(_svg)
    .attr("fill", "#533c1b")
    .style("font-size", "160px")
    .style("font-weight", "bold")
    .attr("y", "50%")
    .attr("stroke-width", 5)
    .text(current.getDate());

  genText(_svg)
    .attr("fill", "#66462a")
    .style("font-size", "64px")
    .attr("y", "85%")
    .text(d3.timeFormat("%A")(current));
}

function genText(svg) {
  return svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("stroke", "#513c20")
    .attr("stroke-width", 1)
    .attr("x", "50%");
}

function tear() {
  dataArray.pop();
  d3.selectAll("svg")
    .sort(d3.ascending())
    .data(dataArray)
    .transition()
    .delay(function (_, i) {
      return i * 300;
    })
    .style(
      "transform",
      "rotateY(30deg) translate(-100px, 50px) skew(-10deg, 10deg) scale(1.2)"
    )
    .duration(800)
    .transition()
    .style(
      "transform",
      "rotateY(210deg) translateX(-650px) skew(310deg, 55deg) scale(0.2)"
    )
    .style("opacity", "0.6")
    .duration(2400)
    .transition()
    .style(
      "transform",
      "rotateY(145deg) translate(-650px, 180px) skew(180deg, 60deg) scale(0.1)"
    )
    .style("opacity", "0.1")
    .duration(800)
    .remove();

  preload();
}

function preload() {
  const preloadData = Array(7).fill(null);
  preloadData.map(() => {
    createCalendar();
    current.setDate(current.getDate() + 1);
    return current;
  });
  dataArray = [...preloadData, ...dataArray];
}

function init() {
  dataArray = Array(7).fill(null);
  dataArray.map(() => {
    createCalendar();
    current.setDate(current.getDate() + 1);
    return current;
  });
}

function refresh() {
  window.location.reload();
}
</script>
<style scoped lang="scss">
.page {
  position: relative;
}
</style>
