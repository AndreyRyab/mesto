import './pages/index.css';
import Card from './scripts/Card.js';
import Popup from './scripts/Popup.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupSubmitRemove from './scripts/PopupSubmitRemove.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import Section from './scripts/Section.js';
import handleCardClick from './scripts/utils.js';
import Api from './scripts/Api.js';
import { handleLikes, handleTrashButton, showMyLikes, setValidators } from './scripts/utils.js';


export const validationConfig = {
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
export const profileAvatar = document.querySelector('.profile__avatar');
const userEditButton = document.querySelector('.profile__user-button');
const cardAddButton = document.querySelector('.profile__add-button');

export const userInfo = new UserInfo({ nameSelector: '.profile__username', jobSelector: '.profile__about' });

export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'fb75d0e9-391a-4d96-80ba-b4913a49b17c');

/* function deleteCard(card) {
  card.delete();
} */

export const popupSubmitRemove = new PopupSubmitRemove('.popup_submit-remove', 'Вы уверены?', 'Да'/* , (element, id, evt) => {
  evt.preventDefault();
  api.deleteCardFromServer(id)
    .then(() => {
      element.remove();
      element = null;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupSubmitRemove.close())
} */);
popupSubmitRemove.setEventListeners();

export const popupFullImageOpened = new PopupWithImage('.popup_full-image');

const popupFullImage = new Popup('.popup_full-image');
popupFullImage.setEventListeners();

//!!!!newcode>>>
Promise.all([
  api.getUserInfoFromServer(),
  api.getInitialCards()
])
  .then(([allAboutUser, initialCards]) => {
    userInfo.getUserInfo(allAboutUser);
    userInfo.setUserInfo();
    userInfo.setAvatar(allAboutUser);
    const newSection = new Section({
      itemsData: initialCards.reverse(),
      renderer: (item) => {
        if (item.owner._id === userInfo.id) {
          const card = new Card(item, '#cards__item-template_owner', handleCardClick);
          const cardElement = card.generateCard();
          card.showMyLikes();
          card.enableTrashButton();
          card.handleLikes(cardElement, item._id);
          newSection.addItem(cardElement);
        } else {
          const card = new Card(item, '#cards__item-template', handleCardClick);
          const cardElement = card.generateCard();
          card.showMyLikes();
          card.handleLikes();
          newSection.addItem(cardElement);
        }
      },
    },
      '.cards__container');
    newSection.renderList();
  })
  .catch((err) => {
    console.log(err);
  })
//<<<<!!!!newcode

//profile popup initialisation >>>>>
const popupProfile = new PopupWithForm('.popup_edit-user-profile', (evt) => {
  evt.preventDefault();
  popupProfile.setPreloader();
  userInfo.name = popupProfile.form.username.value;
  userInfo.job = popupProfile.form.userjob.value;
  api.sendUserInfoToServer(userInfo)
    .then(() => {
      userInfo.setUserInfo();
    })
    .then(() => {
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupProfile.removePreloader())
});
popupProfile.setEventListeners();
//<<<<< profile popup initialisation

//push the button to edit the profile >>>>>
userEditButton.addEventListener('click', () => {
  popupProfile.form.username.value = userInfo.name;
  popupProfile.form.userjob.value = userInfo.job;
  popupProfile.open();
  setValidators(popupProfile.form);
})
//<<<<<< push the button to edit the profile

//initialising popup add card >>>>>
export const popupCard = new PopupWithForm('.popup_add-card', (evt) => {
  evt.preventDefault();
  popupCard.setPreloader();
  popupCard.getInputValues();
  api.addNewCardToServer(popupCard.inputData)
    .then((data) => {
      const newSection = new Section({
        itemsData: [data],
        renderer: (item) => {
          const card = new Card(item, '#cards__item-template_owner', handleCardClick);
          const cardElement = card.generateCard();
          card.showMyLikes();
          card.enableTrashButton();
          card.handleLikes(cardElement, item._id);
          newSection.addItem(cardElement);
        }
      },
        '.cards__container');
      newSection.renderList();
    })
    .then(() => popupCard.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupCard.removePreloader())
}, 'Создать');
setValidators(popupCard.form);
popupCard.setEventListeners();
//<<<<< initialising popup add card

//push the button to add a card >>>>>
cardAddButton.addEventListener('click', () => {
  popupCard.open();
  popupCard.form.reset();
});
//<<<<<< push the button to add a card

const popupAvatar = new PopupWithForm('.popup_avatar', (evt) => {
  evt.preventDefault();
  popupAvatar.setPreloader();
  const avatar = popupAvatar.form.link.value;
  api.addNewAvatar(avatar)
    .then((data) => {
      userInfo.setAvatar(data);
    })
    .then(() => popupAvatar.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAvatar.removePreloader())
}, 'Сохранить');

popupAvatar.setEventListeners();

document.querySelector('.profile__avatar').addEventListener('click', () => {
  popupAvatar.open();
})


//_______________




//initial data from server>>>>
/* api.getUserInfoFromServer()
  .then((allAboutUser) => {
    userInfo.getUserInfo(allAboutUser);
    userInfo.setUserInfo();
    userInfo.setAvatar(allAboutUser);
    return userInfo;
  }) */
//<<<<<

//get data for initial cards list and render>>>>
/* api.getInitialCards()
  .then((initialCards) => {
    const newSection = new Section({
      itemsData: initialCards.reverse(),
      renderer: (item) => {
        if (item.owner._id === userInfo.id) {
          const card = new Card(item, '#cards__item-template_owner', handleCardClick);
          const cardElement = card.generateCard();
          handleLikes(cardElement, item._id);
          showMyLikes(item, cardElement);
          handleTrashButton(cardElement, item._id);
          newSection.addItem(cardElement);
        } else {
          const card = new Card(item, '#cards__item-template', handleCardClick);
          const cardElement = card.generateCard();
          handleLikes(cardElement, item._id);
          showMyLikes(item, cardElement);
          newSection.addItem(cardElement);
        }
      },
    },
      '.cards__container');
    newSection.renderList();
  }) */
//<<<<<