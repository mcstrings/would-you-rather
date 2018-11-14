export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_QUESTIONS = 'UPDATE_USER_QUESTIONS'

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const updateUserQuestions = (question) => ({
    type: UPDATE_USER_QUESTIONS,
    question
})

export const handleUpdateUserQuestions = (question) => {
    return (dispatch) => {
        dispatch(updateUserQuestions(question))
    }
}