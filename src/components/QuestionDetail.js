import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Avatar from './Avatar'
import Question from './Question'
import { getUser, getUserName } from '../utils'

class QuestionDetail extends Component {
    render() {
        console.log('QuestionDetail', this.props);

        const {
            authedUserID,
            questions,
            users,
            match: { params }
        } = this.props

        // Get question and author (not to be confused with the authenticated user)
        const question = questions[params.id]
        const authorID = question ? question.author : ''
        const author = getUser(authorID, users)

        return (
            <Fragment>
                <Card className="question">
                    <Card.Header>
                        <div className="py-3">
                            <Avatar
                                className="question-detail-avatar"
                                user={author}
                            />
                            <span className="question-detail-username">
                                {authorID === authedUserID ? "You" : getUserName(author)} created this question
                            </span>
                        </div>
                    </Card.Header>
                    {question && (
                        <Question
                            authedUserID={authedUserID}
                            users={users}
                            question={question}
                        />
                    )}
                </Card>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ authedUser, users, questions }) => {
    return {
        authedUserID: authedUser,
        authedUser: getUser(authedUser, users),
        users,
        questions
    }
}

export default withRouter(connect(mapStateToProps)(QuestionDetail))
