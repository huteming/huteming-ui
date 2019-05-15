export default [
    {
        path: 'infinite-scroll',
        title: '无限滚动',
        docs: () => import('web-ui/infinite-scroll/README.md'),
        example: () => import('web-ui/infinite-scroll/demo/basic.vue'),
    },
    {
        path: 'anchor',
        title: '锚点',
        docs: () => import('web-ui/anchor/README.md'),
        example: () => import('web-ui/anchor/demo/basic.vue'),
    },
]
