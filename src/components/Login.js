import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { getArrayFromObj } from '../utils'

class Login extends Component {

    handleSelectUserChange = (e) => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(e.target.value))
    }

    render() {
        const { authedUserID, users } = this.props

        return (
            <Fragment>
                <div>Login as</div>
                <select
                    value={authedUserID}
                    onChange={this.handleSelectUserChange}
                >
                    <option value="">Select a user login</option>
                    {users &&
                        getArrayFromObj(users).map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                </select>
            </Fragment>
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
