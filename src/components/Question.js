import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isAuthedUsersAnswer, isValidUserID } from '../utils'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { getUser, getUserName } from '../utils'
import { handleSaveQuestionAnswer } from '../actions/questions'
import Avatar from './Avatar'
import Option from './Option'

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
        const { authedUserID, question } = this.props

        const hasAuthedUserAnswered = this.getHasAuthedUserAnswered(question)

        this.setState({
            ...this.state,
            showForm:
                authedUserID && !hasAuthedUserAnswered && this.props.withForm,
            hasAuthedUserAnswered
        })
    }

    getHasAuthedUserAnswered = (question) => {
        const { optionOne, optionTwo } = question
        const { authedUserID } = this.props

        return (
            isAuthedUsersAnswer(optionOne, authedUserID) ||
            isAuthedUsersAnswer(optionTwo, authedUserID)
        )
    }

    render() {
        const {
            authedUserID,
            question,
            users,
            withAvatar = false,
            withDetailsButton = false
        } = this.props

        const { answer, showForm } = this.state

        const hasAuthedUserAnswered = this.getHasAuthedUserAnswered(question)

        const user = getUser(question.author, users)

        return (
            <ListGroup.Item>
                <Container className="question" key={question.id}>
                    {/* Avatar */}
                    {withAvatar && (
                        <Fragment>
                            <Row className="dflex align-items-center text-left mb-1">
                                <Avatar className="mr-1 sm" user={user} />{' '}
                                {getUserName(user, authedUserID)} asked
                            </Row>
                            <Row className="dflex text-left mb-3 text-secondary">
                                <h5 className="text-secondary">
                                    Would you rather?
                                </h5>
                            </Row>
                        </Fragment>
                    )}

                    <Form>
                        <Row>
                            {/* Option One */}
                            <Col md={5}>
                                <Option
                                    question={question}
                                    users={users}
                                    showForm={showForm}
                                    option={question.optionOne}
                                    answer={'optionOne'}
                                    hasAuthedUserAnswered={
                                        hasAuthedUserAnswered
                                    }
                                    handleRadioBtnClick={
                                        this.handleRadioBtnClick
                                    }
                                    getOptionCheckbox={this.getOptionCheckbox}
                                />
                            </Col>

                            {/* Or */}
                            <Col
                                md={1}
                                className="d-flex justify-content-center"
                            >
                                <h5 className="text-secondary">or</h5>
                            </Col>

                            {/* Option Two */}
                            <Col md={6}>
                                <Option
                                    question={question}
                                    users={users}
                                    showForm={showForm}
                                    option={question.optionTwo}
                                    answer={'optionTwo'}
                                    hasAuthedUserAnswered={
                                        hasAuthedUserAnswered
                                    }
                                    handleRadioBtnClick={
                                        this.handleRadioBtnClick
                                    }
                                    getOptionCheckbox={this.getOptionCheckbox}
                                />
                            </Col>
                        </Row>
                    </Form>

                    {/* Save Answer Button */}
                    {showForm && (
                        <div className="text-center">
                            <Button
                                onClick={this.handleSubmit}
                                variant="success"
                                className="btn-sm btn-block"
                                disabled={!answer}
                            >
                                Save Answer
                            </Button>
                        </div>
                    )}

                    {/* Detail Page Button */}
                    {!showForm &&
                        isValidUserID(authedUserID) &&
                        withDetailsButton && (
                            <div className="text-center">
                                <Button
                                    variant={
                                        hasAuthedUserAnswered
                                            ? 'primary'
                                            : 'success'
                                    }
                                    className="btn-sm btn-block"
                                    as={Link}
                                    to={`/questions/${question.id}`}
                                >
                                    {hasAuthedUserAnswered
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
        authedUser: getUser(authedUser, users),
        users
    }
}

export default withRouter(connect(mapStateToProps)(Question))
