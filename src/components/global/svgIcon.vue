<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + '-' + name" :fill="color"></use>
  </svg>
</template>
<script setup>
defineOptions({
  name: "svgIcon",
});

defineProps({
  prefix: {
    type: String,
    default: "#icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  width: {
    type: String,
    default: "24px",
  },
  height: {
    type: String,
    default: "24px",
  },
});
</script>

<style lang="scss" scoped></style>
