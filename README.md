# mv-menu-panel

MvMenuPanel is a Meveo menu component (based on lit-element) that renders a menu-panel at the left side of the page.

## Features

- Uses only one component
- Allows menu items to have custom content
- Configurable styles

## Quick Start

To experiment with the MvMenuPanel component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the menu-panel demo component in demo.js file

## Sample usage

```html
<mv-menu-panel
  menu                                                    // indicates that this is the main menu section
  showLabel                                               // indicates that the menu header label is shown
  .value="${{ value: "This value is for the header." }}"  // the value that is returned when the header label is clicked
  @select-header="${this.handleHeaderClick}"              // custom event dispatched when the header label is clicked
>
  <mv-menu-panel label>Header Label</mv-menu-panel>

  <mv-menu-panel
    item                                                  // indicates that this is a menu item
    .value="${{ anyvalue: "item value" }}"                // value returned when the item is clicked
    .selected="${this.selected}"                          // indicates whether the menu item is selected
    @select-item="${this.handleItemClick}"                // custom event dispatched when an item is clicked
  >Item not in a group</mv-menu-panel>

  <mv-menu-panel
    group                                                 // indicates that this is a menu group
    .value="${{ value: "This value is for Menu 1" }}"     // value returned when the group label is clicked
    @select-group="${this.handleGroupSelect}"             // custom event dispatched when the group label is clicked
  >
    <mv-menu-panel label>Group Label</mv-menu-panel>

    <mv-menu-panel
      item
      .value="${{ anyvalue: "item value" }}"
      .selected="${this.selected}"
      @select-item="${this.handleItemClick}"
    >Item inside a group</mv-menu-panel>

  </mv-menu-panel>
</menu-panel>
```

You can also check this [demo](https://manaty.net/mv-menu-panel/)
