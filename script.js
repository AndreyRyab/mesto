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
const cardsContainer = document.querySelector('.cards__container');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_add-card');




const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');

/* const likeButton = document.querySelector('.cards__like-button'); */
const likeButtonActive = document.querySelector('.cards__like-button-active');



//make one card from template, set name-, link-values and listeners for trash- and like-buttons
function makeOneCard(element) {
  const cardTemplate = document.querySelector('#cards__item-template');
  let cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.cards__title').textContent = element.name;
  cardItem.querySelector('.cards__img').textContent = element.name;
  cardItem.querySelector('.cards__img').src = element.link;
  cardItem.querySelector('.cards__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });
  cardItem.querySelector('.cards__trash-button').addEventListener('click', function (evt) {
    const targetItem = evt.target.closest('.cards__item');
    targetItem.remove();
  });
  return cardItem;
}


//make a list set on the default array
function renderInitialListCards() {
  let cardsList = initialCards.map(makeOneCard);
  cardsContainer.append(...cardsList);
}

renderInitialListCards();


/* function addNewCard(evt) {
  evt.preventDefault(); */
/*   let inputName = popupAddCardForm.querySelector('.popup__form-input_title').value;
  let inputLink = popupAddCardForm.querySelector('.popup__form-input_link').value; */
/* const newItem = [{name}, {link}]; */



/*   [{name: popupAddCardForm.querySelector('.popup__form-input_title').value}, {link: popupAddCardForm.querySelector('.popup__form-input_link').value}];
 *//*   console.log(inputName);
 console.log(inputLink); */
/* newItem = [inputName, inputLink]; */  /*тут надо задать element.name и element.link, которые нужны на вход makeOneCard*/
/*   makeOneCard(newItem);
  cardsContainer.prepend(cardItem);
  closePopupAddCard();
}
 */


function removeCard() {

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









/*   function likeAdd () {
    likeButton.classList.remove('cards__like-button-active_hide');
  } */

/* function removeCard(event) {
  const targetCard = event.target.closest('.cards__item');
  targetCard.remove();
} */

/* function addListenerToNewCard(card) {
  const removeButton = card.querySelector('.cards__trash-button');
  removeButton.addEventListener('click', removeCard);

} */

userEditButton.addEventListener('click', openPopupUser);
popupCloseButton.addEventListener('click', closePopupUser);
popupForm.addEventListener('submit', handleFormUser);
cardAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
/* popupAddCardForm.addEventListener('submit', addNewCard);
 */
