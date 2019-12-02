/**
 * @param rootPath 模块根路径
 * @param headTitle 头部显示标题
 * @param sideGroup 侧边栏
 */
export interface Config {
    /**
     * 模块根路径
     */
    rootPath: string
    /**
     * 头部显示标题
     */
    headTitle: string
    /**
     * 侧边栏
     */
    sideGroup: SideGroup[]
}

/**
 * 侧边栏
 * @param title 侧边栏的模块标题
 */
export interface SideGroup {
    /**
     * 侧边栏的模块标题
     */
    sideTitle: string
    /**
     * 基本对象
     */
    children: Link[]
}

/**
 * 基本对象的抽象
 * 定义的需要注册为路由的链接
 * @param childPath 子路由
 * @param chineseName 路由中文名称
 * @param doc 文档对应的 import 函数
 * @param example 示例对应的 import 函数
 * @param e2e e2e测试路由, key: 路由路径 value: 组件路径
 */
export interface Link {
    /**
     * 子路由
     */
    childPath: string
    /**
     * 路由中文名称
     */
    chineseName: string
    /**
     * 文档对应的 import 函数
     */
    doc: Function
    /**
     * 示例对应的 import 函数
     */
    example?: Function 
    /**
     * e2e测试路由, key: 路由路径 value: 组件路径
     */
    e2e?: object
}
