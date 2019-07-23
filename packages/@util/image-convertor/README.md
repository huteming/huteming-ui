> 图片多种格式间的相互转换

-------------

## 例子

ImageConvertor 为构造函数。主要是解决了图片多种格式相互转换的问题

```javascript
import { ImageConvertor } from '@huteming/util'
const instance = new ImageConvertor(data, optionsCommon)

instance.getImage(optionsCustom) // => HTMLImageElement
instance.getDataURI(optionsCustom) // => dataURI
instance.getFile(optionsCustom) // => Blob
instance.getCanvas(optionsCustom) // => HTMLCanvasElement
```

## 构造函数参数

| name | 描述 | 默认参数 |
|------|--------|-------|
| data | 图片的任意一种格式 | |
| optionsCommon | 通用配置，会被后来传入的 optionsCustom 覆盖 | |

## 实例方法

| name | 描述 | 参数 |
|------|--------|-------|
| getImage | 获取dom对象: HTMLImageElement | optionsCustom |
| getDataURI | 获取base64位字符串 | optionsCustom |
| getFile | 获取图片的二进制对象 | optionsCustom |
| getCanvas | 获取dom对象: HTMLCanvasElement | optionsCustom |

### options

| 参数 | 描述 | 默认值 |
|----------|----------|-----------|
| compress | 是否压缩, 不是每次获取都会压缩 | false |
| maxWidth | 压缩时的最大宽度 | 1100 |
| maxHeight | 压缩时的最大高度 | 1100 |
| mimeType | 导出图片格式 | png |
| quality | 导出图片质量 | 1.0 |
