<template>
  <t-button theme="primary" @click="show">BuildImage</t-button>
  <t-dialog v-model:visible="visible" header="Build" width="40%" :on-close="close" :on-confirm="onConfirmAnother">
    <t-form :rules="rules" :data="form">
      <t-form-item name="branch" label="Branch">
        <t-input v-model="form.branch" plplaceholder="Branch" clearable />
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
import { ref } from "vue";
import { CreateAppImage } from "@/api/my";
import { MessagePlugin } from "tdesign-vue-next";

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
  branch: [{ required: true, message: "Please input branch", type: "error", trigger: "blur" }],
  desc: [{ required: true, message: "Please input desc", type: "error", trigger: "blur" }],
  ports: [{ pattern: /[0-9,]/, message: "Please input the exposed port numbers, separated by ','", type: "error", trigger: "blur" }],
};

const visible = ref(false);

const onConfirmAnother = () => {
  CreateAppImage(props.appId, form.value).then((resp) => {
    if (resp.code === 0) {
      MessagePlugin.success("Build running!");
      visible.value = false;
      emits("onSubmit");
    }
  });
};
const close = () => {};
const show = () => {
  visible.value = true;
};
defineExpose({ show });
</script>
