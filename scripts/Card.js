import openFullImage from './script';

class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._image = data.image;
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
    this._element.querySelector('.cards__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('cards__like-button_active');
    });

    this._element.querySelector('.cards__trash-button').addEventListener('click', (evt) => {
      const targetItem = evt.target.closest('.cards__item');
      targetItem.remove();
    });

    this._element.querySelector('.cards__img').addEventListener('click', openFullImage);
  }

}