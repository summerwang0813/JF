# Figma 组件转 Codex 可用组件交付标准

## 目标

当负责人把 Figma 组件链接交给 Codex 时，Codex 必须输出一套可被设计 Agent 读取、可被 React 项目运行、可被设计师验收的标准组件资产。

本标准只覆盖 MVP 阶段组件交付，不覆盖完整业务系统开发。

## 输入要求

负责人给 Codex 的最小输入：

```text
1. Figma 组件链接，必须带 node-id
2. 组件用途说明
3. 组件所有正式变体说明
4. 可替换文案和可替换属性
5. 状态切换规则
```

如果 Figma 中存在临时变体、重复变体、命名不清的变体，负责人必须确认是否进入 registry。未确认前，Codex 只能标记为 `excludedFigmaVariants`，不能作为 Agent 可调用状态。

## 输出目录

每个组件必须独立成一个目录：

```text
mvp-assets/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.preview.tsx
├── component.meta.json
├── README.md
└── assets/
    └── ...
```

全局设计资产放在：

```text
mvp-assets/design/
├── tokens.json
├── tailwind.tokens.json
└── tailwind.config.reference.ts
```

全局注册表放在：

```text
mvp-assets/components/registry.json
```

## 统一技术栈

组件必须使用：

```text
React + TypeScript + Tailwind CSS
```

要求：

- React 负责组件结构和交互。
- TypeScript 负责 props、variant、事件类型约束。
- Tailwind CSS 负责视觉样式。
- 不允许用另一套独立 CSS 重新写样式，除非是项目级 Tailwind base 文件或 token 变量入口。

## TSX 组件要求

每个 `ComponentName.tsx` 必须满足：

- 默认导出组件。
- 导出 props 类型。
- 导出 variant 类型。
- 支持 registry 声明的全部正式状态。
- 文案、value、disabled、错误文案、图标、状态都必须可通过 props 替换。
- 不把业务文案、手机号、验证码、倒计时等写死为唯一值。
- 图标和图片必须使用本地 assets，不允许依赖 Figma 临时链接。
- 样式必须使用 Tailwind className，并读取统一 token。
- 组件内不得发明新的品牌色、字号、间距、圆角。

## Tailwind Token 要求

组件不能直接散落大量 raw hex。允许少量 Figma 对齐所需的 arbitrary value，但必须优先使用统一 token。

推荐命名：

```text
text-fd-primary
text-fd-secondary
text-fd-disabled
text-fd-error
bg-fd-page
bg-fd-card
border-fd-default
border-fd-active
rounded-fd-sm
h-fd-input
```

token 来源：

```text
mvp-assets/design/tokens.json
```

Tailwind 映射：

```text
mvp-assets/design/tailwind.tokens.json
mvp-assets/design/tailwind.config.reference.ts
```

## Preview 要求

每个组件必须有 `ComponentName.preview.tsx`，用于设计和研发验收。

Preview 必须展示：

- 所有 registry 中声明的正式 variant。
- 至少一个 props 可修改示例。
- 至少一个状态切换示例。
- 错误态、禁用态、输入中态等关键状态。

Preview 可以是独立 React 页面，也可以被 Storybook/Vite Playground 引入。

## component.meta.json 要求

每个组件必须有机器可读的 `component.meta.json`。

必须包含：

```json
{
  "name": "ComponentName",
  "displayName": "中文组件名",
  "figma": {
    "fileKey": "...",
    "nodeId": "...",
    "url": "..."
  },
  "techStack": ["React", "TypeScript", "Tailwind CSS"],
  "variants": [],
  "props": {},
  "assets": [],
  "preview": "./ComponentName.preview.tsx",
  "agentUsage": []
}
```

## README 要求

每个组件 README 必须给人看，至少包含：

- 组件用途
- Figma 来源
- 变体表
- props 表
- 交互规则
- 视觉规则
- 最小调用示例
- 验收 checklist

## 验收标准

一个组件只有同时满足以下条件，才算可交付：

| 检查项 | 要求 |
|---|---|
| Figma 来源 | 有 fileKey、nodeId、组件名 |
| 变体 | registry 声明的状态全部实现 |
| Props | 文案和值可替换，不硬编码 |
| 技术栈 | React + TypeScript + Tailwind CSS |
| Token | 使用统一 token，不自造视觉系统 |
| 资源 | 图片/图标已本地化 |
| Preview | 可渲染全部状态 |
| 可运行 | 在 React/Vite/Tailwind 环境中可 import |
| 可验收 | 设计师可对照 Figma 检查状态和视觉 |

## Codex 完成定义

Codex 不能只输出 `.tsx` 就结束。必须完成：

```text
1. 拉取 Figma 设计上下文
2. 梳理组件变体和状态
3. 下载并本地化 assets
4. 生成 React + TypeScript + Tailwind 组件
5. 生成 preview
6. 生成 component.meta.json
7. 更新 registry.json
8. 生成 README
9. 校验 JSON、引用路径和静态语法
10. 输出验收结论
```

如果缺少负责人输入或 Figma 变体不清楚，Codex 应在交付文件中标记 `needsDesignConfirmation`，不能静默猜测。
