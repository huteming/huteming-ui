
### 引入

```javascript
import { Guide } from '@huteming/ui'
Vue.use(Guide)
```

## 代码演示

### 基本用法

```js
// const guide = this.$guide([
const guide = new Guide([
    {
        name: '1',
        target: '#target1',
        component: component,
        extra: { message: '传递给组件的额外参数' },
        before (done) {},
        after () {},
    },
], {
    init: '1',
    complete () {},
})

guide.open()
guide.close()
```

### component 示例

```javascript
export default {
    props: {
        extra: Any,
        top: {},
        left: {},
        width: {},
        height: {},
    },

    computed: {
        styles () {
            return {
            }
        },
    },
}
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| name | 待渲染组件唯一标识符 | Any | | |
| target | 目标dom选择器或者Element，位置信息会作为props传入组件 | String, HTMLElement | | |
| component | 组件选项的对象 | Object | | |
| before | 渲染前执行函数，等待done执行 | Function | | |
| after | 渲染后执行函数，在下一个事件循环执行 | Function | | |
| init | 初始值，对应 name 值。默认为第一个选项 | Any | | |
| complete | 关闭后执行函数，提前关闭不会执行 | Function(activeName, isComplete) | | |

### Events

| name | 说明 |
|------|-------|
| open | 打开。开始引导 |
| close | 关闭。如果不是在最后一项时关闭，不会触发 complete 函数 |
