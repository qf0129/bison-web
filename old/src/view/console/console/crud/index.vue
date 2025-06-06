<template>
    <m-crud-table :model="models[route.params.model as string]" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import models from '@/type/models.ts';
const route = useRoute()
</script>