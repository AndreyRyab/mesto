import { profileUserName, profileUserJob } from './index.js';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.name = document.querySelector(nameSelector).textContent;
    this.job = document.querySelector(jobSelector).textContent;
  }

  getUserInfo() {
    this.name = profileUserName.textContent;
    this.job = profileUserJob.textContent;
    
  }

  setUserInfo() {
    profileUserName.textContent = this.name;
    profileUserJob.textContent = this.job;
  }
}