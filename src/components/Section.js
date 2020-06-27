export default class Section {
  constructor({ items, rendered }, containerSelector) {
    this._renderedItems = items;
    this._rendered = rendered;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._rendered(item);
    });
  }

  addItem({ element }) {
    this._container.prepend(element);
  }
}
