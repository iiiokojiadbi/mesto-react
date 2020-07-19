class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialData() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  _returnResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._returnResponse);
  }

  _getUserInfo() {
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '71b91625-ec4b-4170-b042-4d00aa6f06b7',
    'Content-Type': 'application/json',
  },
});

export default api;
