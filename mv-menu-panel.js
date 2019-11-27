import { LitElement, html, css } from "lit-element";

export class MvMenuPanel extends LitElement {
  static get properties() {
    return {
      // optional, this is the value that is returned when menu items are clicked
      value: { type: Object, attribute: false },
      menu: { type: Boolean, attribute: true },
      showLabel: { type: Boolean, attribute: true },
      label: { type: Boolean, attribute: true },
      group: { type: Boolean, attribute: true },
      item: { type: Boolean, attribute: true },
      open: { type: Boolean, reflect: true, attribute: true },
      disabled: { type: Boolean, attribute: true },
      selected: { type: Boolean, attribute: true },

      //setting custom to true will bypass the default render and behavior of the group label and click action
      custom: { type: Boolean, reflect: true, attribute: true },

      // position values include: "top", "left", "right", "bottom", default: "left"
      position: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
			:host {
        font-family: var(--font-family, Arial);
        user-select: none;
      }

      :host([group]:hover:not([disabled])), :host([item]:hover:not([disabled])) {        
        cursor: pointer;
      }

      ul {
        padding: 0;
        margin: 0;
      }

      li {
        display: block;
        text-indent: 20px;
      }

      li, li ::slotted(*) {
        margin: 0;
        text-decoration: none;
        list-style-type: none;
        color: #FFFFFF;
        line-height: 40px;
      }

      li ::slotted(a) {
        display: block;
      }

      li:hover:not(.disabled), li.open:not(.disabled) {
        color: #00D8FF;
        background-color: rgba(26, 30, 35, 0.4);
      }

      li:hover:not(.disabled) ::slotted(*) {        
        color: #00D8FF;
      }

      li.selected, li.selected ::slotted(*) {
        color: #00D8FF;
        background-color: rgba(26, 30, 35, 0.6);
      }

      li.disabled, li.disabled ::slotted(*) {
        color: #898C91;
        cursor: not-allowed;
      }

      .mv-menu-panel {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        height: 100%;
        width: 330px;
        background: linear-gradient(180deg, rgba(63, 71, 83, 1) 0%, rgba(26, 30, 35, 1) 100%);
        box-shadow: 0 0 16px 1px rgba(151, 156, 163, 0.35)
      }

      .menu-panel-header {        
        font-size: 25px;
        color: #FFFFFF;
        background: linear-gradient(45deg, rgba(232, 179, 56, 1) 0%, rgba(255, 150, 0, 1) 100%);
        height: 66px;
        display: flex;
        align-items: center;
        padding: 0 0 0 20px;
      }

      .menu-label-group {
        width: calc(100% - 20px);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .menu-label-group:hover:not(.disabled) ::slotted(*),
      .menu-label-group.open:not(.disabled) ::slotted(*),
      .menu-label-group:hover:not(.disabled) i,
      .menu-label-group.open:not(.disabled) i {
        color: #00D8FF;        
      }

      .menu-panel-label {
        width: 100%;
        line-height: 20px;
      }

      .menu-group-dropdown-icon {
        position: relative;
        width: 5px;
        height: 5px;
        border-top: 2px solid #DCDCDC;
        border-right: 2px solid #DCDCDC;
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
      
		`;
  }

  constructor() {
    super();
    this.showLabel = false;
    this.disabled = false;
    this.selected = false;
    this.custom = false;
  }

  render() {
    const {
      menu,
      showLabel,
      label,
      group,
      item,
      open,
      disabled,
      selected,
      custom
    } = this;
    const openClass = open ? " open" : " close";
    const disabledClass = disabled ? " disabled" : "";
    const selectedClass = selected ? " selected" : "";
    const itemClass = `${disabledClass || selectedClass}`;
    if (menu) {
      return open
        ? html`
          <aside class="mv-menu-panel">
            ${!!showLabel
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
      return html`
        <slot></slot>
      `;
    } else if (group) {
      return html`
        <li
          class="${openClass}${itemClass}"
          @click="${this.handleOpenMenu}"
        >
          <div class="sub-menu${openClass}">
            <div class="menu-label-group${openClass}">
              <div class="menu-panel-label">
                <slot name="menu-panel-label"></slot>
              </div>
              ${!custom
                ? html`<i class="${`menu-group-dropdown-icon${openClass}`}"></i>`
                : html``}
            </div>
            ${open
              ? html`
                  <ul>
                    <slot></slot>
                  </ul>
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
    super.connectedCallback();
  }

  handleHeaderClick(originalEvent) {
    const { value } = this;
    this.dispatchEvent(
      new CustomEvent("select-header", { detail: { value, originalEvent } })
    );
  }

  handleOpenMenu(originalEvent) {
    const { custom, open, value } = this;
    if (!custom) {
      originalEvent.stopPropagation();
      this.open = !open;
    }
    this.dispatchEvent(
      new CustomEvent("select-group", { detail: { value, originalEvent } })
    );
  }

  handleItemClick(originalEvent) {
    const { value, disabled } = this;
    if (!!value && !disabled) {
      this.dispatchEvent(
        new CustomEvent("select-item", { detail: { value, originalEvent } })
      );
    } else {
      originalEvent.stopPropagation();
    }
  }
}

customElements.define("mv-menu-panel", MvMenuPanel);
