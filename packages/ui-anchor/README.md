
### 引入

```js
import Vue from 'vue'
import { Anchor } from '@huteming/ui'

Vue.use(Anchor)
// Vue.directive(Anchor.name, Anchor)
```

## 代码演示

### 基础用法

```html
<div class="scrollable">
    <div v-anchor="#target">点击</div>
    <div id="target">目标</div>
</div>
```

### 自定义滚动容器

```html
<div class="wrap">
    <div v-anchor="{ selector: '#target', container: '.scrollable' }">点击</div>
    <div class="scrollable">
        <div id="target">目标</div>
    </div>
</div>
```

## API

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| selector | 锚点滚动目标 | string | - | - |
| container | 滚动容器，最近一个 overflow 值为 auto 或 scroll 的父元素 | string | - | - |
| top | 距离容器顶部距离, 单位: px。会以屏幕宽度为750px自适应 | number | - | - |
| duration | 滚动动画持续时间, 单位：ms | number | - | 300 |
| done | 完成之后的回调函数 | () => void | - | - |
