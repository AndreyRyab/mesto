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

const userEditButton = document.querySelector('.profile__user-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const profileUserName = document.querySelector('.profile__username');
const profileUserJob = document.querySelector('.profile__about');
const popupInputName = document.querySelector('.popup__form-input_name');
const popupInputJob = document.querySelector('.popup__form-input_job');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.cards__container');
const popupFullImage = document.querySelector('.popup_full-image');
const closeButtonFullImage = popupFullImage.querySelector('.popup__close-button_full-image');
const cardTemplate = document.querySelector('#cards__item-template');


//make one card from template, set name-, link-values and listeners for trash-, like-buttons and image
function makeOneCard(element) {
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

//open popup by adding class popup_opened
function openPopup (element) {
  element.classList.add('popup_opened');
}

//close popup on click on x-button
function closePopupOnClickClose(element) {
  element.classList.remove('popup_opened')
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
  const nameText = document.querySelector('.popup__form-input_title').value;
  const linkText = document.querySelector('.popup__form-input_link').value;
  cardsContainer.prepend(makeOneCard({ name: nameText, link: linkText }));
  closePopupAddCard();
  document.querySelector('.popup__form-input_title').value = document.querySelector('.popup__form-input_title').placeholder;
  document.querySelector('.popup__form-input_link').value = document.querySelector('.popup__form-input_link').placeholder;
}

function openPopupUser() {
  openPopup(popup);
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
}

function closePopupUser() {
  closePopupOnClickClose(popup);
}

function handleFormUser(evt) {
  evt.preventDefault(); /* prevent auto reload */
  profileUserName.textContent = popupInputName.value;
  profileUserJob.textContent = popupInputJob.value;
  closePopupOnClickClose(popup);
}

function openPopupAddCard() {
  openPopup(popupAddCard);
}

function closePopupAddCard() {
  closePopupOnClickClose(popupAddCard);
}

function openFullImage(evt) {
  popupFullImage.querySelector('.popup__image-full-pic').src = evt.target.src;
  popupFullImage.querySelector('.popup__image-full-caption').textContent = evt.target.alt;
  openPopup(popupFullImage);
}

function closeFullImage() {
  closePopupOnClickClose(popupFullImage);
}



userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', closePopupUser);
popupForm.addEventListener('submit', handleFormUser);
cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardForm.addEventListener('submit', addNewCard);
closeButtonFullImage.addEventListener('click', closeFullImage);