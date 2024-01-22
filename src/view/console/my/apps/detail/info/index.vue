<template>
    <div>
        <div class="infoDiv">
            <div><label>Name</label> <span>{{ props.app?.name }}</span></div>
            <div><label>Desc</label> <span>{{ props.app?.desc }}</span></div>
            <div><label>GitUrl</label> <span>{{ props.app?.git_url }}</span></div>
            <div><label>GitPlatform</label> <span>{{ props.app?.git_platform }}</span></div>
            <div><label>Owners</label> <span>{{ props.app?.owners }}</span></div>
            <div><label>Developers</label> <span>{{ props.app?.developers }}</span></div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { App } from '@/type/types'

const props = defineProps<{
    app: App | undefined
}>()

</script>

<style lang="less" scope>
.infoDiv {
    padding: 20px;

    label {
        display: inline-block;
        width: 100px;
        text-align: right;
        color: #777;
        margin-right: 10px;
    }
}
</style>