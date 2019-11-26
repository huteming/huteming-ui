import util from '@/config/util'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = []
const type = 'function'

util.forEach(({ modules }) => {
    modules.forEach((page: any) => {
        const { path, docs } = page

        routes.push({
            path,
            name: `${type}${path}`,
            meta: { type, ...page },
            component: docs,
        })
    })
})

export default [
    {
        path: `/${type}`,
        redirect: `/${type}/animation`,
        component: () => import('@/views/wrap-docs/wrap-docs.vue'),
        children: routes,
    }
]
