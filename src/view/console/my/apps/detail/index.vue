<template>
  <router-view v-if="route.meta.hideParentView" />
  <m-container v-else class="appInfo" :routes="[{ text: 'MyApps', name: 'my_apps_list' }, { text: app?.name }]">
    <!-- <div class="header">
            <div class="name">{{ app?.name }}</div>
        </div> -->
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
    <!-- <t-tabs :default-value="route.name" v-model="seletedTab" @change="onChangeTab">
      <t-tab-panel value="info" label="Info">
        <Info :app="app" />
      </t-tab-panel>
      <t-tab-panel value="images" label="Images">
        <Image />
      </t-tab-panel>
      <t-tab-panel value="configs" label="Configs">
        <Config />
      </t-tab-panel>
      <t-tab-panel value="releases" label="Releases">
        <Release />
      </t-tab-panel>
    </t-tabs> -->
  </m-container>
</template>

<script setup lang="ts">
import { GetMyApps } from "@/api/my";
import { ref, onMounted } from "vue";
import { App } from "@/type/types";
import { useRoute, useRouter } from "vue-router";
import Info from "./info/index.vue";
import Image from "./image/index.vue";
import Release from "./release/index.vue";
import Config from "./config/index.vue";

const route = useRoute();
const router = useRouter();

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

function onChangeTab(tabName: any) {
  let newQuery = { ...route.query };
  newQuery.tab = tabName;
  router.replace({ query: newQuery });
  // router.push({ name: tabName })
}
</script>

<style lang="less" scope>
.t-tabs__nav--card {
  background-color: #f7f7f7;
}

.appInfo {
  background-color: #aaa;
  padding: 5px 5px 0;

  .header {
    padding: 5px 10px;
    color: var(--td-text-color-secondary);
  }

  .name {
    font-size: 20px;
    margin: 0;
    // padding: 5px 0;
    color: var(--td-text-color-primary);
    font-weight: 550;
  }
}
</style>
