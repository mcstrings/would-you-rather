import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from '../api/_DATA'
import { setAuthedUser } from './authedUser'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'

export const handleInitialData = () => {
    return (dispatch) => {
        const AUTHED_USER_ID = ''

        Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
            users,
            questions
        }))
        .then(({users, questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_USER_ID))
        })
    }
}
