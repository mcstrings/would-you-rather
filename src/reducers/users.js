import { RECEIVE_USERS, UPDATE_USER_QUESTIONS } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }

        case UPDATE_USER_QUESTIONS:
            const { question } = action

            return {
                ...state,
                [question.author]: {
                    ...state[question.author],
                    questions: state[question.author].questions.concat([question.id])
                }
            }

        default:
            return state
    }
}
