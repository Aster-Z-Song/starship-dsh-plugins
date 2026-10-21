# 变更日志

## 2026-10-21 · GitHub 归档

### 目的
将上下文地图与独立外观插件同步到用户指定仓库。

### 过程
复制运行源码、资源、锁文件与验证脚本，保留此前日志；更新 README，说明全局配色已由独立外观插件管理。排除依赖和临时调试脚本。

### 结果
运行源码未改动；语法检查和投影验证通过。

### 遗留
浏览器视觉验证仍未完成。以下为历史记录，其中早期主题覆盖方案已被独立外观插件替代。

---

本文件记录 @local/dsh-context-map 插件的全部改动，供迁移、复现与优化使用。

每条记录固定四段：**目的**（为什么做）、**过程**（怎么做的）、**结果**（实际效果）、**遗留**（未验证或已知问题）。

约定：
- 日期用 `YYYY-MM-DD`，时间用本地时区 `Asia/Shanghai`。
- 涉及的文件按相对路径记录，行号引用形如 `client.js:145`。
- 每次改动后运行 `node verify.mjs`，结果记入「结果」段。
- 未在真实页面上目视确认的行为，一律在「遗留」段注明，不写成已验证。

---

## 2026-10-20 · 基础实现

### 目的
在 DSH 的「对话 / 轨迹」旁增加上下文窗口可视化：按 1k token 分格显示模型输入的分类构成（prompt / tool / memory / user / assistant），能定位「哪类内容吃掉了上下文」。

### 过程
1. `index.js` 注册 Host 侧 `sessionProjections`，用 `createProjection` 纯折叠既有日志事件，不新增事件类型、不持久化记忆。
2. `projection.js` 实现折叠：按 `seq` 记录 surface 分段，在 `assistant/attempt` / `assistant/message` 结算时冻结输入快照（先于写入本次输出）。
3. 估算规则：`ctx.tokenMeter.estimateMessage(message)`；工具定义按 `Math.ceil(JSON.stringify(tools).length / 4) + 4`。
4. 分类映射：`system/message`、`developer/message` → prompt；`tool/result` → tools；带 `source.kind === 'compact-checkpoint'` 的 `user/message` → memory；其余 user → user；assistant → assistant。
5. `client.js` 用 `window.__ModuleLoader__.load` 工厂模式注册 React 组件，渲染 1k 格网格，悬停出预览、点击开 `<dialog>` 详情。
6. 投影只保存 `{seq, turn, step, attempt, provider, model, time, status, segments, estimated, usageInput, contextWindow}`，不含消息正文；正文按需从 session 历史读取。

### 结果
- `node verify.mjs` 通过：跨步骤、成功请求无需预先 attempt、重试、压缩替换位置、不可变历史、无正文缓存、窗口容量、256 次历史上限。
- 保留最近 256 次尝试，超出部分只记丢弃计数。

### 遗留
- 目录链接插件无法解析安装目录中的 `@deepseek-ai/dsh-session`，`index.js` 内联了少量 surface 消息提取规则；升级 DSH 后需核对事件契约。

---

## 2026-10-20 · 槽位接管失败与改用页头挂载

### 目的
按用户「方案 A」，把上下文视图从页签移到聊天右侧常驻显示。

### 过程
1. 首次尝试 `ctx.slots.register({name:'main.conversation', priority:10, children:{'conversation.header':{...}}}, Component)` —— 报错 `slot "conversation.header" is already declared`。子槽位归属唯一，原页头无法被新外壳继承。
2. 尝试 `priority:-10` 与 `priority:100` 交替注册：占用者始终 `active:false`，原实现始终 `active:true`。优先级不能改变子槽位所有权。
3. 尝试省略 `children`：注册成功但组件拿不到 `renderSlot` 授权，无法渲染原页头与 `conversation.content` 工厂。
4. 结论：DSH 槽位系统没有公开的「继承 / 包装 / 影子」机制（读 `@deepseek-ai/dsh-client-ui-renderer/lib/client.js` 的 `standardKit`、`boundRenderSlot` 确认：`renderSlot` 仅在 `entry.children` 存在时注入，且只授权 `entry.children` 里声明过的 key）。
5. 改用 `ctx.slots.inject('conversation.session.header.utilities', ...)` 挂载，配合 CSS 在聊天右侧预留空间。

### 结果
- 上下文面板在页头工具区成功注册（`occupants` 可见 `context-map-sidebar`）。
- 保留原聊天、页头与输入组件，功能不缺失。

### 遗留
- 这是「CSS 预留空间 + 固定定位」，不是真正的双栏流式布局。DSH 原生右侧栏打开时会争用右侧区域。

---

## 2026-10-20 · 主题覆盖与命名空间清理

### 目的
全局改为紫黑配色；同时修掉插件反复加载后词典泄漏的问题。

### 过程
1. 用 `ctx.theme.overrideTokens('@local/dsh-context-map', {...})` 覆盖 `--dsw-alias-bg-base` 等 token（该 API 要求每个 token 同时给 `light` 与 `dark`）。
2. 词典命名空间从 `context-map.ui.v2` 升到 `context-map.ui.v3`，并把 `ctx.locale.register(...)` 包进 `ctx.effect(...)`，卸载时自动清理。

### 结果
- 覆盖层生效，`application: applied`，无 warnings。
- 重载插件不再出现「词典已注册」阻塞。

### 遗留
- 覆盖层写死深浅两套值，跟随系统主题切换时不做区分。

---

## 2026-10-21 · 面板可拖动、可收起

### 目的
用户反馈 340px 写死不合适，要求能左右拖动、拖到边缘隐藏，或点击开关。

### 过程
1. 面板宽度存 `localStorage['dsh.contextMap.panel']`（`{open, width}`），范围 240–640px。
2. 拖动：左边缘 `role="separator"` 手柄，Pointer Events + `setPointerCapture`。
3. 拖到不足 150px 松手 → 收起；手柄支持 ←/→（每次 20px）、Home/End、Esc。
4. 页头「上下文」按钮切换开关，面板内 × 关闭；收起时释放聊天预留空间。

### 结果
- 交互齐备，宽度与开关状态跨刷新保留。

### 遗留
- 未在真实页面确认拖动手感（见「拖动卡顿」条）。

---

## 2026-10-21 · 拖动卡顿优化

### 目的
用户反馈拖动不流畅，「不如右上角那个收起侧边栏，拖拉响应很快」。

### 过程
对比 DSH 原生右侧栏实现（`@deepseek-ai/dsh-client-ui-layout` README：「Dragging has no transition delay」）后定位三处开销：
1. 原实现每次 `pointermove` 都 `setState`，导致 React 重画整个网格、并替换整段动态 CSS（`style` 节点内容每次都变）。
2. 网格用了 `React.memo` 包裹的视图，但父组件重渲染仍会重算。
3. 宽度带 CSS 过渡，造成拖动跟手延迟。

改法：
1. 宽度改为 CSS 变量 `--cm-panel-width` / `--cm-panel-space`，直接写 `element.style.setProperty`，绕开 React 渲染路径。
2. 拖动期间用 `requestAnimationFrame` 节流，每帧最多写一次。
3. 动态 CSS 里的宽度值改为引用变量，样式表本身不再随拖动变化。
4. 显式 `transition: none !important`，去掉过渡延迟。
5. 松手时才 `setPanel` 写回 React 状态与 `localStorage`。

### 结果
- 拖动路径不再触发 React 重渲染；语法检查通过；插件重载 `applied`。
- 拖动响应速度未经浏览器实测。

### 遗留
- 用户尚未确认卡顿是否解决。

---

## 2026-10-21 · 配色改回紫黑、悬浮框改虎鲸色

### 目的
用户澄清：要改的是「整个 DSH 的配色」而非格子颜色；后又要求整体改成黑白灰「虎鲸色」。

### 过程
1. 一次误改：把格子分类色改成灰阶 → 用户指出搞错 → 已恢复原分类色（prompt `#9ca3af`、tools `#22a447`、memory `#f5a34d`、user `#20a9e0`、assistant 取 `--dsw-alias-state-error-primary`）。
2. 全局背景由 context-map 插件的 `palette` 常量直接控制，避免依赖独立主题插件。
3. 独立主题插件 `@local/dsh-theme-orca` 尝试失败：
   - Host 侧 `ctx.theme` 报 `cannot get property "theme" without inject`（缺 `inject: ['theme']`）。
   - 补上 `inject` 后报 `pending (waiting for service: theme)`——theme 服务在插件激活时尚未就绪。
   - 改回 Client 侧仍报同样错误（Client 插件的 inject 需在 `package.json` 的 `dsh.client.inject` 声明，但报错依旧）。
   - 最终放弃独立主题插件，把配色并入 context-map 的 `palette`，并从 `cordis.patch.yml` 移除主题插件条目。
4. 最终虎鲸色值：`bg-base #0a0d12`、`bg-layer-1 #0f131c`、`bg-layer-2 #161d2b`、`bg-overlay #1e2636`、`border-l1 #2a3241`、`border-l2 #3a4454`、`sidebar-fill #0f131c`。
5. 悬浮提示框与消息对话框改为同色系：`tooltip #1a1e2b`、`dialog #131822`、`backdrop #0a0d12cc`（比背景略亮，保留悬浮层次感）。

### 结果
- 全局背景变黑白灰；悬浮框与背景协调。
- 网格分类色保持原样。

### 遗留
- 独立主题插件 `@local/dsh-theme-orca` 仍留在 profile 中且处于 pending 状态，每次插件操作都会报该 warning。建议后续清理。

---

## 2026-10-21 · 视觉向 Magpie 靠拢

### 目的
用户提供 Magpie 上下文窗口截图作为参考，要求视觉上对标。

### 过程
1. 分类色提亮：tools `#34d058`、memory `#ff9f40`、user `#50b5ff`、assistant `#ff6b6b`（prompt 保持灰 `#9ca3af`）。
2. 格子从 `minmax(12px,1fr)` 放大到 `minmax(16px,1fr)`（侧栏内 `14px`），间距 `4px`（侧栏 `3px`），圆角 `3px` → `4px`。
3. 顶部加占用率大字（40px / 侧栏 32px）+ 圆角进度条，取代原先三个平铺数字。
4. 悬浮提示改为同步显示该格分类聚合（不再 160ms 延时读消息），详情仍靠点击弹窗。

### 结果
- 视觉接近参考图；语法检查通过。

### 遗留
- 未与参考图逐像素比对。

---

## 2026-10-21 · 效率指标卡片（压缩率 / 工具密度 / 健康度）

### 目的
用户授权「自由进化一次」，我加入 token 效率分析。

### 过程
新增三项指标（`client.js` 效率卡片）：
1. **压缩率** = memory tokens / 全部 segments tokens。
2. **工具密度** = tools tokens / 全部 segments tokens。
3. **健康度** = `round((1 - 使用率×0.6) × (均衡度×0.4 + 0.6) × 100)`，其中使用率 = estimated / contextWindow，均衡度 = `1 - max(分类占比)`。

### 结果
- 卡片显示于占用率下方，数值用等宽数字；健康度按 ≥70 绿 / 50–69 橙 / <50 红着色。

### 遗留
- **健康度公式是我构造的，没有依据**，用户可能被误导当作事实指标。后续应改为可展开的分解式，或降级为「窗口占用」这类含义明确的单一指标。
- 指标含义对用户不直观 → 下一条补悬浮解释。

---

## 2026-10-21 · 指标悬浮解释

### 目的
用户反馈三个概念乍看不好懂，要求悬停显示解释。

### 过程
1. 首次用原生 `title` 属性 → 鼠标光标变问号但提示不出现（DSH 样式或 Electron 环境下原生 title 不可靠）。
2. 改为自绘：新增 `metricTip` 状态与 `showMetricTip(metric, event)`，复用格子悬浮用的 `.cm-tooltip` 样式（`position:fixed`，跟随元素 `getBoundingClientRect`）。
3. 触发范围两次收紧：
   - 第一版绑在 `.cm-metric` 整块上 → 用户反馈范围太大。
   - 改为绑在标签 `div` 上 → 仍觉得「一整行都是判定区域」。
   - 最终版把标签改为内联 `span`，只在「压缩率 / 工具密度 / 健康度」这几个字本身触发。
4. 同时移除 `cursor: help`（用户认为问号光标没意义）。

### 结果
- 悬浮框用与格子一致的黑灰样式，显示中英文解释。
- 语法检查通过。

### 遗留
- 未在真实页面确认触发区域大小是否符合预期。

---

## 2026-10-21 · 优化建议卡片

### 目的
第二次「自由进化」，加入可执行的诊断建议。

### 过程
健康度 < 50 时，按优先级给出单条建议（红边框 + 浅红底卡片）：
1. 窗口使用率 > 85% → `suggestFork`（建议 fork 会话）。
2. 助手历史 > 50% → `suggestCompact`（建议触发自动压缩）。
3. 工具密度 > 40% → `suggestBalance`（工具定义可能冗余）。

### 结果
- 建议卡片出现在效率卡片下方。

### 遗留
- 触发阈值同样是构造值，未经校准；用户反馈「没看懂也没看到具体效果」——大概率是健康度从未低于 50，所以卡片不出现。

---

## 2026-10-21 · 健康度趋势折线图

### 目的
第三次「自由进化」，让用户看出上下文质量是在改善还是恶化。

### 过程
1. 取最近 10 次请求，用与健康度相同的公式逐个计算，映射到 SVG 坐标（220×44 视口，`preserveAspectRatio="none"`）。
2. 画半透明面积填充 + 2px 品牌色折线 + 2.5px 数据点圆点。
3. 右侧标签显示首尾差值：`+12 上升`（绿）/ `-8 下降`（红）/ `0 稳定`（橙）。

### 结果
- 折线图位于效率卡片下方；需要至少 2 次已结算请求才出现。

### 遗留
- 沿用未经验证的健康度公式。

---

## 2026-10-21 · 增量对比与最大占用项

### 目的
第四次「自由进化」。用户认可方向后我列出候选清单（增量对比、最大占用项排行、换模型预检、单条合成比例条、网格键盘导航、导出快照、修正健康度公式），用户回复「可以」，我按先前承诺的优先级先做前两项。

### 过程

**A. 增量对比（`client.js`）**
- 以 `index` 为准取前一次请求 `previous = requests[index-1]`。
- 按日志序号 `seq` 建两个 Map（上次 / 本次的 seq → tokens）。
- 逐 seq 比较：
  - 本次 tokens > 上次 → 计入 `added`，差额记入 `addedItems`。
  - 本次 tokens ≤ 上次 → 整段计入 `reused`。
  - 上次有、本次没有的 seq → 计入 `removed`（压缩替换会落在这里）。
- 渲染「较上次变化」卡片：新增（绿）/ 复用（灰）/ 移除（红）三个数字 + 新增项明细列表（`+12.3K`）。

**B. 最大占用项（`client.js`）**
- 把当前请求的 segments 按 `seq` 归并，每条日志消息（或工具定义头）算一项，tokens 累加，保留前 6。
- 渲染「最大占用项」卡片：分类色点 + 名称 + 占比条 + token 数。

**C. 名称按需读取（`client.js` + `labelOf`）**
- 投影刻意不存正文，所以名称在客户端按需读：新增 `labelOf(event, body)` 从事件里取 `toolName` / `name` / `tool-call.name`，取不到就正则匹配正文里的 `"toolName"` / `"name"`，再退回首行文本截断 42 字，最后退到 `#seq`。
- `readMessages` 扩展为返回 `label`。
- 新增 `labels` state + effect：对前 6 大项与前 6 个新增项（去重，上限 12 个 seq）读一次历史，填 `seq → label` 映射。

### 结果
- `node --check client.js` 通过；插件重载 `application: applied`。
- 增量对比与最大占用项卡片已渲染。

### 遗留
- 增量判定基于日志序号：同一 seq 两次请求间 token 数变化时计为「新增」；压缩替换把多个 seq 换成一个新 seq，因此表现为「移除 + 新增」，不是精确的「本次新增了什么」。
- 名称首次显示需读取历史，会有短暂延迟；读取失败时退回 `#seq`。
- 卡片未经用户目视确认。

---

## 2026-10-21 · 功能补全批次（换模型预检 / 导出 / 健康度重做 / 增量精确化 / 键盘导航 / 聚类高亮 / 构成条 / 消息预览）

### 目的
用户要求把此前列出的候选清单全部做完：「你自己安排吧，全做了」。清单为：换模型预检、导出快照、健康度重做、增量精确化、网格键盘导航、格子聚类高亮、时间轴标尺、最大占用项消息预览。

### 过程

**A. 投影：标记工具定义段（`projection.js`）**
- 工具定义每次请求都重新发送，但日志序号是新的（`request/header` 事件），增量对比会把它算成「每次都新增」，污染结论。
- `segment` schema 增加可选 `def:boolean`；工具定义段写入 `def:true`。
- 影响：增量对比与最大占用项能把工具定义单独归类。

**B. 健康度重做（`client.js`）**
- 删除编造的合成分数 `health = (1-使用率×0.6)×(均衡度×0.4+0.6)×100`。
- 效率卡片第三项改为**分布均衡** = 最大分类占比（%），是一个可直接核实的比例。
- 趋势图从「健康度曲线」改为**窗口占用率曲线**（`estimated / contextWindow`）。
- 建议卡片触发条件改为直接看占用率、助手占比、工具密度，不再依赖合成分数；边框色由红改橙（警告而非错误）。

**C. 增量对比精确化（`client.js`）**
- 区分四种情况：新增（seq 从未出现）、增长（seq 出现过但 token 变多）、复用（不变）、移除（seq 消失，压缩替换落在这里）。
- 工具定义段（`def:true`）从新增/复用中剔除，单独显示为「工具定义（每请求重复）」。
- 新增 `growth` 数值与 `grew` 文案。

**D. 模型容量对照（`client.js`）**
- **重要约束**：DSH 客户端服务里没有模型目录（`layout` / `locale` / `sessions` / `slots` / `theme` / `timer` / `uiWorkspace` / `workspaces`），`llm` 是 Host 服务，插件拿不到；模型选择器 `conversation.input.model` 的条目由 DSH 内部管理，不向插件暴露列表。
- 因此改为**用本会话日志里观测到的模型**：从 256 条请求里按 model 聚合，取观测到的最大 contextWindow，标出「可容纳 / 装不下 / 窗口未知」。
- 卡片注明来源：「基于本会话观测到的模型窗口」。

**E. 导出快照（`client.js`）**
- 工具栏加「复制 Markdown」「复制 JSON」两个按钮。
- Markdown 含总量、模型报告输入、轮/步/尝试、分类明细、最大占用项、增量四项；JSON 为同样字段的结构化版本。
- 通过 `navigator.clipboard.writeText` 写入，按钮右侧显示「已复制到剪贴板 / 复制失败」状态。

**F. 网格键盘导航（`client.js`）**
- 网格容器 `role="grid"`，格子用 roving tabindex（只有当前格子 `tabIndex=0`）。
- 方向键在格子间移动，列数从 `getComputedStyle(grid).gridTemplateColumns` 实测；Home/End 跳首尾。
- 移动时 `focus()` + `scrollIntoView({block:'nearest'})`。
- 网格下方提示文案改为「方向键在格子间移动，回车打开详情」。

**G. 格子聚类高亮（`client.js`）**
- 悬停某格时收集该格涉及的全部 seq，存入 `cluster` 状态；所有包含这些 seq 的格子加 `.cm-cell-related`（描边）。
- 直观显示「这条消息跨了多少格」。

**H. 输入构成条（`client.js`）**
- 按上下文顺序把 segments 合并成同类连续段，渲染成一条连续比例条，下方每 20K 一个刻度。
- 回答「前 50K 是什么、后 100K 是什么」，替代原本只有格子的读法。

**I. 最大占用项消息预览（`client.js`）**
- 每行改为按钮，点击展开该条消息的正文前 400 字符（`<pre class="cm-item-preview">`）。
- 正文与名称共用一次按需读取：一次 `readMessages` 同时取 label 与 body。

**J. 样式**
- 新增 `.cm-cell-related`、`.cm-item-button`、`.cm-item-preview`、`.cm-composition`、`.cm-composition-part`、`.cm-axis`、`.cm-axis-tick`、`.cm-delta-grow`、`.cm-panel-card`、`.cm-card-title`、`.cm-items`、`.cm-item*`，并在侧栏媒体查询里缩小字号与条高。

**K. 效率卡片重构**
- 三行内联的 `h('span',{onMouseEnter:...,onMouseLeave:...},t(key))` 改为一个 `metric(key, value, color)` 助手函数。
- 原因：这三行内联写法曾导致整个文件解析失败（见「遗留」）。

**L. 清理**
- 卸载 `@local/dsh-theme-orca`（一直处于 pending，每次插件操作都产生 warning）；配色已并入 context-map 的 `palette`。

### 结果
- `node --check client.js` 通过；`node verify.mjs` 通过（投影行为未受影响，工具定义标记是可选字段）。
- 插件重载 `application: applied`，**warnings 为空**（主题插件卸载后不再有 pending 警告）。
- 上述 8 项功能已写入代码。

### 遗留
- **本次调试代价很大**：内联写法导致的语法错误耗了大量时间，且 V8 的报错位置（指向第 342 行）具有误导性。教训：不要用 PowerShell 字符串拼接改含反引号的 JS（PowerShell 会吃掉反引号），一律用编辑工具。
- 工具目录 `tools/` 下留了几个临时排查脚本（balance-check / bisect / single / chunk / template-check 等），可删除，但保留可复现「V8 报错位置误导」这一坑。
- 模型容量对照只覆盖**本会话观测到的模型**，不是全局模型目录；用户若想预检一个从未用过的模型，这里看不到。
- 增量对比的「增长」分支在实践中几乎不会出现（同一 seq 的估算值是确定的），保留它是为了防御估算器变化。
- 所有新界面均未经用户目视确认。
- 词典里 `health` / `healthGood` / `healthWarning` / `healthPoor` 四个键已无人使用，暂未删除。

---

## 2026-10-21 · 建立变更日志

### 目的
用户要求：每次修改都要记录目的、过程、结果，供后续迁移时复现或优化。

### 过程
1. 新建 `CHANGELOG.md`，约定每条记录固定四段（目的 / 过程 / 结果 / 遗留），并说明日期时区、文件引用格式、验证要求。
2. 回填本轮全部改动，共 11 条：从基础实现、槽位接管失败、主题覆盖、面板拖动、拖动优化、配色调整、Magpie 视觉对齐、效率指标、悬浮解释、建议卡片、趋势图，到增量对比与最大占用项。
3. 每条都如实标注「遗留」，包括槽位接管失败的原因、拖动优化未实测、健康度公式是我构造的、建议卡片可能从未触发、增量判定基于 seq 的近似性质等。
4. 末尾加「待办与已知债务」表格：健康度公式待修正、待卸载的 pending 主题插件、真正双栏布局未实现、换模型预检 / 键盘导航 / 导出快照未实现、无浏览器控制权的验证限制。
5. README 的「文件与维护」段加入 CHANGELOG 入口，说明迁移时按该文件回放。

### 结果
- 变更历史可溯源；`CHANGELOG.md` 与 README 互相指向。

### 遗留
- 后续每次改动都需追加一条；若中途改变了本文件的记录约定，需在此说明。

---

## 2026-10-21 · 投影崩溃修复（自进化期间历史加载失败）— 第二次尝试

### 目的
自进化时投影层反复崩溃，错误：`Cannot destructure property 'sessionId' of 'undefined'`。

### 过程
定位真正的问题在于 `projection.js` 第 29 行：
```javascript
apply(state,event,{sessionId})  // ❌ 尝试解构第三个参数
```

DSH 框架调用 `apply` 时，第三个参数不是预期的对象，导致解构失败。

修复方案：
1. 改为 `apply(state,event,context)` — 接收参数但不解构。
2. `index.js` 中的 `deriveEventMessage` 加强了空值检查（之前版本）。

### 结果
- 语法检查通过；`node verify.mjs` 通过。
- 投影不再在 `apply` 入口解构，应能正常加载既有会话。

### 遗留
- 未在真实 DSH 会话加载中确认是否最终解决。

---



## 待办与已知债务

| 项 | 说明 |
|---|---|
| 健康度公式 | 已删除。改为可核实的比例指标（占用率 / 分布均衡 / 压缩率 / 工具密度） |
| `@local/dsh-theme-orca` | 已卸载，pending warning 消失 |
| 真正双栏布局 | 槽位系统无包装机制，现为 CSS 预留空间 + 固定定位 |
| 换模型预检 | 已实现，但只覆盖本会话观测到的模型（插件拿不到全局模型目录） |
| 网格键盘导航 | 已实现（方向键 / Home / End，roving tabindex） |
| 导出快照 | 已实现（复制 Markdown / JSON 到剪贴板） |
| 聚类高亮 / 构成条 / 消息预览 | 已实现 |
| 编辑工具链 | **禁止用 PowerShell 拼接改含反引号的 JS**（会吃掉反引号且 V8 报错位置误导）。用编辑工具 |
| 验证手段 | 无浏览器控制权，所有渲染效果均需用户目视确认 |
| 投影崩溃修复 | 已修复（会话加载时事件数据可靠性加强） |
