import { LitElement, html, css } from "lit-element";
import "mv-linear-icons";
import "mv-toast";
import "./mv-menu-panel.js";

export class MvMenuPanelDemo extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, attribute: false, reflect: true },
      title: { type: String, attribute: false, reflect: true },
      position: { type: String, attribute: false, reflect: true },
      selected: { type: String, attribute: false, reflect: true },
      theme: { type: String, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
        --mv-menu-panel-width: 280px;
        --content-margin: calc(20px + var(--mv-menu-panel-width));
        --content-width: calc(100% - var(--content-margin));
      }

      mv-menu-panel[menu] > mv-menu-panel[label] {
        width: 100%;
        display: block;
        cursor: pointer;
      }

      .demo-content {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--content-width);
        margin: 0 0 0 var(--content-margin);
      }

      .custom-group-label {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      mv-fa[icon="lightbulb"] {
        font-size: 50px;
        cursor: pointer;
        margin: 20px;
      }

      fieldset > label,
      label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin: 10px;
        border: 2px solid red;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.position = "left";
    this.testValue = { value: "This can be any value" };
    this.title = "";
    this.selected = "";
    this.openLight = false;
    this.theme = "dark";
  }

  render() {
    return html`
      <mv-menu-panel
        menu
        show-header
        .position="${this.position}"
        .value="${{ value: "This value is for the header." }}"
        @select-header="${this.handleHeaderClick}"
        .theme="${this.theme}"
      >
        <mv-menu-panel label>
          <div class="header">
            <mv-lnr icon="home"></mv-lnr>Menu
          </div>
        </mv-menu-panel>

        <mv-menu-panel
          group
          .value="${{ value: "This value is for Menu 1" }}"
          @select-group="${this.handleGroupSelect}"
        >
          <mv-menu-panel label>
            <mv-lnr icon="user"></mv-lnr>Menu 1
          </mv-menu-panel>

          <mv-menu-panel
            item
            .value="${{
              name: "menu 1.1",
              value: "This value is for Menu 1.1",
            }}"
            .selected="${this.selected === "menu 1.1"}"
            @select-item="${this.handleItemClick}"
          >
            Menu 1.1
          </mv-menu-panel>

          <mv-menu-panel
            item
            .value="${{
              name: "menu 1.2",
              value: "This value is for Menu 1.2",
            }}"
            .selected="${this.selected === "menu 1.2"}"
            @select-item="${this.handleItemClick}"
          >
            Menu 1.2
          </mv-menu-panel>

          <mv-menu-panel
            group
            custom
            ?open="${this.open}"
            .value="${{ value: "This value is for the Custom Menu." }}"
            @select-group="${this.handleCustomMenu}"
          >
            <mv-menu-panel label class="custom-group-label">
              <span> <mv-lnr icon="star"></mv-lnr> Custom Menu </span>
              ${this.open
                ? html`<mv-lnr icon="chevron-up"></mv-lnr>`
                : html`<mv-lnr icon="chevron-down"></mv-lnr>`}
            </mv-menu-panel>

            <mv-menu-panel
              item
              .value="${{
                name: "menu 1.3.1",
                value: "This value is for Menu 1.3.1",
              }}"
              .selected="${this.selected === "menu 1.3.1"}"
              @select-item="${this.handleItemClick}"
            >
              Menu 1.3.1
            </mv-menu-panel>

            <mv-menu-panel
              group
              popout
              .value="${{ value: "This value is for Menu 1.3.2" }}"
              @select-group="${this.handleGroupSelect}"
            >
              <mv-menu-panel label>Menu 1.3.2</mv-menu-panel>

              <mv-menu-panel
                item
                .value="${{
                  name: "menu 1.3.2.1",
                  value: "This value is for Menu 1.3.2.1",
                }}"
                .selected="${this.selected === "menu 1.3.2.1"}"
                @select-item="${this.handleItemClick}"
              >
                Menu 1.3.2.1
              </mv-menu-panel>

              <mv-menu-panel
                item
                .value="${{
                  name: "menu 1.3.2.2",
                  value: "This value is for Menu 1.3.2.2",
                }}"
                .selected="${this.selected === "menu 1.3.2.2"}"
                @select-item="${this.handleItemClick}"
              >
                Menu 1.3.2.2
              </mv-menu-panel>

              <mv-menu-panel
                item
                .value="${{
                  name: "menu 1.3.2.3",
                  value: "This value is for Menu 1.3.2.3",
                }}"
                .selected="${this.selected === "menu 1.3.2.3"}"
                @select-item="${this.handleItemClick}"
              >
                Menu 1.3.2.3
              </mv-menu-panel>
            </mv-menu-panel>
          </mv-menu-panel>
        </mv-menu-panel>
        <mv-menu-panel
          item
          .value="${{
            value: "Any value to be passed to an action",
            href: "https://github.com/meveo-org",
          }}"
          .selected="${this.selected === "link"}"
          @select-item="${this.handleLink}"
        >
          <a href="https://github.com/meveo-org" target="_blank">
            <mv-lnr icon="paperclip"></mv-lnr> Menu 2 - Link
          </a>
        </mv-menu-panel>
        <mv-menu-panel item disabled>
          <mv-lnr icon="book"></mv-lnr> Menu 3 - Disabled
        </mv-menu-panel>
      </mv-menu-panel>
      <div class="demo-content">
        <h1>Menu Panel Demo</h1>
        <fieldset>
          <legend>Theme</legend>
          <label
            ><input
              type="radio"
              name="theme"
              value="light"
              @change="${this.changeTheme}"
            />Light</label
          >
          <label
            ><input
              type="radio"
              name="theme"
              value="dark"
              checked
              @change="${this.changeTheme}"
            />Dark</label
          >
        </fieldset>
        <mv-toast type="information" .closeable="${false}">
          <h3>${this.title}</h3>
          <pre>${this.message}</pre>
        </mv-toast>
      </div>
    `;
  }

  handleHeaderClick = (event) => {
    const {
      detail: { value },
    } = event;
    this.title = "handleHeaderClick()";
    this.message = JSON.stringify(value, null, 2);
  };

  handleGroupSelect = (event) => {
    const {
      detail: { value },
    } = event;
    this.title = "handleGroupSelect()";
    this.message = JSON.stringify(value, null, 2);
  };

  handleCustomMenu = (event) => {
    const {
      detail: { value },
    } = event;
    this.open = !this.open;
    this.title = "handleCustomMenu()";
    this.message = JSON.stringify(value, null, 2);
  };

  handleLink = (event) => {
    const {
      detail: { value },
    } = event;
    this.selected = "link";
    this.title = "handleLink()";
    this.message = JSON.stringify(value, null, 2);
  };

  handleItemClick = (event) => {
    const {
      detail: { value },
    } = event;
    this.selected = value.name;
    this.title = "handleItemClick()";
    this.message = JSON.stringify(value, null, 2);
  };

  changeTheme = (event) => {
    this.theme = event.target.value;
  };
}

customElements.define("mv-menu-panel-demo", MvMenuPanelDemo);
