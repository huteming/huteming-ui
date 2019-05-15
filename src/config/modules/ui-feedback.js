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
]
