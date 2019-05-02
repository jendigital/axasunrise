import { alertActionTypes } from '../actiontypes';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertActionTypes.SUCCESS:
        return {
            type: 'alert-success',
            message: action.message
        };
    case alertActionTypes.ERROR:
        return {
            type: 'alert-danger',
            message: action.message
        };
    case alertActionTypes.CLEAR:
        return {};
    default:
        return state
  }
}
