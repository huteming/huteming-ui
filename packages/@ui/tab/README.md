> 用于让用户在不同的视图中进行切换

----------

## 引入

```javascript
import { TmTab, TmTabPane, TmTabContainer } from '@huteming/ui'

Vue.use(TmTab)
Vue.use(TmTabPane)
Vue.use(TmTabContainer)
```

## 例子

`Tab` 提供根组件。`TabPane` 提供标题容器。`TabContainer` 提供内容容器。 若在 `TabContainer` 上提供 `title` 或者 `icon` 属性时，将根据其 `name` 属性自动注册 `TabPane`。
如果已存在自定义的相同 `name` 的 `TabPane` 时，以自定义为准。

#### 提示：内容显示的先后排序以 `TabContainer` 的先后顺序为准

### 完整示例

```html
<tm-tab v-model="active" @change="handleChange" justify="around">
    <!-- container -->
    <tm-tab-container name="home">
        <div class="item pink">主页</div>
    </tm-tab-container>

    <tm-tab-container name="more">
        <div class="item white">更多</div>
    </tm-tab-container>

    <tm-tab-container name="me">
        <div  class="item blue">我</div>
    </tm-tab-container>

    <!-- pane -->
    <tm-tab-pane name="me">
        <div class="tab-title2">我</div>
    </tm-tab-pane>

    <tm-tab-pane name="more">
        <div class="tab-title2">更多</div>
    </tm-tab-pane>

    <tm-tab-pane name="home">
        <div class="tab-title2">主页</div>
    </tm-tab-pane>
</tm-tab>
```

### 快捷方式

```html
<tm-tab v-model="active2">
    <tm-tab-container class="item pink" title="主页" name="home">
        home
    </tm-tab-container>

    <tm-tab-container class="item white" title="更多" name="more">
        more
    </tm-tab-container>

    <tm-tab-container class="item blue" title="我" name="me">
        me
    </tm-tab-container>

    <tm-tab-container class="item pink" title="其他" name="other">
        other
    </tm-tab-container>
</tm-tab>
```

## Tab

### API

`TabPane` 和 `TabContainer` 的 `name` 属性共同组成一个选项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| value | 绑定值。对应 tabPane 和 TabContainer 的 name 属性 | String | | |
| classPane | `TmTabPane` 的 `class` 值 | String | | |
| classNavbar | `TmTabPane` 容器的 `class` 值 | String | | |
| classContent | `TmTabContainer` 容器的 `class` 值 | String | | |
| justify | `TmTabPane` 在主轴上的对齐方式 | String | `start`, `end`, `center`, `between`, `around` | `start` |
| align | `TmTabPane` 在交叉轴上的对齐方式 | String   | `start`, `center`, `end`, `baseline`, `stretch` | `center` |
| grow | `TmTabPane` 的放大比例 | Number | `0` |

### Event

| 事件 | 说明 | 参数 |
|------|-------|---------|
| change | 切换的回调函数 | name |

## TabContainer

### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| *name | 唯一标识符 | String | | |

## TabPane

### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| *name | 唯一标识符 | String | | |
| grow | 放大比例，覆盖 `Tab` 中的 `grow` | Number | | `0` |
