import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

export default function handleCardClick(evt) {
  const popupFullImageOpened = new PopupWithImage('.popup_full-image');
  popupFullImageOpened.open(evt);
}

export function submitRemoveCard() {
  const popupSubmitRemove = new PopupWithForm('.popup_submit-remove');
  popupSubmitRemove.open();
  popupSubmitRemove.setEventListeners();
}