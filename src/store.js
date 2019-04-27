import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import logger from 'redux-logger'

import { loadingBarReducer } from 'react-redux-loading-bar'
import { usersReducer } from './store/users'
import { questionsReducer } from './store/questions'
import { authedUserReducer } from './store/authedUser'

// Enhancers

// Reducers
const reducer = {
    // users,
    users: usersReducer,
    questions: questionsReducer,
    authedUser: authedUserReducer,
    loadingBar: loadingBarReducer
}

// Middleware
const middleware = [...getDefaultMiddleware()] //, logger

// Store
const store = configureStore({
    reducer,
    middleware
})

export default store
