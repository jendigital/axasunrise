import { userActionTypes } from '../actiontypes';

export function users(state = {}, action) {
  switch (action.type) {
    case userActionTypes.GETALL_REQUEST:
        return {
            loading: true
        };
    case userActionTypes.GETALL_SUCCESS:
        return {
            data: action.users
        };
    case userActionTypes.GETALL_FAILURE:
        return { 
            error: action.error
        };
    default:
        return state
  }
}
