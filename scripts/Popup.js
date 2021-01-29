export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button')
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popupCloseButton.removeEventListener('click', () => close());
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      close();
    };
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => close());
  }

}