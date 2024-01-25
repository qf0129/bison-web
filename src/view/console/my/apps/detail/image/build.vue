<template>
  <t-button theme="primary" @click="show">BuildImage</t-button>
  <t-dialog v-model:visible="visible" header="Build" width="40%" :on-close="close" :on-confirm="onConfirmAnother">
    <t-form labelAlign="top">
      <t-form-item label="Branch">
        <t-input v-model="form.branch" plplaceholder="Branch" />
      </t-form-item>
      <t-form-item label="Desc">
        <t-textarea v-model="form.desc" placeholder="Description of this revision" />
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
});

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
