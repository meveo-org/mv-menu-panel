import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/manaty/mv-dependencies@master/web_modules/lit-element.js";

export class MvSidebar extends LitElement {
  static get properties() {
    return {
      value: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
			:host {
				font-family: var(--font-family, Arial);
				font-size: var(--font-size-m, 10pt);				
      }
		`;
  }

  render() {
    return html`
    <aside>
      <slot> </slot>
    </aside>
    `;
  }
}

customElements.define("mv-sidebar", MvSidebar);
