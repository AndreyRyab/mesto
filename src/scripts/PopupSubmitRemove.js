import Popup from './Popup.js';

export default class PopupSubmitRemove extends Popup {
  constructor(popupSelector, submitForm, cautionText, buttonText) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formTitle = this._popup.querySelector('.popup__form-heading_submit-remove');
    this._button = this._popup.querySelector('.popup__form-button_submit-remove');
    this._cautionText = cautionText;
    this._buttonText = buttonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitForm);
  }

}