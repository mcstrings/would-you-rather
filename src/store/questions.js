import { createAction, createReducer } from 'redux-starter-kit'

export const receiveQuestionsAction = createAction('RECEIVE_QUESTIONS_ACTION')
export const saveQuestionAction = createAction('SAVE_QUESTION_ACTION')
export const saveQuestionAnswerAction = createAction('SAVE_QUESTION_ANSWER_ACTION')

export const questionsReducer = createReducer(
    {},
    {
        [receiveQuestionsAction]: (state, { payload: questions }) => questions,

        [saveQuestionAction]: (state, { payload: question }) => {
            state[question.id] = question
        },

        [saveQuestionAnswerAction]: (state, action) => {
            const { authedUserID, question, answer } = action.payload
            state[question.id][answer].votes.push(authedUserID)
        }
    }
)