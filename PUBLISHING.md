# URL 安装入口维护

main 保留两个插件的源码目录。每个安装分支只包含一个插件，并把插件目录提升到分支根目录，供 DSH 直接安装。

| 源目录 | 安装分支 |
| --- | --- |
| context-map/ | install/context-map |
| dsh-theme-orca/ | install/dsh-theme-orca |

在 main 提交修改并完成验证后，从仓库根目录执行：

```sh
git subtree split --prefix=context-map -b install/context-map
git subtree split --prefix=dsh-theme-orca -b install/dsh-theme-orca
git push origin main install/context-map install/dsh-theme-orca
```

后续更新已有本地安装分支时，先在 main 执行 `git subtree split --prefix=context-map` 获取提交哈希，再用 `git merge-base --is-ancestor install/context-map <新哈希>` 检查可快进后，以 `git branch -f install/context-map <新哈希>` 更新本地引用；另一个插件同理。远端只做普通 push，不强制改写已发布历史。

每次发布应核对安装分支根目录的 package.json、cordis.patch.yml、入口文件、locale 和 icon。外部 npm 依赖应声明在 dependencies 中；不要提交 node_modules、本机配置或会话数据。两个包没有安装脚本或构建步骤。

固定版本可给对应安装分支提交打独立标签，例如 `context-map-v1.0.0`，安装 URL 中将 `refs/heads/install/context-map` 替换为 `refs/tags/context-map-v1.0.0`。创建新标签前先检查该标签是否存在，不覆盖已有版本标签。

压缩包 URL 由 GitHub 提供，客户端必须能访问 codeload.github.com。私人仓库不能保证匿名下载；本仓库访问权限由仓库所有者决定，发布过程不自动修改可见性。
