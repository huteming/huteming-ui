import dataDisplay from './ui-modules/data-display'
import dataEntry from './ui-modules/data-entry'
import feedback from './ui-modules/feedback'
import layout from './ui-modules/layout'
import navigation from './ui-modules/navigation'
import optimize from './ui-modules/optimize'
import transition from './ui-modules/transition'

export default [
    {
        title: '数据展示',
        modules: dataDisplay,
    },
    {
        title: '数据录入',
        modules: dataEntry,
    },
    {
        title: '反馈',
        modules: feedback,
    },
    {
        title: '布局',
        modules: layout,
    },
    {
        title: '导航',
        modules: navigation,
    },
    {
        title: '优化',
        modules: optimize,
    },
    {
        title: '动画',
        modules: transition,
    },
]
