import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonToolbar, Container, Form, Card } from 'react-bootstrap'
import { getUser } from '../utils'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    // Do I even need this?
    state = {
        validated: false,
        optionOneText: '',
        optionTwoText: ''
    }

    handleTextarea1Change = (e) => {
        this.setState({
            ...this.state,
            optionOneText: e.target.value
        })
    }

    handleTextarea2Change = (e) => {
        this.setState({
            ...this.state,
            optionTwoText: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const { dispatch, authedUserID, history } = this.props
        const { optionOneText, optionTwoText } = this.state

        const question = {
            author: authedUserID,
            optionOneText,
            optionTwoText
        }

        dispatch(handleAddQuestion(question, history))
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Header>
                        <h4 className="mb-0">Add a new question</h4>
                    </Card.Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Body>
                            <Form.Group controlId="poll-option-1">
                                <Form.Label>Option 1</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    required
                                    onChange={this.handleTextarea1Change}
                                />
                            </Form.Group>
                            <h5 className="text-muted text-center">or</h5>
                            <Form.Group controlId="poll-option-2">
                                <Form.Label>Option 2</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    required
                                    onChange={this.handleTextarea2Change}
                                />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <ButtonToolbar className="justify-content-center">
                                <Button type="submit" className="mx-1">
                                    Save Question
                                </Button>
                                {/* <Button className="mx-1" variant="secondary">
                                    Cancel
                                </Button> */}
                            </ButtonToolbar>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUserID: authedUser,
        user: getUser(authedUser, users)
    }
}

export default connect(mapStateToProps)(NewQuestion)
