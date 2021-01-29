import openFullImage from './utils.js';

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
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

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like-button').addEventListener('click', this._handleLikeButton);

    this._element.querySelector('.cards__trash-button').addEventListener('click', this._handleTrashButton);

    this._element.querySelector('.cards__img').addEventListener('click', this._handleFullImage);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('cards__like-button_active');
  }

  _handleTrashButton(evt) {
    let deletedCard = evt.target.closest('.cards__item');
    deletedCard.remove();
    deletedCard = null;
  }

  /* _handleFullImage(evt) {
    openFullImage(evt);
  } */

  _handleFullImage(evt) {
    this._handleCardClick(evt);
  }

}