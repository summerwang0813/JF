# LoginRegisterInput 登录注册输入框

## 直接引用

```tsx
import LoginRegisterInput from "./mvp-assets/components/LoginRegisterInput/LoginRegisterInput";
```

## 最小示例

```tsx
<LoginRegisterInput
  defaultType="电话-默认"
  placeholder="请输入11位手机号码"
  onValueChange={(value) => console.log(value)}
/>
```

## 可交互手机号登录示例

```tsx
const [phone, setPhone] = useState("");
const isPhoneValid = /^1\d{10}$/.test(phone);

<LoginRegisterInput
  defaultType="电话-默认"
  value={phone}
  onValueChange={(value) => setPhone(value.replace(/\D/g, "").slice(0, 11))}
/>;

<button disabled={!isPhoneValid}>获取验证码</button>;
```

## Figma 来源

- 文件：方德 App 组件库（26 版）
- 组件：登录注册输入框
- Node：`28777:4260`

## 技术栈

- React
- TypeScript
- Tailwind CSS

## 正式变体

| Type | 场景 |
|---|---|
| 文本-默认 | 邮箱、账号等普通文本输入初始态 |
| 文本-输入中 | 普通文本输入聚焦或已有输入 |
| 电话-默认 | 手机号输入初始态 |
| 电话-输入中 | 手机号输入聚焦或已有输入 |
| 密码-默认 | 密码输入初始态 |
| 密码-输入中闭眼 | 密码输入中，密文展示 |
| 密码-输入中睁眼 | 密码输入中，明文展示 |
| 验证码 | 4 位短信验证码输入 |
| 验证码错误 | 验证码校验失败 |

## Props

| Prop | 类型 | 说明 |
|---|---|---|
| type | `LoginRegisterInputType` | 受控变体 |
| defaultType | `LoginRegisterInputType` | 非受控初始变体 |
| value | `string` | 受控输入值 |
| defaultValue | `string` | 非受控初始值 |
| placeholder | `string` | 占位文案 |
| countryCode | `string` | 手机区号 |
| errorMessage | `string` | 错误文案 |
| resendLabel | `string` | 重新发送文案 |
| resendDisabled | `boolean` | 是否禁用重新发送 |
| onValueChange | `(value: string) => void` | 输入变化回调 |
| onTypeChange | `(type: LoginRegisterInputType) => void` | 状态变化回调 |
| onResend | `() => void` | 重新发送点击 |

## Tailwind Token

组件使用项目 token class：

```text
text-fd-primary
text-fd-secondary
text-fd-disabled
text-fd-error
bg-fd-page
bg-fd-card
border-fd-default
border-fd-active
border-fd-error
h-fd-input
h-fd-code
w-fd-code
rounded-fd-sm
rounded-fd-md
```

需要在项目 Tailwind 配置中接入：

```text
mvp-assets/design/tailwind.config.reference.ts
```

## 预览

```tsx
import LoginRegisterInputPreview from "./LoginRegisterInput.preview";
```

`LoginRegisterInput.preview.tsx` 展示全部正式状态，并包含手机号输入控制“获取验证码”按钮禁用/可用的交互示例。

## 验收

- [x] React + TypeScript + Tailwind CSS
- [x] 无单独组件 CSS 依赖
- [x] 图标已本地化
- [x] 全部正式变体已实现
- [x] 有可运行 preview
- [x] props 可替换
- [x] registry/meta 可被 Agent 读取
