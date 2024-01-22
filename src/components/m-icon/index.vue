<template>
    <svg class="iconfont" aria-hidden="true">
        <use :xlink:href="'#' + name" />
    </svg>
</template>

<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.iconfont {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    color: inherit;
}
</style>