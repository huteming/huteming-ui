import ui from 'src/config/ui'
import { RouteConfig } from 'vue-router'
import { ConfigPage } from 'src/config/config'

const routes: RouteConfig[] = []
const type = 'component'

ui.forEach(({ modules }) => {
    modules.forEach((page: ConfigPage) => {
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
        redirect: `/${type}/actionsheet`,
        component: () => import('@/views/wrap-docs/wrap-docs.vue'),
        children: routes,
    }
]
