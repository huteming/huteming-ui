# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.6.1](https://github.com/huteming/huteming-ui/compare/v3.6.0...v3.6.1) (2020-04-10)

**Note:** Version bump only for package @huteming/jhsy





# [3.6.0](https://github.com/huteming/huteming-ui/compare/v3.5.1...v3.6.0) (2020-04-10)


### Features

* 主题添加field,placeholder ([e5564b5](https://github.com/huteming/huteming-ui/commit/e5564b5544d48f9cb7b132b6cf5c54553a19c6a5))


### Performance Improvements

* 打包时忽略qs,axios,jsonp模块 ([887e41b](https://github.com/huteming/huteming-ui/commit/887e41b42c502445b5d8e5773683e231d7c2d7ee))
* 配置externals解析减小打包体积,试用 ([21cb5c2](https://github.com/huteming/huteming-ui/commit/21cb5c297bce6bfa322db8811e7c09ea5f819e3e))





## [3.5.1](https://github.com/huteming/huteming-ui/compare/v3.5.0...v3.5.1) (2020-03-16)


### Bug Fixes

* **tools:** 修复地址中没有查询参数时格式化异常 ([f7c68dd](https://github.com/huteming/huteming-ui/commit/f7c68dd636517807b170880e6d8d27d8b4890e39))






# [3.5.0](https://github.com/huteming/huteming-ui/compare/v3.4.0...v3.5.0) (2020-02-26)


### Features

* **api:** 拦截埋点sign的请求异常 ([d96f8d2](https://github.com/huteming/huteming-ui/commit/d96f8d284d28f84765a5d189500e38883d0d700f))





# [3.4.0](https://github.com/huteming/huteming-ui/compare/v3.3.6...v3.4.0) (2020-02-24)

**Note:** Version bump only for package @huteming/jhsy





## [3.3.6](https://github.com/huteming/huteming-ui/compare/v3.3.5...v3.3.6) (2020-02-18)

**Note:** Version bump only for package @huteming/jhsy





## [3.3.5](https://github.com/huteming/huteming-ui/compare/v3.3.4...v3.3.5) (2020-02-14)


### Bug Fixes

* **picker-address:** 修复json文件请求可能携带cookir导致cors异常 ([c4e3a54](https://github.com/huteming/huteming-ui/commit/c4e3a542b9b9e316bc2490a5d45c24e89507ec49))





## [3.3.4](https://github.com/huteming/huteming-ui/compare/v3.3.3...v3.3.4) (2020-02-06)


### Bug Fixes

* **wxsdk:** 修复wxShare在服务端渲染时初始化错误的问题 ([fe41d02](https://github.com/huteming/huteming-ui/commit/fe41d022ea3ea0137a40c778951967fbae556988))





## [3.3.3](https://github.com/huteming/huteming-ui/compare/v3.3.2...v3.3.3) (2020-01-17)


### Bug Fixes

* **ui:** 修复通过Vue.use重复添加组件时配置参数被覆盖的问题 ([03d2911](https://github.com/huteming/huteming-ui/commit/03d29113db6e1a9c5a977c9d82acb19faf1b470a))





## [3.3.2](https://github.com/huteming/huteming-ui/compare/v3.3.1...v3.3.2) (2020-01-16)

**Note:** Version bump only for package @huteming/jhsy





## [3.3.1](https://github.com/huteming/huteming-ui/compare/v3.3.0...v3.3.1) (2020-01-16)

**Note:** Version bump only for package @huteming/jhsy





# [3.3.0](https://github.com/huteming/huteming-ui/compare/v3.2.0...v3.3.0) (2020-01-09)


### Features

* 添加组件:tag ([9479c13](https://github.com/huteming/huteming-ui/commit/9479c13bf2a3c1bf11e4d22149c0b677175ea6a0))





# [3.2.0](https://github.com/huteming/huteming-ui/compare/v3.1.0...v3.2.0) (2020-01-06)


### Features

* 支持自定义样式和组件前缀 ([14d36c5](https://github.com/huteming/huteming-ui/commit/14d36c5d9e1acba40c87eaa4c2301c6819c53285))
* **ui:** 添加排版组件Typography ([7bb8372](https://github.com/huteming/huteming-ui/commit/7bb837274feafb071ad70a4f3530d8d2e1add064))





# 3.1.0 (2019-12-19)


### Bug Fixes

* 修复打包压缩后组件注册名字错误的问题 ([9d593af](https://github.com/huteming/huteming-ui/commit/9d593af3a27efa600b8e3847609d21288b25c3e1))
* **request:** 修复自定义配置失败的问题 ([381b099](https://github.com/huteming/huteming-ui/commit/381b0994a54cc1b8a64d440436453f75d84ff1b0))
* **request:** 修正服务端渲染时没有FormData构造函数的问题 ([bb6d228](https://github.com/huteming/huteming-ui/commit/bb6d228df505ff05b60d77f98d7ed20c331e78aa))


### Features

* **flex:** 合并flex,flex-item为flex ([8d38f1a](https://github.com/huteming/huteming-ui/commit/8d38f1a0e31f23cb2b98aa0ef017432b801a6bb1))
* **styles:** 添加TsxComponent属性提示方法 ([2ec5cb6](https://github.com/huteming/huteming-ui/commit/2ec5cb633ddb8c19f9c4301bc42b1bc2dccbb69f))
* **ui:** 导出主题定制组件(ThemeProvider)和方法(createTheme) ([9e43b89](https://github.com/huteming/huteming-ui/commit/9e43b890136557ee0601862069234f8c89237944))
* **ui:** 添加button ([464922d](https://github.com/huteming/huteming-ui/commit/464922d672077e761303d87e7fd5f3fbde7e9ef1))
* **ui:** 添加icon组件 ([e006f5d](https://github.com/huteming/huteming-ui/commit/e006f5dde1cc822bb5ff846d23960f83aa9e0b36))
* **ui:** 添加动画组件TransitionFade ([ae2a928](https://github.com/huteming/huteming-ui/commit/ae2a928a18a7629d4515ce249c96c170de4472b9))
* **ui:** 添加动画组件TransitionSlide ([7acd73d](https://github.com/huteming/huteming-ui/commit/7acd73d86fb9a8cf3ae5e0f3b4b87f43d86915bd))
* **ui:** 添加组件card ([cd60f31](https://github.com/huteming/huteming-ui/commit/cd60f314ffb0aa613e935d7d957d952a9b806353))
* **ui:** 添加组件panel ([90cb343](https://github.com/huteming/huteming-ui/commit/90cb343b7c9d4b97090e2def305b7c3818f82187))
* 修改适配SSR编译环境 ([b961d72](https://github.com/huteming/huteming-ui/commit/b961d72ddf40360f78627f578d846ac761446388))
* **ui:** 通过umd模式引入时自动注册组件 ([e8b1458](https://github.com/huteming/huteming-ui/commit/e8b14583feee5ef8a34afa17cc04752125ab4d01))





# [2.4.0](https://github.com/huteming/huteming-ui/compare/@huteming/ui@2.3.0...@huteming/ui@2.4.0) (2019-12-12)


### Features

* **styles:** 添加TsxComponent属性提示方法 ([2ec5cb6](https://github.com/huteming/huteming-ui/commit/2ec5cb633ddb8c19f9c4301bc42b1bc2dccbb69f))
* **ui:** 导出主题定制组件(ThemeProvider)和方法(createTheme) ([9e43b89](https://github.com/huteming/huteming-ui/commit/9e43b890136557ee0601862069234f8c89237944))





# [2.3.0](https://github.com/huteming/huteming-ui/compare/@huteming/ui@2.1.6...@huteming/ui@2.3.0) (2019-12-02)


### Bug Fixes

* 修复打包压缩后组件注册名字错误的问题 ([9d593af](https://github.com/huteming/huteming-ui/commit/9d593af3a27efa600b8e3847609d21288b25c3e1))


### Features

* **ui:** 添加button ([464922d](https://github.com/huteming/huteming-ui/commit/464922d672077e761303d87e7fd5f3fbde7e9ef1))
* **ui:** 添加icon组件 ([e006f5d](https://github.com/huteming/huteming-ui/commit/e006f5dde1cc822bb5ff846d23960f83aa9e0b36))
* **ui:** 通过umd模式引入时自动注册组件 ([e8b1458](https://github.com/huteming/huteming-ui/commit/e8b14583feee5ef8a34afa17cc04752125ab4d01))





## [2.1.6](https://github.com/huteming/huteming-ui/compare/@huteming/ui@2.1.5...@huteming/ui@2.1.6) (2019-11-26)

**Note:** Version bump only for package @huteming/ui





## [2.1.5](https://github.com/huteming/huteming-ui/compare/@huteming/ui@2.1.4...@huteming/ui@2.1.5) (2019-11-21)

**Note:** Version bump only for package @huteming/ui
