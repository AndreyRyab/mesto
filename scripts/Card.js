import openFullImage from './script.js';

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
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
    this._element.querySelector('.cards__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like-button_active');
    })/* ('click', this._handleLikeButton) */;
    this._element.querySelector('.cards__trash-button').addEventListener('click', function (evt) {
      const targetItem = evt.target.closest('.cards__item');
      targetItem.remove();
    });/* ('click', _handleTrashButton); */
    /* this._element.querySelector('.cards__img').addEventListener('click', _handleFullImage); */
    this._element.querySelector('.cards__img').addEventListener('click', openFullImage);
  }

 /*  _handleLikeButton() {
    this._element.classList.toggle('cards__like-button_active');
  } */

 /*  _handleTrashButton() {
    this._element.closest('.cards__item').remove();
  } */

  _handleFullImage() {
    openFullImage(evt);
  }

}