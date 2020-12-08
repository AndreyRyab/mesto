const initialCards = [
  {
    name: 'Эльбрус',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-elbrus-xl.jpg'
  },
  {
    name: 'Красная поляна',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-polyana-xl.jpg'
  },
  {
    name: 'Чегет',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-cheget-xl.jpg'
  },
  {
    name: 'Карелия',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-karelia-xl.jpg'
  },
  {
    name: 'Ладоское озеро',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-ladoga-xl.jpg'
  },
  {
    name: 'Кондуки',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-konduki-xl.jpg'
  }
];


let userEditButton = document.querySelector('.profile__user-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupSubmitButton = document.querySelector('.popup__form-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let profileUserName = document.querySelector('.profile__username');
let profileUserJob = document.querySelector('.profile__about');
let popupInputName = document.querySelector('.popup__form-input_name');
let popupInputJob = document.querySelector('.popup__form-input_job');

const cardsContainer = document.querySelector('.cards__container');
const likeButton = document.querySelector('.cards__like-button');
const likeIcon = document.querySelector('.cards__like-icon');
const cardTemplate = document.querySelector('#cards__item-template');

const popupAddCard = document.querySelector('.popup_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
let popupInputTitle = popupAddCardForm.querySelector('.popup__form-input_title');
let popupInputLink = popupAddCardForm.querySelector('.popup__form-input_link');

//make one card from template giving name and link values
function makeOneCard(element) {
  let cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.cards__title').textContent = element.name;
  cardItem.querySelector('.cards__img').textContent = element.name;
  cardItem.querySelector('.cards__img').src = element.link;
  return cardItem;
}

/* function makeOneCard({name}, {link}) {
  let cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.cards__title').textContent = name;
  cardItem.querySelector('.cards__img').textContent = name;
  cardItem.querySelector('.cards__img').src = link;
  return cardItem;
} */

//make a list set on the default massive
function renderInitialListCards() {
  let cardsList = initialCards.map(makeOneCard);
  cardsContainer.append(...cardsList);
}

renderInitialListCards();


function openPopupUser() {
  popup.classList.add('popup_opened');
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
}

function closePopupUser() {
  popup.classList.remove('popup_opened');
}

function handleFormUser(evt) {
  evt.preventDefault(); /* prevent auto reload */
  profileUserName.textContent = popupInputName.value;
  profileUserJob.textContent = popupInputJob.value;
  closePopupUser();
}

function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
}


function addNewCard(evt) {
  evt.preventDefault();
  let cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.cards__title').textContent = popupInputTitle.value;
  cardItem.querySelector('.cards__img').textContent = popupInputTitle.value;
  cardItem.querySelector('.cards__img').src = popupInputLink.value;
  cardsContainer.prepend(cardItem);
  popupInputTitle.value = popupInputTitle.placeholder;
  popupInputLink.value = popupInputLink.placeholder;
  closePopupAddCard();
}

/* function addNewCard(evt) {
  evt.preventDefault();
  let titleNew = popupInputTitle.value;
  let linkNew = popupInputLink.value;
  makeOneCard({ name: titleNew }, { link: linkNew });
  cardsContainer.prepend(cardItem);
  closePopupAddCard(); */



userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', closePopupUser);
popupForm.addEventListener('submit', handleFormUser);
cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardForm.addEventListener('submit', addNewCard);