<template>
  <div class="appHeader">
    <m-container widthLimit :padded="false">
      <div>
        <h3>{{ props.app?.name }}</h3>
      </div>
      <div class="appDesc">{{ props.app?.desc || "-" }}</div>
    </m-container>
  </div>
</template>

<script setup lang="ts">
import { App } from "@/type/types";

const props = defineProps<{
  app: App | undefined;
}>();
</script>

<style lang="less" scope>
.appHeader {
  padding: 10px;

  .appDesc {
    padding: 5px;
    margin-top: 10px;
    font-size: 0.9rem;
    color: var(--td-text-color-placeholder);
  }
}
</style>
