import { Link } from '../types'

export default <Link[]>[
    {
        childPath: 'field',
        chineseName: '输入框 Field',
        doc: () => import('packages/ui-field/README.md'),
        example: () => import('packages/ui-field/demo/basic.vue'),
    },
    {
        childPath: 'image-picker',
        chineseName: '图片选择器 image-picker',
        doc: () => import('packages/ui-image-picker/README.md'),
        example: () => import('packages/ui-image-picker/demo/basic.vue'),
    },
    {
        childPath: 'switch',
        chineseName: '滑动开关 Switch',
        doc: () => import('packages/ui-switch/README.md'),
        example: () => import('packages/ui-switch/demo/basic.vue'),
    },
]
