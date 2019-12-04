export const IMG_FAILURE_SRC = 'http://LOAD_FAILURE_SRC'
export const IMG_SUCCESS_SRC = 'http://LOAD_SUCCESS_SRC'
export const IMG_SUCCESS_DATAURI = `data:image/png;base64,iV`
export const IMG_FAILURE_DATAURI = 'data:failure'

export const BLOG_FAILURE = new Blob()

export const URL = 'http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5'
export const DATAURI = `data:image/png;base64,iV`
export const DATAURI_INVALID = 'HELLO'
export const BLOB = (() => {
    const arr = DATAURI.split(',')
    const type = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    return new Blob([u8arr], { type })
})()
