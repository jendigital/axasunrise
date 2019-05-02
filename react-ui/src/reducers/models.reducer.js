import { modelActionTypes } from '../actiontypes';

export function models(state = {}, action) {
  switch (action.type) {
    case modelActionTypes.MODEL_LIST_REQUEST:
        return {
            loading: true
        };
    case modelActionTypes.MODEL_LIST_SUCCESS:
        return {
            data: action.models
        };
    case modelActionTypes.MODEL_LIST_FAILURE:
        return { 
            error: action.error
        };
    case modelActionTypes.MODEL_GET_REQUEST:
        return {
            loading: true
        };
    case modelActionTypes.MODEL_GET_SUCCESS:
        return {
            data: action.model
        };
    case modelActionTypes.MODEL_GET_FAILURE:
        return { 
            error: action.error
        };
    default:
        return state
  }
}
