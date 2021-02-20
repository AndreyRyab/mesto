import Popup from './Popup.js';

export default class PopupSubmitRemove extends Popup {
  constructor(popupSelector, cautionText, buttonText) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._formTitle = this._popup.querySelector('.popup__form-heading_submit-remove');
    this.button = this._popup.querySelector('.popup__form-button_submit-remove');
    this._cautionText = cautionText;
    this._buttonText = buttonText;
  }

  setEventListeners() {
    super.setEventListeners();
  }
}