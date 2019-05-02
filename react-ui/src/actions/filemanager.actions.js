import { filemanagerActionTypes } from '../actiontypes';
import { filemanagerService } from '../services';

export const filemanagerActions = {
    connect,
    disconnect
};

function connect(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        filemanagerService.connect(username, password)
        
    };

    function request(user) { return { type: filemanagerActionTypes.FILEMANAGER_CONNECT_REQUEST, user } }
}

function disconnect() {
    filemanagerService.disconnect();
    return { type: filemanagerActionTypes.FILEMANAGER_DISCONNECT };
}
