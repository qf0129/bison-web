<template>
    <m-card title="Pods" padded>
        <!-- <t-row justify="end" v-if="pods.length > 0">
            <t-button shape="circle" theme="default" variant="text" @click="requestPods">
                <template #icon> <refresh-icon /></template>
            </t-button>
        </t-row> -->
        <!-- <t-skeleton :loading="loadingList"> -->
        <t-table v-if="pods.length > 0" :data="pods" :columns="columns" cell-empty-content="-" row-key="id" :stripe="true"
            tableLayout="auto" size="small">
            <template #custom_status="{ row }">
                <t-tooltip v-if="row.status.containerStatuses[0].state.running"
                    :content="row.status.containerStatuses[0].state.running.startedAt" theme="light">
                    <t-tag theme="success">Running</t-tag>
                </t-tooltip>
                <t-tooltip v-else-if="row.status.containerStatuses[0].state.waiting"
                    :content="row.status.containerStatuses[0].state.waiting.message" theme="light">
                    <t-tag theme="warning">
                        <template #icon>
                            <ErrorCircleIcon />
                        </template>
                        {{ row.status.containerStatuses[0].state.waiting.reason }}
                    </t-tag>
                </t-tooltip>
                <t-tooltip v-else-if="row.status.containerStatuses[0].state.terminated"
                    :content="row.status.containerStatuses[0].state.terminated.message" theme="light">
                    <t-tag theme="danger">
                        <template #icon>
                            <ErrorCircleIcon />
                        </template>
                        {{ row.status.containerStatuses[0].state.terminated.reason }}
                    </t-tag>
                </t-tooltip>
            </template>
        </t-table>
        <m-empty v-else @refresh="requestPods" />
        <!-- </t-skeleton> -->
    </m-card>
    <m-card title="Logs" padded v-if="pods.length > 0">
        <template #action>
            <t-space align="end">
                <span>Lines:</span>
                <t-radio-group v-model="tailLines" size="small" @change="requestLogs">
                    <t-radio-button v-for="item in tailLineList" :value="item.value">{{ item.label }}</t-radio-button>
                </t-radio-group>
                <t-button size="small" @click="autoRefreshLogs" variant="outline"
                    :theme="autoRefreshing ? 'default' : 'primary'">
                    {{ autoRefreshing ? 'Stop' : 'Auto' }}Refresh</t-button>
            </t-space>
        </template>
        <t-tabs v-model="currentLogsTab" @change="requestLogs">
            <t-tab-panel v-for="pod in pods" :value="pod.metadata.name" :label="pod.status.podIP" />
        </t-tabs>
        <div v-if="logs" class="logView" ref="logView" style="white-space: pre-line;">
            {{ logs }}
        </div>
    </m-card>
</template>

<script setup lang="ts">
import { GetReleasePod } from '@/api/team';
import { GetMyReleasePodLogs } from '@/api/my';
import { ref, onMounted, onUnmounted } from 'vue';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';

// const PodStatusText: { [key: string]: string } = {
//     CrashLoopBackOff: "容器退出, kubelet正在将它重启",
//     InvalidImageName: "无法解析镜像名称",
//     ImageInspectError: "无法校验镜像",
//     ErrImageNeverPull: "策略禁止拉取镜像",
//     ImagePullBackOff: "镜像正在重试拉取",
//     RegistryUnavailable: "连接不到镜像中心",
//     ErrImagePull: "通用的拉取镜像出错",
//     CreateContainerConfigError: "不能创建kubelet使用的容器配置",
//     CreateContainerError: "创建容器失败",
//     RunContainerError: "启动容器失败",
//     PostStartHookError: "执行hook报错",
//     ContainersNotInitialized: "容器没有初始化完毕",
//     ContainersNotReady: "容器没有准备完毕",
//     ContainerCreating: "容器创建中",
//     PodInitializing: "pod 初始化中",
//     DockerDaemonNotReady: "docker还没有完全启动",
//     NetworkPluginNotReady: "网络插件还没有完全启动",
//     "m.internalLifecycle.PreStartContainer": "执行hook报错",
// }

const props = defineProps({
    releaseId: {
        type: String,
        required: true
    }
})

const columns = ref([
    { colKey: 'metadata.name', title: 'Name' },
    { colKey: 'status.hostIP', title: 'HostIP' },
    { colKey: 'status.podIP', title: 'PodIP' },
    { colKey: 'status.containerStatuses[0].image', title: 'ImageVersion', cell: (_: any, { row }: any) => row.status?.containerStatuses[0]?.image?.split(":").slice(-1) },
    { colKey: 'custom_status', title: 'Status' },
    { colKey: 'status.containerStatuses[0].restartCount', title: 'RestartCount' },
    { colKey: 'status.startTime', title: 'StartTime' },
]);

const currentLogsTab = ref("")
const pods = ref<any>([])
const loadingList = ref(false)
function requestPods() {
    loadingList.value = true
    GetReleasePod(props.releaseId).then(resp => {
        if (resp.code === 0) {
            pods.value = resp.data.items || []
            if (pods.value.length && !currentLogsTab.value) {
                currentLogsTab.value = pods.value[0].metadata.name
                requestLogs()
            }
        } else {
            clearInterval(intervalPods)
        }
    }).catch(() => {
        clearInterval(intervalPods)
    }).finally(() => {
        loadingList.value = false
    })
}

const tailLineList = [
    { value: 100, label: "100" },
    { value: 1000, label: "1k" },
    { value: 10000, label: "10k" },
    { value: 0, label: "All" },
]

const tailLines = ref(100)
const logView = ref()
const logs = ref("")
const loadingLogs = ref(false)
const requestLogs = () => {
    loadingLogs.value = true
    GetMyReleasePodLogs(props.releaseId, { pod_name: currentLogsTab.value, tail_lines: tailLines.value }).then(resp => {
        if (resp.code === 0) {
            logs.value = resp.data
            setTimeout(() => {
                logView.value.scrollTop = logView.value.scrollHeight;
            }, 50);
        }
    }).finally(() => {
        loadingLogs.value = false
    })
}

var intervalLogs: any = null
var autoRefreshing = ref(false)
const autoRefreshLogs = () => {
    if (autoRefreshing.value) {
        clearInterval(intervalLogs)
    } else {
        intervalLogs = setInterval(() => {
            requestLogs()
        }, 2000)
    }
    autoRefreshing.value = !autoRefreshing.value
}

var intervalPods: any = null
onMounted(() => {
    requestPods()
    intervalPods = setInterval(() => {
        requestPods()
    }, 3000)
})

onUnmounted(() => {
    clearInterval(intervalPods)
    clearInterval(intervalLogs)
})

</script>

<style lang="less" scoped>
.m-card {
    margin-top: 10px;
}

.logView {
    max-height: 500px;
    padding: 10px;
    font-size: 13px;
    line-height: 18px;
    overflow: auto;
    background-color: #fafafa;

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
        transition: all 0.5s;
    }

    &:hover::-webkit-scrollbar-thumb {
        background-color: var(--td-brand-color-2);
    }

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
}

.emptyDiv {
    padding: 20px;
    color: #aaa;

    span {
        margin: 0 10px;
    }
}
</style>