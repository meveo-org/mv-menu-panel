import { LitElement, html, css } from "lit-element";

export class MvMenuPanel extends LitElement {
  static get properties() {
    return {
      // optional, this is the value that is returned when menu items are clicked
      value: { type: Object, attribute: false },
      menu: { type: Boolean, attribute: true },
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
      }

      @keyframes slide-in {
        0% {          
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
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

      ul {
        display: flex;
        flex-direction: column;
        padding-left: 0;
        margin: 0 0 0 20px;
        animation: slide-in 1s slide-in;
      }

      li {
        list-style-type: none;        
        color: #FFFFFF;
        margin: 10px 0;
      }

      li ::slotted(a){
        text-decoration: none;
        color: #FFFFFF;
      }

      .menu-label-group {
        width: calc(100% - 20px);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .menu-panel-label {
        width: 100%;
        line-height: 30px;
      }

      .menu-panel-label:hover, .item ::slotted(a:hover), .item:hover {
        color: #00D8FF;
        cursor: pointer;
      }

      .menu-group-dropdown-icon {
        font-size: 20px;
        font-style: normal;
        line-height: 20px;
      }

      .menu-group-dropdown-icon:before {
        display: inline-block;
        content: "\\02039";
        transform: rotate(90deg);
      }

      .menu-group-dropdown-icon.open {
        position: relative;
        left: -4px;
        transform: rotate(180deg);
      }
		`;
  }

  constructor() {
    super();
    this.disabled = false;
    this.selected = false;
    this.custom = false;
  }

  render() {
    const { menu, label, group, item, open, custom } = this;
    if (menu) {
      return open
        ? html`
          <aside class="mv-menu-panel">
            <div class="menu-panel-header">
              <slot name="menu-panel-label"></slot>
            </div>
            <nav class="menu-panel-nav">
              <ul>
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
        <li class="group" @click="${this.handleOpenMenu}">
          <div class="menu-label-group">
            <div class="menu-panel-label">
              <slot name="menu-panel-label"></slot>
            </div>
            ${!custom
              ? html`<i class="${`menu-group-dropdown-icon${open
                  ? " open"
                  : ""}`}"></i>`
              : html``}
          </div>
          ${open
            ? html`
              <div class="menu-panel-group">
                <ul>
                  <slot></slot>
                </ul>
              </div>
              `
            : html``}          
        </li>
      `;
    } else if (item) {
      return html`
      <li class="item" @click="${this.handleItemClick}">
        <slot></slot>
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
    const { value } = this;
    if (!!value) {
      this.dispatchEvent(
        new CustomEvent("select-item", { detail: { value, originalEvent } })
      );
    } else {
      originalEvent.stopPropagation();
    }
  }
}

customElements.define("mv-menu-panel", MvMenuPanel);
