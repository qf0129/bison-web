<template>
  <t-radio-group v-model="current" variant="default-filled" @change="onChange">
    <t-radio-button :value="item.id" v-for="item in items">{{ item.title || item.name }}</t-radio-button>
  </t-radio-group>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GetMyEnvs } from "@/api/my.ts";
import { Env } from "@/type/types";

const props = defineProps({
  noAll: { type: Boolean, required: false },
});

const emits = defineEmits(["onLoadData", "change"]);

const current = ref("");
const items = ref<Array<Env>>([]);
const loading = ref(false);
const requestList = () => {
  loading.value = true;
  GetMyEnvs({})
    .then((resp) => {
      if (resp.code === 0) {
        if (props.noAll) {
          items.value = resp.data.list;
        } else {
          items.value = [{ id: "", name: "All" }, ...resp.data.list];
        }
        if (items.value.length > 0) {
          current.value = items.value[0].id || "";
        }
      }
    })
    .finally(() => {
      emits("onLoadData", items.value);
      loading.value = false;
    });
};
const onChange = (v: string) => {
  emits("change", v);
};
onMounted(() => {
  requestList();
});
</script>
