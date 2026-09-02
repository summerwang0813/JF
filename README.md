# JF Figma AI Workbench

一个 JF AI 组件画布原型，用于验证“Figma 组件库 -> AI 可调用组件 -> 无限画板搭建页面”的工作流。

## 文件入口

- `outputs/jf-workbench.html`: 主工作台页面
- `outputs/jf-design-system.css`: JF 设计规范与组件样式
- `outputs/jf-component-library.js`: 可被页面调用的组件库
- `outputs/jf-visual-spec.md`: JF 视觉规范沉淀
- `outputs/heading-component-demo.html`: 旧入口，自动跳转到主工作台

## MVP 资产交付

- `mvp-assets/prd/`: PRD A / PRD B
- `mvp-assets/components/`: Agent 可调用组件、样式、registry 和组件说明
- `mvp-assets/interaction/`: 交互说明和流程 JSON
- `mvp-assets/design/`: tokens、布局规则和页面结构
- `mvp-assets/assets/`: 组件依赖图片与图标素材

## Figma 组件转可用代码标准

- `standards/figma-to-codex-component-standard.md`: Figma 组件转 Codex 可用组件的正式标准
- `standards/codex-figma-component-prompt.md`: 负责人给 Codex 的输入模板
- `standards/component-acceptance-checklist.md`: 设计、研发、Codex 三方验收清单
- `templates/component/`: 单组件标准交付模板

以后给 Codex 一个带 `node-id` 的 Figma 组件链接时，按上述标准输出：

```text
mvp-assets/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.preview.tsx
├── component.meta.json
├── README.md
└── assets/
```

组件技术栈统一为 `React + TypeScript + Tailwind CSS`。

## 本地预览

直接用浏览器打开：

```text
outputs/jf-workbench.html
```
