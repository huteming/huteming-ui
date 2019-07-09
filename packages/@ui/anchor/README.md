> 锚点

-------------

## 引入

```javascript
import { Anchor } from '@huteming/ui'

Vue.use(Anchor)
// Vue.directive(Anchor.name, Anchor)
```

## 例子

```html
<div v-anchor="{ selector: '#target', container: '.basic' }">锚点</div>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| selector | 锚点滚动目标 | String | | |
| container | 滚动容器，最近一个 overflow 值为 auto 或 scroll 的父元素 | String | | |
| top | 距离容器顶部距离。会以屏幕宽度为750px自适应 | String | | |
| duration | 滚动动画持续时间，单位：ms | Number | | 300 |
| done | 完成之后的回调函数 | Function(to) | | |
