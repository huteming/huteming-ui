export default [
    {
        path: 'tab',
        title: 'Tab 选项卡',
        docs: () => import('web-ui/tab/README.md'),
        example: () => import('web-ui/tab/demo/basic.vue'),
    },
    {
        path: 'picker-address',
        title: '地址选择 PickerAddress',
        docs: () => import('web-ui/picker-address/README.md'),
        example: () => import('web-ui/picker-address/demo/basic.vue'),
    },
    {
        path: 'picker-datetime',
        title: '日期选择 PickerDatetime',
        docs: () => import('web-ui/picker-datetime/README.md'),
        example: () => import('web-ui/picker-datetime/demo/basic.vue'),
    },
    {
        path: 'picker-range',
        title: '选择器 PickerRange',
        docs: () => import('web-ui/picker-range/README.md'),
        example: () => import('web-ui/picker-range/demo/basic.vue'),
    },
    {
        path: 'popup',
        title: '弹出窗 Popup',
        docs: () => import('web-ui/popup/README.md'),
        example: () => import('web-ui/popup/demo/basic.vue'),
    },
    {
        path: 'picker',
        title: '基础选择器 Picker',
        docs: () => import('web-ui/picker/README.md'),
        example: () => import('web-ui/picker/demo/basic.vue'),
    },
]
