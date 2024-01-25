<template>
  <t-row class="emptyView" align="center" justify="center">
    <span v-if="!hideText">{{ text }}</span>
    <t-button v-if="showRefresh" @click="onRefresh" shape="circle" theme="primary" variant="text">
      <template #icon>
        <RefreshIcon />
      </template>
    </t-button>
    <t-button v-if="createBtnText" @click="onCreate" theme="primary" variant="dashed">
      <template #icon>
        <PlusIcon />
      </template>
      {{ createBtnText }}
    </t-button>
  </t-row>
</template>

<script setup lang="ts">
import { PlusIcon, RefreshIcon } from "tdesign-icons-vue-next";
defineProps({
  text: { type: String, default: "No Data" },
  hideText: { type: Boolean, default: false },
  showRefresh: { type: Boolean, default: false },
  createBtnText: { type: String, default: "" },
});
// withDefaults(defineProps<{ text: String, showRefresh: Boolean }>(), { text: "No Data", showRefresh: true })
const emits = defineEmits(["refresh", "create"]);
const onRefresh = () => {
  emits("refresh");
};
const onCreate = () => {
  emits("create");
};
</script>

<style lang="less" scoped>
.emptyView {
  padding: 16px;
  color: var(--td-text-color-disabled);

  span {
    padding: 0 10px;
  }
}
</style>
