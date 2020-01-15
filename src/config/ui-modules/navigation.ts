import { Link } from '../types'

export default <Link[]>[
  // {
  //     childPath: 'tab',
  //     chineseName: '选项卡 Tab',
  //     doc: () => import('packages/ui-tab/README.md'),
  //     example: () => import('packages/ui-tab/demo/basic.vue'),
  // },
  {
    childPath: 'picker-address',
    chineseName: '地址选择 PickerAddress',
    doc: () => import('packages/ui-picker-address/README.md'),
    example: () => import('packages/ui-picker-address/demo/basic.vue'),
  },
  {
    childPath: 'picker-datetime',
    chineseName: '日期选择 PickerDatetime',
    doc: () => import('packages/ui-picker-datetime/README.md'),
    example: () => import('packages/ui-picker-datetime/demo/basic.vue'),
  },
  {
    childPath: 'picker-range',
    chineseName: '选择器 PickerRange',
    doc: () => import('packages/ui-picker-range/README.md'),
    example: () => import('packages/ui-picker-range/demo/basic.vue'),
  },
  {
    childPath: 'picker',
    chineseName: '基础选择器 Picker',
    doc: () => import('packages/ui-picker/README.md'),
    example: () => import('packages/ui-picker/demo/basic.vue'),
  },
]
