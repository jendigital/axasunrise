import { tabActionTypes } from '../actiontypes';

export const tabActions = {
    display,
    addTab,
    removeTab
};

const display = (dispatch, getState) => {
    const { tabs } = getState()

    return dispatch => {
        dispatch(request());

        if(tabs) {
            return dispatch(success(tabs))
        } 
        return dispatch(failure(tabs))
    };

    function request() { return { type: tabActionTypes.TAB_DISPLAY_REQUEST } }
    function success(tabs) { return { type: tabActionTypes.TAB_DISPLAY_SUCCESS, tabs } }
    function failure(error) { return { type: tabActionTypes.TAB_DISPLAY_FAILURE, error } }
}

const addTab = tabId => (dispatch) => {
    dispatch(addTabRequest(tabId))
    const addTabRequest = tabId => ({
        type: tabActionTypes.ADD_TAB,
        tabId
    })
}

const removeTab = tabId => (dispatch) => {
    dispatch(removeTabRequest(tabId))
    const removeTabRequest = tabId => ({
        type: tabActionTypes.REMOVE_TAB,
        tabId
    })
}
  
