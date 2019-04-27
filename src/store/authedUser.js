import { createAction, createReducer } from 'redux-starter-kit'

export const authedUserAction = createAction('SET_AUTHED_USER')

export const authedUserReducer = createReducer('', {
    [authedUserAction]: (state, action) => action.payload
})