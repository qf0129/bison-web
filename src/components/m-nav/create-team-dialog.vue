<template>
    <t-dialog v-model:visible="visible" header="CreateTeam" width="500px" :on-cancel="onCancel" :on-close="onCancel"
        :on-confirm="onConfirm">
        <t-form ref="formObj" :data="formData" :rules="rules" @submit="onSubmit" style="padding: 50px 0;">
            <t-form-item label="Team Name" name="name">
                <t-input v-model="formData.name"></t-input>
            </t-form-item>
        </t-form>
    </t-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CreateTeam } from '@/api/my';
import { useUserStore } from '../../store/user'

const visible = ref(false)
const show = () => {
    visible.value = true
}

const formData = ref({
    name: ""
})
const rules = {
    name: [
        { required: true, message: 'Name required', type: 'error', trigger: 'blur' },
        { whitespace: true, message: 'Name cannot be empty', type: 'error', trigger: 'blur' },
        { min: 3, message: 'Length should be between 3-50', type: 'error', trigger: 'blur' },
        { max: 50, message: 'Length should be between 3-50', type: 'error', trigger: 'blur' },
    ]
}

const onSubmit = ({ validateResult }: { validateResult: boolean }) => {
    if (validateResult === true) {
        CreateTeam(formData.value.name).then(resp => {
            if (resp.code === 0 && resp.data) {
                userStore.changeTeam(resp.data)
                visible.value = false
            }
        })
    }
}

const onCancel = () => {
    formData.value.name = ""
}

const formObj = ref()
const userStore = useUserStore()
const onConfirm = () => {
    formObj.value.submit()
}
defineExpose({
    show,
})
</script>

