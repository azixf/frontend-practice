<template>
  <div class="page">
    <div class="list">
      <div
        :class="[
          'list-item',
          {
            active: item.id === chooseModule?.id,
          },
        ]"
        v-for="(item, index) in topList"
        @click="edit(index)"
      >
        <div>{{ item.name }}</div>
        <el-popover :ref="setPopoverRef" placement="bottom" :width="160">
          <p>确定删除组件?</p>
          <div style="margin-top: 8px; text-align: right">
            <el-button size="small" text @click="delBtn(index, false)">
              取消
            </el-button>
            <el-button size="small" type="primary" @click="delBtn(index)">
              确定
            </el-button>
          </div>
          <template #reference>
            <el-icon>
              <Close />
            </el-icon>
          </template>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 动态ref数组
 */

import { onBeforeUpdate, ref, unref } from "vue";
import { Close } from "@element-plus/icons-vue";

defineOptions({
  name: 'elementplus弹窗 动态ref数组'
})

const chooseModule = ref({
  id: 1,
});

const topList = ref([
  {
    name: "test",
    id: 1,
  },
  {
    name: "test1",
    id: 2,
  },
  {
    name: "test2",
    id: 3,
  },
  {
    name: "test3",
    id: 4,
  },
]);

const popoverRefs = ref([]);

function setPopoverRef(el) {
  popoverRefs.value.push(el);
}

function delBtn(index, flag = true) {
  const popoverRef = popoverRefs.value[index];
  if (popoverRef) {
    unref(popoverRef)?.hide();
  }
  setTimeout(() => {
    if (flag) {
      topList.value.splice(index, 1);
    }
  }, 0);
}

function edit(index) {}

function hide(item) {}

onBeforeUpdate(() => {
  popoverRefs.value = [];
});
</script>

<style lang="scss" scoped>
.list {
  padding: 0 24px;
  &-item {
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    &:hover,
    &.active {
      background-color: #ddd;
    }
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
}
</style>
