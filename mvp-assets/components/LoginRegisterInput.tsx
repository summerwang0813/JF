import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";

import "./LoginRegisterInput.css";

const closeIcon = new URL(
  "../assets/LoginRegisterInput/close.svg",
  import.meta.url,
).href;
const passwordHiddenIcon = new URL(
  "../assets/LoginRegisterInput/password-hidden.svg",
  import.meta.url,
).href;
const passwordVisibleIcon = new URL(
  "../assets/LoginRegisterInput/password-visible.svg",
  import.meta.url,
).href;
const arrowDownIcon = new URL(
  "../assets/LoginRegisterInput/arrow-down-small.svg",
  import.meta.url,
).href;

export type LoginRegisterInputType =
  | "文本-默认"
  | "文本-输入中"
  | "电话-默认"
  | "电话-输入中"
  | "密码-默认"
  | "密码-输入中闭眼"
  | "密码-输入中睁眼"
  | "验证码"
  | "验证码错误";

type NativeInputMode = InputHTMLAttributes<HTMLInputElement>["inputMode"];

export interface LoginRegisterInputProps {
  /** 对应 Figma 组件唯一公开的 Type 属性。传入后组件状态由外部控制。 */
  type?: LoginRegisterInputType;
  /** 非受控模式的初始 Figma Type。 */
  defaultType?: LoginRegisterInputType;
  /** Figma Type 发生交互切换时触发。 */
  onTypeChange?: (type: LoginRegisterInputType) => void;
  /** 输入值；文本、电话、密码和验证码共用。 */
  value?: string;
  /** 非受控模式的初始输入值。 */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 辅助技术读取的字段名称；不以占位文案代替标签。 */
  label?: string;
  placeholder?: string;
  name?: string;
  maxLength?: number;
  inputMode?: NativeInputMode;
  autoComplete?: string;
  className?: string;
  countryCode?: string;
  onCountryCodeClick?: () => void;
  countryCodeLabel?: string;
  clearLabel?: string;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  errorMessage?: string;
  resendLabel?: string;
  resendDisabled?: boolean;
  onResend?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const FIGMA_NODE_ID = "28777:4260";
const VERIFICATION_CODE_LENGTH = 4;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function defaultLabel(type: LoginRegisterInputType) {
  if (type.startsWith("电话")) return "手机号";
  if (type.startsWith("密码")) return "密码";
  if (type.startsWith("验证码")) return "验证码";
  return "账号或邮箱";
}

function defaultPlaceholder(type: LoginRegisterInputType) {
  if (type.startsWith("电话")) return "请输入11位手机号码";
  if (type.startsWith("密码")) return "请输入登录密码";
  return "请输入邮箱地址";
}

function editingType(type: LoginRegisterInputType): LoginRegisterInputType {
  if (type === "文本-默认") return "文本-输入中";
  if (type === "电话-默认") return "电话-输入中";
  if (type === "密码-默认") return "密码-输入中闭眼";
  return type;
}

function defaultTypeFor(type: LoginRegisterInputType): LoginRegisterInputType {
  if (type === "文本-输入中") return "文本-默认";
  if (type === "电话-输入中") return "电话-默认";
  if (type === "密码-输入中闭眼" || type === "密码-输入中睁眼") {
    return "密码-默认";
  }
  return type;
}

/**
 * 方德登录注册输入框。
 *
 * 对应 Figma `登录注册输入框`（28777:4260）的 9 个真实 Type 变体。
 * 组件仅覆盖登录和注册场景；验证码固定使用组件公开的 4 位结构。
 */
export function LoginRegisterInput({
  type: controlledType,
  defaultType = "文本-默认",
  onTypeChange,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  label,
  placeholder,
  name,
  maxLength,
  inputMode,
  autoComplete,
  className,
  countryCode = "+86",
  onCountryCodeClick,
  countryCodeLabel = "选择国家或地区区号",
  clearLabel = "清空输入",
  showPasswordLabel = "显示密码",
  hidePasswordLabel = "隐藏密码",
  errorMessage = "验证码错误，请重试",
  resendLabel = "重新发送",
  resendDisabled = false,
  onResend,
  onFocus,
  onBlur,
}: LoginRegisterInputProps) {
  const [internalType, setInternalType] = useState(defaultType);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();

  const currentType = controlledType ?? internalType;
  const currentValue = controlledValue ?? internalValue;
  const isVerificationCode = currentType === "验证码" || currentType === "验证码错误";
  const isVerificationError = currentType === "验证码错误";
  const isPhone = currentType.startsWith("电话");
  const isPassword = currentType.startsWith("密码");
  const isPasswordVisible = currentType === "密码-输入中睁眼";
  const isEditing = currentType.includes("输入中");
  const fieldLabel = label ?? defaultLabel(currentType);
  const fieldPlaceholder = placeholder ?? defaultPlaceholder(currentType);
  const errorId = `${generatedId}-error`;

  function requestType(nextType: LoginRegisterInputType) {
    if (controlledType === undefined) setInternalType(nextType);
    onTypeChange?.(nextType);
  }

  function updateValue(nextValue: string) {
    if (controlledValue === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let nextValue = event.target.value;
    if (isVerificationCode) {
      nextValue = nextValue.replace(/\D/g, "").slice(0, VERIFICATION_CODE_LENGTH);
      if (isVerificationError) requestType("验证码");
    }
    updateValue(nextValue);
  }

  function handleFocus() {
    requestType(editingType(currentType));
    onFocus?.();
  }

  function handleBlur() {
    if (!currentValue && !isVerificationCode) {
      requestType(defaultTypeFor(currentType));
    }
    onBlur?.();
  }

  function handleClear() {
    updateValue("");
    requestType(editingType(currentType));
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handlePasswordVisibility() {
    requestType(
      isPasswordVisible ? "密码-输入中闭眼" : "密码-输入中睁眼",
    );
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function preserveFocus(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  if (isVerificationCode) {
    const digits = currentValue.slice(0, VERIFICATION_CODE_LENGTH).split("");
    const activeIndex = Math.min(digits.length, VERIFICATION_CODE_LENGTH - 1);
    const canResend = Boolean(onResend) && !resendDisabled;

    return (
      <div
        className={cx("fd-login-input", "fd-login-input--verification", className)}
        data-figma-node-id={FIGMA_NODE_ID}
        data-figma-type={currentType}
      >
        <div
          className="fd-login-input__code-grid"
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            className="fd-login-input__code-native"
            aria-label={fieldLabel}
            aria-invalid={isVerificationError}
            aria-describedby={isVerificationError ? errorId : undefined}
            autoComplete={autoComplete ?? "one-time-code"}
            inputMode={inputMode ?? "numeric"}
            maxLength={VERIFICATION_CODE_LENGTH}
            name={name}
            pattern="[0-9]*"
            value={currentValue}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={onFocus}
          />
          {Array.from({ length: VERIFICATION_CODE_LENGTH }, (_, index) => (
            <span
              aria-hidden="true"
              className={cx(
                "fd-login-input__code-cell",
                isVerificationError && "fd-login-input__code-cell--error",
                !isVerificationError && index === activeIndex && "fd-login-input__code-cell--active",
              )}
              key={index}
            >
              {digits[index] ?? ""}
            </span>
          ))}
        </div>

        <div
          className="fd-login-input__code-feedback"
          aria-live="polite"
        >
          {isVerificationError && (
            <span className="fd-login-input__error" id={errorId} role="alert">
              {errorMessage}
            </span>
          )}
          <button
            className="fd-login-input__resend"
            disabled={!canResend}
            type="button"
            onClick={onResend}
          >
            {resendLabel}
          </button>
        </div>
      </div>
    );
  }

  const resolvedInputMode: NativeInputMode =
    inputMode ?? (isPhone ? "tel" : "text");
  const resolvedAutoComplete =
    autoComplete ?? (isPhone ? "tel" : isPassword ? "current-password" : undefined);

  return (
    <div
      className={cx(
        "fd-login-input",
        "fd-login-input--field",
        isEditing && "fd-login-input--editing",
        className,
      )}
      data-figma-node-id={FIGMA_NODE_ID}
      data-figma-type={currentType}
    >
      {isPhone && (
        <div className="fd-login-input__country">
          <button
            aria-label={countryCodeLabel}
            className="fd-login-input__country-button"
            type="button"
            onClick={onCountryCodeClick}
            onMouseDown={preserveFocus}
          >
            <span>{countryCode}</span>
            <img alt="" aria-hidden="true" src={arrowDownIcon} />
          </button>
          <span aria-hidden="true" className="fd-login-input__divider" />
        </div>
      )}

      <input
        ref={inputRef}
        aria-label={fieldLabel}
        autoComplete={resolvedAutoComplete}
        className="fd-login-input__native"
        inputMode={resolvedInputMode}
        maxLength={maxLength}
        name={name}
        placeholder={fieldPlaceholder}
        type={isPassword && !isPasswordVisible ? "password" : "text"}
        value={currentValue}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      <div className="fd-login-input__actions">
        {isEditing && (
          <button
            aria-label={clearLabel}
            className="fd-login-input__icon-button"
            type="button"
            onClick={handleClear}
            onMouseDown={preserveFocus}
          >
            <img alt="" aria-hidden="true" src={closeIcon} />
          </button>
        )}

        {isPassword && (
          <button
            aria-label={isPasswordVisible ? hidePasswordLabel : showPasswordLabel}
            aria-pressed={isPasswordVisible}
            className="fd-login-input__icon-button"
            type="button"
            onClick={handlePasswordVisibility}
            onMouseDown={preserveFocus}
          >
            <img
              alt=""
              aria-hidden="true"
              className={isPasswordVisible ? "fd-login-input__visible-icon" : undefined}
              src={isPasswordVisible ? passwordVisibleIcon : passwordHiddenIcon}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginRegisterInput;
