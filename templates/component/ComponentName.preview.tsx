import { useState } from "react";
import ComponentName, { type ComponentNameVariant } from "./ComponentName";

const variants: ComponentNameVariant[] = ["default", "active", "disabled"];

export default function ComponentNamePreview() {
  const [value, setValue] = useState("可修改内容");

  return (
    <main className="min-h-screen bg-fd-page p-fd-6 text-fd-primary">
      <section className="mx-auto grid max-w-[480px] gap-fd-4">
        <h1 className="text-fd-title">ComponentName Preview</h1>
        {variants.map((variant) => (
          <div className="grid gap-fd-2" key={variant}>
            <p className="text-fd-caption text-fd-secondary">{variant}</p>
            <ComponentName
              variant={variant}
              value={variant === "active" ? value : ""}
              placeholder="请输入内容"
              onValueChange={setValue}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
