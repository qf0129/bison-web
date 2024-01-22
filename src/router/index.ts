import { createRouter, createWebHistory, type Router } from 'vue-router'
import { baseRoutes } from './route'
import { useUserStore } from '@/store/user'

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: baseRoutes
})

const nameWhiteList = ["signin", "signup"]

router.beforeEach(async (to, _, next) => {
    const userStore = useUserStore()
    if (nameWhiteList.includes(to.name as string)) {
        if (userStore.isLogin()) {
            if (!userStore.hasInfo()) {
                await userStore.getUserInfo()
            }
            next('/')
        } else {
            next()
        }
    } else {
        if (userStore.isLogin()) {
            if (!userStore.hasInfo()) {
                await userStore.getUserInfo()
            }
            next()
        } else {
            next('/signin?r=' + to.path)
        }
    }
})


export default router