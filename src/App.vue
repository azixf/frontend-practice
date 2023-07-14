<!--
 * @Author: azixf xief954@tydic.com
 * @Date: 2023-07-14 20:53:22
 * @LastEditors: azixf xief954@tydic.com
 * @LastEditTime: 2023-07-14 21:23:48
 * @FilePath: \frontend-practice\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
