import handleCardClick from './utils.js';
import { api, popupSubmitRemove, userInfo } from '../index.js';


export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //make an empty card-tempate
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    return cardElement;
  }

  //make a new card, filling a card-template whith user data, adding listeners
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.cards__img').src = this._image;
    this._element.querySelector('.cards__img').alt = this._title;
    this._element.querySelector('.cards__title').textContent = this._title;
    this._element.querySelector('.cards__like-counter').textContent = this._likes;
    this._element.id = this._id;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__img').addEventListener('click', this._handleFullImage);
  }

  _handleFullImage(evt) {
    handleCardClick(evt);
  }


  //___новый код

  showMyLikes() {
    this._element.querySelector('.cards__like-counter').textContent = this._likes.length;
    this._likes.forEach((item) => {
      if (item._id === userInfo.id) {
        this._element.querySelector('.cards__like-button').classList.add('cards__like-button_active')
      }
    })
  }

  handleLikes() {
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._likesCounter = this._element.querySelector('.cards__like-counter');
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('cards__like-button_active')) {
        api.deleteLike(this._id)
          .then((data) => {
            this._likesCounter.textContent = data.likes.length;
            this._likeButton.classList.remove('cards__like-button_active');
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.addLike(this._id)
          .then((data) => {
            this._likesCounter.textContent = data.likes.length;
            this._likeButton.classList.add('cards__like-button_active');
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
  }

  enableTrashButton() {
    this._trashButton = this._element.querySelector('.cards__trash-button');
    this._trashButton.addEventListener('click', () => {
      popupSubmitRemove.open();
      popupSubmitRemove.button.addEventListener('click', (evt) => {
        evt.preventDefault();
        api.deleteCardFromServer(this._id)
          .then(() => {
            this._element.remove();
            this._element = null;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupSubmitRemove.close(),
              popupSubmitRemove.button.removeEventListener('click', (evt) => {
                evt.preventDefault()
                console.log(this._id)
                api.deleteCardFromServer(this._id)
                  .then(() => {
                    this._element.remove();
                    this._element = null;
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => popupSubmitRemove.close())
              })
          })
      })
    })
  }

}