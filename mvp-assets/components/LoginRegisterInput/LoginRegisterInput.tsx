import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";

import arrowDownIcon from "./assets/arrow-down-small.svg";
import closeIcon from "./assets/close.svg";
import passwordHiddenIcon from "./assets/password-hidden.svg";
import passwordVisibleIcon from "./assets/password-visible.svg";

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
  type?: LoginRegisterInputType;
  defaultType?: LoginRegisterInputType;
  onTypeChange?: (type: LoginRegisterInputType) => void;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
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

export const loginRegisterInputVariants: LoginRegisterInputType[] = [
  "文本-默认",
  "文本-输入中",
  "电话-默认",
  "电话-输入中",
  "密码-默认",
  "密码-输入中闭眼",
  "密码-输入中睁眼",
  "验证码",
  "验证码错误",
];

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
  if (type === "密码-输入中闭眼" || type === "密码-输入中睁眼") return "密码-默认";
  return type;
}

export default function LoginRegisterInput({
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
    if (!currentValue && !isVerificationCode) requestType(defaultTypeFor(currentType));
    onBlur?.();
  }

  function handleClear() {
    updateValue("");
    requestType(editingType(currentType));
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handlePasswordVisibility() {
    requestType(isPasswordVisible ? "密码-输入中闭眼" : "密码-输入中睁眼");
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
        className={cx("grid w-full max-w-[343px] gap-fd-2 font-fd-sans", className)}
        data-figma-node-id={FIGMA_NODE_ID}
        data-figma-type={currentType}
      >
        <div
          className="relative grid grid-cols-4 gap-fd-3"
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            aria-describedby={isVerificationError ? errorId : undefined}
            aria-invalid={isVerificationError}
            aria-label={fieldLabel}
            autoComplete={autoComplete ?? "one-time-code"}
            className="absolute inset-0 h-fd-code w-full border-0 opacity-0 outline-none"
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
                "grid aspect-square w-full max-w-[60px] place-self-center rounded-fd-md border-[1.2px] bg-fd-card text-center text-[19.2px] font-medium leading-[28.8px] text-fd-primary",
                isVerificationError && "border-fd-error",
                !isVerificationError && index === activeIndex && "border-fd-active",
                !isVerificationError && index !== activeIndex && "border-fd-surface",
              )}
              key={index}
            >
              {digits[index] ?? ""}
            </span>
          ))}
        </div>

        <div className="flex min-h-[22px] items-center justify-between gap-fd-3 text-fd-body-sm">
          {isVerificationError && (
            <span className="text-fd-error" id={errorId} role="alert">
              {errorMessage}
            </span>
          )}
          <button
            className="ml-auto border-0 bg-transparent p-0 text-fd-secondary disabled:text-fd-disabled"
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

  const resolvedInputMode: NativeInputMode = inputMode ?? (isPhone ? "tel" : "text");
  const resolvedAutoComplete =
    autoComplete ?? (isPhone ? "tel" : isPassword ? "current-password" : undefined);

  return (
    <div
      className={cx(
        "flex h-fd-input w-full max-w-[343px] items-center gap-fd-2 rounded-fd-sm border bg-fd-card px-fd-4 py-fd-4 font-fd-sans",
        isEditing ? "border-fd-active" : "border-fd-default",
        className,
      )}
      data-figma-node-id={FIGMA_NODE_ID}
      data-figma-type={currentType}
    >
      {isPhone && (
        <div className="flex shrink-0 items-center gap-fd-2">
          <button
            aria-label={countryCodeLabel}
            className="flex h-6 items-center gap-fd-1 border-0 bg-transparent p-0 text-fd-body text-fd-primary"
            type="button"
            onClick={onCountryCodeClick}
            onMouseDown={preserveFocus}
          >
            <span>{countryCode}</span>
            <img alt="" aria-hidden="true" className="h-4 w-4" src={arrowDownIcon} />
          </button>
          <span aria-hidden="true" className="h-5 w-px bg-fd-surface" />
        </div>
      )}

      <input
        ref={inputRef}
        aria-label={fieldLabel}
        autoComplete={resolvedAutoComplete}
        className="h-6 min-w-0 flex-1 border-0 bg-transparent p-0 text-fd-body text-fd-primary caret-fd-brand outline-none placeholder:text-fd-tertiary"
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

      <div className="flex shrink-0 items-center gap-fd-1">
        {isEditing && (
          <button
            aria-label={clearLabel}
            className="grid h-6 w-6 place-items-center border-0 bg-transparent p-0"
            type="button"
            onClick={handleClear}
            onMouseDown={preserveFocus}
          >
            <img alt="" aria-hidden="true" className="h-[22px] w-[22px]" src={closeIcon} />
          </button>
        )}

        {isPassword && (
          <button
            aria-label={isPasswordVisible ? hidePasswordLabel : showPasswordLabel}
            aria-pressed={isPasswordVisible}
            className="grid h-6 w-6 place-items-center border-0 bg-transparent p-0"
            type="button"
            onClick={handlePasswordVisibility}
            onMouseDown={preserveFocus}
          >
            <img
              alt=""
              aria-hidden="true"
              className={isPasswordVisible ? "h-6 w-6" : "h-[22px] w-[22px]"}
              src={isPasswordVisible ? passwordVisibleIcon : passwordHiddenIcon}
            />
          </button>
        )}
      </div>
    </div>
  );
}
