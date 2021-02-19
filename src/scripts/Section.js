export default class Section {
  constructor({ itemsData, renderer }, containerSelector) {
    this._items = itemsData;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderList() {
    this._items.forEach(item => this._renderer(item))
  }

  addItem(item) {
    this._container.prepend(item)
  }
}