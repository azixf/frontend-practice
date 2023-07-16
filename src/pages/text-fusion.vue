<template>
  <div class="page place-center">
    <h1 align="center">Text Fusion Effect</h1>
  </div>
</template>
<script lang="ts">
export default {
  name: "文字融合",
};
</script>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.page {
  background: rgba(0, 0, 0, 1);
  font-size: 50px;
  filter: contrast(30);
  > h1 {
    color: #ffffff;
    animation: fusion ease 2.2s forwards; 
  }
  
  @keyframes fusion {
    from {
      letter-spacing: -22px;
      filter: blur(10px);
    }
    to {
      letter-spacing: 10px;
      filter: blur(0);
    }
  }
}
</style>
