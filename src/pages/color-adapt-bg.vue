<template>
  <div class="page place-center">
    <h1>文字适配背景</h1>
  </div>
</template>
<script setup>
defineOptions({
  name: "文字适配背景",
});
</script>
<style lang="scss" scoped>
.page {
  background-image: linear-gradient(
    to right,
    #000 0%,
    #000 50%,
    transparent 50%,
    transparent 100%
  );
  h1 {
    font-size: 30px;
    color: #ffffff;
    transition: transform 0.5s ease;
    mix-blend-mode: difference;
    &:hover {
      transform: translate(-50px);
    }
  }
}
</style>
