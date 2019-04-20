// 兼容代码
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        setTimeout(callback, 17)
    }
}
