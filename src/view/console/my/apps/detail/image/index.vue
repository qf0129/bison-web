<template>
  <div style="padding: 10px">
    <t-row style="padding: 10px 0">
      <t-col flex="1" justify="center">
        <t-space>
          <BuildBtn :appId="appId" @onSubmit="onSubmit" />
        </t-space>
      </t-col>
      <t-col>
        <t-button theme="default" @click="requestData" variant="text">
          <template #icon>
            <RefreshIcon />
          </template>
        </t-button>
      </t-col>
    </t-row>
    <t-table
      row-key="id"
      :data="items"
      :columns="columns"
      size="small"
      :pagination="{ defaultCurrent: 1, defaultPageSize: pageSize, total }"
      @page-change="onPageChange"
      :loading="loading"
    >
    </t-table>
  </div>
</template>

<script setup lang="ts">
import { Image } from "@/type/types";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { GetMyAppImages } from "@/api/my";
import BuildBtn from "./build.vue";
import { RefreshIcon } from "tdesign-icons-vue-next";

const route = useRoute();
const appId = route.params.appId || "";

const columns = ref([
  { colKey: "tag", title: "Version", width: 300, ellipsis: true },
  { colKey: "repo_branch", title: "RepoBranch" },
  { colKey: "desc", title: "Desc", ellipsis: true },
  { colKey: "build_time", title: "BuildSeconds" },
  { colKey: "status", title: "Status" },
  { colKey: "err_msg", title: "ErrMsg", width: 200, ellipsis: true },
  { colKey: "ctime", title: "Ctime", width: 250, ellipsis: true },
]);

const pageNum = ref(1);
const pageSize = ref(10);
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
});
</script>

<style lang="less" scoped></style>
