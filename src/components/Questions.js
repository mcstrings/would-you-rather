import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { getArrayFromObj, isAuthedUsersAnswer } from '../utils'
import {
    Badge,
    Card,
    ListGroup,
    ListGroupItem,
    ToggleButtonGroup,
    ToggleButton
} from 'react-bootstrap'

class Questions extends Component {
    constructor(props) {
        super(props)

        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    state = {
        showAnswered: false,
        answered: null,
        unanswered: null
    }

    getFilteredQuestions = (showAnswered = false) => {
        const { authedUserID, questions } = this.props

        const filteredQuestions = getArrayFromObj(questions).filter(
            (question) =>
                showAnswered ===
                (isAuthedUsersAnswer(question.optionOne, authedUserID) ||
                    isAuthedUsersAnswer(question.optionTwo, authedUserID))
        )

        return this.sortQuestions(filteredQuestions)
    }

    sortQuestions = (questions) => {
        return questions.sort((a, b) => b.timestamp - a.timestamp)
    }

    handleFilterChange = (value, e) => {
        this.setState({
            showAnswered: value ? false : true // relying on truthiness
        })
    }

    render() {
        const { authedUserID, questions } = this.props
        const { showAnswered } = this.state

        const answered = this.getFilteredQuestions(true)
        const unanswered = this.getFilteredQuestions(false)

        return (
            <Card className="questions mb-3 mx-3">
                <Card.Header className="text-center">
                    <ToggleButtonGroup
                        className="mb-1"
                        name="toggleAnswered"
                        value={showAnswered ? 0 : 1}
                        defaultValue={1}
                        onChange={this.handleFilterChange}
                    >
                        <ToggleButton type="radio" value={1}>
                            Unanswered{' '}
                            <Badge variant="light">{unanswered.length}</Badge>
                        </ToggleButton>
                        <ToggleButton type="radio" value={0}>
                            Answered{' '}
                            <Badge variant="light">{answered.length}</Badge>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Card.Header>

                <ListGroup variant="flush">
                    {questions &&
                        this.getFilteredQuestions(showAnswered).map(
                            (question) => (
                                <ListGroupItem key={question.id}>
                                    <Question
                                        authedUserID={authedUserID}
                                        question={question}
                                        withDetailsButton={true}
                                        withAvatar={true}
                                    />
                                </ListGroupItem>
                            )
                        )}
                </ListGroup>
            </Card>
        )
    }
}

function mapStateToProps({ authedUser, questions }) {
    return {
        authedUserID: authedUser,
        questions
    }
}

export default connect(mapStateToProps)(Questions)
