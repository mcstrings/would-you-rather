import React, { Component } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

export default class Question extends Component {
    getOptionCheckbox = (option) => {
        const { hasAuthedUserAnswered } = this.props

        return hasAuthedUserAnswered(option) ? (
            <MdCheckBox className="option-checkbox checked" />
        ) : (
            <MdCheckBoxOutlineBlank className="option-checkbox" />
        )
    }

    handleQuestionClick = (e, questionID) => {
        console.log('handleQuestionClick', questionID, e)
    }

    render() {
        const { question } = this.props

        return (
            <div className="question" key={question.id} onClick={(e) =>  this.handleQuestionClick(e, question.id)}>
                <div>
                    {this.getOptionCheckbox(question.optionOne)}
                    {question.optionOne.text}
                </div>
                <div className="faded-text">or</div>
                <div>
                    {this.getOptionCheckbox(question.optionTwo)}
                    {question.optionTwo.text}
                </div>
            </div>
        )
    }
}
