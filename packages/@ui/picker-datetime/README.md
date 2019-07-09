> 日期时间选择器，支持自定义类型。

-------------

## 引入

```javascript
import { TmPickerDatetime } from '@huteming/ui'

Vue.use(TmPickerDatetime)
// Vue.component(TmPickerDatetime.name, TmPickerDatetime)
```

## 例子

`mode` 属性表示 `datetime-picker` 组件的类型，它有三个可能的值：
*  `datetime`: 日期时间选择器，可选择年、月、日、时、分
*  `date`: 日期选择器，可选择年、月、日
*  `time`: 时间选择器，可选择时、分

```html
<tm-picker-datetime :visible.sync="visible">
</tm-picker-datetime>
```

## API
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| visible | 显示 datetime, 支持 sync 修饰符 | Boolean | | `false` |
| value | 绑定值 | Date | | `new Date()` |
| mode | 模式 | String | `datetime`<br>`date`<br>`time` | `datetime` |
| min-date | 限制最小时间 | Date | | `new Date(year - 10, 1, 1, 0, 0, 0)` |
| max-date | 限制最大时间 | Date | | `new Date(year + 10, 1, 1, 0, 0, 0)` |

## Events
| name | 说明 | 回调参数 |
|------|-------|---------|
| change | 点击确认按钮时的回调函数 | Function(Date) |
