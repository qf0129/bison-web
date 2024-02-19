<template>
  <m-card title="Images" padded bodyHeight="240px" refreshBtn :refreshBtnLoading="loading" @refresh="requestData">
    <template #action>
      <t-space>
        <BuildBtn :appId="appId" @onSubmit="onSubmit" ref="buildBtn" />
      </t-space>
    </template>
    <t-table v-if="items.length" hover row-key="id" :data="items" :columns="columns" size="small" @page-change="onPageChange">
      <template #customStatus="{ col, row }">
        <t-tag v-if="row[col.colKey] === 'running'" variant="light">Running</t-tag>
        <t-tag v-else-if="row[col.colKey] === 'success'" theme="primary" variant="light">Success</t-tag>
        <t-tooltip v-else-if="row[col.colKey] === 'failed'" :content="row.err_msg" theme="light">
          <t-tag theme="danger" variant="light">
            <template #icon>
              <ErrorCircleIcon />
            </template>
            Fail
          </t-tag>
        </t-tooltip>
      </template>
    </t-table>
    <m-empty v-else @create="buildBtn.show()" hideText createBtnText="Build Image" />
  </m-card>
</template>

<script setup lang="ts">
import { Image } from "@/type/types";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { GetMyAppImages } from "@/api/my";
import BuildBtn from "./build.vue";
import { ErrorCircleIcon } from "tdesign-icons-vue-next";

const route = useRoute();
const appId = route.params.appId as string;
const buildBtn = ref();

const columns = ref([
  { colKey: "tag", title: "Version", width: 180, ellipsis: true },
  { colKey: "repo_branch", title: "Branch" },
  { colKey: "desc", title: "Desc", ellipsis: true },
  { colKey: "ports", title: "Ports" },
  { colKey: "build_time", title: "UseSeconds", width: 100 },
  { colKey: "status", title: "Status", cell: "customStatus" },
  { colKey: "ctime", title: "Ctime", width: 250, ellipsis: true },
]);

const pageNum = ref(1);
const pageSize = ref(5);
const total = ref(0);

const items = ref<Array<Image>>([]);
const loading = ref(false);
const requestData = () => {
  loading.value = true;
  GetMyAppImages(appId, { page_num: pageNum.value, page_size: pageSize.value, "ctime:ob": "desc" })
    .then((resp) => {
      if (resp.code === 0) {
        items.value = resp.data?.list || [];
        total.value = resp.data.total;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const onSubmit = () => {
  requestData();
};
const onPageChange = () => {
  requestData();
};
onMounted(() => {
  requestData();
  setInterval(() => {
    requestData();
  }, 10000);
});
</script>

<style lang="less" scoped></style>
