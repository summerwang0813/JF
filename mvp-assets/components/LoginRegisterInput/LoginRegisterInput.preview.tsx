import { useState } from "react";
import LoginRegisterInput, {
  loginRegisterInputVariants,
  type LoginRegisterInputType,
} from "./LoginRegisterInput";

const initialValueByType: Record<LoginRegisterInputType, string> = {
  "文本-默认": "",
  "文本-输入中": "输入",
  "电话-默认": "",
  "电话-输入中": "输入中",
  "密码-默认": "",
  "密码-输入中闭眼": "Abc12345678",
  "密码-输入中睁眼": "Abc12345678",
  "验证码": "",
  "验证码错误": "8299",
};

export default function LoginRegisterInputPreview() {
  const [phone, setPhone] = useState("");
  const isPhoneValid = /^1\d{10}$/.test(phone);

  return (
    <main className="min-h-screen bg-fd-page px-fd-6 py-fd-8 font-fd-sans text-fd-primary">
      <section className="mx-auto grid max-w-[760px] gap-fd-8">
        <header className="grid gap-fd-2">
          <p className="text-fd-caption text-fd-secondary">JF Component Preview</p>
          <h1 className="m-0 text-fd-title font-semibold">LoginRegisterInput</h1>
        </header>

        <section className="grid gap-fd-4">
          <h2 className="m-0 text-fd-body font-medium">可交互示例：手机号登录</h2>
          <div className="grid max-w-[343px] gap-fd-4">
            <LoginRegisterInput
              defaultType="电话-默认"
              value={phone}
              onValueChange={(value) => setPhone(value.replace(/\D/g, "").slice(0, 11))}
            />
            <button
              className="h-fd-button rounded-fd-sm bg-fd-brand px-fd-4 text-fd-body-sm font-medium text-fd-inverse disabled:bg-fd-brand-disabled"
              disabled={!isPhoneValid}
              type="button"
            >
              获取验证码
            </button>
          </div>
        </section>

        <section className="grid gap-fd-4">
          <h2 className="m-0 text-fd-body font-medium">全部正式状态</h2>
          <div className="grid gap-fd-4">
            {loginRegisterInputVariants.map((type) => (
              <div className="grid gap-fd-2" key={type}>
                <p className="m-0 text-fd-caption text-fd-secondary">{type}</p>
                <LoginRegisterInput
                  type={type}
                  value={initialValueByType[type]}
                  resendDisabled={type === "验证码"}
                  resendLabel={type === "验证码" ? "重新发送（57秒）" : "重新发送"}
                  onResend={() => undefined}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
