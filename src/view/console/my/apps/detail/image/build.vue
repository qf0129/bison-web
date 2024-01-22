<template>
    <t-button theme="primary" @click="visible = true">Build</t-button>
    <t-dialog v-model:visible="visible" header="Build" width="40%" :on-close="close" :on-confirm="onConfirmAnother">
        <t-form labelAlign="top">
            <t-form-item label="Branch">
            <t-input v-model="form.branch" plplaceholder="Branch"/>
            </t-form-item>
            <t-form-item label="Desc">
            <t-textarea v-model="form.desc" placeholder="Description of this revision" />
            </t-form-item>
        </t-form>
        <!-- <t-space direction="vertical" style="width: 100%">
            <t-input v-model="form.branch" plplaceholder="Branch" label="Branch" />
            <t-textarea v-model="form.desc" placeholder="Update content ..." label="Update content" />
        </t-space> -->
    </t-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { BuildImage } from '@/api/team'
import { MessagePlugin } from 'tdesign-vue-next';

const props = defineProps<{
    appId: string | string[]
}>()

const emits = defineEmits(["onSubmit"])

const form = ref({
    app_id: props.appId,
    branch: "",
    desc: ""
})

const visible = ref(false);

const onConfirmAnother = () => {
    BuildImage(form.value).then(resp => {
        if (resp.code === 0) {
            MessagePlugin.success("Build running!")
            visible.value = false;
            emits("onSubmit")
        }
    })
};
const close = () => {
};
</script>
  