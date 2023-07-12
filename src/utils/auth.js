export const BASE_URL = 'https://auth.nomoreparties.co.';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email
        })
    })
        .then((res) => {
            return res;
        })
        .catch(function (value) {
            console.log('Ошибка:' + value);
        })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email
        })
    })
        .then((response) => {
            return response.json();
        })
        .catch(function (value) {
            console.log('Ошибка:' + value);
        })
};

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch(function (value) {
            console.log('Ошибка:' + value);
        })
};