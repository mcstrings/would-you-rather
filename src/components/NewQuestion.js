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

        const { dispatch, authedUserID } = this.props
        const { optionOneText, optionTwoText } = this.state

        // const form = e.currentTarget
        // if (form.checkValidity() === false) {
        //     console.log("What's good, Miley?")
        // } else {
        //     console.log("It's all good in the hood, baby")
        // }

        const question = {
            author: authedUserID,
            optionOneText,
            optionTwoText
        }

        // `_saveQuestion(question)` Method
        // _Description_: Save the polling question in the database.
        // _Parameters_: Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:
        dispatch(handleAddQuestion(question))
    }

    render() {
        const { validated } = this.state

        return (
            <Container>
                <Card>
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
