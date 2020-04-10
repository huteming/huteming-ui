# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.6.1](https://github.com/huteming/huteming-ui/compare/v3.6.0...v3.6.1) (2020-04-10)


### Bug Fixes

* **styles:** 主题测试数据未删除 ([d396f0d](https://github.com/huteming/huteming-ui/commit/d396f0d0070d0514289d80a052aa9766876212e1))





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
* **request:** 添加本地到预发的域名配置 ([27a2286](https://github.com/huteming/huteming-ui/commit/27a228693d7ca3ee083c9d534338ba86b46e7f55))





# [3.4.0](https://github.com/huteming/huteming-ui/compare/v3.3.6...v3.4.0) (2020-02-24)


### Features

* **carousel:** 添加滑动触发的阈值属性 ([ab16efc](https://github.com/huteming/huteming-ui/commit/ab16efcf1a91944bd6365fa26ca8062285c6af57))





## [3.3.6](https://github.com/huteming/huteming-ui/compare/v3.3.5...v3.3.6) (2020-02-18)


### Bug Fixes

* **request:** 修改预发环境请求域名 ([2b65f27](https://github.com/huteming/huteming-ui/commit/2b65f2764b03ef9ee9ea36eeedb961a60f0a5111))





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

**Note:** Version bump only for package web-common





## [3.3.1](https://github.com/huteming/huteming-ui/compare/v3.3.0...v3.3.1) (2020-01-16)


### Performance Improvements

* **loading:** 隐藏时不再销毁dom,直到取消绑定unbind时才销毁 ([daaa39c](https://github.com/huteming/huteming-ui/commit/daaa39c4fb7728d3633c5b0cbf31db968f78df6d))
* **picker-address:** 地址json文件改为异步加载,添加loading状态 ([ee95617](https://github.com/huteming/huteming-ui/commit/ee956178ffe0abd48d7b74a9412dd72b5af2b638))





# [3.3.0](https://github.com/huteming/huteming-ui/compare/v3.2.0...v3.3.0) (2020-01-09)


### Bug Fixes

* **flex:** 修正文字过长不会自动换行,将shrink默认设为1 ([ad7c011](https://github.com/huteming/huteming-ui/commit/ad7c011383551b9f70f820a045a80e85a7a36ac5))
* **icon:** 修复导出文件格式错误导致打包错误 ([357c4e4](https://github.com/huteming/huteming-ui/commit/357c4e47185f03ecaf826bdef6ce88850d42ca00))
* **loading:** 修复loading高度超出父元素的问题 ([a356c72](https://github.com/huteming/huteming-ui/commit/a356c72e3829dc9753b01a568d94782e283f5a3e))
* **message:** 修正catch中的vm属性会导致在sentry环境下堆栈溢出,不再导出vm属性 ([c129d12](https://github.com/huteming/huteming-ui/commit/c129d120c1e81f765624f239cbb94c5bd05e0336))


### Features

* 添加组件:tag ([9479c13](https://github.com/huteming/huteming-ui/commit/9479c13bf2a3c1bf11e4d22149c0b677175ea6a0))





# [3.2.0](https://github.com/huteming/huteming-ui/compare/v3.1.0...v3.2.0) (2020-01-06)


### Bug Fixes

* **image-picker:** 修复重置的value类型错误 ([f1601d8](https://github.com/huteming/huteming-ui/commit/f1601d81e07870c499a3408b49fda0023918f43d))
* **loading:** 修复loading高度不足以覆盖内容区域的问题 ([630130e](https://github.com/huteming/huteming-ui/commit/630130e8b5fec9ea0979271a035654d6666b8ca9))


### Features

* 支持自定义样式和组件前缀 ([14d36c5](https://github.com/huteming/huteming-ui/commit/14d36c5d9e1acba40c87eaa4c2301c6819c53285))
* **card:** 添加CardPosterBar组件作为图片描述容器组件 ([ce93db3](https://github.com/huteming/huteming-ui/commit/ce93db3788ceb548a8546c514651fd67ec3441ee))
* **carousel:** 轮播carousel支持card样式 ([8a33af3](https://github.com/huteming/huteming-ui/commit/8a33af3bc5f8c12dbd490caf3c489fee810505be))
* **empty:** empty组件支持不显示图片 ([12b1d86](https://github.com/huteming/huteming-ui/commit/12b1d86312a2b1a6ea0d88e13a16db0a7f02d0ed))
* **field:** 支持文本域textarea高度自适应属性: autosize ([cdd6935](https://github.com/huteming/huteming-ui/commit/cdd6935bf8dc044f5851c4a79508f633feeb711a))
* **field:** 添加支持清除控件 ([e4550ff](https://github.com/huteming/huteming-ui/commit/e4550ff65f814df4c9620938d2d9a21187ad4033))
* **image-picker:** 添加onload前后周期函数before,after ([82660ff](https://github.com/huteming/huteming-ui/commit/82660ff4661eaff01d0c79c62e1d46ceb2630371))
* **range:** 添加滑动事件moving ([bb26572](https://github.com/huteming/huteming-ui/commit/bb26572b4fe719607ddec7f78bfc78e1f17f0c0d))
* **styles:** styleCreater添加第三个参数为共用基础组件 ([b24bda8](https://github.com/huteming/huteming-ui/commit/b24bda85e2ca2c27521e753cf0790707ab9cd570))
* **ui:** 添加排版组件Typography ([7bb8372](https://github.com/huteming/huteming-ui/commit/7bb837274feafb071ad70a4f3530d8d2e1add064))





# 3.1.0 (2019-12-19)


### Bug Fixes

* 修复打包压缩后组件注册名字错误的问题 ([9d593af](https://github.com/huteming/huteming-ui/commit/9d593af3a27efa600b8e3847609d21288b25c3e1))
* **ci:** travis添加sudo权限 ([47cc6bc](https://github.com/huteming/huteming-ui/commit/47cc6bc4ecf5e4118e9935851e379600b68c90eb))
* **ci:** 修复install指令未初始化依赖 ([279ea6b](https://github.com/huteming/huteming-ui/commit/279ea6b44b7bfa7301cfd39d0c3f34809d23bad7))
* **ci:** 修正bootstrap指令拼写错误 ([83d4fae](https://github.com/huteming/huteming-ui/commit/83d4fae5aee2edcc7436b7821b9c88bd18812204))
* **ci:** 修正travis install指令错误 ([319a660](https://github.com/huteming/huteming-ui/commit/319a660955b35661d15e31c0e92c1401a8ebd00d))
* **request:** 修复自定义配置失败的问题 ([381b099](https://github.com/huteming/huteming-ui/commit/381b0994a54cc1b8a64d440436453f75d84ff1b0))
* **request:** 修正服务端渲染时没有FormData构造函数的问题 ([bb6d228](https://github.com/huteming/huteming-ui/commit/bb6d228df505ff05b60d77f98d7ed20c331e78aa))
* android在播放前触发timeupdate导致初始值失效 ([26e45ce](https://github.com/huteming/huteming-ui/commit/26e45cee623b83270ebc953902bf0e4015814391))
* audio在ios下为了初始化时间引起的播放卡顿 ([9185c74](https://github.com/huteming/huteming-ui/commit/9185c7453c3778ac6e48cc23c17691de04811e74))
* audio跳跃进度失败时记住进度条失败 ([6fc8932](https://github.com/huteming/huteming-ui/commit/6fc8932ff0e1323d39ab32d445f15d367cf2b710))
* drawText最大宽度包括初始坐标 ([9a880be](https://github.com/huteming/huteming-ui/commit/9a880bed27dc1457ea7600bec4459c2f06f0c7f8))
* sass-loader版本更新后配置选项改变 ([f1c56b3](https://github.com/huteming/huteming-ui/commit/f1c56b34d054b0869f63f88d81072112ddaad649))
* 修复环境变量token读取失败 ([8e89921](https://github.com/huteming/huteming-ui/commit/8e89921324983e77c1f53c708a60bcbdc14a6aaf))
* 修改travis github_token ([059d8d6](https://github.com/huteming/huteming-ui/commit/059d8d6c71a92175fb60a1bde5a5ff996dff1aa0))
* 安卓audio在m3u8格式音频初始化时间失效 ([2a05329](https://github.com/huteming/huteming-ui/commit/2a0532942a2f3f0371c7fd26932dd701f0ff316d))


### Features

* **flex:** 合并flex,flex-item为flex ([8d38f1a](https://github.com/huteming/huteming-ui/commit/8d38f1a0e31f23cb2b98aa0ef017432b801a6bb1))
* **modal:** 打开后禁止body滚动 ([64806f7](https://github.com/huteming/huteming-ui/commit/64806f789e060ce1c53309a28b5a35f06d511f8a))
* **player:** 弃用ui-player ([19d5c9c](https://github.com/huteming/huteming-ui/commit/19d5c9ce47a7e7f06622b469c067b70935552ed4))
* **rotate:** 重写turntable为构造函数,不再作为组件调用 ([7f0e68d](https://github.com/huteming/huteming-ui/commit/7f0e68d8da696bbd8fce3d682d2b03141ddfe6b3))
* **styles:** hairline支持自定义位置参数 ([d753895](https://github.com/huteming/huteming-ui/commit/d75389559c4aab9679cf34b28b8070b9aa932bc1))
* **styles:** ui-styles修正泛型,验证TsxComponent props ([49ea711](https://github.com/huteming/huteming-ui/commit/49ea7110a2e41edb32064c512d8ba732e600c71d))
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
* 样式生成器添加第三个参数helper ([250a11f](https://github.com/huteming/huteming-ui/commit/250a11fc0e9c8078f79b979892edb2cd47ba4597))
