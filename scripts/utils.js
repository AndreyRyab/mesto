//было
/* import { popupFullImage, openPopup, fullImageCaption, fullImage } from './index.js'; */

/* 
export default function openFullImage(evt) {
  fullImageCaption.textContent = evt.target.alt;
  fullImage.src = evt.target.src;
  fullImage.alt = evt.target.alt;
  openPopup(popupFullImage);
}; */

import PopupWithImage from './PopupWithImage.js';

export default function handleCardClick(evt) {
  const popupFullImageOpened = new PopupWithImage('.popup_full-image');
  popupFullImageOpened.open(evt);
}