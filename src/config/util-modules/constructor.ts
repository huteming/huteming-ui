import { Link } from '../types'

export default <Link[]>[
    // {
    //     childPath: 'player',
    //     chineseName: '播放器 Player',
    //     doc: () => import('packages/ui-player/README.md'),
    //     example: () => import('packages/ui-player/demo/basic.vue'),
    // },
    // {
    //     childPath: 'validator',
    //     chineseName: '验证器 Validator',
    //     doc: () => import('packages/ui-validator/README.md'),
    // },
    // {
    //     childPath: 'roller',
    //     chineseName: '概率随机数 Roller',
    //     doc: () => import('packages/ui-roller/README.md'),
    // },
    {
        childPath: 'canvas-draw',
        chineseName: 'CanvasDraw',
        doc: () => import('packages/ui-canvas-draw/README.md'),
        example: () => import('packages/ui-canvas-draw/demo/basic.vue'),
        e2e: {
            'canvas': () => import('packages/ui-canvas-draw/tests/basic.vue'),
        },
    },
    // {
    //     childPath: 'storage',
    //     chineseName: '本地存储 Storage',
    //     doc: () => import('packages/ui-storage/README.md'),
    // },
    // {
    //     childPath: 'request',
    //     chineseName: 'ajax构造器',
    //     doc: () => import('packages/ui-request/README.md'),
    // },
]
