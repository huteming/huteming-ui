export default [
    {
        path: 'actionsheet',
        title: '动作面板 Actionsheet',
        docs: () => import('web-ui/actionsheet/README.md'),
        example: () => import('web-ui/actionsheet/demo/basic.vue'),
    },
    {
        path: 'message',
        title: '对话框 Message',
        docs: () => import('web-ui/message/README.md'),
        example: () => import('web-ui/message/demo/basic.vue'),
    },
    {
        path: 'dialog',
        title: '弹窗 Dialog',
        docs: () => import('web-ui/dialog/README.md'),
        example: () => import('web-ui/dialog/demo/basic.vue'),
    },
    {
        path: 'toast',
        title: '提示 Toast',
        docs: () => import('web-ui/toast/README.md'),
        example: () => import('web-ui/toast/demo/basic.vue'),
    },
    {
        path: 'popup',
        title: '弹出层 Popup',
        docs: () => import('web-ui/popup/README.md'),
        example: () => import('web-ui/popup/demo/basic.vue'),
    },
    {
        path: 'loading',
        title: '加载 Loading',
        docs: () => import('web-ui/loading/README.md'),
        example: () => import('web-ui/loading/demo/basic.vue'),
    },
    {
        path: 'ripple',
        title: '水波纹 ripple',
        docs: () => import('web-ui/ripple/README.md'),
        example: () => import('web-ui/ripple/demo/basic.vue'),
    },
]
