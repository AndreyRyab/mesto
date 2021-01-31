import { profileUserName, profileUserJob } from './index.js';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector).value; //значение из инпута
    this._job = document.querySelector(jobSelector).value; //значение из инпута
  }

  getUserInfo() {
    const userData = { name: this._name, job: this._job };
    return userData;
  }

  setUserInfo() {
    profileUserName.textContent = this._name;
    profileUserJob.textContent = this._job;
  }
}