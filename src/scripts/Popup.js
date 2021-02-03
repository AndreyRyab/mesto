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
    this._popupCloseButton.removeEventListener('click', () => this.close());
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }

}