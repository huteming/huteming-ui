import ui from '@/config/ui'
import util from '@/config/util'

let routes = [
    {
        path: '',
        name: 'example',
        meta: { title: '示例' },
        component: () => import('@/views/home-example/home-example.vue')
    }
]

void [...util, ...Object.values(ui).flat()].forEach((page: any) => {
    const { path, title, example } = page

    routes.push({
        path,
        name: `${path}Example`,
        meta: { title, ...page },
        component: example,
    })
})

export default [
    {
        path: '/example',
        component: () => import('@/views/wrap-example/wrap-example.vue'),
        children: routes,
    }
]
