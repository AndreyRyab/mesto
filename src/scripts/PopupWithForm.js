import Popup from './Popup.js';
import { api } from '../index.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  getInputValues() {
    if (this.form.title) {
      this.inputData = { name: this.form.title.value, link: this.form.link.value }
    }
  }

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

  submit(evt, card, itemId) {
    evt.preventDefault();
    super.open;
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      api.deleteCardFromServer(itemId)
        .then(() => {
          card.remove();
          this.close();
        })
    })
  }

}