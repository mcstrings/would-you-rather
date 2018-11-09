import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { getArrayFromObj } from '../utils'

class Questions extends Component {
    state = {
        showAnswered: false
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

    handleFilterClick = (e, showAnswered) => {
        this.setState({
            showAnswered
        })
    }

    render() {
        const { questions } = this.props
        const { showAnswered } = this.state

        return (
            <div className="poll card">
                <div className="poll-title">Questions</div>
                <div className="navigation">
                    <button
                        onClick={(e) => this.handleFilterClick(e, false)}
                        value="1"
                        className={
                            'btnFilter' +
                            (showAnswered ? ' active' : ' inactive')
                        }
                    >
                        Unanswered
                    </button>{' '}
                    |{' '}
                    <button
                        onClick={(e) => this.handleFilterClick(e, true)}
                        value="0"
                        className={
                            'btnFilter' +
                            (showAnswered ? ' inactive' : ' active')
                        }
                    >
                        Answered
                    </button>
                </div>
                {questions &&
                    this.getFilteredQuestions(showAnswered).map((question) => (
                        <Question
                            key={question.id}
                            question={question}
                            hasAuthedUserAnswered={this.hasAuthedUserAnswered}
                            onClick={this.handleQuestionClick}
                        />
                    ))}
            </div>
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
