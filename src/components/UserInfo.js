export default class UserInfo {
  constructor({ selectorUserName, selectorUserHobby }) {
    this._selectorUserName = selectorUserName;
    this._selectorUserHobby = selectorUserHobby;
    this._userName = document.querySelector(this._selectorUserName);
    this._userHobby = document.querySelector(this._selectorUserHobby);
  }

  getUserInfo() {
    const name = this._userName.textContent;
    const hobby = this._userHobby.textContent;
    return { name, hobby };
  }

  setUserInfo({ name, hobby }) {
    this._userName.textContent = name;
    this._userHobby.textContent = hobby;
  }
}
