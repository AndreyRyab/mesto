import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this.inputData = { name: this.form.title.value, link: this.form.link.value }
    }
   
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitForm);
  }

  close() {
    this._getInputValues();
    super.close();
    this.form.reset();
  }
}