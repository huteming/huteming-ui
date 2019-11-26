### 引入

```js
import { Animation } from '@huteming/ui'
```

## API

### 对象方法

| 函数 | 说明 |
|----------|-----------|
| linear | 匀速 |
| easeIn | 减速进入，加速离开 |
| easeOut | 加速进入，减速离开 |
| easeInOut | 减速进入，加速，在减速离开 |

### 函数参数列表

| name | 描述 | 类型 | 默认值 |
|---------|-----------|----------|---------|
| from | 起始位置 | Number | |
| to | 结束位置 | Number | |
| callback | 变化的位置回调, 支持两个参数, value和isEnding, 表示当前的位置值（数值）以及是否动画结束了（布尔值）| Function(now, done) | |
| duration | 持续时间毫秒数 | Number | `300` |
