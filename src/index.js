import './pages/index.css';
import Card from './scripts/Card.js';
import Popup from './scripts/Popup.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import Section from './scripts/Section.js';
import handleCardClick from './scripts/utils.js';
import Api from './scripts/Api.js';

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
const userInfo = new UserInfo({ nameSelector: '.profile__username', jobSelector: '.profile__about' });
//<<<<<

//getting user data from server and setting to the profile >>>>>
export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'fb75d0e9-391a-4d96-80ba-b4913a49b17c');

api.getUserInfoFromServer()
  .then((allAboutUser) => {
    profileUserName.textContent = allAboutUser.name;
    profileUserJob.textContent = allAboutUser.about;
    profileAvatar.style.backgroundImage = `url('${allAboutUser.avatar}')`;
    return allAboutUser;
  })
  .then((allAboutUser) => {
    api.getInitialCards()
      .then(initialCards => {
        const newSection = new Section({
          items: initialCards,
          renderer: (item) => {
            if (item.owner._id === allAboutUser._id) {
              const card = new Card(item, '#cards__item-template_owner', handleCardClick);
              const cardElement = card.generateCard();


              //add-remove like feature>>>>>
              const likeButton = cardElement.querySelector('.cards__like-button');
              likeButton.addEventListener('click', () => {
                if (likeButton.classList.contains('cards__like-button_active')) {
                  api.deleteLike(item._id);
                  likeButton.classList.remove('cards__like-button_active');
                } else {
                  api.addLike(item._id);
                  likeButton.classList.add('cards__like-button_active');
                }

                //<<<<
              });

              //<<<<

              //add delete card feature>>>>
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
              }); //<<<<<

              newSection.addItem(cardElement);
            } else {
              const card = new Card(item, '#cards__item-template', handleCardClick);
              const cardElement = card.generateCard();

              //add-remove like feature>>>>>
              const likeButton = cardElement.querySelector('.cards__like-button');
              likeButton.addEventListener('click', () => {
                if (likeButton.classList.contains('cards__like-button_active')) {
                  api.deleteLike(item._id);
                  likeButton.classList.remove('cards__like-button_active');
                } else {
                  api.addLike(item._id);
                  likeButton.classList.add('cards__like-button_active');
                }

                //<<<<
              });
              newSection.addItem(cardElement);
            }
          },
        },
          '.cards__container');
        newSection.renderList();
      }
      )
  }
  )
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
  const newSection = new Section({
    items: [popupCard.inputData],
    renderer: (item) => {
      const card = new Card(item, '#cards__item-template_owner', handleCardClick);
      const cardElement = card.generateCard();
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
    }
  },
    '.cards__container');
  api.addNewCardToServer()
    //.then тут будем показывать, что сохраняется (то есть попап с кнопкой "сохраняю")
    .then(() => newSection.renderList());
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


//profile popup initialisation >>>>>
const popupProfile = new PopupWithForm('.popup_edit-user-profile', (evt) => {
  evt.preventDefault();
  //collecting data from the form >>>>>
  userInfo.name = popupProfile.form.username.value;
  userInfo.job = popupProfile.form.userjob.value;
  userInfo.setUserInfo();
  //<<<< setting to the profile
  api.sendUserInfoToServer();
  popupProfile.close();
});
popupProfile.setEventListeners();
//<<<<< profile popup initialisation

//push the button to edit the profile >>>>>
userEditButton.addEventListener('click', () => {
  //setting data from userInfo to the form when opening >>>>>
  userInfo.getUserInfo();
  popupProfile.form.username.value = userInfo.name;
  popupProfile.form.userjob.value = userInfo.job;
  //<<<<<< setting data from userInfo to the form when opening
  popupProfile.open();
  setValidators(popupProfile.form);
})
//<<<<<< push the button to edit the profile


//full image popup initialisation >>>>>
const popupFullImage = new Popup('.popup_full-image');
popupFullImage.setEventListeners();
//<<<<< full image popup initialisation