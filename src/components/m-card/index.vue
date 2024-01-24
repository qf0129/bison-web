<template>
  <div class="m-card">
    <div class="m-card-top-header">
      <div class="m-card-top-title" v-if="topTitle">{{ topTitle }}</div>
      <span style="flex: 1"></span>
      <div class="m-card-top-action">
        <slot name="top-action"></slot>
      </div>
    </div>
    <div
      class="m-card-main"
      :class="{ shadow: shadow, bordered: bordered, hover: hover }"
      :style="{ minHeight: minHeight, backgroundColor: transparent ? 'transparent' : 'white' }"
    >
      <div class="m-card-header" v-if="title">
        <div class="m-card-title" v-if="title">{{ title }}</div>
        <span style="flex: 1"></span>
        <div class="m-card-action">
          <slot name="action">
            <t-button v-if="refreshBtn" @click="onRefresh" theme="default" variant="text" shape="circle" style="color: #777">
              <template #icon>
                <RefreshIcon />
              </template>
            </t-button>
          </slot>
        </div>
      </div>
      <div class="m-card-body" :class="{ padded: padded }" :style="{ height: bodyHeight }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RefreshIcon } from "tdesign-icons-vue-next";

defineProps({
  title: { type: String },
  topTitle: { type: String },
  shadow: { type: Boolean, default: false },
  padded: { type: Boolean, default: false },
  bordered: { type: Boolean, default: false },
  refreshBtn: { type: Boolean, default: false },
  minHeight: { type: String, default: "" },
  bodyHeight: { type: String, default: "" },
  transparent: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
});
const emits = defineEmits(["refresh"]);

const onRefresh = () => {
  emits("refresh");
};
</script>

<style lang="less" scoped>
.m-card {
  .m-card-top-header {
    display: flex;
    align-items: center;

    .m-card-top-title {
      margin: 0;
      padding: 10px 0;
      font-size: 15px;
      font-weight: 550;
    }

    .m-card-top-action {
      text-align: right;
      padding: 10px;

      &:empty {
        padding: 0;
      }
    }
  }

  .m-card-main {
    transition: all 0.25s;
    // border-radius: 2px;
    background-color: #fff;
    // border: 1px solid var(--td-gray-color-2);

    &.shadow {
      // border: none;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 6px;
    }

    &.bordered {
      border: 1px solid var(--td-gray-color-2);
    }

    &.hover:hover {
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    .m-card-header {
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid var(--td-gray-color-1);

      .m-card-title {
        flex: 1;
        font-size: 15px;
        font-weight: 550;
        padding: 0 14px;
      }

      .m-card-action {
        text-align: right;
        padding: 0 16px;

        &:empty {
          padding: 0;
        }
      }
    }

    .m-card-body {
      overflow-y: auto;
      &.padded {
        padding: 18px;
      }
    }
  }
}
</style>
