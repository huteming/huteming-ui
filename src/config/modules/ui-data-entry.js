export default [
    {
        path: 'input',
        title: '输入框 Input',
        docs: () => import('web-ui/input/README.md'),
        example: () => import('web-ui/input/demo/basic.vue'),
    },
    {
        path: 'image-picker',
        title: '图片选择器 image-picker',
        docs: () => import('web-ui/image-picker/README.md'),
        example: () => import('web-ui/image-picker/demo/basic.vue'),
    },
]
