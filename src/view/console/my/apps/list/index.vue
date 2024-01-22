<template>
    <m-container>
        <m-card topTitle="Apps" transparent>
            <template #top-action>
                <t-radio-group v-model="showMode" size="small">
                    <t-radio-button value="card">Card</t-radio-button>
                    <t-radio-button value="list">List</t-radio-button>
                </t-radio-group>
            </template>
            <template v-if="apps.length > 0">
                <t-table v-if="showMode === 'list'" size="large" row-key="id" :data="apps" :columns="columns"
                    cell-empty-content="-" tableLayout="auto" :hover="true"
                    :pagination="{ defaultCurrent: 1, defaultPageSize: pageSize, total }" @page-change="onPageChange"
                    :loading="loading">
                    <template #custom_name="{ row }">
                        <t-link theme="primary" hover="color" @click="clickApp(row)">{{ row.name }}</t-link>
                    </template>
                    <template #custom_git="{ row }">
                        <t-link theme="primary" hover="color" :href="row.git_url" target="_blank">{{ row.git_url }}</t-link>
                    </template>
                    <template #operation="{ row }">
                        <t-link theme="primary" hover="color" @click="clickApp(row)">View</t-link>
                    </template>
                </t-table>
                <t-row v-if="showMode === 'card'" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 }">
                    <t-col v-for="app in apps">
                        <m-card @click="clickApp(app)" hover padded style="width:300px;" class="appCard">
                            <t-row class="name" flex>
                                <t-col flex="1">{{ app.name }}</t-col>
                                <t-col class="viewArrow">
                                    <ArrowRightIcon />
                                </t-col>
                            </t-row>
                            <div class="desc">{{ app.desc || "-" }}</div>
                            <div class="owner">Owners:
                                <t-tag v-for="owner in app.owners" variant="light">
                                    {{ owner.username }}
                                </t-tag>
                            </div>
                        </m-card>
                    </t-col>
                </t-row>
            </template>
            <m-empty v-else @refresh="requestData" text="No apps" />
        </m-card>
    </m-container>
</template>
<script setup lang="ts">
import { GetMyApps } from "@/api/my"
import { ref, onMounted } from "vue"
import { App } from '@/type/types'
import router from '@/router'
import { ArrowRightIcon } from 'tdesign-icons-vue-next';

const showMode = ref("card")
const columns = ref([
    { colKey: 'custom_name', title: 'Name' },
    { colKey: 'desc', title: 'Desc', ellipsis: true },
    { colKey: 'custom_git', title: 'GitUrl' },
    // { colKey: 'owners', title: 'Owners' },
    { colKey: 'ctime', title: 'Ctime' },
    { colKey: 'operation', title: 'Operation' },
])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const apps = ref<Array<App>>([])
const loading = ref(false)
function requestData() {
    loading.value = true
    GetMyApps({ page_num: pageNum.value, page_size: pageSize.value, preload: "owners" }).then(resp => {
        if (resp.code === 0) {
            apps.value = resp.data?.list || []
            total.value = resp.data.total
        }
    }).finally(() => {
        loading.value = false
    })
}

const onPageChange = (pageInfo: any) => {
    pageNum.value = pageInfo.current
    pageSize.value = pageInfo.pageSize
    requestData()
};



onMounted(() => {
    // GetMyApps(queryForm.value).then(resp => {
    //     apps.value = resp.data?.list || []
    // })
    requestData()
})

function clickApp(app: App) {
    router.push("/my/apps/" + app.id)
}
</script>

<style lang="less" scope>
.appCard {
    cursor: pointer;

    .name {
        font-size: 18px;
    }

    .desc {
        color: var(--td-text-color-placeholder);
        padding: 10px 0;
    }

    .owner {
        color: var(--td-text-color-placeholder);
    }

    .viewArrow {
        font-size: 24px;
        transition: all 0.3s;
        opacity: 0;
    }

    &:hover {
        .viewArrow {
            opacity: 1;
        }
    }
}
</style>