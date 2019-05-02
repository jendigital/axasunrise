import token from 'basic-auth-token';
import { authHeader } from '../utils';
import { config } from '../utils';

export const userService = {
    login,
    logout,
    current,
    getAll
};

function login(login, password) {
    const requestOptions = {
        "method": "POST",
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "text/plain",
            "X-Auth-Identifier": login,
            "x-Auth-Password": password,
        },
        "mode": "cors"
    };

    return fetch(config.API_URL + '/auth', requestOptions)
    .then(response => {
        if (!response.ok) { 
            console.log(response.statusText)
            return Promise.reject(response.statusText);
        }
        return response.text();
    })
    .then(bearer_token => {
        const user = {
            login : login,
            token: bearer_token,
            basic_token: token(login, password)
        }
        
        localStorage.setItem('user', JSON.stringify(user));
        return current().then(user => {
            var role = '';
            if(user && user.groups) {
                user.groups.map(group=>{
                    if(group.isAdmin) {
                        role = 'ADMIN'
                    }
                })
            }
            const userComplete = {
                user: user,
                role:role,
                token: bearer_token,
                basic_token: token(login, password)
            }
            
            localStorage.setItem('user', JSON.stringify(userComplete))
            
            return userComplete;
        })
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function current() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.API_URL + '/auth/user/current', requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.API_URL + '/auth/user', requestOptions)
    .then(handleResponse)
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}
