> 加载状态

-------------

## 引入

```javascript
import { Loading } from '@huteming/ui'

Vue.use(Toast)
```

## 指令方式

```html
<div v-loading="loading"></div>
```

## 服务方式

```javascript
Loading.open(element, options)
Loading.close(element, options)
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| loading | 是否加载中 | Boolean | | |
| text | 加载中文案 | String | | |
| textStyle | 加载中文案样式 | Object | | |
| background | 背景色 | String | | rgba(255, 255, 255, 1) |
| openAnimation | 打开时动画，初始绑定默认为 false | Boolean | | true |
| closeAnimation | 关闭时动画 | Boolean | | true |
| duration | 最短持续时间，单位ms | Number | | 500 |
