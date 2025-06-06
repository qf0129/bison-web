<template>
    <router-view v-slot="{ Component, route }">
        <m-transition>
            <component :is="Component" :key="route.path" />
        </m-transition>
    </router-view>
</template>