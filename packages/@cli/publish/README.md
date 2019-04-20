
# tommy-version

将文件发布到 GitHub 的 gh-pages 分支（或任何其他分支）

该仓库修改自 gh-pages。仅作为学习参考！

原仓库地址: [https://github.com/tschaub/gh-pages](https://github.com/tschaub/gh-pages)

## 快速开始

```shell
npm install gh-pages --save-dev
```

This module requires Git `>=1.9`.

## 基本用法

```js
const ghpages = require('gh-pages')

ghpages.publish('dist', function(err) {})
```

## `publish`

```js
ghpages.publish(dir, callback)
// or...
ghpages.publish(dir, options, callback)
```

调用此函数将创建当前存储库的临时克隆，创建一个`gh-pages`分支（如果尚不存在），复制基本路径中的所有文件，或仅匹配来自可选src配置的模式，提交所有更改并推送到`origin`

如果`gh-pages`分支已经存在，则在从提供的`src`文件添加任何提交之前，将使用远程的所有提交更新它

**需要注意**的是，在任何文件`gh-pages`分支，是不是在`src`文件**将被删除**。如果您不希望删除任何现有文件，请参阅该[add选项](#optionsadd)


### <a id="dir">`dir`</a>
* type: `string`

所有源文件的基本目录（`src` config属性中列出的文件）

使用示例:

```js
/**
 * 假设目录结构如下:
 *
 *   dist/
 *     index.html
 *     js/
 *       site.js
 *
 * 如下的基本用发会产生一个`gh-pages`分支。目录结构:
 *
 *   index.html
 *   js/
 *     site.js
 *
 */
ghpages.publish('dist', callback);
```


### Options

默认选项适用于简单的情况。下面描述的选项允许推送替代分支、自定义提交消息等等。

#### <a id="optionssrc">options.src</a>
 * type: `string|Array<string>`
 * default: `'**/*'`

用于选择应该发布哪些文件。详细规则见[文档](https://github.com/isaacs/minimatch)


#### <a id="optionsbranch">options.branch</a>
 * type: `string`
 * default: `'gh-pages'`

将要推送的分支的名称。默认情况下使用`GitHub`的`gh-pages`分支，但可以将其配置为推送到任何远程上的任何分支。

```js
/**
 * This task pushes to the `master` branch of the configured `repo`.
 */
ghpages.publish('dist', {
  branch: 'master',
  repo: 'https://example.com/other/repo.git'
}, callback);
```


#### <a id="optionsdest">options.dest</a>
 * type: `string`
 * default: `'.'`

目标分支中的目标文件夹。默认情况下，所有文件都发布到存储库的根目录中

```js
/**
 * Place content in the static/project subdirectory of the target
 * branch.
 */
ghpages.publish('dist', {
  dest: 'static/project'
}, callback);
```

#### <a id="optionsdotfiles">options.dotfiles</a>
 * type: `boolean`
 * default: `false`

包括 `.`。默认情况下，会排除以 `.` 开头的文件。，除非它们在 `src` 数组中显式提供，否则将被忽略。如果您还想包含与`src`模式匹配的点文件，请在选项中设置 `dotfiles: true`

```js
/**
 * The usage below will push dotfiles (directories and files)
 * that otherwise match the `src` pattern.
 */
ghpages.publish('dist', {dotfiles: true}, callback);
```


#### <a id="optionsadd">options.add</a>
 * type: `boolean`
 * default: `false`

只添加，不删除现有文件。默认情况下，目标分支中的现有文件在添加 `src` 配置中的文件之前会被删除。如果您希望任务添加新的 `src` 文件，但不改变现有文件，请在选项中设置 `add: true` 

```js
/**
 * The usage below will only add files to the `gh-pages` branch, never removing
 * any existing files (even if they don't exist in the `src` config).
 */
ghpages.publish('dist', {add: true}, callback);
```


#### <a id="optionsrepo">options.repo</a>
 * type: `string`
 * default: url for the origin remote of the current dir (assumes a git repository)

默认情况下，`gh-pages` 假设当前工作目录是git存储库，并且您希望将更改推送到 `origin` 远程。

如果您的脚本不在git存储库中，或者您想要推送到另一个存储库，那么您可以在 `repo` 选项中提供存储库URL。

```js
/**
 * If the current directory is not a clone of the repository you want to work
 * with, set the URL for the repository in the `repo` option.  This usage will
 * push all files in the `src` config to the `gh-pages` branch of the `repo`.
 */
ghpages.publish('dist', {
  repo: 'https://example.com/other/repo.git'
}, callback);
```


#### <a id="optionsremote">options.remote</a>
 * type: `string`
 * default: `'origin'`

你要推的远程的名字。默认值是 `origin` 远程，但可以将其配置为push到任何远程。

```js
/**
 * This task pushes to the `gh-pages` branch of of your `upstream` remote.
 */
ghpages.publish('dist', {
  remote: 'upstream'
}, callback);
```


#### <a id="optionstag">options.tag</a>
 * type: `string`
 * default: `''`

在提交目标分支上的更改后创建标记。默认情况下，不创建任何标记。要创建标记，请提供标记名称作为选项值。


#### <a id="optionsmessage">options.message</a>
 * type: `string`
 * default: `'Updates'`

The commit message for all commits.

Example use of the `message` option:

```js
/**
 * This adds commits with a custom message.
 */
ghpages.publish('dist', {
  message: 'Auto-generated commit'
}, callback);
```


#### <a id="optionsuser">options.user</a>
 * type: `Object`
 * default: `null`

如果在没有 `user.name` 或 `user.email` 的存储库中运行任务。在git允许您提交之前，您必须提供用户信息。`options.user` 选项接受 `name` 和 `email` 字符串值来标识提交者。

```js
ghpages.publish('dist', {
  user: {
    name: 'Joe Code',
    email: 'coder@example.com'
  }
}, callback);
```


#### <a id="optionssilent">options.silent</a>
 * type: `boolean`
 * default: `false`

避免在错误中显示存储库url或其他信息.

```js
/**
 * This configuration will avoid logging the GH_TOKEN if there is an error.
 */
ghpages.publish('dist', {
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/user/private-repo.git',
  silent: true
}, callback);
```


#### <a id="optionsgit">options.git</a>
 * type: `string`
 * default: `'git'`

自定义 `git` 路径.

```js
/**
 * If `git` is not on your path, provide the path as shown below.
 */
ghpages.publish('dist', {
  git: '/path/to/git'
}, callback);
```

## Command Line Utility

安装该包将创建一个 `tommy-version` 命令行实用程序。运行 `tommy-version --help` 查看支持的选项列表。

在本地安装了 `tommy-version` 后，您可以使用以下内容设置包脚本:

```shell
"scripts": {
  "deploy": "tommy-version -d dist"
}
```

然后要发布从 `dist` 文件夹到 `gh-pages` 分支的所有内容，需要运行以下命令:

```shell
npm run deploy
```

## Debugging

要从 `tommy-version` 脚本获得额外的输出，设置 `NODE_DEBUG=info`。例如:

```shell
NODE_DEBUG=info npm run deploy
```

## Dependencies

请注意，这个插件需要 `Git 1.9` 或更高版本(因为它使用 `——exit-code` 选项来选择 `git ls-remote` )

## Tips

### 报错 `branch already exists`
```
{ ProcessError: fatal: A branch named 'gh-pages' already exists.

    at ChildProcess.<anonymous> (~/node_modules/gh-pages/lib/git.js:42:16)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  code: 128,
  message: 'fatal: A branch named \'gh-pages\' already exists.\n',
  name: 'ProcessError' }
  ```

在处理 `tommy-version` 模块时生成文件 `.cache/` 和如果卡住了一些原因，如错误的密码

它不会自动清除

Run `~node_modules/tommy-version/bin/tommy-version-clean`
or remove `~node_modules/tommy-version/.cache`
