<template>
    <div class="collapse-panel">
        <div class="collapse-panel-title" @click="visible = !visible">
            <CaretDownSmallIcon v-if="visible" />
            <CaretRightSmallIcon v-else />
            {{ title }}
        </div>
        <div class="collapse-panel-content" v-show="visible">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CaretRightSmallIcon, CaretDownSmallIcon } from 'tdesign-icons-vue-next';

defineProps({
    title: {
        type: String,
    }
})

const visible = ref(false)

</script>
<style lang="less" scoped>
.collapse-panel {
    margin-top: 20px;

    .collapse-panel-title {
        background-color: var(--td-gray-color-1);
        padding: 5px 10px;
        transition: all 0.3s;
        cursor: pointer;
        text-align: left;

        &:hover {
            background-color: var(--td-gray-color-2);
        }
    }

    .collapse-panel-content {
        padding: 20px 5px;
    }
}
</style>