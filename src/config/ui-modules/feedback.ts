import { Link } from '../types'

export default <Link[]>[
    {
        childPath: 'actionsheet',
        chineseName: 'Actionsheet 上拉菜单',
        doc: () => import('packages/ui-actionsheet/README.md'),
        example: () => import('packages/ui-actionsheet/demo/basic.vue'),
    },
    {
        childPath: 'message',
        chineseName: '对话框 Message',
        doc: () => import('packages/ui-message/README.md'),
        example: () => import('packages/ui-message/demo/basic.vue'),
    },
    {
        childPath: 'dialog',
        chineseName: '弹窗 Dialog',
        doc: () => import('packages/ui-dialog/README.md'),
        example: () => import('packages/ui-dialog/demo/basic.vue'),
    },
    {
        childPath: 'toast',
        chineseName: '提示 Toast',
        doc: () => import('packages/ui-toast/README.md'),
        example: () => import('packages/ui-toast/demo/basic.vue'),
    },
    // {
    //     childPath: 'popup',
    //     chineseName: '弹出层 Popup',
    //     doc: () => import('packages/ui-popup/README.md'),
    //     example: () => import('packages/ui-popup/demo/basic.vue'),
    // },
    // {
    //     childPath: 'loading',
    //     chineseName: '加载 Loading',
    //     doc: () => import('packages/ui-loading/README.md'),
    //     example: () => import('packages/ui-loading/demo/basic.vue'),
    // },
    // {
    //     childPath: 'ripple',
    //     chineseName: '水波纹 ripple',
    //     doc: () => import('packages/ui-ripple/README.md'),
    //     example: () => import('packages/ui-ripple/demo/basic.vue'),
    // },
]
