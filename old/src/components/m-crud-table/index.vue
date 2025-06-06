<template>
  <m-container>
    <m-card :title="model.title || model.name" padded shadow>
      <template #action>
        <t-space>
          <t-button @click="showEditor('')">New</t-button>
          <t-button @click="requestList" theme="default">Refresh</t-button>
        </t-space>
      </template>
      <t-table row-key="id" :data="tableData" :columns="columnsInfo" :loading="loadingList">
        <template #operation="{ row }">
          <t-space>
            <t-link theme="primary" @click="showEditor(row.id)">Edit</t-link>
            <t-popconfirm content="ConfirmDelete?" @confirm="deleteRequest(row.id)" theme="danger">
              <t-link theme="danger">Delete</t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </t-table>
      <t-pagination
        :total="total"
        v-model="pageNum"
        v-model:pageSize="pageSize"
        @change="onPageChange"
        @page-size-change="onPageSizeChange"
        style="margin-top: 10px"
      />
    </m-card>
    <t-drawer
      v-model:visible="editorVisible"
      :header="modelId ? 'Edit' : 'New'"
      :on-close="onCloseEditor"
      :on-confirm="onConfirmEditor"
      :close-btn="true"
      size="50%"
    >
      <t-form v-if="model.columns?.length" ref="editForm" @submit="onSubmitForm" :data="formData" labelWidth="120px" labelAlign="left" :rules="model.rules">
        <template v-for="col in model.columns">
          <t-form-item v-if="col.edit !== false" :label="col.title" :name="col.key">
            <t-select v-if="col.type === 'select'" v-model="formData[col.key]">
              <t-option v-for="val in col.select" :value="val" :label="col.labels[val] || val" />
            </t-select>
            <t-input v-else-if="col.type === 'string'" v-model="formData[col.key]" />
            <t-input-number v-else-if="col.type === 'number'" v-model="formData[col.key]" />
            <t-textarea v-else-if="col.type === 'text'" v-model="formData[col.key]" :autosize="{ minRows: 3, maxRows: 20 }" />
          </t-form-item>
        </template>
      </t-form>
    </t-drawer>
  </m-container>
</template>

<script setup lang="ts">
import { CrudGet, CrudPost, CrudPut, CrudDelete } from "../../api/crud";
import { onMounted, ref, PropType } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import { BaseTableCol } from "tdesign-vue-next";
import { Model } from "./type";

const props = defineProps({
  model: { type: Object as PropType<Model>, required: true },
});

const formData = ref<any>({});
const columnsInfo = ref<Array<BaseTableCol>>([]);
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);

const tableData = ref<any>([]);
const loadingList = ref(false);
const requestList = () => {
  loadingList.value = true;
  CrudGet(props.model.name || "", { page_num: pageNum.value, page_size: pageSize.value, filter: {} })
    .then((resp) => {
      if (resp.code === 0) {
        tableData.value = [];
        resp.data?.list.forEach((row: any) => {
          Object.keys(row).forEach((key) => {
            props.model.columns.forEach((col: any) => {
              if (key === col.key && col.labels) {
                row[key] = col.labels[row[key]];
              }
            });
          });
          tableData.value.push(row);
        });
        total.value = resp.data.total;
      }
    })
    .finally(() => {
      loadingList.value = false;
    });
};

const onPageChange = (val: any) => {
  pageNum.value = val.current;
  requestList();
};
const onPageSizeChange = (val: number) => {
  pageSize.value = val;
  requestList();
};

const loadingOne = ref(false);
const requestOne = () => {
  loadingOne.value = true;
  CrudGet(props.model.name, { id: modelId.value })
    .then((resp) => {
      if (resp.code === 0 && resp.data?.list.length) {
        for (const k in formData.value) {
          formData.value[k] = resp.data?.list[0][k] || "";
        }
      }
    })
    .finally(() => {
      loadingOne.value = false;
    });
};

const initColumnsInfo = () => {
  props.model.columns?.forEach((col) => {
    if (col.show !== false) {
      columnsInfo.value.push({ colKey: col.key, title: col.title, ellipsis: col.ellipsis });
    }
  });
  columnsInfo.value.push({ colKey: "operation", title: "Operation", fixed: "right" });
};

const resetFormData = () => {
  props.model.columns?.forEach((col) => {
    if (col.edit !== false) {
      formData.value[col.key] = col.default || "";
    }
  });
};

const modelId = ref<string>("");
const editorVisible = ref(false);
const showEditor = (id: string) => {
  editorVisible.value = true;
  modelId.value = id;
  requestOne();
};

const onSubmitForm = ({ validateResult }: { validateResult: boolean; firstError: any }) => {
  if (validateResult === true) {
    if (modelId.value) {
      updateRequest();
    } else {
      createRequest();
    }
  }
};

const createRequest = () => {
  CrudPost(props.model.name, [formData.value]).then((resp) => {
    if (resp.code === 0) {
      requestList();
      MessagePlugin.success("Created!");
      onCloseEditor();
    }
  });
};

const updateRequest = () => {
  CrudPut(props.model.name, modelId.value, formData.value).then((resp) => {
    if (resp.code === 0) {
      requestList();
      MessagePlugin.success("Created!");
      onCloseEditor();
    }
  });
};

const deleteRequest = (id: string) => {
  CrudDelete(props.model.name, id).then((resp) => {
    if (resp.code === 0) {
      MessagePlugin.success("Deleted!");
      requestList();
      onCloseEditor();
    }
  });
};

const editForm = ref();
const onConfirmEditor = () => {
  editForm.value.submit();
};

const onCloseEditor = () => {
  editorVisible.value = false;
  modelId.value = "";
  resetFormData();
};

onMounted(() => {
  initColumnsInfo();
  resetFormData();
  requestList();
});
</script>
