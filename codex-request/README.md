# Codex Request Templates

这个目录存放可以直接丢给 Codex 的任务请求格式。

## Figma 组件转代码

使用：

```text
codex-request/figma-component-to-code.md
```

如果需要结构化读取，使用：

```text
codex-request/figma-component-to-code.json
```

## 用法

在别的电脑上打开 Codex 后，把 `figma-component-to-code.md` 的内容粘贴给 Codex，并把里面的 Figma 链接、组件用途、正式变体、可替换属性和交互规则补齐。

Codex 看到 `taskType = figma_component_to_runnable_code` 后，就应按 JF 标准输出可运行组件资产。
