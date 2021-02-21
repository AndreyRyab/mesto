import Popup from './Popup.js';
import { api } from '../index.js';

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

  deleteCard(id, element, evt) {
    evt.preventDefault();
    api.deleteCardFromServer(id)
      .then(() => {
        element.remove();
        element = null;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.close()
      })
  }
}