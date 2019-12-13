> Flex 是 CSS flex 布局的一个封装。

-------------

### 引入

```js
import { Flex } from '@huteming/ui'
Vue.use(Flex)
```

## 代码演示

### 基础布局

```html
<tm-flex container>
  <tm-flex :grow="1">
    <div class="placeholder">无间距</div>
  </tm-flex>
  <tm-flex :grow="1">
    <div class="placeholder">无间距</div>
  </tm-flex>
</tm-flex>
```

### 换行

```html
<tm-flex wrap="wrap" container>
  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>

  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>

  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>

  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>
</tm-flex>
```

### 交叉轴对齐

```html
<tm-flex wrap="wrap" align="center">
  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>

  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>

  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>

  <tm-flex>
    <div class="placeholder inline">Block</div>
  </tm-flex>
</tm-flex>
```

### 主轴对齐

```html
<tm-flex justify="center">
  <tm-flex :grow="1">
    <div class="placeholder small"></div>
  </tm-flex>
  <tm-flex :grow="1">
    <div class="placeholder"></div>
  </tm-flex>
  <tm-flex :grow="1">
    <div class="placeholder large">center</div>
  </tm-flex>
</tm-flex>
```

## API

### Props

属性 | 说明 | 类型 | 默认值
-----|-----|------|------
| container    | 是否作为容器    | *boolean* | `false` |
| direction    | 项目定位方向，值可以为 `row`,`row-reverse`,`column`,`column-reverse`    | String | `row` |
| wrap         | 子元素的换行方式，可选 `nowrap`, `wrap`, `wrap-reverse`, `true[相当于 wrap]` | String, Boolean  | `nowrap` |
| justify      | 子元素在主轴上的对齐方式，可选 `start`, `end`, `center`, `between`, `around` | String | `start` |
| align        | 子元素在交叉轴上的对齐方式，可选 `start`, `center`, `end`, `baseline`, `stretch` | String   | `stretch` |
| alignContent | 有多根轴线时的对齐方式，可选 `start`, `center`, `end`, `between`, `around`, `stretch`    | String  | `stretch` |
| order | 项目的排列顺序 | Number | `0` |
| grow | 项目的放大比例 | Number | `0` |
| shrink | 项目的缩小比例 | Number | `0` |
| basis | 分配多余空间之前，项目占据的主轴空间 | String | `auto` |
| align | 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性, 可选 `auto`, `start`, `center`, `end`, `baseline`, `stretch` | String | `auto` |
| ellipsis     | 过长省略行数 | *boolean \| number* | `false` |
| gutter       | 子元素margin值 | String | `0` |
