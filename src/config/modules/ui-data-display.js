export default [
    {
        path: 'carousel',
        title: '走马灯 carousel',
        docs: () => import('web-ui/carousel/README.md'),
        example: () => import('web-ui/carousel/demo/basic.vue'),
    },
    {
        path: 'clocker',
        title: '倒计时 clocker',
        docs: () => import('web-ui/clocker/README.md'),
        example: () => import('web-ui/clocker/demo/basic.vue'),
    }
]
