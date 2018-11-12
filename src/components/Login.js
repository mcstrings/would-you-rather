import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { getArrayFromObj, getUser } from '../utils'
import { Col, Row, DropdownButton, Dropdown } from 'react-bootstrap'

class Login extends Component {
    handleSelectUserChange = (value, e) => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(value))
    }

    render() {
        const { authedUserID, users, user } = this.props

        const title = user ? user.name : "Select a user"

        return (
            <Row className="pb-3">
                <Col>
                    <div>Login as</div>

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
