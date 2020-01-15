import { Config } from './types'

export default <Config>{
  rootPath: 'guide',
  headTitle: '指南',
  sideGroup: [
    {
      sideTitle: '',
      children: [
        {
          childPath: 'quickstart',
          chineseName: '快速开始',
          doc: () => import('packages/ui/README.md'),
        },
        {
          childPath: 'changelog',
          chineseName: '更新日志',
          doc: () => import('packages/ui/CHANGELOG.md'),
        },
      ],
    },
  ],
}
