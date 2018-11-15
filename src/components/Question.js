import React, { Component } from 'react'
import { hasAuthedUserAnswered } from '../utils'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { ListGroup } from 'react-bootstrap'
import OptionStats from './OptionStats'
import { Container, Row, Col } from 'react-bootstrap'

export default class Question extends Component {
    getOptionCheckbox = (option) => {
        const { authedUserID } = this.props

        return hasAuthedUserAnswered(option, authedUserID) ? (
            <MdCheckBox className="option-checkbox checked" />
        ) : (
            <MdCheckBoxOutlineBlank className="option-checkbox" />
        )
    }

    render() {
        const { question, users } = this.props

        return (
            <ListGroup.Item>
                <Container className="question" key={question.id}>
                    <Row>
                        <Col>
                            <h5 className="mb-0">
                                {this.getOptionCheckbox(question.optionOne)}
                                {question.optionOne.text}
                            </h5>
                        </Col>
                    </Row>
                    {users && (
                        <Row className="my-0">
                            <Col className="offset-1">
                                <OptionStats
                                    option={question.optionOne}
                                    users={users}
                                />
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <h5>or</h5>
                        </Col>
                    </Row>
                    <h5 className="mb-0">
                        {this.getOptionCheckbox(question.optionTwo)}
                        {question.optionTwo.text}
                    </h5>
                    {users && (
                        <Row className="my-0">
                            <Col className="offset-1">
                                <OptionStats
                                    option={question.optionTwo}
                                    users={users}
                                />
                            </Col>
                        </Row>
                    )}
                </Container>
            </ListGroup.Item>
        )
    }
}
