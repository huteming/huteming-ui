export default [
    {
        path: 'validator',
        title: '验证器 Validator',
        docs: () => import('web-util/validator/README.md'),
    },
    {
        path: 'roller',
        title: '概率随机数 Roller',
        docs: () => import('web-util/roller/README.md'),
    },
    {
        path: 'animation',
        title: '动画 Animation',
        docs: () => import('web-util/animation/README.md'),
    },
    {
        path: 'canvas-draw',
        title: 'CanvasDraw',
        docs: () => import('web-util/canvas-draw/README.md'),
        example: () => import('web-util/canvas-draw/demo/basic.vue'),
        test: {
            'canvas': () => import('web-util/canvas-draw/tests/basic.vue'),
        },
    },
    {
        path: 'storage',
        title: '本地存储 Storage',
        docs: () => import('web-util/storage/README.md'),
    },
    {
        path: 'tool',
        title: '工具函数 Tool',
        docs: () => import('web-util/tool/README.md'),
    },
    {
        path: 'request',
        title: 'ajax构造器',
        docs: () => import('web-util/request/README.md'),
    },
    {
        path: 'wxsdk',
        title: '微信公众号 sdk',
        docs: () => import('web-util/wxsdk/README.md'),
        test: {
            'wxsdk': () => import('web-util/wxsdk/tests/basic.vue'),
            'wxsdk/hide': () => import('web-util/wxsdk/tests/hide.vue'),
            'wxsdk/location': () => import('web-util/wxsdk/tests/location.vue'),
            'wxsdk/share': () => import('web-util/wxsdk/tests/share.vue'),
            'wxsdk/pay': () => import('web-util/wxsdk/tests/pay.vue'),
        },
    },
    {
        path: 'element',
        title: 'DOM辅助函数 element',
        docs: () => import('web-util/element/README.md'),
    },
    {
        path: 'api',
        title: '常用接口 api',
        docs: () => import('web-util/api/README.md'),
    },
    {
        path: 'image-convertor',
        title: '图片转换器',
        docs: () => import('web-util/image-convertor/README.md'),
    },
]
