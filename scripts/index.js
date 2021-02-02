import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorElement: '.popup__error',
  errorVisibility: 'popup__error_visible'
};

export const profileUserName = document.querySelector('.profile__username');
export const profileUserJob = document.querySelector('.profile__about');





const userEditButton = document.querySelector('.profile__user-button');
/* const popupCloseButton = document.querySelector('.popup__close-button');

const popupEditUser = document.querySelector('.popup_edit-user-profile');
const popupAddCard = document.querySelector('.popup_add-card'); */
/* const popupFullImage = document.querySelector('.popup_full-image');
export const fullImage = popupFullImage.querySelector('.popup__image-full-pic');
export const fullImageCaption = popupFullImage.querySelector('.popup__image-full-caption'); */

/* const popupInputName = document.querySelector('.popup__form-input_name');
const popupInputJob = document.querySelector('.popup__form-input_job');

const popupEditUserForm = popupEditUser.querySelector('.popup__form_user'); */
const cardAddButton = document.querySelector('.profile__add-button');
/* const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
 */
const popupAddCardForm = document.querySelector('.popup__form_add-card');

/*  const cardsContainer = document.querySelector('.cards__container');
 */
/* const closeButtonFullImage = popupFullImage.querySelector('.popup__close-button_full-image');
const nameText = document.querySelector('.popup__form-input_title');
const linkText = document.querySelector('.popup__form-input_link');
const cardTemplate = '#cards__item-template'; */


/* export function openPopup(element) {
  element.classList.add('popup_opened');
  element.addEventListener('click', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupOnEsc);
} */

/* function closePopup(element) {
  element.classList.remove('popup_opened');
  element.removeEventListener('click', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupOnEsc);
} */

/* function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
} */

/* function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
} */

/* function openPopupUser() {
  popupEditUserForm.reset();
  openPopup(popupEditUser);
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
  setValidators(popupEditUserForm);
} */

/* function handleFormUser(evt) {
  evt.preventDefault();
  profileUserName.textContent = popupInputName.value;
  profileUserJob.textContent = popupInputJob.value;
  closePopup(popupEditUser);
} */

/* function openPopupAddCard() {
  popupAddCardForm.reset();
  openPopup(popupAddCard);
  setValidators(popupAddCardForm);
} */

//make one card from Card class with some data
/* function createCard(data) {
  const card = new Card(data, cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
} */

//make a list of cards from default array
/* function renderInitialListCards(data, container) {
  data.forEach((item) => {
    container.append(createCard(item));
  });
} */

//renderInitialListCards(initialCards, cardsContainer);

//make a custom card from the popup-form
/* function addNewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({ name: nameText.value, link: linkText.value }));
  closePopup(popupAddCard);
  popupAddCardForm.reset();
} */

//enable validation for each popup opening
function setValidators(form) {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
}

/* popupEditUserForm.addEventListener('submit', handleFormUser);
popupAddCardForm.addEventListener('submit', addNewCard);
cardAddButton.addEventListener('click', openPopupAddCard); */

/* cardAddButton.addEventListener('click', () => {
  const popupOpened = new PopupWithForm('.popup_add-card', (evt) => {
    evt.preventDefault();
   
  })
}); */

/* userEditButton.addEventListener('click', () => );
 */
/* userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', () => closePopup(popupEditUser));
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
closeButtonFullImage.addEventListener('click', () => closePopup(popupFullImage)); */







/* //new way of creating card

import Section from './Section.js';
import handleCardClick from './utils.js';

-------------------------


/* import Section from './Popup.js';
import { initialCards } from './initialCards.js';
*/


//render initial card-list >>>>>>>

import handleCardClick from './utils.js';

const newSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#cards__item-template', handleCardClick);

    const cardElement = card.generateCard();

    newSection.addItem(cardElement);
  },
}, '.cards__container');

newSection.renderList()

//<<<<<< render initial list


//initialising popup add card>>>>>
const popupCard = new PopupWithForm('.popup_add-card', (evt) => {
  evt.preventDefault();
  const newCard = new Section(
    {

      items: [{ name: popupCard.form.title.value, link: popupCard.form.link.value }],

      renderer: (item) => {

        const card = new Card(item, '#cards__item-template', handleCardClick);
    
        const cardElement = card.generateCard();

        newCard.addItem(cardElement);
      }

    },
    '.cards__container');
    newCard.renderList()
  
  popupCard.close()
});

//push the button to add a card >>>>>
cardAddButton.addEventListener('click', () => {
  popupCard.open();
  popupCard.form.reset()
  setValidators(popupCard.form);
  popupCard.setEventListeners();
});
//<<<<<< push the button to add a card





//userInfo initialisation >>>>>
const userInfo = new UserInfo({ nameSelector: '.profile__username', jobSelector: '.profile__about' });
//<<<<<

const popupProfile = new PopupWithForm('.popup_edit-user-profile', (evt) => {
  evt.preventDefault();
  //collecting from the form >>>>>
  userInfo.name = popupProfile.form.username.value;
  userInfo.job = popupProfile.form.userjob.value;
  userInfo.setUserInfo(); //<<<< setting to the profile
  popupProfile.close();
});

//push the button to edit the profile >>>>>
userEditButton.addEventListener('click', () => {
  //setting data from userInfo to the form when opening >>>>>
  userInfo.getUserInfo();
  popupProfile.form.username.value = userInfo.name;
  popupProfile.form.userjob.value = userInfo.job;
  //<<<<<<
  popupProfile.open();
  popupProfile.setEventListeners();//!!!!!тут не работает
  setValidators(popupProfile.form);
})


/* let inputsUserInfo = new UserInfo({ nameSelector: '.profile__username', jobSelector: '.profile__about' });//или const???
inputsUserInfo.getUserInfo(); */

//<<<<<< push the button to edit the profile