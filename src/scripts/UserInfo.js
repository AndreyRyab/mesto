import { profileUserName, profileUserJob, profileAvatar } from '../index.js';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.name = document.querySelector(nameSelector).textContent;
    this.job = document.querySelector(jobSelector).textContent;
  }

  getUserInfo(allAboutUser) {
    this.name = allAboutUser.name;
    this.job = allAboutUser.about;
    this.id = allAboutUser._id;
  }

  setUserInfo() {
    profileUserName.textContent = this.name;
    profileUserJob.textContent = this.job;
  }

  setAvatar(allAboutUser) {
    profileAvatar.style.backgroundImage = `url('${allAboutUser.avatar}')`;
  }
}