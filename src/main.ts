import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";

import 'tdesign-vue-next/es/style/index.css';
import "./style.css";
import "./theme.css";

import router from './router/index'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

app.use(router)
app.mount('#app')
