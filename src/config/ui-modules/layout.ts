import { Link } from '../types'

export default <Link[]>[
  {
    childPath: 'typography',
    chineseName: 'Typography 排版',
    doc: () => import('packages/ui-typography/README.md'),
    example: () => import('packages/ui-typography/demo/basic.vue'),
  },
  {
    childPath: 'flex',
    chineseName: 'Flex 布局',
    doc: () => import('packages/ui-flex/README.md'),
    example: () => import('packages/ui-flex/demo/basic.vue'),
  },
  {
    childPath: 'wing-blank',
    chineseName: 'WingBlank 两翼留白',
    doc: () => import('packages/ui-wing-blank/README.md'),
    example: () => import('packages/ui-wing-blank/demo/basic.vue'),
  },
  {
    childPath: 'white-space',
    chineseName: 'WhiteSpace 上下留白',
    doc: () => import('packages/ui-white-space/README.md'),
    example: () => import('packages/ui-white-space/demo/basic.vue'),
  },
]
