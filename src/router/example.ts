import ui from '@/config/ui'
import util from '@/config/util'
import { RouteConfig } from 'vue-router'

const type = 'example'
const routes: RouteConfig[] = [
    {
        path: '',
        name: 'example',
        meta: { title: '示例' },
        component: () => import('@/views/home-example/home-example.vue')
    }
]

void [...util, ...ui].forEach(({ modules }) => {
    modules.forEach((page: any) => {
        const { path, example } = page

        if (!example) return

        routes.push({
            path,
            name: `${type}${path}`,
            meta: { type, ...page },
            component: example,
        })
    })
})

export default [
    {
        path: `/${type}`,
        component: () => import('@/views/wrap-example/wrap-example.vue'),
        children: routes,
    }
]
