import type { RouteRecordRaw } from 'vue-router';

export const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        redirect: '/my/apps',
        component: () => import('@/view/console/index.vue'),
        children: [
            {
                path: 'console',
                name: 'console',
                component: () => import('@/view/console/console/index.vue'),
                children: [
                    {
                        path: '',
                        name: 'dashboard',
                        component: () => import('@/view/console/console/dashboard/index.vue'),
                    },
                    {
                        path: ':model',
                        name: 'crud',
                        component: () => import('@/view/console/console/crud/index.vue'),
                        meta: {
                            hideMenu: true
                        },
                    }
                ]
            },
            {
                path: 'my',
                component: () => import('@/view/console/my/index.vue'),
                children: [
                    {
                        path: 'apps',
                        component: () => import('@/view/console/my/apps/index.vue'),
                        children: [
                            {
                                path: '',
                                name: 'my_apps_list',
                                component: () => import('@/view/console/my/apps/list/index.vue'),
                            },
                            {
                                path: ':appId',
                                name: 'my_apps_detail',
                                component: () => import('@/view/console/my/apps/detail/index.vue'),
                                children: [
                                    {
                                        path: 'release/:releaseId',
                                        name: 'release_detail',
                                        component: () => import('@/view/console/my/apps/detail/release/detail/index.vue'),
                                        meta: {
                                            hideParentView: true
                                        },
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        path: 'psd',
                        name: 'my_psd',
                        component: () => import('@/view/console/my/psd/index.vue'),
                    }
                ],
            },
        ]
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import('@/view/signin/index.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/view/signup/index.vue'),
    },
]