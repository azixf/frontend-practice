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
    grid-auto-rows: min-content;
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
