# starship-dsh-plugins

StarShip 的 DeepSeek Harness 插件开发与实验。

| 插件 | 包名 | 用途 |
| --- | --- | --- |
| [上下文地图](context-map/) | `@local/dsh-context-map` | 以每格 1k tokens 展示模型请求的上下文构成，支持历史请求、消息详情和右侧面板 |
| [外观 · Orca 暗色](dsh-theme-orca/) | `@local/dsh-theme-orca` | 独立管理 DSH 全局背景、边框和文字配色 |

两个插件可以单独安装和启停。上下文地图继承当前主题，外观插件负责全局配色。

## 安装

无需克隆。在 DSH 左侧的 **插件** 页面选择安装，将下面任意一个地址粘贴到安装输入框，按提示确认：

**上下文地图**

```text
https://codeload.github.com/Aster-Z-Song/starship-dsh-plugins/tar.gz/refs/heads/install/context-map
```

**外观 · Orca 暗色**

```text
https://codeload.github.com/Aster-Z-Song/starship-dsh-plugins/tar.gz/refs/heads/install/dsh-theme-orca
```

这些地址分别指向插件安装分支的源码压缩包，包根目录包含 package.json 与 DSH bundle 声明，DSH 自动下载并安装。需要能访问 GitHub；私有仓库需要额外的下载认证，公开分发应将仓库设为公开。

也可以让 DSH 助手调用（下面是工具调用示意，不是终端命令）：

```text
plugin_manager(action: "install_bundle", target: "https://codeload.github.com/Aster-Z-Song/starship-dsh-plugins/tar.gz/refs/heads/install/context-map")
plugin_manager(action: "install_bundle", target: "https://codeload.github.com/Aster-Z-Song/starship-dsh-plugins/tar.gz/refs/heads/install/dsh-theme-orca")
```

Git 客户端方式也可使用 `git+https://github.com/Aster-Z-Song/starship-dsh-plugins.git#install/context-map` 或 `#install/dsh-theme-orca`。不要把 main 分支的普通仓库 URL 或 GitHub 的 tree 子目录网页当作独立插件包。

安装完成后检查 DSH 返回的 `application` 和 `warnings`，并刷新页面。替换已经安装的同名插件时，先通过插件管理器移除旧包再安装；替换 JavaScript 版本可能需要重启 DSH。安装分支更新不会自动更新已安装插件。

开发者仍可克隆仓库并安装本地绝对目录。维护安装分支的方法见 [发布说明](PUBLISHING.md)。

## 开发验证

需要 Node.js 与 pnpm。在上下文地图目录安装依赖后执行验证：

```sh
cd context-map
pnpm install --frozen-lockfile --ignore-scripts
node verify.mjs
```

源码使用 DSH 的 Client module loader、主题服务、槽位和 Session projection API；依赖这些接口的 DSH 版本兼容性需要单独验证。本次归档包含语法及投影测试结果，尚无自动化浏览器视觉验证。

各插件说明与历史记录见对应目录。首次同步过程见 [CHANGELOG.md](CHANGELOG.md)。
