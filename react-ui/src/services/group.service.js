import { authHeader } from '../utils';
import { config } from '../utils';

export const groupService = {
    list,
};

function list() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.API_URL + '/auth/groups', requestOptions).then(handleResponse)
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
