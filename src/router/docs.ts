import ui from '@/config/ui'
import util from '@/config/util'

const routes = [
    {
        path: 'quickstart',
        name: 'quickstart',
        meta: { title: '快速开始' },
        component: () => import('@/views/quickstart/README.md')
    }
]

void [...util, ...Object.values(ui).flat()].forEach((page: any) => {
    const { path, title, docs } = page

    routes.push({
        path,
        name: `${path}Docs`,
        meta: { title, ...page },
        component: docs,
    })
})

export default [
    {
        path: '/docs',
        redirect: '/docs/quickstart',
        component: () => import('@/views/wrap-docs/wrap-docs.vue'),
        children: routes,
    }
]
