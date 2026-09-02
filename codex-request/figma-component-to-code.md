# Codex Request: Figma 组件转可运行代码

## 任务类型

`figma_component_to_runnable_code`

## 你要做什么

请把我提供的 Figma 组件链接转换成 JF 标准组件交付。

目标不是只生成一段 TSX，而是生成一套 Codex、设计 Agent、研发和设计师都能使用和验收的组件资产。

## 输入

请读取下面信息：

```text
Figma 组件链接：
<在这里粘贴带 node-id 的 Figma 链接>

组件用途：
<说明这个组件用于什么业务场景，例如登录注册输入框、按钮、卡片、弹窗>

正式变体：
<列出设计确认过的正式变体。如果不确定，请从 Figma 中读取并标记 needsDesignConfirmation>

可替换属性：
<列出 props，例如 value、placeholder、title、disabled、errorMessage、icon、onClick>

交互规则：
<说明聚焦、输入、点击、错误、禁用、展开、切换等状态变化>
```

## 必须遵守的标准

请读取并遵守项目内标准：

```text
standards/figma-to-codex-component-standard.md
standards/component-acceptance-checklist.md
templates/component/
```

## 技术栈

必须使用：

```text
React + TypeScript + Tailwind CSS
```

不允许：

- 只输出截图
- 只输出静态 HTML
- 只输出一个 TSX 文件
- 使用单独组件 CSS 文件替代 Tailwind
- 依赖 Figma 临时 asset URL
- 在组件里重复发明颜色、字号、间距、圆角

## 输出目录

每个组件必须输出到：

```text
mvp-assets/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.preview.tsx
├── component.meta.json
├── README.md
└── assets/
    └── ...
```

同时更新：

```text
mvp-assets/components/registry.json
mvp-assets/design/tailwind.tokens.json
mvp-assets/design/tailwind.config.reference.ts
```

## 组件代码必须包含

- 可替换 props
- 完整 TypeScript 类型
- registry 中声明的全部正式状态
- 统一 token 对应的 Tailwind class
- 本地化图标和图片资源
- 默认导出组件
- 至少一个可运行 preview

## Preview 必须包含

- 全部正式变体
- 至少一个可修改 props 的示例
- 至少一个可交互状态切换示例
- 错误态、禁用态、输入中态等关键状态

## Codex 工作步骤

1. 解析 Figma 链接中的 `fileKey` 和 `node-id`。
2. 使用 Figma design-to-code 流程读取组件结构、截图、tokens、assets、变体。
3. 梳理正式变体、疑似临时变体、可替换 props、交互状态。
4. 下载并本地化 Figma assets。
5. 生成 React + TypeScript + Tailwind 组件。
6. 生成 preview。
7. 生成 `component.meta.json`。
8. 更新全局 `registry.json`。
9. 必要时更新 Tailwind token 映射。
10. 校验 JSON、引用路径、assets、TSX 语法。
11. 输出验收报告。

## 完成定义

只有同时满足以下条件，才算完成：

- 组件可被 React 项目 import。
- preview 能展示全部正式状态。
- props 可修改并能影响组件。
- 状态可切换。
- 视觉与 Figma 基本一致。
- 没有使用另一套技术栈。
- 没有依赖 Figma 临时链接。
- registry 和 meta 能被 Agent 读取。

## 如果信息不完整

不要静默猜测。请在交付文件中写入：

```json
{
  "needsDesignConfirmation": [
    {
      "field": "variant",
      "value": "Type10",
      "question": "这个变体是否为正式状态？"
    }
  ]
}
```

然后继续交付可确定的部分。
