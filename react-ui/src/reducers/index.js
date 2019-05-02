import { combineReducers } from 'redux'
import { tabs } from './tabs.reducer'
import { auth } from './auth.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { models } from './models.reducer'
import { groups } from './groups.reducer'
import { authorizations } from './authorizations.reducer'
import { filemanager } from './filemanager.reducer'

const Reducers = combineReducers({
    tabs,
    auth,
    users,
    alert,
    models,
    groups,
    authorizations,
    filemanager
})

export default Reducers
