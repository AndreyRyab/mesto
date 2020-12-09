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
    name: 'Ладожское озеро',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-ladoga-xl.jpg'
  },
  {
    name: 'Кондуки',
    link: 'https://dezzzign.ru/wp-content/uploads/2020/12/mesto-konduki-xl.jpg'
  }
];

//переменные для профайла
let userEditButton = document.querySelector('.profile__user-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupSubmitButton = document.querySelector('.popup__form-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let profileUserName = document.querySelector('.profile__username');
let profileUserJob = document.querySelector('.profile__about');
let popupInputName = document.querySelector('.popup__form-input_name');
let popupInputJob = document.querySelector('.popup__form-input_job');


//переменные для карточек
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
const cardsContainer = document.querySelector('.cards__container');


const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');

const cardImage = cardsContainer.querySelector('.cards__img');
const popupFullImage = document.querySelector('.popup_full-image');

const closeButtonFullImage = popupFullImage.querySelector('.popup__close-button_full-image');

//make one card from template, set name-, link-values and listeners for trash-, like-buttons and image
function makeOneCard(element) {
  const cardTemplate = document.querySelector('#cards__item-template');
  const cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.cards__title').textContent = element.name;
  cardItem.querySelector('.cards__img').alt = element.name;
  cardItem.querySelector('.cards__img').src = element.link;
  const fullImageCaption = element.name;
  const fullImageLink = element.link;

  cardItem.querySelector('.cards__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });
  cardItem.querySelector('.cards__trash-button').addEventListener('click', function (evt) {
    const targetItem = evt.target.closest('.cards__item');
    targetItem.remove();
  });
  cardItem.querySelector('.cards__img').addEventListener('click', openFullImage);
  return cardItem;
}

function openFullImage(evt) {
  popupFullImage.querySelector('.popup__image-full-pic').src = evt.target.src;
  popupFullImage.querySelector('.popup__image-full-caption').textContent = evt.target.alt;
  popupFullImage.classList.add('popup_opened');
}

function closeFullImage() {
  popupFullImage.classList.remove('popup_opened');
}

//make a card-list from the default array
function renderInitialListCards() {
  const cardsList = initialCards.map(makeOneCard);
  cardsContainer.append(...cardsList);
}

renderInitialListCards();

//make a custom card from the popup-form
function addNewCard(evt) {
  evt.preventDefault();
  let nameText = document.querySelector('.popup__form-input_title').value;
  let linkText = document.querySelector('.popup__form-input_link').value;
  cardsContainer.prepend(makeOneCard({ name: nameText, link: linkText }));
  closePopupAddCard();
  document.querySelector('.popup__form-input_title').value = document.querySelector('.popup__form-input_title').placeholder;
  document.querySelector('.popup__form-input_link').value = document.querySelector('.popup__form-input_link').placeholder;
}

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

userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', closePopupUser);
popupForm.addEventListener('submit', handleFormUser);
cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardForm.addEventListener('submit', addNewCard);
closeButtonFullImage.addEventListener('click', closeFullImage);