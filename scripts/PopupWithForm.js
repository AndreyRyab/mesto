import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = super._popup.forms.form;
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const userData = {
      name: this._form.elements.username.value,
      job: this._form.elements.userjob.value,
      title: this._form.elements.title.value,
      link: this._form.elements.link.value
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._getInputValues();
    this._form.reset();
  }
}