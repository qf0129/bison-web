<template>
  <t-button theme="primary" @click="show">BuildImage</t-button>
  <t-dialog v-model:visible="visible" header="Build" width="40%" :on-close="close" :on-confirm="onConfirm">
    <t-form :rules="rules" :data="form">
      <t-form-item name="branch" label="Branch">
        <t-auto-complete v-model="form.branch" :options="branchs" highlight-keyword :filterable="false" clearable />
      </t-form-item>
      <t-form-item name="desc" label="Desc">
        <t-textarea v-model="form.desc" placeholder="Description of this revision" clearable />
      </t-form-item>
      <t-form-item name="ports" label="Ports">
        <t-input v-model="form.ports" plplaceholder="Expose Ports" clearable />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Image } from "@/type/types";
import { CreateAppImage } from "@/api/my";
import { MessagePlugin } from "tdesign-vue-next";
import { GetMyAppImages } from "@/api/my";

const props = defineProps<{
  appId: string;
}>();

const emits = defineEmits(["onSubmit"]);

const form = ref({
  branch: "",
  desc: "",
  ports: "8080",
});

const rules = {
  branch: [{ required: true, message: "Please input branch", type: "error", trigger: "change" }],
  desc: [{ required: true, message: "Please input desc", type: "error", trigger: "change" }],
  ports: [{ pattern: /[0-9,]/, message: "Please input the exposed port numbers, separated by ','", type: "error", trigger: "change" }],
};

const visible = ref(false);

const onConfirm = () => {
  CreateAppImage(props.appId, form.value).then((resp) => {
    if (resp.code === 0) {
      MessagePlugin.success("Start building!");
      visible.value = false;
      emits("onSubmit");
    }
  });
};

const branchs = ref<Array<string>>([]);
const loadingBranchs = ref(false);
const requestImageBranchs = () => {
  loadingBranchs.value = true;
  GetMyAppImages(props.appId, { page_num: 1, page_size: 20, status: "success", "ctime:ob": "desc" })
    .then((resp) => {
      if (resp.code === 0) {
        resp.data?.list.forEach((item: Image) => {
          if (!branchs.value.includes(item.repo_branch)) {
            branchs.value.push(item.repo_branch);
          }
        });
      }
    })
    .finally(() => {
      loadingBranchs.value = false;
    });
};

const close = () => {};
const show = () => {
  visible.value = true;
};
onMounted(() => {
  requestImageBranchs();
});
defineExpose({ show });
</script>
