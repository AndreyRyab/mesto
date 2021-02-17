import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { api } from '../index.js';

export default function handleCardClick(evt) {
  const popupFullImageOpened = new PopupWithImage('.popup_full-image');
  popupFullImageOpened.open(evt);
}

export function handleLikes(cardElement, itemId) {
  //???как сделать, чтобы лайк горел, если юзер уже лайкал???? 
  const likesCounter = cardElement.querySelector('.cards__like-counter');
  const likeButton = cardElement.querySelector('.cards__like-button');
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('cards__like-button_active')) {
      api.deleteLike(itemId)
        .then((data) => {
          likesCounter.textContent = data.likes.length;
          likeButton.classList.remove('cards__like-button_active');
        })
    } else {
      api.addLike(itemId)
        .then((data) => {
          likesCounter.textContent = data.likes.length;
          likeButton.classList.add('cards__like-button_active');
        })
    }
  })
}

/* export function submitRemoveCard(cardId) {
  const popupSubmitRemove = new PopupWithForm('.popup_submit-remove', (evt) => {
    evt.preventDefault();
    api.deleteCardFromServer(cardId);
  });
  popupSubmitRemove.open();
  popupSubmitRemove.setEventListeners();
} */

/* export function handleTrashButton(evt) {
  let deletedCard = evt.target.closest('.cards__item');
  deletedCard.remove();
  deletedCard = null;

} */