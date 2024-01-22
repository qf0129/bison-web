<template>
  <div class="loginContainer">
    <div>
      <m-card class="card" shadow padded>
        <router-link to="/signup">
          <div class="rightTopBtn">SignUp</div>
        </router-link>
        <t-space class="cardBody" direction="vertical" size="large">
          <t-row>
            <h2 style="margin: 10px 0">SignIn</h2>
          </t-row>
          <t-input v-model="username" placeholder="Username" />
          <t-input v-model="password" placeholder="Password" />
          <t-button size="large" @click="submit">SingIn</t-button>
        </t-space>
      </m-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserSignInRequst } from "@/api/public";
import { MessagePlugin } from "tdesign-vue-next";
import router from "@/router";
// import { useUserStore } from '@/store/user';

// const userStore = useUserStore()
const username = ref("");
const password = ref("");
function submit() {
  UserSignInRequst(username.value, password.value).then((resp) => {
    if (resp.code === 0) {
      MessagePlugin.success("Login success");
      // userStore.getUserInfo()
      router.push(new URLSearchParams(window.location.search).get("r") || "/");
    }
  });
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
    position: relative;

    .rightTopBtn {
      position: absolute;
      top: 0;
      right: 0;
      padding: 8px 16px;
      padding-left: 32px;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%);
      background-color: var(--td-brand-color-2);
      color: var(--td-text-color-secondary);
      font-size: 0.8rem;
      cursor: pointer;

      &:hover {
        color: var(--td-text-color-placeholder);
      }
    }

    .cardBody {
      min-width: 400px;
      padding: 20px 30px;
    }

    .t-button {
      width: 100%;
    }
  }
}
</style>
