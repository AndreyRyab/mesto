import Popup from './Popup.js';
import { api } from '../index.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, buttonText) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._button = this.form.querySelector('.popup__form-button');
    this._submitForm = submitForm;
    this._buttonText = buttonText;
  }

  getInputValues() {
    if (this.form.title) {
      this.inputData = { name: this.form.title.value, link: this.form.link.value }
    }
  }

  setPreloader() {
    this._button.textContent = 'Сохраняется...'
  }

  removePreloader() {
    this._button.textContent = this._buttonText
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this.form.reset();
  }

  /* submit(evt, card, itemId) {
    evt.preventDefault();
    super.open;
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      api.deleteCardFromServer(itemId)
        .then(() => {
          card.remove();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
    })
  } */

}