import guide from '@/config/guide'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = []
const type = 'guide'

guide.forEach(({ modules }) => {
    modules.forEach((page: any) => {
        const { path, title, docs } = page

        routes.push({
            path,
            name: `${type}${path}`,
            meta: { type, title, ...page },
            component: docs,
        })
    })
})

export default [
    {
        path: `/${type}`,
        redirect: `/${type}/quickstart`,
        component: () => import('@/views/wrap-docs/wrap-docs.vue'),
        children: routes,
    }
]
