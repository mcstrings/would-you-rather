import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from './Avatar'
import Question from './Question'
import { getUser, getUserName } from '../utils'

class QuestionDetail extends Component {
    render() {
        const { authedUser } = this.props

        return (
            <div>
                <Avatar className="question-detail-avatar" user={authedUser} />
                <span className="question-detail-username">
                    {getUserName(authedUser)}
                </span>
                {/* <Question
                    key={question.id}
                    question={question}
                    hasAuthedUserAnswered={this.hasAuthedUserAnswered}
                /> */}
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUserID: authedUser,
        authedUser: getUser(authedUser, users)
    }
}

export default connect(mapStateToProps)(QuestionDetail)
