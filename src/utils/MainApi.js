class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
  
    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
  
    registration(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({name, email, password})
        })
        .then((res) => this._checkResponse(res));
    }
  
    authorization(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({email, password})
        })
        .then((res) => this._checkResponse(res));
    }
  
    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            credentials: "include",
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            withCredentials: true,
            credentials: "include",
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }

    editProfile(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({name, email})
        })
        .then((res) => this._checkResponse(res));
    }
  
    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            credentials: "include",
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }
  
    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(movie)
        })
        .then((res) => this._checkResponse(res));
    }
  
    deleteMovie(_id) {
        return fetch(`${this._baseUrl}/movies/${_id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }
}
  
export const mainApi = new MainApi({
    baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3000'}`,
    headers: {
    'Content-Type': 'application/json',
    },
    credentials: 'include',
});