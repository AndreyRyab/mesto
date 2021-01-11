export const initialCards = [
  {
    name: 'Эльбрус',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-elbrus-xl.jpg'
  },
  {
    name: 'Красная поляна',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-polyana-xl.jpg'
  },
  {
    name: 'Чегет',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-cheget-xl.jpg'
  },
  {
    name: 'Карелия',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-karelia-xl.jpg'
  },
  {
    name: 'Ладожское озеро',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-ladoga-xl.jpg'
  },
  {
    name: 'Кондуки',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-konduki-xl.jpg'
  }
];

const userEditButton = document.querySelector('.profile__user-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupEditUser = document.querySelector('.popup_edit-user-profile');
const popupForm = document.querySelector('.popup__form');
const profileUserName = document.querySelector('.profile__username');
const profileUserJob = document.querySelector('.profile__about');
const popupInputName = document.querySelector('.popup__form-input_name');
const popupInputJob = document.querySelector('.popup__form-input_job');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.cards__container');
const popupFullImage = document.querySelector('.popup_full-image');
const closeButtonFullImage = popupFullImage.querySelector('.popup__close-button_full-image');

function openPopup(element) {
  element.classList.add('popup_opened');
  element.addEventListener('click', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupOnEsc);
};

function closePopup(element) {
  element.classList.remove('popup_opened');
  element.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupOnEsc);
};

function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

export default function openFullImage(evt) {
  popupFullImage.querySelector('.popup__image-full-caption').textContent = evt.target.alt;
  const fullImage = popupFullImage.querySelector('.popup__image-full-pic');
  fullImage.src = evt.target.src;
  fullImage.alt = evt.target.alt;
  openPopup(popupFullImage);
};

function openPopupUser() {
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
  openPopup(popupEditUser);
};

function handleFormUser(evt) {
  evt.preventDefault(); /* prevent auto reload */
  profileUserName.textContent = popupInputName.value;
  profileUserJob.textContent = popupInputJob.value;
  closePopup(popupEditUser);
};

function openPopupAddCard() {
  openPopup(popupAddCard);
  popupAddCard.querySelector('.popup__form-button').classList.add('popup__form-button_disabled');
  popupAddCardForm.reset();
};

import { Card } from './Card.js';

//make one card from Card class with some data
function createCard(data) {
  const card = new Card(data, '#cards__item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

//make a list of cards from default array
(function renderInitialListCards() {
  initialCards.forEach((item) => {
    cardsContainer.append(createCard(item));
  });
})()

//make a custom card from the popup-form
function addNewCard(evt) {
  evt.preventDefault();
  const nameText = document.querySelector('.popup__form-input_title');
  const linkText = document.querySelector('.popup__form-input_link');
  cardsContainer.prepend(createCard({ name: nameText.value, link: linkText.value }));
  closePopup(popupAddCard);
  popupAddCardForm.reset();
};

popupForm.addEventListener('submit', handleFormUser);
popupAddCardForm.addEventListener('submit', addNewCard);
cardAddButton.addEventListener('click', openPopupAddCard);
userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', () => closePopup(popupEditUser));
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
closeButtonFullImage.addEventListener('click', () => closePopup(popupFullImage));