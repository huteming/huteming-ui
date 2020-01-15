import ctrs from './util-modules/constructor'
import tool from './util-modules/tool'
import { Config } from './types'

export default <Config>{
  rootPath: 'util',
  headTitle: '函数',
  sideGroup: [
    {
      sideTitle: '构造函数',
      children: ctrs,
    },
    {
      sideTitle: '工具函数',
      children: tool,
    },
  ],
}
