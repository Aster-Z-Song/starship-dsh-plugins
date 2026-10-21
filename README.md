# starship-dsh-plugins

StarShip 的 DeepSeek Harness 插件开发与实验。

| 插件 | 包名 | 用途 |
| --- | --- | --- |
| [上下文地图](context-map/) | `@local/dsh-context-map` | 以每格 1k tokens 展示模型请求的上下文构成，支持历史请求、消息详情和右侧面板 |
| [外观 · Orca 暗色](dsh-theme-orca/) | `@local/dsh-theme-orca` | 独立管理 DSH 全局背景、边框和文字配色 |

两个插件可以单独安装和启停。上下文地图继承当前主题，外观插件负责全局配色。

## 安装

克隆本仓库后，在 DSH 中让助手通过插件管理器安装所需插件的本地绝对目录：

```text
plugin_manager(action: "install_bundle", target: "<仓库绝对路径>/context-map")
plugin_manager(action: "install_bundle", target: "<仓库绝对路径>/dsh-theme-orca")
```

这是工具调用示意，不是终端命令。安装完成后检查工具返回的 `application` 和 `warnings`，并刷新页面。替换已安装的 JavaScript 版本可能需要重启 DSH。

## 开发验证

需要 Node.js 与 pnpm。在上下文地图目录安装依赖后执行验证：

```sh
cd context-map
pnpm install --frozen-lockfile --ignore-scripts
node verify.mjs
```

源码使用 DSH 的 Client module loader、主题服务、槽位和 Session projection API；依赖这些接口的 DSH 版本兼容性需要单独验证。本次归档包含语法及投影测试结果，尚无自动化浏览器视觉验证。

各插件说明与历史记录见对应目录。首次同步过程见 [CHANGELOG.md](CHANGELOG.md)。
