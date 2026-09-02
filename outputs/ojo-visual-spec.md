# OJO-like AI Canvas Visual Spec

> 基于 OJO dashboard 公开可访问页面、加载态、静态资源 token 和产品定位提炼。目标不是复制 OJO，而是沉淀一套适合“AI 生成页面 + 无限画布 + 可交互原型”的工作台视觉规范。

## 1. 设计关键词

- AI-native creation platform
- Prompt first
- Infinite canvas
- Prototype object
- Minimal chrome
- Light/dark theme
- Large radius
- Soft border
- Floating panels

## 2. 产品结构

平台默认采用三栏创作工作台：

```text
TopBar
Left AI Prompt Panel
Center Infinite Canvas
Right Component / Inspector Panel
```

中间画布承载两类对象：

```text
Interactive Phone Prototype
Screen Boards / Flow Boards
```

## 3. 字体规范

### 字体族

```css
--font-family-base: Inter, ui-sans-serif, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
--font-family-display: Aleo, "Playfair Display", Georgia, serif;
```

说明：

- 工作台 UI 使用 `Inter / PingFang SC`
- 品牌标题或营销型展示可使用 `Aleo / Playfair Display`
- 手机页面内部继续使用业务 App 的组件字体，例如 `PingFang SC`

### 字号与行高

| 用途 | 字号 | 行高 | 字重 |
|---|---:|---:|---:|
| 工作台品牌标题 | 15px | 22px | 700 |
| 面板分组标题 | 11px | 18px | 700 |
| 面板正文 | 13px | 22px | 400 |
| 按钮文字 | 13px | 20px | 700 |
| 输入框文字 | 13px | 22px | 400 |
| JSON / Code | 12px | 19px | 400 |
| 手机一级标题 | 20px | 30px | 600 |
| 手机正文 | 14px | 22px | 400 |
| 手机辅助文字 | 13px | 20px | 400 |

规则：

- 不使用负字距
- 控件内文本行高要比字号大 5-9px
- 工作台内不要用过大的标题，视觉中心应该是画布和原型

## 4. 白色主题

白色主题作为默认。

```css
:root {
  --bg-app: #f7f7f5;
  --bg-panel: #fbfbfa;
  --bg-surface: #ffffff;
  --bg-subtle: #f1f1ee;
  --topbar-bg: rgba(255, 255, 252, 0.88);
  --control-bg: rgba(255, 255, 255, 0.76);
  --card-bg: #ffffff;
  --prompt-bg: #ffffff;

  --border: rgba(23, 23, 21, 0.10);
  --border-strong: rgba(23, 23, 21, 0.20);
  --canvas-line: rgba(23, 23, 21, 0.055);

  --text-primary: #171715;
  --text-secondary: rgba(23, 23, 21, 0.68);
  --text-muted: rgba(23, 23, 21, 0.43);

  --accent: #111111;
  --accent-soft: rgba(17, 17, 17, 0.065);
  --active-border: rgba(17, 17, 17, 0.24);
  --button-text: #ffffff;

  --json-bg: #f2f3f0;
  --json-text: #34342f;
  --shadow: 0 22px 70px rgba(32, 32, 28, 0.14);
}
```

## 5. 黑色主题

黑色主题只反转工作台外壳，不强制反转手机业务页面。

```css
html[data-theme="dark"] {
  --bg-app: #080808;
  --bg-panel: #101010;
  --bg-subtle: #171717;
  --topbar-bg: rgba(13, 13, 13, 0.90);
  --control-bg: rgba(255, 255, 255, 0.07);
  --card-bg: rgba(255, 255, 255, 0.055);
  --prompt-bg: #090909;

  --border: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.22);
  --canvas-line: rgba(255, 255, 255, 0.06);

  --text-primary: #f8f8f5;
  --text-secondary: rgba(248, 248, 245, 0.68);
  --text-muted: rgba(248, 248, 245, 0.42);

  --accent: #ffffff;
  --accent-soft: rgba(255, 255, 255, 0.10);
  --active-border: rgba(255, 255, 255, 0.28);
  --button-text: #111111;

  --json-bg: #080808;
  --json-text: rgba(255, 255, 255, 0.78);
  --shadow: 0 26px 90px rgba(0, 0, 0, 0.52);
}
```

## 6. 圆角

| 对象 | 圆角 |
|---|---:|
| App root / 主容器 | 20px |
| 浮动流程条 | 18-20px |
| 面板卡片 | 14-16px |
| 输入框 | 12-16px |
| 小按钮 | 8-12px |
| 手机外壳 | 42-46px |
| 手机屏幕 | 30-32px |
| 手机业务组件卡片 | 8px |

规则：

- 工作台可以大圆角
- 手机内部业务组件保持克制，不要过度圆润
- 不要卡片套卡片

## 7. 间距

基础 spacing：

```css
--space-2: 2px;
--space-4: 4px;
--space-6: 6px;
--space-8: 8px;
--space-10: 10px;
--space-12: 12px;
--space-14: 14px;
--space-16: 16px;
--space-18: 18px;
--space-24: 24px;
--space-32: 32px;
```

布局规则：

- 顶栏高度：56px
- 左面板宽度：304px
- 右面板宽度：336px
- 面板 section padding：16px
- 控件间距：8px
- 卡片内边距：12px
- 画布网格：28px
- 手机与页面平铺间距：40px 左右

## 8. 按钮

### Primary Button

```css
.primary-button {
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  background: var(--accent);
  color: var(--button-text);
  font-size: 13px;
  line-height: 20px;
  font-weight: 700;
}
```

### Icon Button

```css
.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--control-bg);
  border: 1px solid var(--border);
}
```

### Disabled

手机内按钮禁用态：

```css
.app-primary.disabled {
  background: #c7ccd4;
  color: #ffffff;
  cursor: not-allowed;
}
```

规则：

- 工作台按钮可以黑白极简
- 手机业务按钮保持业务品牌蓝色
- 禁用态必须清楚，不只靠透明度

## 9. 面板

面板特点：

- 背景接近页面色，不要重卡片
- section 用细边框分隔
- 信息密度中等偏高
- 文案少，控件清晰

组件：

```text
AI Message
Prompt Box
Prompt Suggestion
Component Card
Inspector Field
Layer Item
JSON Viewer
```

## 10. 无限画布

画布规范：

```css
.canvas {
  background:
    linear-gradient(var(--canvas-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--canvas-line) 1px, transparent 1px),
    var(--bg-app);
  background-size: 28px 28px;
}
```

规则：

- 画布是主视觉区域
- 对象浮在画布上
- 不要让面板和装饰抢占画布
- 流程、手机、页面都应该是 canvas object

## 11. 手机原型

手机用于“展示给别人看”，不是编辑容器。

结构：

```text
Phone Device
Phone Screen
Status Bar
Current Screen
Interactive Components
```

规则：

- 手机内只展示当前流程状态
- 手机可点击、可输入、可跳转
- 手机内部保持 App 原本白色视觉
- 不跟随工作台黑色主题整体反黑

## 12. 页面全览

平铺页面用于设计检查。

结构：

```text
Screen Board 01
Screen Board 02
Screen Board 03
Screen Board 04
```

规则：

- 平铺页面展示全部流程页面
- 当前手机状态对应的页面高亮
- 页面可点击选中组件
- 页面与手机共享同一份 DSL 状态

## 13. 流程展示

流程条是页面上方的核心交互展示。

结构：

```text
Step 1 → Step 2 → Step 3 → Step 4
```

规则：

- 每一步可点击
- 当前步骤高亮
- 点击步骤切换手机状态
- 流程条不替代页面平铺，只负责导航和说明

## 14. 反黑规则

必须分清两个层级：

```text
Workbench Theme: can be light or dark
Generated App Theme: fixed by generated product
```

也就是说：

- 工作台可反黑
- AI 面板可反黑
- Inspector 可反黑
- 画布可反黑
- 手机外壳可变黑
- 手机里的 App 页面默认不反黑

除非用户明确说“生成 App 的暗黑模式页面”。

## 15. 第一版组件清单

```text
WorkspaceShell
TopBar
ThemeSwitch
AIPromptPanel
PromptBox
PromptSuggestion
CanvasWorkspace
FloatingToolbar
FlowStrip
FlowStep
PhonePrototype
PhoneScreen
ScreenBoard
ComponentLibraryPanel
VariantCard
InspectorPanel
PropertyField
LayerList
JsonViewer
```

## 16. 实施顺序

1. 先落 token：颜色、字体、行高、圆角、阴影
2. 再改 shell：TopBar、左右面板、中间画布
3. 再改组件：按钮、输入框、卡片、JSON、流程条
4. 再改 canvas object：手机、页面平铺、当前状态高亮
5. 最后检查黑白主题对比度和手机内部可读性

