# Components

本目录存放 Agent 可调用的 React 组件资产。

## 当前组件

- `LoginRegisterInput.tsx`
- `LoginRegisterInput.css`
- `registry.json`
- `LoginRegisterInput.md`

## 运行要求

- React 18+
- TypeScript
- 支持 `new URL("../assets/...", import.meta.url)` 的构建工具，例如 Vite
- CSS 通过组件内 `import "./LoginRegisterInput.css"` 引入

## 资产路径

组件依赖图标在：

```text
../assets/LoginRegisterInput/
```

移动组件文件时，必须同步检查 TSX 内的图标相对路径。
