import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { api } from '../index.js';

export default function handleCardClick(evt) {
  const popupFullImageOpened = new PopupWithImage('.popup_full-image');
  popupFullImageOpened.open(evt);
}

export function submitRemoveCard() {
  const popupSubmitRemove = new PopupWithForm('.popup_submit-remove', (evt) => {
    evt.preventDefault();
    
  });
  popupSubmitRemove.open();
  popupSubmitRemove.setEventListeners();
}