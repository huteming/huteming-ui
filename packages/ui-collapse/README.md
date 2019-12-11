### 引入

```javascript
import { Collapse } from '@huteming/ui'

Vue.use(Collapse)
Vue.use(Collapse.item)
```

## 代码演示

### 基础用法

```html
<tm-collapse v-model="name">
    <tm-collapse-item name="1" header="title1">hello</tm-collapse-item>
    <tm-collapse-item name="2" header="title2">hello</tm-collapse-item>
    <tm-collapse-item name="3" header="title3">hello</tm-collapse-item>
</tm-collapse>
```

### 手风琴

```html
<tm-collapse v-model="name" accordion>
    <tm-collapse-item name="1" header="title1">hello</tm-collapse-item>
    <tm-collapse-item name="2" header="title2">hello</tm-collapse-item>
    <tm-collapse-item name="3" header="title3">hello</tm-collapse-item>
</tm-collapse>
```

## Collapse

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| value | 当前激活的面板 | String, Array | | |
| accordion | 是否手风琴模式 | boolean | | false |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| change | 当前激活面板改变时触发 | activeNames: array / string |

## CarouselItem

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----------|-----------|---------|------------|------------|
| name | 唯一标志符 | string/number | | |
| header | 面板标题 | string | | |
| disabled | 是否禁用 | boolean | | false |
