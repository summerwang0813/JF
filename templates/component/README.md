# ComponentName

## 用途

说明组件用于什么业务场景。

## Figma 来源

- fileKey:
- nodeId:
- 组件名:

## 变体

| Variant | 场景 |
|---|---|
| default | 默认态 |

## Props

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| variant | `ComponentNameVariant` | `default` | 组件状态 |

## 交互规则

- 说明点击、输入、聚焦、失焦、错误、禁用等规则。

## 使用示例

```tsx
import ComponentName from "./ComponentName";

export default function Example() {
  return <ComponentName variant="default" />;
}
```

## 验收

- [ ] 全部正式变体已展示
- [ ] props 可修改
- [ ] 视觉与 Figma 基本一致
- [ ] assets 已本地化
- [ ] 使用 React + TypeScript + Tailwind CSS
