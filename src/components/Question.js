import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { isAuthedUsersAnswer } from '../utils'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import Avatar from './Avatar'
import OptionStats from './OptionStats'
import { getUser, getUserName } from '../utils'

class Question extends Component {
    state = {
        hasAuthedUserAnswered: false
    }

    getOptionCheckbox = (option) => {
        const { authedUserID } = this.props

        return isAuthedUsersAnswer(option, authedUserID) ? (
            <MdCheckBox className="option-checkbox checked" />
        ) : (
            <MdCheckBoxOutlineBlank className="option-checkbox text-muted" />
        )

        // return (
        //     isAuthedUsersAnswer(option, authedUserID) && (
        //         <MdCheckBox className="option-checkbox checked" />
        //     )
        // )
    }

    componentDidMount = () => {
        const {
            authedUserID,
            question: { optionOne, optionTwo }
        } = this.props

        this.setState({
            ...this.state,
            hasAuthedUserAnswered:
                isAuthedUsersAnswer(optionOne, authedUserID) ||
                isAuthedUsersAnswer(optionTwo, authedUserID)
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

        const user = getUser(question.author, users)

        return (
            <ListGroup.Item>
                <Container className="question" key={question.id}>
                    {withAvatar && (
                        <Fragment>
                            <Row className="dflex align-items-center text-left mb-1">
                                <Avatar className="mr-1 sm" user={user} />{' '}
                                {question.author === authedUserID ? "You" : getUserName(user)} asked
                            </Row>
                            <Row className="dflex text-left mb-3 text-secondary">
                                <h5 className="text-secondary">
                                    Would you rather?
                                </h5>
                            </Row>
                        </Fragment>
                    )}
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
                            <Col>
                                <OptionStats
                                    option={question.optionOne}
                                    users={users}
                                />
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <h5 className="text-secondary">or</h5>
                        </Col>
                    </Row>
                    <h5 className="mb-0">
                        {this.getOptionCheckbox(question.optionTwo)}
                        {question.optionTwo.text}
                    </h5>
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

                    {authedUserID && withDetailsButton && (
                        <Row>
                            <Col className="text-center">
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
                            </Col>
                        </Row>
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

export default connect(mapStateToProps)(Question)
