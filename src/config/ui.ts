import dataDisplay from './ui-modules/data-display'
import dataEntry from './ui-modules/data-entry'
import feedback from './ui-modules/feedback'
import layout from './ui-modules/layout'
import navigation from './ui-modules/navigation'
import optimize from './ui-modules/optimize'
import transition from './ui-modules/transition'
import { Config } from './types'

export default <Config>{
  rootPath: 'component',
  headTitle: '组件',
  sideGroup: [
    {
      sideTitle: '数据展示',
      children: dataDisplay,
    },
    {
      sideTitle: '数据录入',
      children: dataEntry,
    },
    {
      sideTitle: '反馈',
      children: feedback,
    },
    {
      sideTitle: '布局',
      children: layout,
    },
    {
      sideTitle: '导航',
      children: navigation,
    },
    {
      sideTitle: '优化',
      children: optimize,
    },
    {
      sideTitle: '动画',
      children: transition,
    },
  ],
}
