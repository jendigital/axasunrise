import { modelActionTypes } from '../actiontypes';
import { modelService } from '../services';

export const modelActions = {
    list,
    get
};

function list() {
    return dispatch => {
        dispatch(request());

        modelService.list()
        .then(
            models => dispatch(success(models)),
            error => dispatch(failure(error))
        );
    };

    function request() { return { type: modelActionTypes.MODEL_LIST_REQUEST } }
    function success(models) { return { type: modelActionTypes.MODEL_LIST_SUCCESS, models } }
    function failure(error) { return { type: modelActionTypes.MODEL_LIST_FAILURE, error } }
}

function get(id) {
    return dispatch => {
        dispatch(request());

        modelService.get(id)
        .then(
            model => dispatch(success(model)),
            error => dispatch(failure(error))
        );
    };

    function request() { return { type: modelActionTypes.MODEL_GET_REQUEST } }
    function success(model) { return { type: modelActionTypes.MODEL_GET_SUCCESS, model } }
    function failure(error) { return { type: modelActionTypes.MODEL_GET_FAILURE, error } }
}
