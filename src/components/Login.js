import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { getArrayFromObj } from '../utils'
import { Col, Row } from 'react-bootstrap'

class Login extends Component {
    handleSelectUserChange = (e) => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(e.target.value))
    }

    render() {
        const { authedUserID, users } = this.props

        return (
            <Row className="pb-3">
                <Col>
                    <div>Login as</div>
                    <select
                        value={authedUserID}
                        onChange={this.handleSelectUserChange}
                    >
                        {/* Sort users alphabetically */}
                        <option value="">Select a user login</option>
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
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                    </select>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUserID: authedUser,
        users
    }
}

export default connect(mapStateToProps)(Login)
