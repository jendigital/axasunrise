import { authorizationActionTypes } from '../actiontypes';
import { authorizationService } from '../services';

export const authorizationActions = {
    list
};

function list() {
    return dispatch => {
        dispatch(request());

        authorizationService.list()
        .then(
            authorizations => dispatch(success(authorizations)),
            error => dispatch(failure(error))
        );
    };

    function request() { return { type: authorizationActionTypes.AUTHORIZATION_LIST_REQUEST } }
    function success(authorizations) { return { type: authorizationActionTypes.AUTHORIZATION_LIST_SUCCESS, authorizations } }
    function failure(error) { return { type: authorizationActionTypes.AUTHORIZATION_LIST_FAILURE, error } }
}
