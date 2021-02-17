import handleCardClick from './utils.js';

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes.length;
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

}