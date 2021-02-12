import { profileUserName, profileUserJob, profileAvatar, popupCard } from '../index.js';

export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((userData) => {
        profileUserName.textContent = userData.name;
        profileUserJob.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        const initialCards = data;
        return initialCards;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  sendUserInfoToServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileUserName.textContent,
        about: profileUserJob.textContent
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addNewCardToServer() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: popupCard.inputData.name,
        link: popupCard.inputData.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

}

/* fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards', {
  headers: {
    authorization: 'fb75d0e9-391a-4d96-80ba-b4913a49b17c'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); */



  //Загрузка информации о пользователе с сервера>>>

/*  fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
  method: 'GET',
  headers: {
    authorization: 'fb75d0e9-391a-4d96-80ba-b4913a49b17c'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });)
  .then((userData) => {
    userData.name;
  }); */

  //<<< загрузка информации о пользователе с сервера