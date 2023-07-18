<template>
  <div class="page">
    <custom-table
      :data="data"
      :columns="columns"
      header-draggable
      stripe
      border
      highlight-current-row
      @select="handleSelectionChange"
    >
      <template #header="{ column }">
        <span> {{ column.label }}(蒙奇.D) </span>
      </template>
      <template #level="{ row }">
        <span>{{ `${row.label} - ${row.level}` }}</span>
      </template>
      <template #empty>
        <span>哎呀，我没了~~~</span>
      </template>
      <template #append>
        <el-button type="success"> append slot </el-button>
      </template>
      <template #expand> expand </template>
      <template #label>
        <el-table-column label="阵营">
          <template #default="{ row }">
            <span>{{ row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="正邪">
          <template #default="{ row }">
            <el-tag>{{ row.label }}</el-tag>
          </template>
        </el-table-column>
      </template>
    </custom-table>
  </div>
</template>

<script setup>
import CustomTable from "@/components/custom-table/index.vue";
import { ref } from "vue";

defineOptions({
  name: "ElementPlus Table封装",
});

const data = ref([
  {
    label: "海军",
    name: "卡普",
    level: "中将",
  },
  {
    label: "海贼",
    name: "路飞",
    level: "四皇",
  },
  {
    label: "革命军",
    name: "龙",
    level: "首领",
  },
]);

const columns = ref([
  {
    type: "index",
    index: (idx) => {
      return idx + 1;
    },
  },
  {
    type: "selection",
  },
  {
    type: "expand",
    slot: "expand",
  },
  {
    prop: "label",
    label: "阵营",
    slot: "label",
  },
  {
    prop: "name",
    label: "名称",
    sortable: true,
    headerSlot: "header",
  },
  {
    prop: "level",
    label: "地位",
    slot: "level",
  },
]);

function handleSelectionChange(...data) {
  console.log(data);
}
</script>

<style lang="scss" scoped></style>
