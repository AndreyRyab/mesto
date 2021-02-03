import './pages/index.css';
import Card from './scripts/Card.js';
import Popup from './scripts/Popup.js';
import FormValidator from './scripts/FormValidator.js';
import { initialCards } from './scripts/initialCards.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import Section from './scripts/Section.js';
import handleCardClick from './scripts/utils.js';

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
const cardAddButton = document.querySelector('.profile__add-button');

//render initial card-list >>>>>>>
const newSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#cards__item-template', handleCardClick);
    const cardElement = card.generateCard();
    newSection.addItem(cardElement);
  },
},
  '.cards__container');

newSection.renderList();
//<<<<<< render initial list


//enable validation for each popup opening >>>>
function setValidators(form) {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
}
//<<<< enable validation for each popup opening


//initialising popup add card>>>>>
const popupCard = new PopupWithForm('.popup_add-card', (evt) => {
  evt.preventDefault();
  popupCard.close()

  const newCard = new Section({
    items: [popupCard.inputData],
    renderer: (item) => {

      const card = new Card(item, '#cards__item-template', handleCardClick);

      const cardElement = card.generateCard();

      newCard.addItem(cardElement);
    }

  },
    '.cards__container');

  newCard.renderList()
});

//push the button to add a card >>>>>
cardAddButton.addEventListener('click', () => {
  popupCard.open();
  popupCard.form.reset()
  setValidators(popupCard.form);
  popupCard.setEventListeners();
});
//<<<<<< push the button to add a card


//userInfo object initialisation >>>>>
const userInfo = new UserInfo({ nameSelector: '.profile__username', jobSelector: '.profile__about' });
//<<<<<


//profile popup initialisation >>>>>
const popupProfile = new PopupWithForm('.popup_edit-user-profile', (evt) => {
  evt.preventDefault();
  //collecting data from the form >>>>>
  userInfo.name = popupProfile.form.username.value;
  userInfo.job = popupProfile.form.userjob.value;
  userInfo.setUserInfo(); //<<<< setting to the profile
  popupProfile.close();
});
//<<<<< profile popup initialisation


//push the button to edit the profile >>>>>
userEditButton.addEventListener('click', () => {
  //setting data from userInfo to the form when opening >>>>>
  userInfo.getUserInfo();
  popupProfile.form.username.value = userInfo.name;
  popupProfile.form.userjob.value = userInfo.job;
  //<<<<<< setting data from userInfo to the form when opening
  popupProfile.open();
  popupProfile.setEventListeners();
  setValidators(popupProfile.form);
})
//<<<<<< push the button to edit the profile


//full image popup initialisation >>>>>
const popupFullImage = new Popup('.popup_full-image');
popupFullImage.setEventListeners();
//<<<<< full image popup initialisation