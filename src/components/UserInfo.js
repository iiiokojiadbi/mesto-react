export default class UserInfo {
  constructor({ selectorUserName, selectorUserHobby, selectorUserAvatar }) {
    this._userName = document.querySelector(selectorUserName);
    this._userHobby = document.querySelector(selectorUserHobby);
    this._userAvatar = document.querySelector(selectorUserAvatar);
  }

  getUserInfo() {
    const name = this._userName.textContent;
    const hobby = this._userHobby.textContent;
    return { name, hobby };
  }

  setUserInfo({ name, hobby, src }) {
    this._userName.textContent = name;
    this._userHobby.textContent = hobby;
    this._userAvatar.src = src || this._userAvatar.src;
  }
}
