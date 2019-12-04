### 代码示例

```js
import { Rotate } from '@huteming/ui-rotate'
const rotate = new Rotate(ranges, options)
rotate.start()
rotate.stop(expect)
rotate.reset()
```

## API

### Props

| 参数 | 说明 | 类型 |
|------|-------|---------|
| ranges | 转盘选项，顺时针排列 | Range[] |
| options | 其他选项 | RangeOptions |

### Range类型

| 属性 | 说明 | 类型 |
|------|-------|---------|
| value | 选项唯一标识 | any |
| angle | 选项占据角度 | number |

### RangeOptions类型

| 属性 | 说明 | 类型 | 参数 | 默认值 |
|------|-------|---------|-------|-----|
| translate | 转盘动画函数 | *Function* | angle | - |
| done | 完成后的回调函数 | *Function* | value | - |
| initial | reset时的角度位置，如果找不到对应value且是数字，则直接作为角度 | *any* | - | `0` |
| direction | false: 逆时针转动, true: 顺时针转动 | *boolean* | - | `false` |

### 实例方法

| name | 描述 | 参数 |
|----------|------------|-------------|
| start | 开始转动 | - |
| stop | 停止转动 | expectValue |
| reset | 复原 | - |
