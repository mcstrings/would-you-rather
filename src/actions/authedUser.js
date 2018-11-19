import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export const setAuthedUser = (id) => ({
    type: SET_AUTHED_USER,
    id
})

export const handleSetAuthedUser = (id) => {
    return (dispatch) => {
        dispatch(showLoading())
        dispatch(setAuthedUser(id))
        dispatch(hideLoading())
    }
}
