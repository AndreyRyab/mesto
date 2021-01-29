import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.forms.form;
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const name = this._form.elements.username.value;
    const job = this._form.elements.userjob.value;
    const title = this._form.elements.title.value;
    const link = this._form.elements.link.value;
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => close());
    this._form.addEventListener('submit', this._submitForm);
    }

  close() {
    this._popup.classList.remove('popup_opened');
    this._form.reset();
  }

}