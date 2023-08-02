<template>
  <!-- ios滚动效果不佳 -->
  <div class="page place-center">fullscreen-scroll1</div>
  <div class="page place-center">fullscreen-scroll2</div>
  <div class="page place-center">fullscreen-scroll3</div>
  <div class="page place-center">fullscreen-scroll4</div>
</template>
<script setup>
defineOptions({
  name: "整屏滚动",
});
</script>
<style scoped lang="scss">
.page {
  scroll-snap-align: start;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  &:nth-of-type(1) {
    background-color: hsl(103, 80%, 28%);
  }
  &:nth-of-type(2) {
    background-color: hsl(20, 80%, 28%);
  }
  &:nth-of-type(3) {
    background-color: hsl(62, 80%, 28%);
  }
  &:nth-of-type(4) {
    background-color: hsl(201, 80%, 28%);
  }
}
</style>
