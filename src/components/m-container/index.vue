<template>
    <div class="container">
        <div v-if="routes?.length" class="breadcrumb">
            <t-breadcrumb maxItemWidth="150">
                <t-breadcrumbItem v-for="r in routes" :to="{ name: r.name, params: r.params, query: r.query }">
                    {{ r.text }}
                </t-breadcrumbItem>
            </t-breadcrumb>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
export type RouteData = { [key: string]: string | string[] };
export type NavRoute = {
    text: string
    path?: string
    name?: string
    params?: RouteData
    query?: RouteData
}
defineProps({
    routes: {
        type: Array<NavRoute>,
    },
});
</script>
<style lang="less" scoped>
.container {
    background-color: transparent;
    padding: 16px;

    .breadcrumb {
        padding-bottom: 16px;
        padding-left: 4px;
        background-color: transparent;
    }

    .content {
        padding-bottom: 50px;
    }
}
</style>