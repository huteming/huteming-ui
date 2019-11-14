
import './global/slide'
import './global/fade'

let zIndex = 2000
export function useZindex (): number {
    return zIndex++
}

export * from './mixins/hairline'
export { default as withTheme } from './withTheme'
