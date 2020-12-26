const userEditButton = document.querySelector('.profile__user-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupEditUser = document.querySelector('.popup_edit-user-profile');
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
const nameText = document.querySelector('.popup__form-input_title');
const linkText = document.querySelector('.popup__form-input_link');

function closePopup(element) {
  element.classList.remove('popup_opened');
};

function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

function closePopupOnEsc(evt, element) {
  if (evt.key === 'Escape') {
    closePopup(element);
  };
};

//open popup by adding class popup_opened
function openPopup(element) {
  element.classList.add('popup_opened');
  element.addEventListener('click', closePopupOnOverlay, { once: true });
  window.addEventListener('keydown', (evt) => { closePopupOnEsc(evt, element) }, { once: true });
};

function openFullImage(evt) {
  popupFullImage.querySelector('.popup__image-full-caption').textContent = evt.target.alt;
  const fullImage = popupFullImage.querySelector('.popup__image-full-pic');
  fullImage.src = evt.target.src;
  fullImage.alt = evt.target.alt;
  openPopup(popupFullImage);
};

function closeFullImage() {
  closePopup(popupFullImage);
};

//make one card from template, set name-, link-values and listeners for trash-, like-buttons and image
function createCard(element) {
  const cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.cards__title').textContent = element.name;
  const cardImage = cardItem.querySelector('.cards__img');
  cardImage.alt = element.name;
  cardImage.src = element.link;
  cardItem.querySelector('.cards__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });
  cardItem.querySelector('.cards__trash-button').addEventListener('click', function (evt) {
    const targetItem = evt.target.closest('.cards__item');
    targetItem.remove();
  });
  cardItem.querySelector('.cards__img').addEventListener('click', openFullImage);
  return cardItem;
};

function closePopupAddCard() {
  closePopup(popupAddCard);
};

//make a card-list from the default array
function renderInitialListCards() {
  const cardsList = initialCards.map(createCard);
  cardsContainer.append(...cardsList);
};

renderInitialListCards();

//make a custom card from the popup-form
function addNewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({ name: nameText.value, link: linkText.value }));
  closePopupAddCard();
  popupAddCardForm.reset();
};

function openPopupUser() {
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
  openPopup(popupEditUser);
};

function closePopupUser() {
  closePopup(popupEditUser);
};

function handleFormUser(evt) {
  evt.preventDefault(); /* prevent auto reload */
  profileUserName.textContent = popupInputName.value;
  profileUserJob.textContent = popupInputJob.value;
  closePopup(popupEditUser);
};

//disabling button by default:
function disableButton(element) {
  const button = element.querySelector('.popup__form-button');
  button.classList.add('popup__form-button_disabled');
};

function openPopupAddCard() {
  openPopup(popupAddCard);
  disableButton(popupAddCard);
  popupAddCardForm.reset();
};

userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', closePopupUser);
popupForm.addEventListener('submit', handleFormUser);
cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupAddCardForm.addEventListener('submit', addNewCard);
closeButtonFullImage.addEventListener('click', closeFullImage);