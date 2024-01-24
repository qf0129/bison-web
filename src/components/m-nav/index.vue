<template>
  <div class="navRoot">
    <div class="navContainer">
      <div class="logoDiv">
        <router-link to="/">Bison</router-link>
      </div>
      <div class="menuDiv">
        <t-space size="30px">
          <router-link to="/my/apps">
            <t-link :underline="route.fullPath.startsWith('/my/apps')">MyApps</t-link>
          </router-link>
          <router-link to="/console">
            <t-link :underline="route.fullPath.startsWith('/console')">Console</t-link>
          </router-link>
        </t-space>
      </div>
      <div class="rightMenu">
        <t-dropdown>
          <t-button shape="circle" variant="text" size="large">
            <template #icon>
              <User1Icon />
            </template>
          </t-button>
          <t-dropdown-menu>
            <t-dropdown-item disabled :divider="true">
              <span>User: {{ userStore.info?.nickname || userStore.info?.username }}</span>
            </t-dropdown-item>
            <t-dropdown-item @click="clickPsd">ChangePsd</t-dropdown-item>
            <t-dropdown-item @click="clickSignOut">SignOut</t-dropdown-item>
          </t-dropdown-menu>
        </t-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../store/user";
import { User1Icon } from "tdesign-icons-vue-next";
import router from "../../router";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();
const clickSignOut = () => {
  router.push("/signin");
  userStore.signOut();
};
const clickPsd = () => {
  router.push({ name: "my_psd" });
};
</script>

<style lang="less" scoped>
.navRoot {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  // background: radial-gradient(657px 657px at 2% 90%, #92b6fc 0, #dcf1f600 40%), radial-gradient(642px 642px at 82% 115%, #b4cdff 0, #dcf1f600 25%), linear-gradient(-73.25deg, #dcf2f7 7.43%, #9accd5 94.82%);
  // border-bottom: 1px solid #f7f7f7;
}

.navContainer {
  margin: auto;
  max-width: 1920px;
  height: var(--m-nav-height);
  background-color: transparent;
  display: flex;
  align-items: center;

  .logoDiv {
    margin-left: 20px;
    margin-right: 10px;
    color: var(--td-brand-color-active);
    font-size: 18px;
    font-weight: 800;
    user-select: none;

    a {
      text-decoration: inherit;
    }

    .version {
      color: #aaa;
      font-size: 13px;
      font-weight: normal;
    }
  }

  .teamDiv {
    .t-input.t-is-readonly {
      color: var(--td-text-color-placeholder) !important;
    }
  }

  .menuDiv {
    flex: 1;
    text-align: right;
    padding: 0 10px;
  }

  .rightMenu {
    padding: 0 20px;
  }
}
</style>
