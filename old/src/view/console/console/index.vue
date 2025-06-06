<template>
    <t-layout class="layoutRoot">
        <t-aside class="layoutAside" width="200px">
            <m-menu></m-menu>
        </t-aside>
        <t-content class="layoutContent">
            <m-transition-router-view />
        </t-content>
    </t-layout>
</template>

<style lang="less" scoped>
.layoutRoot {
    height: calc(100vh - var(--m-nav-height));
    overflow: hidden;

    .layoutContent {
        height: 100%;
        overflow: auto;

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
            transition: all 0.5s;
        }

        &:hover::-webkit-scrollbar-thumb {
            background-color: var(--td-brand-color-4);
        }

        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
    }
}
</style>