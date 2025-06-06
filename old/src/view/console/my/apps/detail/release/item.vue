<template>
    <div class="releaseDiv">
        <t-row class="topDiv" align="center" @click="clickRelease">
            <t-col flex="1">
                <t-row align="center">
                    <!-- <t-col style="padding-right: 5px;">
                        <CaretDownSmallIcon v-if="showPods" />
                        <CaretRightSmallIcon v-else />
                    </t-col> -->
                    <t-col :span="4" class="kvCard">
                        <div class="label">Name</div>
                        <div class="content">{{ release.name }}</div>
                    </t-col>
                    <!-- <t-col :span="1" class="kvCard">
                        <div class="label">Status</div>
                        <div class="content">{{ release.status }}</div>
                    </t-col> -->
                    <t-col :span="1" class="kvCard">
                        <div class="label">ReadyReplicas</div>
                        <div v-if="release.deployment_status?.replicas">
                            {{ release.deployment_status?.readyReplicas }} / {{ release.deployment_status?.replicas }}
                        </div>
                        <div v-else>-</div>
                    </t-col>
                </t-row>
            </t-col>
            <t-col>
                <t-space>
                    <t-button variant="outline" @click="clickRelease">View</t-button>
                    <!-- <t-button variant="outline">Update</t-button> -->
                    <!-- <t-button variant="outline">Scale</t-button> -->
                </t-space>
            </t-col>
        </t-row>
    </div>
</template>

<script setup lang="ts">
import { Release } from '@/type/types';
import router from "@/router";

const props = defineProps<{
    release: Release
}>()

const clickRelease = () => {
    router.push({ name: "release_detail", params: { releaseId: props.release.id } })
}

</script>


<style lang="less" scoped>
.releaseDiv {
    margin-bottom: 10px;
    // padding: 10px;
    transition: all 0.25s;
    // border: 1px solid #f1f1f1;
    background-color: #f9f9f9;

    &:hover {
        // box-shadow: 1px 2px 1px #eee;
        background-color: var(--td-gray-color-1);
    }

    .topDiv {
        cursor: pointer;
        padding: 5px 10px;
    }
}

.kvCard {
    // background-color: #f1f1f1;
    padding: 5px;

    .label {
        color: var(--td-font-gray-4);
        padding: 5px 5px 0;
        // background-color: #ddd;
    }

    .content {
        padding: 0 5px;
        font-size: 16px;
        // text-align: center;
        // background-color: #ccc;
    }
}
</style>