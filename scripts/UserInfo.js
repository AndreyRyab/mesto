import { profileUserName, profileUserJob } from './index.js';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector).value;
    this._job = document.querySelector(jobSelector).value;
  }

  getUserInfo() {
    const userData = { name: this._name, job: this._job };
    return userData;
  }

  setUserInfo(userData) {
    profileUserName.textContent = userData.name;
    profileUserJob.textContent = userData.job;
  }
}