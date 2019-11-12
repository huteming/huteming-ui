let url = ''

/**
 * 保存首页地址
 * 因为ios配置地址必须为进入单页应用的首页，andriod配置地址为当前页面
 */
export default (newUrl?: any) => {
    if (newUrl !== null && newUrl !== undefined) {
        url = newUrl
    }

    const link = window.location.href
    const href = window.__wxjs_is_wkwebview ? (url || link) : link
    return href.split('#')[0]
}
