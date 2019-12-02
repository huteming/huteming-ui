### 引入

```js
import { Button } from '@huteming/ui'
Vue.use(Button)
```

## 代码演示

### 按钮类型

支持`default`、`primary`、`info`、`warning`、`danger`五种类型，默认为`default`

```html
<tm-button type="default">默认按钮</tm-button>
<tm-button type="primary">主要按钮</tm-button>
<tm-button type="info">信息按钮</tm-button>
<tm-button type="warning">警告按钮</tm-button>
<tm-button type="danger">危险按钮</tm-button>
```

### 朴素按钮

通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```html
<tm-button plain type="primary">朴素按钮</tm-button>
<tm-button plain type="info">朴素按钮</tm-button>
```

### 禁用状态

通过`disabled`属性来禁用按钮，禁用状态下按钮不可点击

```html
<tm-button disabled type="primary">禁用状态</tm-button>
<tm-button disabled type="info">禁用状态</tm-button>
```

### 加载状态

通过`loading`属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过`loading-text`设置加载状态下的文字

```html
<tm-button loading type="primary" />
<tm-button loading type="info" loading-text="加载中..." />
```

### 按钮形状

通过`shape`设置按钮形状

```html
<tm-button shape="square" type="primary">方形按钮</tm-button>
<tm-button shape="round" type="info">圆形按钮</tm-button>
```

### 图标按钮

通过icon属性设置按钮图标，支持 Icon 组件里的所有图标

```html
<tm-button icon="help" type="primary" />
```

### 按钮尺寸

支持`large`、`normal`、`small`、`mini`四种尺寸，默认为`normal`

```html
<tm-button type="primary" size="large">大号按钮</tm-button>
<tm-button type="primary" size="normal">普通按钮</tm-button>
<tm-button type="primary" size="small">小型按钮</tm-button>
<tm-button type="primary" size="mini">迷你按钮</tm-button>
```

## API

### Props

参数 | 说明 | 类型 | 可选值 | 默认值 |
----|--------|---------|---------|-----------|
type | 类型 | *string* | `primary` `info` `warning` `danger` | `default` |
size | 尺寸 | *string* | `large` `small` `mini` | `normal` |
text | 按钮文字 | *string* | - | - |
icon | 左侧图标名称，可选值见 Icon 组件 | *string* | - | - |
block | 是否为块级元素 | *boolean* | - | `false` |
plain | 是否为朴素按钮 | *boolean* | - | `false` |
shape | 按钮形状 | *string* | `square` `round` | - |
disabled | 是否禁用按钮 | *boolean* | - | `false`
loading | 是否显示为加载状态 | *boolean* | - | `false` |
loading-text | 加载状态提示文字 | *string* | - | - |

### Events

事件名 | 说明 | 回调参数 |
-------|-------|--------|
click | 点击按钮 *(注: loading 和 disabled 状态同样会触发)* | event: Event |
