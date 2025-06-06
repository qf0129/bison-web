<template>
  <div class="container" :style="{ maxWidth: maxWidth }" :class="{ padded: padded, widthLimit: widthLimit }">
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
  text: string;
  path?: string;
  name?: string;
  params?: RouteData;
  query?: RouteData;
};
defineProps({
  routes: { type: Array<NavRoute> },
  maxWidth: { type: String },
  widthLimit: { type: Boolean, default: true },
  padded: { type: Boolean, default: true },
});
</script>
<style lang="less" scoped>
.container {
  margin: auto;
  background-color: transparent;
  &.padded {
    padding: 16px;
  }
  &.widthLimit {
    max-width: 1600px;
  }
  .breadcrumb {
    padding-bottom: 16px;
    padding-left: 4px;
    background-color: transparent;
  }
}
</style>
