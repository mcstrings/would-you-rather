import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import users from './users'
import questions from './questions'

export default combineReducers({
    users,
    questions,
    loadingBar: loadingBarReducer
})
