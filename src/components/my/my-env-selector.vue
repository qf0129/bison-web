<template>
  <t-select
    v-model="value"
    filterable
    placeholder="Select env"
    :on-search="requestList"
    :loading="loading"
    :options="options"
    style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GetMyEnvs } from "@/api/my";

const options = ref<Array<any>>([]);
const value = ref("");
const loading = ref(false);
const requestList = (search: string) => {
  loading.value = true;
  GetMyEnvs({ "name:ct": search })
    .then((resp) => {
      options.value = [];
      if (resp.code === 0) {
        resp.data.list.forEach((item: any) => {
          options.value.push({
            value: item.id,
            label: item.title + "(" + item.name + ")",
          });
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(() => {
  requestList("");
});
</script>
