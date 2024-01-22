<template>
    <t-button theme="primary" @click="visible = true">Add</t-button>
    <t-dialog v-model:visible="visible" header="AddConfig" width="60%" :on-close="onClose" :on-confirm="onConfirm">
        <t-table :data="configs" :columns="columns" row-key="id" bordered size="small">
            <template #custom_key="{ row }">
                <t-input v-model="row.key" placeholder="Key" @enter="addRow" autofocus />
            </template>
            <template #custom_desc="{ row }">
                <t-input v-model="row.desc" placeholder="Desc" @enter="addRow" />
            </template>
            <template #custom_type="{ row }">
                <t-select v-model="row.type">
                    <t-option key="text" label="Text" value="text" />
                    <t-option key="number" label="Number" value="number" />
                    <t-option key="bool" label="Bool" value="bool" />
                </t-select>
            </template>
            <template #custom_value="{ row }">
                <t-select v-if="row.type == 'bool'" v-model="row.value">
                    <t-option key="true" label="True" value="true" />
                    <t-option key="false" label="False" value="false" />
                </t-select>
                <t-input v-else :type="row.type" v-model="row.value" placeholder="Value" @enter="addRow" />
            </template>
            <template #operation="{ rowIndex }">
                <t-button variant="text" @click="delRow(rowIndex)">
                    <template #icon>
                        <DeleteIcon color="red" />
                    </template>
                </t-button>
            </template>
        </t-table>
        <div style="text-align: center;margin-top: 20px;">
            <t-button @click="addRow" variant="dashed" theme="default">
                <template #icon>
                    <PlusIcon />
                </template>Add
            </t-button>
        </div>
    </t-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CreateConfigs } from '@/api/my'
import { Config } from '@/type/types';
import { DeleteIcon, PlusIcon } from 'tdesign-icons-vue-next';

const visible = ref(false);

const props = defineProps<{
    appId: string | string[]
}>()

const columns = ref([
    { colKey: 'custom_key', title: 'Key', width: 300 },
    { colKey: 'custom_desc', title: 'Desc' },
    { colKey: 'custom_type', title: 'Type', width: 160 },
    { colKey: 'custom_value', title: 'Value' },
    { colKey: 'operation', title: 'Operation', width: 100 },
])

const emits = defineEmits(["onSubmit"])
const configs = ref<Array<Config>>([])

const onConfirm = () => {
    CreateConfigs(props.appId, configs.value).then(resp => {
        if (resp.code === 0) {
            visible.value = false;
            reset()
            emits("onSubmit")
        }
    })
}
const addRow = () => {
    configs.value.push({ key: "", value: "", type: "text", desc: "" })

}
const delRow = (i: number) => {
    configs.value.splice(i, 1)
}
const onClose = () => {
    reset()
}
const reset = () => {
    configs.value = [{ key: "", value: "", type: "text", desc: "" }]
}
onMounted(() => {
    reset()
})
</script>
  