const initialCards = [
  {
    name: 'Эльбрус',
    link: 'https://downloader.disk.yandex.ru/preview/68400bcdd441fa9ac25ea2d16243513562e2efc667206c4dd153b17e77a5ecb6/5fcd5e61/KtocaoOI_xjCqYpG2JGXelGg-8UgZObc7hqlkw_TAyoh97nwhX0cRa5740intVehCRfAHznh_ZvdtB_blYyDHg%3D%3D?uid=0&filename=mesto-elbrus-xl.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
  },
  {
    name: 'Красная поляна',
    link: 'https://downloader.disk.yandex.ru/preview/44d4554a467ad24b568ddf8c487f6acaf02b07a0062127bff74c88e2856a297d/5fcd5e4d/ealomn7bKrokt2_U5ARG51Gg-8UgZObc7hqlkw_TAyqhA4FcvUZ3o46ttGdxj7yNX61oQRr1XlpJWNVtAk07vg%3D%3D?uid=0&filename=mesto-polyana-xl.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
  },
  {
    name: 'Чегет',
    link: 'https://downloader.disk.yandex.ru/preview/75e7498052aa73ddd8226f1ef2b4f4d1a1b37c4369371be2f06d76a1a3c3c470/5fcd5dcf/aHC2_K-Bp6OKwfQ_mNPfoFGg-8UgZObc7hqlkw_TAyrVpUGK_2UE0KVm3mYrCy5mdVRTI6DVJ7i-oeNXG4n67g%3D%3D?uid=0&filename=mesto-cheget-xl.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
  },
  {
    name: 'Карелия',
    link: 'https://downloader.disk.yandex.ru/preview/d549e61b48a4ad8101b6a36c26f5983218426ce077f1b9cb2c2b8986af5a8206/5fcd5e78/FpFUdQLpMoiMVswh3D8DVFGg-8UgZObc7hqlkw_TAyr9euqcvwDob_2wrAbjrpHD69I2bQ6wvW9QAd_GS6TOIg%3D%3D?uid=0&filename=mesto-karelia-xl.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
  },
  {
    name: 'Ладоское озеро',
    link: 'https://downloader.disk.yandex.ru/preview/ab2833b426c86bd8ddeb05ce92744b75ed56948ac8014e9771b91f75196f48a4/5fcd5e37/TGAkXFSajByhDxu3NH3Np1Gg-8UgZObc7hqlkw_TAypvAUgDVbsT-fndaxFhijPO_FZVGwtPiQ_wz2zuTwdftw%3D%3D?uid=0&filename=mesto-ladoga-xl.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
  },
  {
    name: 'Кондуки',
    link: 'https://downloader.disk.yandex.ru/preview/d7d1f5302cb66497fce0ed8909e4bc83e5f8b95e6775a8d448c3a35f8dee9cb9/5fcd5e1f/h47M_1ZiEN2dZy2RB39F23VeQrVzOLrYCSG24nQF6g1Mp3EeaNNDZqdYPoPPO1QvmbjQ4YIpma1oWlB990IICQ%3D%3D?uid=0&filename=mesto-konduki-xl.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
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

function makeOneCard(element) {
  let cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.cards__title').textContent = element.name;
  cardItem.querySelector('.cards__img').textContent = element.name;
  cardItem.querySelector('.cards__img').src = element.link;
  cardsContainer.append(cardItem);
}

const cardsList = initialCards.forEach(makeOneCard);





function openPopup() {
  popup.classList.add('popup_opened');
  popupInputName.value = profileUserName.textContent;
  popupInputJob.value = profileUserJob.textContent;
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

/* function likeToggle() {
  likeButton.innerHTML = '<img class="cards__like-icon" src="images/like-icon-active.svg" alt="Кнопка 'Нравится'">';
} */

userEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleForm);
/* likeButton.addEventListener('click', likeToggle); */