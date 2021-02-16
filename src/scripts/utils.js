import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { api } from '../index.js';

export default function handleCardClick(evt) {
  const popupFullImageOpened = new PopupWithImage('.popup_full-image');
  popupFullImageOpened.open(evt);
}

/* export function submitRemoveCard(cardId) {
  const popupSubmitRemove = new PopupWithForm('.popup_submit-remove', (evt) => {
    evt.preventDefault();
    api.deleteCardFromServer(cardId);
  });
  popupSubmitRemove.open();
  popupSubmitRemove.setEventListeners();
} */

export function handleTrashButton(evt) {
  let deletedCard = evt.target.closest('.cards__item');
  deletedCard.remove();
  deletedCard = null;
}