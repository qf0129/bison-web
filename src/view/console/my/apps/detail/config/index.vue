<template>
  <m-card title="Configs" padded refreshBtn @refresh="requestData" toggleBody>
    <template #action>
      <t-space>
        <my-env-radio @change="onChangeEnv" noAll @onLoadData="onLoadEnv" />
        <CreateBtn :appId="appId" @onSubmit="onSubmit" ref="createBtn" />
      </t-space>
    </template>

    <t-table
      v-if="items.length"
      row-key="id"
      :data="items"
      :columns="columns"
      size="small"
      bordered
      hover
      :pagination="{ defaultCurrent: 1, defaultPageSize: pageSize, total }"
      @page-change="onPageChange"
      :loading="loading"
    >
      <template #custom_desc="{ row, rowIndex }">
        <template v-if="row.edit_desc">
          <t-input v-model="row.desc" @enter="updateDesc(row, rowIndex)" @blur="updateDesc(row, rowIndex)" autofocus />
        </template>
        <t-row v-else @click="row.edit_desc = true" flex>
          <t-col flex="1">{{ row.desc }}</t-col>
          <t-col>
            <EditIcon color="#aaa" />
          </t-col>
        </t-row>
      </template>
      <template #custom_value="{ row, rowIndex }">
        <template v-if="row.edit_value">
          <t-select v-if="row.type == 'bool'" v-model="row.value" @change="updateRow(row, rowIndex)" @blur="updateRow(row, rowIndex)" autofocus>
            <t-option key="true" label="True" value="true" />
            <t-option key="false" label="False" value="false" />
          </t-select>
          <t-input v-else :type="row.type" v-model="row.value" @enter="updateRow(row, rowIndex)" @blur="updateRow(row, rowIndex)" autofocus />
        </template>
        <t-row v-else @click="row.edit_value = true" flex>
          <t-col flex="1">{{ row.value }}</t-col>
          <t-col>
            <EditIcon color="#aaa" />
          </t-col>
        </t-row>
      </template>
      <template #operation="{ row }">
        <t-popconfirm theme="danger" content="ConfirmDelete?" @confirm="deleteRow(row)" placement="left">
          <t-button variant="text" theme="danger" size="small">
            <template #icon>
              <DeleteIcon />
            </template>
          </t-button>
        </t-popconfirm>
      </template>
    </t-table>
    <m-empty v-else hideText createBtnText="Add Config" @create="createBtn.show()" />
  </m-card>
</template>
<script setup lang="ts">
import { Config } from "@/type/types";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { GetMyAppConfigs, UpdateConfigDesc, UpdateConfigValue, DeleteConfig } from "@/api/my";
import CreateBtn from "./create.vue";
import { EditIcon, DeleteIcon } from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";

const route = useRoute();
const appId = route.params.appId || "";
const selectedEnvId = ref("");
const createBtn = ref();

const columns = ref([
  { colKey: "key", title: "Key", width: 300 },
  { colKey: "custom_desc", title: "Desc" },
  { colKey: "type", title: "Type", width: 80 },
  { colKey: "custom_value", title: "Value" },
  { colKey: "utime", title: "UpdatedTime", width: 300 },
  { colKey: "operation", title: "Operation", width: 100 },
]);

const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

const items = ref<Array<Config>>([]);
const itemsBackup = ref<Array<Config>>([]);
const loading = ref(false);
function requestData() {
  loading.value = true;
  // var filters: any = { "key:ob": 'asc' }
  var params: any = { page_num: pageNum.value, page_size: pageSize.value };
  if (selectedEnvId.value) {
    params.env_id = selectedEnvId.value;
  }

  GetMyAppConfigs(appId, params)
    .then((resp) => {
      if (resp.code === 0) {
        items.value = resp.data?.list || [];
        itemsBackup.value = JSON.parse(JSON.stringify(items.value));
        total.value = resp.data.total;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
const updateDesc = (row: Config, rowIndex: number) => {
  row.edit_desc = false;
  if (!row.id || row.desc === itemsBackup.value[rowIndex].desc) {
    return;
  }
  UpdateConfigDesc(row.id, row.desc || "").then((_) => {
    MessagePlugin.success("Updated!");
    itemsBackup.value = JSON.parse(JSON.stringify(items.value));
  });
};
const updateRow = (row: Config, rowIndex: number) => {
  row.edit_value = false;
  if (row.value === itemsBackup.value[rowIndex].value) {
    return;
  }
  row.value = String(row.value);
  UpdateConfigValue(row.id || "", row.value).then((_) => {
    MessagePlugin.success("Updated!");
    itemsBackup.value = JSON.parse(JSON.stringify(items.value));
  });
};
const deleteRow = (row: Config) => {
  DeleteConfig(row.id || "").then((_) => {
    MessagePlugin.success("Deleted!");
    requestData();
  });
};

const onChangeEnv = (envId: string) => {
  selectedEnvId.value = envId;
  requestData();
};
const onLoadEnv = (envs: Array<any>) => {
  if (envs.length) {
    selectedEnvId.value = envs[0].id;
    requestData();
  }
};
const onSubmit = () => {
  requestData();
};
const onPageChange = (pageInfo: any) => {
  pageNum.value = pageInfo.current;
  pageSize.value = pageInfo.pageSize;
  requestData();
};

onMounted(() => {
  // requestData()
});
</script>

<style lang="less" scoped></style>
