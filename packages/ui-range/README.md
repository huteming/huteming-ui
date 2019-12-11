
### 引入

```javascript
import { Range } from '@huteming/ui'

Vue.use(Range)
```

## 代码演示

### 基础用法

```html
<tm-range v-model="value"></tm-range>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| value | 滑块的值 | Number | | `0` |
| min | 最小值 | Number | | `0` |
| max | 最大值 | Number | | `100` |
| step | 步长 | Number | | `1` |
| disabled | 是否禁用 | Boolean | | `false` |
| bar-height | 滑槽的线宽（像素） | Number | | `1` |
| show-value | 是否在线两侧显示最大最小值 | Boolean | | `false` |

### Slots

| name | 描述 |
|------|--------|
| start | 滑块左侧 DOM |
| end | 滑块右侧 DOM |
