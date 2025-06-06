<template>
    <t-menu class="m-menu" theme="light" width="200px" :collapsed="collapsed" :defaultExpanded="['basedata']"
        :default-value="route.name === 'crud' ? route.path.match(/\/([^/]+)\/$/)?.[1] : route.name">
        <template v-for="route in consoleRoutes?.children" :key="route.name">
            <t-menu-item v-if="!route.meta?.hideMenu" :value="route.name" @click="router.push({ name: route.name })">
                {{ route.name }}
            </t-menu-item>
        </template>

        <t-submenu value="basedata" title="BaseData">
            <t-menu-item v-for="obj, key in models" :key="key" :value="key" @click="router.push('/console/' + key + '/')">
                {{ obj.title }}
            </t-menu-item>
        </t-submenu>

    </t-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { baseRoutes } from '../../router/route'
import { useRouter, useRoute } from 'vue-router'
import models from '@/type/models';

const collapsed = ref(false)
const consoleRoutes = baseRoutes && baseRoutes[0] && baseRoutes[0].children && baseRoutes[0].children[0]
const router = useRouter()
const route = useRoute()
</script>