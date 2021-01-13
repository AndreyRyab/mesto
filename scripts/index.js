import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
};

const userEditButton = document.querySelector('.profile__user-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupEditUser = document.querySelector('.popup_edit-user-profile');
const profileUserName = document.querySelector('.profile__username');
const profileUserJob = document.querySelector('.profile__about');
const popupInputName = document.querySelector('.popup__form-input_name');
const popupInputJob = document.querySelector('.popup__form-input_job');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
const popupEditUserForm = popupEditUser.querySelector('.popup__form_user');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.cards__container');
const popupFullImage = document.querySelector('.popup_full-image');
const closeButtonFullImage = popupFullImage.querySelector('.popup__close-button_full-image');
const nameText = document.querySelector('.popup__form-input_title');
const linkText = document.querySelector('.popup__form-input_link');
const cardTemplate = '#cards__item-template';
const fullImage = popupFullImage.querySelector('.popup__image-full-pic');

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
  fullImage.src = evt.target.src;
  fullImage.alt = evt.target.alt;
  openPopup(popupFullImage);
};

function openPopupUser() {
  openPopup(popupEditUser);
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
};

function handleFormUser(evt) {
  evt.preventDefault(); /* prevent auto reload */
  profileUserName.textContent = popupInputName.value;
  profileUserJob.textContent = popupInputJob.value;
  closePopup(popupEditUser);
};

function openPopupAddCard() {
  popupAddCardForm.reset();
  openPopup(popupAddCard);
};

//make one card from Card class with some data
function createCard(data) {
  const card = new Card(data, cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

//make a list of cards from default array
function renderInitialListCards(data, container) {
  data.forEach((item) => {
    container.append(createCard(item));
  });
}

renderInitialListCards(initialCards, cardsContainer);

//make a custom card from the popup-form
function addNewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({ name: nameText.value, link: linkText.value }));
  closePopup(popupAddCard);
};

function setValidators() {
  const formsList = document.querySelectorAll('.popup__form');
  Array.from(formsList).forEach((form) => {
    const formValidator = new FormValidator(validationConfig, form);
    formValidator.enableValidation(form);
  });
}

setValidators();

popupEditUserForm.addEventListener('submit', handleFormUser);
popupAddCardForm.addEventListener('submit', addNewCard);
cardAddButton.addEventListener('click', openPopupAddCard);
userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', () => closePopup(popupEditUser));
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
closeButtonFullImage.addEventListener('click', () => closePopup(popupFullImage));