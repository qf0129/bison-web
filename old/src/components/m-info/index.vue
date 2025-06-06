<template>
    <div v-if="title" class="infos-title">{{ title }}</div>
    <table class="infos-table" :class="{ small: size === 'small', large: size === 'large' }">
        <slot>
            <tr v-for="row in  infos ">
                <td class="m-info-item-label" :style="{ width: labelWidth ? labelWidth : 'auto' }">{{ row.key }}</td>
                <td class="m-info-item-value" :style="{ width: labelWidth ? 'auto' : '100%' }">
                    <template v-if="row.link">
                        <t-link :href="row.link" target="_blank" theme="primary">{{ row.val }}</t-link>
                    </template>
                    <template v-else>{{ row.val || "-" }}</template>
                </td>
            </tr>
        </slot>
    </table>
</template>

<script setup lang="ts">
type Row = {
    key: string
    val: any
    link: string
}
defineProps({
    title: String,
    infos: Array<Row>,
    labelWidth: String,
    size: String,
})
</script>

<style lang="less" >
.infos-title {
    font-size: 15px;
    padding: 10px 0;
    // border-bottom: 1px solid var(--td-gray-color-1);
}

.infos-table {
    width: 100%;
    border: none;
    border-collapse: collapse;
    // border: 1px solid #eee;


    .m-info-item-label {
        text-align: right;
        padding: 0 10px;
        color: var(--td-text-color-placeholder);
    }

    .m-info-item-value {
        width: 100%;
        color: var(--td-text-color-primary);
    }

    td {
        padding: 5px;
        // border-bottom: 1px solid var(--td-gray-color-1);
    }

    &.small {
        td {
            padding: 0 2px;
        }
    }

    &.large {
        td {
            padding: 10px;
        }
    }
}
</style>