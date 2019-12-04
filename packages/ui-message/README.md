> 弹出式提示框，有多种交互形式。

-------------

### 全局引入

```js
import { Message } from '@huteming/ui'
Vue.use(Message)

this.$message(options)
this.$message(message, options)
this.$message(message, title, options)
```

### 单独使用

```js
import { Message } from '@huteming/ui'

Message(options)
Message(message, options)
Message(message, title, options)
```

## 代码演示

### 便捷方式（推荐）

这里定义了三种常用类型各自的方法。要注意的是，因为从外部表现来看，调用类型是无关紧要的，所以 `Message` 配置对象并没有提供类似 `type` 的参数去定义类型，内部会根据传参的种类进行判断。
例如：有输入框 (`showInput`)，代表 `prompt`; 显示取消按钮 (`showCancelButton`)，代表 `confirm`；其余代表 `alert`，`alert` 类型时，会禁用 `closeOnClickModal`

```js
Message.alert(options)
Message.confirm(options)
Message.prompt(options)
```

### 注册回调

`Message` 方法返回的是 `Promise`, resolve 状态代表确定，reject 状态代表取消

```js
Message(options)
    // 确定
    .then(res => {
        const { inputValue, action } = res
    })
    // 取消
    .catch(res => {
        const { inputValue, action } = res
    })
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| title | 提示框的标题 | String | | |
| message | 提示框的内容 | String | | |
| confirmButtonText | 确认按钮的文本 | String | | `确定` |
| confirmButtonHighlight | 是否将确认按钮的文本加粗显示 | Boolean | | `false` |
| showCancelButton | 是否显示取消按钮 | Boolean | | `false` |
| cancelButtonText | 取消按钮的文本 | String | | `取消` |
| cancelButtonHighlight | 是否将取消按钮的文本加粗显示 | Boolean | | `false` |
| showInput | 是否显示一个输入框 | Boolean | | `false` |
| inputType | 输入框的类型 | String | | `text` |
| inputValue | 输入框的值 | String | | |
| inputPlaceholder | 输入框的占位符 | String | | `请输入` |
| beforeConfirm | 确定前的回调，会暂停 message 的关闭。done 用于关闭 message | Function(done, res) | | |
| beforeCancel | 取消前的回调，会暂停 message 的关闭。done 用于关闭 message | Function(done, res) | | |
| beforeClose | 关闭前的回调，会暂停 message 的关闭。done 用于关闭 message | Function(done, res) | | |
| closeOnClickModal | 是否在点击遮罩时关闭提示框(alert 为 false) | Boolean | | `true` |
