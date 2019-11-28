> 轮播图，可自定义轮播时间间隔、动画时长等。

-------------

### 引入

```javascript
import { Carousel, CarouselItem } from '@huteming/ui'

Vue.use(Carousel)
Vue.use(CarouselItem)
```

## 代码演示

### 基础用法

```html
<tm-carousel height="6rem">
    <tm-carousel-item>
        <div class="swiper" name="customName">item</div>
    </tm-carousel-item>
</tm-carousel>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| height | 高度 | String | - | - |
| initial | 初始索引 | *string \| number* | - | - |
| loop | 是否循环 | Boolean | - | `true` |
| autoplay | 自动播放 | Boolean | - | `false` |
| interval | 自动播放的时间间隔（毫秒） | Number | - | `3000` |
| direction | 轮播方向 | String | *horizontal \| vertical* | `horizontal` |
| disabled-touch | 禁止手势 | Boolean | | `false` |

### Slot

| name | 描述 |
|------|--------|
| - | 一个或多个 `carousel-item` 组件 |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| change | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |

## CarouselItem

### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| name | 唯一标识符 | String | | |

### Slot

| name | 描述 |
|------|--------|
| - | 单个轮播图的内容 |
