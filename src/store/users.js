import { createAction, createReducer } from 'redux-starter-kit'

export const receiveUsersAction = createAction('RECEIVE_USERS_ACTION')
export const updateUserQuestionsAction = createAction('UPDATE_USER_QUESTIONS_ACTION')
export const updateUserAnswersAction = createAction('UPDATE_USER_ANSWERS_ACTION')

// NOTE: Apparently, I'm confused about what state actually is here.
// It's the state.users object.
export const usersReducer = createReducer(
    {},
    {
        [receiveUsersAction]: (state, { payload: users }) => users,

        [updateUserQuestionsAction]: (state, { payload: question }) => {
            state[question.author].questions.push(question.id)
        },

        [updateUserAnswersAction]: (state, action) => {
            const { authedUserID, question, answer } = action.payload
            state[authedUserID].answers[question.id] = answer
        }
    }
)
