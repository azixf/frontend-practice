<template>
  <div id="container" class="page"></div>
</template>

<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";

defineOptions({
  name: "SVG地图",
});

onMounted(async () => {
  var chartDom = document.getElementById("container");
  var myChart = echarts.init(chartDom);
  var option;

  const svg = await fetch("/svg/background.svg").then((res) => res.text());
  echarts.registerMap("background", { svg: svg });
  option = {
    tooltip: {
      enterable: true, // 鼠标进入tooltip
      // valueFormatter: function (value) {
      //   return "数值： " + value;
      // }, // 数值格式化
      // formatter: function (params) {
      //   console.log("params: ", params);
      //   const { name, value, marker } = params;
      //   return marker + `<h1>${name}</h1><p>${value}</p>`;
      // },
    },
    visualMap: {
      show: false, // 是否显示
      left: "center",
      bottom: "10%",
      min: 0,
      max: 100,
      range: [0, 0], // 初始状态
      precision: 2, // 精度
      orient: "horizontal",
      text: ["100", "0"], // 两端的文本
      realtime: true, // 实时
      calculable: true,
      hoverLink: false, // 悬浮组件时图表对应范围高亮
      inRange: {
        color: ["#dbac00", "#db6e00", "#cf0000"],
      },
      // formatter: function (value) {
      //   return `value: ${value}`;
      // },
    },
    series: [
      {
        name: "Background",
        type: "map",
        map: "background",
        roam: true,
        emphasis: {
          label: {
            show: false,
          },
        },
        selectedMode: false,
        data: [
          { name: "Queue1", value: 0 },
          { name: "Queue2", value: 2 },
          { name: "Queue3", value: 4 },
          { name: "Queue4", value: 9 },
          { name: "Queue5", value: 15 },
          { name: "Queue6", value: 2 },
          { name: "Queue7", value: 100 },
          // { name: "Queue8", value: 50 },
          // { name: "Queue9", value: 20 },
          // { name: "Queue10", value: 60 },
          // { name: "Queue11", value: 80 },
          // { name: "Queue12", value: 15 },
          { name: "Queue13", value: 70 },
          { name: "Queue14", value: 25 },

          { name: "Queue101", value: 60 },
          { name: "Queue91", value: 20 },
          { name: "Queue92", value: 80 },
          { name: "Queue801", value: 99 },
        ],
      },
    ],
  };
  myChart.setOption(option);

  option && myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
#canvas {
  width: 1000px;
  height: 720px;
  border: 2px solid slateblue;
}
</style>
