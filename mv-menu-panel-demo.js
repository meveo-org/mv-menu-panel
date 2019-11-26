import { LitElement, html, css } from "lit-element";
import "mv-linear-icon";
import "mv-toast";
import "./mv-menu-panel.js";

const CONTENT_POSITION = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top"
};

export class MvMenuPanelDemo extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      title: { type: String, reflect: true },
      position: { type: String, reflect: true, attribute: false }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      .demo-content.right{
        width: 100%;
        margin: 0 0 0 330px;
      }

      .demo-content.left{
        width: 100%;
        margin: 0 330px 0 0;
      }

      .custom-group-label{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.position = "left";
    this.contentPosition = CONTENT_POSITION[this.position];
    this.testValue = { value: "This can be any value" };
    this.title = "";
  }

  render() {
    const { position, contentPosition } = this;
    const contentClass = `demo-content ${contentPosition}`;
    return html`
    <mv-menu-panel menu .position="${position}">
      <mv-menu-panel label><mv-linear-icon icon="home"></mv-linear-icon> Menu</mv-menu-panel>
      <mv-menu-panel        
        ?open="${this.open}"
        @select-group="${this.handleOpenCustomMenu}"
        .value="${{
          value: "This is any value passed to the action when menu is clicked"
        }}"
        group
        custom
      >
        <mv-menu-panel label class="custom-group-label">
          <span>
            <mv-linear-icon icon="star"></mv-linear-icon> Custom Menu
          </span>
          ${this.open
            ? html`<mv-linear-icon icon="chevron-up"></mv-linear-icon>`
            : html`<mv-linear-icon icon="chevron-down"></mv-linear-icon>`}          
        </mv-menu-panel>
        <mv-menu-panel item>Menu 1.1</mv-menu-panel>
        <mv-menu-panel item>Menu 1.2</mv-menu-panel>
        <mv-menu-panel item>
          <mv-menu-panel group>
            <mv-menu-panel label>Menu 1.3</mv-menu-panel>
            <mv-menu-panel item>Menu 1.3.1</mv-menu-panel>
            <mv-menu-panel item>
              <mv-menu-panel group>
                <mv-menu-panel label>Menu 1.3.2</mv-menu-panel>
                <mv-menu-panel item>Menu 1.3.2.1</mv-menu-panel>
                <mv-menu-panel item>Menu 1.3.2.2</mv-menu-panel>
                <mv-menu-panel item>Menu 1.3.2.3</mv-menu-panel>
              </mv-menu-panel>
            </mv-menu-panel>
          </mv-menu-panel>
        </mv-menu-panel>
      </mv-menu-panel>
      <mv-menu-panel
        @select-item="${this.handleLink}"
        .value="${{
          value: "Any value to be passed to an action",
          href: "https://github.com/meveo-frontend"
        }}"
        item
      >
        <a href="https://github.com/meveo-frontend" target="_blank">mv-frontend</a>
      </mv-menu-panel>
      <mv-menu-panel item>Menu 3</mv-menu-panel>
    </mv-menu-panel>
    <div class="${contentClass}">
      <h1>Menu Panel Demo</h1>
      <mv-toast type="information" .closeable="${false}">
        <h3>${this.title}</h3>
        <pre>${this.message}</pre>
      </mv-toast>
    </div>
    `;
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "position") {
      this.contentPosition = CONTENT_POSITION[newValue];
    }
  }

  handleOpenCustomMenu(event) {
    const { detail: { value, originalEvent } } = event;
    originalEvent.stopPropagation();
    this.open = !this.open;
    this.title = "handleOpenCustomMenu()";
    this.message = JSON.stringify(value, null, 2);
  }

  handleLink(event) {
    const { detail: { value, originalEvent } } = event;
    originalEvent.stopPropagation();
    this.title = "handleLink()";
    this.message = JSON.stringify(value, null, 2);
  }
}

customElements.define("mv-menu-panel-demo", MvMenuPanelDemo);
