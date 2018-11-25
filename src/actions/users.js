export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_QUESTIONS = 'UPDATE_USER_QUESTIONS'
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS'

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const updateUserQuestions = (question) => ({
    type: UPDATE_USER_QUESTIONS,
    question
})

const updateUserAnswers = (authedUserID, question, answer) => ({
    type: UPDATE_USER_ANSWERS,
    uid: authedUserID,
    qid: question.id,
    answer
})

export const handleUpdateUserQuestions = (question) => {
    return (dispatch) => {
        dispatch(updateUserQuestions(question))
    }
}

export const handleUpdateUserAnswers = (authedUserID, question, answer ) => {
    return (dispatch) => {
        dispatch(updateUserAnswers(authedUserID, question, answer))
    }
}