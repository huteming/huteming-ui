
### 引入

```javascript
import { PickerDatetime } from '@huteming/ui'

Vue.use(PickerDatetime)
```

## 代码演示

### 基础用法

```html
<tm-picker-datetime :visible.sync="visible">
</tm-picker-datetime>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| visible | 显示 datetime, 支持 sync 修饰符 | Boolean | | `false` |
| value | 绑定值 | Date | | `new Date()` |
| mode | 模式 | *string* | `datetime` `date` `time` | `datetime` |
| min-date | 限制最小时间 | Date | | `new Date(year - 10, 1, 1, 0, 0, 0)` |
| max-date | 限制最大时间 | Date | | `new Date(year + 10, 1, 1, 0, 0, 0)` |

### Events

| name | 说明 | 回调参数 |
|------|-------|---------|
| change | 点击确认按钮时的回调函数 | Function(Date) |
