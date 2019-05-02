import { groupActionTypes } from '../actiontypes';
import { groupService } from '../services';

export const groupActions = {
    list
};

function list() {
    return dispatch => {
        dispatch(request());

        groupService.list()
        .then(
            groups => dispatch(success(groups)),
            error => dispatch(failure(error))
        );
    };

    function request() { return { type: groupActionTypes.GROUP_LIST_REQUEST } }
    function success(groups) { return { type: groupActionTypes.GROUP_LIST_SUCCESS, groups } }
    function failure(error) { return { type: groupActionTypes.GROUP_LIST_FAILURE, error } }
}
