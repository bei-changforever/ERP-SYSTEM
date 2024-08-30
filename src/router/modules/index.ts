import type { RouteRecordRaw } from 'vue-router';

// 常量路由
export const RouterItem: Array<RouteRecordRaw> = [
    {
        path: 'upload',
        name: 'upload',
        meta: {
            title: '上传',
            icon: 'cloud-console-putaway',
            subTitle: '上传模板'
        },
        children:[],
        component: () => import('@/views/dashboard/upload/index.vue')
    },
    {
        path: 'figures',
        name: 'figures',
        meta: {
            title: '日志',
            icon: 'devices',
            subTitle: '日志模板'
        },
        children:[],
        component: () => import('@/views/dashboard/figures/index.vue')
    },
    {
        path: 'order',
        name: 'order',
        meta: {
            title: '订单',
            icon: 'icon-log',
            subTitle: '订单模板'
        },
        children:[],
        component: () => import('@/views/dashboard/orders/index.vue')
    },
    {
        path: 'addon',
        name: 'addon',
        meta: {
           title: '添加',
           icon: 'draw',
           subTitle: '添加模板'
        },
        children: [],
        component: () => import('@/views/dashboard/addon/index.vue')
    }
]

// 菜单路由

