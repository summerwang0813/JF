(function () {
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  const headingVariants = {
    Default: {
      name: "Default",
      figmaNodeId: "29296:20694",
      description: "标题 + 右箭头",
      props: { title: "一级标题", rightContent: "chevron" }
    },
    NoArrow: {
      name: "NoArrow",
      figmaNodeId: "29296:20695",
      description: "标题，无右侧入口",
      props: { title: "一级标题", rightContent: "none" }
    },
    DescriptionOnly: {
      name: "DescriptionOnly",
      figmaNodeId: "29296:20696",
      description: "标题 + 说明 + 右箭头",
      props: { title: "一级标题", description: "说明文字", rightContent: "chevron" }
    },
    TagOnly: {
      name: "TagOnly",
      figmaNodeId: "29296:20697",
      description: "标题 + VIP 标签 + 右箭头",
      props: { title: "一级标题", accessory: "vip", rightContent: "chevron" }
    },
    TagWithDescription: {
      name: "TagWithDescription",
      figmaNodeId: "29296:20698",
      description: "标题 + VIP 标签 + 说明 + 右箭头",
      props: { title: "一级标题", description: "说明文字", accessory: "vip", rightContent: "chevron" }
    },
    RightText: {
      name: "RightText",
      figmaNodeId: "29296:20699",
      description: "标题 + 右侧文字 + 右箭头",
      props: { title: "一级标题", rightContent: "textChevron", rightText: "直播日历" }
    },
    MarketTag: {
      name: "MarketTag",
      figmaNodeId: "29296:20700",
      description: "标题 + 市场标签",
      props: { title: "一级标题", accessory: "market", rightContent: "none" }
    },
    CornerBadge: {
      name: "CornerBadge",
      figmaNodeId: "29296:20701",
      description: "标题 + 角标",
      props: { title: "一级标题", accessory: "cornerBadge", rightContent: "none" }
    }
  };

  function accessory(type) {
    if (type === "vip") return el("span", "fd-vip-tag", "V0白银");
    if (type === "market") return el("span", "fd-market-tag", "HK");
    if (type === "cornerBadge") return el("span", "fd-corner-badge");
    return null;
  }

  function Heading(props) {
    const heading = el("div", "fd-heading");
    const main = el("div", "fd-heading__main");
    const titleRow = el("div", "fd-heading__title-row");
    const title = el("span", "fd-heading__title", props.title);
    const addon = accessory(props.accessory || "none");

    titleRow.append(title);
    if (addon) titleRow.append(addon);
    main.append(titleRow);
    if (props.description) main.append(el("div", "fd-heading__description", props.description));
    heading.append(main);

    if (props.rightContent && props.rightContent !== "none") {
      const right = el("div", "fd-heading__right");
      if (props.rightContent === "textChevron" && props.rightText) {
        right.append(el("span", "fd-heading__right-text", props.rightText));
      }
      right.append(el("span", "fd-chevron"));
      heading.append(right);
    }

    return heading;
  }

  function HeadingByVariant(variantName, overrides = {}) {
    const variant = headingVariants[variantName];
    if (!variant) throw new Error(`Unknown Heading variant: ${variantName}`);
    return Heading({ ...variant.props, ...overrides });
  }

  function HeroText(props) {
    const block = el("div", "fd-hero");
    block.append(el("h1", "fd-hero-title", props.title));
    block.append(el("div", "fd-hero-subtitle", props.subtitle));
    return block;
  }

  function AppInput(props, events = {}) {
    const input = el("div", "fd-input");
    if (props.inputType === "phone") {
      const field = document.createElement("input");
      field.placeholder = props.placeholder;
      field.value = props.value || "";
      field.inputMode = "numeric";
      field.maxLength = 11;
      field.addEventListener("click", (event) => event.stopPropagation());
      field.addEventListener("input", (event) => {
        event.stopPropagation();
        events.onInput?.(event);
      });
      input.append(field);
    } else {
      input.append(el("span", "", props.placeholder));
    }
    if (props.action) input.append(el("span", "fd-input-action", props.action));
    return input;
  }

  function AppButton(props, events = {}) {
    const button = el("div", `fd-app-button ${props.disabled ? "disabled" : ""}`, props.text);
    button.dataset.requiresPhone = props.requiresPhone ? "true" : "false";
    button.addEventListener("click", events.onClick || (() => {}));
    return button;
  }

  function Agreement(props) {
    return el("div", "fd-agreement", props.text);
  }

  function StatusPanel(props) {
    const panel = el("div", "fd-status-panel");
    panel.append(el("div", "fd-status-title", props.title));
    panel.append(el("div", "fd-status-copy", props.description));
    return panel;
  }

  function MockCard(rows) {
    const card = el("div", "fd-mock-card");
    rows.forEach(([label, value]) => {
      const row = el("div", "fd-mock-row");
      row.append(el("span", "", label));
      row.append(el("strong", "", value));
      card.append(row);
    });
    return card;
  }

  function FlowNav({ screens, activeScreenId, onActivate }) {
    const nav = el("div", "fd-flow-nav");
    const shortNames = ["手机号", "验证码", "资料", "成功"];
    screens.forEach((screen, index) => {
      const button = el("button", `fd-flow-nav-button ${screen.id === activeScreenId ? "active" : ""}`);
      button.type = "button";
      button.textContent = `${index + 1}. ${shortNames[index] || screen.name}`;
      button.addEventListener("click", () => onActivate(screen.id));
      nav.append(button);
    });
    return nav;
  }

  function FlowStrip({ screens, steps, activeScreenId, onActivate }) {
    const strip = el("div", "ds-flow-strip");
    screens.forEach((screen, index) => {
      const step = el("button", `ds-flow-step ${screen.id === activeScreenId ? "active" : ""}`);
      step.type = "button";
      step.innerHTML = `
        <span class="ds-flow-index">${index + 1}</span>
        <div class="ds-flow-title">${screen.name}</div>
        <div class="ds-flow-desc">${steps[index]?.description || ""}</div>
      `;
      step.addEventListener("click", () => onActivate(screen.id));
      strip.append(step);
    });
    return strip;
  }

  function PhonePrototype({ screen, screens, activeScreenId, onActivate, children }) {
    const stage = el("div", "ds-prototype-stage");
    const label = el("div", "ds-prototype-label");
    label.append(el("strong", "", "可点击手机原型"));
    label.append(el("span", "", `${screen.name} / 全部页面与状态在手机内切换`));
    stage.append(label);

    const phone = el("div", "ds-phone-device");
    const phoneScreen = el("div", "ds-phone-screen");
    phoneScreen.append(el("div", "ds-phone-camera"));

    const status = el("div", "ds-phone-status");
    status.append(el("span", "", "9:41"));
    status.append(el("span", "", "5G 100%"));
    phoneScreen.append(status);

    const page = el("div", "ds-phone-page");
    if (screens.length > 1) page.append(FlowNav({ screens, activeScreenId, onActivate }));
    children.forEach((child) => page.append(child));
    phoneScreen.append(page);
    phone.append(phoneScreen);
    stage.append(phone);
    return stage;
  }

  function ScreenBoard({ screen, active, left, children }) {
    const board = el("div", `ds-screen-board ${active ? "active-screen" : ""}`);
    board.dataset.frameName = screen.name;
    board.dataset.screenId = screen.id;
    board.style.left = `${left}px`;
    children.forEach((child) => board.append(child));
    return board;
  }

  function CanvasNode({ node, selected, onSelect, child }) {
    const wrapper = el("section", `ds-canvas-node ${selected ? "selected" : ""}`);
    wrapper.dataset.label = `${node.component}${node.variant ? ` / ${node.variant}` : ""}`;
    wrapper.addEventListener("click", onSelect);
    wrapper.append(child);
    return wrapper;
  }

  function ComponentCard({ variant, active, preview, onClick }) {
    const button = el("button", `ds-component-card ${active ? "active" : ""}`);
    button.type = "button";
    button.innerHTML = `
      <div class="ds-component-name">
        <span>Heading / ${variant.name}</span>
        <span class="ds-node-id">${variant.figmaNodeId}</span>
      </div>
      <div class="ds-mini-preview"></div>
    `;
    button.querySelector(".ds-mini-preview").append(preview);
    button.addEventListener("click", onClick);
    return button;
  }

  function LayerItem({ label, active, onClick }) {
    const button = el("button", `ds-layer-item ${active ? "active" : ""}`, label);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  }

  window.OJOComponents = {
    el,
    headingVariants,
    Heading,
    HeadingByVariant,
    HeroText,
    AppInput,
    AppButton,
    Agreement,
    StatusPanel,
    MockCard,
    FlowNav,
    FlowStrip,
    PhonePrototype,
    ScreenBoard,
    CanvasNode,
    ComponentCard,
    LayerItem
  };
})();
