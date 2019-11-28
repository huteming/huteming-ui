
### 引入

```js
import { Cell } from '@huteming/ui'
Vue.use(Cell)
```

## 代码演示

### 基础用法

```html
<tm-cell header="header" body="body" footer="footer" link></tm-cell>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| header | 左边区域内容 | String | - | - |
| body | 中间区域内容, 占据剩余宽度 | String | - | - |
| footer | 右边区域内容 | String | - | - |
| link | 是否显示箭头标识 | *boolean* | - | `false` |

### Slots

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| header | 左边区域内容 | String | - | - |
| body | 中间区域内容, 占据剩余宽度 | String | - | - |
| - | 右边区域内容 | String | - | - |
