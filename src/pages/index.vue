<template>
  <div class="page">
    <h1>Frontend Practice</h1>
    <canvas id="canvas">
      该浏览器暂不支持canvas，推荐使用最新版的Chrome、Edge或者Firefox浏览器！
    </canvas>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  init();
});

function init() {
  const canvas = document.getElementById("canvas");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, width, height);
}
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  place-content: center;
  position: relative;

  #canvas {
    position: absolute;
    z-index: -1;
    pointer-events: none;
  }
}
</style>
