import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isAuthedUsersAnswer } from '../utils'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import Avatar from './Avatar'
import OptionStats from './OptionStats'
import { getUser, getUserName } from '../utils'
import { handleSaveQuestionAnswer } from '../actions/questions'

class Question extends Component {
    state = {
        hasAuthedUserAnswered: false,
        showForm: false,
        answer: null
    }

    getOptionCheckbox = (option) => {
        const { authedUserID } = this.props

        return isAuthedUsersAnswer(option, authedUserID) ? (
            <MdCheckBox className="option-checkbox checked" />
        ) : (
            <MdCheckBoxOutlineBlank className="option-checkbox text-muted" />
        )
    }

    handleRadioBtnClick = (e) => {
        e.stopPropagation()

        this.setState({
            ...this.state,
            answer: e.target.getAttribute('data-answer')
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const { authedUserID, question, dispatch } = this.props
        const { answer } = this.state

        await dispatch(handleSaveQuestionAnswer(authedUserID, question, answer))
        this.setState({
            hasAuthedUserAnswered: true,
            showForm: false,
            answer: null
        })
    }

    componentDidMount = () => {
        const {
            authedUserID,
            question: { optionOne, optionTwo }
        } = this.props

        const hasAuthedUserAnswered =
            isAuthedUsersAnswer(optionOne, authedUserID) ||
            isAuthedUsersAnswer(optionTwo, authedUserID)

        this.setState({
            ...this.state,
            showForm:
                authedUserID && !hasAuthedUserAnswered && this.props.withForm,
            hasAuthedUserAnswered
        })
    }

    render() {
        const {
            authedUserID,
            question,
            users,
            withAvatar = false,
            withDetailsButton = false
        } = this.props

        const { showForm = false } = this.state

        const user = getUser(question.author, users)

        return (
            <ListGroup.Item>
                <Container className="question" key={question.id}>
                    {/* Avatar */}
                    {withAvatar && (
                        <Fragment>
                            <Row className="dflex align-items-center text-left mb-1">
                                <Avatar className="mr-1 sm" user={user} />{' '}
                                {question.author === authedUserID
                                    ? 'You'
                                    : getUserName(user)}{' '}
                                asked
                            </Row>
                            <Row className="dflex text-left mb-3 text-secondary">
                                <h5 className="text-secondary">
                                    Would you rather?
                                </h5>
                            </Row>
                        </Fragment>
                    )}

                    <Form>
                        {/* Option One */}
                        <Row>
                            <Col>
                                <h5 className="mb-0">
                                    <Form.Group
                                        ref="optionOne"
                                        className="mb-0"
                                        controlId={`formOptionOne-${
                                            question.id
                                        }`}
                                    >
                                        {showForm ? (
                                            <Form.Check
                                                type="radio"
                                                name="questionOption"
                                                ref="optionOne"
                                                inline
                                                className="mr-1"
                                                data-answer="optionOne"
                                                onClick={
                                                    this.handleRadioBtnClick
                                                }
                                            />
                                        ) : (
                                            this.getOptionCheckbox(
                                                question.optionOne
                                            )
                                        )}

                                        <Form.Label>
                                            {question.optionOne.text}
                                        </Form.Label>
                                    </Form.Group>
                                </h5>
                            </Col>
                        </Row>

                        {/* Option One Stats */}
                        {users && (
                            <Row className="my-0">
                                <Col>
                                    <OptionStats
                                        option={question.optionOne}
                                        users={users}
                                    />
                                </Col>
                            </Row>
                        )}

                        {/* Or */}
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <h5 className="text-secondary">or</h5>
                            </Col>
                        </Row>

                        {/* Option Two */}
                        <Row>
                            <Col>
                                <h5 className="mb-0">
                                    <Form.Group
                                        ref="optionTwo"
                                        className="mb-0"
                                        controlId={`formOptionTwo-${
                                            question.id
                                        }`}
                                    >
                                        {showForm ? (
                                            <Form.Check
                                                type="radio"
                                                name="questionOption"
                                                inline
                                                className="mr-1"
                                                data-answer="optionTwo"
                                                onClick={
                                                    this.handleRadioBtnClick
                                                }
                                            />
                                        ) : (
                                            this.getOptionCheckbox(
                                                question.optionTwo
                                            )
                                        )}

                                        <Form.Label>
                                            {question.optionTwo.text}
                                        </Form.Label>
                                    </Form.Group>
                                </h5>
                            </Col>
                        </Row>

                        {/* Option Two Stats */}
                        {users && (
                            <Row className="my-0">
                                <Col>
                                    <OptionStats
                                        option={question.optionTwo}
                                        users={users}
                                    />
                                </Col>
                            </Row>
                        )}
                    </Form>

                    {/* Save Answer Button */}
                    {showForm && (
                        <div className="text-center">
                            <Button
                                onClick={this.handleSubmit}
                                variant="success"
                                className="btn-sm btn-block"
                                disabled={!this.state.answer}
                            >
                                Save Answer
                            </Button>
                        </div>
                    )}

                    {/* Detail Page Button */}
                    {!showForm && authedUserID && withDetailsButton && (
                        <div className="text-center">
                            <Button
                                variant={
                                    this.state.hasAuthedUserAnswered
                                        ? 'primary'
                                        : 'success'
                                }
                                className="btn-sm btn-block"
                                as={Link}
                                to={`/question-detail/${question.id}`}
                            >
                                {this.state.hasAuthedUserAnswered
                                    ? 'View Details'
                                    : 'Answer Question'}
                            </Button>
                        </div>
                    )}
                </Container>
            </ListGroup.Item>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUserID: authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Question))
