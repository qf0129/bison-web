<template>
  <t-select
    v-model="value"
    filterable
    placeholder="Select domain"
    @search="requestList"
    @focus="requestList('')"
    :loading="loading"
    :options="options"
    style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GetEnvDomains } from "@/api/my";

const props = defineProps({
  envId: { type: String, required: true },
});

const options = ref<Array<any>>([]);
const value = ref("");
const loading = ref(false);
const requestList = (search: string) => {
  loading.value = true;
  GetEnvDomains(props.envId, { "content:ct": search })
    .then((resp) => {
      options.value = [];
      if (resp.code === 0) {
        resp.data.list.forEach((item: any) => {
          options.value.push({
            value: item.id,
            label: item.content,
          });
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
// onMounted(() => {
//   requestList("");
// });
</script>
