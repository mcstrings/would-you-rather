import React, { Component, Fragment } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import OptionStats from './OptionStats'

export default class Option extends Component {
    render() {
        const {
            question,
            answer,
            users,
            showForm,
            option,
            handleRadioBtnClick,
            getOptionCheckbox
        } = this.props

        return (
            <Fragment>
                <Row>
                    <Col>
                        <h5 className="mb-0">
                            <Form.Group
                                className="mb-0"
                                controlId={`form-${answer}-${question.id}`}
                            >
                                {showForm ? (
                                    <Form.Check
                                        type="radio"
                                        name="questionOption"
                                        inline
                                        className="mr-1"
                                        data-answer={answer}
                                        onClick={handleRadioBtnClick}
                                    />
                                ) : (
                                    getOptionCheckbox(option)
                                )}

                                <Form.Label>{option.text}</Form.Label>
                            </Form.Group>
                        </h5>
                    </Col>
                </Row>

                {/* Option Stats */}
                {users && (
                    <Row className="my-0">
                        <Col>
                            <OptionStats option={option} users={users} />
                        </Col>
                    </Row>
                )}
            </Fragment>
        )
    }
}
