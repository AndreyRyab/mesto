import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  /*   _getInputValues() {
      if (this.form.title) {
        this.inputData = { name: this.form.title.value, link: this.form.link.value }
      } else if (this.form.name) {
        this.inputData = { name: this.form.username.value, about: this.form.userjob.value }
      }
      else {
        this.avatar = this.form.link.value
      }
    } */

  setPreloader() {
    this.form.querySelector('.popup__form-button').textContent = 'Сохраняется...'
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this.form.reset();
  }
}