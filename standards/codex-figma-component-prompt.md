# Codex 输入提示词模板

负责人把 Figma 组件交给 Codex 时，建议直接使用下面模板。

```text
请按 JF 的《Figma 组件转 Codex 可用组件交付标准》处理这个组件：

Figma 链接：
<粘贴带 node-id 的 Figma 组件链接>

组件用途：
<这个组件用于什么业务场景>

正式变体：
<列出设计确认过的正式变体。如果不确定，请 Codex 从 Figma 读取后标记待确认>

可替换属性：
<例如 title、value、placeholder、disabled、errorMessage、icon、amount、tagText>

交互规则：
<例如点击、输入、聚焦、失焦、错误、禁用、展开、切换等规则>

请输出：
1. mvp-assets/components/ComponentName/ComponentName.tsx
2. mvp-assets/components/ComponentName/ComponentName.preview.tsx
3. mvp-assets/components/ComponentName/component.meta.json
4. mvp-assets/components/ComponentName/README.md
5. 本地化 assets
6. 更新 mvp-assets/components/registry.json
7. 必要时更新 mvp-assets/design/tailwind.tokens.json
8. 必要时更新 mvp-assets/design/tailwind.config.reference.ts

技术栈必须是 React + TypeScript + Tailwind CSS。
组件不能依赖单独 CSS 文件。
组件必须读取统一 token。
组件必须展示全部正式状态的 preview。
```

## 极简版

```text
这个 Figma 组件请按 JF 标准转成可运行组件资产：
<Figma 链接>

要求：React + TypeScript + Tailwind CSS，输出组件、preview、meta、README、registry，并本地化图标。
```
