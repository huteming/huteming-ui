import ui from '@/config/ui'
import util from '@/config/util'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = []
const type = 'test'

void [...ui, ...util].forEach(({ modules }) => {
    modules.forEach((page: any) => {
        const { title, test } = page
        if (!test) {
            return
        }

        Object.entries(test).forEach(([key, component]) => {
            routes.push({
                path: key,
                name: `${type}${key}`,
                meta: { type, title, ...page },
                component: (component as Function),
            })
        })
    })
})

export default [
    {
        path: `/${type}`,
        component: () => import('@/views/wrap-test/wrap-test.vue'),
        children: routes,
    }
]
