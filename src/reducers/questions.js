import { RECEIVE_QUESTIONS, SAVE_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        case SAVE_QUESTION:
            const { question } = action

            // Save the question
            // Add the question to the user's asked questions
            return {
                ...state, // state.questions
                [question.id]: question
            }

        default:
            return state
    }
}
