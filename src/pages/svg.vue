<template>
  <div class="page place-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="1000"
      height="800"
    >
      // 矩形
      <rect
        x="0"
        y="0"
        width="1000"
        height="800"
        fill="#ccc"
        fill-opacity="0.8"
        stroke="#000"
        stroke-width="4"
      ></rect>
      // 带圆角的矩形
      <rect
        x="200"
        y="20"
        rx="20"
        ry="20"
        width="160"
        height="100"
        fill="#ff2335"
        fill-opacity="0.8"
        stroke="#1980ff"
        stroke-width="4"
      ></rect>
      // 圆形
      <circle cx="70" cy="200" r="50" fill="#235623"></circle>
      // 椭圆
      <ellipse cx="80" cy="300" rx="60" ry="40" fill="#c56d23"></ellipse>
      // 线段
      <line
        x1="20"
        y1="370"
        x2="300"
        y2="370"
        stroke="#05ad47"
        stroke-width="6"
      ></line>

      // 折线
      <polyline
        points="20 380,20 420, 100 420,100 380, 160 380, 180 440, 220, 380"
        fill="none"
        stroke="#ef68b3"
        stroke-width="6"
      ></polyline>

      // 多边形: 与折线的区别是会自动闭合首位
      <polygon
        points="400 80, 480 160, 440 0, 410 160, 480 80"
        fill="#124e4b"
      ></polygon>

      // 路径
      <path
        d="M420 240 L600 240 L700 250 V 450 H500 Z"
        fill="none"
        stroke="#286043"
        stroke-width="7"
      ></path>
    </svg>
  </div>
</template>
<script setup>
defineOptions({
  name: "SVG",
});
</script>
<style scoped lang="scss"></style>
