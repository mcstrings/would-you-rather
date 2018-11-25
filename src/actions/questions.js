import { _saveQuestion, _saveQuestionAnswer } from '../api/_DATA'
import { handleUpdateUserQuestions, handleUpdateUserAnswers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export const receiveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export const saveQuestion = (question) => ({
    type: SAVE_QUESTION,
    question
})

export const saveQuestionAnswer = (authedUserID, question, answer) => ({
    type: SAVE_QUESTION_ANSWER,
    uid: authedUserID,
    qid: question.id,
    answer
})

export const handleSaveQuestionAnswer = (authedUserID, question, answer) => {
    return async (dispatch) => {
        dispatch(showLoading())

        try {
            // API call
            await _saveQuestionAnswer({
                authedUser: authedUserID,
                qid: question.id,
                answer
            })

            // Update state
            await dispatch(saveQuestionAnswer(authedUserID, question, answer))
            await dispatch(handleUpdateUserAnswers(authedUserID, question, answer))
        } catch (err) {
            console.log(err)
        }

        dispatch(hideLoading())
    }
}

export const handleAddQuestion = (question) => {
    return async (dispatch) => {
        dispatch(showLoading())
        try {
            const newQuestion = await _saveQuestion(question) // api call
            await dispatch(saveQuestion(newQuestion)) // dispatch the action
            await dispatch(handleUpdateUserQuestions(newQuestion)) // add the question to the user
        } catch (err) {
            console.log(err)
        }
        dispatch(hideLoading())
    }
}
