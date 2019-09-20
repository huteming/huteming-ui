export default [
    {
        path: 'field',
        title: '输入框 Field',
        docs: () => import('web-ui/field/README.md'),
        example: () => import('web-ui/field/demo/basic.vue'),
    },
    {
        path: 'image-picker',
        title: '图片选择器 image-picker',
        docs: () => import('web-ui/image-picker/README.md'),
        example: () => import('web-ui/image-picker/demo/basic.vue'),
    },
    {
        path: 'switch',
        title: '滑动开关 Switch',
        docs: () => import('web-ui/switch/README.md'),
        example: () => import('web-ui/switch/demo/basic.vue'),
    },
]
