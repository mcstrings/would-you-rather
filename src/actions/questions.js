import { _saveQuestion } from '../api/_DATA'
import { handleUpdateUserQuestions } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'

export const receiveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export const saveQuestion = (question) => ({
    type: SAVE_QUESTION,
    question
})

export const handleAddQuestion = (question) => {
    return async (dispatch, getState) => {

        dispatch(showLoading())
        try {
            const newQuestion = await _saveQuestion(question)
            await dispatch(saveQuestion(newQuestion))
            await dispatch(handleUpdateUserQuestions(newQuestion))
        }
        catch(err) {
            console.log(err);
        }

        dispatch(hideLoading())
    }
}