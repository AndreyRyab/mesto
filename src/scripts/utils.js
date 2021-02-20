import FormValidator from './FormValidator.js';
import { validationConfig, popupFullImageOpened } from '../index.js';

export default function handleCardClick(evt) {
  popupFullImageOpened.open(evt);
}

export function setValidators(form) {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
}