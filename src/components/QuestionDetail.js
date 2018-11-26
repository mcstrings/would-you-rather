import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Avatar from './Avatar'
import Question from './Question'
import { getUser, getUserName } from '../utils'

class QuestionDetail extends Component {
    render() {
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
        const userName = getUserName(author, authedUserID)

        return (
            <Fragment>
                <Card className="question mb-3 mx-3">
                    {question && (
                        <Question
                            authedUserID={authedUserID}
                            users={users}
                            question={question}
                            withForm={true}
                        />
                    )}
                    <Card.Footer>
                        <div>
                            <Avatar
                                className="question-detail-avatar md"
                                user={author}
                            />
                            <span>{userName} created this question</span>
                        </div>
                    </Card.Footer>
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
