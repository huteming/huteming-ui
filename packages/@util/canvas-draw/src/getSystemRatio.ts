// 微信浏览器调整字体大小适配比例
export default function getSystemRatio (): number {
    const $dom = document.createElement('div')
    // fixbug: 在safari10以下 报错attempted to assign to readonly property
    // $dom.style = 'font-size: 10px;'
    $dom.style.fontSize = '10px'
    document.body.appendChild($dom)
    const scaledFontSize = parseInt(window.getComputedStyle($dom, null).getPropertyValue('font-size')) // 计算出放大后的字体
    document.body.removeChild($dom)
    const ratioSystem = scaledFontSize / 10 // 计算原字体和放大后字体的比例

    return ratioSystem
}
