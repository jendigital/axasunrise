import { authorizationActionTypes } from '../actiontypes';

export function authorizations(state = {}, action) {
  switch (action.type) {
    case authorizationActionTypes.AUTHORIZATION_LIST_REQUEST:
        return {
            loading: true
        };
    case authorizationActionTypes.AUTHORIZATION_LIST_SUCCESS:
        return {
            data: action.authorizations
        };
    case authorizationActionTypes.AUTHORIZATION_LIST_FAILURE:
        return { 
            error: action.error
        };
    default:
        return state
  }
}
