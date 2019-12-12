export function log (...args: any[]) {
    if (process.env.NODE_ENV !== 'test') {
        console.log('@huteming Logger [Log]:', ...args)
    }
}

/**
 * 判断运行环境
 * https://github.com/axios/axios/blob/13c948e661f4a077bbc788dcb9d3c2c1b403d010/lib/utils.js
 */
export function isStandardBrowserEnv () {
    // if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
    //                                          navigator.product === 'NativeScript' ||
    //                                          navigator.product === 'NS')) {
    //     return false
    // }
    return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
    )
}
