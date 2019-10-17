import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import routesExample from './example'
import routesTest from './test'
import routesComponent from './component'
import routesFunction from './function'
import routesGuide from './guide'

Vue.use(VueRouter)

const routes: any = [
    {
        path: '/',
        name: 'app',
        redirect: '/guide',
    },

    ...routesExample,
    ...routesTest,
    ...routesComponent,
    ...routesFunction,
    ...routesGuide,
]

const router = new VueRouter({
    // mode: 'history',
    routes,
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
    const title = to.meta && to.meta.title
    document.title = title || '移动端组件'
})

export default router
