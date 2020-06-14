export default class UserInfo {
  constructor({ selectorUserName, selectorUserHobby }) {
    this._selectorUserName = selectorUserName;
    this._selectorUserHobby = selectorUserHobby;
  }

  getUserInfo() {
    const name = document.querySelector(this._selectorUserName).textContent;
    const hobby = document.querySelector(this._selectorUserHobby).textContent;
    return { name, hobby };
  }

  setUserInfo({ name, hobby }) {
    document.querySelector(this._selectorUserName).textContent = name;
    document.querySelector(this._selectorUserHobby).textContent = hobby;
  }
}
