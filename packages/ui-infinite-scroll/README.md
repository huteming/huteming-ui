
### 引入

```javascript
import { InfiniteScroll } from '@huteming/ui'

Vue.use(InfiniteScroll)
```

## 代码演示

### 基本用法

```html
<ul v-infinite-scroll="loadMore">
    <li v-for="item in list">{{ item }}</li>
</ul>
```

```javascript
loadMore (done) {
    setTimeout(() => {
        let last = this.list[this.list.length - 1]

        for (let i = 1; i <= 10; i++) {
            this.list.push(last + i)
        }

        done()
    }, 2500)
}
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| callback | 触发的回调函数。指令参数是function类型时，作为callback | Function(done) | | |
| distance | 触发加载方法的滚动距离阈值（像素）） | Number | | `50` |
| disabled | 若为真，则无限滚动不会被触发 | Boolean | | `false` |

### 修饰符

| 参数 | 说明 | 默认值 |
|--------|-----------|--------|
| immediate | 若为真，则指令被绑定到元素上后会立即检查是否需要执行加载方法。在初始状态下内容有可能撑不满容器时十分有用 | `false` |

### 监听事件

| 事件名称 | 说明 | 示例 |
|--------|-----------|--------|
| `infinite-scroll` | 一个 event，被执行时会立即检查是否需要执行加载方法 | this.$emit('infinite-scroll') |
