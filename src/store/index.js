import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { usersReducer } from './users'
import questions from './questions'
import authedUser from './authedUser'

export default combineReducers({
    usersReducer,
    questions,
    authedUser,
    loadingBar: loadingBarReducer
})
