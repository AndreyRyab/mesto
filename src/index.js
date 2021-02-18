import './pages/index.css';
import Card from './scripts/Card.js';
import Popup from './scripts/Popup.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import Section from './scripts/Section.js';
import handleCardClick from './scripts/utils.js';
import Api from './scripts/Api.js';
import { handleLikes } from './scripts/utils.js';


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
export const profileAvatar = document.querySelector('.profile__avatar');
const userEditButton = document.querySelector('.profile__user-button');
const cardAddButton = document.querySelector('.profile__add-button');


//userInfo object initialisation >>>>>
export const userInfo = new UserInfo({ nameSelector: '.profile__username', jobSelector: '.profile__about' });
//<<<<<

//getting user data from server and setting to the profile >>>>>
export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'fb75d0e9-391a-4d96-80ba-b4913a49b17c');

api.getUserInfoFromServer()
  .then((allAboutUser) => {
    userInfo.getUserInfo(allAboutUser);
    userInfo.setUserInfo();
    userInfo.setAvatar(allAboutUser);
    console.log(userInfo);
    return userInfo;

  })

//profile popup initialisation >>>>>
const popupProfile = new PopupWithForm('.popup_edit-user-profile', (evt) => {
  evt.preventDefault();
  popupProfile.setPreloader();
  userInfo.name = popupProfile.form.username.value;
  userInfo.job = popupProfile.form.userjob.value
  api.sendUserInfoToServer(userInfo)
    .then(() => {
      profileUserName.textContent = userInfo.name;
      profileUserJob.textContent = userInfo.job;
    })
    .then(() => {
      popupProfile.close();
    })
});
popupProfile.setEventListeners();
//<<<<< profile popup initialisation

//push the button to edit the profile >>>>>
userEditButton.addEventListener('click', () => {
  //setting data from userInfo to the form when opening >>>>>
  popupProfile.form.username.value = userInfo.name;
  popupProfile.form.userjob.value = userInfo.job;
  //<<<<<< setting data from userInfo to the form when opening
  popupProfile.open();
  setValidators(popupProfile.form);
})
//<<<<<< push the button to edit the profile






api.getInitialCards()
  .then((data) => {
    const initialCards = data;
    return initialCards;
  })

console.log(userInfo, initialCards)

function f(initialCards, userInfo) {
  const newSection = new Section({
    itemsData: initialCards,
    renderer: (item) => {
      if (item.owner._id === userInfo.id) {
        const card = new Card(item, '#cards__item-template_owner', handleCardClick);
        const cardElement = card.generateCard();
        handleLikes(cardElement, item._id);
        cardElement.querySelector('.cards__trash-button').addEventListener('click', () => {
          const popupSubmitRemove = new PopupWithForm('.popup_submit-remove', (evt) => {
            evt.preventDefault();
            api.deleteCardFromServer(item._id)
              .then(() => {
                popupSubmitRemove.close();
              })
              .then(() => cardElement.remove())
          });
          popupSubmitRemove.open();
          popupSubmitRemove.setEventListeners();
        });
        newSection.addItem(cardElement);
      } else {
        const card = new Card(item, '#cards__item-template', handleCardClick);
        const cardElement = card.generateCard();
        handleLikes(cardElement, item._id)
        newSection.addItem(cardElement);
      }
    },
  },
    '.cards__container');
  newSection.renderList();
}

f()
//<<<<<< render initial list


//enable validation >>>>
function setValidators(form) {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
}
//<<<< enable validation


//initialising popup add card >>>>>
export const popupCard = new PopupWithForm('.popup_add-card', (evt) => {
  evt.preventDefault();
  popupCard.close();
  api.addNewCardToServer(popupCard.inputData)
    .then((data) => {
      const newSection = new Section({
        itemsData: data,
        renderer: (item) => {
          const card = new Card(item, '#cards__item-template_owner', handleCardClick);
          const cardElement = card.generateCard();

          handleLikes(cardElement, item._id);
          cardElement.querySelector('.cards__trash-button').addEventListener('click', () => {
            const popupSubmitRemove = new PopupWithForm('.popup_submit-remove', (evt) => {
              evt.preventDefault();
              api.deleteCardFromServer(item._id)
                .then(() => {
                  popupSubmitRemove.close();
                })
                .then((cardElement) => cardElement.remove())
            });
            popupSubmitRemove.open();
            popupSubmitRemove.setEventListeners();
          });
          newSection.addItem(cardElement);
        }
      },
        '.cards__container');
      newSection.renderList();///НЕ РАБОТАЕТ!!! карточка сохраняется на сервере, но не рендерится
    })
});

setValidators(popupCard.form);
popupCard.setEventListeners();
//<<<<< initialising popup add card

//push the button to add a card >>>>>
cardAddButton.addEventListener('click', () => {
  popupCard.open();
  popupCard.form.reset();
});
//<<<<<< push the button to add a card





//full image popup initialisation >>>>>
const popupFullImage = new Popup('.popup_full-image');
popupFullImage.setEventListeners();
//<<<<< full image popup initialisation

const popupAvatar = new PopupWithForm('.popup_avatar', (evt) => {
  evt.preventDefault();
  popupAvatar.close();
  console.log(popupAvatar.avatar)
  api.addNewAvatar(popupAvatar.avatar)
    .then((data) => {
      console.log(data)
    })
});

document.querySelector('.profile__avatar').addEventListener('click', () => {
  popupAvatar.open();
  popupAvatar.setEventListeners();
})


/* profileAvatar.style.backgroundImage = `url('${userData.avatar}')`; */


