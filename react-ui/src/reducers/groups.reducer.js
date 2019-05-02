import { groupActionTypes } from '../actiontypes';

export function groups(state = {}, action) {
  switch (action.type) {
    case groupActionTypes.GROUP_LIST_REQUEST:
        return {
            loading: true
        };
    case groupActionTypes.GROUP_LIST_SUCCESS:
        return {
            data: action.groups
        };
    case groupActionTypes.GROUP_LIST_FAILURE:
        return { 
            error: action.error
        };
    default:
        return state
  }
}
