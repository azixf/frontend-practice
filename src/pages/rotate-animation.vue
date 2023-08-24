<template>
  <div class="water-box">
    <div class="spin-box">
      <div class="spin-content">
        <img
          src="/images/hongtong/flow-outer-bg.png"
          alt=""
          class="spin-outer"
        />
        <div class="spinner">
          <div class="line"></div>
        </div>
      </div>
      <div class="flow-box">
        <div class="value">{{ instFlow }}</div>
        <div class="label">m&#xB3;/h</div>
      </div>
    </div>
    <div class="data-box">
      <div class="flow-box">
        <div class="flow-content day">
          <div class="value">256.33</div>
          <div class="label">日流量</div>
        </div>
        <div class="flow-content month">
          <div class="value">25.63</div>
          <div class="label">月流量(万)</div>
        </div>
        <div class="flow-content year">
          <div class="value">336.78</div>
          <div class="label">年流量(万)</div>
        </div>
      </div>
      <div class="issue-box">
        <div class="issue-content" v-for="item in filterDevices">
          <div class="info-box">
            <svg>
              <text x="0" y="7" fill="#04dbfb" font-size="9">
                {{ item.label }}
              </text>
              <text x="0" y="16" fill="#ffffff" font-size="6">
                瞬时m&#xB3; /h
              </text>
            </svg>
          </div>
          <div class="value">{{ item.instFlow }}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="container" style="width: 100vw; height: 100vh"></div> -->
  <!-- <canvas id="canvas" width="400" height="200"></canvas> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

defineOptions({
  name: "旋转水球",
});

// const instFlow = ref(0);

// const filterDevices = [
//   {
//     label: "第一期",
//     instFlow: "325.33",
//   },
//   {
//     label: "第二期",
//     instFlow: "4566.25",
//   },
//   {
//     label: "第三期",
//     instFlow: "9878.46",
//   },
// ];

// onMounted(() => {
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;
//   const radius = 100;
//   const numTicks = 150;

//   function randomNumber(min = 5, max = 15) {
//     return Math.random() * (max - min) + min;
//   }

//   function drawClock() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // 绘制钟表外圆
//     ctx.beginPath();
//     // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//     // ctx.strokeStyle = "#000";
//     // ctx.lineWidth = 2;
//     // ctx.stroke();

//     // 绘制钟表刻度
//     for (let i = 0; i < numTicks; i++) {
//       const angle = (i * 2 * Math.PI) / numTicks;
//       const x1 = centerX + (radius - 20) * Math.cos(angle);
//       const y1 = centerY + (radius - 20) * Math.sin(angle);
//       const x2 = centerX + radius * Math.cos(angle);
//       const y2 = centerY + radius * Math.sin(angle);

//       ctx.beginPath();
//       ctx.moveTo(x1, y1);
//       ctx.lineTo(x2, y2);
//       ctx.strokeStyle = "#000";
//       ctx.lineWidth = 2;
//       ctx.stroke();
//     }
//     const x = 20;
//     for (let i = 0; i < numTicks; i++) {
//       const xx = randomNumber();
//       const angle = (i * 2 * Math.PI) / numTicks;
//       const x1 = centerX + (radius - x) * Math.cos(angle);
//       const y1 = centerY + (radius - x) * Math.sin(angle);
//       const x2 = centerX + (radius - xx) * Math.cos(angle);
//       const y2 = centerY + (radius - xx) * Math.sin(angle);

//       ctx.beginPath();
//       ctx.moveTo(x1, y1);
//       ctx.lineTo(x2, y2);
//       ctx.strokeStyle = "red";
//       ctx.lineWidth = 2;
//       ctx.stroke();
//     }
//   }

//   drawClock();
// });

// onMounted(async () => {
//   var dom = document.getElementById("container");
//   var myChart = echarts.init(dom);
//   var app = {};

//   var option;

//   var ROOT_PATH = "";

//   const data = await fetch("/demo.svg").then(res => res.text());

//   echarts.registerMap("seats", { svg: data });
//   const takenSeatNames = ["svg_2"];
//   option = {
//     geo: {
//       map: "seats",
//       roam: true,
//       selectedMode: "multiple",
//       layoutCenter: ["50%", "50%"],
//       layoutSize: "50%",
//       itemStyle: {
//         color: "#fff",
//       },
//       emphasis: {
//         itemStyle: {
//           color: undefined,
//           borderColor: "green",
//           borderWidth: 2,
//         },
//         label: {
//           show: true,
//         },
//       },
//       select: {
//         itemStyle: {
//           color: "green",
//         },
//         label: {
//           show: true,
//           textBorderColor: "#fff",
//           textBorderWidth: 2,
//         },
//       },
//       regions: makeTakenRegions(takenSeatNames),
//     },
//   };
//   function makeTakenRegions(takenSeatNames) {
//     var regions = [];
//     for (var i = 0; i < takenSeatNames.length; i++) {
//       regions.push({
//         name: takenSeatNames[i],
//         silent: true,
//         itemStyle: {
//           color: "#bf0e08",
//         },
//         emphasis: {
//           itemStyle: {
//             borderColor: "#aaa",
//             borderWidth: 1,
//           },
//           label: {
//             show: false,
//           },
//         },
//         select: {
//           itemStyle: {
//             color: "#bf0e08",
//           },
//           label: {
//             show: false,
//           },
//         },
//       });
//     }
//     console.log("regions", regions);
//     return regions;
//   }
//   myChart.setOption(option);
//   myChart.on("geoselectchanged", function (params) {
//     const selectedNames = params.allSelected[0].name.slice();
//     // Remove taken seats.
//     for (var i = selectedNames.length - 1; i >= 0; i--) {
//       if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
//         selectedNames.splice(i, 1);
//       }
//     }
//     console.log("selected", selectedNames);
//   });
//   if (option && typeof option === "object") {
//     myChart.setOption(option);
//   }
// });
// onMounted(async() => {
//   var ROOT_PATH = "https://echarts.apache.org/examples";

//   var chartDom = document.getElementById("container");
//   var myChart = echarts.init(chartDom);
//   var option;

//   const svg = await fetch("shang.svg").then(res => res.text())
//     echarts.registerMap("Beef_cuts_France", { svg: svg });
//     option = {
//       tooltip: {},
//       visualMap: {
//         left: "center",
//         bottom: "10%",
//         min: 5,
//         max: 100,
//         orient: "horizontal",
//         text: ["", "Price"],
//         realtime: true,
//         calculable: true,
//         inRange: {
//           color: ["#dbac00", "#db6e00", "#cf0000"],
//         },
//       },
//       series: [
//         {
//           name: "French Beef Cuts",
//           type: "map",
//           map: "Beef_cuts_France",
//           roam: true,
//           emphasis: {
//             label: {
//               show: false,
//             },
//           },
//           selectedMode: false,
//           data: [
//             { name: "Queue", value: 15 },
//           ],
//         },
//       ],
//     };
//     myChart.setOption(option);

//   option && myChart.setOption(option);
// });
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid #000;
}

.water-box {
  width: 800px;
  height: 200px;
  display: flex;
  gap: 4px;
  background-color: rgba(1, 47, 74);
  .spin-box {
    flex: 3;
    position: relative;
    .spin-content {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .spin-outer {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        height: 100%;
        animation: animate 18.6s cubic-bezier(0.26,-0.26, 0.76, 1.3) infinite;
      }

      .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: center;
        transform: translate(-50%, -50%);
        height: 70%;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 4px solid #18456f;
        animation: animate 2.4s linear infinite;
        .line {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          margin: -4px 0 0 -4px;
          transform-origin: center center;
          border: 4px solid transparent;
          border-top-color: #15e1fd;
          &::after {
            content: "";
            position: absolute;
            top: 12%;
            right: 10%;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #fff;
          }
        }
      }

      @keyframes animate {
        to {
          transform: translate(-50%, -50%) rotate(1turn);
        }
      }
    }

    .flow-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .value {
        font-size: 20px;
        font-weight: bold;
        color: #15e1fd;
        font-family: Bahnschrift;
      }
      .label {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  .data-box {
    flex: 4;
    display: flex;
    flex-direction: column;

    .flow-box {
      flex: 8;
      display: flex;
      gap: 5px;
      .flow-content {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .value {
          font-size: 16px;
          font-weight: normal;
          color: #fefefe;
          margin-bottom: 12px;
          font-family: Bahnschrift;
        }

        .label {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          transform: scale(0.8384);
        }
      }

      .day {
        background: url("/images/hongtong/flow-day-bg.png") no-repeat top/100%;
      }

      .month {
        background: url("/images/hongtong/flow-month-bg.png") no-repeat top/100%;
      }

      .year {
        background: url("/images/hongtong/flow-year-bg.png") no-repeat top/100%;
      }
    }

    .issue-box {
      flex: 3;
      display: flex;
      gap: 5px;
      .issue-content {
        width: v-bind(labelWidth);
        overflow: hidden;
        background: url("/images/hongtong/flow-issue-bg.png") no-repeat
          center/100%;

        display: flex;
        align-items: center;
        padding: 0 2px;
        gap: 4px;
        justify-content: space-between;
        .info-box {
          display: flex;
          flex-direction: column;
          flex: 1;
          svg {
            width: 100%;
            height: 20px;
            margin-left: 4px;
          }
        }
        .value {
          font-size: 12px;
          font-family: Bahnschrift;
          font-weight: normal;
          color: #eef5ff;
        }
      }
    }
  }
}
</style>
