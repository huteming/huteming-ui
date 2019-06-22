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
    },
    {
        path: 'btn-pay',
        title: '支付按钮 btn-pay',
        docs: () => import('web-ui/btn-pay/README.md'),
        example: () => import('web-ui/btn-pay/demo/basic.vue'),
    },
    {
        path: 'panel',
        title: '面板 panel',
        docs: () => import('web-ui/panel/README.md'),
        example: () => import('web-ui/panel/demo/basic.vue'),
    },
    {
        path: 'image',
        title: '图片容器 image',
        docs: () => import('web-ui/image/README.md'),
        example: () => import('web-ui/image/demo/basic.vue'),
    },
]
