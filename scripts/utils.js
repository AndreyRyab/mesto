import { popupFullImage, openPopup, fullImageCaption, fullImage } from './index.js';

export default function openFullImage(evt) {
  fullImageCaption.textContent = evt.target.alt;
  fullImage.src = evt.target.src;
  fullImage.alt = evt.target.alt;
  openPopup(popupFullImage);
};