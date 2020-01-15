import { Link } from '../types'

export default <Link[]>[
  {
    childPath: 'animation',
    chineseName: 'Animation 动画',
    doc: () => import('packages/ui-animation/README.md'),
  },
  // {
  //   childPath: 'tool',
  //   chineseName: '工具函数 Tool',
  //   doc: () => import('packages/ui-tool/README.md'),
  // },
  {
    childPath: 'wxsdk',
    chineseName: '微信公众号 sdk',
    doc: () => import('packages/ui-wxsdk/README.md'),
    // test: {
    //   'wxsdk': () => import('packages/ui-wxsdk/tests/basic.vue'),
    //   'wxsdk/hide': () => import('packages/ui-wxsdk/tests/hide.vue'),
    //   'wxsdk/location': () => import('packages/ui-wxsdk/tests/location.vue'),
    //   'wxsdk/share': () => import('packages/ui-wxsdk/tests/share.vue'),
    //   'wxsdk/pay': () => import('packages/ui-wxsdk/tests/pay.vue'),
    // },
  },
  // {
  //   childPath: 'api',
  //   chineseName: '常用接口 api',
  //   doc: () => import('packages/ui-api/README.md'),
  // },
  // {
  //   childPath: 'image-convertor',
  //   chineseName: '图片转换器',
  //   doc: () => import('packages/ui-image-convertor/README.md'),
  // },
  // {
  //   childPath: 'element',
  //   chineseName: 'DOM辅助函数 element',
  //   doc: () => import('packages/ui-element/README.md'),
  // },
]
