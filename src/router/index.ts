import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import configs from '../config'
import { Config, SideGroup, Link } from '../config/types'

Vue.use(VueRouter)

const routeExample: RouteConfig = {
    path: '/example',
    component: () => import('@/views/wrap-example/wrap-example.vue'),
    children: [
        {
            path: '',
            meta: { title: '示例' },
            component: () => import('@/views/home-example/home-example.vue'),
        },
    ],
}

const routeE2e: RouteConfig = {
    path: '/e2e',
    component: () => import('@/views/wrap-test/wrap-test.vue'),
    children: [],
}

const routeComponent: RouteConfig = {
    path: '/component',
    redirect: `/component/actionsheet`,
    component: () => import('@/views/wrap-docs/wrap-docs.vue'),
    children: [],
}

const routeUtil: RouteConfig = {
    path: '/util',
    redirect: `/util/animation`,
    component: () => import('@/views/wrap-docs/wrap-docs.vue'),
    children: [],
}

const routeGuide: RouteConfig = {
    path: '/guide',
    redirect: `/guide/quickstart`,
    component: () => import('@/views/wrap-docs/wrap-docs.vue'),
    children: [],
}

const routeTheme: RouteConfig = {
    path: '/theme',
    redirect: `/theme/overview`,
    component: () => import('@/views/wrap-docs/wrap-docs.vue'),
    children: [],
}

/**
 * 有三个路由系统:
 * 1、文档: /guide + /component + /util + /theme
 * 2、示例: /example
 * 3、e2e: /e2e
 */
configs.forEach((config: Config) => {
    const { rootPath, headTitle, sideGroup } = config
    sideGroup.forEach((side: SideGroup) => {
        const { sideTitle, children } = side
        children.forEach((link: Link) => {
            const { childPath, example, e2e, doc } = link

            if (example) {
                routeExample.children && routeExample.children.push({
                    path: childPath,
                    meta: { type: 'example', ...link },
                    component: example,
                })
            }

            if (e2e) {
                Object.entries(e2e).forEach(([key, component]) => {
                    routeE2e.children && routeE2e.children.push({
                        path: key,
                        meta: { type: 'e2e', ...link },
                        component: component,
                    })
                })
            }

            // /component
            if (rootPath === 'component') {
                routeComponent.children && routeComponent.children.push({
                    path: childPath,
                    meta: { type: 'component', ...link },
                    component: doc,
                })
            }

            // /util
            if (rootPath === 'util') {
                routeUtil.children && routeUtil.children.push({
                    path: childPath,
                    meta: { type: 'util', ...link },
                    component: doc,
                })
            }

            // /guide
            if (rootPath === 'guide') {
                routeGuide.children && routeGuide.children.push({
                    path: childPath,
                    meta: { type: 'guide', ...link },
                    component: doc,
                })
            }

            // /theme
            if (rootPath === 'theme') {
                routeTheme.children && routeTheme.children.push({
                    path: childPath,
                    meta: { type: 'theme', ...link },
                    component: doc,
                })
            }
        })
    })
})

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'app',
            redirect: '/guide',
        },
        routeE2e,
        routeExample,
        routeComponent,
        routeUtil,
        routeGuide,
        routeTheme,
    ],
})

router.afterEach((to: Route, from: Route) => {
    // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
    // 代码高亮样式
    // 和 element-ui 不同的是: 改为在 dialog 中显示代码, 所以不在这里渲染
    // Vue.nextTick(() => {
    //     const blocks = document.querySelectorAll('pre code:not(.hljs)')
    //     Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    // })

    // 设置文档标题
    const title = to.meta && to.meta.chineseName
    document.title = title || '移动端组件'
})

export default router
