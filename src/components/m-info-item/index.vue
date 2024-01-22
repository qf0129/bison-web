<template>
    <tr>
        <td class="m-info-item-label">{{ label }}</td>
        <td class="m-info-item-value">
            <slot>
                {{ val }}
            </slot>
        </td>
    </tr>
</template>

<script setup lang="ts">
defineProps({
    label: String,
    val: String,
})
</script>

<style lang="less" >
</style>