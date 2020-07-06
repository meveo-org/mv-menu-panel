import { LitElement, html, css } from "lit-element";

export class MvMenuPanel extends LitElement {
  static get properties() {
    return {
      // optional, this is the value that is returned when menu items are clicked
      value: { type: Object, attribute: false },
      menu: { type: Boolean },
      showHeader: { type: Boolean, attribute: "show-header" },
      label: { type: Boolean },
      group: { type: Boolean },
      popout: { type: Boolean },
      item: { type: Boolean },
      open: { type: Boolean },
      disabled: { type: Boolean },
      selected: { type: Boolean },

      //setting custom to true will bypass the default render and behavior of the group label and click action
      custom: { type: Boolean },

      // TODO position values include: "top", "left", "right", "bottom", default: "left"
      position: { type: String },

      //  valid theme values are: "light", "dark"
      //    default: "dark"
      theme: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        user-select: none;
        --menu-width: var(--mv-menu-panel-width, 330px);
        --popout-width: var(--mv-menu-panel-popout-width, var(--menu-width));
        --menu-collapse-width: var(--mv-menu-panel-collapse-width, 65px);

        --menu-header-font-size: var(--font-size-xl, 24px);
        --menu-header-height: var(--mv-menu-panel-header-height, 66px);

        --menu-item-font-size: var(--font-size-m, 16px);
        --menu-item-height: var(--mv-menu-panel-item-height, 40px);
        --menu-item-padding: var(--mv-menu-panel-item-padding, 20px);
        --menu-shadow: var(
          --mv-menu-panel-shadow,
          0 0 16px 1px rgba(151, 156, 163, 0.35)
        );

        --group-icon-size: calc(var(--menu-item-font-size) * 0.3);

        --menu-header-dark-color: var(
          --mv-menu-panel-header-dark-color,
          #ffffff
        );
        --menu-header-dark-background: var(
          --mv-menu-panel-header-dark-background,
          linear-gradient(
            45deg,
            rgba(232, 179, 56, 1) 0%,
            rgba(255, 150, 0, 1) 100%
          )
        );
        --menu-item-dark-color: var(--mv-menu-panel-item-dark-color, #ffffff);
        --menu-dark-background: var(
          --mv-menu-panel-dark-background,
          linear-gradient(
            180deg,
            rgba(63, 71, 83, 1) 0%,
            rgba(26, 30, 35, 1) 100%
          )
        );
        --selected-dark-highlight: var(
          --mv-menu-panel-selected-dark-highlight,
          rgba(26, 30, 35, 0.6)
        );
        --disabled-dark-color: var(
          --mv-menu-panel-disabled-dark-color,
          #898c91
        );
        --hover-dark-color: var(--mv-menu-panel-hover-dark-color, #00d8ff);
        --hover-dark-background: var(
          --mv-menu-panel-hover-dark-background,
          rgba(26, 30, 35, 0.4)
        );

        --menu-header-light-color: var(
          --mv-menu-panel-header-light-color,
          #80828c
        );
        --menu-header-light-background: var(
          --mv-menu-panel-header-light-background,
          #f0fff0
        );
        --menu-item-light-color: var(--mv-menu-panel-item-light-color, #ffffff);
        --menu-light-background: var(--mv-menu-panel-light-background, #cccccc);
        --selected-light-highlight: var(
          --mv-menu-panel-selected-light-highlight,
          #4a6572
        );
        --disabled-light-color: var(
          --mv-menu-panel-disabled-light-color,
          #898c91
        );
        --hover-light-color: var(--mv-menu-panel-hover-light-color, #00d8ff);
        --hover-light-background: var(
          --mv-menu-panel-hover-light-background,
          rgba(26, 30, 35, 0.4)
        );
      }

      :host([group]:hover:not([disabled])),
      :host([item]:hover:not([disabled])) {
        cursor: pointer;
      }

      ul {
        padding: 0;
        margin: 0;
      }

      li {
        display: block;
        text-indent: var(--menu-item-padding);
        font-size: var(--menu-item-font-size);
      }

      li,
      li ::slotted(*) {
        margin: 0;
        text-decoration: none;
        list-style-type: none;
        color: var(--menu-item-color);
        line-height: var(--menu-item-height);
      }

      li ::slotted(a) {
        display: block;
      }

      li:hover:not(.disabled),
      li.open:not(.disabled) {
        color: var(--hover-color);
        background: var(--hover-background);
      }

      li:hover:not(.disabled) ::slotted(*) {
        color: var(--hover-color);
      }

      li.selected,
      li.selected div ::slotted(*),
      li.selected .menu-label-group.open {
        color: var(--hover-color);
        background: var(--selected-highlight);
      }

      li.disabled,
      li.disabled ::slotted(*) {
        color: var(--disabled-color);
        cursor: not-allowed;
      }

      .mv-menu-panel {
        z-index: 100;
        height: 100%;
        width: var(--menu-width);
        background: var(--menu-background);
        box-shadow: var(--menu-shadow);
      }

      .menu-panel-header {
        font-size: var(--menu-header-font-size);
        color: var(--menu-header-color);
        background: var(--menu-header-background);
        height: var(--menu-header-height);
        display: flex;
        align-items: center;
        padding: 0 0 0 var(--menu-item-padding);
      }

      .menu-label-group {
        width: 100%;
        height: var(--menu-item-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .menu-label-group:hover:not(.disabled) ::slotted(*),
      .menu-label-group.open:not(.disabled) ::slotted(*),
      .menu-label-group:hover:not(.disabled) i,
      .menu-label-group.open:not(.disabled) i {
        color: var(--hover-color);
      }

      .menu-panel-label {
        width: 100%;
        line-height: calc(var(--menu-item-font-size) * 1.2);
        font-size: var(--menu-item-font-size);
      }

      .menu-group-dropdown-icon {
        position: relative;
        width: var(--group-icon-size);
        height: var(--group-icon-size);
        border-top: 2px solid var(--menu-item-color);
        border-right: 2px solid var(--menu-item-color);
        left: -20px;
        float: right;
      }

      .menu-group-dropdown-icon.close {
        transition: -webkit-transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      .menu-group-dropdown-icon.open {
        transition: -webkit-transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
      }

      .popout {
        display: block;
        position: absolute;
        left: calc(var(--menu-width) + 2px);
        margin-top: calc(var(--menu-item-height) * -1);
        width: var(--popout-width);
        background: var(--menu-background);
        border-radius: 5px;
        z-index: 1;
      }

      .dark {
        --menu-header-color: var(--menu-header-dark-color);
        --menu-header-background: var(--menu-header-dark-background);
        --menu-item-color: var(--menu-item-dark-color);
        --menu-background: var(--menu-dark-background);
        --selected-highlight: var(--selected-dark-highlight);
        --disabled-color: var(--disabled-dark-color);
        --hover-color: var(--hover-dark-color);
        --hover-background: var(--hover-dark-background);
      }

      .light {
        --menu-header-color: var(--menu-header-light-color);
        --menu-header-background: var(--menu-header-light-background);
        --menu-item-color: var(--menu-item-light-color);
        --menu-background: var(--menu-light-background);
        --selected-highlight: var(--selected-light-highlight);
        --disabled-color: var(--disabled-light-color);
        --hover-color: var(--hover-light-color);
        --hover-background: var(--hover-light-background);
      }
    `;
  }

  constructor() {
    super();
    this.showHeader = false;
    this.disabled = false;
    this.selected = false;
    this.custom = false;
    this.theme = "dark";
  }

  render() {
    const {
      menu,
      showHeader,
      label,
      group,
      popout,
      item,
      open,
      disabled,
      selected,
      custom,
    } = this;
    const openClass = open && !popout ? " open" : " close";
    const disabledClass = disabled ? " disabled" : "";
    const selectedClass = selected ? " selected" : "";
    const itemClass = `${disabledClass || selectedClass}`;
    if (menu) {
      return open
        ? html`
            <aside class="mv-menu-panel ${this.theme}">
              ${!!showHeader
                ? html`
                    <div
                      class="menu-panel-header"
                      @click="${this.handleHeaderClick}"
                    >
                      <slot name="menu-panel-label"></slot>
                    </div>
                  `
                : html``}
              <nav>
                <ul class="main">
                  <slot></slot>
                </ul>
              </nav>
            </aside>
          `
        : html``;
    } else if (label) {
      this.setAttribute("slot", "menu-panel-label");
      return html` <slot></slot> `;
    } else if (group) {
      return html`
        <li class="${openClass}${itemClass}" @click="${this.handleOpenMenu}">
          <div class="sub-menu${openClass}">
            <div class="menu-label-group${openClass}">
              <div class="menu-panel-label">
                <slot name="menu-panel-label"></slot>
              </div>
              ${!custom
                ? html`
                    <i class="${`menu-group-dropdown-icon${openClass}`}"></i>
                  `
                : html``}
            </div>
            ${open
              ? html`
                  <div class="group">
                    <ul class="${popout ? " popout" : ""}">
                      <slot></slot>
                    </ul>
                  </div>
                `
              : html``}
          </div>
        </li>
      `;
    } else if (item) {
      return html`
        <li class="${itemClass}" @click="${this.handleItemClick}">
          <div>
            <slot></slot>
          </div>
        </li>
      `;
    }
    return html``;
  }

  connectedCallback() {
    //initialize
    if (this.open === undefined && (this.group || this.menu)) {
      this.open = !this.group;
    }
    document.addEventListener("click", this.handleClickAway);
    super.connectedCallback();
  }

  detachedCallback() {
    document.removeEventListener("click", this.handleClickAway);
    super.detachedCallback();
  }

  handleHeaderClick(originalEvent) {
    const { value } = this;
    this.dispatchEvent(
      new CustomEvent("select-header", { detail: { value, originalEvent } })
    );
  }

  handleOpenMenu(originalEvent) {
    const { custom, open, value } = this;
    originalEvent.stopPropagation();
    if (!custom) {
      this.open = !open;
    }
    this.dispatchEvent(
      new CustomEvent("select-group", { detail: { value, originalEvent } })
    );
  }

  handleItemClick(originalEvent) {
    const { value, disabled } = this;
    originalEvent.stopPropagation();
    if (!!value && !disabled) {
      this.dispatchEvent(
        new CustomEvent("select-item", { detail: { value, originalEvent } })
      );
    }
  }

  isInPath = (path, element) => {
    return path.some((node) => node === element);
  };

  isInParentNode = (node, element) => {
    if (!!node) {
      return node === element || this.isInParentNode(node.parentNode, element);
    }
    return false;
  };

  handleClickAway = (event) => {
    if (this.popout) {
      const { path, originalTarget } = event;
      const eventPath = path || event.composedPath();
      let clickedAway = false;
      if (!!eventPath) {
        clickedAway = !this.isInPath(eventPath, this);
      } else {
        const root = this.shadowRoot.firstElementChild;
        clickedAway = !this.isInParentNode(originalTarget, root);
      }
      if (clickedAway) {
        this.open = !open;
      }
    }
  };
}

customElements.define("mv-menu-panel", MvMenuPanel);
