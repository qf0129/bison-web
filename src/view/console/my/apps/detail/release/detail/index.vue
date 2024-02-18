<template>
  <m-container
    class="releaseInfo"
    :routes="[
      { text: 'MyApps', name: 'my_apps_list' },
      { text: app?.name, name: 'my_apps_detail', params: { appId: app?.id }, query: { tab: 'releases' } },
      { text: release?.name },
    ]"
  >
    <m-card title="ReleaseDetail" padded>
      <template #action>
        <div>
          <t-space>
            <Publish :appId="release?.app_id" :releaseId="release?.id" @onSubmit="requestRelease" />
            <t-popconfirm theme="danger" content="ConfirmOffline?" @confirm="offlineRequest" placement="left">
              <t-button variant="outline" theme="danger">Offline</t-button>
            </t-popconfirm>
          </t-space>
        </div>
      </template>
      <t-row>
        <t-col :span="6">
          <m-info>
            <m-info-item label="Name">{{ release?.name }}</m-info-item>
            <m-info-item label="Creator">{{ release?.creator?.username || "-" }}</m-info-item>
            <m-info-item label="Ctime">{{ release?.ctime }}</m-info-item>
            <m-info-item label="Config">
              <template v-if="release?.config_mode == 'json'">JSON ({{ release.config_path }})</template>
              <template v-else-if="release?.config_mode == 'env'">ENV</template>
              <template v-else>-</template>
            </m-info-item>
            <m-info-item label="Domain">
              <t-link :href="'http://' + release?.domain_prefix + '.' + release?.domain?.content" target="_blank" theme="primary">
                {{ release?.domain_prefix + "." + release?.domain?.content }}
              </t-link>
            </m-info-item>
          </m-info>
        </t-col>
        <t-col :span="6">
          <m-info
            :infos="[
              { key: 'Env', val: release?.env?.title + '(' + release?.env?.name + ')' },
              { key: 'AppName', val: app?.name },
              { key: 'ImageName', val: release?.image?.name },
              { key: 'ImageTag', val: release?.image?.tag },
              { key: 'ImageDesc', val: release?.image?.desc },
            ]"
          />
        </t-col>
      </t-row>
    </m-card>
    <Pods v-if="release" :release-id="release.id" ref="pods" />
  </m-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Release, App } from "@/type/types";
import { useRoute } from "vue-router";
import { GetMyAppReleases, GetMyApps } from "@/api/my";
import { OfflineRelease } from "@/api/my";
import { MessagePlugin } from "tdesign-vue-next";
import Pods from "./pods.vue";
import Publish from "../publish.vue";

const route = useRoute();
const appId = route.params.appId as string;
const releaseId = route.params.releaseId as string;

onMounted(() => {
  requestRelease();
});

const release = ref<Release>();
const app = ref<App>();
function requestRelease() {
  GetMyAppReleases(appId, { id: releaseId, preload: "image,domain,env", page_size: 1 }).then((resp) => {
    if (resp.code === 0) {
      release.value = resp.data?.list[0] || {};
      if (release.value?.app_id) {
        requestApp(release.value?.app_id);
      }
    }
  });
}
function requestApp(appId: string) {
  GetMyApps({ id: appId }).then((resp) => {
    app.value = resp.data?.list[0] || {};
  });
}
const offlineRequest = () => {
  OfflineRelease(releaseId as string).then((resp) => {
    if (resp.code === 0) {
      MessagePlugin.success("Submitted");
    }
  });
};
</script>

<style lang="less" scope>
.releaseInfo {
  background-color: transparent;
  padding: 5px 5px 0;

  .header {
    padding: 5px 10px;
    color: var(--td-text-color-secondary);
  }

  .name {
    font-size: 18px;
    margin: 0;
    // padding: 5px 0;
    color: var(--td-text-color-primary);
    font-weight: 550;
  }
}
</style>
