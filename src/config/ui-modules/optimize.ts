import { Link } from '../types'

export default <Link[]>[
    {
        childPath: 'infinite-scroll',
        chineseName: '无限滚动',
        doc: () => import('packages/ui-infinite-scroll/README.md'),
        example: () => import('packages/ui-infinite-scroll/demo/basic.vue'),
    },
    {
        childPath: 'anchor',
        chineseName: '锚点 Anchor',
        doc: () => import('packages/ui-anchor/README.md'),
        example: () => import('packages/ui-anchor/demo/basic.vue'),
    },
    {
        childPath: 'guide',
        chineseName: 'Guide 引导遮层',
        doc: () => import('packages/ui-guide/README.md'),
        example: () => import('packages/ui-guide/demo/basic.vue'),
    },
]
