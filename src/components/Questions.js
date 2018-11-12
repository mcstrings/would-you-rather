import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { getArrayFromObj } from '../utils'
import {
    Badge,
    Card,
    ListGroup,
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
        const { questions } = this.props

        const filteredQuestions = getArrayFromObj(questions).filter(
            (question) =>
                showAnswered ===
                (this.hasAuthedUserAnswered(question.optionOne) ||
                    this.hasAuthedUserAnswered(question.optionTwo))
        )

        return filteredQuestions
    }

    hasAuthedUserAnswered = (option) => {
        const { authedUserID } = this.props
        return option.votes.includes(authedUserID)
    }

    handleFilterChange = (value, e) => {
        this.setState({
            showAnswered: value ? false : true // relying on truthiness
        })
    }

    render() {
        const { questions } = this.props
        const { showAnswered } = this.state

        const answered = this.getFilteredQuestions(true)
        const unanswered = this.getFilteredQuestions(false)

        return (
            <Card>
                <Card.Header>
                    <Card.Title>
                        Questions
                    </Card.Title>

                    <ToggleButtonGroup
                        className="mb-1"
                        name="toggleAnswered"
                        value={showAnswered ? 0 : 1}
                        defaultValue={1}
                        onChange={this.handleFilterChange}
                    >
                        <ToggleButton type="radio" value={1}>
                            Unanswered <Badge variant="light">{unanswered.length}</Badge>
                        </ToggleButton>
                        <ToggleButton type="radio" value={0}>
                            Answered <Badge variant="light">{answered.length}</Badge>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Card.Header>

                {/* <Card.Body> */}


                    <ListGroup variant="flush">
                        {questions &&
                            this.getFilteredQuestions(showAnswered).map(
                                (question) => (
                                    <Question
                                        key={question.id}
                                        question={question}
                                        hasAuthedUserAnswered={
                                            this.hasAuthedUserAnswered
                                        }
                                        onClick={this.handleQuestionClick}
                                    />
                                )
                            )}
                    </ListGroup>
                {/* </Card.Body> */}
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
