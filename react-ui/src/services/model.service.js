import { authHeader } from '../utils';
import { config } from '../utils';

export const modelService = {
    list,
    get
};

function list() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.API_URL + '/model', requestOptions).then(handleResponse)
}

function get(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.API_URL + '/model/' + id, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
