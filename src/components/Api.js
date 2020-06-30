export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _returnResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._returnResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._returnResponse)
      .then((response) => {
        this.myId = response._id;
        return response;
      });
  }

  updateUserInfo(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._returnResponse);
  }

  updateUserAvatar(body) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._returnResponse);
  }

  postCard(body) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._returnResponse);
  }

  deleteCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._returnResponse);
  }

  likeCard({ method, idCard }) {
    return fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
      method: method,
      headers: this._headers,
    })
      .then(this._returnResponse)
      .then((data) => data.likes);
  }
}
