<template>
    <div class="loginContainer">
        <div class="card">
            <m-card shadow padded>
                <t-space direction="vertical" size="large" style="width: 400px;">
                    <t-row>
                        <h2 style="margin: 10px 0;">Sign up</h2>
                    </t-row>
                    <t-input v-model="username" placeholder="Username" size="large" />
                    <t-input v-model="password" placeholder="Password" size="large" />
                    <t-row justify="end" size="large">
                        <t-space>
                            <router-link to="/signin">
                                <t-button variant="text" theme="primary">Login</t-button>
                            </router-link>
                            <t-button @click="submit">SignUp</t-button>
                        </t-space>
                    </t-row>
                </t-space>
            </m-card>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { UserSignUpRequst } from '@/api/public';
import { MessagePlugin } from 'tdesign-vue-next';
import router from '@/router';
// import { useUserStore } from '@/store/user';

// const userStore = useUserStore()
const username = ref("")
const password = ref("")
function submit() {
    UserSignUpRequst(username.value, password.value).then(resp => {
        if (resp.code === 0) {
            MessagePlugin.success("Sign up success")
            // userStore.getUserInfo()
            router.push(new URLSearchParams(window.location.search).get("r") || "/")
        }
    })
}
</script>

<style lang="less" scoped>
.loginContainer {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .card {
        border: 1px solid #f3f3f3;
        padding: 20px;
    }
}
</style>