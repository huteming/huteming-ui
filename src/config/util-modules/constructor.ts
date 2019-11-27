export default [
    // {
    //     path: 'player',
    //     title: '播放器 Player',
    //     docs: () => import('packages/ui-player/README.md'),
    //     example: () => import('packages/ui-player/demo/basic.vue'),
    // },
    // {
    //     path: 'validator',
    //     title: '验证器 Validator',
    //     docs: () => import('packages/ui-validator/README.md'),
    // },
    // {
    //     path: 'roller',
    //     title: '概率随机数 Roller',
    //     docs: () => import('packages/ui-roller/README.md'),
    // },
    {
        path: 'canvas-draw',
        title: 'CanvasDraw',
        docs: () => import('packages/ui-canvas-draw/README.md'),
        example: () => import('packages/ui-canvas-draw/demo/basic.vue'),
        test: {
            'canvas': () => import('packages/ui-canvas-draw/tests/basic.vue'),
        },
    },
    // {
    //     path: 'storage',
    //     title: '本地存储 Storage',
    //     docs: () => import('packages/ui-storage/README.md'),
    // },
    // {
    //     path: 'request',
    //     title: 'ajax构造器',
    //     docs: () => import('packages/ui-request/README.md'),
    // },
]
