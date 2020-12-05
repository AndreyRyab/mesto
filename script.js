const initialCards = [
  {
      name: 'Эльбрус',
      link: 'https://cutt.ly/nhnPrDX'
  },
  {
      name: 'Красная поляна',
      link: 'https://cutt.ly/5hnPWRo'
  },
  {
      name: 'Чегет',
      link: 'https://cutt.ly/shnPTaI'
  },
  {
      name: 'Карелия',
      link: 'https://cutt.ly/4hnPUGR'
  },
  {
      name: 'Ладоское озеро',
      link: 'https://cutt.ly/7hnPOSk'
  },
  {
      name: 'Кондуки',
      link: 'https://cutt.ly/ShnPP8p'
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
let likeButton = document.querySelector('.cards__like-button');
let likeIcon = document.querySelector('.cards__like-icon');


function openPopup() {
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleForm(evt) {
  evt.preventDefault(); /* prevent auto reload */
  profileUserName.textContent = popupInputName.value;
  profileUserJob.textContent = popupInputJob.value;
  closePopup();
}

function likeToggle() {
  likeButton.innerHTML = '<img class="cards__like-icon" src="images/like-icon-active.svg" alt="Кнопка 'Нравится'">';
}

userEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleForm);
likeButton.addEventListener('click', likeToggle);