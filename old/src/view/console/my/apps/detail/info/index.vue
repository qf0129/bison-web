<template>
  <m-card class="appInfo" title="AppInfo" padded bodyHeight="240px">
    <div>
      <label>Name</label> <span>{{ props.app?.name }}</span>
    </div>
    <div>
      <label>Desc</label> <span>{{ props.app?.desc }}</span>
    </div>
    <div>
      <label>GitUrl</label>
      <span>
        <t-link theme="primary" hover="color" :href="props.app?.git_url" target="_blank">{{ props.app?.git_url }}</t-link>
      </span>
    </div>
    <div>
      <label>GitPlatform</label> <span>{{ props.app?.git_platform }}</span>
    </div>
    <div>
      <label>Owners</label> <span>{{ props.app?.owners }}</span>
    </div>
    <div>
      <label>Developers</label> <span>{{ props.app?.developers }}</span>
    </div>
  </m-card>
</template>

<script setup lang="ts">
import { App } from "@/type/types";

const props = defineProps<{
  app: App | undefined;
}>();
</script>

<style lang="less" scope>
.appInfo {
  label {
    display: inline-block;
    text-align: right;
    width: 80px;
    height: 36px;
    color: #777;
    margin-right: 6px;
  }
}
</style>
