> 提供axios http请求的再封装

## 例子

提供 requestFactory 单例函数。

```javascript
const request = requestFactory(options)

request.get(url, params, config)
request.post(url, params, config)
request.jsonp(url, params)
```

## options 对象详解

| name | 描述 | 默认参数 |
|------|--------|-------|
| baseURL | `baseURL`将自动加在`url`前面，便于为实例的方法传递相对`URL` | |
| timeout | 超时时间毫秒数 | `8000` |
| withCredentials | 表示跨域请求时是否需要使用凭证 | `true` |
| headers | 被发送的自定义请求头 | |
| resSuccess | 响应正确拦截器 | |
| resError | 响应错误拦截器 | |
| toast | 消息提示，拦截器错误处理中有使用 | `console.log` |
| message | 弹窗提示，拦截器错误处理中有使用 | `console.log` |
| accountAlias | 页面未登录重定向配置 | |
