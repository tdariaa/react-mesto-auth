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
        // .then((response) => {
        //     console.log(response, response.ok);
        //     return response.json();
        // })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => console.log(err));
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
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data.user);
            return data;
            if (data.user) {
                localStorage.setItem('jwt', data.jwt);
                return data;
            }
        })
        .catch(err => console.log(err))
};