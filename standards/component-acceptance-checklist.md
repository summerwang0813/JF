# 组件交付验收清单

## 负责人验收

| 项目 | 是否通过 | 备注 |
|---|---|---|
| Figma 链接带 node-id |  |  |
| 组件名称与 Figma 一致 |  |  |
| 正式变体全部列出 |  |  |
| 临时/重复变体已处理 |  |  |
| 可替换文案已声明 |  |  |
| 可替换属性已声明 |  |  |
| 状态切换规则已声明 |  |  |
| assets 已本地化 |  |  |
| preview 能展示全部状态 |  |  |
| props 可修改并生效 |  |  |
| 视觉与 Figma 基本一致 |  |  |

## Codex 自检

| 项目 | 必须通过 |
|---|---|
| `component.meta.json` 可 JSON.parse |
| `registry.json` 可 JSON.parse |
| TSX 无明显语法错误 |
| 所有 import 路径存在 |
| 所有 assets 路径存在 |
| 没有 Figma 临时 asset URL |
| 没有单独组件 CSS |
| Tailwind class 使用统一 token |
| preview 包含所有正式变体 |
| README 包含使用示例 |

## 不通过示例

以下情况不能算完成：

- 只给 `.tsx`，没有 preview。
- 只给 Figma 截图，没有代码。
- 组件依赖 Figma 临时图片链接。
- 组件样式写在单独 CSS 文件里，且没有 Tailwind token。
- registry 声明了状态，但组件没有实现。
- 组件能看但 props 不能改。
- TypeScript 类型没有约束可传属性。
