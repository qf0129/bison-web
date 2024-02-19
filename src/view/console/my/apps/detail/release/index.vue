<template>
  <m-card title="Releases" padded refreshBtn @refresh="refresh" :refreshBtnLoading="loadingList" toggleBody>
    <template #action>
      <t-space>
        <my-env-radio v-model="selectedEnvId" @change="refresh" />
        <PublishBtn :appId="appId" :envId="selectedEnvId" @onSubmit="onPublish" ref="publishBtn" />
      </t-space>
    </template>
    <t-table v-if="releases.length" row-key="id" hover :data="releases" :columns="columns" :selectOnRowClick="true" @onRowClick="onRowClick">
      <template #operation="{ row }">
        <t-button theme="primary" variant="text" @click="clickRelease(row)">View</t-button>
      </template>
      <template #custom_domain="{ row }">
        <t-tooltip :content="row.domain_prefix + '.' + row.domain.content">
          <t-link :href="'http://' + row.domain_prefix + '.' + row.domain.content" theme="primary" target="_blank"><Link1Icon /></t-link>
        </t-tooltip>
      </template>
      <template #custom_status="{ row }">
        <t-space>
          <t-tag
            v-if="row.deployment_status"
            :theme="row.deployment_status.availableReplicas === row.deployment_status.replicas ? 'success' : 'warning'"
            variant="light"
          >
            {{ row.deployment_status.availableReplicas || 0 }} / {{ row.deployment_status.replicas }}
          </t-tag>
          <t-tooltip v-if="row.err_msg" :content="row.err_msg" theme="light">
            <ErrorCircleIcon color="red" />
          </t-tooltip>
        </t-space>
      </template>
    </t-table>
    <m-empty v-else @create="publishBtn.show()" hideText createBtnText="Publish App" />
  </m-card>
</template>

<script setup lang="ts">
import { Release, DeploymentStatus } from "@/type/types";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { GetMyAppReleases, GetMyAppReleasesStatus } from "@/api/my";
import { ErrorCircleIcon, Link1Icon } from "tdesign-icons-vue-next";
import PublishBtn from "./publish.vue";
import router from "@/router";

const route = useRoute();
const appId = route.params.appId as string;
const selectedEnvId = ref("");
const publishBtn = ref();

const columns = ref([
  { colKey: "env.title", title: "Env" },
  { colKey: "name", title: "ReleaseName", width: 300 },
  { colKey: "image.repo_branch", title: "RepoBranch" },
  { colKey: "ctime", title: "Ctime", width: 300 },
  { colKey: "creator.username", title: "Creator" },
  { colKey: "custom_status", title: "Status" },
  { colKey: "custom_domain", title: "Domain" },
  { colKey: "operation", title: "Operation" },
]);

const releases = ref<Array<Release>>([]);
const loadingList = ref(false);
const requestData = () => {
  loadingList.value = true;
  var params: any = { "ctime:ob": "desc", preload: "app,creator,image,env,domain", page_size: 100 };
  if (selectedEnvId.value) {
    params.env_id = selectedEnvId.value;
  }
  GetMyAppReleases(appId, params)
    .then((resp) => {
      if (resp.code === 0) {
        releases.value = resp.data?.list || [];
      }
    })
    .finally(() => {
      loadingList.value = false;
      mergeStatus();
    });
};

const releasesStatus = ref<{ [key: string]: DeploymentStatus }>({});
const loadingStatus = ref(false);
const requestStatus = () => {
  loadingStatus.value = true;
  GetMyAppReleasesStatus(appId)
    .then((resp) => {
      if (resp.code === 0) {
        releasesStatus.value = resp.data;
      }
    })
    .finally(() => {
      loadingStatus.value = false;
      mergeStatus();
    });
};

const mergeStatus = () => {
  if (!loadingList.value && !loadingStatus.value) {
    releases.value.forEach((rls: Release) => {
      rls.deployment_status = releasesStatus.value[rls.name];
    });
  }
};

const refresh = () => {
  requestData();
  requestStatus();
  // releases.value.forEach((rls: Release) => {
  //     rls.deployment_status = releasesStatus.value[rls.name]
  // })
};

const onPublish = (releaseId: string) => {
  router.push({ name: "release_detail", params: { releaseId: releaseId } });
};
const clickRelease = (release: Release) => {
  router.push({ name: "release_detail", params: { releaseId: release.id } });
};
const onRowClick = ({ row }: { row: any }) => {
  router.push({ name: "release_detail", params: { releaseId: row.id } });
};
onMounted(() => {
  refresh();
  setInterval(() => {
    refresh();
  }, 5000);
});
</script>

<style lang="less" scoped></style>
