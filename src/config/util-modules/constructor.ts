export default [
    {
        path: 'player',
        title: '播放器 Player',
        docs: () => import('web-util/player/README.md'),
        example: () => import('web-util/player/demo/basic.vue'),
    },
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
        path: 'request',
        title: 'ajax构造器',
        docs: () => import('web-util/request/README.md'),
    },
]
