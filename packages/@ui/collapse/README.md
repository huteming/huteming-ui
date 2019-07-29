> Collapse 折叠面板

-----------

## 引入

```javascript
import { TmCollapse, TmCollapseItem } from '@huteming/ui'

Vue.use(TmCollapse)
// Vue.component(TmCollapse.name, TmCollapse)
Vue.use(TmCollapseItem)
// Vue.component(TmCollapseItem.name, TmCollapseItem)
```

## 例子

```html
<tm-collapse v-model="name" @change="handleChange">
    <tm-collapse-item name="1" header="title1">hello</tm-collapse-item>
    <tm-collapse-item name="2" header="title2">hello</tm-collapse-item>
    <tm-collapse-item name="3" header="title3">hello</tm-collapse-item>
</tm-collapse>
```

## Collapse Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| value | 当前激活的面板 | String, Array | | |
| accordion | 是否手风琴模式 | boolean | | false |

## Collapse Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| change | 当前激活面板改变时触发 | activeNames: array / string |

## CarouselItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----------|-----------|---------|------------|------------|
| name | 唯一标志符 | string/number | | |
| header | 面板标题 | string | | |
| disabled | 是否禁用 | boolean | | false |
