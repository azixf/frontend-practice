<template>
  <header class="header place-center" @click="$router.push('/')">
    frontend-practice
  </header>
  <router-view />
</template>

<script setup></script>

<style scoped>
.header {
  height: 60px;
  cursor: pointer;
  &:hover {
    color: rgb(161, 127, 255);
  }
}
</style>
