> 空状态

-------------

## 引入

```javascript
import { TmEmpty } from '@huteming/ui'

Vue.use(TmEmpty)
// Vue.component(TmEmpty.name, TmEmpty)
```

## 例子

```html
<div style="height: 400px;">
    <tm-empty>
        <router-link to="/example">回到首页</router-link>
    </tm-empty>
</div>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| image | 图片 | `String` | | `http://jhsy-img.caizhu.com/empty-default.png` |
| imageStyle | 图片样式 | Object | | |
| description | 描述 | String | | |
| descriptionStyle | 描述样式 | Object | | |

## 插槽

| name | 描述 |
|------|--------|
| | 自定义描述 |
