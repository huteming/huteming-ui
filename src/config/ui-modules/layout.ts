export default [
    {
        path: 'flex',
        title: 'Flex 布局',
        docs: () => import('@ui/packages/flex/README.md'),
        example: () => import('@ui/packages/flex/demo/basic.vue'),
    },
    {
        path: 'wing-blank',
        title: 'WingBlank 两翼留白',
        docs: () => import('web-ui/wing-blank/README.md'),
        example: () => import('web-ui/wing-blank/demo/basic.vue'),
    },
    {
        path: 'white-space',
        title: 'WhiteSpace 上下留白',
        docs: () => import('web-ui/white-space/README.md'),
        example: () => import('web-ui/white-space/demo/basic.vue'),
    },
]
