import { _saveQuestion, _saveQuestionAnswer } from '../api/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { updateUserQuestionsAction, updateUserAnswersAction } from '../store/users'
import { saveQuestionAction, saveQuestionAnswerAction } from '../store/questions'

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
            await dispatch(saveQuestionAnswerAction({ authedUserID, question, answer }))
            await dispatch(updateUserAnswersAction({ authedUserID, question, answer }))
        } catch (err) {
            console.error(err)
        }

        dispatch(hideLoading())
    }
}

export const handleAddQuestion = (question) => {
    return async (dispatch) => {
        dispatch(showLoading())
        try {
            const newQuestion = await _saveQuestion(question) // api call
            await dispatch(saveQuestionAction(newQuestion)) // dispatch the action
            await dispatch(updateUserQuestionsAction(newQuestion))
        } catch (err) {
            console.error(err)
        }
        dispatch(hideLoading())
    }
}
