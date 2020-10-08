import configApi from './Utils.js';

class Api {
    constructor({ url, headers = {} }) {
        this._url = url;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            console.log('Ошибка подключения к серверу');
            return Promise.reject(res.statusText);
        }
    }

    _handleResponseError(err) {
        console.log('Ошибка подключения к серверу');
        return Promise.reject(err.message);
    }

    getInitialCards() { 
        return fetch(`${this._url}/cards`, { headers: this._headers })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, { headers: this._headers })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    setUserInfo(newUserInfo) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${newUserInfo.name}`,
                about: `${newUserInfo.about}`
            })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    setNewCard(newCard) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${newCard.name}`,
                link: `${newCard.link}`
            })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)

    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    setLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    delLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    setAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar.avatar}`
            })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
}

const myApi = new Api(configApi);

export default myApi;

