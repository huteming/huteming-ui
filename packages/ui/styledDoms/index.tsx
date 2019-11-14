import ThemeProvider from './ThemeProvider'
import { RenderContext } from 'vue'

function scaleDpr (): number {
    const ua = navigator.userAgent
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i)
    const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
    if (!isIos && !(matches && Number(matches[1]) > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        return 1
    }
    return window.devicePixelRatio || 1
}

let zIndex = 2000
const theme = {
    dpr: scaleDpr(),
    zIndex () {
        return zIndex++
    },
}

export const Wrapper = ({ data: { class: className }, children, listeners }: RenderContext) => {
    return (
        <ThemeProvider class={ className } theme={ theme } { ...listeners }>
            { children }
        </ThemeProvider>
    )
}
