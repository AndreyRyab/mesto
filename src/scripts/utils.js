import FormValidator from './FormValidator.js';
import { api, userInfo, popupSubmitRemove, validationConfig, popupFullImageOpened } from '../index.js';

export default function handleCardClick(evt) {
  popupFullImageOpened.open(evt);
}

export function handleLikes(cardElement, itemId) {
  const likesCounter = cardElement.querySelector('.cards__like-counter');
  const likeButton = cardElement.querySelector('.cards__like-button');
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('cards__like-button_active')) {
      api.deleteLike(itemId)
        .then((data) => {
          likesCounter.textContent = data.likes.length;
          likeButton.classList.remove('cards__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.addLike(itemId)
        .then((data) => {
          likesCounter.textContent = data.likes.length;
          likeButton.classList.add('cards__like-button_active');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  })
}

export function showMyLikes(item, cardElement) {
  item.likes.forEach((item) => {
    if (item._id === userInfo.id) {
      cardElement.querySelector('.cards__like-button').classList.add('cards__like-button_active')
    }
  })
}

export function handleTrashButton(cardElement, item) {
  cardElement.querySelector('.cards__trash-button').addEventListener('click', (evt) => {
    popupSubmitRemove.open();
    popupSubmitRemove.submit(evt, cardElement, item);
  });
}

export function setValidators(form) {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
}