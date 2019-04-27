import { _getUsers, _getQuestions } from '../api/_DATA'
import { authedUserAction } from '../store/authedUser'
import { receiveUsersAction } from '../store/users'
import { receiveQuestionsAction } from '../store/questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const handleInitialData = () => {
    const getUsersAndQuestions = async () => {
        const [users, questions] = await Promise.all([
            _getUsers(),
            _getQuestions()
        ])
        return [users, questions]
    }

    return async (dispatch) => {
        const AUTHED_USER_ID = ''
        dispatch(showLoading())
        const [users, questions] = await getUsersAndQuestions()

        // Redux starter kit
        dispatch(receiveUsersAction(users))
        dispatch(receiveQuestionsAction(questions))
        dispatch(authedUserAction(AUTHED_USER_ID))
        
        dispatch(hideLoading())
    }
}
