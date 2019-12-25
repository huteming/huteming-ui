/**
 * 隐藏工具栏
 */
export default function wxHide () {
  window.wx.hideMenuItems({
    menuList: [
      'menuItem:share:timeline',
      'menuItem:share:appMessage',
    ],
  })
}
