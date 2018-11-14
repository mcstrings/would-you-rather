import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { getArrayFromObj, getUser } from '../utils'
import { Container, Col, Row, DropdownButton, Dropdown } from 'react-bootstrap'

class Login extends Component {
    handleSelectUserChange = (value, e) => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(value))
    }

    render() {
        const { authedUserID, users, user } = this.props

        const title = user ? user.name : "Select a user"

        return (
            <Container className="d-flex justify-content-center">
                <Row className="pb-3">
                    <Col>
                        <h6 className="d-flex justify-content-center">Login as</h6>
    
                        <DropdownButton
                            id="dropdown-users"
                            value={authedUserID}
                            title={title}
                            onSelect={this.handleSelectUserChange}
                        >
                            {users &&
                                getArrayFromObj(users)
                                    .sort((a, b) => {
                                        const nameA = a.name.toUpperCase()
                                        const nameB = b.name.toUpperCase()
                                        return nameA < nameB
                                            ? -1
                                            : nameA > nameB
                                            ? 1
                                            : 0
                                    })
                                    .map((user) => (
                                        <Dropdown.Item
                                            key={user.id}
                                            eventKey={user.id}
                                        >
                                            {user.name}
                                        </Dropdown.Item>
                                    ))}
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUserID: authedUser,
        user: getUser(authedUser, users),
        users
    }
}

export default connect(mapStateToProps)(Login)
