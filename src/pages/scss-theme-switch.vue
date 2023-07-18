<template>
  <div class="page place-center">
    scss主题切换

    <el-row>
      <el-button type="primary" @click="changeTheme('default')"
        >default</el-button
      >
      <el-button type="success" @click="changeTheme('dark')">dark</el-button>
      <el-button type="info" @click="changeTheme('brown')">brown</el-button>
    </el-row>
  </div>
</template>

<script setup>
defineOptions({
  name: "scss多主题",
});

function changeTheme(theme) {
  document.body.setAttribute("data-theme", theme);
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  @include themeify {
    background: themed("color-primary");
    color: themed("color-text");
  }
  .el-row {
    position: fixed;
    bottom: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
