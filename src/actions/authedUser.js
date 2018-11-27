export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export const setAuthedUser = (id) => ({
    type: SET_AUTHED_USER,
    id
})

export const handleSetAuthedUser = (id) => {
    return (dispatch) => {
        dispatch(setAuthedUser(id))
    }
}
