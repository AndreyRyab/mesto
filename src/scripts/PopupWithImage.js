import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image-full-pic');
    this._caption = this._popup.querySelector('.popup__image-full-caption');
  }

  open(evt) {
    this._image.src = evt.target.src;
    this._caption.textContent = evt.target.alt;
    this._image.alt = evt.target.alt;
    super.open();
  }
}