<template>
  <t-select
    v-model="value"
    filterable
    placeholder="Select image"
    :on-search="requestList"
    @focus="requestList('')"
    :loading="loading"
    :options="options"
    style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GetMyAppImages } from "@/api/my";

const props = defineProps({
  appId: {
    type: String,
    required: true,
  },
});

const options = ref<Array<any>>([]);
const value = ref("");
const loading = ref(false);
const requestList = (search: string) => {
  if (!props.appId) {
    return;
  }
  loading.value = true;
  GetMyAppImages(props.appId, { "tag:ct": search, status: "success", "ctime:ob": "desc" })
    .then((resp) => {
      options.value = [];
      if (resp.code === 0) {
        resp.data.list.forEach((item: any) => {
          options.value.push({
            value: item.id,
            label: item.tag + "(" + item.repo_branch + ")",
          });
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
