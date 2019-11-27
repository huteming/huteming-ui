> 封装 canvas 方法，主要是解决了 canvas 在不同分辨率中显示可能模糊的问题。并封装了一些原生方法，方便调用导出图片

### 引入

```js
import { CanvasDraw } from '@huteming/ui'
```

## 代码演示

### 基础用法

```js
const instance = new CanvasDraw(750, 1109)

// instance.onerror(console.error)
instance.add(({ context, canvas, ratio, width, height }) => {
    instance.drawText('hello world', 24, 93)
})

const src = instance.done('png')
```

### 高斯模糊

```js
const instance = new CanvasDraw(750, 1109)

instance.add(({ context, canvas, ratio, canvasWidth, canvasHeight }) => {
    const x = 52
    const y = 424
    const width = 552
    const height = 177
    const r = '20 20 -20 -20'

    const blurryCanvas = instance.getBlurryArea(100, x, y, width, height)
    // 创建不规则区域然后将模糊图像渲染
    instance.drawRect(x, y, width, height, { r })
    context.clip()
    instance.drawImage(blurryCanvas, x, y, width, height)
    instance.drawRect(x, y, width, height, { r, color: 'rgba(255, 255, 255, 0.62)' })
})

const src = instance.done('png')
```

### 删除线

```js
const instance = new CanvasDraw(750, 1109)

instance.add(() => {
    instance.drawText('<through>删除线</through>', x, y, optionsText)
})

const src = instance.done('png')
```

### 下划线

```js
const instance = new CanvasDraw(750, 1109)

instance.add(() => {
    instance.drawText('<underline>下划线</underline>', x, y, optionsText)
})

const src = instance.done('png')
```

## API

### 构造函数参数

| name | 描述 | 默认参数 |
|------|--------|-------|
| width | 设计稿上画布宽度 | |
| height | 设计稿上画布高度 | |
| optionsCanvas | 配置 | |

### 实例方法

| name | 描述 | 参数 |
|------|--------|-------|
| add | 执行callback前后分别执行 save, restore 方法 | Function: callbackDraw({ context, canvas, ratio, width, height }) |
| onerror | 异常处理.默认为 `console.error` | Error |
| done | 导出图片 | Object: optionsDone |

### 实例辅助绘图方法

| name | 描述 | 参数 |
|------|--------|-------|
| drawArc | 圆形 | x, y, r, optionsArc |
| drawRect | 矩形 | x, y, width, height, optionsRect |
| drawText | 文本 | text, x, y, optionsText |
| drawLine | 直线 | startX, startY, endX, endY, optionsLine |
| drawImage | 图片 | image, x, y, width, height |
| getBlurryArea | 创建高斯模糊区域 | radius, x, y, width, height |

### optionsDone

| 参数 | 描述 | 可选值 | 默认值 |
|----------|----------|-----------|-----------|
| type | 导出图片类型 | *jpg \| png* | `png` |

### optionsCanvas

| name | 描述 | 默认值 |
|------|--------|-------|
| designWidth | 设计稿标准总宽度, 单位: px | `750` |

### optionsArc

| 参数 | 描述 | 默认值 |
|-------|----------|---------|
| startDegrees | 开始角度 | `0` |
| endDegrees | 结束角度 | `360` |
| direction | 方向。false: 顺时针, true: 逆时针 | `false` |
| lineWidth | 画笔宽度 | `1` |
| color | 画笔颜色 | `#000` |
| type | 画笔类型, fill, stroke | `fill` |

### optionsRect

| 参数 | 描述 | 默认值 |
|-------|----------|---------|
| r | 圆角半径 | `0` |
| lineWidth | 画笔宽度 | `1` |
| color | 画笔颜色 | `#000` |
| type | 画笔类型, fill, stroke | `fill` |

### optionsText

| 参数 | 描述 | 默认值 |
|-------|----------|---------|
| fix | 过长省略时添加字符串 | `'.... '` |
| maxWidth | 最长宽度，会在末尾加上 fix 字符串，一般搭配前缀 后缀使用 | `Infinity` |
| style | 字体的风格 normal, italic, oblique | `normal` |
| variant | 字体变体 normal, small-caps | `normal` |
| weight | 字体的粗细 bold bolder lighter 100 200 300 400 500 600 700 800 900 | `normal` |
| size | 字号 | `24` |
| lineHeight | 行高, 若不存在，则在运行时会重置为 size * 1.5 | `0` |
| align | 对齐方式 start, end, center, left, right | `start` |
| baseline | 文本基线, alphabetic, top, hanging, middle, ideographic, bottom | `top` |
| letterSpacing | 字体间距 | `0` |
| lineWidth | 画笔宽度 | `1` |
| wrap | 换行次数，不包括第一行。true => Infinity; false => 0 | `0` |
| shadowColor | 阴影颜色 | - |
| shadowOffsetX | 阴影 | `0` |
| shadowOffsetY | 阴影 | `0` |
| shadowBlur | 阴影 | `0` |
| color | 画笔颜色 | `#000` |
| type | 画笔类型, fillText, strokeText | `fillText` |
| underline | 下划线参数 | { left: 10, right: 10, bottom: 6, dashed: [], lineWidth: 1 } |

### optionsLine

| 参数 | 描述 | 默认值 |
|-------|----------|---------|
| lineWidth | 画笔宽度 | 1 |
| color | 画笔颜色 | #000 |
