import { profileUserName, profileUserJob } from '../index.js';

export default class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  getUserInfoFromServer() {
    fetch(this.url, {
      method: 'GET',
      headers: {
        authorization: this.token
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





  //!!!! Ответ от сервера всегда проверяется на корректность:

  /* .then(res => {
    if (res.ok) {
      return res.json();
    }
      
  // если ошибка, отклоняем промис
  
    return Promise.reject(`Ошибка: ${res.status}`);
  }); */