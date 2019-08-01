> 通知栏

---------------

## 例子

```javascript
import { TmNoticeBar } from '@huteming/ui'

Vue.use(TmNoticeBar)
// Vue.component(TmNoticeBar.name, TmNoticeBar)
```

```html
<tm-notice-bar>
    <span>这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……</span>
</tm-notice-bar>
```

## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|-----|-----|------|------|
| mode | 提示类型，可选 `closable`,`link`。`closeable` 模式点击后会关闭 | String | |
| icon | 图标 | String | volume_up |
| duration | 动画持续时间，默认会根据需要滚动距离计算（25ms/px） | Number | |
| loop | 是否无限滚动 | Boolean | true |

## Slot

| 属性 | 说明 |
|-----|-----|
| - | 描述 |
| action | 操作文案 |

## Slot

| 属性 | 说明 | 回调参数 |
|-----|-----|--------|
| click | 点击操作区域触发 | - |
