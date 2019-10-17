import ui from '@/config/ui'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = []
const type = 'component'

ui.forEach(({ modules }) => {
    modules.forEach(page => {
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
        redirect: `/${type}/flex`,
        component: () => import('@/views/wrap-docs/wrap-docs.vue'),
        children: routes,
    }
]
