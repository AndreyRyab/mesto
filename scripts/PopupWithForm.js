import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

 /*  _getInputValues() {
    if (this._form.title) {
      this._title = this._form.input.title.value;
      this._link = this._form.link.value;
    } */
          
      /* было:
      name: this._form.username.value,
      job: this._form.userjob.value,
      title: this._form.title.value,
      link: this._form.link.value */
   
  
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this.form.reset();
  }
}