import { userActionTypes } from '../actiontypes';
import { userService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../utils';

export const userActions = {
    login,
    logout,
    getAll
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
        .then(user => { 
            dispatch(success(user));
            history.push('/');
        }).catch(error => {
            dispatch(failure(error));
            dispatch(alertActions.error('error'));
        })
    };

    function request(user) { return { type: userActionTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: userActionTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userActionTypes.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userActionTypes.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
        .then( users => 
            dispatch(success(users))
        ).catch(error => {
            dispatch(failure(error));
        })
    };

    function request() { return { type: userActionTypes.GETALL_REQUEST } }
    function success(users) { return { type: userActionTypes.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userActionTypes.GETALL_FAILURE, error } }
}
