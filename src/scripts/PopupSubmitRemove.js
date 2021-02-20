import Popup from './Popup.js';
import { api } from '../index.js';


export default class PopupSubmitRemove extends Popup {
  constructor(popupSelector, cautionText, buttonText/* , submitForm */) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formTitle = this._popup.querySelector('.popup__form-heading_submit-remove');
    this._button = this._popup.querySelector('.popup__form-button_submit-remove');
    this._cautionText = cautionText;
    this._buttonText = buttonText;
    /* this._submitForm = submitForm */
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }


  /* open() {
    super.open();
    this._submitForm = function (element, id, evt) {
      evt.preventDefault();
      api.deleteCardFromServer(id)
        .then(() => {
          element.remove();
          element = null;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => popupSubmitRemove.close())
    }

  } */

  /*  submit(evt, card, itemId) {
     evt.preventDefault();
     super.open;
     this.form.addEventListener('submit', (evt) => {
       evt.preventDefault();
       api.deleteCardFromServer(itemId)
         .then(() => {
           card.remove();
           this.close();
         }) */

}

/* function submitRemove(element) {
  console.log(element)
  api.deleteCardFromServer(element.id)
    .then(() => element.delete())
} */

/*   submitForm(evt, id, element) {
    evt.preventDefault();
    api.deleteCardFromServer(id)
      .then(() => {
        element.remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupSubmitRemove.close())
  } */

/* submitForm(evt, itemId) {
  evt.preventDefault();
  api.deleteCardFromServer(itemId)
      .then(() => {
        removeCard(itemId);
        this.close();
      })
} */