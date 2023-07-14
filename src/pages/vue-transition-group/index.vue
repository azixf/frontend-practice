<template>
  <div class="page">
    <transition name="rotate">
      <div :key="activeIndex">
        <component v-for="comp in componentList" :is="comp"></component>
      </div>
    </transition>
    <el-button
      type="primary"
      @click="change"
      style="
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      "
      >change</el-button
    >
  </div>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import test1 from "../../components/vue-transition-group/test1.vue";
import test2 from "../../components/vue-transition-group/test2.vue";
import test3 from "../../components/vue-transition-group/test3.vue";

const components = [test1, test2, test3];
const componentList = shallowRef([test1]);
const activeIndex = ref(0);
function change() {
  if (activeIndex.value < 2) {
    activeIndex.value = activeIndex.value + 1;
  } else if (activeIndex.value === 2) {
    activeIndex.value = 0;
  }
  componentList.value = [components[activeIndex.value]];
}
</script>

<style lang="scss" scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.rotate-enter-from,
.rotate-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
