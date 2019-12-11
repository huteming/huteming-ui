
### 引入

```js
import { Clocker } from '@huteming/ui'

Vue.use(Clocker)
// Vue.component(Clocker.name, Clocker)
```

### 例子

```html
<tm-clocker :start-time="start" :end-time="end" @end="handleEnd">
    <template slot-scope="scope">
        <div>{{ scope.whole }}</div>
        <div>{{ scope.total }}</div>
        <div>{{ scope.days }}</div>
        <div>{{ scope.hours }}</div>
        <div>{{ scope.minutes }}</div>
        <div>{{ scope.seconds }}</div>
    </template>
</tm-clocker>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| startTime | 开始时间 | String, Number, Date | | `now` |
| endTime | 结束时间 | String, Number, Date | | `now` |

### slot 对象参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| days | 剩余天数 | Number | | |
| hours | 剩余小时，24小时以内 | Number | | |
| minutes | 剩余分钟，60分钟以内 | Number | | |
| seconds | 剩余秒，60秒以内 | Number | - | - |
| milliseconds | 剩余总毫秒 | Number | - | -|

### Events

| name | 说明 | 参数 |
|------|-------|---------|
| end | 倒计时结束 | |
