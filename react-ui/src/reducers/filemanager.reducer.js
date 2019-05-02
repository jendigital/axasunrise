import { filemanagerActionTypes } from '../actiontypes';

export function filemanager(state = {}, action) {
  switch (action.type) {
    case filemanagerActionTypes.FILEMANAGER_CONNECT_REQUEST:
        return {
            loading: true
        };
    case filemanagerActionTypes.FILEMANAGER_CONNECT_SUCCESS:
        return {
            data: action.filemanager
        };
    case filemanagerActionTypes.FILEMANAGER_CONNECT_FAILURE:
        return { 
            error: action.error
        };
    case filemanagerActionTypes.FILEMANAGER_DISCONNECT:
        return {};
    default:
        return state
  }
}
