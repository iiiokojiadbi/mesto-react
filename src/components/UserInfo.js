export default class UserInfo {
  constructor({ selectorUserName, selectorUserHobby }) {
    this._userName = document.querySelector(selectorUserName);
    this._userHobby = document.querySelector(selectorUserHobby);
  }

  getUserInfo() {
    const name = this._userName.textContent;
    const hobby = this._userHobby.textContent;
    return [name, hobby];
  }

  setUserInfo({ name, hobby }) {
    this._userName.textContent = name;
    this._userHobby.textContent = hobby;
  }
}
