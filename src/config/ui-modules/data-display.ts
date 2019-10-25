export default [
    {
        path: 'turntable',
        title: '转盘 Turntable',
        docs: () => import('web-ui/turntable/README.md'),
        example: () => import('web-ui/turntable/demo/basic.vue'),
    },
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
    {
        path: 'empty',
        title: '空状态 empty',
        docs: () => import('web-ui/empty/README.md'),
        example: () => import('web-ui/empty/demo/basic.vue'),
    },
    {
        path: 'toolbar',
        title: '操作栏 toolbar',
        docs: () => import('web-ui/toolbar/README.md'),
        example: () => import('web-ui/toolbar/demo/basic.vue'),
    },
    {
        path: 'icon',
        title: '图标 Icon',
        docs: () => import('web-ui/icon/README.md'),
        example: () => import('web-ui/icon/demo/basic.vue'),
    },
    {
        path: 'collapse',
        title: '折叠面板 Collapse',
        docs: () => import('web-ui/collapse/README.md'),
        example: () => import('web-ui/collapse/demo/basic.vue'),
    },
    {
        path: 'notice-bar',
        title: 'NoticeBar 通知栏',
        docs: () => import('web-ui/notice-bar/README.md'),
        example: () => import('web-ui/notice-bar/demo/basic.vue'),
    },
    {
        path: 'range',
        title: 'Range 进度条',
        docs: () => import('web-ui/range/README.md'),
        example: () => import('web-ui/range/demo/basic.vue'),
    },
]
