/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
export default class Api {
  constructor(serverAdress, authorizationToken) {
    this.server = serverAdress;
    this.token = authorizationToken;
  }

  getUserInfoFromServer() {
    return fetch(`${this.server}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось получить данные о пользователе с сервера( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  patchUserInfo(newUserName, newUserAbout) {
    return fetch(`${this.server}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${newUserName}`,
        about: `${newUserAbout}`,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось отправить данные о пользователе на сервер( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  getPicturesFromServer() {
    return fetch(`${this.server}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось получить фотографии с сервера( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  postNewCard(name, link) {
    return fetch(`${this.server}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось создать пост( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  deleteCardFromServer(_id) {
    return fetch(`${this.server}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось удалить фотографию с сервера( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  putLike(_id) {
    return fetch(`${this.server}/cards/${_id}/like`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось поставить лайк( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        throw alert(err);
      });
  }

  deleteLike(_id) {
    return fetch(`${this.server}/cards/${_id}/like`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось удалить лайк( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        throw alert(err);
      });
  }

  getAvatar() {
    return fetch(`${this.server}/users/me/`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось получить аватар с сервера( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  patchAvatar(newUrl) {
    return fetch(`${this.server}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: `${newUrl}`,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Упс, не удалось отправить аватар на сервер( Ошибка: ${res.status} ${res.statusText}`);
      })
      .catch((err) => {
        alert(err);
      });
  }
}
