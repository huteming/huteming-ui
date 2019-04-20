import ui from '@/config/ui'
import util from '@/config/util'

const routes = []

void [...util, ...[].concat(...Object.values(ui))].forEach(item => {
    if (!item.test) {
        return
    }

    if (!Array.isArray(item.test)) {
        item.test = [item.test]
    }

    item.test.forEach(route => {
        Object.keys(route).forEach(key => {
            const component = route[key]

            routes.push({
                path: key,
                name: `${key}Test`,
                component,
            })
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
