import Vue from 'vue'
import VueRouter from 'vue-router'
import routesExample from './example'
import routesDocs from './docs'
import routesTest from './test'

Vue.use(VueRouter)

const routes: any = [
    {
        path: '/',
        name: 'app',
        redirect: '/docs',
    },

    ...routesExample,
    ...routesDocs,
    ...routesTest,
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // 设置文档标题
    const title = to.meta && to.meta.title
    document.title = title || '移动端组件'

    next()
})

export default router
