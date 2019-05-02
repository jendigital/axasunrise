import { tabActionTypes } from '../actiontypes';

const initialState = {
    tabs: [],
    tabById: {}
}

const addTab = (state = initialState.tabs, action) => {
    switch (action.type) {
        case tabActionTypes.ADD_TAB:
            if (state.indexOf(action.tab) !== -1) {
                return state
            }
            return [ ...state, action.tab ]
        default:
            return state
    }
}

const tabById = (state = initialState.tabById, action) => {
    const { tab } = action
    switch (action.type) {
        case tabActionTypes.ADD_TAB:
            return { ...state,
                [tab.tabId]: {
                    tabName: tab.tabName
                }
            }
        case tabActionTypes.REMOVE_TAB:
            delete state[tab]
            return { ...state }
        default:
            return state
    }   
}

const removeTab = (state = initialState.tabs, action) => {
    switch (action.type) {
        case tabActionTypes.REMOVE_TAB:
            if (state.indexOf(action.tab) === -1) {
                return state
            }
            return state.filter(tab => tab === action.tabId)
        default:
            return state
    }
}

export const getTab = (state, tabId) =>
    state.tabById[tabId]

export const getAddedTabs = state => state.tabs
  
export const tabs = (state = initialState, action) => {
    switch (action.type) {
        case tabActionTypes.TAB_DISPLAY_REQUEST:
            return {
                loading: true
            }
        case tabActionTypes.TAB_DISPLAY_SUCCESS:
            return {
                data: action.tabs
            }
        case tabActionTypes.TAB_DISPLAY_REQUEST:
            return {
                error: action.error
            }
        case tabActionTypes.TAB_ADD:
            return {
                addTab: addTab(state.tabs, action),
                tabById: tabById(state.quantityById, action)
            }
        case tabActionTypes.TAB_REMOVE:
            return {
                removeTab: removeTab(state.tabs, action),
                tabById: tabById(state.quantityById, action)
            }
        default:
            return state;
    }
}
