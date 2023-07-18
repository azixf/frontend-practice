<template>
  <el-table :data="data" v-bind="$attrs" style="width: 100%">
    <template v-for="column in columnList">
      <el-table-column v-bind="column">
        <template
          #default="scope"
          v-if="!column.type || column.type === 'expand'"
        >
          <slot v-if="column.slot" :name="column.slot" v-bind="scope"></slot>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
        <template #header="scope">
          <slot
            v-if="column.headerSlot"
            :name="column.headerSlot"
            v-bind="scope"
          ></slot>
          <span v-else>
            {{ column.label }}
          </span>
        </template>
      </el-table-column>
    </template>
    <template v-for="slot in restSlots" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </el-table>
</template>

<script setup>
import { computed, nextTick, ref, useSlots, watch } from "vue";
import Sortable from "sortablejs";
import { cloneDeep } from "lodash-es";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  headerDraggable: {
    type: Boolean,
    default: false,
  },
});

const columnList = ref([]);

watch(
  props.columns,
  () => {
    columnList.value = props.columns;
    nextTick(() => {
      initDraggable();
    });
  },
  {
    immediate: true,
  }
);

function initDraggable() {
  if (props.headerDraggable) {
    Sortable.create(document.querySelector(".el-table__header tr"), {
      animation: 200,
      delay: 0,
      onEnd(evt) {
        const { oldIndex, newIndex } = evt;
        const temp = cloneDeep(columnList.value);
        const oldItem = temp.splice(oldIndex, 1)[0];
        temp.splice(newIndex, 0, oldItem);
        columnList.value = temp;
      },
    });
  }
}

const restSlots = computed(() => {
  const slots = useSlots();
  const slotNameList = Object.keys(slots);
  const arr = [];
  for (let i = 0; i < slotNameList.length; i++) {
    let flag = true;
    for (let j = 0; j < props.columns.length; j++) {
      if (
        [props.columns[j].slot, props.columns[j].headerSlot].includes(
          slotNameList[i]
        )
      ) {
        flag = false;
        break;
      }
    }
    flag && arr.push(slotNameList[i]);
  }
  return arr;
});
</script>

<style lang="scss" scoped></style>
