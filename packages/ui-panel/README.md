
### 引入

```javascript
import { Panel } from '@huteming/ui'

Vue.use(Panel)
```

## 代码演示

### 基础用法

```html
<tm-panel
  poster="https://jhsy-img.jinghao.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
  title="张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论"
  tip="加入学习"
  decoration="￥99"
  btn="￥2.99">
</tm-panel>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| image | 图片地址 | String | | |
| title | 标题 | String | | |
| description | 描述 | String | | |
| tip | 备注 | String | | |
| decoration | 带有删除线的文案 | String | | |
| btn | 按钮文案 | String | | |

### Slots

| 参数 | 说明 |
|------|-------|
| image | 图片内浮动的元素 |
| title | 自定义标题 |
| description | 自定义描述。自定义时，是flex布局，为垂直居中，一般以图片为主，图片间距设置为 .08rem |
| btn | 自定义按钮 |
