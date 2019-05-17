> 简短的消息提示框，支持自定义位置、持续时间和样式。

-------------
## 引入

```javascript
import { Toast } from '@huteming/ui'

Vue.use(Toast)
```

## 例子

```javascript
this.$toast(options)
this.$toast(message, options)
this.$toast(message, duration, options)

Toast(message)
```

## API
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| message | 文本内容 | String | | |
| position | Toast 的位置 | String | `top`<br>`bottom`<br>`middle` | `middle` |
| duration | 持续时间（毫秒），若为 0 则不会自动关闭 | Number | | `3000` |
| onClose | 关闭的回调函数 | Function | |  |
