import { Link } from '../types'

export default <Link[]>[
  {
    childPath: 'tag',
    chineseName: '标记 Tag',
    doc: () => import('packages/ui-tag/README.md'),
    example: () => import('packages/ui-tag/demo/basic.vue'),
  },
  {
    childPath: 'card',
    chineseName: '卡片 Card',
    doc: () => import('packages/ui-card/README.md'),
    example: () => import('packages/ui-card/demo/basic.vue'),
  },
  {
    childPath: 'button',
    chineseName: '按钮 Button',
    doc: () => import('packages/ui-button/README.md'),
    example: () => import('packages/ui-button/demo/basic.vue'),
  },
  {
    childPath: 'rotate',
    chineseName: '转盘 Rotate',
    doc: () => import('packages/ui-rotate/README.md'),
    example: () => import('packages/ui-rotate/demo/basic.vue'),
  },
  {
    childPath: 'carousel',
    chineseName: '走马灯 Carousel',
    doc: () => import('packages/ui-carousel/README.md'),
    example: () => import('packages/ui-carousel/demo/basic.vue'),
  },
  {
    childPath: 'cell',
    chineseName: '单元格 Cell',
    doc: () => import('packages/ui-cell/README.md'),
    example: () => import('packages/ui-cell/demo/basic.vue'),
  },
  {
    childPath: 'clocker',
    chineseName: '倒计时 Clocker',
    doc: () => import('packages/ui-clocker/README.md'),
    example: () => import('packages/ui-clocker/demo/basic.vue'),
  },
  {
    childPath: 'btn-pay',
    chineseName: '支付按钮 BtnPay',
    doc: () => import('packages/ui-btn-pay/README.md'),
    example: () => import('packages/ui-btn-pay/demo/basic.vue'),
  },
  {
    childPath: 'panel',
    chineseName: '面板 panel',
    doc: () => import('packages/ui-panel/README.md'),
    example: () => import('packages/ui-panel/demo/basic.vue'),
  },
  {
    childPath: 'image',
    chineseName: '图片容器 image',
    doc: () => import('packages/ui-image/README.md'),
    example: () => import('packages/ui-image/demo/basic.vue'),
  },
  {
    childPath: 'empty',
    chineseName: '空状态 empty',
    doc: () => import('packages/ui-empty/README.md'),
    example: () => import('packages/ui-empty/demo/basic.vue'),
  },
  {
    childPath: 'toolbar',
    chineseName: '操作栏 toolbar',
    doc: () => import('packages/ui-toolbar/README.md'),
    example: () => import('packages/ui-toolbar/demo/basic.vue'),
  },
  {
    childPath: 'icon',
    chineseName: '图标 Icon',
    doc: () => import('packages/ui-icon/README.md'),
    example: () => import('packages/ui-icon/demo/basic.vue'),
  },
  {
    childPath: 'collapse',
    chineseName: 'Collapse 折叠面板',
    doc: () => import('packages/ui-collapse/README.md'),
    example: () => import('packages/ui-collapse/demo/basic.vue'),
  },
  {
    childPath: 'noticebar',
    chineseName: 'NoticeBar 通知栏',
    doc: () => import('packages/ui-noticebar/README.md'),
    example: () => import('packages/ui-noticebar/demo/basic.vue'),
  },
  {
    childPath: 'range',
    chineseName: 'Range 进度条',
    doc: () => import('packages/ui-range/README.md'),
    example: () => import('packages/ui-range/demo/basic.vue'),
  },
]
