// https://docs.cypress.io/api/introduction/api.html

// wxsdk 必须在 微信开发工具 中测试
// wxpay 未测试

// 注意 wxConfig 和 wxShare(包括其他配置方法) 的调用顺序
// 若组件是同步的，监听路由的调用 wxConfig 的同时，需要在 App.vue 的 mounted 中调用 wxConfig
// 若组件是异步的，监听路由调用 wxConfig 即可

describe('wxsdk', () => {
    it('title', () => {
        cy.visit('#/test/wxsdk')
        cy.contains('h1', 'Welcome to Your Vue.js App')
    })
    /**
     * 手动测试项: wxConfig, wxSave, wxLocation, wxShare, wxHide, wxpay
     *
     * wxShare额外需要测试项: channel, query, 统计请求
     */
})
