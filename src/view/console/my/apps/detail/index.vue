<template>
  <router-view v-if="route.meta.hideParentView" />
  <m-container v-else :routes="[{ text: 'MyApps', name: 'my_apps_list' }, { text: app?.name }]">
    <t-row :gutter="[10, 10]">
      <t-col :span="4">
        <Info :app="app" />
      </t-col>
      <t-col :span="8">
        <Image />
      </t-col>
      <t-col :span="12">
        <Release />
      </t-col>
      <t-col :span="12">
        <Config />
      </t-col>
    </t-row>
  </m-container>
</template>

<script setup lang="ts">
import { GetMyApps } from "@/api/my";
import { ref, onMounted } from "vue";
import { App } from "@/type/types";
import { useRoute } from "vue-router";
import Info from "./info/index.vue";
import Image from "./image/index.vue";
import Release from "./release/index.vue";
import Config from "./config/index.vue";

const route = useRoute();

const appId = route.params.appId;
const seletedTab = ref("");

onMounted(() => {
  requestApp();
  seletedTab.value = route.query.tab?.toString() || "releases";
});

const app = ref<App>();
const loading = ref(false);
function requestApp() {
  loading.value = true;
  GetMyApps({ id: appId })
    .then((resp) => {
      app.value = resp.data?.list[0] || {};
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<style lang="less" scope></style>
