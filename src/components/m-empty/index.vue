<template>
    <t-row class="empty" align="center" justify="center">
        <span>{{ text }}</span>
        <t-button v-if="showRefresh" @click="onRefresh" shape="circle" theme="primary" variant="text">
            <template #icon>
                <RefreshIcon />
            </template>
        </t-button>
    </t-row>
</template>

<script setup lang="ts">
import { RefreshIcon } from 'tdesign-icons-vue-next';
defineProps({
    text: {
        type: String,
        default: "No Data",
    },
    showRefresh: {
        type: Boolean,
        default: true,
    }
})
// withDefaults(defineProps<{ text: String, showRefresh: Boolean }>(), { text: "No Data", showRefresh: true })
const emits = defineEmits(["refresh"])
const onRefresh = () => {
    emits("refresh")
}
</script>

<style lang="less" scoped>
.empty {
    padding: 20px;
    color: var(--td-text-color-disabled);

    span {
        padding: 0 10px;
    }
}
</style>