> Flex 是 CSS flex 布局的一个封装。

-------------

## 例子

```javascript
import { TmFlex, TmFlexItem } from '@huteming/ui'

Vue.use(TmFlex)
// Vue.component(TmFlex.name, TmFlex)

Vue.use(TmFlexItem)
// Vue.component(TmFlexItem.name, TmFlexItem)
```

```html
<tm-flex>
    <tm-flex-item>内容</tm-flex-item>
</tm-flex>
```

## API

### Flex

属性 | 说明 | 类型 | 默认值
-----|-----|------|------
| direction    | 项目定位方向，值可以为 `row`,`row-reverse`,`column`,`column-reverse`    | String | `row` |
| wrap         | 子元素的换行方式，可选 `nowrap`, `wrap`, `wrap-reverse`, `true[相当于 wrap]` | String, Boolean  | `nowrap` |
| justify      | 子元素在主轴上的对齐方式，可选 `start`, `end`, `center`, `between`, `around` | String | `start` |
| align        | 子元素在交叉轴上的对齐方式，可选 `start`, `center`, `end`, `baseline`, `stretch` | String   | `stretch` |
| alignContent | 有多根轴线时的对齐方式，可选 `start`, `center`, `end`, `between`, `around`, `stretch`    | String  | `stretch` |
| gutter       | 子元素margin值 | String | `0` |

### Flex.Item

|属性 | 说明 | 类型 | 默认值 |
|----|----|----|----|
| order | 项目的排列顺序 | Number | `0` |
| grow | 项目的放大比例 | Number | `0` |
| shrink | 项目的缩小比例 | Number | `0` |
| basis | 分配多余空间之前，项目占据的主轴空间 | String | `auto` |
| align | 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性, 可选 `auto`, `start`, `center`, `end`, `baseline`, `stretch` | String | `auto` |
| gutter | 元素margin值，会覆盖父元素的值 | String |  |
