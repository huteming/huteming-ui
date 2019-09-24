import ui from '@/config/ui'
import util from '@/config/util'

const routes: object[] = []

void [...util, ...Object.values(ui).flat()].forEach((item: any) => {
    if (!item.test) {
        return
    }

    Object.entries(item.test).forEach(([key, component]) => {
        routes.push({
            path: key,
            name: `${key}Test`,
            component,
        })
    })
})

export default [
    {
        path: '/test',
        component: () => import('@/views/wrap-test/wrap-test.vue'),
        children: routes,
    }
]
