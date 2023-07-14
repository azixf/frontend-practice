<!--
 * @Author: azixf xief954@tydic.com
 * @Date: 2023-07-14 20:53:22
 * @LastEditors: azixf xief954@tydic.com
 * @LastEditTime: 2023-07-14 21:18:44
 * @FilePath: \frontend-practice\src\pages\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page">
    <ul>
      <li v-for="item in pageList" @click="goToPage(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const pageList = ref([]);

onBeforeMount(() => {
  init();
});

function init() {
  const pages = import.meta.glob("@/pages/*.vue");
  Object.entries(pages).forEach(([path, page]) => {
    page().then(res => {
      pageList.value.push({
        name: res.default?.name || getComponentName(path),
        filename: getComponentName(path),
      });
    });
  });
}

const router = useRouter();
function goToPage(page) {
  router.push(page.filename);
}

function getComponentName(path) {
  return path.split(".")[0].split("/").at(-1);
}
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  padding: 16px;
  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    li {
      height: 10vh;
      background-color: #ddd;
      border-radius: 8px;
      display: grid;
      place-content: center;
      cursor: pointer;
      &:hover {
        filter: drop-shadow(2px 2px 10px #ccc);
      }
    }
  }
}
</style>
